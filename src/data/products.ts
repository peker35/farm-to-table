export const categories = [
  { 
    name: 'Seasonal Produce', 
    nameEn: 'Seasonal Produce', 
    nameIt: 'Prodotti di Stagione', 
    nameTr: 'Mevsimsel Ürünler', 
    slug: 'produce', 
    image: 'https://cdn.sanity.io/images/ec9j7ju7/production/6a4117a18825e6c3d8d708548cbfaa9ef75692e5-1878x1252.jpg' 
  },
  { 
    name: 'Meat & Seafood', 
    nameEn: 'Meat & Seafood', 
    nameIt: 'Carne & Pesce', 
    nameTr: 'Et & Deniz Ürünleri', 
    slug: 'meat-seafood', 
    image: 'https://cdn.sanity.io/images/ec9j7ju7/production/9161ac8bd1465be3343b8cced765105ddc89fc26-4406x2938.jpg' 
  },
  { 
    name: 'Dairy & Eggs', 
    nameEn: 'Dairy & Eggs', 
    nameIt: 'Latticini & Uova', 
    nameTr: 'Süt Ürünleri & Yumurta', 
    slug: 'dairy-eggs', 
    image: 'https://cdn.sanity.io/images/ec9j7ju7/production/19d1bf4db48bd78567ec68d44b178d6415fea671-6000x4000.jpg' 
  },
  { 
    name: 'Bakery', 
    nameEn: 'Bakery', 
    nameIt: 'Panetteria', 
    nameTr: 'Fırın', 
    slug: 'bakery', 
    image: 'https://cdn.sanity.io/images/ec9j7ju7/production/810a7bd5123ff298af19d5dfb801b0a9c5012127-4000x4000.jpg' 
  },
  { 
    name: 'Pantry', 
    nameEn: 'Pantry', 
    nameIt: 'Dispensa', 
    nameTr: 'Kiler', 
    slug: 'pantry', 
    image: 'https://cdn.sanity.io/images/ec9j7ju7/production/c9551c6ea8c617a335ec901dec8a7daaea905291-3674x4592.jpg' 
  },
  { 
    name: 'Easy Meals', 
    nameEn: 'Easy Meals', 
    nameIt: 'Pasti Pronti', 
    nameTr: 'Hazır Yemekler', 
    slug: 'easy-meals', 
    image: 'https://cdn.sanity.io/images/ec9j7ju7/production/95a9ef02190e8c8506955f5b78d9724c1b42e7fc-2000x2498.png' 
  },
  { 
    name: 'Drinks', 
    nameEn: 'Drinks', 
    nameIt: 'Bevande', 
    nameTr: 'İçecekler', 
    slug: 'drinks', 
    image: 'https://cdn.sanity.io/images/ec9j7ju7/production/3febcb3817689902399959cb464b4901d2eabe51-4985x3540.jpg' 
  },
  { 
    name: 'Farm Boxes', 
    nameEn: 'Farm Boxes', 
    nameIt: 'Boxe Fattoria', 
    nameTr: 'Çiftlik Kutuları', 
    slug: 'farm-boxes', 
    image: 'https://cdn.sanity.io/images/ec9j7ju7/production/a528255f769ecc20c7307ec9fe935f2fc69d034f-1664x1554.png' 
  },
]

export const products = [
  { id: 1, name: 'Heirloom Tomatoes', nameEn: 'Heirloom Tomatoes', nameIt: 'Pomodori Antichi', nameTr: 'Miras Domatesleri', price: 6.99, category: 'produce', farm: 'Hilltop Farm', farmEn: 'Hilltop Farm', farmIt: 'Fattoria Hilltop', farmTr: 'Hilltop Çiftliği', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400', inStock: true },
  { id: 2, name: 'Mixed Baby Greens', nameEn: 'Mixed Baby Greens', nameIt: 'Misti Verdi Baby', nameTr: 'Karışık Bebek Yeşillikleri', price: 5.99, category: 'produce', farm: 'Green Valley', farmEn: 'Green Valley', farmIt: 'Valle Verde', farmTr: 'Yeşil Vadi', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', inStock: true },
  { id: 3, name: 'Fresh Eggs (Dozen)', nameEn: 'Fresh Eggs (Dozen)', nameIt: 'Uova Fresche (Dozzina)', nameTr: 'Taze Yumurta (Düzin)', price: 7.99, category: 'dairy-eggs', farm: 'Sunny Acres', farmEn: 'Sunny Acres', farmIt: 'Sunny Acres', farmTr: 'Güneşli Çiftlik', image: 'https://images.unsplash.com/photo-1569288052389-d3fd5d1afbc4?w=400', inStock: true },
  { id: 4, name: 'Artisan Sourdough', nameEn: 'Artisan Sourdough', nameIt: 'Lievitazione Naturale', nameTr: 'Zanaatkär Ekmek', price: 8.99, category: 'bakery', farm: 'She Wolf Bakery', farmEn: 'She Wolf Bakery', farmIt: 'She Wolf Bakery', farmTr: 'She Wolf Fırını', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', inStock: true },
  { id: 5, name: 'Grass-Fed Ground Beef', nameEn: 'Grass-Fed Ground Beef', nameIt: 'Manzo Macinato Erba', nameTr: 'Otla Beslenen Kıyma', price: 12.99, category: 'meat-seafood', farm: 'Meadow Raised', farmEn: 'Meadow Raised', farmIt: 'Meadow Raised', farmTr: 'Meadow Yetiştiricilik', image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=400', inStock: true },
  { id: 6, name: 'Organic Milk (Half Gallon)', nameEn: 'Organic Milk (Half Gallon)', nameIt: 'Latte Biologico', nameTr: 'Organik Süt', price: 5.99, category: 'dairy-eggs', farm: 'Dairy Lane', farmEn: 'Dairy Lane', farmIt: 'Dairy Lane', farmTr: 'Süt Yolu', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', inStock: true },
  { id: 7, name: 'Organic Carrots', nameEn: 'Organic Carrots', nameIt: 'Carote Biologiche', nameTr: 'Organik Havuç', price: 4.99, category: 'produce', farm: 'Root & Harvest', farmEn: 'Root & Harvest', farmIt: 'Root & Harvest', farmTr: 'Kök & Hasat', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400', inStock: true },
  { id: 8, name: 'Raw Honey', nameEn: 'Raw Honey', nameIt: 'Miele Grezzo', nameTr: 'Ham Bal', price: 14.99, category: 'pantry', farm: 'Bee Happy Apiaries', farmEn: 'Bee Happy Apiaries', farmIt: 'Bee Happy Apiaries', farmTr: 'Bee Happy Arıcılık', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400', inStock: true },
  { id: 9, name: 'Fresh Basil', nameEn: 'Fresh Basil', nameIt: 'Basilico Fresco', nameTr: 'Taze Fesleğen', price: 3.99, category: 'produce', farm: 'Green Valley', farmEn: 'Green Valley', farmIt: 'Valle Verde', farmTr: 'Yeşil Vadi', image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400', inStock: true },
  { id: 10, name: 'Yellow Onions', nameEn: 'Yellow Onions', nameIt: 'Cipolle Gialle', nameTr: 'Sarı Soğan', price: 3.49, category: 'produce', farm: 'Root & Harvest', farmEn: 'Root & Harvest', farmIt: 'Root & Harvest', farmTr: 'Kök & Hasat', image: 'https://images.unsplash.com/photo-1593062096033-9a26d09e7001?w=400', inStock: true },
  { id: 11, name: 'Garlic Bulbs', nameEn: 'Garlic Bulbs', nameIt: 'Bulbi d\'Aglio', nameTr: 'Sarımsak Başları', price: 4.49, category: 'produce', farm: 'Hilltop Farm', farmEn: 'Hilltop Farm', farmIt: 'Fattoria Hilltop', farmTr: 'Hilltop Çiftliği', image: 'https://images.unsplash.com/photo-1540148426945-76cf64f42c52?w=400', inStock: true },
  { id: 12, name: 'Red Potatoes', nameEn: 'Red Potatoes', nameIt: 'Patate Rosse', nameTr: 'Kırmızı Patates', price: 5.99, category: 'produce', farm: 'Root & Harvest', farmEn: 'Root & Harvest', farmIt: 'Root & Harvest', farmTr: 'Kök & Hasat', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400', inStock: true },
  { id: 13, name: 'Chicken Breast', nameEn: 'Chicken Breast', nameIt: 'Petto di Pollo', nameTr: 'Tavuk Göğsü', price: 11.99, category: 'meat-seafood', farm: 'Sunny Acres', farmEn: 'Sunny Acres', farmIt: 'Sunny Acres', farmTr: 'Güneşli Çiftlik', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400', inStock: true },
  { id: 14, name: 'Wild Salmon', nameEn: 'Wild Salmon', nameIt: 'Salmone Selvaggio', nameTr: 'Yaban Somon', price: 18.99, category: 'meat-seafood', farm: 'Ocean Catch', farmEn: 'Ocean Catch', farmIt: 'Ocean Catch', farmTr: 'Okyanus Yakalama', image: 'https://images.unsplash.com/photo-1574781330855-d0db7b6be7a1?w=400', inStock: true },
  { id: 15, name: 'Bacon (1 lb)', nameEn: 'Bacon (1 lb)', nameIt: 'Pancetta (1 lb)', nameTr: 'Pastırma (1 lb)', price: 9.99, category: 'meat-seafood', farm: 'Meadow Raised', farmEn: 'Meadow Raised', farmIt: 'Meadow Raised', farmTr: 'Meadow Yetiştiricilik', image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=400', inStock: true },
  { id: 16, name: 'Aged Cheddar', nameEn: 'Aged Cheddar', nameIt: 'Cheddar Invecchiato', nameTr: 'Olgunlaşmış Çedar', price: 8.99, category: 'dairy-eggs', farm: 'Dairy Lane', farmEn: 'Dairy Lane', farmIt: 'Dairy Lane', farmTr: 'Süt Yolu', image: 'https://images.unsplash.com/photo-1618156762348-d7d2e84e5c65?w=400', inStock: true },
  { id: 17, name: 'Greek Yogurt (32oz)', nameEn: 'Greek Yogurt (32oz)', nameIt: 'Yogurt Greco (32oz)', nameTr: 'Yunan Yoğurdu (32oz)', price: 6.99, category: 'dairy-eggs', farm: 'Dairy Lane', farmEn: 'Dairy Lane', farmIt: 'Dairy Lane', farmTr: 'Süt Yolu', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', inStock: true },
  { id: 18, name: 'French Baguette', nameEn: 'French Baguette', nameIt: 'Baguette Francese', nameTr: 'Fransız Baget', price: 4.99, category: 'bakery', farm: 'She Wolf Bakery', farmEn: 'She Wolf Bakery', farmIt: 'She Wolf Bakery', farmTr: 'She Wolf Fırını', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc7d?w=400', inStock: true },
  { id: 19, name: 'Cinnamon Rolls', nameEn: 'Cinnamon Rolls', nameIt: 'Cannella Rolls', nameTr: 'Tarçınlı Rulo', price: 6.99, category: 'bakery', farm: 'She Wolf Bakery', farmEn: 'She Wolf Bakery', farmIt: 'She Wolf Bakery', farmTr: 'She Wolf Fırını', image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e945?w=400', inStock: true },
  { id: 20, name: 'Bagels (6 pack)', nameEn: 'Bagels (6 pack)', nameIt: 'Bagel (6 pz)', nameTr: 'Simit (6 lı)', price: 5.99, category: 'bakery', farm: 'She Wolf Bakery', farmEn: 'She Wolf Bakery', farmIt: 'She Wolf Bakery', farmTr: 'She Wolf Fırını', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400', inStock: true },
  { id: 21, name: 'Extra Virgin Olive Oil', nameEn: 'Extra Virgin Olive Oil', nameIt: 'Olio Extra Vergine', nameTr: 'Sızma Zeytinyağı', price: 16.99, category: 'pantry', farm: 'Sunny Acres', farmEn: 'Sunny Acres', farmIt: 'Sunny Acres', farmTr: 'Güneşli Çiftlik', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd8c5e?w=400', inStock: true },
  { id: 22, name: 'Maple Syrup', nameEn: 'Maple Syrup', nameIt: 'Sciroppo d\'Acero', nameTr: 'Akçaağaç Şurubu', price: 12.99, category: 'pantry', farm: 'Bee Happy Apiaries', farmEn: 'Bee Happy Apiaries', farmIt: 'Bee Happy Apiaries', farmTr: 'Bee Happy Arıcılık', image: 'https://images.unsplash.com/photo-1589496933735-f5bf7fb5e74c?w=400', inStock: true },
  { id: 23, name: 'Pasta (1 lb)', nameEn: 'Pasta (1 lb)', nameIt: 'Pasta (1 lb)', nameTr: 'Makarna (1 lb)', price: 4.99, category: 'pantry', farm: 'Italian Imports', farmEn: 'Italian Imports', farmIt: 'Italian Imports', farmTr: 'İtalyan İthalat', image: 'https://images.unsplash.com/photo-1551462147-37885acc36f9?w=400', inStock: true },
  { id: 24, name: 'Kombucha (4 pack)', nameEn: 'Kombucha (4 pack)', nameIt: 'Kombucha (4 pz)', nameTr: 'Kombu Çayı (4 lü)', price: 12.99, category: 'drinks', farm: 'Ferment Co', farmEn: 'Ferment Co', farmIt: 'Ferment Co', farmTr: 'Ferment Co', image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400', inStock: true },
  { id: 25, name: 'Cold Brew Coffee', nameEn: 'Cold Brew Coffee', nameIt: 'Caffè Cold Brew', nameTr: 'Soğuk Demlenmiş Kahve', price: 9.99, category: 'drinks', farm: 'Local Roast', farmEn: 'Local Roast', farmIt: 'Local Roast', farmTr: 'Yerel Kavurma', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', inStock: true },
  { id: 26, name: 'Fresh Orange Juice', nameEn: 'Fresh Orange Juice', nameIt: 'Succo d\'Arancia', nameTr: 'Taze Portakal Suyu', price: 7.99, category: 'drinks', farm: 'Citrus Grove', farmEn: 'Citrus Grove', farmIt: 'Citrus Grove', farmTr: 'Narenciye Bahçesi', image: 'https://images.unsplash.com/photo-1600271886742-f018cd3c5637?w=400', inStock: true },
  { id: 27, name: 'Veggie Soup Kit', nameEn: 'Veggie Soup Kit', nameIt: 'Kit Zuppa di Verdure', nameTr: 'Sebze Çorbası Seti', price: 15.99, category: 'easy-meals', farm: 'Farm Kitchen', farmEn: 'Farm Kitchen', farmIt: 'Farm Kitchen', farmTr: 'Çiftlik Mutfağı', image: 'https://images.unsplash.com/photo-1547592166-23ac45744ac0?w=400', inStock: true },
  { id: 28, name: 'Farm Box (Small)', nameEn: 'Farm Box (Small)', nameIt: 'Box Fattoria (Piccola)', nameTr: 'Çiftlik Kutu (Küçük)', price: 39.99, category: 'farm-boxes', farm: 'Curated', farmEn: 'Curated', farmIt: 'Curated', farmTr: 'Seçilmiş', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', inStock: true },
  { id: 29, name: 'Farm Box (Large)', nameEn: 'Farm Box (Large)', nameIt: 'Box Fattoria (Grande)', nameTr: 'Çiftlik Kutu (Büyük)', price: 69.99, category: 'farm-boxes', farm: 'Curated', farmEn: 'Curated', farmIt: 'Curated', farmTr: 'Seçilmiş', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', inStock: true },
  { id: 30, name: 'Strawberries', nameEn: 'Strawberries', nameIt: 'Fragole', nameTr: 'Çilek', price: 6.99, category: 'produce', farm: 'Berry Farm', farmEn: 'Berry Farm', farmIt: 'Berry Farm', farmTr: 'Çilek Çiftliği', image: 'https://images.unsplash.com/photo-1464965916301-71a174d67174?w=400', inStock: true },
]

export const farms = [
  { id: 1, name: 'Hilltop Farm', nameEn: 'Hilltop Farm', nameIt: 'Fattoria Hilltop', nameTr: 'Hilltop Çiftliği', location: 'Hudson Valley, NY', locationEn: 'Hudson Valley, NY', locationIt: 'Valle Hudson, NY', description: 'Family-owned organic farm since 1985', descriptionEn: 'Family-owned organic farm since 1985', descriptionIt: 'Fattoria biologica familiare dal 1985', descriptionTr: '1985\'ten beri aile organik çiftliği', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400' },
  { id: 2, name: 'Green Valley', nameEn: 'Green Valley', nameIt: 'Valle Verde', nameTr: 'Yeşil Vadi', location: 'Upstate NY', locationEn: 'Upstate NY', locationIt: 'Upstate NY', description: 'Specializing in leafy greens and herbs', descriptionEn: 'Specializing in leafy greens and herbs', descriptionIt: 'Specializzati in verdure e erbe', descriptionTr: 'Yeşillik ve ot uzmanı', image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400' },
  { id: 3, name: 'Sunny Acres', nameEn: 'Sunny Acres', nameIt: 'Sunny Acres', nameTr: 'Güneşli Çiftlik', location: 'Long Island, NY', locationEn: 'Long Island, NY', locationIt: 'Long Island, NY', description: 'Free-range eggs and poultry', descriptionEn: 'Free-range eggs and poultry', descriptionIt: 'Uova e pollame free-range', descriptionTr: 'Serbest gezen tavuk ve yumurta', image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400' },
  { id: 4, name: 'She Wolf Bakery', nameEn: 'She Wolf Bakery', nameIt: 'She Wolf Bakery', nameTr: 'She Wolf Fırını', location: 'Brooklyn, NY', locationEn: 'Brooklyn, NY', locationIt: 'Brooklyn, NY', description: 'Artisan sourdough and pastries', descriptionEn: 'Artisan sourdough and pastries', descriptionIt: 'Pani e lievitazione naturale artigianale', descriptionTr: 'Zanaatkâr ekmek ve hamur işleri', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
]

export function getCategoryName(category: typeof categories[0], lang: 'en' | 'it' | 'tr'): string {
  if (lang === 'tr') return category.nameTr
  if (lang === 'it') return category.nameIt
  return category.nameEn
}

export function getProductName(product: typeof products[0], lang: 'en' | 'it' | 'tr'): string {
  if (lang === 'tr') return product.nameTr
  if (lang === 'it') return product.nameIt
  return product.nameEn
}

export function getFarmName(farm: typeof farms[0], lang: 'en' | 'it' | 'tr'): string {
  if (lang === 'tr') return farm.nameTr
  if (lang === 'it') return farm.nameIt
  return farm.nameEn
}