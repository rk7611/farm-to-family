export interface CampaignConcept {
  id: string;
  number: number;
  name: string;
  objective: string;
  targetAudience: string;
  coreMessage: string;
  tagline: string;
  visualDirection: string;
  postIdeas: string[];
  primaryCta: string;
  utmCampaign: string;
  color: string;
}

export const CAMPAIGN_CONCEPTS: CampaignConcept[] = [
  {
    "id": "CAMP-01",
    "number": 1,
    "name": "You Don't Need a Farm",
    "objective": "Overcome the assumption that eating farm-fresh requires owning or buying rural land; drive top-of-funnel traffic to the Plan Builder.",
    "targetAudience": "Urban apartment owners, busy tech professionals, and young families in Bangalore, Pune, Hyderabad, and Mumbai.",
    "coreMessage": "You don't need to buy land, hire farmworkers, or dig borewells. PureVegies provides the farmland and manages the farming—you simply subscribe and enjoy the harvest.",
    "tagline": "Your Farm. Without Owning Land.",
    "visualDirection": "Split visuals contrasting the headache of buying/maintaining rural property vs the seamless luxury of subscribing to PureVegies and receiving freshly harvested crates.",
    "postIdeas": [
      "The ₹60 Lakh mistake: Why buying a weekend hobby farm drains your weekends.",
      "Who provides the land? (Spoiler: PureVegies handles 100% of the land & infrastructure).",
      "What if subscribing to a farm was as effortless as subscribing to music streaming?",
      "3 questions to ask yourself before buying agricultural land outside the city.",
      "Step-by-step: How to build your family's farm plot in 3 minutes on purevegies.in."
    ],
    "primaryCta": "Build My Farm Plan",
    "utmCampaign": "utm_source=social&utm_medium=paid_meta&utm_campaign=you_dont_need_a_farm&utm_content=split_comparison",
    "color": "forest"
  },
  {
    "id": "CAMP-02",
    "number": 2,
    "name": "Your Family's Dedicated Farm",
    "objective": "Position the ₹10,000/month and ₹20,000/month managed subscription plans as an essential family lifestyle choice.",
    "targetAudience": "Health-conscious parents with school-age children, households with aging parents, multi-generational families.",
    "coreMessage": "Dedicate real agricultural beds to your household. Choose 12 to 18 vegetables your family loves and receive peak-harvest produce every week.",
    "tagline": "Naturally Grown for Your Family's Dinner Table.",
    "visualDirection": "Warm, sunny family kitchen scenes, unpackaging crisp green harvests, and parents with kids inspecting their allocated growing beds on Saturday farm visits.",
    "postIdeas": [
      "Inside the ₹10,000/month Family Plan: 24 harvests a year delivered to your kitchen.",
      "How our custom crop selector lets you banish bitter gourds and double your cherry tomatoes.",
      "Meet the farmers who cultivate food specifically for your dinner table.",
      "From morning field dew to your lunch salad in under 12 hours.",
      "Why our subscribers say their children eat twice as many vegetables now."
    ],
    "primaryCta": "Build My Farm Plan",
    "utmCampaign": "utm_source=social&utm_medium=instagram_feed&utm_campaign=your_family_farm&utm_content=family_unboxing",
    "color": "emerald"
  },
  {
    "id": "CAMP-03",
    "number": 3,
    "name": "Know Where Your Food Comes From",
    "objective": "Build unshakeable trust through radical agricultural transparency, open farm gates, and laboratory soil assays.",
    "targetAudience": "Mothers with infants/toddlers, wellness advocates, cancer-conscious and health-seeking urban consumers.",
    "coreMessage": "No marketing buzzwords. No mystery supply chains. PureVegies publishes real soil test reports, tests water TDS, and welcomes families to visit our open farm gate.",
    "tagline": "The Output Is Vegetables. The Product Is Trust.",
    "visualDirection": "Macro photography of living soil, NABL lab assay sheets, agronomists testing water TDS, and open farm gates welcoming visitors.",
    "postIdeas": [
      "Why supermarket 'fresh' vegetables took 7 days and 3 auctions to reach your plate.",
      "Can washing vegetables in vinegar remove systemic pesticides? The science.",
      "Our Open Gate Promise: Walk the soil beds where your food is growing any Saturday.",
      "Reading our quarterly soil test reports: Why organic carbon matter is the real metric.",
      "The difference between certified organic labels and living natural farming."
    ],
    "primaryCta": "See How It Works",
    "utmCampaign": "utm_source=social&utm_medium=meta_reels&utm_campaign=know_where_food_comes_from&utm_content=lab_reports",
    "color": "amber"
  },
  {
    "id": "CAMP-04",
    "number": 4,
    "name": "Natural Farming, Made Personal",
    "objective": "Educate consumers on regenerative natural farming (living soil, Jeevamrutha, biodiversity) without making illegal or unsupported organic claims.",
    "targetAudience": "Eco-conscious urbanites, gardening enthusiasts, ayurveda and natural living followers.",
    "coreMessage": "Natural farming isn't passive; it's intensive biological stewardship. We nourish the living soil ecosystem so nature can nourish your family.",
    "tagline": "Naturally Grown. Thoughtfully Delivered.",
    "visualDirection": "Lush polyculture fields with marigold borders, preparation of traditional Jeevamrutha in terracotta pots, earthworm compost beds.",
    "postIdeas": [
      "Why healthy living soil smells sweet (the story of Geosmin and Actinomycetes).",
      "Jeevamrutha vs synthetic NPK: Feeding the subterranean food web.",
      "Why companion planting with marigolds and basil eliminates the need for chemical sprays.",
      "The lost flavor of native heirloom vegetables: Why heritage seeds matter.",
      "How zero-tillage farming preserves subterranean mycorrhizal highways."
    ],
    "primaryCta": "Explore Natural Farming",
    "utmCampaign": "utm_source=social&utm_medium=linkedin&utm_campaign=natural_farming_personal&utm_content=soil_science",
    "color": "lime"
  },
  {
    "id": "CAMP-05",
    "number": 5,
    "name": "Your Weekend Deserves More",
    "objective": "Generate early interest and waitlist leads for upcoming PureVegies Weekend Farm Stays.",
    "targetAudience": "Stressed corporate employees, startup founders, couples looking for quick 48-hour nature resets.",
    "coreMessage": "Escape the mall traffic, crowded cafes, and screen fatigue. Spend 48 hours waking up to birdsong, morning mist, and starlit night skies.",
    "tagline": "Trade City Smog for Countryside Peace.",
    "visualDirection": "Moody, serene dawn landscapes, vernacular stone-and-lime farm cottages, steam rising from warm chai cups, peaceful hammock naps.",
    "postIdeas": [
      "The city weekend routine is broken. Here is what 48 hours on a farm looks like.",
      "Upcoming: PureVegies Weekend Farm Stays—vernacular architecture in quiet nature.",
      "What happens to your resting heart rate after 2 hours of birdsong and clean air.",
      "Imagine eating dinner where every single ingredient was harvested 50 feet away.",
      "Register for early preview access: First 50 families to experience our retreat."
    ],
    "primaryCta": "Register for Farm Stay Updates",
    "utmCampaign": "utm_source=social&utm_medium=instagram_stories&utm_campaign=weekend_deserves_more&utm_content=cottage_render",
    "color": "teal"
  },
  {
    "id": "CAMP-06",
    "number": 6,
    "name": "Escape the City (Without Leaving Responsibilities Behind)",
    "objective": "Validate demand for 'Work from Farm' and short-stay regenerative rural escapes.",
    "targetAudience": "Remote tech workers, creative directors, consultants, writers needing focus and deep work.",
    "coreMessage": "High-speed Wi-Fi under shaded verandahs, birdsong instead of Slack pings, and nutritious farm meals on call.",
    "tagline": "Deep Work Meets Deep Nature.",
    "visualDirection": "Clean laptop setups on wooden verandah tables overlooking green farm fields, coffee mugs, gentle natural breeze.",
    "postIdeas": [
      "Work from Farm: Finish your quarterly strategy with farm breeze in your hair.",
      "Why your best creative ideas never happen under fluorescent office lighting.",
      "A workday where your lunch break is picking fresh mulberries from the tree.",
      "How clean oxygen and zero horn noise supercharge cognitive focus.",
      "Join the waitlist for our upcoming Work-from-Farm weekday cottages."
    ],
    "primaryCta": "Join the Weekend Farm Stay List",
    "utmCampaign": "utm_source=social&utm_medium=linkedin&utm_campaign=escape_the_city_wfh&utm_content=remote_work",
    "color": "sky"
  },
  {
    "id": "CAMP-07",
    "number": 7,
    "name": "Give Your Children a Farm Day",
    "objective": "Drive Saturday Farm Visit bookings and Family Farming Plan subscriptions.",
    "targetAudience": "Millennial parents seeking screen-free outdoor education and weekend activities for kids aged 3-12.",
    "coreMessage": "Children who pull their own carrots from the earth develop a lifelong respect for nature and food. Swap iPads for muddy boots.",
    "tagline": "Where Real Childhood Memories Are Grown.",
    "visualDirection": "Joyful, candid shots of children with muddy knees, holding freshly harvested radishes, feeding gentle calves, laughing with parents.",
    "postIdeas": [
      "Ask your child where a tomato comes from. Their answer might surprise you.",
      "Why kids who harvest their own vegetables eat 3x more greens at home.",
      "The ultimate screen detox: 4 hours of earthworms, seeds, and sunshine.",
      "Saturday Family Harvest Mornings: Reserve your family's guided walk.",
      "Childhood isn't meant to be lived indoors on carpet. Bring them to the soil."
    ],
    "primaryCta": "Discover Family Farming",
    "utmCampaign": "utm_source=social&utm_medium=instagram_reels&utm_campaign=children_farm_day&utm_content=muddy_boots",
    "color": "orange"
  },
  {
    "id": "CAMP-08",
    "number": 8,
    "name": "Retirement Deserves a Farm Vacation",
    "objective": "Establish PureVegies Farm Stays as the premier destination for retirement celebrations and restorative countryside holidays.",
    "targetAudience": "Recently retired professionals (58-70), adult children looking to gift their parents an unforgettable milestone experience.",
    "coreMessage": "People celebrate marriage with a honeymoon. Why not celebrate 35 years of hard work with an unhurried, peaceful countryside farm holiday?",
    "tagline": "A New Chapter Deserves a Golden Celebration.",
    "visualDirection": "Dignified, warm photography of senior couples walking leisurely in morning light, drinking filter coffee on cottage verandahs, smiling with joy.",
    "postIdeas": [
      "You took a honeymoon after your wedding. What will you do when you retire?",
      "10 meaningful ways to celebrate retirement that don't involve a standard watch.",
      "Why modern retirees are choosing restorative farm stays over crowded beach resorts.",
      "The luxury of an unread book under a mango tree with zero calendar alarms.",
      "Gift your parents 7 days of pure countryside peace: Register early interest."
    ],
    "primaryCta": "Explore Farm Vacations",
    "utmCampaign": "utm_source=social&utm_medium=facebook_feed&utm_campaign=retirement_honeymoon&utm_content=senior_couple",
    "color": "indigo"
  },
  {
    "id": "CAMP-09",
    "number": 9,
    "name": "The Second Spring (New Chapter Living)",
    "objective": "Promote extended monthly countryside sabbaticals for retirees seeking nature, wellness, and gentle community.",
    "targetAudience": "Senior citizens, active retirees seeking winter getaways or long-stay rural living.",
    "coreMessage": "Retirement isn't decline; it is freedom. Wake up when your eyes open, breathe clean air, eat freshly cut natural meals, and spend peaceful time with your partner.",
    "tagline": "Your Time. Your Peace. Your Second Spring.",
    "visualDirection": "Scenic walking trails with gentle ramps and shaded benches, senior guests learning gentle herb gardening, warm sunset skies.",
    "postIdeas": [
      "What if your retirement looked like this? Morning birds, fresh milk, and zero rush.",
      "Extended countryside stays: Escape winter city smog for 3 weeks of clean living.",
      "The science of grounding: Why walking on living soil lowers inflammation in seniors.",
      "Gentle herbal gardening and birdwatching: Active aging in nature.",
      "Upcoming: PureVegies Senior Freedom Retreats. Join the preview list."
    ],
    "primaryCta": "Explore Farm Vacations",
    "utmCampaign": "utm_source=social&utm_medium=facebook_groups&utm_campaign=second_spring_retire&utm_content=extended_stay",
    "color": "rose"
  },
  {
    "id": "CAMP-10",
    "number": 10,
    "name": "Couples Countryside Sanctuary",
    "objective": "Position PureVegies Farm Stays as a romantic, intimate, and slow-paced anniversary or weekend getaway.",
    "targetAudience": "Couples aged 28-60 celebrating anniversaries, birthdays, or seeking romantic quietude.",
    "coreMessage": "Rediscover deep, uninterrupted conversations away from everyday routine. Lantern-lit dinners by the vegetable garden, starlight, and slow rhythms.",
    "tagline": "Reconnect Where the Stars Are Bright.",
    "visualDirection": "Lantern-lit dinner tables beside flowering farm hedges, cozy cottage bedrooms with terracotta warmth, couples cycling along farm paths.",
    "postIdeas": [
      "Trade loud crowded anniversary dinners for private dining under open starlight.",
      "When was the last time you and your partner had a conversation without checking phones?",
      "Upcoming Farm Stays: Private vernacular cottages curated for quiet couples.",
      "The magic hour: Watching fireflies dance over the farm pond at twilight.",
      "Register for priority booking: Inaugural couples weekend retreats."
    ],
    "primaryCta": "Join the Weekend Farm Stay List",
    "utmCampaign": "utm_source=social&utm_medium=instagram_feed&utm_campaign=couples_sanctuary&utm_content=lantern_dinner",
    "color": "pink"
  },
  {
    "id": "CAMP-11",
    "number": 11,
    "name": "The Private Agro-Estate (₹7L HNI Edition)",
    "objective": "Generate high-value sales leads for the ₹7,00,000/year 'My Private Farm' ultra-premium tier.",
    "targetAudience": "CXOs, successful business owners, venture capitalists, high-net-worth families.",
    "coreMessage": "The ultimate status symbol is food sovereignty. A dedicated private agricultural estate zone managed by your personal agronomist, with zero operational hassle.",
    "tagline": "Uncompromised Provenance for the Discerning Few.",
    "visualDirection": "Editorial luxury photography: handcrafted wooden harvest crates, pristine private farmland, estate agronomist in tailored linen, twilight chef dining.",
    "postIdeas": [
      "In 2026, the ultimate luxury isn't a watch; it's knowing who planted every leaf on your plate.",
      "Introducing My Private Farm (₹7,00,000/year): Your family's managed agro-estate.",
      "Why founders and executives are replacing hobby farms with managed agriculture.",
      "Bespoke heirloom cultivation: From French radishes to rare indigenous herbs.",
      "Schedule a confidential private consultation with our Chief Agricultural Officer."
    ],
    "primaryCta": "Inquire About Private Farm",
    "utmCampaign": "utm_source=social&utm_medium=linkedin_inmail&utm_campaign=private_farm_hni&utm_content=executive_curation",
    "color": "stone"
  },
  {
    "id": "CAMP-12",
    "number": 12,
    "name": "Taste What Real Food Used to Taste Like",
    "objective": "Highlight the sensory and culinary superiority of same-day harvested natural vegetables.",
    "targetAudience": "Foodies, home chefs, gourmet cooks, and traditional food enthusiasts.",
    "coreMessage": "The reason your grandmother's cooking tasted extraordinary wasn't just the recipe—it was the living soil. Rediscover vegetables bursting with authentic flavor.",
    "tagline": "The Flavor of Living Soil.",
    "visualDirection": "Vibrant culinary flat-lays, rustic village cooking utensils, steaming sambar pots, freshly cut heirloom tomatoes glistening with natural juice.",
    "postIdeas": [
      "The sensory shock of natural coriander: Smelling it from the next room.",
      "Why supermarket tomatoes taste like water (and why natural ones burst with sweetness).",
      "Country gourds harvested at dawn: Cooked the same evening for unmatched tenderness.",
      "Cooking with heritage greens: Amaranth, Gongura, and Chakramuni.",
      "Taste the difference: Start your family's managed farm subscription today."
    ],
    "primaryCta": "Build My Farm Plan",
    "utmCampaign": "utm_source=social&utm_medium=instagram_reels&utm_campaign=real_food_taste&utm_content=recipe_flavor",
    "color": "red"
  },
  {
    "id": "CAMP-13",
    "number": 13,
    "name": "The Screen-Free Sanctuary",
    "objective": "Target parents experiencing extreme screen fatigue and device dependency among children.",
    "targetAudience": "Parents of children aged 4-15, educators, family counselors.",
    "coreMessage": "Nature doesn't need blue-light filters. Replace digital notifications with birdsong, muddy exploration, and wholesome family connection.",
    "tagline": "Unplug Your Devices. Plug Into the Earth.",
    "visualDirection": "Children holding earthworms with curiosity, looking up at tall sunflower heads, parents laughing together without phones in sight.",
    "postIdeas": [
      "The 24-hour digital detox challenge: What happens when you leave screens behind?",
      "Why kids remember climbing farm haystacks longer than any video game level.",
      "Teaching children how a seed germinates into food: Real-world biology.",
      "Sunday morning farm visits: Open to all PureVegies subscriber families.",
      "Give your family real presence instead of digital distraction."
    ],
    "primaryCta": "Discover Family Farming",
    "utmCampaign": "utm_source=social&utm_medium=instagram_carousel&utm_campaign=screen_free_sanctuary&utm_content=kids_nature",
    "color": "emerald"
  },
  {
    "id": "CAMP-14",
    "number": 14,
    "name": "The Living Soil Revolution",
    "objective": "Position PureVegies as an ecological pioneer in soil regeneration and soil microbiome science.",
    "targetAudience": "Sustainability enthusiasts, climate-conscious consumers, agricultural academics.",
    "coreMessage": "Chemical fertilizers treat soil like dirt. PureVegies treats soil as a living, breathing ecosystem with trillions of microscopic partners.",
    "tagline": "Reviving the Earth From the Subterranean Up.",
    "visualDirection": "Microscopic imagery of mycorrhizal fungal hyphae, macro shots of earthworm castings, cross-section diagrams of living topsoil.",
    "postIdeas": [
      "What happens beneath your feet when you stop chemical sprays for 3 years?",
      "Earthworms: Nature's most sophisticated subterranean agronomists.",
      "How increasing soil organic carbon by 1% holds 150,000 liters of water per acre.",
      "The Wood Wide Web: How fungi trade nutrients with vegetable roots.",
      "Explore our regenerative soil philosophy at purevegies.in."
    ],
    "primaryCta": "Explore Natural Farming",
    "utmCampaign": "utm_source=social&utm_medium=twitter&utm_campaign=living_soil_revolution&utm_content=soil_microbiome",
    "color": "amber"
  },
  {
    "id": "CAMP-15",
    "number": 15,
    "name": "The Speed-to-Plate Guarantee",
    "objective": "Differentiate PureVegies from commercial supermarket cold-storage logistics by emphasizing the 12-hour harvest window.",
    "targetAudience": "Urban grocery shoppers frustrated by wilted supermarket greens and chemical preservation sprays.",
    "coreMessage": "Harvested at 4:30 AM before the sun rises. Packed in breathable cotton wraps. Delivered to your doorstep by lunchtime.",
    "tagline": "From Soil Bed to Salad Bowl in Under 12 Hours.",
    "visualDirection": "Split timeline clock showing 4:30 AM dawn harvest -> 8:00 AM sorting -> 11:30 AM doorstep arrival -> 1:00 PM fresh lunch bowl.",
    "postIdeas": [
      "The journey of a supermarket vegetable vs the journey of PureVegies.",
      "Why we harvest in the dark at 4:30 AM: Cellular turgor and sugar retention.",
      "Zero chlorine wash: Why we rinse with pure well water and deliver immediate fresh crunch.",
      "Hear the snap of morning-harvested lettuce.",
      "Subscribe today and taste what 12-hour harvest freshness actually means."
    ],
    "primaryCta": "Build My Farm Plan",
    "utmCampaign": "utm_source=social&utm_medium=meta_feed&utm_campaign=speed_to_plate&utm_content=timeline_infographic",
    "color": "cyan"
  },
  {
    "id": "CAMP-16",
    "number": 16,
    "name": "Gift a Farm Stay (To the People Who Gave You Everything)",
    "objective": "Drive gift bookings and reservations from working adults for their aging parents' retirement or anniversaries.",
    "targetAudience": "Working professionals in their 30s and 40s with retired parents in Tier-1 and Tier-2 cities.",
    "coreMessage": "Your parents spent their entire adult lives sacrificing for your career and education. Gift them an unhurried, restorative countryside sabbatical.",
    "tagline": "The Greatest Gift You Can Give Your Parents Is Peace.",
    "visualDirection": "Touching, emotional moments: an adult son walking alongside his retired father in farm fields; a daughter seeing her mother smile quietly on a cottage porch.",
    "postIdeas": [
      "What do you give parents who already have everything material? Countryside peace.",
      "Why sending your parents on a farm stay is more meaningful than a gold necklace.",
      "Clean air, gentle walks, and living nutrition: Restoring senior health naturally.",
      "How our farm cottages are designed specifically for senior safety and comfort.",
      "Pre-register your parents for the upcoming PureVegies Senior Retreat."
    ],
    "primaryCta": "Explore Farm Vacations",
    "utmCampaign": "utm_source=social&utm_medium=facebook_ads&utm_campaign=gift_parents_stay&utm_content=emotional_story",
    "color": "rose"
  },
  {
    "id": "CAMP-17",
    "number": 17,
    "name": "Farm-to-Doorstep: Zero Middlemen",
    "objective": "Communicate direct-to-consumer ethics and fair farmer livelihoods.",
    "targetAudience": "Fair-trade advocates, ethical shoppers, conscious consumers.",
    "coreMessage": "Every rupee of your subscription directly funds living soil regeneration, pure water infrastructure, and dignified living wages for rural farmers.",
    "tagline": "Direct. Ethical. Uninterrupted.",
    "visualDirection": "Portraits of our farming team with their names, years of experience, and warm genuine smiles in the morning field.",
    "postIdeas": [
      "Where does your vegetable money go? The conventional mandi breakdown vs PureVegies.",
      "Meet Gangamma: 14 years of seed-sowing mastery on our managed estates.",
      "Guaranteed monthly salaries and healthcare: How we respect our agricultural team.",
      "No brokers. No commission agents. 100% direct from farm to your family.",
      "Subscribe to an agricultural service that honors the hands that grow your food."
    ],
    "primaryCta": "See How It Works",
    "utmCampaign": "utm_source=social&utm_medium=linkedin&utm_campaign=zero_middlemen&utm_content=farmer_portraits",
    "color": "teal"
  },
  {
    "id": "CAMP-18",
    "number": 18,
    "name": "The Seasonal Calendar: Nature's Rhythm",
    "objective": "Educate consumers on seasonal crop rotation and natural eating habits.",
    "targetAudience": "Health seekers, ayurveda followers, nutritionists, chefs.",
    "coreMessage": "Nature doesn't grow cauliflower in peak summer or watermelon in freezing winter. Eating seasonally aligns your body with nature's wisdom.",
    "tagline": "Eat in Harmony with the Earth's Clock.",
    "visualDirection": "Artistic circular 12-month calendar illustration showing seasonal vegetables, fruits, and herbs across Indian winter, summer, and monsoon.",
    "postIdeas": [
      "Why eating out-of-season cold-storage vegetables damages gut health.",
      "Winter bounty: The sweet carrots and tender greens arriving this month.",
      "Summer hydration: How country gourds naturally regulate body temperature.",
      "Monsoon vitality: Native herbs that boost seasonal immunity.",
      "Plan your family's seasonal harvest mix at purevegies.in."
    ],
    "primaryCta": "Build My Farm Plan",
    "utmCampaign": "utm_source=social&utm_medium=instagram_carousel&utm_campaign=seasonal_calendar&utm_content=calendar_infographic",
    "color": "yellow"
  },
  {
    "id": "CAMP-19",
    "number": 19,
    "name": "The Saturday Farm Ritual",
    "objective": "Turn weekly farm visits into a signature lifestyle habit for subscriber families.",
    "targetAudience": "Current subscribers, trial users, prospective families in driving proximity to farm estates.",
    "coreMessage": "Every Saturday morning, our farm gates open for PureVegies members. Walk the beds, pick fresh herbs, enjoy traditional breakfast, and breathe.",
    "tagline": "Your Saturday Morning Belongs to the Soil.",
    "visualDirection": "Families walking along farm furrows, straw hats, morning tea station under a neem tree, smiling conversations with agronomists.",
    "postIdeas": [
      "What Saturdays look like for PureVegies subscribers: Fresh air, tea, and soil.",
      "How our members pick their weekend herbs straight from their allocated beds.",
      "A Saturday morning ritual that replaces mall trips with peace.",
      "Meet our agronomists on site: Ask any question about your family's vegetables.",
      "Become a member and unlock weekly open farm gate access."
    ],
    "primaryCta": "Discover Family Farming",
    "utmCampaign": "utm_source=social&utm_medium=meta_feed&utm_campaign=saturday_farm_ritual&utm_content=farm_morning",
    "color": "violet"
  },
  {
    "id": "CAMP-20",
    "number": 20,
    "name": "The PureVegies Manifesto",
    "objective": "Establish the brand's foundational ethos, uniting Natural Farming, Managed Farmland, Family Food, and Countryside Stays into one cohesive philosophy.",
    "targetAudience": "Broad audience across all demographics; viral brand manifesto campaign.",
    "coreMessage": "PureVegies isn't just about where your food comes from. It's about creating a closer connection between people, food, nature, and the time they spend with the people they love.",
    "tagline": "Naturally Grown. Thoughtfully Delivered. No Land Required.",
    "visualDirection": "Cinematic, high-production brand film visuals: misty sunrise over farm furrows, hands working living soil, a family dinner table, older couple smiling in countryside light, star-filled night sky.",
    "postIdeas": [
      "Why we built PureVegies: The story behind our managed natural farming vision.",
      "The 4 pillars of PureVegies: Living Soil, Managed Land, Real Families, Peaceful Escapes.",
      "You don't need to own land to have a deep relationship with the earth.",
      "A letter to every urban family seeking a cleaner, slower, more honest way of living.",
      "Join the PureVegies movement: Build your family's farm today."
    ],
    "primaryCta": "Build My Farm Plan",
    "utmCampaign": "utm_source=social&utm_medium=brand_film&utm_campaign=purevegies_manifesto&utm_content=cinematic_video",
    "color": "forest"
  }
];

export const CTA_LIBRARY = {
  "farming": [
    {
      "text": "Build My Farm Plan",
      "link": "/build-your-farm",
      "purpose": "Primary conversion CTA for managed farming subscription"
    },
    {
      "text": "See How It Works",
      "link": "/how-it-works",
      "purpose": "Explains the 6-step journey and overcomes land ownership questions"
    },
    {
      "text": "Explore Natural Farming",
      "link": "/natural-farming",
      "purpose": "Educational deep-dive into living soil and zero chemicals"
    }
  ],
  "families": [
    {
      "text": "Discover Family Farming",
      "link": "/about",
      "purpose": "Family-centric landing experience showcasing farm visits"
    },
    {
      "text": "See Our Farm Experience",
      "link": "/farm-stays",
      "purpose": "Showcases open farm gate policy and Saturday activities"
    }
  ],
  "farmStays": [
    {
      "text": "Register for Farm Stay Updates",
      "link": "/farm-stays",
      "purpose": "Captures high-intent leads for upcoming weekend cottages"
    },
    {
      "text": "Join the Weekend Farm Stay List",
      "link": "/farm-stays",
      "purpose": "Priority reservation waitlist for inaugural retreats"
    },
    {
      "text": "Explore Farm Vacations",
      "link": "/farm-stays",
      "purpose": "Previews countryside escapes, itineraries, and nature trails"
    }
  ],
  "retirement": [
    {
      "text": "Explore Retirement Farm Escapes",
      "link": "/farm-stays",
      "purpose": "Dedicated landing for seniors and retirement celebrations"
    },
    {
      "text": "Register for Senior Freedom Retreat",
      "link": "/farm-stays",
      "purpose": "Waitlist for specialized senior nature stays and sabbaticals"
    }
  ],
  "premium": [
    {
      "text": "Inquire About Private Farm",
      "link": "/pricing",
      "purpose": "Confidential enquiry for ₹7,00,000/year HNI private estate"
    },
    {
      "text": "Schedule Private Agronomy Consultation",
      "link": "/pricing",
      "purpose": "Direct booking with Chief Agricultural Officer"
    }
  ]
};

export const HASHTAG_CLUSTERS = {
  "naturalFarming": [
    "#NaturalFarming",
    "#LivingSoil",
    "#ZeroChemicals",
    "#RegenerativeAg",
    "#SoilMicrobiome",
    "#Jeevamrutha",
    "#Polyculture",
    "#HeirloomSeeds",
    "#PureVegies"
  ],
  "managedFarming": [
    "#ManagedFarming",
    "#NoLandRequired",
    "#AgAsAService",
    "#UrbanLiving",
    "#DirectToConsumer",
    "#DoorstepHarvest",
    "#CleanEating",
    "#PureVegies"
  ],
  "familyFood": [
    "#FamilyHealth",
    "#RealFood",
    "#KidsInNature",
    "#FarmToTable",
    "#ScreenFree",
    "#HealthyKids",
    "#MindfulEating",
    "#PureVegies"
  ],
  "farmStays": [
    "#FarmStay",
    "#WeekendGetaway",
    "#SlowTravel",
    "#CountrysideEscape",
    "#NatureRetreat",
    "#FarmVacation",
    "#DigitalDetox",
    "#PureVegies"
  ],
  "retirement": [
    "#RetirementLife",
    "#NewChapter",
    "#SecondSpring",
    "#SeniorTravel",
    "#SlowLiving",
    "#GoldenYears",
    "#RestorativeTravel",
    "#PureVegies"
  ],
  "premiumHni": [
    "#PrivateEstate",
    "#LuxuryLifestyle",
    "#HNILiving",
    "#FoodSovereignty",
    "#BespokeAgriculture",
    "#UltraWellness",
    "#ExecutiveHealth",
    "#PureVegies"
  ]
};

export const ASSET_FOLDERS = [
  {
    "folderName": "01_Natural_Farming",
    "description": "Macro photography of living soil, microbial starters, compost, multi-crop companion planting, marigold borders.",
    "guidelines": "Focus on crumbly dark soil, earthworms, indigenous cow-dung preparations (Jeevamrutha), and botanical pest repellents. NO chemical spray equipment.",
    "taggingRule": "Verified Farm Photography / Conceptual AI Tagged"
  },
  {
    "folderName": "02_Family_Farming",
    "description": "Visuals showing allocated farm beds, customer vegetable selection, and modern managed farming operations.",
    "guidelines": "Must visually communicate that farmland is managed by PureVegies. Show clear bed markers, irrigation lines, and agronomists at work.",
    "taggingRule": "Verified Operational Assets"
  },
  {
    "folderName": "03_Farm_to_Family",
    "description": "Unboxing harvest crates, doorstep cold-chain delivery, kitchen cooking, and family dining tables.",
    "guidelines": "Vegetables must look natural, slightly varied in shape and size, showing authentic freshness and dew rather than plastic supermarket polish.",
    "taggingRule": "Real Deliveries & Member Photos"
  },
  {
    "folderName": "04_Weekend_Farm_Stay",
    "description": "Planned vernacular countryside cottages, hammocks, sunrise tea, starry skies, and nature walking trails.",
    "guidelines": "Must be labeled 'CONCEPTUAL / UPCOMING EXPERIENCE' until cottages are operational. Emphasize peace, silence, and nature immersion.",
    "taggingRule": "CONCEPTUAL / ARCHITECTURAL RENDER"
  },
  {
    "folderName": "05_Family_Vacation",
    "description": "Parents and kids exploring nature, outdoor breakfast under trees, animal feeding, and mud workshops.",
    "guidelines": "Authentic, candid emotion. Kids with messy hands and boots; genuine smiles. Avoid staged commercial resort modeling.",
    "taggingRule": "Candid Farm Visit Moments"
  },
  {
    "folderName": "06_Retirement",
    "description": "Senior couples enjoying leisurely morning walks, verandah tea, gentle gardening, reading under trees.",
    "guidelines": "Depict vitality, freedom, dignity, and companionship. Do NOT portray weakness, medical decline, or loneliness.",
    "taggingRule": "Lifestyle & Conceptual Photography"
  },
  {
    "folderName": "07_Couples",
    "description": "Romantic twilight dinners, candlelit farm tables, sunset cycling along farm furrows, starlight walks.",
    "guidelines": "Intimate, warm, slow-paced atmosphere. Focus on deep conversation and rustic romance in unspoiled nature.",
    "taggingRule": "Conceptual & Curated Visuals"
  },
  {
    "folderName": "08_Harvest_and_Food",
    "description": "Crisp morning-harvested vegetables, heirloom varieties, culinary dishes, traditional farm cooking.",
    "guidelines": "Macro detail of natural produce textures: heirloom tomatoes, country beans, crisp greens, earthy root vegetables.",
    "taggingRule": "Harvest Inspection Photography"
  },
  {
    "folderName": "09_Living_Soil_and_Agronomy",
    "description": "Scientific soil assays, agronomists with soil probes, water TDS meters, vermicompost pits, seed storage.",
    "guidelines": "Scientific, educational, and transparent. Highlights technical competence and biological precision.",
    "taggingRule": "Scientific & Field Data Visuals"
  },
  {
    "folderName": "10_Premium_Estates",
    "description": "Private agro-estate acreage, bespoke wooden crates, private dining setups, executive agronomist consultations.",
    "guidelines": "Ultra-clean, minimalist luxury. Deep forest greens, warm cream, natural wood, and understated elegance.",
    "taggingRule": "Private Estate Concepts & Renders"
  }
];
