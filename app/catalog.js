// Manually observed on the official product pages on 2026-10-11.
// These are dated snapshots, never a live feed or SKU-level stock claim.
export const starterProducts = [
 {id:'lcw-W63566Z8-2WM',store:'LC Waikiki',name:'Bisiklet yaka penye erkek tişört',code:'W63566Z8-2WM',category:'Tişört',color:'Açık mor',size:'Seçilmedi',material:'Doğrulanmadı',stock:'Beden bazında doğrulanmadı',url:'https://www.lcw.com/bisiklet-yaka-penye-erkek-tisort-mor-o-5483982',history:[{price:199.99,date:'2026-10-11',source:'Mağaza sayfasında manuel gözlem'}]},
 {id:'df-I7184AXBK81',store:'DeFacto',name:'Regular fit basic erkek tişört',code:'I7184AXBK81',category:'Tişört',color:'Siyah',size:'Seçilmedi',material:'%71 pamuk, %29 polyester',stock:'Beden bazında doğrulanmadı',url:'https://www.defacto.com.tr/regular-fit-bisiklet-yaka-basic-tisort-3524472',history:[{price:499.99,date:'2026-10-11',source:'Mağaza sayfasında manuel gözlem'}]}
];
export const storageKey = 'pricepilot-apparel-v1';
export function safeUrl(value){try{const u=new URL(value);return u.protocol==='https:'&&['lcw.com','www.lcw.com','defacto.com.tr','www.defacto.com.tr'].includes(u.hostname)&&!u.username&&!u.password?u.href:null;}catch{return null;}}
function validDate(value){return typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(Date.parse(value+'T12:00:00Z'))&&new Date(value+'T12:00:00Z').toISOString().slice(0,10)===value;}
export function validProducts(rows){return Array.isArray(rows)&&rows.length<=500&&rows.every(p=>p&&['id','store','name','code','category','color','size','material','stock','url'].every(k=>typeof p[k]==='string')&&['LC Waikiki','DeFacto'].includes(p.store)&&safeUrl(p.url)&&Array.isArray(p.history)&&p.history.length>0&&p.history.length<=500&&p.history.every(h=>h&&Number.isFinite(h.price)&&h.price>0&&h.price<=1000000&&validDate(h.date)&&typeof h.source==='string'));}
export function lastPrice(p){return p.history[p.history.length-1].price;}
export function csvText(rows){const cell=value=>'"'+String(value).replace(/^[\s]*[=+@-]/,"'$&").replaceAll('"','""')+'"';return '\uFEFF'+[['Mağaza','Ürün','Ürün kodu','Kategori','Renk','Beden','Fiyat TRY','Kayıt tarihi','Kaynak','Bağlantı'],...rows.map(p=>{const h=p.history.at(-1);return [p.store,p.name,p.code,p.category,p.color,p.size,h.price,h.date,h.source,p.url];})].map(r=>r.map(cell).join(';')).join('\r\n');}
