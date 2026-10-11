# AI PricePilot — Türkiye giyim markaları

Ücretsiz Next.js paneli: 36 marka/mağaza dizini, kullanıcı ürün listesi ve ürün bazında fiyat kontrolü. Dizinde bulunmak doğrulanmış canlı API/katalog entegrasyonu anlamına gelmez.

## Çalışan özellikler

- LC Waikiki, DeFacto, Koton, Mavi, Colin’s, LTB, Zara, H&M, Mango, Pull&Bear, Bershka, Stradivarius, Massimo Dutti, Oysho, İpekyol, Twist, adL, Roman, Nocturne, Beymen, Boyner, Vakko, Network, Damat Tween, D’S Damat, Altınyıldız Classics, Kiğılı, Ramsey, Avva, U.S. Polo Assn., Penti, Suwen, adidas, Nike, Puma ve Decathlon.
- Marka arama/grup filtreleri, resmî mağaza bağlantıları ve markadan ürün formuna geçiş.
- Her markada kullanıcı ürün ekleme/silme ve tarihli manuel fiyat geçmişi.
- Ürün kartından otomatik sayfa fiyatı kontrolü. Sonuç ve kaynak kontrol zamanı açıkça gösterilir; erişim engeli veya belirsiz fiyat önceki kaydı değiştirmez.
- Herhangi iki farklı mağazadan aynı kategoride ürün karşılaştırması; aynı ürün oldukları iddia edilmez.
- CSV dışa aktarımı, formül enjeksiyonu kaçışları; tarayıcı localStorage kalıcılığı.
- Mevcut v1 kayıtları korunur. Koton başlangıç kaydı mevcut listelere bir defa eklenir; 500 ürün sınırında eklenmez. Eski demo anahtarı değiştirilmez.

## Veri kapsamı

Başlangıçta üç resmî ürün sayfasının 11 Ekim 2026 tarihli kayıtları bulunur: LC Waikiki W63566Z8-2WM 199,99 TRY; DeFacto I7184AXBK81 499,99 TRY; Koton 7WAM10002MK beyaz tişört 299,99 TRY. Başlangıç ürünleri açılışta ve sayfa görünürken 30 dakikada bir kontrol edilir. Diğer eklenen ürünler karttaki düğmeyle kontrol edilir.

Fiyat okuyucu yalnızca ürünün eşleşen URL'sine ait JSON-LD Product/Offer içindeki tek geçerli TRY fiyatını kabul eder. Yanlış ürün, belirsiz/varyant fiyatları, diğer para birimleri, erişim engelleri ve fiyat içermeyen sayfalar reddedilir. Her markanın her ürününde çalışması garanti değildir; mağaza sayfa yapısı/erişim politikası değişebilir. Bir üründe başarı tüm marka kataloğunu doğrulamaz. DeFacto önceki Vercel üretim testinde HTTP 403 döndürmüştür. Diğer markalar başlangıçta "henüz doğrulanmadı" durumundadır.

36 giriş Türkiye’deki bütün markaların eksiksiz listesi değildir. Boyner/Beymen gibi çok markalı mağazalar mağaza olarak takip edilir. Kargo, kupon, sepete özel kampanyalar, kalite, beden bazlı stok ve satın alınabilirlik doğrulanmaz. Resmî ortaklık, API/feed, tüm katalog aktarımı, yapay zekâ, ödeme, kullanıcı hesabı, sunucu veritabanı veya e-posta bildirimleri bağlı değildir. Sayfa kapalıyken zamanlanmış takip yoktur. Ücretli servis veya API anahtarı gerekmez.

## API ve istek sınırları

GET /api/prices: üç sabit başlangıç ürününü kontrol eder; 30 dakika CDN önbelleği.
POST /api/prices: {id,store,url} ile tek ürün; uygulama origin kontrolü ve sabit resmî hostname listesi, HTTPS/standart port, kullanıcı adı/parola reddi, yönlendirme reddi, 12 saniye süre, 2 MB kaynak/3 KB istek sınırı. Host ve marka eşleşmeli; kullanıcıya başka ağ hedefleri sunulmaz.

Sonuçlar (hatalar dahil) sunucu örneğinde 30 dakika, en fazla 300 URL için önbellekte tutulur; eşzamanlı aynı URL istekleri birleştirilir. POST sunucu örneğinde dakikada 60 ve en fazla 8 aktif isteğe sınırlandırılır. Bu bellek içi sınırlar dağıtık kota değildir; sunucu yeniden başladığında sıfırlanır. Büyük/çok kullanıcılı kullanım için kalıcı dağıtık kota ve izinli mağaza veri akışı gerekir. Tarihler gerçek kontrol zamanını korur.

## Çalıştırma ve yayın

Node.js 22/24 LTS: npm ci, npm run dev, npm run build, npm start.

https://ai-pricepilot.vercel.app — Vercel Hobby murat13, GitHub kejan2514/ai-pricepilot main. Ortam değişkeni ve ücretli hizmet gerekmiyor. Kripto projelerine dokunulmaz.
