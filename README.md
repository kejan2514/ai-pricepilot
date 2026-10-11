# AI PricePilot

Türkçe, Next.js App Router tabanlı ücretsiz fiyat karşılaştırma **demo MVP**.

## Çalışan özellikler

- Örnek ürünler ve elle ürün/rakip fiyatı ekleme; ürün silme.
- Arama, kategori filtresi, TRY fiyat karşılaştırması ve örnek fiyat geçmişi.
- Açıkça etiketlenmiş fiyat simülasyonu ve kural tabanlı demo önerileri.
- Görünen ürünleri CSV olarak indirme.
- Tarayıcı localStorage kaydı ve demo sıfırlama. Kayıt cihazlar arasında paylaşılmaz.
- Mobil uyumlu panel; harici görsel veya yazı tipi hizmeti yok.

## Demo sınırları

Canlı mağaza verisi, scraping, zamanlanmış takip, gerçek yapay zekâ, kimlik doğrulama, sunucu veritabanı, e-posta bildirimleri, ödeme ve otomatik fiyat değiştirme **yoktur**. Ürün bağlantıları referanstır; bağlantıdan veri çekilmez. Fiyat farkları satış/kazanç tahmini değildir. Hassas bilgi girmeyin. Bu sürüm çok kullanıcılı bir SaaS değildir.

## Yerel çalıştırma

Node.js 22 veya 24 LTS kullanın.

```sh
npm ci
npm run dev
```

http://localhost:3000 adresini açın.

```sh
npm run build
npm start
```

## Vercel

Bu sürüm ortam değişkeni, API anahtarı, ücretli servis veya veritabanı gerektirmez.

1. Vercel hesabınızda uygun ücretsiz çalışma alanını seçin; ücretli plan başlatmayın.
2. New Project / Import Git Repository altında `kejan2514/ai-pricepilot` deposunu seçin.
3. Next.js, kök dizin `./`, build `npm run build`; varsayılan çıktı ayarını kullanın.
4. Deploy seçin. Vercel GitHub erişimi isterse yalnızca bu depoya izin verin.

Yayınlama bu çalışma sırasında yapılmadı: bağlantı erişilebilir ekip ve proje döndürmedi. Canlı URL ancak başarılı dağıtım sonrasında oluşur.

## Gerçek veri için sonraki aşama

Önce izinli bir veri kaynağı/API belirlenmeli. Ardından sunucu tarafında doğrulanmış veri alma, zaman damgası ve kaynak kaydı, güvenli veri tabanı ve kullanıcı hesapları eklenmeli. URL üzerinden veri alma eklenirse SSRF koruması gerekir. Ücretli servis ve abonelikler ayrıca kullanıcı onayı gerektirir.
