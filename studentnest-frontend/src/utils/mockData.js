const HOUSING_IMAGES = [
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&h=400&fit=crop',
]

const FOOD_IMAGES = [
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop',
]

const GROCERY_IMAGES = [
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&h=400&fit=crop',
]

const SPORTS_IMAGES = [
  'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&h=400&fit=crop',
]

const COMMUNITY_IMAGES = [
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
]

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateDistance() {
  return (Math.random() * 4 + 0.2).toFixed(1)
}

function generateRating() {
  return (Math.random() * 1.5 + 3.5).toFixed(1)
}

function generateReviewCount() {
  return randomBetween(12, 480)
}

function generatePhone() {
  return `(${randomBetween(200, 999)}) ${randomBetween(200, 999)}-${randomBetween(1000, 9999)}`
}

const FIRST_NAMES = ['Sarah', 'James', 'Maria', 'Chen', 'Priya', 'Ahmed', 'Lisa', 'David', 'Yuki', 'Carlos', 'Emma', 'Raj', 'Anna', 'Michael', 'Fatima']
const LAST_NAMES = ['Johnson', 'Smith', 'Garcia', 'Wang', 'Patel', 'Hassan', 'Kim', 'Brown', 'Tanaka', 'Rodriguez', 'Wilson', 'Kumar', 'Mueller', 'Lee', 'Ali']

function generateContactName() {
  return `${randomPick(FIRST_NAMES)} ${randomPick(LAST_NAMES)}`
}

const REVIEW_TEXTS = {
  housing: [
    "Moved here last semester and it's been great. Quiet neighborhood, close to campus, and the landlord is responsive.",
    "Affordable for the area. The apartment is clean and well-maintained. Bus stop is right outside.",
    "Lived here for 2 years now. Good value for money. Kitchen is a bit small but everything else is solid.",
    "Perfect for students on a budget. Utilities included in rent which makes budgeting easier.",
    "The location is unbeatable - 10 min walk to campus. Building is older but recently renovated.",
    "Great community of international students here. Management is helpful with lease questions.",
    "Spacious rooms compared to other places at this price point. Parking available too.",
    "Decent place. WiFi could be better but the rent is hard to beat in this area.",
  ],
  food: [
    "Authentic flavors that remind me of home. Portions are generous and prices are student-friendly.",
    "Best spot for homestyle cooking near campus. The lunch specials are a steal.",
    "Been coming here since my first week. Staff is friendly and they know what international students want.",
    "Great variety of dishes. They also do catering for cultural events which is awesome.",
    "The grocery section has hard-to-find ingredients from back home. Prices are reasonable.",
    "Fresh produce and good quality spices. They import directly which keeps costs down.",
    "My go-to place for weekly groceries. They have a student discount on Tuesdays.",
    "Amazing food court with multiple cuisines. Perfect when you're craving something specific.",
  ],
  sports: [
    "Well-organized league with players of all skill levels. Great way to meet people.",
    "Joined last month and already made a bunch of friends. Games are competitive but fun.",
    "Good facilities and the schedule works around class times. Highly recommend.",
    "The coaches are supportive and the community is welcoming to newcomers.",
    "Best pickup games in the area. Show up on weekends and you'll always find a game.",
    "Affordable membership and they have equipment you can borrow. Perfect for students.",
  ],
  community: [
    "This group helped me so much when I first arrived. They organized airport pickups and everything.",
    "Regular meetups and cultural events. It's like having a second family here.",
    "Great network for finding housing, jobs, and just general advice about living here.",
    "The festival celebrations they organize are incredible. Brings everyone together.",
    "Active WhatsApp group where people share tips, sell furniture, and organize hangouts.",
    "Joined for the events, stayed for the friendships. Couldn't imagine my experience without this group.",
  ]
}

function generateReviews(type, count = 3) {
  const texts = REVIEW_TEXTS[type] || REVIEW_TEXTS.housing
  const reviews = []
  const usedTexts = new Set()
  for (let i = 0; i < count; i++) {
    let text
    do {
      text = randomPick(texts)
    } while (usedTexts.has(text) && usedTexts.size < texts.length)
    usedTexts.add(text)
    reviews.push({
      id: `rev-${Date.now()}-${i}`,
      author: generateContactName(),
      rating: parseFloat(generateRating()),
      text,
      date: new Date(Date.now() - randomBetween(1, 180) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      helpful: randomBetween(2, 45)
    })
  }
  return reviews
}

export function generateHousingData(collegeName, city) {
  const types = ['Studio Apartment', '1 Bedroom Apartment', '2 Bedroom Shared', 'Room in Shared House', 'Student Housing Complex', 'Private Room', '1BR Near Campus', 'Furnished Studio']
  const streets = ['Oak Street', 'University Ave', 'College Blvd', 'Maple Drive', 'Campus Way', 'Pine Street', 'Main Street', 'Park Avenue']
  const amenities = ['WiFi Included', 'Laundry', 'Parking', 'Furnished', 'Utilities Included', 'AC', 'Pet Friendly', 'Gym Access', 'Study Room', 'Bike Storage']

  return types.map((type, i) => ({
    id: `housing-${i}`,
    name: `${type} - ${randomPick(streets)}`,
    type: type,
    address: `${randomBetween(100, 9999)} ${randomPick(streets)}, ${city}`,
    distance: generateDistance(),
    price: type.includes('Studio') ? randomBetween(650, 950) :
           type.includes('1 Bedroom') || type.includes('1BR') ? randomBetween(800, 1200) :
           type.includes('Shared') || type.includes('Room') ? randomBetween(400, 700) :
           randomBetween(500, 900),
    priceUnit: '/month',
    rating: parseFloat(generateRating()),
    reviewCount: generateReviewCount(),
    image: HOUSING_IMAGES[i % HOUSING_IMAGES.length],
    amenities: amenities.sort(() => Math.random() - 0.5).slice(0, randomBetween(3, 6)),
    contact: { name: generateContactName(), phone: generatePhone(), email: `${randomPick(FIRST_NAMES).toLowerCase()}@email.com` },
    reviews: generateReviews('housing'),
    available: Math.random() > 0.2,
    verified: Math.random() > 0.3,
    nearCollege: collegeName
  }))
}

export function generateFoodData(nationality, city) {
  const cuisineMap = {
    'Indian': ['Taj Kitchen', 'Spice Route', 'Curry House', 'Bombay Bites', 'Desi Dhaba', 'Masala Grill'],
    'Chinese': ['Golden Dragon', 'Szechuan Garden', 'Wok & Roll', 'Jade Palace', 'Lucky Noodle', 'Ming Dynasty'],
    'South Korean': ['Seoul Kitchen', 'K-BBQ House', 'Kimchi Corner', 'Bibimbap Bowl', 'Korean Garden', 'Gangnam Grill'],
    'Vietnamese': ['Pho Paradise', 'Saigon Kitchen', 'Banh Mi House', 'Vietnam Garden', 'Lotus Cafe', 'Mekong Bistro'],
    'Japanese': ['Sakura Sushi', 'Ramen House', 'Tokyo Kitchen', 'Zen Garden', 'Ichiban Grill', 'Matcha Cafe'],
    'Mexican': ['Casa Mexicana', 'Taco Loco', 'El Sabor', 'Cantina Fresh', 'Burrito Brothers', 'Fiesta Kitchen'],
    'Nigerian': ['Mama Africa Kitchen', 'Lagos Grill', 'Jollof House', 'Naija Bites', 'Afro Kitchen', 'Palm Wine Spot'],
    'Thai': ['Thai Orchid', 'Bangkok Kitchen', 'Pad Thai House', 'Siam Garden', 'Coconut Curry', 'Thai Street'],
  }

  const defaultNames = ['World Kitchen', 'Global Bites', 'International Cafe', 'Fusion House', 'Spice World', 'Culture Kitchen']
  const restaurantNames = cuisineMap[nationality] || defaultNames

  const groceryNames = {
    'Indian': ['Patel Brothers', 'India Bazaar', 'Spice Market', 'Desi Grocery'],
    'Chinese': ['99 Ranch Market', 'H Mart', 'Asia Market', 'Oriental Grocery'],
    'South Korean': ['H Mart', 'Lotte Market', 'Korean Grocery', 'K-Market'],
    'Vietnamese': ['Viet Hoa Market', 'Asia Market', 'Saigon Market', 'Far East Grocery'],
    'Japanese': ['Mitsuwa', 'Nijiya Market', 'Tokyo Market', 'Japan Grocery'],
    'Mexican': ['La Michoacana', 'Fiesta Mart', 'El Rancho', 'Mercado Latino'],
    'Nigerian': ['African Market', 'Mama Africa Store', 'Lagos Market', 'Afro Grocery'],
  }

  const defaultGroceries = ['International Market', 'World Foods', 'Global Grocery', 'Multi-Cultural Market']
  const groceries = groceryNames[nationality] || defaultGroceries

  const restaurants = restaurantNames.map((name, i) => ({
    id: `food-rest-${i}`,
    name,
    type: 'restaurant',
    cuisine: nationality || 'International',
    address: `${randomBetween(100, 9999)} ${randomPick(['Main St', 'University Ave', 'Market St', 'Food Court Rd'])}, ${city}`,
    distance: generateDistance(),
    priceRange: randomPick(['$', '$$', '$']),
    avgMealPrice: randomBetween(8, 18),
    rating: parseFloat(generateRating()),
    reviewCount: generateReviewCount(),
    image: FOOD_IMAGES[i % FOOD_IMAGES.length],
    hours: '11:00 AM - 10:00 PM',
    contact: { name: generateContactName(), phone: generatePhone() },
    reviews: generateReviews('food'),
    studentDiscount: Math.random() > 0.5,
    deliveryAvailable: Math.random() > 0.3,
    tags: [nationality + ' Food', randomPick(['Halal', 'Vegetarian Options', 'Vegan Options', 'Dine-in', 'Takeout', 'Delivery'])]
  }))

  const groceryStores = groceries.map((name, i) => ({
    id: `food-groc-${i}`,
    name,
    type: 'grocery',
    cuisine: nationality || 'International',
    address: `${randomBetween(100, 9999)} ${randomPick(['Commerce St', 'Market Blvd', 'Trade Ave', 'Shop Lane'])}, ${city}`,
    distance: generateDistance(),
    priceRange: '$',
    rating: parseFloat(generateRating()),
    reviewCount: generateReviewCount(),
    image: GROCERY_IMAGES[i % GROCERY_IMAGES.length],
    hours: '9:00 AM - 9:00 PM',
    contact: { name: generateContactName(), phone: generatePhone() },
    reviews: generateReviews('food'),
    studentDiscount: Math.random() > 0.4,
    tags: [nationality + ' Groceries', 'Spices', 'Fresh Produce', 'Imported Goods']
  }))

  return [...restaurants, ...groceryStores]
}

export function generateCommunityData(nationality, city) {
  const groups = [
    { name: `${nationality} Students Association`, type: 'Cultural Association', members: randomBetween(80, 500) },
    { name: `${nationality} Community ${city}`, type: 'Community Group', members: randomBetween(150, 2000) },
    { name: `${nationality} Cultural Club`, type: 'Cultural Club', members: randomBetween(40, 300) },
    { name: `International Students Union`, type: 'Student Organization', members: randomBetween(200, 1500) },
    { name: `${nationality} Professionals Network`, type: 'Professional Network', members: randomBetween(100, 800) },
    { name: `Global Friends ${city}`, type: 'Social Group', members: randomBetween(60, 400) },
  ]

  const eventTypes = ['Cultural Festival', 'Potluck Dinner', 'Movie Night', 'Career Workshop', 'Sports Day', 'Welcome Party', 'Holiday Celebration', 'Networking Mixer', 'Language Exchange', 'Cooking Class']

  return groups.map((group, i) => ({
    id: `comm-${i}`,
    ...group,
    description: `Connect with fellow ${nationality} students and community members in ${city}. Regular events, support network, and cultural celebrations.`,
    image: COMMUNITY_IMAGES[i % COMMUNITY_IMAGES.length],
    rating: parseFloat(generateRating()),
    reviewCount: generateReviewCount(),
    contact: { name: generateContactName(), phone: generatePhone(), email: `${group.name.toLowerCase().replace(/\s+/g, '')}@groups.com` },
    platform: randomPick(['WhatsApp', 'Discord', 'Facebook', 'Telegram']),
    meetingFrequency: randomPick(['Weekly', 'Bi-weekly', 'Monthly']),
    upcomingEvents: Array.from({ length: randomBetween(2, 4) }, (_, j) => ({
      id: `event-${i}-${j}`,
      name: randomPick(eventTypes),
      date: new Date(Date.now() + randomBetween(3, 60) * 86400000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      time: `${randomBetween(5, 8)}:00 PM`,
      location: `${randomPick(['Community Center', 'Student Union', 'Park Pavilion', 'Campus Hall', 'Cultural Center'])}`,
      attendees: randomBetween(15, 120)
    })),
    reviews: generateReviews('community'),
    joinLink: '#'
  }))
}

export function generateSportsData(city) {
  const sports = [
    { name: `${city} Cricket League`, sport: 'Cricket', level: 'All Levels' },
    { name: `Campus Soccer Club`, sport: 'Soccer', level: 'Recreational' },
    { name: `${city} Badminton Club`, sport: 'Badminton', level: 'All Levels' },
    { name: `University Basketball League`, sport: 'Basketball', level: 'Competitive' },
    { name: `${city} Tennis Association`, sport: 'Tennis', level: 'Beginner Friendly' },
    { name: `Table Tennis Club`, sport: 'Table Tennis', level: 'All Levels' },
    { name: `${city} Running Group`, sport: 'Running', level: 'All Levels' },
    { name: `Volleyball Pickup Games`, sport: 'Volleyball', level: 'Recreational' },
    { name: `Swimming Club`, sport: 'Swimming', level: 'All Levels' },
    { name: `Yoga & Wellness Group`, sport: 'Yoga', level: 'Beginner Friendly' },
  ]

  return sports.map((sport, i) => ({
    id: `sport-${i}`,
    ...sport,
    address: `${randomPick(['Recreation Center', 'Sports Complex', 'University Gym', 'Community Park', 'Athletic Center'])}, ${city}`,
    distance: generateDistance(),
    fee: randomPick(['Free', '$5/session', '$10/month', '$25/semester', 'Free for students', '$15/month']),
    rating: parseFloat(generateRating()),
    reviewCount: generateReviewCount(),
    image: SPORTS_IMAGES[i % SPORTS_IMAGES.length],
    schedule: `${randomPick(['Mon/Wed/Fri', 'Tue/Thu', 'Weekends', 'Daily', 'Sat/Sun'])} ${randomBetween(5, 8)}:00 PM`,
    members: randomBetween(20, 200),
    contact: { name: generateContactName(), phone: generatePhone(), email: `${sport.sport.toLowerCase()}club@email.com` },
    upcomingEvents: Array.from({ length: randomBetween(1, 3) }, (_, j) => ({
      id: `sportevent-${i}-${j}`,
      name: `${randomPick(['Tournament', 'Friendly Match', 'Practice Session', 'Championship', 'Open Day'])}`,
      date: new Date(Date.now() + randomBetween(3, 45) * 86400000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      participants: randomBetween(8, 64)
    })),
    reviews: generateReviews('sports'),
    equipmentProvided: Math.random() > 0.4
  }))
}
