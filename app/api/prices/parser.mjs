export function parsePrice(html,url){
 const candidates=[];
 const sameUrl=value=>{if(typeof value!=='string'||!value)return false;try{const a=new URL(value,url),b=new URL(url);return a.origin===b.origin&&a.pathname.replace(/\/$/,'')===b.pathname.replace(/\/$/,'')&&a.search===b.search;}catch{return false;}};
 function visit(value){if(Array.isArray(value)){value.forEach(visit);return;}if(!value||typeof value!=='object')return;if(value['@graph'])visit(value['@graph']);if([].concat(value['@type']||[]).includes('Product')){for(const offer of [].concat(value.offers||[])){if(!sameUrl(offer.url||value.url||value['@id'])||offer.priceCurrency!=='TRY')continue;const price=Number(offer.price);if(Number.isFinite(price)&&price>0&&price<=1000000)candidates.push(price);}}}
 for(const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){if(!/\btype\s*=\s*(?:"application\/ld\+json"|'application\/ld\+json'|application\/ld\+json(?:\s|$))/i.test(match[1]))continue;try{visit(JSON.parse(match[2]));}catch{}}
 const unique=[...new Set(candidates)];if(unique.length!==1)throw new Error('PRICE_UNVERIFIED');return unique[0];
}
