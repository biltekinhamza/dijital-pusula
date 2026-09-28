"use strict";

/* changelog.js — sürüm notları sayfasının DİL BAĞIMLI arayüz metni (başlık,
   sütun etiketleri, tür etiketleri). Sürüm/yol haritası VERİSİ (releases[],
   roadmap[]) dilden bağımsız src/content/changelog.js'te — ADR-10 kapı
   kuralı gereği boş kalır (S9 onayı bekliyor). Bu dosya yalnız çerçeve
   metnidir, uydurma sürüm notu içermez. Rota kapalı olsa da (routes.js
   changelog enabled:false) bu anahtarlar var olmalı — arayuz-gelistirici
   İTİRAZ maddesi 5: enabled:true yapıldığında derleme eksik anahtarla
   kırılmasın. */

module.exports = {
  "title": "Sürüm notları",
  "lead": "Neyin yapıldığını, neyin sırada olduğunu burada görürsünüz.",
  "roadmap": {
    "heading": "Sırada ne var",
    "inprogress": "Yapılıyor",
    "planned": "Planlandı",
    "considering": "Değerlendiriliyor",
    "empty": "Şu an bu aşamada madde yok"
  },
  "releasesHeading": "Sürümler",
  "type": {
    "new": "Yeni",
    "fix": "Düzeltme",
    "improvement": "İyileştirme"
  }
};
