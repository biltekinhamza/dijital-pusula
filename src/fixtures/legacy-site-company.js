/* DONDURULMUŞ KOPYA — elle düzenlenmez.
   G2'de kullanılan js/translations.js'in SITE_COMPANY bloğu, G7'de dosya
   silinmeden hemen önce `git show HEAD:js/translations.js` ile birebir
   çıkarıldı (satır 1-38, ETKI-ANALIZI.md §1.1). Amaç: company.js'e
   taşımanın alan alan doğru olduğunu sınayan company.test.js'in, eski
   dosya kökten silindikten sonra da çalışabilmesi. Orijinal dosyanın tam
   hali git geçmişinde durur (ETKI-ANALIZI.md §8).

   Aşağısı o dosyanın 1-38. satırlarının değiştirilmemiş metnidir: */

/* Dijital Pusula - site icerik katmani (TR / EN).
   Butun sayfalar bu tek katalogu paylasir. main.js icindeki t("a.b.c")
   noktali yol cozumlemesi dogrudan bu agac uzerinde calisir; sayfa
   markup'inda data-i18n="a.b.c" yazmak yeterlidir.

   YAYIN ONCESI DEGISTIRILECEK TEK YER: asagidaki COMPANY blogu. */

window.SITE_COMPANY = {
  /* Gercek sirket bilgileriyle degistirin. Sitede gecen her yerde bu
     degerler kullanilir; baska bir dosyada tekrarlanmaz.

     ZORUNLULUK NOTU: Elektronik Ticaret Hizmet Saglayicilar Hakkinda
     Yonetmelik (RG 29/12/2022, 32058) MADDE 5, ana sayfada "Iletisim"
     basligi altinda dogrudan erisilebilir sekilde sunlari sart kosar:
       - tacir icin:  ticaret unvani + MERSIS numarasi + merkez adresi
       - esnaf icin:  ad soyad + vergi kimlik numarasi + merkez adresi
       - her halde:   KEP adresi, e-posta, telefon
       - mensubu olunan meslek odasi ve davranis kurallari bilgisi
     Hangi kategoriye girdiginizi (dolayisiyla MERSIS mi VKN mi
     yazacaginizi) mali musavirinize sorun. Bos birakilan alanlar
     sitede hic gosterilmez. */
  legalName: "Hamza Biltekin",            // esnaf/sahis isletmesi varsayimi - tacirseniz ticaret unvanini yazin
  brandName: "Dijital Pusula",            // Isletme adi / marka - sitede gorunen ad
  email: "biltekinhamza@gmail.com",
  phone: "+90 539 219 19 82",
  phoneHref: "+905392191982",             // bos ise tel: linki verilmez
  whatsapp: "905392191982",               // bos ise WhatsApp butonu gizlenir
  kep: "",                                // KEP adresi - ZORUNLU (yonetmelik md.5)
  addressTr: "Bahçelievler Mahallesi, Merkez / Isparta",
  addressEn: "Bahçelievler District, Merkez / Isparta, Türkiye",
  taxOffice: "",                          // Vergi dairesi
  taxNumber: "",                          // VKN / TCKN
  mersis: "",                             // MERSIS (tacir ise)
  chamber: "",                            // Mensubu olunan meslek odasi
  chamberUrl: "",                         // Odanin davranis kurallarina erisim adresi
  github: "https://github.com/biltekinhamza",
  linkedin: ""                            // bos ise LinkedIn baglantisi gizlenir
};
