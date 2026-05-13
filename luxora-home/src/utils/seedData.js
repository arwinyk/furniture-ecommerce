import { collection, addDoc, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const mockProducts = [
  {
    title: "The Koto Sofa",
    slug: "koto-sofa",
    description: "A masterclass in Scandinavian minimalism, the Koto Sofa features a low profile and generous seating depth.",
    longDescription: "Designed for both aesthetic purity and uncompromised comfort, the Koto Sofa is the anchor of the modern living room. Its low-slung silhouette and broad armrests create a grounded presence, while the high-density foam core ensures it retains its tailored look for years.",
    category: "sofas",
    subcategory: "sectionals",
    price: 450000, // 4.5L INR
    comparePrice: 520000,
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80"
    ],
    thumbnail: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80",
    materials: ["Italian Bouclé", "Performance Linen", "European Leather"],
    colors: [
      { name: "Oatmeal", hex: "#E5E0D8" },
      { name: "Charcoal", hex: "#3A3A3A" },
      { name: "Olive", hex: "#5B6149" }
    ],
    dimensions: { W: 240, D: 105, H: 75 },
    weight: 85,
    stock: 12,
    sku: "SOF-KOTO-001",
    tags: ["minimalist", "scandinavian", "boucle"],
    rating: 4.9,
    reviewCount: 24,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Aura Dining Chair",
    slug: "aura-dining-chair",
    description: "Sculptural wooden dining chair with a hand-woven rush seat.",
    longDescription: "The Aura Dining Chair marries heritage craftsmanship with a contemporary silhouette. Each piece is hand-carved from sustainably sourced solid oak, featuring a gently curved backrest that embraces the sitter.",
    category: "dining",
    subcategory: "chairs",
    price: 45000,
    comparePrice: 0,
    images: [
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80"
    ],
    thumbnail: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80",
    materials: ["Solid Oak", "Walnut", "Black Ash"],
    colors: [
      { name: "Natural Oak", hex: "#D4B896" },
      { name: "Dark Walnut", hex: "#3D2B1F" },
      { name: "Matte Black", hex: "#1B1410" }
    ],
    dimensions: { W: 52, D: 54, H: 78 },
    weight: 6,
    stock: 45,
    sku: "DIN-AURA-001",
    tags: ["wooden", "dining", "sculptural"],
    rating: 4.8,
    reviewCount: 112,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Lumina Pendant Light",
    slug: "lumina-pendant",
    description: "A striking brass pendant light that acts as jewelry for your room.",
    longDescription: "Cast from solid brass and hand-patinated to a warm, antique finish, the Lumina Pendant provides both ambient glow and direct task lighting. Perfect above a dining table or kitchen island.",
    category: "decor",
    subcategory: "lighting",
    price: 32000,
    comparePrice: 38000,
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80"
    ],
    thumbnail: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80",
    materials: ["Solid Brass", "Frosted Glass"],
    colors: [
      { name: "Aged Brass", hex: "#C09A6B" },
      { name: "Matte Black", hex: "#1B1410" }
    ],
    dimensions: { W: 35, D: 35, H: 45 },
    weight: 3.5,
    stock: 20,
    sku: "DEC-LUM-001",
    tags: ["lighting", "brass", "modern"],
    rating: 5.0,
    reviewCount: 8,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Seren Platform Bed",
    slug: "seren-platform-bed",
    description: "A low-profile platform bed featuring a built-in floating nightstand design.",
    longDescription: "The Seren Bed brings the tranquility of a luxury hotel suite into your bedroom. Constructed from rich walnut veneer, the extended headboard features integrated floating nightstands and subtle LED ambient lighting.",
    category: "beds",
    subcategory: "platform",
    price: 280000,
    comparePrice: 0,
    images: [
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80"
    ],
    thumbnail: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80",
    materials: ["Walnut Veneer", "Upholstered Headboard"],
    colors: [
      { name: "Walnut & Linen", hex: "#EDE0CF" },
      { name: "Black Ash & Charcoal", hex: "#3A3A3A" }
    ],
    dimensions: { W: 280, D: 215, H: 95 },
    weight: 120,
    stock: 5,
    sku: "BED-SER-001",
    tags: ["bedroom", "platform", "walnut"],
    rating: 4.7,
    reviewCount: 15,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const seedProductsToFirestore = async () => {
  try {
    const productsRef = collection(db, 'products');
    
    // First, check if products already exist to avoid duplicates
    const snapshot = await getDocs(productsRef);
    if (!snapshot.empty) {
      console.log('Products collection already has data. Skipping seed.');
      return false; // Indicating no seed was needed
    }

    // Use a batch write for atomic operations
    const batch = writeBatch(db);
    
    mockProducts.forEach((product) => {
      const newDocRef = doc(productsRef); // Auto-generate ID
      batch.set(newDocRef, product);
    });

    await batch.commit();
    console.log('Successfully seeded mock products to Firestore!');
    return true; // Indicating successful seed
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
};
