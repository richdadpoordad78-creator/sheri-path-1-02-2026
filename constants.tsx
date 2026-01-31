import { Service, TeamMember, Product } from './types';

export const CONTACT_DATA = {
  business: {
    name: "Sheri Salon",
    email: "sherisalontx@gmail.com",
    phones: [
      { label: "Primary", number: "+1 214 694 6407" },
      { label: "Secondary", number: "+1 469 661 9049" }
    ],
    directContact: {
      role: "Owner / Manager",
      phone: "+1 214 694 6407",
      availability: "Working hours only"
    }
  },
  address: {
    street: "909 W Spring Creek Pkwy #411",
    city: "Plano",
    state: "TX",
    zip: "75023",
    country: "United States"
  },
  workingHours: {
    mondayToSaturday: "09:00 AM - 07:00 PM",
    sunday: "Closed"
  },
  socialLinks: {
    facebook: "https://www.facebook.com/profile.php?id=100075791545637",
    instagram: "https://www.instagram.com/sherisalon.tx",
    telegram: "https://t.me/SheriStar"
  },
  footer: {
    copyright: "© 2024 Sheri Salon. All Rights Reserved."
  }
};

export const SERVICES: Record<string, { status?: string, categoryImage: string, services: Service[], bookingUrl?: string, externalLink?: string }> = {
  'hair': {
    categoryImage: "https://images.pexels.com/photos/3993454/pexels-photo-3993454.jpeg",
    services: [
      { id: 'h1', title: "Women's Haircut", description: "Custom cut to suit your face shape and lifestyle", price: "$60+", image: "https://images.pexels.com/photos/3993454/pexels-photo-3993454.jpeg" },
      { id: 'h2', title: "Men's Haircut", description: "Precision cutting with clippers and scissors", price: "$40+", image: "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg" },
      { id: 'h3', title: "Blowout & Style", description: "Professional blowdry with finishing touches", price: "$45+", image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg" },
      { id: 'h4', title: "Full Color", description: "Single process color application", price: "$80+", image: "https://images.pexels.com/photos/3992863/pexels-photo-3992863.jpeg" },
      { id: 'h5', title: "Highlights", description: "Partial or full highlighting service", price: "$100+", image: "https://images.pexels.com/photos/3993448/pexels-photo-3993448.jpeg" },
      { id: 'h6', title: "Balayage", description: "Hand-painted highlights for natural dimension", price: "$150+", image: "https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg" }
    ]
  },
  'botox': {
    categoryImage: "https://images.pexels.com/photos/3985311/pexels-photo-3985311.jpeg",
    services: [
      { 
        id: 'b1', 
        title: "Botox - 20 Units", 
        description: "Ideal for forehead lines or crow's feet. Results last 3-4 months.", 
        price: "$143.80", 
        image: "https://images.pexels.com/photos/3985311/pexels-photo-3985311.jpeg" 
      },
      { 
        id: 'b2', 
        title: "Botox - 30 Units", 
        description: "Comprehensive treatment for forehead and glabellar lines.", 
        price: "$215.70", 
        image: "https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg" 
      },
      { 
        id: 'b3', 
        title: "Botox - 40 Units", 
        description: "Complete facial rejuvenation including brow lift.", 
        price: "$287.60", 
        image: "https://images.pexels.com/photos/3985335/pexels-photo-3985335.jpeg" 
      },
      { 
        id: 'b4', 
        title: "Botox - 50 Units", 
        description: "Full face treatment for comprehensive wrinkle reduction and facial contouring.", 
        price: "$359.50", 
        image: "https://images.pexels.com/photos/3985311/pexels-photo-3985311.jpeg" 
      }
    ]
  },
  'lip-filler': {
    categoryImage: "https://images.pexels.com/photos/34775440/pexels-photo-34775440.jpeg",
    services: [
      { 
        id: 'lf1', 
        title: "Lip Filler - 1ml", 
        description: "Enhance lip volume and shape with premium hyaluronic acid filler. Perfect for subtle enhancement and natural-looking results.", 
        price: "$350", 
        image: "https://images.pexels.com/photos/34775440/pexels-photo-34775440.jpeg" 
      },
      { 
        id: 'lf2', 
        title: "Lip Filler - 2ml+", 
        description: "Achieve fuller, more dramatic results with volume discount. Premium filler for significant enhancement with natural contours and symmetry.", 
        price: "$275/ml", 
        image: "https://images.pexels.com/photos/34775440/pexels-photo-34775440.jpeg" 
      }
    ]
  },
  'pmu': {
    categoryImage: "https://images.pexels.com/photos/33580450/pexels-photo-33580450.jpeg",
    services: [
      { id: 'p1', title: "Microblading", description: "Semi-permanent eyebrow tattooing for fuller, defined brows", price: "$400+", image: "https://images.pexels.com/photos/33580450/pexels-photo-33580450.jpeg" },
      { id: 'p2', title: "Eyeliner", description: "Permanent cosmetic eye definition", price: "$400+", image: "https://images.pexels.com/photos/4612159/pexels-photo-4612159.jpeg" },
      { id: 'p3', title: "Lip Blush", description: "Semi-permanent lip color enhancement", price: "$600+", image: "https://images.pexels.com/photos/8140908/pexels-photo-8140908.jpeg" }
    ]
  },
  'skincare': {
    categoryImage: "https://images.pexels.com/photos/15866041/pexels-photo-15866041.jpeg",
    services: [
      { id: 's1', title: "Facial Treatment", description: "Exfoliation and deep cleansing for the face", price: "$70+", image: "https://images.pexels.com/photos/15866041/pexels-photo-15866041.jpeg" },
      { id: 's2', title: "Microneedling", description: "Treatment for scars, pores, and wrinkles", price: "$220+", image: "https://images.pexels.com/photos/3985309/pexels-photo-3985309.jpeg" },
      { id: 's3', title: "Laser Hair Removal", description: "Diode laser with specialized cooling system", price: "$35+", image: "https://images.pexels.com/photos/3985301/pexels-photo-3985301.jpeg" }
    ],
    externalLink: "https://adenskincare.com/"
  },
  'threading': { 
    categoryImage: "https://images.pexels.com/photos/29588096/pexels-photo-29588096.jpeg",
    services: [
      { id: 't1', title: "Eyebrow Threading", description: "Precision mapping and shaping for the perfect arch.", price: "$15", image: "https://images.pexels.com/photos/29588096/pexels-photo-29588096.jpeg" },
      { id: 't2', title: "Full Face Threading", description: "Comprehensive removal for a smooth, biological canvas.", price: "$45", image: "https://images.pexels.com/photos/29588095/pexels-photo-29588095.jpeg" },
      { id: 't3', title: "Upper Lip Threading", description: "Quick, clean removal using high-grade silk thread.", price: "$10", image: "https://images.pexels.com/photos/29588097/pexels-photo-29588097.jpeg" }
    ],
    bookingUrl: "https://squareup.com/appointments/book/3m8lq8bpe448v3/LDCAG2W6871R8/services"
  },
  'waxing': { 
    categoryImage: "https://i.pinimg.com/736x/b2/e0/18/b2e0182c0966afc5bcdaf3bd30a5f098.jpg",
    services: [
      { id: 'w1', title: "Brazilian Wax", description: "Complete removal with specialized sensitive-skin hard wax.", price: "$55+", image: "https://i.pinimg.com/736x/b2/e0/18/b2e0182c0966afc5bcdaf3bd30a5f098.jpg" },
      { id: 'w2', title: "Full Leg Wax", description: "Silky smooth results covering from ankle to upper thigh.", price: "$70+", image: "https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg" },
      { id: 'w3', title: "Underarm Wax", description: "Precision removal for clean, comfortable hygiene.", price: "$25", image: "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg" }
    ],
    bookingUrl: "https://squareup.com/appointments/book/3m8lq8bpe448v3/LDCAG2W6871R8/services"
  }
};

export const PRODUCTS: Product[] = [
  { id: 'pr1', name: "Silk Radiance Serum", description: "Hydrating serum with 24K gold particles for a luminous finish.", price: "$85", image: "https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg" },
  { id: 'pr2', name: "Botanical Hair Oil", description: "Cold-pressed Moroccan argan oil for architectural shine.", price: "$45", image: "https://images.pexels.com/photos/3993448/pexels-photo-3993448.jpeg" },
  { id: 'pr3', name: "Velvet Sculpt Mask", description: "Peptide-rich firming mask for post-aesthetic care.", price: "$65", image: "https://images.pexels.com/photos/3617041/pexels-photo-3617041.jpeg" }
];

export const TEAM: TeamMember[] = [
  {
    name: "SHERI SHAMSI",
    role: "FOUNDER & OWNER",
    bio: "With over 20 years of experience, Sheri has established herself as one of the most skilled stylists in Texas. Her dedication to perfection and warm personality have earned her a loyal clientele who consistently praise her exceptional talent and kindness.",
    image: "https://sherisalontx.com/wp-content/uploads/2022/12/photo-7-copy-1350x1536.jpg",
    social: { instagram: "https://www.instagram.com/sherisalon.tx" }
  },
  {
    name: "RONNIE ASLANLI",
    role: "MANAGER",
    bio: "Ronnie brings innovative business strategies and operational excellence to Sheri Salon. His unique background in construction informs his creative approach to salon management, ensuring every client enjoys a seamless and exceptional experience.",
    image: "https://sherisalontx.com/wp-content/uploads/2023/01/IMG_4718.jpg",
    social: { instagram: "https://www.instagram.com/rohi.aslani.135890" }
  },
  {
    name: "NEDA AFSHAR",
    role: "SKIN CARE SPECIALIST",
    bio: "Neda specializes in advanced skin treatments including plasma fibroblast therapy, microneedling, and laser procedures. Her meticulous approach and gentle touch have transformed countless complexions, earning her the nickname 'The Skin Whisperer' among our clients.",
    image: "https://sherisalontx.com/wp-content/uploads/2023/01/PHOTO-2022-12-15-11-38-56.jpg",
    social: { instagram: "https://www.instagram.com/aden.skincare/" }
  }
];