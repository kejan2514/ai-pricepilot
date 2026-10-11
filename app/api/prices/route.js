import {starterProducts} from '../../catalog';
import {brandForUrl,normalizeProductUrl} from '../../brands.mjs';
import {parsePrice} from './parser.mjs';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export const maxDuration=30;
const cache=new Map();const pending=new Map();let windowStart=0,requests=0;
async function readLimited(body,limit){const reader=body.getReader(),chunks=[];let size=0;try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>limit)throw new Error('SOURCE_TOO_LARGE');chunks.push(value);}return Buffer.concat(chunks).toString('utf8');}finally{await reader.cancel().catch(()=>{});}}
async function readPrice(url){
 try{
 const response=await fetch(url,{redirect:'error',cache:'no-store',signal:AbortSignal.timeout(12000),headers:{'User-Agent':'AIPricePilot/0.2 (public product price check)','Accept':'text/html'}});
 if(!response.ok)throw new Error(`SOURCE_HTTP_${response.status}`);
 if(!response.headers.get('content-type')?.includes('text/html'))throw new Error('SOURCE_NOT_HTML');
 const price=parsePrice(await readLimited(response.body,2000000),url);
 return {url,status:'ok',price,checkedAt:new Date().toISOString()};
 }catch(error){const code=error.message==='SOURCE_HTTP_403'||error.message==='SOURCE_HTTP_429'?'blocked':error.message==='PRICE_UNVERIFIED'?'unverified':'unavailable';console.error('Price check failed',brandForUrl(url)?.name,error.name,error.message);return {url,status:'error',code,attemptedAt:new Date().toISOString(),message:code==='blocked'?'Mağaza otomatik erişimi reddetti. Manuel kayıt kullanılabilir.':code==='unverified'?'Bu sayfada ürünün tek bir TRY fiyatı doğrulanamadı.':'Mağaza fiyatına ulaşılamadı. Önceki fiyat korunuyor.'};}
}
async function check(p){const url=normalizeProductUrl(p.url);const stored=cache.get(url);if(stored&&stored.expires>Date.now())return {...stored.value,id:p.id,cached:true};if(pending.has(url))return {...await pending.get(url),id:p.id,cached:true};const task=readPrice(url);pending.set(url,task);try{const value=await task;if(cache.size>=300)cache.delete(cache.keys().next().value);cache.set(url,{value,expires:Date.now()+1800000});return {...value,id:p.id,cached:false};}finally{pending.delete(url);}}
export async function GET(){const results=await Promise.all(starterProducts.map(check));return Response.json({results},{headers:{'Cache-Control':'public, max-age=0, s-maxage=1800'}});}
export async function POST(request){
 const headers={'Cache-Control':'no-store'};
 if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Bu işlem yalnızca uygulama içinden yapılabilir.'},{status:403,headers});
 const now=Date.now();if(now-windowStart>=60000){windowStart=now;requests=0;}if(++requests>60)return Response.json({error:'Çok fazla kontrol isteği. Bir dakika sonra tekrar deneyin.'},{status:429,headers});
 let product;try{product=JSON.parse(await readLimited(request.body,3000));}catch{return Response.json({error:'Geçersiz ürün isteği.'},{status:400,headers});}
 if(!product||typeof product.id!=='string'||product.id.length>100||typeof product.url!=='string'||!normalizeProductUrl(product.url)||brandForUrl(product.url)?.name!==product.store)return Response.json({error:'Marka ve resmî ürün bağlantısı eşleşmiyor.'},{status:400,headers});
 if(pending.size>=8)return Response.json({error:'Kontroller yoğun. Biraz sonra tekrar deneyin.'},{status:429,headers});
 return Response.json({results:[await check(product)]},{headers});
}
