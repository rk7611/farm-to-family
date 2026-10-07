export type PlanTier = 'family' | 'dedicated' | 'private';

export interface Plan {
  id: PlanTier;
  name: string;
  price: number; // in INR
  billingPeriod: 'month' | 'year';
  monthlyEquivalent?: number;
  tagline: string;
  badge?: string;
  description: string;
  targetAudience: string;
  features: string[];
  ctaLabel: string;
  accentColor?: string;
}

export interface Farm {
  id: string;
  name: string;
  code: string;
  location: string;
  state: string;
  totalAreaAcres: number;
  availableAreaAcres: number;
  soilType: string;
  soilPh: number;
  waterSource: string;
  waterTds: number;
  climateZone: string;
  images: string[];
  agronomistName: string;
  agronomistContact: string;
  establishedYear: number;
}

export type PlotStatus = 'available' | 'reserved' | 'growing' | 'harvest_ready' | 'harvested';

export interface Plot {
  id: string;
  plotNumber: string;
  farmId: string;
  farmName: string;
  sizeSqFt: number;
  status: PlotStatus;
  assignedCustomerId?: string;
  assignedCustomerName?: string;
  assignedCrops: string[];
  soilQualityIndex: string;
  sunlightHours: number;
  irrigationType: string;
}

export type CropStage =
  | 'seed'
  | 'germination'
  | 'growing'
  | 'flowering'
  | 'harvest'
  | 'quality_check'
  | 'packing'
  | 'delivery';

export interface Crop {
  id: string;
  name: string;
  variety: string;
  plotId: string;
  farmId: string;
  customerId: string;
  sowingDate: string;
  expectedHarvestDate: string;
  actualHarvestDate?: string;
  currentStage: CropStage;
  progressPercent: number;
  expectedYieldKg: number;
  actualYieldKg?: number;
  notes: string;
  imageUrl: string;
  healthStatus: 'optimal' | 'monitoring' | 'recovering';
}

export type DeliveryStatus = 'harvested' | 'quality_checked' | 'packed' | 'dispatched' | 'delivered';

export interface DeliveryItem {
  cropName: string;
  variety: string;
  quantityKg: number;
  qualityGrade: 'A+' | 'A';
}

export interface Delivery {
  id: string;
  deliveryCode: string;
  customerId: string;
  customerName: string;
  farmId: string;
  plotId: string;
  scheduledDate: string;
  actualDeliveryDate?: string;
  status: DeliveryStatus;
  items: DeliveryItem[];
  totalWeightKg: number;
  temperatureAtDispatch?: string;
  qcInspector: string;
  trackingNotes?: string;
}

export interface FarmMedia {
  id: string;
  farmId: string;
  plotId?: string;
  cropId?: string;
  title: string;
  description: string;
  type: 'photo' | 'video' | 'report';
  url: string;
  thumbnailUrl?: string;
  date: string;
  stageTagged?: CropStage;
}

export interface FarmUpdate {
  id: string;
  farmId: string;
  plotId?: string;
  customerId?: string;
  date: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  category: 'agronomy' | 'weather' | 'harvest' | 'irrigation';
  mediaUrls?: string[];
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  city: string;
  address: string;
  familySize: number;
  planId: PlanTier;
  planName: string;
  subscriptionStatus: 'active' | 'pending' | 'suspended';
  farmId: string;
  farmName: string;
  plotId: string;
  plotNumber: string;
  selectedCrops: string[];
  subscriptionStartDate: string;
  renewalDate: string;
  monthlyAmount: number;
  totalPaid: number;
  dietaryPreferences: string[];
  dedicatedFarmManager?: string;
  hasLiveCameraAccess: boolean;
}

export interface Payment {
  id: string;
  transactionId: string;
  customerId: string;
  customerName: string;
  planId: PlanTier;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  paymentDate: string;
  billingPeriod: string;
  invoiceNumber: string;
  paymentMethod: string;
}

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  whatsapp: string;
  city: string;
  familySize: string;
  interestedPlan: PlanTier | 'undecided';
  monthlyBudget?: string;
  selectedVegetables: string[];
  primaryPriority: string;
  notes?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'consultation_scheduled' | 'converted' | 'closed';
}

export interface FarmVisitBooking {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  farmId: string;
  preferredDate: string;
  guestsCount: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface SystemConfig {
  whatsappNumber: string;
  supportPhone: string;
  supportEmail: string;
  headquartersAddress: string;
  plans: Plan[];
  vegetableCatalog: {
    id: string;
    name: string;
    category: 'leafy' | 'root' | 'fruit' | 'creeper' | 'seasonal';
    season: 'all-year' | 'winter' | 'summer' | 'monsoon';
    typicalDaysToHarvest: number;
    benefits: string;
    image: string;
  }[];
}
