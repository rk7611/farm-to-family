const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'social-media');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 10 Strategic Campaigns x 10 Posts = 100 Posts
const campaigns = [
  {
    category: 'Brand Manifesto & Core Promise',
    theme: 'forest-luxe',
    posts: [
      {
        id: 1,
        badge: 'THE FARM-TO-FAMILY PROMISE',
        headline: "Your Family's Farm.",
        subtitle: 'We Grow It. You Enjoy It.',
        copy: 'Managed farming for families who want to know where their food comes from.',
        stat: 'No Land Purchase • No Labor Management • Pure Harvest',
        cta: 'Build Your Family Farm at www.purevegies.in',
        hashtags: '#FarmToFamily #ManagedFarming #CleanLiving #OrganicLifestyle #FamilyHealth'
      },
      {
        id: 2,
        badge: 'TRANSPARENT LIVING',
        headline: 'You Choose What You Eat.',
        subtitle: 'We Take Care of How It Grows.',
        copy: 'Select your seasonal crops. Our expert agronomists nurture them in living soil.',
        stat: 'Dedicated Plots • Daily Agronomy Care • Doorstep Delivery',
        cta: 'Discover Your Plan at www.purevegies.in',
        hashtags: '#TraceableFarming #FarmToFork #CleanVegetables #MindfulEating'
      },
      {
        id: 3,
        badge: 'A NEW PARADIGM',
        headline: 'Healthy Food Shouldn’t Require',
        subtitle: 'You To Become A Farmer.',
        copy: 'You don’t have time to buy land, manage borewells, or oversee labor. We handle it all.',
        stat: 'Zero Farming Hassle • 100% Peace of Mind',
        cta: 'Join the Movement at www.purevegies.in',
        hashtags: '#ModernFarming #AgricultureAsAService #HealthyFamily #UrbanLiving'
      },
      {
        id: 4,
        badge: 'THE REAL PRODUCT',
        headline: 'The Output Is Vegetables.',
        subtitle: 'The Real Product Is Trust.',
        copy: 'We don’t rely on marketing buzzwords. We publish real soil tests and open our farm gates.',
        stat: 'NABL Lab Assays • Water TDS < 210 • Open Gate Policy',
        cta: 'Visit Our Farms at www.purevegies.in',
        hashtags: '#TransparencyInFood #RealFood #NoFakeClaims #TrustedSource'
      },
      {
        id: 5,
        badge: 'EVERYDAY FRESHNESS',
        headline: 'From Pre-Dawn Harvest',
        subtitle: 'Direct To Your Kitchen Table.',
        copy: 'Picked between 5:30 AM and 8:30 AM before sunlight causes moisture loss.',
        stat: 'Delivered Within 12 Hours • Pre-Chilled Cold Chain',
        cta: 'Taste Real Freshness at www.purevegies.in',
        hashtags: '#FreshHarvest #ColdChainLogistics #DawnToDoor #FarmFresh'
      },
      {
        id: 6,
        badge: 'HOUSEHOLD WELLNESS',
        headline: 'Know Exactly Who Planted',
        subtitle: 'Your Child’s Next Meal.',
        copy: 'Trace every carrot and tomato to the exact plot and resident agronomist who grew it.',
        stat: 'Plot ID Mapped • Verified Agronomist Care • 100% Traceable',
        cta: 'Meet Your Farm Team at www.purevegies.in',
        hashtags: '#ChildNutrition #TraceableProduce #ParentingTips #FamilyWellness'
      },
      {
        id: 7,
        badge: 'PRIVATE MANAGED ESTATE',
        headline: 'A Private Farm For Your Family.',
        subtitle: 'Starting at ₹10,000 / Month.',
        copy: 'The convenience of an agricultural estate without capital expenditure or land risk.',
        stat: 'Flexible Household Tiers • Dedicated Management',
        cta: 'Explore Pricing at www.purevegies.in',
        hashtags: '#PrivateFarm #ManagedEstate #SmartLiving #FamilyFirst'
      },
      {
        id: 8,
        badge: 'MANDI VS MANAGED',
        headline: 'Say Goodbye To Mysterious',
        subtitle: 'Market Vegetables.',
        copy: 'Stop wondering what chemicals or waxes were applied post-harvest. Know your source.',
        stat: 'Zero Synthetic Systemic Sprays • Living Soil Feeding',
        cta: 'Switch to Transparency at www.purevegies.in',
        hashtags: '#CleanEats #Unwaxed #EatClean #FoodTruth'
      },
      {
        id: 9,
        badge: 'LIVING SOIL SCIENCE',
        headline: 'Living Soil Means',
        subtitle: 'Living Nutrition.',
        copy: 'Enriched with aged vermicompost, biochar, and beneficial mycorrhizal fungi.',
        stat: 'Soil Quality Index > 90/100 • Microbial Abundance',
        cta: 'Read Our Agronomy Specs at www.purevegies.in',
        hashtags: '#RegenerativeAg #SoilHealth #Microbiome #NutrientDense'
      },
      {
        id: 10,
        badge: 'FAMILY CONNECTION',
        headline: 'Reconnect Your Family',
        subtitle: 'With The Soil.',
        copy: 'Book a weekend farm retreat. Walk your plot and let your children harvest carrots.',
        stat: 'Open Gate Every Weekend • Guided Agronomist Walks',
        cta: 'Book a Visit at www.purevegies.in',
        hashtags: '#FarmTour #WeekendActivity #NatureWithKids #BangaloreEvents'
      }
    ]
  },
  {
    category: 'Plan Spotlights & Subscriptions',
    theme: 'earth-warmth',
    posts: [
      {
        id: 11,
        badge: 'PLAN SPOTLIGHT 01',
        headline: "My Family's Farm Plan",
        subtitle: '₹10,000 / Month',
        copy: 'Everyday fresh produce for households of 2–4 members. Guided seasonal basket.',
        stat: '25–30 kg Monthly Produce • Weekly Doorstep Delivery',
        cta: 'Subscribe at www.purevegies.in',
        hashtags: '#FamilyFarm #EverydayProduce #SubscriptionService #CleanFoodIndia'
      },
      {
        id: 12,
        badge: 'PLAN SPOTLIGHT 02',
        headline: 'My Dedicated Farm Plan',
        subtitle: '₹20,000 / Month • Most Popular',
        copy: 'Your own numbered plot with custom crop planning and dedicated concierge support.',
        stat: 'Dedicated Numbered Plot • Customer-Selected Crops • Priority Delivery',
        cta: 'Reserve Your Plot at www.purevegies.in',
        hashtags: '#DedicatedPlot #CustomFarming #MostPopular #FarmToFamily'
      },
      {
        id: 13,
        badge: 'PLAN SPOTLIGHT 03',
        headline: 'My Private Farm Plan',
        subtitle: '₹7,00,000 / Year • Bespoke HNI',
        copy: 'Up to 1/2 acre private managed estate with 24/7 live farm camera and personal manager.',
        stat: 'Live PTZ Camera Feed • Custom Chef Planning • Handcrafted Wooden Crates',
        cta: 'Consult Farm Manager at www.purevegies.in',
        hashtags: '#PrivateEstate #HNILuxury #BespokeLiving #UltraHNWI #FarmEstate'
      },
      {
        id: 14,
        badge: 'WHAT YOU RECEIVE',
        headline: 'What Does ₹10,000 / Month',
        subtitle: 'Give Your Household?',
        copy: 'A continuous weekly harvest box of verified clean vegetables without market runs.',
        stat: 'Weekly Deliveries • Bio-Dynamic Quality Pass • Zero Grocery Stress',
        cta: 'Start Today at www.purevegies.in',
        hashtags: '#ValueForHealth #SubscriptionFarming #HealthyFamilyLiving'
      },
      {
        id: 15,
        badge: 'PLOT ALLOCATION',
        headline: 'How Your Numbered Plot',
        subtitle: 'Actually Operates.',
        copy: 'Beds labeled with your household name, irrigated via precision sub-surface drip.',
        stat: 'Plot B-14 Allocation • Tailored Soil Bed • Trellised Climbers',
        cta: 'Choose Your Plot at www.purevegies.in',
        hashtags: '#PrivatePlots #SmartAgriculture #ModernFarming'
      },
      {
        id: 16,
        badge: 'HNI PRIVILEGE',
        headline: 'Inside The ₹7 Lakh Annual',
        subtitle: 'Private Farm Experience.',
        copy: 'Tailored for discerning families with private chefs and custom culinary requirements.',
        stat: 'Heirloom Varieties • Private Picnics • 24/7 Optical Streaming',
        cta: 'Inquire Confidentially at www.purevegies.in',
        hashtags: '#LuxuryFarming #PrivateRetreat #EstateAgriculture'
      },
      {
        id: 17,
        badge: 'PLAN SELECTION GUIDE',
        headline: 'Which Farming Plan Fits',
        subtitle: 'Your Family Size?',
        copy: '1–2 members: Family Plan • 3–6 members: Dedicated Plot • 7+ members: Private Estate.',
        stat: 'Balanced Harvest Yield • Zero Kitchen Waste',
        cta: 'Calculate on Our Wizard at www.purevegies.in',
        hashtags: '#FamilySize #CropCalculator #SmartKitchen'
      },
      {
        id: 18,
        badge: 'CROP CHOICE CONTROL',
        headline: 'Customer-Selected Crops',
        subtitle: 'vs. Agronomist Baskets.',
        copy: 'Choose only the vegetables your kids eat, or let our soil scientists rotate seasonal staples.',
        stat: 'Heirloom Tomatoes • Sweet Nantes Carrots • Crisp Cucumbers',
        cta: 'Build Your Crop List at www.purevegies.in',
        hashtags: '#CustomCrops #KitchenStaples #HealthyKidsFood'
      },
      {
        id: 19,
        badge: 'COLD CHAIN LOGISTICS',
        headline: 'Temperature-Controlled Crates',
        subtitle: 'Direct To Your Door.',
        copy: 'Pre-cooled to 12°C to prevent moisture sweating and maintain crisp cellular crunch.',
        stat: 'EV Delivery Fleet • Insulated Packs • Direct Handoff',
        cta: 'Learn About Our Logistics at www.purevegies.in',
        hashtags: '#ColdChain #FreshnessLock #DoorstepDelivery'
      },
      {
        id: 20,
        badge: 'VALUE & TRUST',
        headline: '3 Clear Plans.',
        subtitle: '1 Uncompromising Commitment.',
        copy: 'No land purchase capital. No labor negotiations. Complete farming peace of mind.',
        stat: 'Fixed Monthly Price • Dedicated Stewardship',
        cta: 'Compare Plans at www.purevegies.in',
        hashtags: '#FarmPlans #CleanFoodMovement #FamilyFirst'
      }
    ]
  },
  {
    category: 'The City Problem & Solution',
    theme: 'sage-organic',
    posts: [
      {
        id: 21,
        badge: 'URBAN CHALLENGE',
        headline: 'You Want Clean Food.',
        subtitle: 'You Don’t Have Time To Farm.',
        copy: 'Balcony pots yield two tomatoes a week. You need 30 kg a month for real family meals.',
        stat: 'Real Scale Agriculture • Zero Effort Required',
        cta: 'Get Managed Agriculture at www.purevegies.in',
        hashtags: '#UrbanFarmingAlternative #CityLife #BangaloreLife #PuneLiving'
      },
      {
        id: 22,
        badge: '6 FARMING BURDENS',
        headline: 'The 6 Headaches Of Farmland',
        subtitle: 'That We Solve For You.',
        copy: 'Land title disputes, labor retention, borewell failure, pest outbreaks, harvesting, and logistics.',
        stat: 'All 6 Managed by Experts • Zero Hassle for You',
        cta: 'Read Our Solution at www.purevegies.in',
        hashtags: '#FarmlandTruth #StressFreeLiving #SmartOwnership'
      },
      {
        id: 23,
        badge: 'SUPPLY CHAIN REALITY',
        headline: 'Market Produce Travels Weeks.',
        subtitle: 'Our Produce Travels Hours.',
        copy: 'By the time mandi vegetables hit retail shelves, 40% of vitamin C has degraded.',
        stat: 'Harvested at 6 AM • At Your Door by Lunch',
        cta: 'Feel the Difference at www.purevegies.in',
        hashtags: '#NutrientRetention #FreshVsStored #TrueFreshness'
      },
      {
        id: 24,
        badge: 'FOOD SECRETS',
        headline: 'What’s Really On Those',
        subtitle: 'Glossy Supermarket Peppers?',
        copy: 'Post-harvest fungicides and petroleum-based waxes keep store vegetables looking fresh for months.',
        stat: 'Zero Wax • Zero Storage Chemical • Just Real Soil',
        cta: 'Switch to Farm-to-Family at www.purevegies.in',
        hashtags: '#WaxFree #CleanProduce #ChemicalFreeLife #FoodAwakening'
      },
      {
        id: 25,
        badge: 'SCALE MATTERS',
        headline: 'Why Terrace Gardens Fall Short',
        subtitle: 'For Real Family Nutrition.',
        copy: 'A family needs 1,500+ sq.ft of deep living soil beds to sustain daily meals.',
        stat: '1,500 to 20,000 sq.ft Allocated • Professional Agronomy',
        cta: 'Scale Your Nutrition at www.purevegies.in',
        hashtags: '#TerraceGarden #RealScale #UrbanWellness'
      },
      {
        id: 26,
        badge: 'PEACE OF MIND',
        headline: 'The Daily Stress Of Sourcing',
        subtitle: 'Safe Vegetables Ends Today.',
        copy: 'Stop reading confusing grocery labels. Walk through your own plot whenever you want.',
        stat: 'Weekly Deliveries On Autopilot • Verified Purity',
        cta: 'Put Healthy Food on Autopilot at www.purevegies.in',
        hashtags: '#PeaceOfMind #MomsOfBangalore #FamilyNutrition'
      },
      {
        id: 27,
        badge: 'SMART WEALTH',
        headline: 'Don’t Buy 5 Rural Acres.',
        subtitle: 'Subscribe To A Managed Plot.',
        copy: 'Save millions in capital and legal headaches while enjoying the exact same harvest output.',
        stat: 'High Flexibility • Zero Land Taxes or Maintenance',
        cta: 'Calculate Savings at www.purevegies.in',
        hashtags: '#SmartInvesting #AgriTech #ManagedAssets'
      },
      {
        id: 28,
        badge: 'DELEGATION',
        headline: 'Zero Labor Management.',
        subtitle: '100% Crop Enjoyment.',
        copy: 'Our experienced cultivators earn fair salaries and take pride in growing your food.',
        stat: 'Experienced Agriculturalists • Fair Living Wages',
        cta: 'Support Responsible Farming at www.purevegies.in',
        hashtags: '#EthicalFarming #FairWages #SustainableAgriculture'
      },
      {
        id: 29,
        badge: 'NATURAL RIPENING',
        headline: 'Why Artificial Ripeners',
        subtitle: 'Ruin True Flavor.',
        copy: 'Ethylene gas forces color change without developing sugars. Our vegetables ripen on the vine.',
        stat: 'Sun-Ripened On Vine • Full Sugar Brix Profile',
        cta: 'Taste Real Tomatoes at www.purevegies.in',
        hashtags: '#VineRipened #NaturalFlavor #TasteTheDifference'
      },
      {
        id: 30,
        badge: 'LIFESTYLE',
        headline: 'Reclaim Your Weekend Peace.',
        subtitle: 'Let Us Farm For You.',
        copy: 'Spend Saturdays enjoying farm visits with your family, not fixing broken irrigation pumps.',
        stat: 'Pure Enjoyment • Professional Execution',
        cta: 'Live Better at www.purevegies.in',
        hashtags: '#WeekendVibes #SlowLiving #FamilyRetreat'
      }
    ]
  },
  {
    category: 'The 6-Step Journey',
    theme: 'editorial-cream',
    posts: [
      {
        id: 31,
        badge: 'THE 6-STEP PROCESS: 01',
        headline: 'Step 1: Choose Your Plan',
        subtitle: 'Tailored To Household Scale.',
        copy: 'Select from Family, Dedicated Plot, or Private Estate tiers with zero long-term land lock-in.',
        stat: 'Simple Monthly Subscription • Immediate Allocation',
        cta: 'Step 1 Starts at www.purevegies.in',
        hashtags: '#StepByStep #HowItWorks #FarmToFamilyJourney'
      },
      {
        id: 32,
        badge: 'THE 6-STEP PROCESS: 02',
        headline: 'Step 2: Select Your Crops',
        subtitle: 'What Your Kitchen Cook Loves.',
        copy: 'Handpick heirloom tomatoes, carrots, gourds, and culinary aromatics.',
        stat: 'Over 12 Seasonal Crops Available • Balanced Agronomy',
        cta: 'Choose Crops at www.purevegies.in',
        hashtags: '#CropSelection #MyKitchen #CustomVegetables'
      },
      {
        id: 33,
        badge: 'THE 6-STEP PROCESS: 03',
        headline: 'Step 3: Farm Space Allocated',
        subtitle: 'A Physical Plot With Your Name.',
        copy: 'Your dedicated numbered plot is prepared with tested soil and deep-aquifer drip lines.',
        stat: 'Anekal, Baramati & Sohna Estates • GPS Tagged',
        cta: 'View Farm Locations at www.purevegies.in',
        hashtags: '#PlotAllocated #RealSoil #EstatePlots'
      },
      {
        id: 34,
        badge: 'THE 6-STEP PROCESS: 04',
        headline: 'Step 4: Professional Cultivation',
        subtitle: 'Resident Agronomists On Duty.',
        copy: 'Daily bio-inoculation, weed control, and neem leaf foliar shielding.',
        stat: 'Dr. Murthy & Team • Bio-Dynamic Stewardship',
        cta: 'See Our Agronomy at www.purevegies.in',
        hashtags: '#AgronomyExcellence #ExpertFarmers #FieldCare'
      },
      {
        id: 35,
        badge: 'THE 6-STEP PROCESS: 05',
        headline: 'Step 5: Track On Your Phone',
        subtitle: 'From Seedbed To Fruit Setting.',
        copy: 'Follow growth percentages, days to harvest, and field photos on your dashboard.',
        stat: 'Real-Time Progress Bars • Photo Updates • Telemetry',
        cta: 'Explore Customer Portal at www.purevegies.in',
        hashtags: '#AgriTech #TrackYourFood #DigitalFarming'
      },
      {
        id: 36,
        badge: 'THE 6-STEP PROCESS: 06',
        headline: 'Step 6: Pre-Dawn Harvest & Delivery',
        subtitle: 'Direct To Your Kitchen Counter.',
        copy: 'Quality checked, packed into breathable eco-crates, and dispatched via chilled EV routes.',
        stat: 'Doorstep Delivery • Grade A+ Quality Classification',
        cta: 'Complete the Journey at www.purevegies.in',
        hashtags: '#HarvestDay #MorningDelivery #KitchenFresh'
      },
      {
        id: 37,
        badge: 'SOIL ARCHITECTURE',
        headline: 'How We Prepare Living Soil',
        subtitle: 'Before A Single Seed Is Sown.',
        copy: 'Aged vermicompost, cow dung slurry, and biochar restore ancient fungal networks.',
        stat: 'Living Organic Carbon 1.42% • Aerated Ridge Beds',
        cta: 'Learn Soil Biology at www.purevegies.in',
        hashtags: '#SoilPreparation #Biochar #LivingEarth'
      },
      {
        id: 38,
        badge: 'DAWN HARVEST',
        headline: 'The 5:30 AM Harvest Protocol',
        subtitle: 'Why Timing Is Everything.',
        copy: 'Harvesting before the morning sun preserves high cellular water turgor and natural sweetness.',
        stat: '16°C Morning Ambient • Sanitized Shears Only',
        cta: 'Read Our Harvest Specs at www.purevegies.in',
        hashtags: '#DawnHarvest #CircadianAgriculture #PeakFlavor'
      },
      {
        id: 39,
        badge: 'BREATHABLE PACKAGING',
        headline: 'Say No To Suffocating Plastic.',
        subtitle: 'Our Eco-Chilled Linen Packs.',
        copy: 'Single-use plastic causes condensation and rot. Our breathable packs keep vegetables alive.',
        stat: '100% Breathable Linen & Timber • Reusable Crates',
        cta: 'Eco-Friendly Living at www.purevegies.in',
        hashtags: '#PlasticFree #EcoPackaging #ZeroWasteKitchen'
      },
      {
        id: 40,
        badge: 'THE TIME DIFFERENCE',
        headline: 'From Soil To Salad Bowl',
        subtitle: 'In Under 12 Hours.',
        copy: 'No wholesale distributors. No auction yards. Pure, uninterrupted farm-to-family connection.',
        stat: '12 Hours Flat • Direct Custody Handover',
        cta: 'Taste It Today at www.purevegies.in',
        hashtags: '#HyperLocal #DirectToConsumer #SpeedToPlate'
      }
    ]
  },
  {
    category: 'Trust, Science & Verification',
    theme: 'royal-gold',
    posts: [
      {
        id: 41,
        badge: 'AUDITABLE TRUST',
        headline: 'We Don’t Make Fake Claims.',
        subtitle: 'We Publish Real Lab Tests.',
        copy: 'No untested "100% organic" stickers. Real multi-residue gas chromatography screening.',
        stat: 'Synthetic Pesticides: Not Detected (<0.01 mg/kg)',
        cta: 'Download Lab Reports at www.purevegies.in',
        hashtags: '#LabTested #FoodSafety #VerifiedProduce #ScientificFarming'
      },
      {
        id: 42,
        badge: 'TRACEABILITY',
        headline: 'What Does Traceable Farming',
        subtitle: 'Actually Look Like?',
        copy: 'A QR code on your crate links to the specific plot, soil assay, and harvest time.',
        stat: 'Plot ID • Agronomist Sign-Off • Time Stamp',
        cta: 'Scan a Demo Batch at www.purevegies.in',
        hashtags: '#Traceability #FoodAudit #TransparentLiving'
      },
      {
        id: 43,
        badge: 'WATER PURITY',
        headline: 'Aquifer Purity Matters.',
        subtitle: 'Water TDS Kept Under 210 mg/L.',
        copy: 'Vegetables are 90% water. If irrigation water carries industrial runoff, so do your greens.',
        stat: 'Deep Borewell Aquifers • Double Filtered Potable Water',
        cta: 'Check Water Assays at www.purevegies.in',
        hashtags: '#PureWater #IrrigationPurity #CleanSource'
      },
      {
        id: 44,
        badge: 'SOIL MICROBIOME',
        headline: 'Feeding The Living Soil,',
        subtitle: 'Not Chemical Salts.',
        copy: 'Commercial synthetic urea burns soil microbes. We nourish earth with fermented botanicals.',
        stat: 'Trichoderma Inoculants • Jeevamrutha Micro-Spray',
        cta: 'Explore Soil Chemistry at www.purevegies.in',
        hashtags: '#OrganicMicrobiome #LivingSoil #SoilCare'
      },
      {
        id: 45,
        badge: 'WHAT WE DO NOT SPRAY',
        headline: 'Zero Synthetic Systemic Chemicals.',
        subtitle: 'Enforced Across Every Acre.',
        copy: 'Systemic chemicals enter plant tissue and cannot be washed off. We forbid them completely.',
        stat: 'Zero Neonicotinoids • Zero Synthetic Hormones',
        cta: 'Read Our Cultivation Charter at www.purevegies.in',
        hashtags: '#NoChemicals #SafeFood #PureSoil'
      },
      {
        id: 46,
        badge: 'NATURE’S SHIELD',
        headline: 'Marigolds & Ladybugs:',
        subtitle: 'Our Biological Defense System.',
        copy: 'Trap crops attract pests naturally while beneficial predatory insects keep leaves clean.',
        stat: 'Natural Bio-Predation • Zero Chemical Poison',
        cta: 'See Bio-Defenses at www.purevegies.in',
        hashtags: '#Biocontrol #Ladybugs #NatureWorks'
      },
      {
        id: 47,
        badge: 'BATCH VERIFICATION',
        headline: 'Every Harvest Box Has',
        subtitle: 'An Inspector Signature.',
        copy: 'Inspected for brix sweetness, skin integrity, and clean root wash before boxing.',
        stat: '4-Point Quality Inspection Pass Required',
        cta: 'Our Quality Standards at www.purevegies.in',
        hashtags: '#QualityControl #GradeA #ProduceQuality'
      },
      {
        id: 48,
        badge: 'INDEPENDENT LABS',
        headline: 'Tested At NABL-Accredited',
        subtitle: 'Third-Party Laboratories.',
        copy: 'Periodic multi-residue test certificates accessible on your customer dashboard anytime.',
        stat: 'Heavy Metals Below Detection Limits',
        cta: 'View Certificates at www.purevegies.in',
        hashtags: '#NABLAccredited #VerifiedSafe #FoodTesting'
      },
      {
        id: 49,
        badge: 'NO GIMMICKS',
        headline: 'Why We Refuse Generic',
        subtitle: 'Marketing Certifications.',
        copy: 'Trust is built through open gates, continuous testing, and direct family relationships.',
        stat: 'Open Transparency > Marketing Stickers',
        cta: 'Experience Honesty at www.purevegies.in',
        hashtags: '#RealTrust #AuthenticBrand #NoGreenwashing'
      },
      {
        id: 50,
        badge: 'THE AUDIT TRAIL',
        headline: 'The Verifiable Journey Of',
        subtitle: 'A Single Heirloom Tomato.',
        copy: 'Sown Aug 15 • Trellised Sep 10 • Harvested Oct 09 • Delivered to Whitefield by 11 AM.',
        stat: 'Complete Lifecycle Log In Your Portal',
        cta: 'Track Your Crops at www.purevegies.in',
        hashtags: '#TomatoJourney #LifecycleTracking #FarmToPlate'
      }
    ]
  },
  {
    category: 'Crop Spotlights & Harvest Profiles',
    theme: 'forest-luxe',
    posts: [
      {
        id: 51,
        badge: 'CROP SPOTLIGHT: TOMATO',
        headline: 'Heirloom San Marzano Tomatoes',
        subtitle: 'Sun-Ripened Sweetness & Umami.',
        copy: 'Grown on vertical jute trellises with zero synthetic sprays. Real tomato aroma you can smell.',
        stat: 'Indeterminate Vine Growth • Rich Brix Sweetness',
        cta: 'Taste Real Tomatoes at www.purevegies.in',
        hashtags: '#HeirloomTomatoes #SanMarzano #RealFlavor #CookingInspiration'
      },
      {
        id: 52,
        badge: 'CROP SPOTLIGHT: CARROT',
        headline: 'Early Nantes Sweet Carrots',
        subtitle: 'Grown In Aerated Sand Beds.',
        copy: 'Crisp, sweet, and bursting with beta-carotene. Washed in clean well-head water.',
        stat: 'Zero Chemical Wax • Naturally Tender Root Crunch',
        cta: 'Order Carrots at www.purevegies.in',
        hashtags: '#NantesCarrots #RootVegetables #KidsSnacks #CleanEats'
      },
      {
        id: 53,
        badge: 'CROP SPOTLIGHT: CUCUMBER',
        headline: 'English Seedless Cucumbers',
        subtitle: 'Zero Bitterness Guaranteed.',
        copy: 'Trellised high above the ground so fruits never touch soil grit. Refreshing and ultra-hydrating.',
        stat: 'Thin Skin • Crisp Seedless Core • Pure Crunch',
        cta: 'Taste English Cucumbers at www.purevegies.in',
        hashtags: '#EnglishCucumber #SaladGoals #Hydration #Crunchy'
      },
      {
        id: 54,
        badge: 'CROP SPOTLIGHT: CAPSICUM',
        headline: 'California Wonder Bell Peppers',
        subtitle: 'Thick Walls & Juicy Snap.',
        copy: 'Cultivated under 40% shade nets to protect tender skins from scorching sun.',
        stat: 'High Vitamin C • Crisp Thick Walls • Vibrant Green',
        cta: 'Get Fresh Peppers at www.purevegies.in',
        hashtags: '#BellPeppers #Capsicum #SaladVeggies #StirFry'
      },
      {
        id: 55,
        badge: 'CROP SPOTLIGHT: LAUKI',
        headline: 'Tender Bottle Gourd (Lauki)',
        subtitle: 'Morning Juice Perfection.',
        copy: 'Light green, slender, seedless center. Harvested early when skin yields to a gentle thumbnail.',
        stat: 'Alkalizing & Digestible • Harvested Pre-Dawn',
        cta: 'Fresh Lauki at www.purevegies.in',
        hashtags: '#BottleGourd #LaukiJuice #AyurvedicLiving #GutHealth'
      },
      {
        id: 56,
        badge: 'CROP SPOTLIGHT: CHILLI',
        headline: 'Sun-Ripened Green Chillies',
        subtitle: 'Crisp Kick & Clean Aroma.',
        copy: 'Never chemically forced. Naturally sun-warmed chillies with balanced capsaicin and zing.',
        stat: 'Clean Pods • Zero Residue • Aromatic Punch',
        cta: 'Fresh Spices at www.purevegies.in',
        hashtags: '#GreenChilli #IndianCooking #FreshFlavors #Spicy'
      },
      {
        id: 57,
        badge: 'CROP SPOTLIGHT: PEAS',
        headline: 'Sweet Frost Green Peas',
        subtitle: 'Plump Pods Of Morning Sweetness.',
        copy: 'Picked in peak winter chill when natural plant sugars are at their highest concentration.',
        stat: 'Tender Sweet Peas • Direct From Pod To Pot',
        cta: 'Seasonal Peas at www.purevegies.in',
        hashtags: '#GreenPeas #Matar #WinterHarvest #SweetPeas'
      },
      {
        id: 58,
        badge: 'CROP SPOTLIGHT: BEANS',
        headline: 'Slender French Green Beans',
        subtitle: 'Stringless & Tender Snaps.',
        copy: 'Climbing legume vines that naturally fix atmospheric nitrogen into your family plot soil.',
        stat: 'Stringless Variety • Harvested Every 4 Days',
        cta: 'French Beans at www.purevegies.in',
        hashtags: '#FrenchBeans #Legumes #PlantProtein #FarmFresh'
      },
      {
        id: 59,
        badge: 'CROP SPOTLIGHT: CAULIFLOWER',
        headline: 'Snowball White Cauliflower',
        subtitle: 'Naturally Blanched Porcelain Heads.',
        copy: 'Leaves tucked by hand over heads to protect porcelain florets from sun discoloration.',
        stat: 'Dense Tight Florets • Zero Synthetic Pesticides',
        cta: 'Fresh Cauliflower at www.purevegies.in',
        hashtags: '#Cauliflower #Gobi #Cruciferous #CleanEating'
      },
      {
        id: 60,
        badge: 'CROP SPOTLIGHT: GREENS',
        headline: 'Tender Baby Spinach & Herbs',
        subtitle: 'Harvested With Morning Dew.',
        copy: 'Soft tender leaves grown in compost mulch beds. High iron, zero synthetic foliar sprays.',
        stat: 'Palak • Coriander • Mint • Basil',
        cta: 'Leafy Greens at www.purevegies.in',
        hashtags: '#Spinach #Palak #Herbs #GreenSmoothie'
      }
    ]
  },
  {
    category: 'Technology & Telemetry',
    theme: 'earth-warmth',
    posts: [
      {
        id: 61,
        badge: 'CUSTOMER PORTAL',
        headline: 'Your Farm In Your Pocket.',
        subtitle: 'The Customer Dashboard.',
        copy: 'View your Plot ID, days to harvest, delivery routes, and soil health on any device.',
        stat: 'Live Dashboard • Weekly Photos • Agronomist Notes',
        cta: 'Tour the Portal at www.purevegies.in',
        hashtags: '#AgriTech #SmartFarming #CustomerPortal #ModernFamily'
      },
      {
        id: 62,
        badge: 'LIVE MONITORING',
        headline: 'Live Farm Camera Feed.',
        subtitle: 'Watch Your Crops Grow Anytime.',
        copy: 'Private estate subscribers enjoy 24/7 high-definition streaming directly from the field.',
        stat: 'PTZ Camera Controls • North & South Trellis Angles',
        cta: 'See Live Cam at www.purevegies.in',
        hashtags: '#LiveStream #FarmCam #TransparencyInAction #TechAg'
      },
      {
        id: 63,
        badge: 'IOT SENSORS',
        headline: 'Real-Time Soil Telemetry:',
        subtitle: 'Moisture, Temp & Sunlight.',
        copy: 'Sub-surface soil sensors measure moisture at 38% field capacity for perfect root uptake.',
        stat: 'Moisture 38.4% • Temp 24.8°C • Solar Lux 48,200',
        cta: 'Explore IoT Tech at www.purevegies.in',
        hashtags: '#IoTAgriculture #PrecisionFarming #SmartSensors'
      },
      {
        id: 64,
        badge: 'DIGITAL LIFECYCLE',
        headline: 'Track Your Carrot’s Growth',
        subtitle: 'From Germination To Harvest.',
        copy: 'Visual progress rings update as your root crops swell in raised sand-loam furrows.',
        stat: 'Day 0 to Day 75 Tracked Live',
        cta: 'Watch Crops Grow at www.purevegies.in',
        hashtags: '#CropLifecycle #FarmTracking #DigitalGardening'
      },
      {
        id: 65,
        badge: 'FIELD DIARY',
        headline: 'Agronomist Field Notes',
        subtitle: 'Delivered To Your WhatsApp.',
        copy: 'Dr. Murthy shares weekly shoot counts, pollination updates, and harvest forecasts.',
        stat: 'Weekly Audio & Photo Journal Logs',
        cta: 'Get WhatsApp Updates at www.purevegies.in',
        hashtags: '#FieldNotes #WhatsAppUpdates #FarmDiary'
      },
      {
        id: 66,
        badge: 'SUSTAINABLE FLEET',
        headline: 'Cold-Chain EV Delivery.',
        subtitle: 'Zero Urban Transit Emissions.',
        copy: 'Electric vehicles running optimized morning routes deliver chilled produce with low carbon footprint.',
        stat: 'Pre-Chilled 12°C • EV Fleet Logistics',
        cta: 'Green Delivery at www.purevegies.in',
        hashtags: '#EVLogistics #SustainableLogistics #GreenDelivery'
      },
      {
        id: 67,
        badge: 'DIGITAL MANIFEST',
        headline: 'Download Batch QC Pass',
        subtitle: 'With Every Harvest Delivery.',
        copy: 'Weight breakdown, quality grade (A+), and inspector certificate attached to each crate.',
        stat: 'Complete Digital Invoicing & Lab Certificates',
        cta: 'Check Batch Pass at www.purevegies.in',
        hashtags: '#QualityCertificate #BatchPass #FoodSafetyFirst'
      },
      {
        id: 68,
        badge: 'MULTI-CAM VIEW',
        headline: '4 Camera Angles On Plot B-14.',
        subtitle: 'Trellis, Drip Hub & Canopy.',
        copy: 'Switch cameras from your phone to check tomato clusters or drip line manifolds.',
        stat: '1080p Optical Stream • Day & Night Telemetry',
        cta: 'Watch Farm Cam at www.purevegies.in',
        hashtags: '#SecurityCam #FarmMonitoring #TechLuxury'
      },
      {
        id: 69,
        badge: 'ONLINE WIZARD',
        headline: 'Interactive Farm Builder:',
        subtitle: 'Design Your Plot In 60 Seconds.',
        copy: 'Input your family size and favorite veggies. We calculate exact square footage and harvest kg.',
        stat: 'Instant Dynamic Farm Requirement Calculation',
        cta: 'Try Builder at www.purevegies.in/build-your-farm',
        hashtags: '#FarmBuilder #CustomPlot #InteractiveTool'
      },
      {
        id: 70,
        badge: 'AGRITECH FUTURE',
        headline: 'Old-School Soil Mastery,',
        subtitle: 'Modern Cloud Architecture.',
        copy: 'Pairing generation-old agricultural wisdom with Next.js dashboards and IoT sensors.',
        stat: 'The Best of Both Worlds For Your Family',
        cta: 'Experience AgriTech at www.purevegies.in',
        hashtags: '#ModernAgri #AgriTechPlatform #FutureOfFood'
      }
    ]
  },
  {
    category: 'Our Estates & Agronomists',
    theme: 'sage-organic',
    posts: [
      {
        id: 71,
        badge: 'ESTATE SHOWCASE 01',
        headline: 'Anekal Valley Agro Estate',
        subtitle: 'South Bengaluru Foothills.',
        copy: '24 acres of red sandy loam soil fed by deep aquifers and natural rainwater harvesting lakes.',
        stat: 'Red Sandy Loam • Soil pH 6.8 • Water TDS 185',
        cta: 'Visit Anekal at www.purevegies.in/farms',
        hashtags: '#BangaloreFarms #Anekal #KarnatakaAgriculture #LocalProduce'
      },
      {
        id: 72,
        badge: 'ESTATE SHOWCASE 02',
        headline: 'Sahyadri Terraces Farm',
        subtitle: 'Baramati Ridge, Western Ghats.',
        copy: '35 acres of nutrient-rich black silt loam along the mist-cooled leeward slopes of Maharashtra.',
        stat: 'Black Silt Loam • Mountain Drip Canal • Soil pH 7.1',
        cta: 'Visit Sahyadri at www.purevegies.in/farms',
        hashtags: '#PuneFarms #Sahyadri #WesternGhats #MaharashtraAgriculture'
      },
      {
        id: 73,
        badge: 'ESTATE SHOWCASE 03',
        headline: 'Aravalli Greens Sanctuary',
        subtitle: 'Sohna Rural Corridor, Gurugram.',
        copy: '18 acres of fertile alluvial loamy clay serving Delhi NCR households with verified pure greens.',
        stat: 'Alluvial Loam • Aquifer RO Filtered • Soil pH 7.3',
        cta: 'Visit Aravalli at www.purevegies.in/farms',
        hashtags: '#DelhiNCR #Gurugram #Sohna #NCRFamilies'
      },
      {
        id: 74,
        badge: 'SOIL DIFFERENCES',
        headline: 'Red Loam vs. Black Silt:',
        subtitle: 'Why Location Matters.',
        copy: 'Carrots thrive in aerated Anekal sand; tomatoes develop deep sweetness in mineral-rich Sahyadri loam.',
        stat: 'Optimal Micro-Climates For Every Crop',
        cta: 'Read Soil Science at www.purevegies.in',
        hashtags: '#SoilTypes #MicroClimate #Terroir #FoodOrigin'
      },
      {
        id: 75,
        badge: 'PURE WATER',
        headline: 'Protected Aquifer Wells:',
        subtitle: 'The Lifeblood Of Clean Food.',
        copy: 'Located miles away from industrial drainage corridors. Tested quarterly by accredited labs.',
        stat: 'Pristine Rural Green Belts • TDS < 200 mg/L',
        cta: 'Check Water Data at www.purevegies.in',
        hashtags: '#CleanWater #Aquifers #SafeFarming'
      },
      {
        id: 76,
        badge: 'MEET THE TEAM',
        headline: 'Dr. Srinivas Murthy',
        subtitle: 'Ph.D. In Soil Microbiology.',
        copy: '28 years researching living soil fungal networks and non-synthetic root protection protocols.',
        stat: 'Lead Agronomist • South Bengaluru Estate',
        cta: 'Meet Dr. Murthy at www.purevegies.in/about',
        hashtags: '#ChiefAgronomist #SoilMicrobiologist #ScienceInAg'
      },
      {
        id: 77,
        badge: 'MEET THE TEAM',
        headline: 'Kavita Deshmukh, M.Sc.',
        subtitle: 'Head of Regenerative Agronomy.',
        copy: '19 years perfecting drip fertigation with fermented botanicals in the Western Ghats.',
        stat: 'Lead Agronomist • Sahyadri Terraces, Pune',
        cta: 'Meet Kavita at www.purevegies.in/about',
        hashtags: '#WomenInAg #AgronomyExpert #RegenerativeFarming'
      },
      {
        id: 78,
        badge: 'MEET THE TEAM',
        headline: 'Harinder Singh Brar',
        subtitle: 'Master Estate Cultivator.',
        copy: 'Third-generation agriculturalist leading heirloom seeds and cold-chain harvesting in NCR.',
        stat: 'Director of Cultivation • Aravalli Sanctuary',
        cta: 'Meet Harinder at www.purevegies.in/about',
        hashtags: '#MasterFarmer #ThirdGenFarmer #FarmHeritage'
      },
      {
        id: 79,
        badge: 'SOCIAL INTEGRITY',
        headline: 'Cultivators With Dignity',
        subtitle: '& Guaranteed Monthly Wages.',
        copy: 'Our farmers receive steady salaries, healthcare, and pride in farming unpoisoned food.',
        stat: 'Zero Middleman Debt • Proud Farmer Community',
        cta: 'Support Ethical Farming at www.purevegies.in',
        hashtags: '#FairTrade #FarmerWelfare #DignityInLabor'
      },
      {
        id: 80,
        badge: 'ISOLATED SANCTUARY',
        headline: 'Ecologically Isolated Greenbelts',
        subtitle: 'Protected From City Smog.',
        copy: 'Our farms sit in protected rural buffer zones with clean mountain breezes and clear skies.',
        stat: '45 to 90 Minutes From City Centers',
        cta: 'Find Your Nearest Farm at www.purevegies.in',
        hashtags: '#Greenbelt #RuralSanctuary #CleanAir'
      }
    ]
  },
  {
    category: 'Farm Visits & Family Experiences',
    theme: 'editorial-cream',
    posts: [
      {
        id: 81,
        badge: 'OPEN GATE POLICY',
        headline: 'Don’t Just Trust Us.',
        subtitle: 'Visit Your Farm This Weekend.',
        copy: 'Every subscribed family has open invitations to walk their plot and meet the agronomists.',
        stat: 'Saturday & Sunday 7 AM – 4 PM • Slot Booking',
        cta: 'Book Farm Visit at www.purevegies.in',
        hashtags: '#FarmVisit #WeekendGetaway #BangaloreWeekends #PuneOutings'
      },
      {
        id: 82,
        badge: 'KIDS & NATURE',
        headline: 'Show Your Children Where',
        subtitle: 'Carrots Actually Grow.',
        copy: 'Let them pull a crunchy carrot straight from the soil and taste real morning sweetness.',
        stat: 'Unforgettable Family Memories • Screen-Free Morning',
        cta: 'Plan a Family Visit at www.purevegies.in',
        hashtags: '#NatureEducation #KidsInNature #HandsInSoil #ParentingGoals'
      },
      {
        id: 83,
        badge: 'WEEKEND DETOX',
        headline: 'Weekend Farm Mornings',
        subtitle: 'Away From Urban Smog & Screens.',
        copy: 'Breathe crisp morning air, sip fresh well-head herbal tea, and walk living green rows.',
        stat: 'Tranquil Agro-Estates • 60 Mins from Whitefield/Koregaon',
        cta: 'Escape the City at www.purevegies.in',
        hashtags: '#WeekendDetox #SlowMorning #Countryside #SoulFood'
      },
      {
        id: 84,
        badge: 'GUIDED WALK',
        headline: 'Walk Your Numbered Plot',
        subtitle: 'With Our Chief Agronomist.',
        copy: 'Ask questions, touch the soil, inspect the drip tubing, and understand your family’s crops.',
        stat: 'Private 1-on-1 Agronomy Consultations',
        cta: 'Schedule Tour at www.purevegies.in',
        hashtags: '#GuidedTour #AgriTour #LearnFarming'
      },
      {
        id: 85,
        badge: 'HARVEST EXPERIENCE',
        headline: 'The Pure Joy Of Harvesting',
        subtitle: 'Your Own Salad With Your Kids.',
        copy: 'Clip crisp cucumbers and sweet tomatoes yourself and bring them home for Sunday lunch.',
        stat: 'Harvest Basket Provided • Farm Gate Fresh',
        cta: 'Harvest With Us at www.purevegies.in',
        hashtags: '#HarvestWithKids #FreshSalad #FarmToTable'
      },
      {
        id: 86,
        badge: 'OPEN GATES',
        headline: 'No Closed Compounds.',
        subtitle: 'No Secret Pesticide Rooms.',
        copy: 'Inspect our bio-compost pits, our neem extracts, and our seed propagation trays.',
        stat: '100% Verifiable Reality • Nothing Hidden',
        cta: 'Experience Transparency at www.purevegies.in',
        hashtags: '#OpenDoors #TransparentLife #Integrity'
      },
      {
        id: 87,
        badge: 'COMMUNITY',
        headline: 'Join A Mindful Community',
        subtitle: 'Of Health-Conscious Families.',
        copy: 'Doctors, entrepreneurs, and parents who refuse to compromise on what their children eat.',
        stat: 'Over 120 Pilot Families Already Enrolled',
        cta: 'Join the Community at www.purevegies.in',
        hashtags: '#CommunityWellness #ConsciousLiving #HealthTribe'
      },
      {
        id: 88,
        badge: 'NATURE THERAPY',
        headline: 'Fresh Country Air.',
        subtitle: 'Microbe-Rich Soil. Pure Living.',
        copy: 'Studies show exposure to diverse soil microbes boosts immunity and reduces anxiety.',
        stat: 'Natural Soil Serotonin • Restorative Mornings',
        cta: 'Heal in Nature at www.purevegies.in',
        hashtags: '#MicrobiomeHealth #Grounding #Earthing #NatureHeals'
      },
      {
        id: 89,
        badge: 'VISITING SLOTS',
        headline: 'Saturday & Sunday Mornings',
        subtitle: 'Reserve Your Family Slot.',
        copy: 'Slots are limited each weekend to maintain peaceful, uncrowded farm estate grounds.',
        stat: 'Complimentary For Subscribed Families',
        cta: 'Reserve Slot at www.purevegies.in',
        hashtags: '#BookYourSlot #FarmPicnic #WeekendRoutine'
      },
      {
        id: 90,
        badge: 'REAL ROOTS',
        headline: 'Touch The Living Soil',
        subtitle: 'That Feeds Your Household.',
        copy: 'Because food is not just calories in a plastic packet. It is a sacred connection.',
        stat: 'Reconnecting You With The Earth',
        cta: 'Walk The Land at www.purevegies.in',
        hashtags: '#DeepRoots #SacredFood #SoilConnection'
      }
    ]
  },
  {
    category: 'Nutrition, Wellness & Testimonials',
    theme: 'royal-gold',
    posts: [
      {
        id: 91,
        badge: 'FAMILY TESTIMONIAL',
        headline: '"Our 7-Year-Old Daughter',
        subtitle: 'Finally Loves Cucumbers."',
        copy: 'Store cucumbers were always bitter. The seedless cucumbers on Plot B-14 are crisp and sweet.',
        stat: '— Rahul & Priya Verma, Bengaluru (Whitefield)',
        cta: 'Read Stories at www.purevegies.in',
        hashtags: '#CustomerReview #FamilyStory #BangaloreMoms #RealFeedback'
      },
      {
        id: 92,
        badge: 'ESTATE TESTIMONIAL',
        headline: '"Half An Acre Managed',
        subtitle: 'Exclusively For Our Household."',
        copy: 'Our private chef coordinates harvest cuts directly with Harinder. The live camera gives peace of mind.',
        stat: '— Vikram Singhania, Gurugram (Sector 42)',
        cta: 'Private Farm Inquiries at www.purevegies.in',
        hashtags: '#HNIClient #LuxuryLiving #GurugramLife #PrivateEstate'
      },
      {
        id: 93,
        badge: 'HOUSEHOLD TESTIMONIAL',
        headline: '"Pure Food Without The',
        subtitle: 'Sunday Mandi Hassle."',
        copy: 'The bi-weekly soil moisture notes and pre-chilled boxes show world-class professionalism.',
        stat: '— Meera Patel, Pune (Undri)',
        cta: 'Subscribe at www.purevegies.in',
        hashtags: '#PuneFoodie #HappyCustomer #CleanNutrition'
      },
      {
        id: 94,
        badge: 'THE SENSE OF TASTE',
        headline: 'Real Food Has Real Aroma.',
        subtitle: 'Taste What You’ve Been Missing.',
        copy: 'When was the last time a tomato filled your kitchen with aroma as soon as you sliced it?',
        stat: 'Real Phytonutrients • Natural Terroir Sweetness',
        cta: 'Rediscover Flavor at www.purevegies.in',
        hashtags: '#RealFoodTaste #SensoryCooking #ChefSecret'
      },
      {
        id: 95,
        badge: 'GUT HEALTH',
        headline: 'Why True Gut Health',
        subtitle: 'Begins In Living Farm Soil.',
        copy: 'Vegetables grown in sterilized chemical soil lack beneficial endophytes that nourish human gut flora.',
        stat: 'Living Soil Biology = Resilient Human Microbiome',
        cta: 'Support Your Gut at www.purevegies.in',
        hashtags: '#GutHealth #MicrobiomeScience #FunctionalFood'
      },
      {
        id: 96,
        badge: 'CULINARY ART',
        headline: 'Cooking With Dawn-Picked Crops:',
        subtitle: 'A Home Chef’s Dream.',
        copy: 'Tender beans that cook in 4 minutes. Sweet carrots that don’t need sugar in soup broth.',
        stat: 'Peak Turgor Moisture • Culinary Grade A+',
        cta: 'Cook With Us at www.purevegies.in',
        hashtags: '#HomeChef #CulinaryArt #FarmCooking #Foodie'
      },
      {
        id: 97,
        badge: 'NUTRITION SCIENCE',
        headline: 'Vitamin C Drops By 50%',
        subtitle: 'In Just 72 Hours After Harvest.',
        copy: 'Supermarket vegetables sit in warehouses for days. We deliver within hours of clipping.',
        stat: 'Maximum Antioxidants • Zero Nutrient Degradation',
        cta: 'Protect Nutrients at www.purevegies.in',
        hashtags: '#NutritionFacts #VitaminC #FoodScience #EatFresh'
      },
      {
        id: 98,
        badge: 'LONG TERM HEALTH',
        headline: 'Invest In Clean Food Today.',
        subtitle: 'Save On Medical Bills Tomorrow.',
        copy: 'Preventive wellness starts three times a day at your kitchen dining table.',
        stat: 'Clean Food As Medicine • Lifelong Family Health',
        cta: 'Invest in Health at www.purevegies.in',
        hashtags: '#PreventiveHealth #FoodAsMedicine #Longevity'
      },
      {
        id: 99,
        badge: 'FAMILY ETHOS',
        headline: 'Your Dinner Table Deserves',
        subtitle: 'Uncompromised Truth.',
        copy: 'Join the families who decided that where food comes from matters more than convenience store discounts.',
        stat: 'The Trusted Family Farming Service',
        cta: 'Begin Your Farm at www.purevegies.in',
        hashtags: '#DinnerTable #FamilyValues #UncompromisedTruth'
      },
      {
        id: 100,
        badge: 'CALL TO ACTION',
        headline: 'Build Your Family’s Farm.',
        subtitle: 'We Grow It. You Enjoy It.',
        copy: 'No land purchase. No farming liability. Premium managed agriculture delivered to your door.',
        stat: 'Plans Starting at ₹10,000 / Month • Limited Plot Slots',
        cta: 'Build My Farm at www.purevegies.in',
        hashtags: '#FarmToFamily #CleanLiving #TransformYourKitchen #JoinNow'
      }
    ]
  }
];

// Flat list of all 100 posts
const allPosts = [];
campaigns.forEach(c => {
  c.posts.forEach(p => {
    allPosts.push({
      ...p,
      category: c.category,
      theme: c.theme
    });
  });
});

console.log(`Prepared ${allPosts.length} social media posts data.`);

// Theme color configurations
const themeStyles = {
  'forest-luxe': {
    bg: '#0F2417',
    border: '#2A5237',
    accent: '#D4A373',
    badgeBg: '#1B3D28',
    badgeText: '#A1D1AF',
    textMain: '#FAF8F5',
    textSub: '#D1DFD6',
    cardBg: '#163321',
    ctaBg: '#FAF8F5',
    ctaText: '#0F2417',
    tagColor: '#8EC39D'
  },
  'earth-warmth': {
    bg: '#1C1510',
    border: '#4A3423',
    accent: '#E6A868',
    badgeBg: '#382618',
    badgeText: '#EDC69D',
    textMain: '#FAF6F0',
    textSub: '#DECFC2',
    cardBg: '#2A1F17',
    ctaBg: '#E6A868',
    ctaText: '#1C1510',
    tagColor: '#D4A373'
  },
  'sage-organic': {
    bg: '#162B1E',
    border: '#35543F',
    accent: '#98D8AA',
    badgeBg: '#24422F',
    badgeText: '#B8E8C5',
    textMain: '#FAF8F5',
    textSub: '#D2E3D7',
    cardBg: '#1E3B29',
    ctaBg: '#FAF8F5',
    ctaText: '#162B1E',
    tagColor: '#98D8AA'
  },
  'editorial-cream': {
    bg: '#F5EFE6',
    border: '#D8CDBF',
    accent: '#8C5528',
    badgeBg: '#E5DACB',
    badgeText: '#1A3323',
    textMain: '#14261A',
    textSub: '#425346',
    cardBg: '#FFFFFF',
    ctaBg: '#14261A',
    ctaText: '#FAF8F5',
    tagColor: '#8C5528'
  },
  'royal-gold': {
    bg: '#121714',
    border: '#8C7438',
    accent: '#D4AF37',
    badgeBg: '#242B24',
    badgeText: '#E6CA65',
    textMain: '#FAF8F5',
    textSub: '#D8D4C8',
    cardBg: '#1A211D',
    ctaBg: '#D4AF37',
    ctaText: '#121714',
    tagColor: '#E6CA65'
  }
};

function generateSvgForPost(post) {
  const t = themeStyles[post.theme] || themeStyles['forest-luxe'];

  // Escape XML characters
  const esc = (str) =>
    (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

  const numStr = String(post.id).padStart(3, '0');

  return `<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${post.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${t.bg}" />
      <stop offset="100%" stop-color="${t.cardBg}" />
    </linearGradient>
    <filter id="shadow-${post.id}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1080" height="1080" fill="url(#grad-${post.id})"/>

  <!-- Subtle corner radial glow -->
  <circle cx="1080" cy="0" r="450" fill="${t.accent}" opacity="0.08"/>
  <circle cx="0" cy="1080" r="350" fill="${t.accent}" opacity="0.05"/>

  <!-- Outer Framing -->
  <rect x="44" y="44" width="992" height="992" rx="36" fill="none" stroke="${t.border}" stroke-width="2.5"/>
  <rect x="56" y="56" width="968" height="968" rx="28" fill="none" stroke="${t.border}" stroke-width="1" opacity="0.4"/>

  <!-- Brand Header -->
  <g transform="translate(540, 120)">
    <circle cx="-160" cy="-6" r="14" fill="${t.accent}" opacity="0.9"/>
    <text x="0" y="0" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="24" font-weight="800" fill="${t.textMain}" text-anchor="middle" letter-spacing="7">FARM-TO-FAMILY</text>
    <text x="0" y="26" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="600" fill="${t.tagColor}" text-anchor="middle" letter-spacing="4">PRIVATE MANAGED FARMING</text>
  </g>

  <!-- Badge Pill -->
  <g transform="translate(540, 215)">
    <rect x="-190" y="-18" width="380" height="36" rx="18" fill="${t.badgeBg}" stroke="${t.border}" stroke-width="1.5"/>
    <text x="0" y="6" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="800" fill="${t.badgeText}" text-anchor="middle" letter-spacing="2.5">${esc(post.badge)}</text>
  </g>

  <!-- Main Card Container -->
  <rect x="90" y="275" width="900" height="580" rx="32" fill="${t.cardBg}" stroke="${t.border}" stroke-width="1.5" filter="url(#shadow-${post.id})"/>

  <!-- Content Inside Card -->
  <!-- Headline Line 1 -->
  <text x="540" y="385" font-family="'Playfair Display', Georgia, serif" font-size="52" font-weight="bold" fill="${t.textMain}" text-anchor="middle">${esc(post.headline)}</text>
  
  <!-- Subtitle Line 2 -->
  <text x="540" y="455" font-family="'Playfair Display', Georgia, serif" font-size="42" font-style="italic" fill="${t.accent}" text-anchor="middle">${esc(post.subtitle)}</text>

  <!-- Divider Line -->
  <line x1="440" y1="500" x2="640" y2="500" stroke="${t.accent}" stroke-width="2" stroke-linecap="round"/>

  <!-- Explanatory Copy (Wrapped) -->
  <text x="540" y="565" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="24" font-weight="400" fill="${t.textSub}" text-anchor="middle" width="760">
    ${esc(post.copy)}
  </text>

  <!-- Key Stat / Feature Highlight Box -->
  <g transform="translate(540, 690)">
    <rect x="-370" y="-36" width="740" height="72" rx="20" fill="${t.bg}" stroke="${t.border}" stroke-width="1.5"/>
    <text x="0" y="8" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="19" font-weight="700" fill="${t.textMain}" text-anchor="middle" letter-spacing="1">
      ${esc(post.stat)}
    </text>
  </g>

  <!-- Social Series Tag & Index -->
  <text x="540" y="810" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" font-weight="700" fill="${t.tagColor}" text-anchor="middle" letter-spacing="3">
    OFFICIAL CAMPAIGN • POST #${numStr} OF 100
  </text>

  <!-- Bottom CTA Pill -->
  <g transform="translate(540, 930)">
    <rect x="-310" y="-32" width="620" height="64" rx="32" fill="${t.ctaBg}" filter="url(#shadow-${post.id})"/>
    <text x="0" y="8" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="18" font-weight="800" fill="${t.ctaText}" text-anchor="middle" letter-spacing="1.5">
      ${esc(post.cta.split(' at ')[0] || post.cta)} • purevegies.in
    </text>
  </g>

  <!-- Bottom Brand Watermark -->
  <text x="540" y="1025" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="600" fill="${t.textSub}" opacity="0.7" text-anchor="middle" letter-spacing="2">
    FARM-TO-FAMILY BY PUREVEGIES • WWW.PUREVEGIES.IN • WWW.PUREVEGIES.COM
  </text>
</svg>`;
}

async function run() {
  console.log('Starting generation of 100 promotional social media creatives...');
  const jsonCatalog = [];

  for (let i = 0; i < allPosts.length; i++) {
    const post = allPosts[i];
    const numStr = String(post.id).padStart(3, '0');
    const svgFilename = `post-${numStr}.svg`;
    const pngFilename = `post-${numStr}.png`;

    const svgPath = path.join(outDir, svgFilename);
    const pngPath = path.join(outDir, pngFilename);

    const svgContent = generateSvgForPost(post);

    // Write SVG
    fs.writeFileSync(svgPath, svgContent, 'utf-8');

    // Convert to PNG using sharp (1080x1080 high resolution)
    await sharp(Buffer.from(svgContent))
      .png({ quality: 95, compressionLevel: 8 })
      .toFile(pngPath);

    // Caption for Instagram / Facebook
    const socialCaption = `🌿 ${post.headline} ${post.subtitle}

${post.copy}

✨ Why Indian families are choosing Farm-to-Family:
• ${post.stat.split(' • ').join('\n• ')}
• Zero land ownership or farming labor required
• Direct doorstep cold-chain delivery

👉 ${post.cta}

Tap the link in bio or WhatsApp us directly at +91 98450 12345 to reserve your family's dedicated farm plot.

${post.hashtags}`;

    jsonCatalog.push({
      id: post.id,
      postNumber: numStr,
      badge: post.badge,
      headline: post.headline,
      subtitle: post.subtitle,
      copy: post.copy,
      stat: post.stat,
      category: post.category,
      theme: post.theme,
      cta: post.cta,
      hashtags: post.hashtags,
      imagePng: `/social-media/${pngFilename}`,
      imageSvg: `/social-media/${svgFilename}`,
      caption: socialCaption
    });

    if ((i + 1) % 10 === 0) {
      console.log(`Generated ${i + 1}/100 images...`);
    }
  }

  // Composite branding and domain purevegies.in on Flagship Hero Photos
  const hero1Path = path.join(outDir, 'flagship-hero-01.jpg');
  const hero2Path = path.join(outDir, 'flagship-hero-02.jpg');

  if (fs.existsSync(hero1Path)) {
    const overlaySvg1 = `
    <svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="topScrim1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.85"/>
          <stop offset="40%" stop-color="#000000" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="bottomScrim1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
          <stop offset="60%" stop-color="#000000" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.95"/>
        </linearGradient>
      </defs>
      <rect width="1080" height="350" fill="url(#topScrim1)"/>
      <rect y="640" width="1080" height="440" fill="url(#bottomScrim1)"/>
      <rect x="40" y="40" width="1000" height="1000" rx="32" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.4"/>
      <rect x="330" y="75" width="420" height="38" rx="19" fill="#102115" stroke="#4E7A5A" stroke-width="1.5"/>
      <text x="540" y="100" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" font-weight="800" fill="#A1D1AF" text-anchor="middle" letter-spacing="3">FARM-TO-FAMILY • PUREVEGIES.IN</text>
      <text x="540" y="175" font-family="'Playfair Display', Georgia, serif" font-size="46" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Your Family&apos;s Private Farm.</text>
      <text x="540" y="230" font-family="'Playfair Display', Georgia, serif" font-size="36" font-style="italic" fill="#E6A868" text-anchor="middle">We Grow It. You Enjoy It.</text>
      <rect x="180" y="845" width="720" height="56" rx="18" fill="#102115" stroke="#FAF8F5" stroke-width="1.5" opacity="0.95"/>
      <text x="540" y="880" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="18" font-weight="700" fill="#FAF8F5" text-anchor="middle">
        Dedicated Plots • Verified Living Soil • Dawn Harvest
      </text>
      <rect x="240" y="925" width="600" height="64" rx="32" fill="#FAF8F5"/>
      <text x="540" y="965" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="20" font-weight="800" fill="#102115" text-anchor="middle" letter-spacing="1">
        purevegies.in • purevegies.com
      </text>
    </svg>`;

    await sharp(hero1Path)
      .resize(1080, 1080)
      .composite([{ input: Buffer.from(overlaySvg1), top: 0, left: 0 }])
      .png()
      .toFile(path.join(outDir, 'flagship-hero-01-purevegies.png'));
    console.log('Generated flagship-hero-01-purevegies.png with domain purevegies.in overlay!');
  }

  if (fs.existsSync(hero2Path)) {
    const overlaySvg2 = `
    <svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="topScrim2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.85"/>
          <stop offset="40%" stop-color="#000000" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="bottomScrim2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
          <stop offset="60%" stop-color="#000000" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.95"/>
        </linearGradient>
      </defs>
      <rect width="1080" height="350" fill="url(#topScrim2)"/>
      <rect y="640" width="1080" height="440" fill="url(#bottomScrim2)"/>
      <rect x="40" y="40" width="1000" height="1000" rx="32" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.4"/>
      <rect x="300" y="75" width="480" height="38" rx="19" fill="#102115" stroke="#4E7A5A" stroke-width="1.5"/>
      <text x="540" y="100" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" font-weight="800" fill="#A1D1AF" text-anchor="middle" letter-spacing="3">VISIT YOUR FARM THIS WEEKEND • PUREVEGIES.IN</text>
      <text x="540" y="175" font-family="'Playfair Display', Georgia, serif" font-size="44" font-weight="bold" fill="#FFFFFF" text-anchor="middle">You Choose What Your Family Eats.</text>
      <text x="540" y="230" font-family="'Playfair Display', Georgia, serif" font-size="34" font-style="italic" fill="#E6A868" text-anchor="middle">We Take Care of How It Is Grown.</text>
      <rect x="180" y="845" width="720" height="56" rx="18" fill="#102115" stroke="#FAF8F5" stroke-width="1.5" opacity="0.95"/>
      <text x="540" y="880" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="17" font-weight="700" fill="#FAF8F5" text-anchor="middle">
        Screen-Free Farm Retreats • Walk Your Plot • Fresh Harvest
      </text>
      <rect x="220" y="925" width="640" height="64" rx="32" fill="#FAF8F5"/>
      <text x="540" y="965" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="19" font-weight="800" fill="#102115" text-anchor="middle" letter-spacing="1">
        Book a Visit at purevegies.in / purevegies.com
      </text>
    </svg>`;

    await sharp(hero2Path)
      .resize(1080, 1080)
      .composite([{ input: Buffer.from(overlaySvg2), top: 0, left: 0 }])
      .png()
      .toFile(path.join(outDir, 'flagship-hero-02-purevegies.png'));
    console.log('Generated flagship-hero-02-purevegies.png with domain purevegies.in overlay!');
  }

  // Save the complete JSON catalog
  const catalogPath = path.join(outDir, 'social-posts-catalog.json');
  fs.writeFileSync(catalogPath, JSON.stringify(jsonCatalog, null, 2), 'utf-8');
  console.log(`Successfully generated ALL 100 PNG & SVG images + catalog at: ${catalogPath}`);
}

run().catch(err => {
  console.error('Fatal error in social image generation:', err);
  process.exit(1);
});
