export type Language = 'en' | 'it' | 'tr'

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
]

export const brandNames: Record<Language, { short: string; full: string }> = {
  en: { short: 'F2P', full: 'Farm to Table' },
  it: { short: 'F2P', full: 'Dal Campo alla Tavola' },
  tr: { short: 'TÇ', full: 'Tarladan Çıkan' },
}

export const nav = {
  shop: { en: 'Shop', it: 'Negozio', tr: 'Mağaza' },
  about: { en: 'About', it: 'Chi Siamo', tr: 'Hakkımızda' },
  producers: { en: 'Producers', it: 'Produttori', tr: 'Üreticiler' },
  recipes: { en: 'Recipes', it: 'Ricette', tr: 'Tarifler' },
  events: { en: 'Events', it: 'Eventi', tr: 'Etkinlikler' },
  login: { en: 'Log in', it: 'Accedi', tr: 'Giriş' },
  join: { en: 'Join', it: 'Registrati', tr: 'Kayıt Ol' },
  cart: { en: 'Cart', it: 'Carrello', tr: 'Sepet' },
}

export const home = {
  heroTitle: { en: 'The Farmers Market Delivered', it: 'Il Mercato Contadino Consegnato', tr: 'Çiftlik Marketi Kapınızda' },
  heroSubtitle: { en: 'Fresh local produce, delivered to your door.', it: 'Prodotti locali freschi, consegnati a casa tua.', tr: 'Taze yerel ürünler, kapınıza teslim edilir.' },
  shopNow: { en: 'Shop Now', it: 'Acquista Ora', tr: 'Şimdi Al' },
  learnMore: { en: 'Learn More', it: 'Scopri di Più', tr: 'Daha Fazla' },
  howItWorks: { en: 'How It Works', it: 'Come Funziona', tr: 'Nasıl Çalışır' },
  step1Title: { en: 'Shop on Your Schedule', it: 'Acquista Quando Vuoi', tr: 'İstediğiniz Zaman Alışveriş Yapın' },
  step1Desc: { en: 'Subscribe to your favorites or place one-time orders.', it: 'Iscriviti ai preferiti o ordina subito.', tr: 'Favorilerinize abone olun veya tek seferlik sipariş verin.' },
  step2Title: { en: 'We Harvest Your Food', it: 'Raccogliamo il Tuo Cibo', tr: 'Ürünleri Topluyoruz' },
  step2Desc: { en: 'By ordering only what we need, we keep waste under 1%.', it: 'Ordinando solo ciò di cui abbiamo bisogno.', tr: 'İhtiyacımız olan kadar sipariş vererek israfı %1\'in altında tutuyoruz.' },
  step3Title: { en: 'Delivered to Your Door', it: 'Consegnato a Casa Tua', tr: 'Kapınıza Teslim' },
  step3Desc: { en: 'On your delivery day, we bring your box right to you.', it: 'Il giorno della consegna, portiamo tutto a te.', tr: 'Teslimat gününde kutunu size getiriyoruz.' },
  shopByCategory: { en: 'Shop by Category', it: 'Acquista per Categoria', tr: 'Kategoriye Göre Alışveriş' },
  freshFromFarms: { en: 'Fresh from local farms to your table', it: 'Fresco dalle fattorie alla tua tavola', tr: 'Yerel çiftliklerden sofranıza' },
  featuredProducts: { en: 'Featured Products', it: 'Prodotti in Evidenza', tr: 'Öne Çıkan Ürünler' },
  viewAll: { en: 'View All →', it: 'Vedi Tutto →', tr: 'Tümünü Gör →' },
  whatSetsUsApart: { en: 'What Sets Us Apart', it: 'Cosa Ci Distingue', tr: 'Bizi Farklı Kılan' },
  grownTodayDelivered: { en: 'Grown Today, Delivered Tomorrow', it: 'Coltivato Oggi, Consegnato Domani', tr: 'Bugün Toplanı Yarın Teslim' },
  freshProduceNutrients: { en: 'Fresh produce with maximum nutrients.', it: 'Prodotti freschi pieni di nutrienti.', tr: 'Maksimum besin değerine sahip taze ürünler.' },
  localProducts: { en: '800+ Local Products', it: '800+ Prodotti Locali', tr: '800+ Yerel Ürün' },
  sustainableGroceries: { en: 'Sustainable groceries from trusted farmers.', it: 'Generi sostenibili da agricoltori fidati.', tr: 'Güvenilir çiftçilerden sürdürülebilir ürünler.' },
  subscribeSave: { en: 'Subscribe & Save', it: 'Abbonati e Risparmia', tr: 'Abone Ol ve Tasarruf Et' },
  autopilotDelivery: { en: 'Set favorites on autopilot.', it: 'Imposta i preferiti su automatico.', tr: 'Favorilerinizi otomatik olarak ayarlayın.' },
  freshToInbox: { en: 'Fresh to Your Inbox', it: 'Fresco nella Tua Casella', tr: 'Posta Kutunuza Taze' },
  signUpNewsletter: { en: 'Sign up for recipes and special offers.', it: 'Iscriviti per ricette e offerte.', tr: 'Tarifler ve özel teklifler için kayıt olun.' },
  emailPlaceholder: { en: 'Enter your email', it: 'Inserisci la tua email', tr: 'E-posta adresinizi girin' },
  signUp: { en: 'Sign Up', it: 'Iscriviti', tr: 'Kayıt Ol' },
}

export const shop = {
  allProducts: { en: 'All Products', it: 'Tutti i Prodotti', tr: 'Tüm Ürünler' },
  sortBy: { en: 'Sort by', it: 'Ordina per', tr: 'Sırala' },
  sortName: { en: 'Name', it: 'Nome', tr: 'İsim' },
  sortPriceLow: { en: 'Price: Low to High', it: 'Prezzo: Basso to Alto', tr: 'Fiyat: Düşükten Yükseğe' },
  sortPriceHigh: { en: 'Price: High to Low', it: 'Prezzo: Alto to Basso', tr: 'Fiyat: Yüksekten Düşüğe' },
  inStock: { en: 'In Stock', it: 'Disponibile', tr: 'Stokta' },
  outOfStock: { en: 'Out of Stock', it: 'Non Disponibile', tr: 'Stokta Yok' },
  products: { en: 'products', it: 'prodotti', tr: 'ürün' },
}

export const cart = {
  yourCart: { en: 'Your Cart', it: 'Il Tuo Carrello', tr: 'Sepetiniz' },
  empty: { en: 'Your cart is empty', it: 'Il carrello è vuoto', tr: 'Sepetiniz boş' },
  emptyDesc: { en: 'Looks like you haven\'t added any items yet.', it: 'Non hai aggiunto nulla ancora.', tr: 'Henüz ürün eklememişsiniz.' },
  startShopping: { en: 'Start Shopping', it: 'Inizia lo Shopping', tr: 'Alışverişe Başla' },
  orderSummary: { en: 'Order Summary', it: 'Riepilogo Ordine', tr: 'Sipariş Özeti' },
  subtotal: { en: 'Subtotal', it: 'Subtotale', tr: 'Ara Toplam' },
  delivery: { en: 'Delivery', it: 'Consegna', tr: 'Teslimat' },
  free: { en: 'Free', it: 'Gratis', tr: 'Ücretsiz' },
  total: { en: 'Total', it: 'Totale', tr: 'Toplam' },
  proceedCheckout: { en: 'Proceed to Checkout', it: 'Vai al Pagamento', tr: 'Ödemeye Geç' },
  freeDelivery: { en: 'Free delivery on orders over $50', it: 'Consegna gratis sopra $50', tr: '50$ üstü siparişlerde ücretsiz teslimat' },
  remove: { en: 'Remove', it: 'Rimuovi', tr: 'Kaldır' },
}

export const product = {
  addToCart: { en: 'Add to Cart', it: 'Aggiungi al Carrello', tr: 'Sepete Ekle' },
  addedToCart: { en: 'Added!', it: 'Aggiunto!', tr: 'Eklendi!' },
  quantity: { en: 'Quantity', it: 'Quantità', tr: 'Adet' },
  productDetails: { en: 'Product Details', it: 'Dettagli Prodotto', tr: 'Ürün Detayları' },
  farm: { en: 'Farm', it: 'Fattoria', tr: 'Çiftlik' },
  category: { en: 'Category', it: 'Categoria', tr: 'Kategori' },
  availability: { en: 'Availability', it: 'Disponibilità', tr: 'Stok Durumu' },
}

export const auth = {
  welcomeBack: { en: 'Welcome Back', it: 'Bentornato', tr: 'Hoş Geldiniz' },
  createAccount: { en: 'Create Account', it: 'Crea Account', tr: 'Hesap Oluştur' },
  joinDesc: { en: 'Join for fresh local produce delivered.', it: 'Unisciti per prodotti freschi.', tr: 'Taze ürünler için kayıt olun.' },
  email: { en: 'Email', it: 'Email', tr: 'E-posta' },
  password: { en: 'Password', it: 'Password', tr: 'Şifre' },
  rememberMe: { en: 'Remember me', it: 'Ricordami', tr: 'Beni Hatırla' },
  forgotPassword: { en: 'Forgot password?', it: 'Password dimenticata?', tr: 'Şifreniz mi unuttunuz?' },
  signIn: { en: 'Sign In', it: 'Accedi', tr: 'Giriş Yap' },
  signingIn: { en: 'Signing in...', it: 'Accesso...', tr: 'Giriş yapılıyor...' },
  fullName: { en: 'Full Name', it: 'Nome Completo', tr: 'Ad Soyad' },
  zipCode: { en: 'ZIP Code', it: 'CAP', tr: 'Posta Kodu' },
  zipDesc: { en: 'We deliver to your area!', it: 'Consegniamo nella tua zona!', tr: 'Bölgenize teslimat yapıyoruz!' },
  createAccountBtn: { en: 'Create Account', it: 'Crea Account', tr: 'Hesap Oluştur' },
  creating: { en: 'Creating...', it: 'Creazione...', tr: 'Oluşturuluyor...' },
  alreadyHaveAccount: { en: 'Already have an account?', it: 'Hai già un account?', tr: 'Zaten hesabınız var mı?' },
  noAccount: { en: 'Don\'t have an account?', it: 'Non hai un account?', tr: 'Hesabınız yok mu?' },
  joinNow: { en: 'Join now', it: 'Registrati', tr: 'Kayıt ol' },
}

export const checkout = {
  checkout: { en: 'Checkout', it: 'Pagamento', tr: 'Ödeme' },
  firstName: { en: 'First Name', it: 'Nome', tr: 'Ad' },
  lastName: { en: 'Last Name', it: 'Cognome', tr: 'Soyad' },
  phone: { en: 'Phone', it: 'Telefono', tr: 'Telefon' },
  address: { en: 'Address', it: 'Indirizzo', tr: 'Adres' },
  city: { en: 'City', it: 'Città', tr: 'Şehir' },
  zip: { en: 'ZIP Code', it: 'CAP', tr: 'Posta Kodu' },
  notes: { en: 'Delivery Notes (Optional)', it: 'Note (Opzionale)', tr: 'Teslimat Notu' },
  placeOrder: { en: 'Place Order', it: 'Effetta Ordine', tr: 'Sipariş Ver' },
  orderConfirmed: { en: 'Order Confirmed!', it: 'Ordine Confermato!', tr: 'Sipariş Onaylandı!' },
  thankYou: { en: 'Thank you!', it: 'Grazie!', tr: 'Teşekkürler!' },
  confirmationEmail: { en: 'You will receive a confirmation email.', it: 'Riceverai una email.', tr: 'Onay e-postası alacaksınız.' },
  continueShopping: { en: 'Continue Shopping', it: 'Continua lo Shopping', tr: 'Alışverişe Devam' },
}

export const producers = {
  title: { en: 'Our Producers', it: 'I Nostri Produttori', tr: 'Üreticilerimiz' },
  subtitle: { en: 'Meet the farmers who bring fresh food.', it: 'Incontra gli agricoltori.', tr: 'Taze yiyecekleri getiren çiftçilerle tanış.' },
  becomeProducer: { en: 'Become a Producer', it: 'Diventa Produttore', tr: 'Üretici Ol' },
  becomeDesc: { en: 'Interested in selling your products?', it: 'Interessato a vendere?', tr: 'Ürünlerinizi satmak ister misiniz?' },
  applyNow: { en: 'Apply Now', it: 'Apply Now', tr: 'Şimdi Başvur' },
}

export const recipes = {
  title: { en: 'Recipes', it: 'Ricette', tr: 'Tarifler' },
  subtitle: { en: 'Delicious recipes with seasonal ingredients.', it: 'Ricette deliziose.',
    tr: 'Mevsimlik malzemelerle lezzetli tarifler.' },
  min: { en: 'min', it: 'min', tr: 'dk' },
  submitRecipe: { en: 'Submit a Recipe', it: 'Invia Ricetta', tr: 'Tarifi Gönder' },
  shareRecipe: { en: 'Want to share?', it: 'Condividere?', tr: 'Paylaşmak ister misiniz?' },
}

export const about = {
  title: { en: 'Our Mission', it: 'La Nostra Missione', tr: 'Misyonumuz' },
  missionDesc: { en: 'Everyone deserves fresh, local food.', it: 'Tutti meritano cibo fresco.', tr: 'Herkes taze yerel gıdayı hak ediyor.' },
  whoWeAre: { en: 'Who We Are', it: 'Chi Siamo', tr: 'Biz Kimiz' },
  whoWeAreDesc: { en: 'Founded to connect farmers with consumers.', it: 'Fondata per connettere agricoltori e consumatori.', tr: 'Çiftçileri tüketicilerle bağlamak için kuruldu.' },
  ourStandards: { en: 'Our Standards', it: 'I Nostri Standard', tr: 'Standartlarımız' },
  localFirstDesc: { en: 'Prioritizing local farmers.', it: 'Prioritizziamo agricoltori locali.', tr: 'Yerel çiftçileri önceliyoruz.' },
  sustainableDesc: { en: 'Sustainable farming methods.', it: 'Metodi sostenibili.', tr: 'Sürdürülebilir tarım.' },
  freshDesc: { en: 'Harvested today, delivered tomorrow.', it: 'Raccolto oggi, consegnato domani.', tr: 'Bugün toplandı, yarın teslim.' },
  fairDesc: { en: 'Fair prices for farmers.', it: 'Prezzi giusti.', tr: 'Çiftçiler için adil fiyatlar.' },
  joinCommunity: { en: 'Join Our Community', it: 'Unisciti', tr: 'Topluluğumuza Katıl' },
  joinCommunityDesc: { en: 'Whether customer or farmer, join us!', it: 'Che tu sia cliente o agricoltore, unisciti!', tr: 'Müşteri veya çiftçi olun, bize katılın!' },
  getStarted: { en: 'Get Started', it: 'Inizia', tr: 'Başla' },
}

export const footer = {
  shop: { en: 'Shop', it: 'Negozio', tr: 'Mağaza' },
  company: { en: 'Company', it: 'Azienda', tr: 'Şirket' },
  support: { en: 'Support', it: 'Supporto', tr: 'Yard��m' },
  aboutUs: { en: 'About Us', it: 'Chi Siamo', tr: 'Hakkımızda' },
  careers: { en: 'Careers', it: 'Lavora con Noi', tr: 'Kariyer' },
  press: { en: 'Press', it: 'Stampa', tr: 'Basın' },
  contact: { en: 'Contact', it: 'Contatti', tr: 'İletişim' },
  faq: { en: 'FAQ', it: 'FAQ', tr: 'SSS' },
  shipping: { en: 'Shipping', it: 'Spedizione', tr: 'Teslimat' },
  returns: { en: 'Returns', it: 'Resi', tr: 'İadeler' },
  giftCards: { en: 'Gift Cards', it: 'Gift Card', tr: 'Hediye Kartı' },
  privacy: { en: 'Privacy', it: 'Privacy', tr: 'Gizlilik' },
  terms: { en: 'Terms', it: 'Termini', tr: 'Şartlar' },
  allRights: { en: 'All Rights Reserved', it: 'Diritti Riservati', tr: 'Tüm Hakları Saklıdır' },
}

export const translations = {
  nav,
  home,
  shop,
  cart,
  product,
  auth,
  checkout,
  producers,
  recipes,
  about,
  footer,
}

export function t(category: keyof typeof translations, key: string, lang: Language): string {
  const cat = translations[category]
  if (!cat) return key
  const item = cat as Record<string, Record<Language, string>>
  return item[key]?.[lang] || key
}

export function getTranslator(lang: Language) {
  return {
    t: (category: keyof typeof translations, key: string) => t(category, key, lang),
  }
}