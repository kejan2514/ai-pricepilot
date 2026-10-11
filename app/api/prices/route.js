import {starterProducts} from '../../catalog';
import {parsePrice} from './parser.mjs';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export const maxDuration=30;
async function check(p){
 try{
 const response=await fetch(p.url,{redirect:'error',cache:'no-store',signal:AbortSignal.timeout(12000),headers:{'User-Agent':'AIPricePilot/0.1 (public product price check)','Accept':'text/html'}});
 if(!response.ok||!response.headers.get('content-type')?.includes('text/html'))throw new Error('SOURCE_UNAVAILABLE');
 const reader=response.body.getReader();const chunks=[];let size=0;
 while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>2000000){await reader.cancel();throw new Error('SOURCE_TOO_LARGE');}chunks.push(value);}
 const html=Buffer.concat(chunks).toString('utf8');const price=parsePrice(html,p.url);
 return {id:p.id,url:p.url,status:'ok',price,checkedAt:new Date().toISOString()};
 }catch(error){console.error('Price check failed',p.id,error.name);return {id:p.id,url:p.url,status:'error',message:'Mağaza fiyatı doğrulanamadı. Önceki fiyat korunuyor.'};}
}
export async function GET(){const results=await Promise.all(starterProducts.map(check));return Response.json({results},{headers:{'Cache-Control':'public, max-age=0, s-maxage=1800'}});}
