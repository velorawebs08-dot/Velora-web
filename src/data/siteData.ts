export interface Destination {
  id: string;
  name: string;
  slug: string;
  image: string;
  packageCount: number;
  shortDesc: string;
  startingPrice: number;
  featured?: boolean;
  region: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals?: string;
  stay?: string;
  highlights?: string[];
}

export interface TourPackage {
  id: string;
  slug: string;
  destinationSlug: string;
  destinationName: string;
  title: string;
  bestseller: boolean;
  category: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Moderate to Challenging';
  groupSize: string;
  season: string;
  rating: number;
  reviewCount: number;
  heroImage: string;
  galleryImages: string[];
  summary: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  price: number;
  originalPrice: number;
  startPoint: string;
  endPoint: string;
  inclusions: string[];
  exclusions: string[];
  altitude?: string;
  ageLimit?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  tripName: string;
  date: string;
  quote: string;
  rating: number;
  image: string;
  linkedPackageSlug: string;
  cardTheme: 'orange' | 'navy' | 'emerald' | 'purple';
}

export interface FixedDeparture {
  id: string;
  date: string;
  displayDate: string;
  monthCategory: string; // e.g. "SEPTEMBER 2026", "OCTOBER 2026", "NOVEMBER 2026"
  destinationName: string;
  price: number;
  seatsLeft: number;
  thumbnail: string;
  linkedPackageSlug: string;
  status?: 'Filling Fast' | 'Few Seats Left' | 'Available';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  author: string;
  excerpt: string;
}

export const siteData = {
  brand: {
    name: 'Tripto Travels',
    tagline: 'Dream.Explore.Discover',
    subheading: 'Uncover The Natural Wonders',
    heroWordmark: '',
    heroBgImage: 'https://i.postimg.cc/SsVZCp9d/Chat-GPT-Image-Sep-30-2026-02-37-45-PM.png',
    phone: '+91 98201 43210',
    displayPhone: '+91 (0) 98201-43210',
    supportHours: 'Everyday: 8:00 AM to 9:30 PM',
    email: 'explore@triptotravels.com',
    whatsapp: '+919820143210',
    address: 'Basecamp: Shivaji Park, Dadar West, Mumbai',
    stats: {
      travelers: '19,400+',
      tripsCompleted: '480+',
      avgRating: '4.92/5',
      iconicSpots: '300+'
    },
    announcementBanner: 'Weekend batches filling up fast! Ping us on WhatsApp anytime.'
  },

  destinations: [
    {
      id: 'dest-harishchandragad',
      name: 'Harishchandragad & Sandhan Valley',
      slug: 'harishchandragad',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      packageCount: 2,
      shortDesc: 'The semi-circular vertical Konkan Kada cliff, Kedareshwar cave temple & Asia’s Grand Canyon.',
      startingPrice: 2499,
      featured: true,
      region: 'Ahmednagar / Western Ghats'
    },
    {
      id: 'dest-rajmachi',
      name: 'Rajmachi & Kataldhar Waterfalls',
      slug: 'rajmachi',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      packageCount: 3,
      shortDesc: 'Twin forts of Shrivardhan-Manaranjan, lush misty plateau trails & glowing firefly forests.',
      startingPrice: 1999,
      featured: true,
      region: 'Lonavala / Pune'
    },
    {
      id: 'dest-kalsubai',
      name: 'Kalsubai Peak — Everest of Maharashtra',
      slug: 'kalsubai',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
      packageCount: 2,
      shortDesc: 'Highest point in Maharashtra (1,646m), steel ladder scrambles & panoramic sea of clouds.',
      startingPrice: 1799,
      featured: true,
      region: 'Igatpuri / Bhandardara'
    },
    {
      id: 'dest-devbagh',
      name: 'Tarkarli & Devbagh Coastal Backwaters',
      slug: 'tarkarli-konkan',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      packageCount: 2,
      shortDesc: 'Scuba diving at Sindhudurg sea fort, Karli river delta cruises & mouthwatering Malvani seafood.',
      startingPrice: 8499,
      featured: true,
      region: 'Konkan Coast'
    },
    {
      id: 'dest-torna-rajgad',
      name: 'Rajgad to Torna Fortress Traverse',
      slug: 'rajgad-torna',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
      packageCount: 2,
      shortDesc: 'King of Forts with Padmavati Machi, Sanjeevani ridge walk & high-altitude Shivaji trail.',
      startingPrice: 3299,
      featured: true,
      region: 'Pune Sahyadri'
    },
    {
      id: 'dest-kaas',
      name: 'Kaas Plateau of Flowers & Mahabaleshwar',
      slug: 'kaas-plateau',
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
      packageCount: 2,
      shortDesc: 'UNESCO World Natural Heritage volcanic laterite tableland blossoming in wild orchids and carnivorous flowers.',
      startingPrice: 4299,
      featured: false,
      region: 'Satara / Sahyadri'
    }
  ] as Destination[],

  packages: [
    {
      id: 'pkg-harishchandragad-konkan-kada',
      slug: 'harishchandragad-konkan-kada',
      destinationSlug: 'harishchandragad',
      destinationName: 'Harishchandragad & Sandhan Valley',
      title: 'Harishchandragad Trek: Konkan Kada Cliff & Ancient Cave Camping',
      bestseller: true,
      category: 'Sahyadri Mountain Trek',
      duration: '2D / 1N',
      difficulty: 'Moderate',
      groupSize: '10–16 Travelers',
      season: 'Year-round (Best: Jun – Feb)',
      rating: 4.94,
      reviewCount: 284,
      heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80'
      ],
      summary: 'Perched 4,670 ft above sea level, Harishchandragad boasts the world-famous Konkan Kada — an overhanging concave cliff dropping vertically into misty valleys. Camp near Kedareshwar cave temple and watch a circular rainbow phenomenon (Brocken Spectre) at sunrise.',
      highlights: [
        'Sunset and morning cloud inversion watch at the colossal Konkan Kada cliff',
        'Explore 6th-century rock-cut Kedareshwar Cave with its legendary water temple pillar',
        'Night camping under pristine star-filled Sahyadri skies with campfire storytelling',
        'Authentic village-cooked Maharashtrian Bhakri, Pithla, Thecha & hot village chai',
        'Pick-up & drop from Mumbai (Dadar, Thane, Kalyan) and Pune (Shivajinagar)'
      ],
      price: 2499,
      originalPrice: 3499,
      startPoint: 'Dadar Station (Mumbai) & Swargate (Pune)',
      endPoint: 'Dadar Station (Mumbai) & Swargate (Pune)',
      inclusions: [
        'Overnight travel in sanitized private AC Pushback Bus / Tempo Traveler',
        '1 night shared tent camping (2/3 sharing) with foam sleeping mats & blankets',
        '2 freshly cooked village breakfasts, 1 traditional Maharashtrian dinner & evening tea',
        'Certified mountaineer Trip Captain & local village wilderness guide',
        'Forest entry fees, toll taxes and comprehensive first-aid medical support'
      ],
      exclusions: [
        'Lunch on Day 1 (stop at highway dhaba)',
        'Personal water bottles and personal luggage mule porter service',
        'Any personal snacks or packaged cold drinks'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Night Departure from Mumbai/Pune & Base Village Ascent to Konkan Kada',
          description: 'Board our private bus late Friday night from Mumbai (Dadar/Thane/Kalyan) or Pune. Arrive at Khireshwar/Pachnai base village at dawn. Relish hot Poha, boiled eggs, and village tea. Begin the scenic ascent through lush ravines and rock carvings. Reach the fort plateau by midday, visit the ancient Harishchandreshwar temple complex, set up tents, and head to Konkan Kada to witness a breathtaking Sahyadri golden hour.',
          meals: 'Breakfast & Hot Village Dinner',
          stay: 'Alpine Dome Tents near Konkan Kada Cliff'
        },
        {
          day: 2,
          title: 'Kedareshwar Cave Exploration, Taramati View & Return',
          description: 'Wake up to the cool mountain breeze. Watch the morning sea of clouds roll beneath Konkan Kada. Visit the mysterious Kedareshwar cave where a giant Shivalinga stands submerged in ice-cold spring water supported by a single ancient rock pillar. Descend safely to Pachnai village for piping hot lunch of Pithla Bhakri and Thecha before boarding our bus back to Mumbai/Pune by Sunday evening.',
          meals: 'Breakfast & Traditional Village Lunch',
          stay: 'End of trip'
        }
      ]
    },
    {
      id: 'pkg-kalsubai-sunrise-trek',
      slug: 'kalsubai-sunrise-trek',
      destinationSlug: 'kalsubai',
      destinationName: 'Kalsubai Peak — Everest of Maharashtra',
      title: 'Kalsubai Night Trek: Sunrise Above the Clouds at Maharashtra’s Highest Peak',
      bestseller: true,
      category: 'Night Trek & Sunrise Peak',
      duration: '1D / 1N',
      difficulty: 'Moderate',
      groupSize: '12–18 Travelers',
      season: 'Year-round',
      rating: 4.96,
      reviewCount: 340,
      heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
      ],
      summary: 'Summit the highest pinnacle of Maharashtra at 5,400 ft (1,646 meters). Climb through cool night air with torchlights, conquer secure steel ladders on sheer rock faces, and greet the golden sun as it pierces through an ocean of rolling clouds.',
      highlights: [
        'Summit Maharashtra’s highest peak at 1,646m (Kalsubai Temple summit)',
        'Spectacular 360-degree sunrise view overlooking Bhandardara Lake & Arthur Hill reservoir',
        'Exciting steel ladder scrambles engineered into vertical volcanic basalt cliffs',
        'Overnight travel from Mumbai & Pune with morning breakfast and village thali lunch',
        'Guided by experienced Sahyadri captains equipped with safety ropes and torches'
      ],
      price: 1799,
      originalPrice: 2499,
      startPoint: 'Dadar, Thane, Kalyan (Mumbai) / Wakad, Nashik Phata (Pune)',
      endPoint: 'Dadar, Thane, Kalyan (Mumbai) / Wakad, Nashik Phata (Pune)',
      inclusions: [
        'Return travel in sanitized private AC Tempo Traveler / Bus',
        'Morning authentic Maharashtrian breakfast (Kanda Poha & Tea) at base village',
        'Unlimited authentic village Lunch (Veg / Non-Veg option available)',
        'Forest department entry charges & trek permit fees',
        'Experienced mountain leader & local village guides'
      ],
      exclusions: [
        'Dinner during highway stop on departure night',
        'Personal trekking gear (shoes, headlamps, trekking poles)',
        'Mineral water and personal beverages'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Midnight Trek to Maharashtra’s Highest Pinnacle',
          description: 'Meet the Tripto crew at Dadar/Thane (10:30 PM) or Pune (10:00 PM). Journey through Kasara ghats to Bari base village. After a quick briefing and safety check at 3:00 AM, begin the night ascent beneath starlit skies. Navigate rocky pathways and ascending iron ladders. Reach the summit temple of Kalsubai Devi just in time for the golden sunrise above the Sahyadri horizon. Descend to Bari for village lunch and return to Mumbai/Pune by 7:00 PM.',
          meals: 'Summit tea, basecamp breakfast & village lunch',
          stay: 'Overnight journey & summit hike'
        }
      ]
    },
    {
      id: 'pkg-rajmachi-fireflies-camping',
      slug: 'rajmachi-fireflies-camping',
      destinationSlug: 'rajmachi',
      destinationName: 'Rajmachi & Kataldhar Waterfalls',
      title: 'Rajmachi Fort Camping: Shrivardhan Balekilla & Kataldhar Trek',
      bestseller: true,
      category: 'Fortress Trail & Glamping',
      duration: '2D / 1N',
      difficulty: 'Easy to Moderate',
      groupSize: '10–15 Travelers',
      season: 'May – Feb',
      rating: 4.88,
      reviewCount: 198,
      heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
      ],
      summary: 'Trek the scenic ridge from Lonavala to the historic twin forts of Shrivardhan and Manaranjan. Explore ancient water cisterns, the centuries-old Kal Bhairav temple, and camp on the scenic plateau with bonfire jams.',
      highlights: [
        'Scale Shrivardhan Balekilla for sweeping views of Duke’s Nose and Ulhas valley',
        'Scenic 14 km jungle trail through dense semi-evergreen Western Ghats forest',
        'Camp beside Udhewadi village in cozy alpine tents under millions of stars',
        'Savor authentic rural Maharashtrian Zunka Bhakri and succulent Sukka chicken',
        'Lonavala railway station pickup and drop with local 4x4 luggage support'
      ],
      price: 1999,
      originalPrice: 2800,
      startPoint: 'Lonavala Railway Station',
      endPoint: 'Lonavala Railway Station',
      inclusions: [
        '1 night alpine dome tent stay in Udhewadi village with sleeping mats',
        '1 breakfast, 1 evening high tea, 1 village dinner (veg/non-veg), 1 lunch',
        'Local 4x4 pickup from Udhewadi to Lonavala on return',
        'Certified Tripto trek leader and local guide',
        'Campfire and evening acoustic music setup'
      ],
      exclusions: [
        'Train tickets to Lonavala station',
        'Personal expenses and extra snacks',
        'Personal trekking gear'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Lonavala to Udhewadi Trail & Shrivardhan Sunset',
          description: 'Assemble at Lonavala station by 9:00 AM. Board our transfer to Fanasrai and begin walking the lush plateau trail. Arrive at rustic Udhewadi village, relish homemade lunch, and ascend the steep steps of Shrivardhan fort. Marvel at the sunset over Karnala and Prabalgad forts. Evening campfire with music and piping hot dinner.',
          meals: 'Lunch, Evening Snacks & Dinner',
          stay: 'Lakeside / Meadow Tents, Udhewadi'
        },
        {
          day: 2,
          title: 'Manaranjan Fort Sunrise & 4x4 Return to Lonavala',
          description: 'Hike up Manaranjan fort for sunrise. Explore historical ramparts, granaries, and the stone-carved Kal Bhairavnath temple. After breakfast, board thrilling 4x4 open jeeps cruising down the rugged dirt track to Lonavala station by midday.',
          meals: 'Breakfast included',
          stay: 'End of trip'
        }
      ]
    },
    {
      id: 'pkg-tarkarli-scuba-backwaters',
      slug: 'tarkarli-scuba-backwaters',
      destinationSlug: 'tarkarli-konkan',
      destinationName: 'Tarkarli & Devbagh Coastal Backwaters',
      title: 'Konkan Paradise: Tarkarli Scuba Diving, Sindhudurg Fort & Devbagh Sangam',
      bestseller: false,
      category: 'Coastal Adventure & Scuba',
      duration: '3D / 2N',
      difficulty: 'Easy',
      groupSize: '8–14 Travelers',
      season: 'Oct – May',
      rating: 4.91,
      reviewCount: 156,
      heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
      ],
      summary: 'Trade city chaos for the pristine turquoise waters of South Konkan. Experience PADI-assisted scuba diving beside the 350-year-old ocean ramparts of Chhatrapati Shivaji Maharaj’s Sindhudurg Fort, spot playful dolphins in the Arabian Sea, and cruise the golden sandspit of Devbagh.',
      highlights: [
        'Guided PADI scuba dive with underwater video footage and coral reef discovery',
        'Boat expedition to historical sea fortress Sindhudurg built in 1664 on Kurte Island',
        'Dolphin watching safari and boat cruise to the pristine confluence of Karli River & sea',
        'Boutique beachfront Konkani cottage stays under nodding coconut palms',
        'Authentic Malvani Surmai/Pomfret thali, Solkadhi, and vegetarian Ukdiche Modak'
      ],
      price: 8499,
      originalPrice: 11500,
      startPoint: 'Kudal / Sawantwadi Railway Station or Goa Airport (Mopa / Dabolim)',
      endPoint: 'Kudal / Sawantwadi Railway Station or Goa Airport (Mopa / Dabolim)',
      inclusions: [
        '2 nights accommodation in air-conditioned beach cottages in Tarkarli/Devbagh',
        'All breakfasts and 2 authentic Malvani seafood/vegetarian feast dinners',
        'Full Scuba Diving session with certified dive master + HD underwater video and photos',
        'Water sports combo: Jet Ski, Banana ride, Bumper ride & Speedboat cruise',
        'Private AC vehicle for all transfers and sightseeing throughout the trip'
      ],
      exclusions: [
        'Train or flight tickets to Kudal / Goa',
        'Lunches and personal shopping for cashew nuts / Malvani spices',
        'Optional parasailing ride'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Tarkarli & Sindhudurg Sea Fort Expedition',
          description: 'Arrive at Kudal station or Mopa airport where your Tripto private cab receives you. Check into our coconut grove beach resort. Savor a chilled glass of Solkadhi. Take a ferry to Sindhudurg Fort, walking the 3-km-long sea ramparts built by Shivaji Maharaj with iron-lead foundations. Evening sunset stroll along Tarkarli white beach.',
          meals: 'Dinner included',
          stay: 'Beachfront Cottages, Tarkarli'
        },
        {
          day: 2,
          title: 'Scuba Diving, Coral Exploration & Water Sports Fiesta',
          description: 'Head to the dive station early morning. Dive into 25-foot clear coastal waters with expert instructors to spot clownfish, corals, and sea turtles. Follow up with thrilling jet ski and banana boat rides. Spend the golden afternoon kayaking in the tranquil backwaters of Devbagh.',
          meals: 'Breakfast & Seafood Dinner',
          stay: 'Beachfront Cottages, Tarkarli'
        },
        {
          day: 3,
          title: 'Dolphin Safari, Tsunami Island & Farewell',
          description: 'Board an early morning boat into the open Arabian Sea to spot pods of Indo-Pacific humpback dolphins. Visit the secluded Tsunami Island sandbar before checking out. Transfer to Kudal station or Goa airport with unforgettable coastal memories.',
          meals: 'Breakfast included',
          stay: 'End of trip'
        }
      ]
    },
    {
      id: 'pkg-rajgad-torna-traverse',
      slug: 'rajgad-torna-traverse',
      destinationSlug: 'rajgad-torna',
      destinationName: 'Rajgad to Torna Fortress Traverse',
      title: 'The Royal Sahyadri Traverse: Rajgad King of Forts to Torna Ridge Walk',
      bestseller: false,
      category: 'Historical Fortress Trek',
      duration: '2D / 1N',
      difficulty: 'Challenging',
      groupSize: '8–14 Trekkers',
      season: 'Jul – Feb',
      rating: 4.93,
      reviewCount: 167,
      heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
      ],
      summary: 'The holy grail of Sahyadri trekking: scale Rajgad (capital of the Maratha Empire for over 25 years), marvel at the architectural genius of Suvela & Sanjeevani Machi, and hike the thrilling high-altitude ridgeline connecting to Torna (highest fort in Pune district).',
      highlights: [
        'Sleep inside the historic stone Padmavati Temple on Rajgad fort',
        'Walk the razor-sharp double-fortified fortification walls of Sanjeevani Machi',
        'Epic 12-km high-altitude mountain ridge traverse linking Rajgad to Torna',
        'Conquer Zunjar Machi and the colossal Budhla Machi cliffs on Torna',
        'Dedicated trek captain with deep knowledge of 17th-century Maratha military history'
      ],
      price: 3299,
      originalPrice: 4200,
      startPoint: 'Pune (Swargate) & Mumbai (Dadar)',
      endPoint: 'Pune (Swargate) & Mumbai (Dadar)',
      inclusions: [
        'Private non-AC / AC transport from Pune/Mumbai to Gunjavane and return from Velhe',
        '1 night heritage stay in Padmavati Temple hall or high-altitude tents',
        '2 hearty breakfasts, 1 traditional village dinner, 1 lunch on the trail',
        'Safety ropes, medical first aid, and certified wilderness trek leader',
        'All permits and historical site entry charges'
      ],
      exclusions: [
        'Lunch on Day 1 (carry packed dry snacks)',
        'Personal trekking backpack offloading',
        'Personal hiking pole and torch'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Ascent to Rajgad & Suvela Machi Exploration',
          description: 'Depart early morning from Pune/Mumbai to Gunjavane base village. Climb the historic Chor Darwaza to enter Rajgad. Explore the royal Balekilla (citadel), Nedhe (natural rock eyelet), and the sheer fortification walls of Suvela Machi. Spend the night in the stone corridors of Padmavati temple.',
          meals: 'Breakfast & Traditional Dinner',
          stay: 'Historic Padmavati Temple / Tents'
        },
        {
          day: 2,
          title: 'The Great Ridge Traverse to Torna & Descent to Velhe',
          description: 'Start at dawn along the Sanjeevani Machi ridge. Hike the undulating mountain crest with deep drop-offs into the Panshet and Bhatghar dam valleys. Ascend Torna Fort through Kokan Darwaza. Soak in the panoramic vista before descending to Velhe for a celebratory village feast and return journey.',
          meals: 'Breakfast & Celebratory Lunch',
          stay: 'End of trip'
        }
      ]
    },
    {
      id: 'pkg-kaas-plateau-flowers',
      slug: 'kaas-plateau-flowers',
      destinationSlug: 'kaas-plateau',
      destinationName: 'Kaas Plateau of Flowers & Mahabaleshwar',
      title: 'Kaas Valley of Flowers: UNESCO Floral Bloom & Thoseghar Falls',
      bestseller: false,
      category: 'Botanical & Eco Trail',
      duration: '2D / 1N',
      difficulty: 'Easy',
      groupSize: '10–16 Travelers',
      season: 'Aug – Oct',
      rating: 4.87,
      reviewCount: 122,
      heroImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
      ],
      summary: 'Witness Maharashtra’s volcanic tableland transform into a multi-colored floral carpet of rare Utricularia, Eriocaulon, and wild Sahyadri orchids. Pair the botanical wonder with the 1,000-ft roaring drop of Thoseghar Waterfall and serene Kaas Lake.',
      highlights: [
        'Official guided nature walk across UNESCO World Heritage Kaas Plateau',
        'Spot carnivorous bladderworts and endemic wild purple orchids',
        'Visit the thunderous Thoseghar Waterfall viewpoint in dense Sahyadri mist',
        'Explore the ancient wooden stone architecture of Chalkewadi Windmill Plateau',
        'Overnight stay in a cozy countryside resort near Satara'
      ],
      price: 4299,
      originalPrice: 5500,
      startPoint: 'Mumbai (Dadar, Vashi) & Pune (Swargate)',
      endPoint: 'Mumbai (Dadar, Vashi) & Pune (Swargate)',
      inclusions: [
        'All travel in comfortable private AC Tempo Traveler',
        '1 night stay in premium Satara countryside resort (twin/triple sharing)',
        '2 breakfasts, 1 traditional Satari lunch, 1 dinner',
        'Official Kaas Plateau forest entry slot passes and botanical guide',
        'Entry charges to Thoseghar Waterfall and Kaas Lake'
      ],
      exclusions: [
        'Lunch on Day 2',
        'Personal camera permissions',
        'Tips and personal shopping for famous Satara Kandi Pedhe'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Departure from Mumbai/Pune & The Carpet of Kaas',
          description: 'Early morning pick up from Mumbai and Pune. Drive along the scenic Western Ghats highway to Satara. Check into our nature resort, have lunch, and enter the protected Kaas Plateau. Walk among millions of tiny yellow, blue, and violet petals blooming across volcanic rock. Sunset tea beside tranquil Kaas Lake.',
          meals: 'Breakfast, Lunch & Dinner',
          stay: 'Countryside Resort, Satara'
        },
        {
          day: 2,
          title: 'Thoseghar Falls, Chalkewadi Windmills & Return',
          description: 'Post breakfast, drive through misty valleys to Thoseghar Waterfall to witness one of western India’s highest cascading waterfalls. Visit Chalkewadi plateau with hundreds of giant wind turbines humming in the fog. Savor Satara Kandi Pedhe before returning to Pune by 7 PM and Mumbai by 10 PM.',
          meals: 'Breakfast included',
          stay: 'End of trip'
        }
      ]
    }
  ] as TourPackage[],

  testimonials: [
    {
      id: 'test-1',
      name: 'SWAPNIL PATIL',
      tripName: 'HARISHCHANDRAGAD TREK',
      date: 'AUG 2026',
      quote: '“Standing at the edge of Konkan Kada watching the cloud inversion while our captain brewed hot ginger chai was an out-of-body experience. The village bhakri and thecha were out of this world!”',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      linkedPackageSlug: 'harishchandragad-konkan-kada',
      cardTheme: 'orange'
    },
    {
      id: 'test-2',
      name: 'RUTUJA DESHMUKH',
      tripName: 'KALSUBAI NIGHT TREK',
      date: 'JUL 2026',
      quote: '“I joined solo for the Kalsubai midnight trek and was instantly welcomed into the group. Climbing those vertical iron ladders in the cool night breeze and seeing the golden sunrise at 5,400 ft was unforgettable!”',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      linkedPackageSlug: 'kalsubai-sunrise-trek',
      cardTheme: 'navy'
    },
    {
      id: 'test-3',
      name: 'ADITYA KULKARNI',
      tripName: 'TARKARLI SCUBA EXPEDITION',
      date: 'MAY 2026',
      quote: '“Sindhudurg fort rising straight from the Arabian Sea, swimming with turtles, and gorging on fresh Surmai Fry and Solkadhi in Malvan. Tripto handled every permit and ride flawlessly.”',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      linkedPackageSlug: 'tarkarli-scuba-backwaters',
      cardTheme: 'emerald'
    },
    {
      id: 'test-4',
      name: 'NEHA JOSHI',
      tripName: 'RAJMACHI FORT CAMPING',
      date: 'FEB 2026',
      quote: '“The fireflies in the trees on our night walk to Shrivardhan looked like Christmas lights. Clean tents, zero commercial rush, and our trip captain shared fascinating historical folklore around the campfire.”',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      linkedPackageSlug: 'rajmachi-fireflies-camping',
      cardTheme: 'purple'
    }
  ] as Testimonial[],

  departures: [
    {
      id: 'dep-1',
      date: '10 Oct 2026',
      displayDate: '10 OCT 2026',
      monthCategory: 'OCTOBER 2026',
      destinationName: 'Harishchandragad Konkan Kada (2D/1N)',
      price: 2499,
      seatsLeft: 4,
      thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=200&q=80',
      linkedPackageSlug: 'harishchandragad-konkan-kada',
      status: 'Filling Fast'
    },
    {
      id: 'dep-2',
      date: '17 Oct 2026',
      displayDate: '17 OCT 2026',
      monthCategory: 'OCTOBER 2026',
      destinationName: 'Kalsubai Sunrise Night Trek (1D/1N)',
      price: 1799,
      seatsLeft: 6,
      thumbnail: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=200&q=80',
      linkedPackageSlug: 'kalsubai-sunrise-trek',
      status: 'Few Seats Left'
    },
    {
      id: 'dep-3',
      date: '24 Oct 2026',
      displayDate: '24 OCT 2026',
      monthCategory: 'OCTOBER 2026',
      destinationName: 'Rajmachi Fort & Camping (2D/1N)',
      price: 1999,
      seatsLeft: 5,
      thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80',
      linkedPackageSlug: 'rajmachi-fireflies-camping',
      status: 'Available'
    },
    {
      id: 'dep-4',
      date: '07 Nov 2026',
      displayDate: '07 NOV 2026',
      monthCategory: 'NOVEMBER 2026',
      destinationName: 'Tarkarli Scuba & Sindhudurg Fort (3D/2N)',
      price: 8499,
      seatsLeft: 3,
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80',
      linkedPackageSlug: 'tarkarli-scuba-backwaters',
      status: 'Few Seats Left'
    },
    {
      id: 'dep-5',
      date: '14 Nov 2026',
      displayDate: '14 NOV 2026',
      monthCategory: 'NOVEMBER 2026',
      destinationName: 'Rajgad to Torna Royal Traverse (2D/1N)',
      price: 3299,
      seatsLeft: 4,
      thumbnail: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=200&q=80',
      linkedPackageSlug: 'rajgad-torna-traverse',
      status: 'Filling Fast'
    },
    {
      id: 'dep-6',
      date: '21 Nov 2026',
      displayDate: '21 NOV 2026',
      monthCategory: 'NOVEMBER 2026',
      destinationName: 'Harishchandragad Konkan Kada (2D/1N)',
      price: 2499,
      seatsLeft: 8,
      thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=200&q=80',
      linkedPackageSlug: 'harishchandragad-konkan-kada',
      status: 'Available'
    },
    {
      id: 'dep-7',
      date: '05 Dec 2026',
      displayDate: '05 DEC 2026',
      monthCategory: 'DECEMBER 2026',
      destinationName: 'Kaas Plateau of Flowers & Satara (2D/1N)',
      price: 4299,
      seatsLeft: 5,
      thumbnail: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=200&q=80',
      linkedPackageSlug: 'kaas-plateau-flowers',
      status: 'Available'
    }
  ] as FixedDeparture[],

  blogs: [
    {
      id: 'blog-1',
      slug: 'konkan-kada-brocken-spectre-guide',
      title: 'Chasing the Brocken Spectre: When Your Shadow Walks on Clouds at Konkan Kada',
      category: 'Sahyadri Wonders',
      readTime: '5 min read',
      date: 'Sep 21, 2026',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      author: 'Captain Rohan Deshmukh',
      excerpt: 'How temperature inversions create the mystical circular rainbow halo around your shadow at Harishchandragad’s vertical amphitheater.'
    },
    {
      id: 'blog-2',
      slug: 'kalsubai-first-timer-survival-checklist',
      title: 'Conquering the Everest of Maharashtra: First-Timer’s Guide to Kalsubai',
      category: 'Trek Essentials',
      readTime: '6 min read',
      date: 'Sep 02, 2026',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      author: 'Captain Tanvi Rao',
      excerpt: 'Ladder grips, headlamp batteries, hydration tips, and why packing light makes the 5,400 ft summit a joyful breeze.'
    },
    {
      id: 'blog-3',
      slug: 'malvan-scuba-culture-and-food',
      title: 'Beyond the Fort Walls: Scuba Diving and Secret Beach Shacks in Malvan',
      category: 'Coastal Trails',
      readTime: '7 min read',
      date: 'Aug 18, 2026',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      author: 'Aditya Sawant',
      excerpt: 'From 17th-century coral ramparts built on lead to hand-pounded Kokum Solkadhi that cures every city fatigue.'
    }
  ] as BlogPost[],

  faqs: [
    {
      q: 'Where do the pickups happen for Maharashtra weekend treks?',
      a: 'We provide centralized pick-up points across Mumbai (Dadar West, Chembur, Vashi, Thane Teen Hath Naka, Kalyan) and Pune (Shivajinagar, Swargate, Chandani Chowk, Wakad) in comfortable sanitised AC buses and Tempo Travelers.'
    },
    {
      q: 'I am a beginner and joining solo. Can I do Harishchandragad or Kalsubai?',
      a: 'Absolutely! More than 70% of our weekend travelers join solo. Both treks are guided by certified mountaineers with safety ropes, first-aid kits, and regular rest stops. You will be matched with friendly companions of similar pace.'
    },
    {
      q: 'What is the food like on these treks?',
      a: 'We partner directly with local village families at the basecamp to serve authentic, piping-hot home-cooked Maharashtrian food — including Kanda Poha, Jowar/Bajra Bhakri, Pithla, Thecha, Sukka Chicken, and freshly brewed ginger chai.'
    },
    {
      q: 'How does the HDFC No-Cost EMI work for bigger coastal expeditions?',
      a: 'You can convert any booking (like Tarkarli Scuba or multi-day Sahyadri circuits) into 3 or 6 monthly installments at 0% effective interest using any eligible HDFC Credit Card during confirmation.'
    },
    {
      q: 'What if it rains or weather conditions get rough?',
      a: 'Our captains constantly monitor Sahyadri meteorological alerts. In case of flash rain or hazardous conditions, we adjust routes or offer 100% free date transfers to subsequent batches.'
    }
  ]
};
