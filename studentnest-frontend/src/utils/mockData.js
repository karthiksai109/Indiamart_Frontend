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

const HOUSING_BY_CITY = {
  Austin: [
    { name: 'The Callaway House', type: 'Student Housing Complex', address: '501 W 26th St, Austin, TX', distance: '0.3', price: 899, amenities: ['WiFi Included', 'Furnished', 'Gym Access', 'Study Room', 'Laundry'], contact: { name: 'Leasing Office', phone: '(512) 476-1976', email: 'leasing@callawayhouse.com' }, rating: 4.3, reviewCount: 312, verified: true, available: true },
    { name: 'West Campus Studio - Nueces St', type: 'Studio Apartment', address: '2610 Nueces St, Austin, TX', distance: '0.5', price: 750, amenities: ['WiFi Included', 'AC', 'Laundry', 'Bike Storage'], contact: { name: 'Mark Rivera', phone: '(512) 555-0142', email: 'mark.r@austinrentals.com' }, rating: 4.1, reviewCount: 87, verified: true, available: true },
    { name: '26 West - Luxury Student Living', type: '1 Bedroom Apartment', address: '2600 Rio Grande St, Austin, TX', distance: '0.4', price: 1150, amenities: ['Furnished', 'Gym Access', 'Parking', 'AC', 'Study Room', 'Laundry'], contact: { name: 'Leasing Team', phone: '(512) 474-2626', email: 'info@26west.com' }, rating: 4.5, reviewCount: 198, verified: true, available: true },
    { name: 'Shared Room - Hyde Park', type: '2 Bedroom Shared', address: '4505 Duval St, Austin, TX', distance: '1.8', price: 525, amenities: ['WiFi Included', 'Laundry', 'Pet Friendly', 'Parking'], contact: { name: 'Sarah Chen', phone: '(512) 555-0287', email: 'sarah.c@utmail.com' }, rating: 4.0, reviewCount: 45, verified: false, available: true },
    { name: 'Riverside Private Room', type: 'Private Room', address: '1221 S Pleasant Valley Rd, Austin, TX', distance: '3.2', price: 480, amenities: ['Utilities Included', 'Furnished', 'Parking', 'AC'], contact: { name: 'David Okonkwo', phone: '(512) 555-0391', email: 'david.o@gmail.com' }, rating: 3.9, reviewCount: 32, verified: false, available: true },
    { name: 'Ion Austin - Student Apartments', type: 'Student Housing Complex', address: '505 W Riverside Dr, Austin, TX', distance: '1.5', price: 975, amenities: ['Furnished', 'Gym Access', 'Study Room', 'Laundry', 'Bike Storage', 'AC'], contact: { name: 'Ion Leasing', phone: '(512) 382-4466', email: 'leasing@ionaustin.com' }, rating: 4.2, reviewCount: 256, verified: true, available: true },
    { name: 'North Campus 1BR - Speedway', type: '1 Bedroom Apartment', address: '3204 Speedway, Austin, TX', distance: '0.9', price: 850, amenities: ['WiFi Included', 'AC', 'Laundry', 'Parking'], contact: { name: 'Lisa Tran', phone: '(512) 555-0463', email: 'lisa.t@austinrentals.com' }, rating: 4.0, reviewCount: 64, verified: true, available: false },
    { name: 'Furnished Studio - Guadalupe', type: 'Furnished Studio', address: '2901 Guadalupe St, Austin, TX', distance: '0.6', price: 820, amenities: ['Furnished', 'WiFi Included', 'AC', 'Laundry'], contact: { name: 'James Park', phone: '(512) 555-0518', email: 'james.p@dragrentals.com' }, rating: 4.4, reviewCount: 103, verified: true, available: true },
  ],
  Cambridge: [
    { name: 'Harvard Square Studio', type: 'Studio Apartment', address: '52 Church St, Cambridge, MA', distance: '0.3', price: 1450, amenities: ['WiFi Included', 'Laundry', 'AC'], contact: { name: 'Cambridge Realty', phone: '(617) 876-5500', email: 'info@cambridgerealty.com' }, rating: 4.2, reviewCount: 156, verified: true, available: true },
    { name: 'Central Square Shared Apt', type: '2 Bedroom Shared', address: '88 Magazine St, Cambridge, MA', distance: '1.1', price: 875, amenities: ['WiFi Included', 'Laundry', 'Bike Storage'], contact: { name: 'Priya Mehta', phone: '(617) 555-0234', email: 'priya.m@mit.edu' }, rating: 4.0, reviewCount: 67, verified: false, available: true },
    { name: 'Kendall Square 1BR', type: '1 Bedroom Apartment', address: '245 Third St, Cambridge, MA', distance: '0.8', price: 1800, amenities: ['Gym Access', 'AC', 'Parking', 'Laundry', 'Study Room'], contact: { name: 'Avalon Leasing', phone: '(617) 621-4500', email: 'leasing@avalonkendall.com' }, rating: 4.6, reviewCount: 289, verified: true, available: true },
    { name: 'Porter Square Room', type: 'Private Room', address: '1815 Massachusetts Ave, Cambridge, MA', distance: '2.0', price: 950, amenities: ['WiFi Included', 'Furnished', 'Laundry'], contact: { name: 'Wei Zhang', phone: '(617) 555-0378', email: 'wei.z@gmail.com' }, rating: 3.8, reviewCount: 28, verified: false, available: true },
    { name: 'Inman Square Furnished Studio', type: 'Furnished Studio', address: '1311 Cambridge St, Cambridge, MA', distance: '1.4', price: 1350, amenities: ['Furnished', 'WiFi Included', 'AC', 'Laundry'], contact: { name: 'Boston Pads', phone: '(617) 208-2121', email: 'info@bostonpads.com' }, rating: 4.3, reviewCount: 134, verified: true, available: true },
    { name: 'MIT Student Housing - Sidney Pacific', type: 'Student Housing Complex', address: '70 Pacific St, Cambridge, MA', distance: '0.5', price: 1100, amenities: ['Furnished', 'Gym Access', 'Study Room', 'Laundry', 'Bike Storage'], contact: { name: 'MIT Housing', phone: '(617) 253-5148', email: 'housing@mit.edu' }, rating: 4.4, reviewCount: 412, verified: true, available: false },
  ],
}

const HOUSING_DEFAULT = [
  { name: 'Campus View Apartments', type: 'Student Housing Complex', address: '100 University Blvd', distance: '0.4', price: 850, amenities: ['WiFi Included', 'Furnished', 'Gym Access', 'Study Room', 'Laundry'], contact: { name: 'Leasing Office', phone: '(555) 100-2000', email: 'leasing@campusview.com' }, rating: 4.3, reviewCount: 245, verified: true, available: true },
  { name: 'College Park Studio', type: 'Studio Apartment', address: '250 College Ave', distance: '0.7', price: 720, amenities: ['WiFi Included', 'AC', 'Laundry'], contact: { name: 'Anna Kim', phone: '(555) 100-2001', email: 'anna.k@rentals.com' }, rating: 4.1, reviewCount: 98, verified: true, available: true },
  { name: 'University Heights 1BR', type: '1 Bedroom Apartment', address: '480 Heights Dr', distance: '1.0', price: 1050, amenities: ['Furnished', 'Parking', 'AC', 'Laundry', 'Gym Access'], contact: { name: 'Heights Leasing', phone: '(555) 100-2002', email: 'leasing@uheights.com' }, rating: 4.5, reviewCount: 187, verified: true, available: true },
  { name: 'Shared Room - Elm Street', type: '2 Bedroom Shared', address: '312 Elm St', distance: '1.5', price: 490, amenities: ['WiFi Included', 'Laundry', 'Parking'], contact: { name: 'Carlos Rodriguez', phone: '(555) 100-2003', email: 'carlos.r@gmail.com' }, rating: 3.9, reviewCount: 42, verified: false, available: true },
  { name: 'Downtown Private Room', type: 'Private Room', address: '55 Main St', distance: '2.3', price: 550, amenities: ['Utilities Included', 'Furnished', 'AC'], contact: { name: 'Fatima Ali', phone: '(555) 100-2004', email: 'fatima.a@outlook.com' }, rating: 4.0, reviewCount: 36, verified: false, available: true },
  { name: 'Scholar Residence', type: 'Student Housing Complex', address: '700 Scholar Way', distance: '0.3', price: 920, amenities: ['Furnished', 'Gym Access', 'Study Room', 'Laundry', 'Bike Storage', 'AC'], contact: { name: 'Scholar Leasing', phone: '(555) 100-2005', email: 'info@scholarres.com' }, rating: 4.4, reviewCount: 310, verified: true, available: true },
  { name: 'Oak Street Furnished Studio', type: 'Furnished Studio', address: '189 Oak St', distance: '0.8', price: 780, amenities: ['Furnished', 'WiFi Included', 'AC', 'Laundry'], contact: { name: 'James Lee', phone: '(555) 100-2006', email: 'james.l@rentals.com' }, rating: 4.2, reviewCount: 89, verified: true, available: true },
  { name: 'Maple Drive 1BR', type: '1 Bedroom Apartment', address: '422 Maple Dr', distance: '1.2', price: 880, amenities: ['WiFi Included', 'AC', 'Parking', 'Laundry'], contact: { name: 'Maria Santos', phone: '(555) 100-2007', email: 'maria.s@rentals.com' }, rating: 4.0, reviewCount: 71, verified: true, available: false },
]

const FOOD_BY_NATIONALITY = {
  Indian: {
    restaurants: [
      { name: 'Saravana Bhavan', avgMealPrice: 12, priceRange: '$', hours: '11:00 AM - 10:00 PM', tags: ['Indian Food', 'Vegetarian Options', 'Dine-in'], studentDiscount: true, deliveryAvailable: true },
      { name: 'Biryani Pot', avgMealPrice: 14, priceRange: '$', hours: '11:30 AM - 10:30 PM', tags: ['Indian Food', 'Halal', 'Delivery'], studentDiscount: false, deliveryAvailable: true },
      { name: 'Dosa Corner', avgMealPrice: 10, priceRange: '$', hours: '8:00 AM - 9:00 PM', tags: ['Indian Food', 'Vegetarian Options', 'Takeout'], studentDiscount: true, deliveryAvailable: false },
      { name: 'Tandoori Nights', avgMealPrice: 16, priceRange: '$$', hours: '12:00 PM - 11:00 PM', tags: ['Indian Food', 'Halal', 'Dine-in'], studentDiscount: false, deliveryAvailable: true },
      { name: 'Chaat House', avgMealPrice: 9, priceRange: '$', hours: '10:00 AM - 9:00 PM', tags: ['Indian Food', 'Vegetarian Options', 'Takeout'], studentDiscount: true, deliveryAvailable: false },
      { name: 'Madras Cafe', avgMealPrice: 11, priceRange: '$', hours: '7:30 AM - 9:30 PM', tags: ['Indian Food', 'Vegetarian Options', 'Dine-in'], studentDiscount: true, deliveryAvailable: true },
    ],
    groceries: [
      { name: 'Patel Brothers', hours: '9:00 AM - 9:00 PM', tags: ['Indian Groceries', 'Spices', 'Fresh Produce', 'Imported Goods'], studentDiscount: true },
      { name: 'India Bazaar', hours: '10:00 AM - 8:30 PM', tags: ['Indian Groceries', 'Spices', 'Snacks', 'Frozen Foods'], studentDiscount: false },
      { name: 'Subzi Mandi Fresh Market', hours: '8:00 AM - 9:00 PM', tags: ['Indian Groceries', 'Fresh Vegetables', 'Spices', 'Lentils'], studentDiscount: true },
      { name: 'Apna Bazaar', hours: '9:30 AM - 8:00 PM', tags: ['Indian Groceries', 'Ready-to-Eat', 'Spices', 'Rice'], studentDiscount: false },
    ],
  },
  Chinese: {
    restaurants: [
      { name: 'Sichuan House', avgMealPrice: 14, priceRange: '$', hours: '11:00 AM - 10:00 PM', tags: ['Chinese Food', 'Dine-in', 'Takeout'], studentDiscount: true, deliveryAvailable: true },
      { name: 'Din Tai Fung', avgMealPrice: 18, priceRange: '$$', hours: '11:00 AM - 9:30 PM', tags: ['Chinese Food', 'Dumplings', 'Dine-in'], studentDiscount: false, deliveryAvailable: false },
      { name: 'Xi\'an Famous Foods', avgMealPrice: 11, priceRange: '$', hours: '10:30 AM - 9:00 PM', tags: ['Chinese Food', 'Noodles', 'Takeout'], studentDiscount: true, deliveryAvailable: true },
      { name: 'Kung Fu Tea & Kitchen', avgMealPrice: 10, priceRange: '$', hours: '11:00 AM - 10:00 PM', tags: ['Chinese Food', 'Bubble Tea', 'Takeout'], studentDiscount: true, deliveryAvailable: true },
      { name: 'Hunan Garden', avgMealPrice: 13, priceRange: '$', hours: '11:30 AM - 10:00 PM', tags: ['Chinese Food', 'Dine-in', 'Delivery'], studentDiscount: false, deliveryAvailable: true },
      { name: 'Bao Bao House', avgMealPrice: 9, priceRange: '$', hours: '10:00 AM - 8:30 PM', tags: ['Chinese Food', 'Steamed Buns', 'Takeout'], studentDiscount: true, deliveryAvailable: false },
    ],
    groceries: [
      { name: '99 Ranch Market', hours: '8:00 AM - 10:00 PM', tags: ['Asian Groceries', 'Fresh Produce', 'Seafood', 'Imported Goods'], studentDiscount: false },
      { name: 'H Mart', hours: '8:00 AM - 10:00 PM', tags: ['Asian Groceries', 'Fresh Produce', 'Ready-to-Eat', 'Snacks'], studentDiscount: true },
      { name: 'Great Wall Supermarket', hours: '9:00 AM - 9:00 PM', tags: ['Chinese Groceries', 'Sauces', 'Noodles', 'Frozen Foods'], studentDiscount: false },
      { name: 'Asia Supermarket', hours: '9:00 AM - 8:30 PM', tags: ['Asian Groceries', 'Spices', 'Rice', 'Tea'], studentDiscount: true },
    ],
  },
  'South Korean': {
    restaurants: [
      { name: 'Kang Ho Dong Baekjeong', avgMealPrice: 22, priceRange: '$$', hours: '11:30 AM - 11:00 PM', tags: ['Korean Food', 'BBQ', 'Dine-in'], studentDiscount: false, deliveryAvailable: false },
      { name: 'BCD Tofu House', avgMealPrice: 14, priceRange: '$', hours: '24 Hours', tags: ['Korean Food', 'Tofu Stew', 'Dine-in'], studentDiscount: true, deliveryAvailable: false },
      { name: 'Bonchon Chicken', avgMealPrice: 13, priceRange: '$', hours: '11:00 AM - 10:00 PM', tags: ['Korean Food', 'Fried Chicken', 'Takeout'], studentDiscount: true, deliveryAvailable: true },
      { name: 'Seoul Garden', avgMealPrice: 16, priceRange: '$$', hours: '11:00 AM - 10:00 PM', tags: ['Korean Food', 'Bibimbap', 'Dine-in'], studentDiscount: false, deliveryAvailable: true },
      { name: 'Myung Dong Noodles', avgMealPrice: 11, priceRange: '$', hours: '10:30 AM - 9:30 PM', tags: ['Korean Food', 'Noodles', 'Takeout'], studentDiscount: true, deliveryAvailable: false },
    ],
    groceries: [
      { name: 'H Mart', hours: '8:00 AM - 10:00 PM', tags: ['Korean Groceries', 'Kimchi', 'Fresh Produce', 'Snacks'], studentDiscount: true },
      { name: 'Lotte Plaza Market', hours: '9:00 AM - 9:00 PM', tags: ['Korean Groceries', 'Frozen Foods', 'Ramen', 'Sauces'], studentDiscount: false },
      { name: 'Hana World Market', hours: '9:00 AM - 8:30 PM', tags: ['Korean Groceries', 'Banchan', 'Rice', 'Snacks'], studentDiscount: true },
    ],
  },
}

const FOOD_DEFAULT = {
  restaurants: [
    { name: 'Global Kitchen', avgMealPrice: 12, priceRange: '$', hours: '11:00 AM - 10:00 PM', tags: ['International Food', 'Dine-in', 'Takeout'], studentDiscount: true, deliveryAvailable: true },
    { name: 'Spice World Cafe', avgMealPrice: 10, priceRange: '$', hours: '10:00 AM - 9:00 PM', tags: ['International Food', 'Vegetarian Options', 'Takeout'], studentDiscount: true, deliveryAvailable: false },
    { name: 'Culture Kitchen', avgMealPrice: 15, priceRange: '$$', hours: '11:30 AM - 10:30 PM', tags: ['International Food', 'Dine-in', 'Delivery'], studentDiscount: false, deliveryAvailable: true },
    { name: 'Fusion Bites', avgMealPrice: 13, priceRange: '$', hours: '11:00 AM - 9:30 PM', tags: ['International Food', 'Fusion', 'Takeout'], studentDiscount: true, deliveryAvailable: true },
    { name: 'Homeland Grill', avgMealPrice: 14, priceRange: '$', hours: '12:00 PM - 10:00 PM', tags: ['International Food', 'Halal', 'Dine-in'], studentDiscount: false, deliveryAvailable: true },
  ],
  groceries: [
    { name: 'International Market', hours: '9:00 AM - 9:00 PM', tags: ['International Groceries', 'Spices', 'Fresh Produce'], studentDiscount: true },
    { name: 'World Foods Market', hours: '8:30 AM - 8:30 PM', tags: ['International Groceries', 'Imported Goods', 'Snacks'], studentDiscount: false },
    { name: 'Multi-Cultural Grocery', hours: '9:00 AM - 8:00 PM', tags: ['International Groceries', 'Frozen Foods', 'Rice', 'Spices'], studentDiscount: true },
  ],
}

const COMMUNITY_BY_NATIONALITY = {
  Indian: [
    { name: 'Indian Students Association (ISA)', type: 'Cultural Association', members: 420, description: 'The largest Indian student body on campus. We organize Diwali, Holi, cultural nights, and provide mentorship for new students arriving from India.', platform: 'WhatsApp', meetingFrequency: 'Weekly', events: [{ name: 'Diwali Night Celebration', date: 'Sat, Nov 1', time: '6:00 PM', location: 'Student Union Ballroom', attendees: 280 }, { name: 'Cricket Tournament', date: 'Sun, Nov 15', time: '9:00 AM', location: 'University Sports Field', attendees: 64 }] },
    { name: 'Desi Graduate Network', type: 'Professional Network', members: 185, description: 'A professional networking group for Indian graduate students. Resume reviews, mock interviews, career panels with alumni in tech, consulting, and finance.', platform: 'LinkedIn', meetingFrequency: 'Bi-weekly', events: [{ name: 'Resume Workshop', date: 'Wed, Oct 22', time: '7:00 PM', location: 'Career Center Room 201', attendees: 45 }, { name: 'Alumni Panel: Tech Careers', date: 'Sat, Nov 8', time: '2:00 PM', location: 'Engineering Auditorium', attendees: 120 }] },
    { name: 'Bollywood Dance Club', type: 'Cultural Club', members: 95, description: 'Learn and perform Bollywood and classical Indian dance. No experience needed. We perform at cultural shows and competitions throughout the year.', platform: 'Instagram', meetingFrequency: 'Weekly', events: [{ name: 'Fall Showcase Rehearsal', date: 'Thu, Oct 30', time: '6:00 PM', location: 'Dance Studio B', attendees: 40 }, { name: 'Bollywood Night', date: 'Fri, Nov 21', time: '8:00 PM', location: 'Campus Theater', attendees: 200 }] },
    { name: 'Indian Food & Cooking Circle', type: 'Social Group', members: 68, description: 'Weekly potlucks, cooking classes, and recipe sharing. Learn to cook regional Indian dishes and share meals with fellow students who miss home food.', platform: 'WhatsApp', meetingFrequency: 'Weekly', events: [{ name: 'South Indian Cooking Class', date: 'Sun, Oct 26', time: '4:00 PM', location: 'Community Kitchen', attendees: 25 }, { name: 'Diwali Potluck', date: 'Sat, Nov 1', time: '12:00 PM', location: 'Park Pavilion', attendees: 55 }] },
    { name: 'International Students Union', type: 'Student Organization', members: 850, description: 'The umbrella organization for all international students. Orientation programs, legal workshops on visa/CPT/OPT, social events, and advocacy.', platform: 'Discord', meetingFrequency: 'Monthly', events: [{ name: 'International Food Festival', date: 'Sat, Nov 8', time: '11:00 AM', location: 'University Quad', attendees: 500 }, { name: 'OPT/CPT Workshop', date: 'Tue, Nov 18', time: '5:00 PM', location: 'International Center', attendees: 150 }] },
    { name: 'Hindi Language Exchange', type: 'Social Group', members: 42, description: 'Practice Hindi with native speakers and teach English in return. Great for making cross-cultural friendships and improving language skills.', platform: 'Telegram', meetingFrequency: 'Weekly', events: [{ name: 'Conversation Hour', date: 'Wed, Oct 29', time: '5:30 PM', location: 'Library Room 305', attendees: 18 }] },
  ],
  Chinese: [
    { name: 'Chinese Students & Scholars Association (CSSA)', type: 'Cultural Association', members: 580, description: 'The official Chinese student organization. We host Mid-Autumn Festival, Chinese New Year gala, career fairs, and provide airport pickup for new students.', platform: 'WeChat', meetingFrequency: 'Weekly', events: [{ name: 'Mid-Autumn Festival', date: 'Sat, Sep 28', time: '6:00 PM', location: 'Student Union Ballroom', attendees: 350 }, { name: 'Career Fair: Chinese Companies', date: 'Fri, Oct 17', time: '10:00 AM', location: 'Convention Center', attendees: 200 }] },
    { name: 'Chinese Tech Professionals', type: 'Professional Network', members: 220, description: 'Networking group for Chinese students in tech. LeetCode study groups, mock interviews, referral network with alumni at FAANG and startups.', platform: 'WeChat', meetingFrequency: 'Weekly', events: [{ name: 'LeetCode Contest Night', date: 'Sun, Oct 26', time: '7:00 PM', location: 'CS Building Lab 3', attendees: 40 }, { name: 'Mock Interview Marathon', date: 'Sat, Nov 8', time: '10:00 AM', location: 'Career Center', attendees: 60 }] },
    { name: 'Chinese Cultural Arts Club', type: 'Cultural Club', members: 75, description: 'Calligraphy, traditional music, martial arts, and cultural performances. Open to all backgrounds interested in Chinese culture.', platform: 'Discord', meetingFrequency: 'Weekly', events: [{ name: 'Calligraphy Workshop', date: 'Sat, Nov 1', time: '2:00 PM', location: 'Art Center Room 102', attendees: 30 }] },
    { name: 'International Students Union', type: 'Student Organization', members: 850, description: 'The umbrella organization for all international students. Orientation programs, legal workshops, social events, and advocacy.', platform: 'Discord', meetingFrequency: 'Monthly', events: [{ name: 'International Food Festival', date: 'Sat, Nov 8', time: '11:00 AM', location: 'University Quad', attendees: 500 }] },
  ],
  'South Korean': [
    { name: 'Korean Student Association (KSA)', type: 'Cultural Association', members: 310, description: 'The main Korean student body. We organize Korean culture night, Chuseok celebrations, K-pop dance events, and welcome orientation for new Korean students.', platform: 'KakaoTalk', meetingFrequency: 'Weekly', events: [{ name: 'Korean Culture Night', date: 'Fri, Nov 7', time: '7:00 PM', location: 'Student Union Theater', attendees: 250 }, { name: 'Chuseok Celebration', date: 'Sat, Sep 27', time: '5:00 PM', location: 'Community Center', attendees: 180 }] },
    { name: 'K-Pop Dance Crew', type: 'Cultural Club', members: 65, description: 'Learn K-pop choreography and perform at campus events. All skill levels welcome. We cover the latest BTS, BLACKPINK, and NewJeans dances.', platform: 'Instagram', meetingFrequency: 'Weekly', events: [{ name: 'Fall Dance Cover Showcase', date: 'Sat, Nov 15', time: '7:00 PM', location: 'Campus Theater', attendees: 180 }] },
    { name: 'Korean Language Exchange', type: 'Social Group', members: 55, description: 'Practice Korean and English with native speakers. Great for improving conversational skills and making friends across cultures.', platform: 'Discord', meetingFrequency: 'Weekly', events: [{ name: 'Conversation Hour', date: 'Thu, Oct 30', time: '6:00 PM', location: 'Library Room 210', attendees: 22 }] },
    { name: 'International Students Union', type: 'Student Organization', members: 850, description: 'The umbrella organization for all international students. Orientation programs, legal workshops, social events, and advocacy.', platform: 'Discord', meetingFrequency: 'Monthly', events: [{ name: 'International Food Festival', date: 'Sat, Nov 8', time: '11:00 AM', location: 'University Quad', attendees: 500 }] },
  ],
}

const COMMUNITY_DEFAULT = [
  { name: 'International Students Association', type: 'Cultural Association', members: 380, description: 'Connect with students from your home country and around the world. Cultural events, mentorship, and a welcoming community for all international students.', platform: 'WhatsApp', meetingFrequency: 'Weekly', events: [{ name: 'Welcome Mixer', date: 'Fri, Oct 24', time: '6:00 PM', location: 'Student Union Lounge', attendees: 120 }, { name: 'Cultural Showcase', date: 'Sat, Nov 15', time: '5:00 PM', location: 'Campus Theater', attendees: 250 }] },
  { name: 'Global Professionals Network', type: 'Professional Network', members: 165, description: 'Career development for international students. Resume workshops, mock interviews, networking events with alumni, and job search strategies.', platform: 'LinkedIn', meetingFrequency: 'Bi-weekly', events: [{ name: 'Networking Mixer', date: 'Wed, Nov 5', time: '7:00 PM', location: 'Career Center', attendees: 60 }] },
  { name: 'International Cultural Club', type: 'Cultural Club', members: 90, description: 'Celebrate diversity through art, music, dance, and food. Open to everyone interested in learning about different cultures.', platform: 'Instagram', meetingFrequency: 'Weekly', events: [{ name: 'World Music Night', date: 'Fri, Nov 7', time: '7:30 PM', location: 'Arts Center', attendees: 80 }] },
  { name: 'International Students Union', type: 'Student Organization', members: 850, description: 'The umbrella organization for all international students. Orientation, legal workshops on visa/work permits, social events, and advocacy.', platform: 'Discord', meetingFrequency: 'Monthly', events: [{ name: 'International Food Festival', date: 'Sat, Nov 8', time: '11:00 AM', location: 'University Quad', attendees: 500 }, { name: 'Visa & Work Rights Workshop', date: 'Tue, Nov 18', time: '5:00 PM', location: 'International Center', attendees: 150 }] },
  { name: 'Language Exchange Circle', type: 'Social Group', members: 52, description: 'Practice languages with native speakers from around the world. Improve your English and teach your mother tongue in a fun, relaxed setting.', platform: 'Telegram', meetingFrequency: 'Weekly', events: [{ name: 'Conversation Hour', date: 'Wed, Oct 29', time: '5:30 PM', location: 'Library Room 305', attendees: 20 }] },
  { name: 'Newcomers Support Group', type: 'Community Group', members: 130, description: 'Specifically for students in their first semester. Get help with housing, banking, phone plans, groceries, and making friends. No question is too small.', platform: 'WhatsApp', meetingFrequency: 'Weekly', events: [{ name: 'City Orientation Walk', date: 'Sat, Oct 25', time: '10:00 AM', location: 'Main Campus Gate', attendees: 35 }, { name: 'Potluck Dinner', date: 'Sun, Nov 2', time: '5:00 PM', location: 'Community Kitchen', attendees: 40 }] },
]

const SPORTS_BY_CITY = {
  Austin: [
    { name: 'Austin Cricket League', sport: 'Cricket', level: 'All Levels', address: 'Garrison Park, 6001 Manchaca Rd, Austin, TX', distance: '4.2', fee: 'Free for students', schedule: 'Sat/Sun 8:00 AM', members: 120, equipmentProvided: true, events: [{ name: 'Fall Tournament', date: 'Sat, Nov 8', participants: 48 }, { name: 'Practice Match', date: 'Sun, Oct 26', participants: 24 }] },
    { name: 'UT Intramural Soccer', sport: 'Soccer', level: 'Recreational', address: 'Whitaker Fields, UT Austin', distance: '0.5', fee: 'Free for students', schedule: 'Mon/Wed/Fri 5:00 PM', members: 85, equipmentProvided: true, events: [{ name: 'Intramural League Game', date: 'Wed, Oct 29', participants: 22 }] },
    { name: 'Austin Badminton Club', sport: 'Badminton', level: 'All Levels', address: 'Gregory Gym, 2101 Speedway, Austin, TX', distance: '0.3', fee: '$5/session', schedule: 'Tue/Thu 7:00 PM', members: 65, equipmentProvided: true, events: [{ name: 'Doubles Tournament', date: 'Sat, Nov 15', participants: 32 }] },
    { name: 'Longhorn Basketball Pickup', sport: 'Basketball', level: 'Recreational', address: 'RecSports Center, UT Austin', distance: '0.4', fee: 'Free for students', schedule: 'Daily 6:00 PM', members: 150, equipmentProvided: true, events: [{ name: '3v3 Tournament', date: 'Sat, Nov 1', participants: 36 }] },
    { name: 'Austin Tennis Center', sport: 'Tennis', level: 'Beginner Friendly', address: 'Penick-Allison Tennis Center, UT Austin', distance: '0.6', fee: 'Free for students', schedule: 'Mon/Wed 4:00 PM', members: 45, equipmentProvided: false, events: [{ name: 'Beginner Clinic', date: 'Sat, Oct 25', participants: 16 }] },
    { name: 'Town Lake Running Group', sport: 'Running', level: 'All Levels', address: 'Lady Bird Lake Trail, Austin, TX', distance: '1.8', fee: 'Free', schedule: 'Tue/Thu/Sat 6:30 AM', members: 90, equipmentProvided: false, events: [{ name: 'Austin 5K Prep Run', date: 'Sat, Nov 8', participants: 40 }] },
    { name: 'UT Table Tennis Club', sport: 'Table Tennis', level: 'All Levels', address: 'Gregory Gym, UT Austin', distance: '0.3', fee: 'Free for students', schedule: 'Mon/Wed/Fri 6:00 PM', members: 55, equipmentProvided: true, events: [{ name: 'Singles Championship', date: 'Sat, Nov 22', participants: 24 }] },
    { name: 'Volleyball at Zilker', sport: 'Volleyball', level: 'Recreational', address: 'Zilker Park Sand Courts, Austin, TX', distance: '3.5', fee: 'Free', schedule: 'Weekends 10:00 AM', members: 70, equipmentProvided: true, events: [{ name: 'Beach Volleyball Tourney', date: 'Sun, Nov 2', participants: 28 }] },
    { name: 'UT Yoga & Wellness', sport: 'Yoga', level: 'Beginner Friendly', address: 'RecSports Center, UT Austin', distance: '0.4', fee: 'Free for students', schedule: 'Tue/Thu 7:30 AM', members: 60, equipmentProvided: true, events: [{ name: 'Sunrise Yoga Session', date: 'Sat, Oct 25', participants: 20 }] },
    { name: 'Gregory Gym Swimming', sport: 'Swimming', level: 'All Levels', address: 'Gregory Gym Pool, UT Austin', distance: '0.3', fee: 'Free for students', schedule: 'Daily 6:00 AM - 9:00 PM', members: 40, equipmentProvided: false, events: [{ name: 'Lap Swim Challenge', date: 'Fri, Nov 14', participants: 15 }] },
  ],
}

const SPORTS_DEFAULT = [
  { name: 'Campus Cricket Club', sport: 'Cricket', level: 'All Levels', address: 'University Sports Field', distance: '0.8', fee: 'Free for students', schedule: 'Sat/Sun 9:00 AM', members: 85, equipmentProvided: true, events: [{ name: 'Inter-University Tournament', date: 'Sat, Nov 8', participants: 48 }, { name: 'Practice Session', date: 'Sun, Oct 26', participants: 20 }] },
  { name: 'Intramural Soccer League', sport: 'Soccer', level: 'Recreational', address: 'Recreation Center Fields', distance: '0.5', fee: 'Free for students', schedule: 'Mon/Wed/Fri 5:00 PM', members: 110, equipmentProvided: true, events: [{ name: 'League Match Day', date: 'Wed, Oct 29', participants: 22 }] },
  { name: 'Campus Badminton Club', sport: 'Badminton', level: 'All Levels', address: 'University Gym Court 3', distance: '0.3', fee: '$5/session', schedule: 'Tue/Thu 7:00 PM', members: 55, equipmentProvided: true, events: [{ name: 'Doubles Tournament', date: 'Sat, Nov 15', participants: 28 }] },
  { name: 'Basketball Pickup Games', sport: 'Basketball', level: 'Recreational', address: 'Recreation Center Gym', distance: '0.4', fee: 'Free for students', schedule: 'Daily 6:00 PM', members: 130, equipmentProvided: true, events: [{ name: '3v3 Tournament', date: 'Sat, Nov 1', participants: 36 }] },
  { name: 'Tennis Club', sport: 'Tennis', level: 'Beginner Friendly', address: 'University Tennis Courts', distance: '0.6', fee: 'Free for students', schedule: 'Mon/Wed 4:00 PM', members: 40, equipmentProvided: false, events: [{ name: 'Beginner Clinic', date: 'Sat, Oct 25', participants: 14 }] },
  { name: 'Table Tennis Club', sport: 'Table Tennis', level: 'All Levels', address: 'Student Center Game Room', distance: '0.2', fee: 'Free for students', schedule: 'Mon/Wed/Fri 6:00 PM', members: 50, equipmentProvided: true, events: [{ name: 'Singles Championship', date: 'Sat, Nov 22', participants: 20 }] },
  { name: 'Morning Running Group', sport: 'Running', level: 'All Levels', address: 'Campus Main Trail', distance: '0.1', fee: 'Free', schedule: 'Tue/Thu/Sat 6:30 AM', members: 75, equipmentProvided: false, events: [{ name: '5K Campus Run', date: 'Sat, Nov 8', participants: 35 }] },
  { name: 'Volleyball Club', sport: 'Volleyball', level: 'Recreational', address: 'Recreation Center Courts', distance: '0.4', fee: 'Free for students', schedule: 'Weekends 10:00 AM', members: 60, equipmentProvided: true, events: [{ name: 'Friendly Tournament', date: 'Sun, Nov 2', participants: 24 }] },
  { name: 'Yoga & Mindfulness', sport: 'Yoga', level: 'Beginner Friendly', address: 'Wellness Center Studio', distance: '0.3', fee: 'Free for students', schedule: 'Tue/Thu 7:30 AM', members: 45, equipmentProvided: true, events: [{ name: 'Sunrise Yoga', date: 'Sat, Oct 25', participants: 18 }] },
  { name: 'Swimming Club', sport: 'Swimming', level: 'All Levels', address: 'University Aquatic Center', distance: '0.5', fee: 'Free for students', schedule: 'Daily 6:00 AM - 9:00 PM', members: 35, equipmentProvided: false, events: [{ name: 'Lap Swim Challenge', date: 'Fri, Nov 14', participants: 12 }] },
]

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

function makeReviews(type, seed) {
  const texts = REVIEW_TEXTS[type] || REVIEW_TEXTS.housing
  const names = ['Sarah Johnson', 'James Wang', 'Maria Garcia', 'Chen Wei', 'Priya Patel', 'Ahmed Hassan', 'Lisa Kim', 'David Brown']
  const ratings = [4.5, 4.0, 4.8, 3.9, 4.2, 4.6, 4.3, 4.1]
  const helpfuls = [23, 12, 38, 8, 17, 31, 14, 9]
  return [0, 1, 2].map(i => {
    const idx = (seed + i) % texts.length
    return {
      id: `rev-${seed}-${i}`,
      author: names[(seed + i) % names.length],
      rating: ratings[(seed + i) % ratings.length],
      text: texts[idx],
      date: ['Jan 15, 2026', 'Dec 3, 2025', 'Nov 20, 2025', 'Oct 8, 2025', 'Sep 22, 2025', 'Feb 1, 2026', 'Aug 14, 2025', 'Jul 5, 2025'][(seed + i) % 8],
      helpful: helpfuls[(seed + i) % helpfuls.length],
    }
  })
}

export function generateHousingData(collegeName, city) {
  const cityData = HOUSING_BY_CITY[city] || HOUSING_DEFAULT
  return cityData.map((h, i) => ({
    id: `housing-${i}`,
    ...h,
    address: h.address.includes(city) ? h.address : `${h.address}, ${city}`,
    priceUnit: '/month',
    image: HOUSING_IMAGES[i % HOUSING_IMAGES.length],
    reviews: makeReviews('housing', i),
    nearCollege: collegeName,
  }))
}

export function generateFoodData(nationality, city) {
  const data = FOOD_BY_NATIONALITY[nationality] || FOOD_DEFAULT
  const restaurants = data.restaurants.map((r, i) => ({
    id: `food-rest-${i}`,
    ...r,
    type: 'restaurant',
    cuisine: nationality || 'International',
    address: `${1200 + i * 311} ${['Main St', 'University Ave', 'Market St', 'Commerce Blvd', 'Food Court Rd', 'Campus Dr'][i % 6]}, ${city}`,
    distance: (0.4 + i * 0.5).toFixed(1),
    rating: [4.5, 4.2, 4.7, 4.0, 4.3, 4.6][i % 6],
    reviewCount: [234, 156, 312, 89, 178, 267][i % 6],
    image: FOOD_IMAGES[i % FOOD_IMAGES.length],
    contact: { name: ['Raj Kumar', 'Wei Chen', 'Min-Jun Park', 'Linh Nguyen', 'Yuki Tanaka', 'Carlos Ruiz'][i % 6], phone: `(555) 200-${3000 + i}` },
    reviews: makeReviews('food', i),
  }))

  const groceries = data.groceries.map((g, i) => ({
    id: `food-groc-${i}`,
    ...g,
    type: 'grocery',
    cuisine: nationality || 'International',
    address: `${2500 + i * 400} ${['Commerce St', 'Market Blvd', 'Trade Ave', 'Shop Lane'][i % 4]}, ${city}`,
    distance: (1.0 + i * 0.7).toFixed(1),
    priceRange: '$',
    rating: [4.4, 4.1, 4.6, 4.2][i % 4],
    reviewCount: [198, 87, 256, 134][i % 4],
    image: GROCERY_IMAGES[i % GROCERY_IMAGES.length],
    contact: { name: ['Anita Sharma', 'David Kim', 'Rosa Martinez', 'Fatima Ali'][i % 4], phone: `(555) 300-${4000 + i}` },
    reviews: makeReviews('food', i + 10),
  }))

  return [...restaurants, ...groceries]
}

export function generateCommunityData(nationality, city) {
  const groups = COMMUNITY_BY_NATIONALITY[nationality] || COMMUNITY_DEFAULT
  return groups.map((g, i) => ({
    id: `comm-${i}`,
    name: g.name,
    type: g.type,
    members: g.members,
    description: g.description,
    image: COMMUNITY_IMAGES[i % COMMUNITY_IMAGES.length],
    rating: [4.7, 4.4, 4.8, 4.5, 4.3, 4.6][i % 6],
    reviewCount: [189, 76, 234, 145, 98, 167][i % 6],
    contact: {
      name: ['Arjun Mehta', 'Lisa Chen', 'Min-Jun Kim', 'Sarah Johnson', 'Ahmed Hassan', 'Maria Santos'][i % 6],
      phone: `(555) 400-${5000 + i}`,
      email: g.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '@groups.org',
    },
    platform: g.platform,
    meetingFrequency: g.meetingFrequency,
    upcomingEvents: g.events.map((e, j) => ({ id: `event-${i}-${j}`, ...e })),
    reviews: makeReviews('community', i),
    joinLink: '#',
  }))
}

export function generateSportsData(city) {
  const sports = SPORTS_BY_CITY[city] || SPORTS_DEFAULT
  return sports.map((s, i) => ({
    id: `sport-${i}`,
    ...s,
    address: s.address.includes(city) ? s.address : `${s.address}, ${city}`,
    rating: [4.6, 4.3, 4.5, 4.7, 4.1, 4.4, 4.2, 4.8, 4.0, 4.3][i % 10],
    reviewCount: [167, 98, 134, 212, 56, 89, 145, 78, 112, 67][i % 10],
    image: SPORTS_IMAGES[i % SPORTS_IMAGES.length],
    contact: {
      name: ['Coach Mike Davis', 'Ravi Sharma', 'Jin Park', 'Alex Torres', 'Sam Wilson', 'Priya Nair', 'Tom Chen', 'Maria Lopez', 'Yuki Sato', 'Omar Khan'][i % 10],
      phone: `(555) 500-${6000 + i}`,
      email: `${s.sport.toLowerCase().replace(/\s/g, '')}club@campus.edu`,
    },
    upcomingEvents: s.events.map((e, j) => ({ id: `sportevent-${i}-${j}`, ...e })),
    reviews: makeReviews('sports', i),
  }))
}
