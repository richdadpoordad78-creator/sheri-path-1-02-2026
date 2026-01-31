
export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon?: string;
  image?: string;
  features?: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: {
    instagram?: string;
    email?: string;
  };
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  category: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}
