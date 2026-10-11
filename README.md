# AI PricePilot — Türkiye giyim başlangıç sürümü

LC Waikiki ve DeFacto ürünleri için ücretsiz Next.js fiyat kayıt paneli.

## Çalışan özellikler

- İki gerçek ürün bağlantısı; 11 Ekim 2026 tarihli manuel gözlem fiyatları.
- LC Waikiki: W63566Z8-2WM, açık mor tişört, gözlemlenen indirimli fiyat 199,99 TRY.
- DeFacto: I7184AXBK81, siyah tişört, gözlemlenen fiyat 499,99 TRY.
- Ürün ekleme/silme, mağaza/kategori/ürün kodu/renk arama.
- Elle yeni fiyat kaydetme; önceki kayıtları koruyan tarihli fiyat geçmişi.
- Kaynak ve tarih içeren CSV dışa aktarma.
- Farklı markalar arasında açıkça etiketlenen benzer kategori karşılaştırması.
- Tarayıcı localStorage kaydı; önceki demo verileri ayrı anahtarda korunur.

## Veri sınırları

Bu sürüm iki seçili üründe sayfa açıkken otomatik fiyat kontrolü yapar. Başlangıç fiyatları resmi mağaza sayfalarında tarayıcı ile bir kez gözlemlenmiştir; fiyatlar zaman içinde değişebilir. Diğer ürünlerin sonraki kayıtları kullanıcı tarafından elle girilir. Beden bazlı stok ve satın alınabilirlik doğrulanmadı. Renk, kumaş ve kalite farklı olabilir. Kargo, sepete özel kampanya ve kuponlar karşılaştırmaya dahil değildir. Tek kayıt gerçek geçmiş grafik olarak sunulmaz.

Genel mağaza kataloğu için resmî fiyat akışı bağlı değildir. Sayfa kapalıyken zamanlanmış takip ve e-posta bildirimi çalışmaz. Gerçek yapay zekâ, ödeme, kimlik doğrulama ve sunucu veritabanı yoktur. API anahtarı ve ücretli servis gerekmez.

## Çalıştırma

Node.js 22 veya 24 LTS önerilir.

```sh
npm ci
npm run dev
npm run build
npm start
```

## Yayın

https://ai-pricepilot.vercel.app

Vercel Hobby çalışma alanı `murat13`, GitHub `kejan2514/ai-pricepilot`, üretim dalı `main`. GitHub'a gönderilen değişiklikler Vercel tarafından dağıtılır. Ücretli plan veya servis açmayın. Ortam değişkeni gerekmez.

## Otomatik veri için gerekli sonraki aşama

Mağazadan kullanım yetkisi olan API/feed erişimi gerekir. Akış bağlandığında ürün kodu, varyant, gerçek kontrol zamanı, stok ve hata durumu saklanmalı; başarısız istek eski fiyatı güncel gibi göstermemelidir. Sunucu tarafında URL allowlist, SSRF koruması, veri doğrulama, istek sınırı ve uygun kalıcı kayıt gerekir. Bu işlevler henüz uygulanmadı.

## Otomatik fiyat kontrolü (yeni)

`/api/prices` başlangıç listesindeki iki sabit ürün URL'sini sunucudan kontrol eder. Kullanıcı URL'si sunucuya verilmez; yönlendirmeler reddedilir, 12 saniye zaman aşımı ve 2 MB sınırı uygulanır. Yalnızca eşleşen ürün URL'sinin TRY para birimindeki tek, geçerli JSON-LD Offer fiyatı kabul edilir. Belirsiz fiyat, engellenen erişim veya hata eski kaydı değiştirmez. Beden stokları bu kontrolden çıkarılmaz.

Panel açılışta ve görünürken 30 dakikada bir kontrolü çağırır. Vercel önbelleği 30 dakikadır; gerçek kaynak kontrol zamanı panelde gösterilir. Sayfa kapalıyken arka plan cron'u yoktur. Fiyat geçmişi bu tarayıcıda saklanır. Resmî mağaza API entegrasyonu veya ticari veri akışı değildir; mağaza sayfa yapısı/erişim politikası değişirse kontrol başarısız olabilir.

Genel katalog entegrasyonu ve e-posta bildirimleri halen bağlı değildir.
