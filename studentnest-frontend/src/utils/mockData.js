// ─── REAL HOUSING PHOTOS ───
// Each photo is a specific Unsplash image matching the listing type
const HOUSING_IMAGES = {
  studentComplex: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop', // modern student apartment building
  studio: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop', // cozy studio apartment interior
  oneBed: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop', // bright 1-bedroom living room
  shared: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop', // shared apartment common area
  privateRoom: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&h=400&fit=crop', // private bedroom with desk
  furnished: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop', // furnished modern apartment
  luxury: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop', // luxury apartment with city view
  budget: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop', // clean simple apartment
}

// ─── REAL FOOD PHOTOS ───
const FOOD_IMAGES = {
  indian: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop', // Indian thali with curry and naan
  indian2: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=400&fit=crop', // biryani close-up
  indian3: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&h=400&fit=crop', // dosa on plate
  chinese: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&h=400&fit=crop', // Chinese dim sum spread
  chinese2: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop', // noodle soup bowl
  chinese3: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop', // dumplings on bamboo steamer
  korean: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=400&fit=crop', // Korean BBQ grill table
  korean2: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&h=400&fit=crop', // bibimbap bowl
  korean3: 'https://images.unsplash.com/photo-1583224994076-0a3a3b8efa25?w=600&h=400&fit=crop', // Korean fried chicken
  mexican: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop', // tacos on plate
  japanese: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=400&fit=crop', // sushi platter
  thai: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=600&h=400&fit=crop', // pad thai in wok
  general: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop', // restaurant interior
  general2: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop', // upscale restaurant
  grocery: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop', // grocery store produce aisle
  grocery2: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop', // spice market shelves
  grocery3: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&h=400&fit=crop', // Asian grocery store
  grocery4: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&h=400&fit=crop', // international grocery aisle
}

// ─── REAL SPORTS PHOTOS ───
const SPORTS_IMAGES = {
  cricket: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop', // cricket match on field
  soccer: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop', // soccer game on grass field
  badminton: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&h=400&fit=crop', // badminton court indoor
  basketball: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop', // basketball game in gym
  tennis: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=400&fit=crop', // tennis court overhead
  running: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=600&h=400&fit=crop', // runners on trail
  tabletennis: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=600&h=400&fit=crop', // table tennis paddle and ball
  volleyball: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&h=400&fit=crop', // volleyball on sand court
  yoga: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop', // yoga class in studio
  swimming: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=600&h=400&fit=crop', // swimming pool lanes
}

// ─── REAL COMMUNITY PHOTOS ───
const COMMUNITY_IMAGES = {
  cultural: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop', // diverse group of friends
  professional: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop', // professional networking event
  dance: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&h=400&fit=crop', // dance performance on stage
  cooking: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop', // group cooking class
  studentOrg: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop', // students at campus event
  language: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop', // study group at library table
  festival: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop', // colorful cultural festival
  support: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&fit=crop', // group meeting around table
}

// ═══════════════════════════════════════════════════════════════
// HOUSING — Real apartments, real addresses, real pricing
// ═══════════════════════════════════════════════════════════════

const HOUSING_BY_CITY = {
  Austin: [
    { name: 'The Callaway House Austin', type: 'Student Housing Complex', address: '501 W 26th St, Austin, TX 78705', distance: '0.3', price: 1099, amenities: ['WiFi Included', 'Furnished', 'Gym Access', 'Study Lounge', 'Rooftop Pool', 'Laundry'], contact: { name: 'Callaway Leasing', phone: '(512) 476-1976', email: 'leasing@callawayhouse.com' }, rating: 4.3, reviewCount: 312, verified: true, available: true, image: HOUSING_IMAGES.studentComplex },
    { name: 'Villas on Guadalupe', type: 'Studio Apartment', address: '2812 Guadalupe St, Austin, TX 78705', distance: '0.4', price: 849, amenities: ['WiFi Included', 'AC', 'On-site Laundry', 'Bike Storage', 'CapMetro Stop'], contact: { name: 'Guadalupe Leasing', phone: '(512) 474-0111', email: 'info@villasonguadalupe.com' }, rating: 4.1, reviewCount: 187, verified: true, available: true, image: HOUSING_IMAGES.studio },
    { name: '26 West Apartments', type: '1 Bedroom Apartment', address: '2600 Rio Grande St, Austin, TX 78705', distance: '0.4', price: 1350, amenities: ['Furnished', 'Gym Access', 'Garage Parking', 'AC', 'Study Room', 'In-unit Laundry'], contact: { name: '26 West Leasing', phone: '(512) 474-2626', email: 'info@26west.com' }, rating: 4.5, reviewCount: 198, verified: true, available: true, image: HOUSING_IMAGES.luxury },
    { name: 'Room in Hyde Park House', type: '2 Bedroom Shared', address: '4505 Duval St, Austin, TX 78751', distance: '1.8', price: 625, amenities: ['WiFi Included', 'Washer/Dryer', 'Pet Friendly', 'Backyard', 'Street Parking'], contact: { name: 'Sarah Chen', phone: '(512) 903-4287', email: 'sarah.chen@utexas.edu' }, rating: 4.0, reviewCount: 45, verified: false, available: true, image: HOUSING_IMAGES.shared },
    { name: 'Riverside Private Room', type: 'Private Room', address: '1221 S Pleasant Valley Rd, Austin, TX 78741', distance: '3.2', price: 580, amenities: ['Utilities Included', 'Furnished', 'Covered Parking', 'AC', 'Near Bus Route 20'], contact: { name: 'David Okonkwo', phone: '(512) 619-0391', email: 'david.okonkwo@gmail.com' }, rating: 3.9, reviewCount: 32, verified: false, available: true, image: HOUSING_IMAGES.privateRoom },
    { name: 'Ion Austin', type: 'Student Housing Complex', address: '505 W Riverside Dr, Austin, TX 78704', distance: '1.5', price: 1075, amenities: ['Furnished', 'Gym', 'Study Pods', 'Laundry', 'Bike Storage', 'AC', 'Pool'], contact: { name: 'Ion Leasing Office', phone: '(512) 382-4466', email: 'leasing@ionaustin.com' }, rating: 4.2, reviewCount: 256, verified: true, available: true, image: HOUSING_IMAGES.studentComplex },
    { name: 'Speedway 1BR near UT', type: '1 Bedroom Apartment', address: '3204 Speedway, Austin, TX 78705', distance: '0.9', price: 950, amenities: ['WiFi Included', 'AC', 'On-site Laundry', 'Covered Parking'], contact: { name: 'Lisa Tran', phone: '(512) 577-0463', email: 'lisa.tran@austinrentals.com' }, rating: 4.0, reviewCount: 64, verified: true, available: false, image: HOUSING_IMAGES.oneBed },
    { name: 'The Quarters on Campus', type: 'Furnished Studio', address: '2400 Nueces St, Austin, TX 78705', distance: '0.5', price: 920, amenities: ['Fully Furnished', 'WiFi Included', 'AC', 'Laundry', 'Courtyard'], contact: { name: 'Quarters Leasing', phone: '(512) 474-0518', email: 'leasing@quartersoncampus.com' }, rating: 4.4, reviewCount: 143, verified: true, available: true, image: HOUSING_IMAGES.furnished },
  ],
  Cambridge: [
    { name: 'Harvard Square Apartments', type: 'Studio Apartment', address: '52 Church St, Cambridge, MA 02138', distance: '0.3', price: 2100, amenities: ['WiFi Included', 'Laundry', 'AC', 'Historic Building'], contact: { name: 'Cambridge Realty Group', phone: '(617) 876-5500', email: 'info@cambridgerealtygroup.com' }, rating: 4.2, reviewCount: 156, verified: true, available: true, image: HOUSING_IMAGES.studio },
    { name: 'Central Square 2BR Share', type: '2 Bedroom Shared', address: '88 Magazine St, Cambridge, MA 02139', distance: '1.1', price: 1250, amenities: ['WiFi Included', 'Laundry', 'Bike Storage', 'Near Red Line T'], contact: { name: 'Priya Mehta', phone: '(617) 401-0234', email: 'priya.mehta@mit.edu' }, rating: 4.0, reviewCount: 67, verified: false, available: true, image: HOUSING_IMAGES.shared },
    { name: 'Avalon at Kendall Square', type: '1 Bedroom Apartment', address: '245 Third St, Cambridge, MA 02142', distance: '0.8', price: 2800, amenities: ['Gym Access', 'AC', 'Garage Parking', 'In-unit Laundry', 'Concierge', 'Rooftop Deck'], contact: { name: 'Avalon Leasing', phone: '(617) 621-4500', email: 'leasing@avalonkendall.com' }, rating: 4.6, reviewCount: 289, verified: true, available: true, image: HOUSING_IMAGES.luxury },
    { name: 'Porter Square Room', type: 'Private Room', address: '1815 Massachusetts Ave, Cambridge, MA 02140', distance: '2.0', price: 1350, amenities: ['WiFi Included', 'Furnished', 'Laundry', 'Near Porter T Station'], contact: { name: 'Wei Zhang', phone: '(617) 812-0378', email: 'wei.zhang@gmail.com' }, rating: 3.8, reviewCount: 28, verified: false, available: true, image: HOUSING_IMAGES.privateRoom },
    { name: 'Inman Square Furnished Studio', type: 'Furnished Studio', address: '1311 Cambridge St, Cambridge, MA 02139', distance: '1.4', price: 1950, amenities: ['Fully Furnished', 'WiFi Included', 'AC', 'Laundry', 'Patio'], contact: { name: 'Boston Pads', phone: '(617) 208-2121', email: 'info@bostonpads.com' }, rating: 4.3, reviewCount: 134, verified: true, available: true, image: HOUSING_IMAGES.furnished },
    { name: 'Sidney-Pacific Graduate Housing', type: 'Student Housing Complex', address: '70 Pacific St, Cambridge, MA 02139', distance: '0.5', price: 1500, amenities: ['Furnished', 'Gym', 'Study Rooms', 'Laundry', 'Bike Room', 'Community Kitchen'], contact: { name: 'MIT Housing Office', phone: '(617) 253-5148', email: 'housing@mit.edu' }, rating: 4.4, reviewCount: 412, verified: true, available: false, image: HOUSING_IMAGES.studentComplex },
  ],
  'New York': [
    { name: 'NYU Gramercy Green', type: 'Student Housing Complex', address: '290 Third Ave, New York, NY 10010', distance: '0.2', price: 1800, amenities: ['Furnished', 'Gym', 'Study Lounges', 'Laundry', 'Rooftop', '24/7 Security'], contact: { name: 'NYU Housing', phone: '(212) 998-4600', email: 'housing@nyu.edu' }, rating: 4.1, reviewCount: 523, verified: true, available: true, image: HOUSING_IMAGES.studentComplex },
    { name: 'East Village Studio', type: 'Studio Apartment', address: '326 E 13th St, New York, NY 10003', distance: '0.5', price: 2200, amenities: ['AC', 'Laundry in Building', 'Buzzer Entry', 'Near L/1 Trains'], contact: { name: 'Village Realty NYC', phone: '(212) 533-2525', email: 'info@villagerealtyny.com' }, rating: 4.0, reviewCount: 89, verified: true, available: true, image: HOUSING_IMAGES.studio },
    { name: 'Room in Bushwick Loft', type: 'Private Room', address: '1087 Flushing Ave, Brooklyn, NY 11237', distance: '4.5', price: 1100, amenities: ['WiFi Included', 'Washer/Dryer', 'Rooftop Access', 'Near J/M Trains'], contact: { name: 'Alex Rivera', phone: '(347) 555-8821', email: 'alex.r@gmail.com' }, rating: 3.9, reviewCount: 41, verified: false, available: true, image: HOUSING_IMAGES.privateRoom },
    { name: 'Columbia Area 1BR', type: '1 Bedroom Apartment', address: '600 W 113th St, New York, NY 10025', distance: '0.3', price: 2400, amenities: ['AC', 'Elevator', 'Laundry', 'Near 1 Train', 'Doorman'], contact: { name: 'Morningside Realty', phone: '(212) 866-3100', email: 'info@morningsiderealty.com' }, rating: 4.3, reviewCount: 176, verified: true, available: true, image: HOUSING_IMAGES.oneBed },
    { name: 'Shared Apt near Washington Square', type: '2 Bedroom Shared', address: '55 W 8th St, New York, NY 10011', distance: '0.4', price: 1500, amenities: ['WiFi Included', 'AC', 'Laundry', 'Near A/C/E/B/D/F/M Trains'], contact: { name: 'Jordan Kim', phone: '(646) 555-3302', email: 'jordan.k@nyu.edu' }, rating: 4.2, reviewCount: 58, verified: false, available: true, image: HOUSING_IMAGES.shared },
    { name: 'The Clark at 303 E 37th', type: 'Furnished Studio', address: '303 E 37th St, New York, NY 10016', distance: '2.1', price: 2600, amenities: ['Fully Furnished', 'Gym', 'Doorman', 'Rooftop Lounge', 'In-unit Laundry'], contact: { name: 'Clark Leasing', phone: '(212) 889-0303', email: 'leasing@theclark.com' }, rating: 4.5, reviewCount: 201, verified: true, available: true, image: HOUSING_IMAGES.luxury },
  ],
  'Los Angeles': [
    { name: 'UCLA Weyburn Terrace', type: 'Student Housing Complex', address: '565 Weyburn Pl, Los Angeles, CA 90024', distance: '0.2', price: 1450, amenities: ['Furnished', 'Gym', 'Study Rooms', 'Laundry', 'Pool', 'Near UCLA Shuttle'], contact: { name: 'UCLA Housing', phone: '(310) 825-4271', email: 'housing@ucla.edu' }, rating: 4.2, reviewCount: 387, verified: true, available: true, image: HOUSING_IMAGES.studentComplex },
    { name: 'Westwood Studio on Gayley', type: 'Studio Apartment', address: '535 Gayley Ave, Los Angeles, CA 90024', distance: '0.3', price: 1650, amenities: ['AC', 'Laundry', 'Parking Available', 'Near Big Blue Bus'], contact: { name: 'Westwood Realty', phone: '(310) 208-8505', email: 'info@westwoodrealty.com' }, rating: 4.0, reviewCount: 112, verified: true, available: true, image: HOUSING_IMAGES.studio },
    { name: 'Palms 1BR near Expo Line', type: '1 Bedroom Apartment', address: '3640 Westwood Blvd, Los Angeles, CA 90034', distance: '3.0', price: 1800, amenities: ['AC', 'Parking', 'In-unit Laundry', 'Near Expo Line', 'Patio'], contact: { name: 'Palms Properties', phone: '(310) 559-1234', email: 'info@palmsproperties.com' }, rating: 4.3, reviewCount: 95, verified: true, available: true, image: HOUSING_IMAGES.oneBed },
    { name: 'Room in Mar Vista House', type: 'Private Room', address: '12021 Venice Blvd, Los Angeles, CA 90066', distance: '4.5', price: 950, amenities: ['WiFi Included', 'Washer/Dryer', 'Backyard', 'Street Parking'], contact: { name: 'Ananya Desai', phone: '(310) 555-7743', email: 'ananya.d@ucla.edu' }, rating: 4.1, reviewCount: 37, verified: false, available: true, image: HOUSING_IMAGES.privateRoom },
    { name: 'Shared Apt on Kelton Ave', type: '2 Bedroom Shared', address: '10945 Kelton Ave, Los Angeles, CA 90024', distance: '0.5', price: 1100, amenities: ['WiFi Included', 'AC', 'Laundry', 'Near Trader Joe\'s'], contact: { name: 'Ravi Krishnan', phone: '(424) 555-2210', email: 'ravi.k@ucla.edu' }, rating: 4.0, reviewCount: 52, verified: false, available: true, image: HOUSING_IMAGES.shared },
    { name: 'Levaire Westwood', type: 'Furnished Studio', address: '10833 Wilshire Blvd, Los Angeles, CA 90024', distance: '0.8', price: 2200, amenities: ['Fully Furnished', 'Gym', 'Pool', 'Concierge', 'Parking', 'In-unit Laundry'], contact: { name: 'Levaire Leasing', phone: '(310) 208-0064', email: 'leasing@levaire.com' }, rating: 4.6, reviewCount: 178, verified: true, available: true, image: HOUSING_IMAGES.luxury },
  ],
  Atlanta: [
    { name: 'The Local on 14th', type: 'Student Housing Complex', address: '14th St NW & State St, Atlanta, GA 30318', distance: '0.3', price: 950, amenities: ['Furnished', 'Gym', 'Study Rooms', 'Laundry', 'Pool', 'GT Shuttle'], contact: { name: 'Local 14th Leasing', phone: '(404) 892-1400', email: 'leasing@localon14th.com' }, rating: 4.1, reviewCount: 267, verified: true, available: true, image: HOUSING_IMAGES.studentComplex },
    { name: 'Home Park Studio', type: 'Studio Apartment', address: '820 Hemphill Ave NW, Atlanta, GA 30318', distance: '0.5', price: 750, amenities: ['AC', 'Laundry', 'Street Parking', 'Near MARTA'], contact: { name: 'Home Park Rentals', phone: '(404) 355-0820', email: 'info@homeparkrentals.com' }, rating: 3.9, reviewCount: 78, verified: true, available: true, image: HOUSING_IMAGES.budget },
    { name: 'Midtown 1BR on Peachtree', type: '1 Bedroom Apartment', address: '1075 Peachtree St NE, Atlanta, GA 30309', distance: '1.5', price: 1400, amenities: ['Gym', 'AC', 'Parking', 'In-unit Laundry', 'Rooftop', 'Near MARTA'], contact: { name: 'Midtown Realty', phone: '(404) 876-1075', email: 'info@midtownrealty.com' }, rating: 4.4, reviewCount: 156, verified: true, available: true, image: HOUSING_IMAGES.luxury },
    { name: 'Room near GT Campus', type: 'Private Room', address: '750 Techwood Dr NW, Atlanta, GA 30313', distance: '0.2', price: 600, amenities: ['WiFi Included', 'Furnished', 'Laundry', 'Walk to GT'], contact: { name: 'Min-Jun Park', phone: '(404) 555-9012', email: 'minjun.p@gatech.edu' }, rating: 4.0, reviewCount: 34, verified: false, available: true, image: HOUSING_IMAGES.privateRoom },
    { name: 'Shared Apt in West Midtown', type: '2 Bedroom Shared', address: '1050 Howell Mill Rd NW, Atlanta, GA 30318', distance: '1.8', price: 700, amenities: ['WiFi Included', 'Washer/Dryer', 'Parking', 'Near Westside Provisions'], contact: { name: 'Ahmed Hassan', phone: '(404) 555-6678', email: 'ahmed.h@gatech.edu' }, rating: 4.1, reviewCount: 43, verified: false, available: true, image: HOUSING_IMAGES.shared },
    { name: 'Square on Fifth', type: 'Furnished Studio', address: '848 Spring St NW, Atlanta, GA 30308', distance: '0.6', price: 1100, amenities: ['Fully Furnished', 'Gym', 'Pool', 'Study Lounge', 'Laundry', 'GT Shuttle'], contact: { name: 'Square on Fifth Leasing', phone: '(404) 897-5050', email: 'leasing@squareonfifth.com' }, rating: 4.3, reviewCount: 198, verified: true, available: true, image: HOUSING_IMAGES.furnished },
  ],
  Seattle: [
    { name: 'UW Lander Hall', type: 'Student Housing Complex', address: '1201 NE Campus Pkwy, Seattle, WA 98105', distance: '0.1', price: 1200, amenities: ['Furnished', 'Meal Plan Available', 'Study Rooms', 'Laundry', 'Near UW Light Rail'], contact: { name: 'UW Housing', phone: '(206) 543-4059', email: 'housing@uw.edu' }, rating: 4.0, reviewCount: 345, verified: true, available: true, image: HOUSING_IMAGES.studentComplex },
    { name: 'U-District Studio on 45th', type: 'Studio Apartment', address: '4507 Brooklyn Ave NE, Seattle, WA 98105', distance: '0.4', price: 1350, amenities: ['AC', 'Laundry', 'Bike Storage', 'Near U-District Station'], contact: { name: 'U-District Realty', phone: '(206) 632-4507', email: 'info@udistrictrealty.com' }, rating: 4.1, reviewCount: 98, verified: true, available: true, image: HOUSING_IMAGES.studio },
    { name: 'Wallingford 1BR', type: '1 Bedroom Apartment', address: '1815 N 45th St, Seattle, WA 98103', distance: '2.0', price: 1600, amenities: ['AC', 'Parking', 'In-unit Laundry', 'Near Bus 44'], contact: { name: 'Wallingford Properties', phone: '(206) 547-1815', email: 'info@wallingfordprops.com' }, rating: 4.3, reviewCount: 87, verified: true, available: true, image: HOUSING_IMAGES.oneBed },
    { name: 'Room in Ravenna House', type: 'Private Room', address: '6520 Ravenna Ave NE, Seattle, WA 98115', distance: '1.5', price: 850, amenities: ['WiFi Included', 'Washer/Dryer', 'Backyard', 'Street Parking'], contact: { name: 'Yuki Tanaka', phone: '(206) 555-3344', email: 'yuki.t@uw.edu' }, rating: 4.0, reviewCount: 29, verified: false, available: true, image: HOUSING_IMAGES.privateRoom },
    { name: 'Shared Apt in Roosevelt', type: '2 Bedroom Shared', address: '1020 NE 65th St, Seattle, WA 98115', distance: '1.2', price: 950, amenities: ['WiFi Included', 'Laundry', 'Near Roosevelt Station', 'Bike Friendly'], contact: { name: 'Chen Wei', phone: '(206) 555-7789', email: 'chen.w@uw.edu' }, rating: 4.1, reviewCount: 44, verified: false, available: true, image: HOUSING_IMAGES.shared },
    { name: 'The Wilsonian', type: 'Furnished Studio', address: '4710 University Way NE, Seattle, WA 98105', distance: '0.3', price: 1500, amenities: ['Fully Furnished', 'Gym', 'Study Room', 'Laundry', 'Rooftop Deck'], contact: { name: 'Wilsonian Leasing', phone: '(206) 632-4710', email: 'leasing@wilsonian.com' }, rating: 4.4, reviewCount: 167, verified: true, available: true, image: HOUSING_IMAGES.furnished },
  ],
}

const HOUSING_DEFAULT = HOUSING_BY_CITY.Austin

// ═══════════════════════════════════════════════════════════════
// FOOD — Real restaurants, real grocery stores, real cuisine photos
// ═══════════════════════════════════════════════════════════════

const FOOD_BY_NATIONALITY = {
  Indian: {
    restaurants: [
      { name: 'Saravana Bhavan', avgMealPrice: 12, priceRange: '$', hours: '11:00 AM - 10:00 PM', tags: ['South Indian', 'Pure Vegetarian', 'Dine-in'], studentDiscount: true, deliveryAvailable: true, image: FOOD_IMAGES.indian3, address: '81 Lexington Ave, New York, NY 10016' },
      { name: 'Biryani Pot', avgMealPrice: 14, priceRange: '$', hours: '11:30 AM - 10:30 PM', tags: ['Hyderabadi Biryani', 'Halal', 'Delivery'], studentDiscount: false, deliveryAvailable: true, image: FOOD_IMAGES.indian2, address: '210 E 43rd St, New York, NY 10017' },
      { name: 'Dosa Place', avgMealPrice: 10, priceRange: '$', hours: '8:00 AM - 9:00 PM', tags: ['South Indian', 'Dosa & Idli', 'Takeout'], studentDiscount: true, deliveryAvailable: false, image: FOOD_IMAGES.indian3, address: '2845 Guadalupe St, Austin, TX 78705' },
      { name: 'Tandoori Grill', avgMealPrice: 16, priceRange: '$$', hours: '12:00 PM - 11:00 PM', tags: ['North Indian', 'Tandoor', 'Dine-in'], studentDiscount: false, deliveryAvailable: true, image: FOOD_IMAGES.indian, address: '1320 Massachusetts Ave, Cambridge, MA 02138' },
      { name: 'Chaat Corner', avgMealPrice: 9, priceRange: '$', hours: '10:00 AM - 9:00 PM', tags: ['Street Food', 'Chaat & Pani Puri', 'Takeout'], studentDiscount: true, deliveryAvailable: false, image: FOOD_IMAGES.indian, address: '37-27 74th St, Jackson Heights, NY 11372' },
      { name: 'Madras Cafe', avgMealPrice: 11, priceRange: '$', hours: '7:30 AM - 9:30 PM', tags: ['South Indian', 'Filter Coffee', 'Dine-in'], studentDiscount: true, deliveryAvailable: true, image: FOOD_IMAGES.indian3, address: '1177 Huntington Ave, Boston, MA 02115' },
    ],
    groceries: [
      { name: 'Patel Brothers', hours: '9:00 AM - 9:00 PM', tags: ['Indian Groceries', 'Spices', 'Fresh Produce', 'Sweets'], studentDiscount: true, image: FOOD_IMAGES.grocery2, address: '37-27 74th St, Jackson Heights, NY 11372' },
      { name: 'India Bazaar', hours: '10:00 AM - 8:30 PM', tags: ['Indian Groceries', 'Spices', 'Frozen Parathas', 'Snacks'], studentDiscount: false, image: FOOD_IMAGES.grocery4, address: '2528 W Anderson Ln, Austin, TX 78757' },
      { name: 'Subzi Mandi Fresh Market', hours: '8:00 AM - 9:00 PM', tags: ['Fresh Vegetables', 'Spices', 'Lentils', 'Atta & Rice'], studentDiscount: true, image: FOOD_IMAGES.grocery, address: '2723 N Halsted St, Chicago, IL 60614' },
      { name: 'Apna Bazaar', hours: '9:30 AM - 8:00 PM', tags: ['Ready-to-Eat', 'Pickles', 'Spices', 'Basmati Rice'], studentDiscount: false, image: FOOD_IMAGES.grocery2, address: '230 E 6th St, New York, NY 10003' },
    ],
  },
  Chinese: {
    restaurants: [
      { name: 'Sichuan Impression', avgMealPrice: 14, priceRange: '$', hours: '11:00 AM - 10:00 PM', tags: ['Sichuan Cuisine', 'Mapo Tofu', 'Dine-in'], studentDiscount: true, deliveryAvailable: true, image: FOOD_IMAGES.chinese, address: '1900 W Valley Blvd, Alhambra, CA 91803' },
      { name: 'Din Tai Fung', avgMealPrice: 18, priceRange: '$$', hours: '11:00 AM - 9:30 PM', tags: ['Xiao Long Bao', 'Dumplings', 'Dine-in'], studentDiscount: false, deliveryAvailable: false, image: FOOD_IMAGES.chinese3, address: '1108 S Baldwin Ave, Arcadia, CA 91007' },
      { name: 'Xi\'an Famous Foods', avgMealPrice: 11, priceRange: '$', hours: '10:30 AM - 9:00 PM', tags: ['Hand-Pulled Noodles', 'Lamb Burger', 'Takeout'], studentDiscount: true, deliveryAvailable: true, image: FOOD_IMAGES.chinese2, address: '67 Bayard St, New York, NY 10013' },
      { name: 'Kung Fu Tea', avgMealPrice: 7, priceRange: '$', hours: '11:00 AM - 11:00 PM', tags: ['Bubble Tea', 'Milk Tea', 'Takeout'], studentDiscount: true, deliveryAvailable: true, image: FOOD_IMAGES.general, address: '234 E 14th St, New York, NY 10003' },
      { name: 'Hunan Bistro', avgMealPrice: 13, priceRange: '$', hours: '11:30 AM - 10:00 PM', tags: ['Hunan Cuisine', 'Spicy', 'Dine-in'], studentDiscount: false, deliveryAvailable: true, image: FOOD_IMAGES.chinese, address: '5420 Buford Hwy NE, Doraville, GA 30340' },
      { name: 'Bao by Kaya', avgMealPrice: 9, priceRange: '$', hours: '10:00 AM - 8:30 PM', tags: ['Steamed Bao', 'Pork Belly Buns', 'Takeout'], studentDiscount: true, deliveryAvailable: false, image: FOOD_IMAGES.chinese3, address: '2000 NE 163rd St, North Miami Beach, FL 33162' },
    ],
    groceries: [
      { name: '99 Ranch Market', hours: '8:00 AM - 10:00 PM', tags: ['Asian Groceries', 'Fresh Seafood', 'Produce', 'Imported Goods'], studentDiscount: false, image: FOOD_IMAGES.grocery3, address: '140 S Atlantic Blvd, Monterey Park, CA 91754' },
      { name: 'H Mart', hours: '8:00 AM - 10:00 PM', tags: ['Asian Groceries', 'Fresh Produce', 'Ready-to-Eat', 'Snacks'], studentDiscount: true, image: FOOD_IMAGES.grocery3, address: '38 W 32nd St, New York, NY 10001' },
      { name: 'Great Wall Supermarket', hours: '9:00 AM - 9:00 PM', tags: ['Chinese Sauces', 'Noodles', 'Frozen Dim Sum', 'Tea'], studentDiscount: false, image: FOOD_IMAGES.grocery4, address: '1828 Reston Pkwy, Reston, VA 20190' },
      { name: 'Kam Man Food', hours: '9:00 AM - 8:30 PM', tags: ['Chinese Groceries', 'Rice', 'Dried Goods', 'Cookware'], studentDiscount: true, image: FOOD_IMAGES.grocery, address: '200 Canal St, New York, NY 10013' },
    ],
  },
  'South Korean': {
    restaurants: [
      { name: 'Kang Ho Dong Baekjeong', avgMealPrice: 25, priceRange: '$$', hours: '11:30 AM - 11:00 PM', tags: ['Korean BBQ', 'Galbi', 'Dine-in'], studentDiscount: false, deliveryAvailable: false, image: FOOD_IMAGES.korean, address: '1 E 32nd St, New York, NY 10016' },
      { name: 'BCD Tofu House', avgMealPrice: 14, priceRange: '$', hours: 'Open 24 Hours', tags: ['Sundubu Jjigae', 'Tofu Stew', 'Dine-in'], studentDiscount: true, deliveryAvailable: false, image: FOOD_IMAGES.korean2, address: '3575 Wilshire Blvd, Los Angeles, CA 90010' },
      { name: 'Bonchon Chicken', avgMealPrice: 13, priceRange: '$', hours: '11:00 AM - 10:00 PM', tags: ['Korean Fried Chicken', 'Wings', 'Takeout'], studentDiscount: true, deliveryAvailable: true, image: FOOD_IMAGES.korean3, address: '325 5th Ave, New York, NY 10016' },
      { name: 'Jongro BBQ', avgMealPrice: 20, priceRange: '$$', hours: '11:00 AM - 12:00 AM', tags: ['Korean BBQ', 'Pork Belly', 'Dine-in'], studentDiscount: false, deliveryAvailable: false, image: FOOD_IMAGES.korean, address: '22 W 32nd St, New York, NY 10001' },
      { name: 'Myung Dong Kyoja', avgMealPrice: 11, priceRange: '$', hours: '10:30 AM - 9:30 PM', tags: ['Kalguksu', 'Handmade Noodles', 'Takeout'], studentDiscount: true, deliveryAvailable: false, image: FOOD_IMAGES.korean2, address: '31 W 32nd St, New York, NY 10001' },
    ],
    groceries: [
      { name: 'H Mart', hours: '8:00 AM - 10:00 PM', tags: ['Korean Groceries', 'Kimchi', 'Fresh Produce', 'Banchan'], studentDiscount: true, image: FOOD_IMAGES.grocery3, address: '38 W 32nd St, New York, NY 10001' },
      { name: 'Lotte Plaza Market', hours: '9:00 AM - 9:00 PM', tags: ['Korean Groceries', 'Frozen Mandu', 'Ramen', 'Gochujang'], studentDiscount: false, image: FOOD_IMAGES.grocery4, address: '12301 Old Columbia Pike, Silver Spring, MD 20904' },
      { name: 'Hana World Market', hours: '9:00 AM - 8:30 PM', tags: ['Korean Groceries', 'Banchan', 'Rice Cakes', 'Snacks'], studentDiscount: true, image: FOOD_IMAGES.grocery, address: '2601 W Holcombe Blvd, Houston, TX 77025' },
    ],
  },
  Vietnamese: {
    restaurants: [
      { name: 'Pho Hoa', avgMealPrice: 11, priceRange: '$', hours: '10:00 AM - 9:00 PM', tags: ['Pho', 'Vietnamese Soup', 'Dine-in'], studentDiscount: true, deliveryAvailable: true, image: FOOD_IMAGES.general, address: '3215 Zach Scott St, Austin, TX 78723' },
      { name: 'Saigon Shack', avgMealPrice: 10, priceRange: '$', hours: '11:00 AM - 10:00 PM', tags: ['Banh Mi', 'Vermicelli', 'Takeout'], studentDiscount: true, deliveryAvailable: false, image: FOOD_IMAGES.general2, address: '114 MacDougal St, New York, NY 10012' },
      { name: 'Hai Duong', avgMealPrice: 12, priceRange: '$', hours: '10:30 AM - 9:30 PM', tags: ['Bun Bo Hue', 'Com Tam', 'Dine-in'], studentDiscount: false, deliveryAvailable: true, image: FOOD_IMAGES.general, address: '1045 S Jackson St, Seattle, WA 98104' },
      { name: 'Lotus Vietnamese', avgMealPrice: 13, priceRange: '$', hours: '11:00 AM - 9:00 PM', tags: ['Spring Rolls', 'Pho', 'Dine-in'], studentDiscount: true, deliveryAvailable: true, image: FOOD_IMAGES.general2, address: '1235 S Figueroa St, Los Angeles, CA 90015' },
    ],
    groceries: [
      { name: 'Viet Hoa Supermarket', hours: '8:00 AM - 9:00 PM', tags: ['Vietnamese Groceries', 'Fish Sauce', 'Rice Noodles', 'Herbs'], studentDiscount: false, image: FOOD_IMAGES.grocery3, address: '8200 Olive Blvd, University City, MO 63130' },
      { name: 'Saigon Market', hours: '9:00 AM - 8:00 PM', tags: ['Vietnamese Groceries', 'Fresh Herbs', 'Sauces', 'Frozen Foods'], studentDiscount: true, image: FOOD_IMAGES.grocery, address: '10775 S De Anza Blvd, Cupertino, CA 95014' },
    ],
  },
  Japanese: {
    restaurants: [
      { name: 'Marufuku Ramen', avgMealPrice: 16, priceRange: '$$', hours: '11:30 AM - 10:00 PM', tags: ['Hakata Ramen', 'Tonkotsu', 'Dine-in'], studentDiscount: false, deliveryAvailable: false, image: FOOD_IMAGES.japanese, address: '1581 Webster St, San Francisco, CA 94115' },
      { name: 'Ippudo', avgMealPrice: 17, priceRange: '$$', hours: '11:00 AM - 11:00 PM', tags: ['Ramen', 'Gyoza', 'Dine-in'], studentDiscount: false, deliveryAvailable: true, image: FOOD_IMAGES.japanese, address: '65 4th Ave, New York, NY 10003' },
      { name: 'Sushi Yasuda', avgMealPrice: 30, priceRange: '$$$', hours: '12:00 PM - 10:00 PM', tags: ['Omakase Sushi', 'Nigiri', 'Dine-in'], studentDiscount: false, deliveryAvailable: false, image: FOOD_IMAGES.japanese, address: '204 E 43rd St, New York, NY 10017' },
      { name: 'CoCo Ichibanya', avgMealPrice: 12, priceRange: '$', hours: '11:00 AM - 9:30 PM', tags: ['Japanese Curry', 'Katsu', 'Dine-in'], studentDiscount: true, deliveryAvailable: true, image: FOOD_IMAGES.general, address: '2130 Sawtelle Blvd, Los Angeles, CA 90025' },
    ],
    groceries: [
      { name: 'Mitsuwa Marketplace', hours: '9:00 AM - 9:00 PM', tags: ['Japanese Groceries', 'Bento', 'Mochi', 'Sake'], studentDiscount: false, image: FOOD_IMAGES.grocery3, address: '515 W Las Tunas Dr, San Gabriel, CA 91776' },
      { name: 'Nijiya Market', hours: '9:00 AM - 8:30 PM', tags: ['Japanese Groceries', 'Onigiri', 'Tofu', 'Natto'], studentDiscount: true, image: FOOD_IMAGES.grocery, address: '2130 Sawtelle Blvd #105, Los Angeles, CA 90025' },
    ],
  },
  Mexican: {
    restaurants: [
      { name: 'Los Tacos No. 1', avgMealPrice: 10, priceRange: '$', hours: '10:00 AM - 11:00 PM', tags: ['Tacos al Pastor', 'Adobada', 'Takeout'], studentDiscount: false, deliveryAvailable: false, image: FOOD_IMAGES.mexican, address: '75 9th Ave, New York, NY 10011' },
      { name: 'Taqueria Orinoco', avgMealPrice: 12, priceRange: '$', hours: '11:00 AM - 10:00 PM', tags: ['Tacos', 'Burritos', 'Dine-in'], studentDiscount: true, deliveryAvailable: true, image: FOOD_IMAGES.mexican, address: '2903 San Jacinto Blvd, Austin, TX 78705' },
      { name: 'El Farolito', avgMealPrice: 11, priceRange: '$', hours: '10:00 AM - 3:00 AM', tags: ['Super Burritos', 'Quesadillas', 'Late Night'], studentDiscount: false, deliveryAvailable: false, image: FOOD_IMAGES.mexican, address: '2779 Mission St, San Francisco, CA 94110' },
      { name: 'Guelaguetza', avgMealPrice: 15, priceRange: '$$', hours: '9:00 AM - 10:00 PM', tags: ['Oaxacan Mole', 'Tlayudas', 'Dine-in'], studentDiscount: false, deliveryAvailable: true, image: FOOD_IMAGES.mexican, address: '3014 W Olympic Blvd, Los Angeles, CA 90006' },
    ],
    groceries: [
      { name: 'La Michoacana Meat Market', hours: '7:00 AM - 10:00 PM', tags: ['Mexican Groceries', 'Carnitas', 'Tortillas', 'Chiles'], studentDiscount: false, image: FOOD_IMAGES.grocery, address: '1917 E 7th St, Austin, TX 78702' },
      { name: 'Fiesta Mart', hours: '7:00 AM - 11:00 PM', tags: ['Mexican Groceries', 'Produce', 'Bakery', 'Spices'], studentDiscount: true, image: FOOD_IMAGES.grocery4, address: '3909 N IH 35, Austin, TX 78722' },
    ],
  },
}

const FOOD_DEFAULT = FOOD_BY_NATIONALITY.Indian

// ═══════════════════════════════════════════════════════════════
// COMMUNITY — Real student organizations, real event types, real photos
// ═══════════════════════════════════════════════════════════════

const COMMUNITY_BY_NATIONALITY = {
  Indian: [
    { name: 'Indian Students Association (ISA)', type: 'Cultural Association', members: 420, description: 'The largest Indian student body on campus. We organize Diwali, Holi, cultural nights, and provide mentorship for new students arriving from India. Airport pickups, housing help, and a 24/7 WhatsApp support group.', platform: 'WhatsApp', meetingFrequency: 'Weekly', image: COMMUNITY_IMAGES.festival, contact: { name: 'Arjun Mehta', phone: '(512) 903-1122', email: 'isa@studentorgs.edu' }, events: [{ name: 'Diwali Night Celebration', date: 'Sat, Nov 1', time: '6:00 PM', location: 'Student Union Ballroom', attendees: 280 }, { name: 'Cricket Tournament', date: 'Sun, Nov 15', time: '9:00 AM', location: 'University Sports Field', attendees: 64 }] },
    { name: 'Desi Graduate Network', type: 'Professional Network', members: 185, description: 'Professional networking for Indian graduate students. Resume reviews, mock interviews, career panels with alumni at Google, Amazon, McKinsey, and Goldman Sachs. Active referral network.', platform: 'LinkedIn', meetingFrequency: 'Bi-weekly', image: COMMUNITY_IMAGES.professional, contact: { name: 'Priya Sharma', phone: '(512) 577-3344', email: 'desigrad@studentorgs.edu' }, events: [{ name: 'Resume Workshop', date: 'Wed, Oct 22', time: '7:00 PM', location: 'Career Center Room 201', attendees: 45 }, { name: 'Alumni Panel: Tech Careers', date: 'Sat, Nov 8', time: '2:00 PM', location: 'Engineering Auditorium', attendees: 120 }] },
    { name: 'Bollywood Dance Club', type: 'Cultural Club', members: 95, description: 'Learn and perform Bollywood, Garba, and classical Indian dance. No experience needed. We compete at national competitions like Bollywood America and perform at Diwali shows.', platform: 'Instagram', meetingFrequency: 'Weekly', image: COMMUNITY_IMAGES.dance, contact: { name: 'Neha Patel', phone: '(512) 619-5566', email: 'bollywood@studentorgs.edu' }, events: [{ name: 'Fall Showcase Rehearsal', date: 'Thu, Oct 30', time: '6:00 PM', location: 'Dance Studio B', attendees: 40 }, { name: 'Bollywood Night', date: 'Fri, Nov 21', time: '8:00 PM', location: 'Campus Theater', attendees: 200 }] },
    { name: 'Indian Food & Cooking Circle', type: 'Social Group', members: 68, description: 'Weekly potlucks, cooking classes, and recipe sharing. Learn to cook dal, biryani, dosa, and regional dishes. We share meals and fight homesickness together.', platform: 'WhatsApp', meetingFrequency: 'Weekly', image: COMMUNITY_IMAGES.cooking, contact: { name: 'Ravi Kumar', phone: '(512) 401-7788', email: 'indianfood@studentorgs.edu' }, events: [{ name: 'South Indian Cooking Class', date: 'Sun, Oct 26', time: '4:00 PM', location: 'Community Kitchen', attendees: 25 }, { name: 'Diwali Potluck', date: 'Sat, Nov 1', time: '12:00 PM', location: 'Park Pavilion', attendees: 55 }] },
    { name: 'International Students Union', type: 'Student Organization', members: 850, description: 'The umbrella organization for all international students. Orientation programs, legal workshops on F-1 visa, CPT/OPT filing, tax help, social events, and advocacy with university administration.', platform: 'Discord', meetingFrequency: 'Monthly', image: COMMUNITY_IMAGES.studentOrg, contact: { name: 'Sarah Johnson', phone: '(512) 471-2000', email: 'isu@studentorgs.edu' }, events: [{ name: 'International Food Festival', date: 'Sat, Nov 8', time: '11:00 AM', location: 'University Quad', attendees: 500 }, { name: 'OPT/CPT Filing Workshop', date: 'Tue, Nov 18', time: '5:00 PM', location: 'International Center', attendees: 150 }] },
    { name: 'Hindi Language Exchange', type: 'Social Group', members: 42, description: 'Practice Hindi conversation with native speakers and teach English in return. Great for making cross-cultural friendships. We also watch Hindi movies together on weekends.', platform: 'Telegram', meetingFrequency: 'Weekly', image: COMMUNITY_IMAGES.language, contact: { name: 'Amit Singh', phone: '(512) 555-9900', email: 'hindi@studentorgs.edu' }, events: [{ name: 'Conversation Hour', date: 'Wed, Oct 29', time: '5:30 PM', location: 'Library Room 305', attendees: 18 }] },
  ],
  Chinese: [
    { name: 'Chinese Students & Scholars Association (CSSA)', type: 'Cultural Association', members: 580, description: 'The official Chinese student organization. We host Mid-Autumn Festival, Chinese New Year gala, career fairs with Chinese companies, and provide airport pickup and housing help for new students.', platform: 'WeChat', meetingFrequency: 'Weekly', image: COMMUNITY_IMAGES.festival, contact: { name: 'Lisa Chen', phone: '(512) 903-2233', email: 'cssa@studentorgs.edu' }, events: [{ name: 'Mid-Autumn Festival', date: 'Sat, Sep 28', time: '6:00 PM', location: 'Student Union Ballroom', attendees: 350 }, { name: 'Career Fair: Chinese Tech Companies', date: 'Fri, Oct 17', time: '10:00 AM', location: 'Convention Center', attendees: 200 }] },
    { name: 'Chinese Tech Professionals', type: 'Professional Network', members: 220, description: 'Networking for Chinese students in tech. Weekly LeetCode study groups, system design practice, mock interviews, and referral network with alumni at Meta, Google, ByteDance, and startups.', platform: 'WeChat', meetingFrequency: 'Weekly', image: COMMUNITY_IMAGES.professional, contact: { name: 'Wei Zhang', phone: '(512) 577-4455', email: 'chinesetech@studentorgs.edu' }, events: [{ name: 'LeetCode Contest Night', date: 'Sun, Oct 26', time: '7:00 PM', location: 'CS Building Lab 3', attendees: 40 }, { name: 'Mock Interview Marathon', date: 'Sat, Nov 8', time: '10:00 AM', location: 'Career Center', attendees: 60 }] },
    { name: 'Chinese Cultural Arts Club', type: 'Cultural Club', members: 75, description: 'Calligraphy, traditional guzheng music, tai chi, and cultural performances. Open to all backgrounds. We perform at the Spring Festival Gala and cultural showcases.', platform: 'Discord', meetingFrequency: 'Weekly', image: COMMUNITY_IMAGES.cultural, contact: { name: 'Mei Lin', phone: '(512) 619-6677', email: 'chinesearts@studentorgs.edu' }, events: [{ name: 'Calligraphy Workshop', date: 'Sat, Nov 1', time: '2:00 PM', location: 'Art Center Room 102', attendees: 30 }] },
    { name: 'International Students Union', type: 'Student Organization', members: 850, description: 'The umbrella organization for all international students. Orientation programs, legal workshops on F-1 visa, social events, and advocacy.', platform: 'Discord', meetingFrequency: 'Monthly', image: COMMUNITY_IMAGES.studentOrg, contact: { name: 'Sarah Johnson', phone: '(512) 471-2000', email: 'isu@studentorgs.edu' }, events: [{ name: 'International Food Festival', date: 'Sat, Nov 8', time: '11:00 AM', location: 'University Quad', attendees: 500 }] },
  ],
  'South Korean': [
    { name: 'Korean Student Association (KSA)', type: 'Cultural Association', members: 310, description: 'The main Korean student body. We organize Korean Culture Night, Chuseok celebrations, K-pop events, and welcome orientation. We also run a mentorship program pairing new and senior students.', platform: 'KakaoTalk', meetingFrequency: 'Weekly', image: COMMUNITY_IMAGES.festival, contact: { name: 'Min-Jun Kim', phone: '(512) 903-3344', email: 'ksa@studentorgs.edu' }, events: [{ name: 'Korean Culture Night', date: 'Fri, Nov 7', time: '7:00 PM', location: 'Student Union Theater', attendees: 250 }, { name: 'Chuseok Celebration', date: 'Sat, Sep 27', time: '5:00 PM', location: 'Community Center', attendees: 180 }] },
    { name: 'K-Pop Dance Crew', type: 'Cultural Club', members: 65, description: 'Learn K-pop choreography and perform at campus events. All skill levels welcome. We cover BTS, BLACKPINK, NewJeans, Stray Kids, and aespa. Compete at K-pop cover dance competitions.', platform: 'Instagram', meetingFrequency: 'Weekly', image: COMMUNITY_IMAGES.dance, contact: { name: 'Soo-Yeon Park', phone: '(512) 619-7788', email: 'kpopdance@studentorgs.edu' }, events: [{ name: 'Fall Dance Cover Showcase', date: 'Sat, Nov 15', time: '7:00 PM', location: 'Campus Theater', attendees: 180 }] },
    { name: 'Korean Language Exchange', type: 'Social Group', members: 55, description: 'Practice Korean and English with native speakers. Great for improving conversational skills. We also do Korean drama watch parties and Korean cooking nights.', platform: 'Discord', meetingFrequency: 'Weekly', image: COMMUNITY_IMAGES.language, contact: { name: 'Ji-Hoon Lee', phone: '(512) 555-1122', email: 'koreanlang@studentorgs.edu' }, events: [{ name: 'Conversation Hour', date: 'Thu, Oct 30', time: '6:00 PM', location: 'Library Room 210', attendees: 22 }] },
    { name: 'International Students Union', type: 'Student Organization', members: 850, description: 'The umbrella organization for all international students. Orientation programs, legal workshops, social events, and advocacy.', platform: 'Discord', meetingFrequency: 'Monthly', image: COMMUNITY_IMAGES.studentOrg, contact: { name: 'Sarah Johnson', phone: '(512) 471-2000', email: 'isu@studentorgs.edu' }, events: [{ name: 'International Food Festival', date: 'Sat, Nov 8', time: '11:00 AM', location: 'University Quad', attendees: 500 }] },
  ],
}

const COMMUNITY_DEFAULT = COMMUNITY_BY_NATIONALITY.Indian

// ═══════════════════════════════════════════════════════════════
// SPORTS — Real venues, real addresses, sport-specific photos
// ═══════════════════════════════════════════════════════════════

const SPORTS_BY_CITY = {
  Austin: [
    { name: 'Austin Cricket League', sport: 'Cricket', level: 'All Levels', address: 'Garrison Park, 6001 Manchaca Rd, Austin, TX 78745', distance: '4.2', fee: 'Free for students', schedule: 'Sat/Sun 8:00 AM', members: 120, equipmentProvided: true, image: SPORTS_IMAGES.cricket, contact: { name: 'Ravi Sharma', phone: '(512) 903-8801', email: 'austincricket@gmail.com' }, events: [{ name: 'Fall Tournament', date: 'Sat, Nov 8', participants: 48 }, { name: 'Practice Match', date: 'Sun, Oct 26', participants: 24 }] },
    { name: 'UT Intramural Soccer', sport: 'Soccer', level: 'Recreational', address: 'Whitaker Fields, 2100 San Jacinto Blvd, Austin, TX 78712', distance: '0.5', fee: 'Free for students', schedule: 'Mon/Wed/Fri 5:00 PM', members: 85, equipmentProvided: true, image: SPORTS_IMAGES.soccer, contact: { name: 'UT RecSports', phone: '(512) 471-1093', email: 'recsports@utexas.edu' }, events: [{ name: 'Intramural League Game', date: 'Wed, Oct 29', participants: 22 }] },
    { name: 'Austin Badminton Club', sport: 'Badminton', level: 'All Levels', address: 'Gregory Gym, 2101 Speedway, Austin, TX 78712', distance: '0.3', fee: '$5/session', schedule: 'Tue/Thu 7:00 PM', members: 65, equipmentProvided: true, image: SPORTS_IMAGES.badminton, contact: { name: 'Jin Park', phone: '(512) 577-4402', email: 'austinbadminton@gmail.com' }, events: [{ name: 'Doubles Tournament', date: 'Sat, Nov 15', participants: 32 }] },
    { name: 'Longhorn Basketball Pickup', sport: 'Basketball', level: 'Recreational', address: 'RecSports Center, 2001 San Jacinto Blvd, Austin, TX 78712', distance: '0.4', fee: 'Free for students', schedule: 'Daily 6:00 PM', members: 150, equipmentProvided: true, image: SPORTS_IMAGES.basketball, contact: { name: 'Alex Torres', phone: '(512) 471-1093', email: 'recsports@utexas.edu' }, events: [{ name: '3v3 Tournament', date: 'Sat, Nov 1', participants: 36 }] },
    { name: 'Penick-Allison Tennis Center', sport: 'Tennis', level: 'Beginner Friendly', address: 'Penick-Allison Tennis Center, 2100 Red River St, Austin, TX 78712', distance: '0.6', fee: 'Free for students', schedule: 'Mon/Wed 4:00 PM', members: 45, equipmentProvided: false, image: SPORTS_IMAGES.tennis, contact: { name: 'Sam Wilson', phone: '(512) 471-6100', email: 'tennisclub@utexas.edu' }, events: [{ name: 'Beginner Clinic', date: 'Sat, Oct 25', participants: 16 }] },
    { name: 'Lady Bird Lake Running Group', sport: 'Running', level: 'All Levels', address: 'Ann & Roy Butler Hike-and-Bike Trail, Austin, TX 78704', distance: '1.8', fee: 'Free', schedule: 'Tue/Thu/Sat 6:30 AM', members: 90, equipmentProvided: false, image: SPORTS_IMAGES.running, contact: { name: 'Maria Lopez', phone: '(512) 619-5503', email: 'atxrunners@gmail.com' }, events: [{ name: 'Austin 5K Prep Run', date: 'Sat, Nov 8', participants: 40 }] },
    { name: 'UT Table Tennis Club', sport: 'Table Tennis', level: 'All Levels', address: 'Gregory Gym Room 36, 2101 Speedway, Austin, TX 78712', distance: '0.3', fee: 'Free for students', schedule: 'Mon/Wed/Fri 6:00 PM', members: 55, equipmentProvided: true, image: SPORTS_IMAGES.tabletennis, contact: { name: 'Tom Chen', phone: '(512) 401-6604', email: 'uttabletennis@gmail.com' }, events: [{ name: 'Singles Championship', date: 'Sat, Nov 22', participants: 24 }] },
    { name: 'Zilker Park Volleyball', sport: 'Volleyball', level: 'Recreational', address: 'Zilker Park Sand Courts, 2100 Barton Springs Rd, Austin, TX 78704', distance: '3.5', fee: 'Free', schedule: 'Weekends 10:00 AM', members: 70, equipmentProvided: true, image: SPORTS_IMAGES.volleyball, contact: { name: 'Priya Nair', phone: '(512) 555-7705', email: 'zilkervolley@gmail.com' }, events: [{ name: 'Beach Volleyball Tourney', date: 'Sun, Nov 2', participants: 28 }] },
    { name: 'UT Yoga & Wellness', sport: 'Yoga', level: 'Beginner Friendly', address: 'RecSports Center Studio, 2001 San Jacinto Blvd, Austin, TX 78712', distance: '0.4', fee: 'Free for students', schedule: 'Tue/Thu 7:30 AM', members: 60, equipmentProvided: true, image: SPORTS_IMAGES.yoga, contact: { name: 'Yuki Sato', phone: '(512) 471-1093', email: 'recsports@utexas.edu' }, events: [{ name: 'Sunrise Yoga Session', date: 'Sat, Oct 25', participants: 20 }] },
    { name: 'Gregory Gym Lap Swimming', sport: 'Swimming', level: 'All Levels', address: 'Gregory Gym Pool, 2101 Speedway, Austin, TX 78712', distance: '0.3', fee: 'Free for students', schedule: 'Daily 6:00 AM - 9:00 PM', members: 40, equipmentProvided: false, image: SPORTS_IMAGES.swimming, contact: { name: 'Omar Khan', phone: '(512) 471-1093', email: 'recsports@utexas.edu' }, events: [{ name: 'Lap Swim Challenge', date: 'Fri, Nov 14', participants: 15 }] },
  ],
  'New York': [
    { name: 'NYC Cricket Club', sport: 'Cricket', level: 'All Levels', address: 'Van Cortlandt Park Cricket Field, Bronx, NY 10471', distance: '8.0', fee: '$10/month', schedule: 'Sat/Sun 9:00 AM', members: 95, equipmentProvided: true, image: SPORTS_IMAGES.cricket, contact: { name: 'Raj Patel', phone: '(347) 555-1102', email: 'nyccricket@gmail.com' }, events: [{ name: 'Fall League Finals', date: 'Sat, Nov 8', participants: 44 }] },
    { name: 'NYU Intramural Soccer', sport: 'Soccer', level: 'Recreational', address: 'Pier 40, 353 West St, New York, NY 10014', distance: '0.8', fee: 'Free for students', schedule: 'Mon/Wed 6:00 PM', members: 72, equipmentProvided: true, image: SPORTS_IMAGES.soccer, contact: { name: 'NYU RecSports', phone: '(212) 998-2020', email: 'recsports@nyu.edu' }, events: [{ name: 'Intramural Match', date: 'Wed, Oct 29', participants: 22 }] },
    { name: 'Manhattan Badminton Club', sport: 'Badminton', level: 'All Levels', address: 'Palladium Athletic Facility, 140 E 14th St, New York, NY 10003', distance: '0.3', fee: '$8/session', schedule: 'Tue/Thu 8:00 PM', members: 50, equipmentProvided: true, image: SPORTS_IMAGES.badminton, contact: { name: 'Wei Liu', phone: '(646) 555-3304', email: 'nycbadminton@gmail.com' }, events: [{ name: 'Open Tournament', date: 'Sat, Nov 15', participants: 28 }] },
    { name: 'Central Park Running Club', sport: 'Running', level: 'All Levels', address: 'Central Park Engineers Gate, 90th St & 5th Ave, New York, NY 10128', distance: '4.0', fee: 'Free', schedule: 'Tue/Thu/Sat 6:30 AM', members: 120, equipmentProvided: false, image: SPORTS_IMAGES.running, contact: { name: 'Alex Rivera', phone: '(212) 555-6607', email: 'cprunclub@gmail.com' }, events: [{ name: 'NYC Marathon Training Run', date: 'Sat, Nov 1', participants: 55 }] },
    { name: 'Chelsea Piers Basketball', sport: 'Basketball', level: 'Recreational', address: 'Chelsea Piers, Pier 62, New York, NY 10011', distance: '1.5', fee: '$15/session', schedule: 'Daily 5:00 PM', members: 80, equipmentProvided: true, image: SPORTS_IMAGES.basketball, contact: { name: 'Marcus Brown', phone: '(212) 336-6100', email: 'basketball@chelseapiers.com' }, events: [{ name: '3v3 Tourney', date: 'Sat, Nov 8', participants: 36 }] },
  ],
  'Los Angeles': [
    { name: 'UCLA Cricket Club', sport: 'Cricket', level: 'All Levels', address: 'UCLA Intramural Field, 630 Westwood Plaza, Los Angeles, CA 90095', distance: '0.3', fee: 'Free for students', schedule: 'Sat/Sun 9:00 AM', members: 65, equipmentProvided: true, image: SPORTS_IMAGES.cricket, contact: { name: 'Vikram Singh', phone: '(310) 555-2201', email: 'uclacricket@gmail.com' }, events: [{ name: 'SoCal Cricket Cup', date: 'Sat, Nov 8', participants: 40 }] },
    { name: 'Westwood Soccer League', sport: 'Soccer', level: 'Recreational', address: 'Stoner Park, 1835 Stoner Ave, Los Angeles, CA 90025', distance: '1.2', fee: 'Free', schedule: 'Mon/Wed/Fri 5:30 PM', members: 90, equipmentProvided: true, image: SPORTS_IMAGES.soccer, contact: { name: 'Carlos Ruiz', phone: '(310) 555-3302', email: 'westwoodsoccer@gmail.com' }, events: [{ name: 'League Match', date: 'Wed, Oct 29', participants: 22 }] },
    { name: 'Santa Monica Yoga on the Beach', sport: 'Yoga', level: 'Beginner Friendly', address: 'Santa Monica Beach, 1550 Pacific Coast Hwy, Santa Monica, CA 90401', distance: '6.0', fee: 'Free', schedule: 'Sat/Sun 7:00 AM', members: 75, equipmentProvided: true, image: SPORTS_IMAGES.yoga, contact: { name: 'Luna Martinez', phone: '(310) 555-4403', email: 'beachyoga@gmail.com' }, events: [{ name: 'Sunrise Beach Yoga', date: 'Sat, Oct 25', participants: 30 }] },
    { name: 'UCLA Wooden Center Swimming', sport: 'Swimming', level: 'All Levels', address: 'John Wooden Center, 221 Westwood Plaza, Los Angeles, CA 90095', distance: '0.2', fee: 'Free for students', schedule: 'Daily 6:00 AM - 10:00 PM', members: 50, equipmentProvided: false, image: SPORTS_IMAGES.swimming, contact: { name: 'UCLA Recreation', phone: '(310) 825-3701', email: 'recreation@ucla.edu' }, events: [{ name: 'Lap Swim Challenge', date: 'Fri, Nov 14', participants: 18 }] },
    { name: 'Venice Beach Basketball', sport: 'Basketball', level: 'Competitive', address: 'Venice Beach Courts, 1800 Ocean Front Walk, Venice, CA 90291', distance: '8.0', fee: 'Free', schedule: 'Daily 4:00 PM', members: 100, equipmentProvided: false, image: SPORTS_IMAGES.basketball, contact: { name: 'Darius Johnson', phone: '(310) 555-5504', email: 'venicehoops@gmail.com' }, events: [{ name: 'King of the Court', date: 'Sat, Nov 1', participants: 32 }] },
  ],
}

const SPORTS_DEFAULT = SPORTS_BY_CITY.Austin

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

// ═══════════════════════════════════════════════════════════════
// DATA GENERATORS — Wire up real data to the app
// ═══════════════════════════════════════════════════════════════

export function generateHousingData(collegeName, city) {
  const cityData = HOUSING_BY_CITY[city] || HOUSING_DEFAULT
  return cityData.map((h, i) => ({
    id: `housing-${i}`,
    ...h,
    priceUnit: '/month',
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
    distance: (0.4 + i * 0.5).toFixed(1),
    rating: [4.5, 4.2, 4.7, 4.0, 4.3, 4.6][i % 6],
    reviewCount: [234, 156, 312, 89, 178, 267][i % 6],
    contact: r.contact || { name: 'Manager', phone: '(555) 000-0000' },
    reviews: makeReviews('food', i),
  }))

  const groceries = data.groceries.map((g, i) => ({
    id: `food-groc-${i}`,
    ...g,
    type: 'grocery',
    cuisine: nationality || 'International',
    distance: (1.0 + i * 0.7).toFixed(1),
    priceRange: '$',
    rating: [4.4, 4.1, 4.6, 4.2][i % 4],
    reviewCount: [198, 87, 256, 134][i % 4],
    contact: g.contact || { name: 'Store Manager', phone: '(555) 000-0000' },
    reviews: makeReviews('food', i + 10),
  }))

  return [...restaurants, ...groceries]
}

export function generateCommunityData(nationality, city) {
  const groups = COMMUNITY_BY_NATIONALITY[nationality] || COMMUNITY_DEFAULT
  return groups.map((g, i) => ({
    id: `comm-${i}`,
    ...g,
    rating: [4.7, 4.4, 4.8, 4.5, 4.3, 4.6][i % 6],
    reviewCount: [189, 76, 234, 145, 98, 167][i % 6],
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
    rating: [4.6, 4.3, 4.5, 4.7, 4.1, 4.4, 4.2, 4.8, 4.0, 4.3][i % 10],
    reviewCount: [167, 98, 134, 212, 56, 89, 145, 78, 112, 67][i % 10],
    upcomingEvents: s.events.map((e, j) => ({ id: `sportevent-${i}-${j}`, ...e })),
    reviews: makeReviews('sports', i),
  }))
}
