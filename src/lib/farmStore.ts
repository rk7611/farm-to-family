'use client';

import { useState, useEffect } from 'react';
import {
  Customer,
  Farm,
  Plot,
  Crop,
  Delivery,
  FarmUpdate,
  Lead,
  FarmVisitBooking,
  SystemConfig,
  CropStage,
  DeliveryStatus,
  PlanTier,
} from './types';
import {
  INITIAL_CUSTOMERS,
  INITIAL_FARMS,
  INITIAL_PLOTS,
  INITIAL_CROPS,
  INITIAL_DELIVERIES,
  INITIAL_UPDATES,
  INITIAL_LEADS,
  SYSTEM_CONFIG,
} from './mockData';

const STORAGE_KEYS = {
  CURRENT_USER_ID: 'ftf_current_user_id',
  CUSTOMERS: 'ftf_customers_v1',
  FARMS: 'ftf_farms_v1',
  PLOTS: 'ftf_plots_v1',
  CROPS: 'ftf_crops_v1',
  DELIVERIES: 'ftf_deliveries_v1',
  UPDATES: 'ftf_updates_v1',
  LEADS: 'ftf_leads_v1',
  VISITS: 'ftf_visits_v1',
  CONFIG: 'ftf_config_v1',
};

// Simple global event bus for reactive state across components
type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((l) => l());
}

// Memory cache
let inMemoryCustomers: Customer[] = INITIAL_CUSTOMERS;
let inMemoryFarms: Farm[] = INITIAL_FARMS;
let inMemoryPlots: Plot[] = INITIAL_PLOTS;
let inMemoryCrops: Crop[] = INITIAL_CROPS;
let inMemoryDeliveries: Delivery[] = INITIAL_DELIVERIES;
let inMemoryUpdates: FarmUpdate[] = INITIAL_UPDATES;
let inMemoryLeads: Lead[] = INITIAL_LEADS;
let inMemoryVisits: FarmVisitBooking[] = [];
let inMemoryConfig: SystemConfig = SYSTEM_CONFIG;
let inMemoryCurrentUserId: string = 'cust-rahul-01'; // Default demo user

function initFromStorage() {
  if (typeof window === 'undefined') return;
  try {
    const storedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    if (storedUser) inMemoryCurrentUserId = storedUser;

    const storedCust = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    if (storedCust) inMemoryCustomers = JSON.parse(storedCust);

    const storedFarms = localStorage.getItem(STORAGE_KEYS.FARMS);
    if (storedFarms) inMemoryFarms = JSON.parse(storedFarms);

    const storedPlots = localStorage.getItem(STORAGE_KEYS.PLOTS);
    if (storedPlots) inMemoryPlots = JSON.parse(storedPlots);

    const storedCrops = localStorage.getItem(STORAGE_KEYS.CROPS);
    if (storedCrops) inMemoryCrops = JSON.parse(storedCrops);

    const storedDel = localStorage.getItem(STORAGE_KEYS.DELIVERIES);
    if (storedDel) inMemoryDeliveries = JSON.parse(storedDel);

    const storedUpd = localStorage.getItem(STORAGE_KEYS.UPDATES);
    if (storedUpd) inMemoryUpdates = JSON.parse(storedUpd);

    const storedLeads = localStorage.getItem(STORAGE_KEYS.LEADS);
    if (storedLeads) inMemoryLeads = JSON.parse(storedLeads);

    const storedVisits = localStorage.getItem(STORAGE_KEYS.VISITS);
    if (storedVisits) inMemoryVisits = JSON.parse(storedVisits);

    const storedCfg = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (storedCfg) inMemoryConfig = JSON.parse(storedCfg);
  } catch (e) {
    console.warn('Storage sync note:', e);
  }
}

function persistAll() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, inMemoryCurrentUserId);
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(inMemoryCustomers));
    localStorage.setItem(STORAGE_KEYS.FARMS, JSON.stringify(inMemoryFarms));
    localStorage.setItem(STORAGE_KEYS.PLOTS, JSON.stringify(inMemoryPlots));
    localStorage.setItem(STORAGE_KEYS.CROPS, JSON.stringify(inMemoryCrops));
    localStorage.setItem(STORAGE_KEYS.DELIVERIES, JSON.stringify(inMemoryDeliveries));
    localStorage.setItem(STORAGE_KEYS.UPDATES, JSON.stringify(inMemoryUpdates));
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(inMemoryLeads));
    localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(inMemoryVisits));
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(inMemoryConfig));
  } catch (e) {
    console.warn('Failed to save to local storage', e);
  }
}

// Hook for components
export function useFarmStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    initFromStorage();
    const l = () => setTick((t) => t + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);

  const currentCustomer = inMemoryCustomers.find((c) => c.id === inMemoryCurrentUserId) || inMemoryCustomers[0];
  const currentFarm = inMemoryFarms.find((f) => f.id === currentCustomer?.farmId) || inMemoryFarms[0];
  const currentPlot = inMemoryPlots.find((p) => p.id === currentCustomer?.plotId) || inMemoryPlots[0];
  const customerCrops = inMemoryCrops.filter((c) => c.customerId === currentCustomer?.id);
  const customerDeliveries = inMemoryDeliveries.filter((d) => d.customerId === currentCustomer?.id);
  const customerUpdates = inMemoryUpdates.filter((u) => u.farmId === currentCustomer?.farmId);

  return {
    // Current Context
    currentUserId: inMemoryCurrentUserId,
    currentCustomer,
    currentFarm,
    currentPlot,
    customerCrops,
    customerDeliveries,
    customerUpdates,

    // Raw datasets
    customers: inMemoryCustomers,
    farms: inMemoryFarms,
    plots: inMemoryPlots,
    crops: inMemoryCrops,
    deliveries: inMemoryDeliveries,
    updates: inMemoryUpdates,
    leads: inMemoryLeads,
    visits: inMemoryVisits,
    config: inMemoryConfig,

    // Actions
    setCurrentUser: (userId: string) => {
      inMemoryCurrentUserId = userId;
      persistAll();
      notify();
    },

    updateCropStage: (cropId: string, stage: CropStage, progressPercent: number, notes?: string) => {
      inMemoryCrops = inMemoryCrops.map((c) => {
        if (c.id === cropId) {
          return {
            ...c,
            currentStage: stage,
            progressPercent,
            notes: notes ?? c.notes,
          };
        }
        return c;
      });
      persistAll();
      notify();
    },

    updateDeliveryStatus: (deliveryId: string, status: DeliveryStatus, notes?: string) => {
      inMemoryDeliveries = inMemoryDeliveries.map((d) => {
        if (d.id === deliveryId) {
          return {
            ...d,
            status,
            trackingNotes: notes ?? d.trackingNotes,
            actualDeliveryDate: status === 'delivered' ? new Date().toISOString().split('T')[0] : d.actualDeliveryDate,
          };
        }
        return d;
      });
      persistAll();
      notify();
    },

    addLead: (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
      const newLead: Lead = {
        ...leadData,
        id: `lead-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'new',
      };
      inMemoryLeads = [newLead, ...inMemoryLeads];
      persistAll();
      notify();
      return newLead;
    },

    bookFarmVisit: (visitData: Omit<FarmVisitBooking, 'id' | 'createdAt' | 'status'>) => {
      const newVisit: FarmVisitBooking = {
        ...visitData,
        id: `visit-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
      };
      inMemoryVisits = [newVisit, ...inMemoryVisits];
      persistAll();
      notify();
      return newVisit;
    },

    createCustomerSubscription: (customerData: Partial<Customer>) => {
      const id = `cust-${Date.now()}`;
      const newCust: Customer = {
        id,
        fullName: customerData.fullName || 'New Subscriber',
        email: customerData.email || 'subscriber@example.com',
        phone: customerData.phone || '+91 98000 00000',
        whatsapp: customerData.whatsapp || customerData.phone || '+91 98000 00000',
        city: customerData.city || 'Bengaluru',
        address: customerData.address || 'Address pending setup',
        familySize: customerData.familySize || 4,
        planId: (customerData.planId as PlanTier) || 'dedicated',
        planName: customerData.planName || 'My Dedicated Farm',
        subscriptionStatus: 'active',
        farmId: customerData.farmId || 'farm-anekal',
        farmName: customerData.farmName || 'Anekal Valley Agro Estate',
        plotId: customerData.plotId || 'plot-22',
        plotNumber: customerData.plotNumber || 'Plot C-22',
        selectedCrops: customerData.selectedCrops || ['Tomato', 'Carrot', 'Cucumber'],
        subscriptionStartDate: new Date().toISOString().split('T')[0],
        renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        monthlyAmount: customerData.monthlyAmount || 20000,
        totalPaid: customerData.monthlyAmount || 20000,
        dietaryPreferences: customerData.dietaryPreferences || [],
        dedicatedFarmManager: 'Dr. Srinivas Murthy',
        hasLiveCameraAccess: customerData.planId === 'private',
      };

      inMemoryCustomers = [newCust, ...inMemoryCustomers];
      inMemoryCurrentUserId = newCust.id;
      persistAll();
      notify();
      return newCust;
    },

    updateConfig: (newConfig: Partial<SystemConfig>) => {
      inMemoryConfig = { ...inMemoryConfig, ...newConfig };
      persistAll();
      notify();
    },

    addFarmUpdate: (update: Omit<FarmUpdate, 'id' | 'date'>) => {
      const newUpdate: FarmUpdate = {
        ...update,
        id: `upd-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
      };
      inMemoryUpdates = [newUpdate, ...inMemoryUpdates];
      persistAll();
      notify();
      return newUpdate;
    },
  };
}
