// Categorías de electrónicos
export const mockCategories = [
  { id_key: 1, name: "Celulares" },
  { id_key: 2, name: "Computadoras" },
  { id_key: 3, name: "Televisores" },
  { id_key: 4, name: "Audio" },
  { id_key: 5, name: "Tablets" },
  { id_key: 6, name: "Accesorios" },
  { id_key: 7, name: "Consolas" },
  { id_key: 8, name: "Cámaras" }
];

// Productos de electrónicos
export const mockProducts = [
  // CELULARES
  {
    id_key: 1,
    name: "iPhone 15 Pro Max",
    price: 1199.99,
    stock: 25,
    category_id: 1,
    description: "Smartphone Apple con chip A17 Pro, cámara de 48MP, pantalla 6.7\" Super Retina XDR, titanio",
    image: "https://images.unsplash.com/photo-1592286927505-b0100ac2d703?w=500"
  },
  {
    id_key: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 1099.99,
    stock: 30,
    category_id: 1,
    description: "Smartphone con S Pen, cámara de 200MP, pantalla AMOLED 6.8\", Snapdragon 8 Gen 3",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500"
  },
  {
    id_key: 3,
    name: "Google Pixel 8 Pro",
    price: 899.99,
    stock: 20,
    category_id: 1,
    description: "Smartphone con IA de Google, cámara de 50MP, Google Tensor G3, Android puro",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500"
  },
  {
    id_key: 4,
    name: "Xiaomi 14 Pro",
    price: 749.99,
    stock: 40,
    category_id: 1,
    description: "Smartphone con cámara Leica, Snapdragon 8 Gen 3, carga rápida 120W",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
  },

  // COMPUTADORAS
  {
    id_key: 5,
    name: "MacBook Pro 16\" M3 Max",
    price: 2499.99,
    stock: 15,
    category_id: 2,
    description: "Laptop profesional con chip M3 Max, 36GB RAM, 1TB SSD, pantalla Liquid Retina XDR",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500"
  },
  {
    id_key: 6,
    name: "Dell XPS 15",
    price: 1799.99,
    stock: 22,
    category_id: 2,
    description: "Laptop con Intel Core i9, NVIDIA RTX 4060, 32GB RAM, pantalla OLED 3.5K",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500"
  },
  {
    id_key: 7,
    name: "ASUS ROG Zephyrus G16",
    price: 2199.99,
    stock: 18,
    category_id: 2,
    description: "Laptop gamer con RTX 4080, Intel Core i9, 240Hz, RGB",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500"
  },
  {
    id_key: 8,
    name: "Lenovo ThinkPad X1 Carbon",
    price: 1599.99,
    stock: 25,
    category_id: 2,
    description: "Laptop empresarial ultraligera, Intel Core i7, 16GB RAM, certificación militar",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500"
  },

  // TELEVISORES
  {
    id_key: 9,
    name: "Samsung QLED 65\" 4K",
    price: 1299.99,
    stock: 12,
    category_id: 3,
    description: "Smart TV QLED 4K, Quantum HDR, 120Hz, Gaming Hub, Tizen OS",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500"
  },
  {
    id_key: 10,
    name: "LG OLED 55\" C3",
    price: 1499.99,
    stock: 10,
    category_id: 3,
    description: "Smart TV OLED 4K, a9 AI Processor, Dolby Vision, HDMI 2.1, webOS",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500"
  },
  {
    id_key: 11,
    name: "Sony Bravia XR 75\"",
    price: 2299.99,
    stock: 8,
    category_id: 3,
    description: "Smart TV LED 4K, Cognitive Processor XR, Perfect for PS5, Google TV",
    image: "https://images.unsplash.com/photo-1593359863503-f598794f1bd9?w=500"
  },
  {
    id_key: 12,
    name: "TCL 50\" 4K QLED",
    price: 549.99,
    stock: 35,
    category_id: 3,
    description: "Smart TV QLED 4K económico, Dolby Atmos, Google TV, 60Hz",
    image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500"
  },

  // AUDIO
  {
    id_key: 13,
    name: "Sony WH-1000XM5",
    price: 399.99,
    stock: 50,
    category_id: 4,
    description: "Auriculares over-ear con cancelación de ruido premium, 30h batería, Hi-Res Audio",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500"
  },
  {
    id_key: 14,
    name: "Apple AirPods Pro 2",
    price: 249.99,
    stock: 60,
    category_id: 4,
    description: "Auriculares in-ear con ANC, audio espacial, chip H2, USB-C",
    image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500"
  },
  {
    id_key: 15,
    name: "JBL PartyBox 310",
    price: 499.99,
    stock: 15,
    category_id: 4,
    description: "Parlante portátil 240W, luces LED, resistente al agua, 18h batería",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"
  },
  {
    id_key: 16,
    name: "Bose SoundLink Revolve+",
    price: 329.99,
    stock: 28,
    category_id: 4,
    description: "Parlante Bluetooth 360°, resistente al agua, 16h batería, sonido premium",
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500"
  },

  // TABLETS
  {
    id_key: 17,
    name: "iPad Pro 12.9\" M2",
    price: 1099.99,
    stock: 20,
    category_id: 5,
    description: "Tablet profesional con chip M2, pantalla Liquid Retina XDR, 5G, Apple Pencil",
    image: "https://images.unsplash.com/photo-1585790050230-5dd28404f71a?w=500"
  },
  {
    id_key: 18,
    name: "Samsung Galaxy Tab S9 Ultra",
    price: 1199.99,
    stock: 15,
    category_id: 5,
    description: "Tablet Android con S Pen, pantalla AMOLED 14.6\", Snapdragon 8 Gen 2",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500"
  },
  {
    id_key: 19,
    name: "Microsoft Surface Pro 9",
    price: 999.99,
    stock: 18,
    category_id: 5,
    description: "Tablet 2 en 1 con Windows 11, Intel Core i7, Type Cover incluido",
    image: "https://images.unsplash.com/photo-1589739900243-c8f9498f0e03?w=500"
  },

  // ACCESORIOS
  {
    id_key: 20,
    name: "Logitech MX Master 3S",
    price: 99.99,
    stock: 45,
    category_id: 6,
    description: "Mouse inalámbrico ergonómico, 8K DPI, scroll MagSpeed, silencioso",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500"
  },
  {
    id_key: 21,
    name: "Teclado Mecánico Keychron K2",
    price: 89.99,
    stock: 40,
    category_id: 6,
    description: "Teclado mecánico inalámbrico, switches Gateron, RGB, Mac/Windows",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"
  },
  {
    id_key: 22,
    name: "Anker PowerBank 20000mAh",
    price: 49.99,
    stock: 80,
    category_id: 6,
    description: "Batería portátil con carga rápida 65W, USB-C PD, display LED",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500"
  },
  {
    id_key: 23,
    name: "SanDisk SSD Externo 2TB",
    price: 199.99,
    stock: 35,
    category_id: 6,
    description: "Disco SSD portátil, 1050MB/s, resistente a caídas, USB-C",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500"
  },

  // CONSOLAS
  {
    id_key: 24,
    name: "PlayStation 5",
    price: 499.99,
    stock: 22,
    category_id: 7,
    description: "Consola de videojuegos, SSD ultra rápido, ray tracing, 4K/120fps, DualSense",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500"
  },
  {
    id_key: 25,
    name: "Xbox Series X",
    price: 499.99,
    stock: 18,
    category_id: 7,
    description: "Consola 4K, 12 TFLOPS, SSD 1TB, retrocompatible, Game Pass",
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500"
  },
  {
    id_key: 26,
    name: "Nintendo Switch OLED",
    price: 349.99,
    stock: 40,
    category_id: 7,
    description: "Consola híbrida con pantalla OLED 7\", dock mejorado, 64GB",
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500"
  },

  // CÁMARAS
  {
    id_key: 27,
    name: "Sony A7 IV",
    price: 2499.99,
    stock: 10,
    category_id: 8,
    description: "Cámara mirrorless full-frame, 33MP, video 4K 60fps, estabilización 5 ejes",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500"
  },
  {
    id_key: 28,
    name: "Canon EOS R6 Mark II",
    price: 2399.99,
    stock: 12,
    category_id: 8,
    description: "Cámara mirrorless 24MP, AF Eye Control, video 4K 60fps, IBIS",
    image: "https://images.unsplash.com/photo-1606765962248-7ff407b51667?w=500"
  },
  {
    id_key: 29,
    name: "GoPro Hero 12 Black",
    price: 399.99,
    stock: 30,
    category_id: 8,
    description: "Cámara de acción 5.3K, HDR, HyperSmooth 6.0, sumergible 10m",
    image: "https://images.unsplash.com/photo-1585076641399-5c06d1b3365f?w=500"
  },
  {
    id_key: 30,
    name: "DJI Osmo Action 4",
    price: 349.99,
    stock: 25,
    category_id: 8,
    description: "Cámara de acción 4K 120fps, pantallas duales, resistente al agua",
    image: "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?w=500"
  }
];

export const mockClients = [
  {
    id_key: 1,
    name: "Juan",
    lastname: "Pérez",
    email: "juan.perez@example.com",
    telephone: "+525512345678"
  }
];

export const mockAddresses = [
  {
    id_key: 1,
    street: "Av. Reforma",
    number: "123",
    city: "Ciudad de México",
    client_id: 1
  }
];

export const mockOrders = [];

export const DeliveryMethod = {
  DRIVE_THRU: 1,
  ON_HAND: 2,
  HOME_DELIVERY: 3
};

export const OrderStatus = {
  PENDING: 1,
  IN_PROGRESS: 2,
  DELIVERED: 3,
  CANCELED: 4
};

export const DeliveryMethodLabels = {
  1: "Drive-thru",
  2: "En mano",
  3: "A domicilio"
};

export const OrderStatusLabels = {
  1: "Pendiente",
  2: "En progreso",
  3: "Entregado",
  4: "Cancelado"
};