export type UserRole = 'customer' | 'manager' | 'chef' | 'admin';

export type DietaryType = 'veg' | 'non-veg' | 'vegan' | 'gluten-free';

export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'mains' | 'pastas' | 'desserts' | 'drinks' | 'specials';
  price: number;
  description: string;
  image: string;
  prepTimeMinutes: number;
  calories: number;
  dietary: DietaryType;
  available: boolean;
  isTrending?: boolean;
  isChefRecommendation?: boolean;
  isBestSeller?: boolean;
  ingredients: string[];
  allergens?: string[];
  pairingWine?: string;
  rating: number;
  reviewsCount: number;
}

export type TableStatus = 'available' | 'occupied' | 'reserved' | 'cleaning';
export type TableZone = 'indoor' | 'outdoor' | 'window' | 'private';

export interface RestaurantTable {
  id: string;
  tableNumber: number;
  capacity: number;
  zone: TableZone;
  status: TableStatus;
  currentOrderId?: string;
  currentGuestName?: string;
  serverAssigned?: string;
  occupiedSince?: string; // ISO or time string
}

export interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  zone: TableZone;
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'seated' | 'cancelled';
  tableNumber?: number;
  createdAt: string;
}

export interface QueueTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  customerPhone: string;
  partySize: number;
  zonePreference: TableZone | 'any';
  estimatedWaitMinutes: number;
  status: 'waiting' | 'called' | 'seated' | 'cancelled';
  joinedAt: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'cooking' | 'ready' | 'served' | 'completed' | 'cancelled';
export type OrderType = 'dine-in' | 'takeaway';

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  tableNumber?: number;
  customerName: string;
  customerPhone?: string;
  orderType: OrderType;
  items: OrderItem[];
  totalAmount: number;
  taxAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: OrderStatus;
  createdAt: string;
  estimatedPrepTimeMinutes: number;
  chefAssigned?: string;
  paymentStatus: 'paid' | 'pending';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'produce' | 'meats' | 'seafood' | 'dairy' | 'dry-goods' | 'beverages' | 'spices';
  currentStock: number;
  minThreshold: number;
  unit: string; // kg, liters, units, packs
  costPerUnit: number;
  supplier: string;
  expiryDate: string;
  lastRestocked: string;
  status: 'optimal' | 'low' | 'critical';
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'General Manager' | 'Head Chef' | 'Sous Chef' | 'Sommelier' | 'Floor Captain' | 'Bartender' | 'Host';
  email: string;
  phone: string;
  shift: 'Morning (09:00 - 17:00)' | 'Evening (16:00 - 00:00)' | 'Full Day';
  status: 'on-duty' | 'off-duty' | 'on-break';
  rating: number;
  assignedZone?: string;
  avatar: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalVisits: number;
  totalSpent: number;
  loyaltyTier: 'Gold' | 'Platinum' | 'Diamond';
  loyaltyPoints: number;
  favoriteDish: string;
  dietaryPreferences: string[];
  lastVisit: string;
  notes?: string;
}

export interface AIBusinessInsight {
  id: string;
  type: 'demand' | 'inventory' | 'staffing' | 'revenue' | 'alert';
  title: string;
  description: string;
  actionRecommendation: string;
  confidenceScore: number; // e.g. 92
  priority: 'high' | 'medium' | 'info';
  timestamp: string;
}
