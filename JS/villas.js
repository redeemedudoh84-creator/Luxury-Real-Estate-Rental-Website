// 1. The SVG Vector Library
const SVG_ICONS = {
    // Header
    save: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
    share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>`,

    // Stats
    guests: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    bed: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg>`,
    bath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path><line x1="10" y1="5" x2="8" y2="7"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="7" y1="19" x2="7" y2="21"></line><line x1="17" y1="19" x2="17" y2="21"></line></svg>`,
    size: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>`,

    // Amenities
    pool: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 12c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 17c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/></svg>`,
    indoor_pool: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M7 17c1.5 0 1.5-1.5 3-1.5s1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5"/></svg>`,
    jacuzzi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><path d="M4 12h16"/><circle cx="8" cy="6" r="1.5"/><circle cx="12" cy="4" r="1.5"/><circle cx="16" cy="7" r="1.5"/><circle cx="10" cy="9" r="1.5"/><circle cx="14" cy="10" r="1.5"/></svg>`,
    gym: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="9" width="4" height="6" rx="1"/><rect x="18" y="9" width="4" height="6" rx="1"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="2" y1="12" x2="0" y2="12"/><line x1="22" y1="12" x2="24" y2="12"/></svg>`,
    sauna: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 16c0-2 2-2 2-4s-2-2-2-4M12 16c0-2 2-2 2-4s-2-2-2-4M16 16c0-2 2-2 2-4s-2-2-2-4"/><path d="M4 20h16"/></svg>`,
    outdoor_dining: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 20h16M6 20v-8h12v8M12 4v8M12 4l-4 4M12 4l4 4"/></svg>`,
    grill: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="8"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="12" x2="20" y2="12"/><path d="M8 20l2-2M16 20l-2-2"/></svg>`,
    boat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v8M8 10h8M6 14l-4 4h20l-4-4z"/></svg>`,
    ev: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 16h10M7 12h10M9 8v12M15 8v12"/><rect x="5" y="4" width="14" height="16" rx="2"/></svg>`,
    parking: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 16V8h4a4 4 0 0 1 0 8H9"/></svg>`,
    playground: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 22L12 2l8 20M8 12h8"/></svg>`,
    playstation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 12h4M8 10v4M15 11h.01M18 13h.01M7 7h10a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4z"/></svg>`,
    satellite: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12a8 8 0 0 1 16 0M8 12a4 4 0 0 1 8 0"/><circle cx="12" cy="12" r="1"/></svg>`,
    table_tennis: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="14" cy="10" r="6"/><path d="M10 14l-6 6M4 20l2-2"/></svg>`,
    fireplace: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2c0 6-6 8-6 14a6 6 0 0 0 12 0c0-6-6-8-6-14z"/></svg>`,
    ac: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"/></svg>`,
    feeding_chair: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6" y="10" width="12" height="12" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4"/></svg>`,
    iron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h16v6H4zM8 12V8a4 4 0 0 1 8 0v4"/></svg>`,
    wifi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>`,
    towels: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4 10h16M4 14h16"/></svg>`,
    toiletries: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 4h6v4H9zM7 8h10l2 12H5L7 8z"/></svg>`,
    hairdryer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 10h12a4 4 0 0 1 0 8H4a4 4 0 0 1 0-8z"/><path d="M16 14h4v6h-4z"/></svg>`,

    // Distances
    sea: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 12h20M2 17h20M2 7h20"/></svg>`,
    city: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>`,
    market: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`,
    airport: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>`,
    restaurant: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>`,
    ambulance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v20M2 12h20"></path></svg>`,
    beach: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12a10 10 0 0 0-20 0Z"></path><path d="M12 12v10"></path><path d="M8 22h8"></path></svg>`,
    hospital: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v20M2 12h20"></path></svg>`,

    // Kitchen
    plate: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle></svg>`,
    fridge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="5" y1="10" x2="19" y2="10"></line><line x1="8" y1="6" x2="8" y2="8"></line><line x1="8" y1="14" x2="8" y2="16"></line></svg>`,
    utensils: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2v20"></path><path d="M18 2v20"></path><path d="M22 2v20"></path><path d="M2 2v20"></path><path d="M6 2v20"></path><path d="M10 2v20"></path></svg>`,
    dishwasher: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>`,
    coffee: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`,
    oven: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="4" y1="10" x2="20" y2="10"></line><circle cx="12" cy="16" r="2"></circle><line x1="8" y1="6" x2="8" y2="6"></line><line x1="16" y1="6" x2="16" y2="6"></line></svg>`,

    // Contact
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`
};

const allAmenities = [
    { name: "Swimming pool", icon: "pool" }, { name: "Indoor pool", icon: "indoor_pool" }, { name: "Jacuzzi", icon: "jacuzzi" },
    { name: "Fitness/Gym", icon: "gym" }, { name: "Sauna", icon: "sauna" }, { name: "Outdoor dining table", icon: "outdoor_dining" },
    { name: "Outdoor grill", icon: "grill" }, { name: "Boat mooring", icon: "boat" }, { name: "Electric car charger", icon: "ev" },
    { name: "Private parking", icon: "parking" }, { name: "Playground", icon: "playground" }, { name: "Playstation", icon: "playstation" },
    { name: "Satellite/Cable", icon: "satellite" }, { name: "Table tennis", icon: "table_tennis" }, { name: "Fireplace", icon: "fireplace" },
    { name: "Air conditioning", icon: "ac" }, { name: "Feeding chair", icon: "feeding_chair" }, { name: "Iron & Board", icon: "iron" },
    { name: "Wi-Fi", icon: "wifi" }, { name: "Towels", icon: "towels" }, { name: "Toiletries", icon: "toiletries" }, { name: "Hair dryer", icon: "hairdryer" }
];

const standardDistances = [
    { name: "Sea", icon: "sea", val: "2 km" }, { name: "City", icon: "city", val: "4 km" },
    { name: "Market", icon: "market", val: "0.5 km" }, { name: "Airport", icon: "airport", val: "30 km" },
    { name: "Restaurant", icon: "restaurant", val: "0.2 km" }, { name: "Ambulance", icon: "ambulance", val: "4 km" },
    { name: "Beach", icon: "beach", val: "2 km" }, { name: "Hospital", icon: "hospital", val: "5 km" }
];

const standardKitchen = [
    { name: "Plates", icon: "plate" }, { name: "Refrigerator", icon: "fridge" },
    { name: "Cooking utensils", icon: "utensils" }, { name: "Dishwasher", icon: "dishwasher" },
    { name: "Coffee machine", icon: "coffee" }, { name: "Oven", icon: "oven" }
];

const villasData = {
    soho: {
        name: "Villa SOHO", location: "Town", price: "€350", guests: 8, bedrooms: 6, bathrooms: 6, size: "270m²",
        amenities: allAmenities, distances: standardDistances, kitchen: standardKitchen
    },
    roxane: {
        name: "Villa Roxane", location: "Seaside", price: "€110", guests: 11, bedrooms: 6, bathrooms: 2.5, size: "120m²",
        amenities: allAmenities, distances: standardDistances, kitchen: standardKitchen
    },
    makarska: {
        name: "Villa Makarska", location: "Mountains", price: "€240", guests: 8, bedrooms: 8, bathrooms: 4, size: "460m²",
        amenities: allAmenities, distances: standardDistances, kitchen: standardKitchen
    },
    aura: {
        name: "Villa Aura", location: "Village", price: "€180", guests: 4, bedrooms: 2, bathrooms: 2, size: "110m²",
        amenities: allAmenities, distances: standardDistances, kitchen: standardKitchen
    },
    thebes: {
        name: "Villa Thebes", location: "Countryside", price: "€200", guests: 8, bedrooms: 4, bathrooms: 3, size: "220m²",
        amenities: allAmenities, distances: standardDistances, kitchen: standardKitchen
    },

    luna: {
        name: "Villa Luna", location: "Seaside", price: "€350", guests: 11, bedrooms: 6, bathrooms: 2.5, size: "120m²",
        amenities: [
            { name: "Swimming pool", icon: "pool" }, { name: "Outdoor dining table", icon: "outdoor_dining" }, { name: "Playstation", icon: "playstation" },
            { name: "Satellite/Cable", icon: "satellite" }, { name: "Air conditioning", icon: "ac" }, { name: "Iron & Board", icon: "iron" },
            { name: "Fireplace", icon: "fireplace" }, { name: "Wi-Fi", icon: "wifi" }, { name: "Towels", icon: "towels" }, { name: "Toiletries", icon: "toiletries" }, { name: "Hair dryer", icon: "hairdryer" }
        ],
        distances: standardDistances, kitchen: standardKitchen
    },
    aphrodite: {
        name: "Villa Aphrodite", location: "Seaside", price: "€240", guests: 12, bedrooms: 6, bathrooms: 5, size: "460m²",
        amenities: [
            { name: "Indoor pool", icon: "indoor_pool" }, { name: "Sauna", icon: "sauna" }, { name: "Fitness/Gym", icon: "gym" },
            { name: "Electric car charger", icon: "ev" }, { name: "Table tennis", icon: "table_tennis" }, { name: "Feeding chair", icon: "feeding_chair" },
            { name: "Air conditioning", icon: "ac" }, { name: "Wi-Fi", icon: "wifi" }, { name: "Towels", icon: "towels" }, { name: "Toiletries", icon: "toiletries" }, { name: "Hair dryer", icon: "hairdryer" }
        ],
        distances: standardDistances, kitchen: standardKitchen
    },
    whitelady: {
        name: "Villa White Lady", location: "Seaside", price: "€110", guests: 11, bedrooms: 6, bathrooms: 2.5, size: "120m²",
        amenities: [
            { name: "Swimming pool", icon: "pool" }, { name: "Jacuzzi", icon: "jacuzzi" }, { name: "Outdoor grill", icon: "grill" },
            { name: "Playground", icon: "playground" }, { name: "Satellite/Cable", icon: "satellite" }, { name: "Iron & Board", icon: "iron" },
            { name: "Wi-Fi", icon: "wifi" }, { name: "Towels", icon: "towels" }, { name: "Toiletries", icon: "toiletries" }, { name: "Hair dryer", icon: "hairdryer" }
        ],
        distances: standardDistances, kitchen: standardKitchen
    },
    tosca: {
        name: "Villa Tosca", location: "Mountains", price: "€350", guests: 8, bedrooms: 8, bathrooms: 4, size: "460m²",
        amenities: [
            { name: "Jacuzzi", icon: "jacuzzi" }, { name: "Fireplace", icon: "fireplace" }, { name: "Outdoor grill", icon: "grill" },
            { name: "Private parking", icon: "parking" }, { name: "Satellite/Cable", icon: "satellite" }, { name: "Iron & Board", icon: "iron" },
            { name: "Air conditioning", icon: "ac" }, { name: "Wi-Fi", icon: "wifi" }, { name: "Towels", icon: "towels" }, { name: "Toiletries", icon: "toiletries" }, { name: "Hair dryer", icon: "hairdryer" }
        ],
        distances: standardDistances, kitchen: standardKitchen
    },
    sunset: {
        name: "Villa Sunset", location: "Mountains", price: "€240", guests: 8, bedrooms: 8, bathrooms: 4, size: "460m²",
        amenities: [
            { name: "Swimming pool", icon: "pool" }, { name: "Outdoor dining table", icon: "outdoor_dining" }, { name: "Electric car charger", icon: "ev" },
            { name: "Playground", icon: "playground" }, { name: "Air conditioning", icon: "ac" }, { name: "Feeding chair", icon: "feeding_chair" },
            { name: "Wi-Fi", icon: "wifi" }, { name: "Towels", icon: "towels" }, { name: "Toiletries", icon: "toiletries" }, { name: "Hair dryer", icon: "hairdryer" }
        ],
        distances: standardDistances, kitchen: standardKitchen
    },
    florence: {
        name: "Villa Florence", location: "Town", price: "€280", guests: 6, bedrooms: 3, bathrooms: 2, size: "180m²",
        amenities: [
            { name: "Fitness/Gym", icon: "gym" }, { name: "Outdoor dining table", icon: "outdoor_dining" }, { name: "Electric car charger", icon: "ev" },
            { name: "Playstation", icon: "playstation" }, { name: "Air conditioning", icon: "ac" }, { name: "Iron & Board", icon: "iron" },
            { name: "Wi-Fi", icon: "wifi" }, { name: "Towels", icon: "towels" }, { name: "Toiletries", icon: "toiletries" }, { name: "Hair dryer", icon: "hairdryer" }
        ],
        distances: standardDistances, kitchen: standardKitchen
    },
    verona: {
        name: "Villa Verona", location: "Town", price: "€310", guests: 10, bedrooms: 5, bathrooms: 4, size: "300m²",
        amenities: [
            { name: "Indoor pool", icon: "indoor_pool" }, { name: "Jacuzzi", icon: "jacuzzi" }, { name: "Boat mooring", icon: "boat" },
            { name: "Playground", icon: "playground" }, { name: "Satellite/Cable", icon: "satellite" }, { name: "Fireplace", icon: "fireplace" },
            { name: "Feeding chair", icon: "feeding_chair" }, { name: "Wi-Fi", icon: "wifi" }, { name: "Towels", icon: "towels" }, { name: "Toiletries", icon: "toiletries" }, { name: "Hair dryer", icon: "hairdryer" }
        ],
        distances: standardDistances, kitchen: standardKitchen
    },
    vinea: {
        name: "Villa Vinea", location: "Village", price: "€150", guests: 6, bedrooms: 3, bathrooms: 2, size: "140m²",
        amenities: [
            { name: "Swimming pool", icon: "pool" }, { name: "Sauna", icon: "sauna" }, { name: "Outdoor grill", icon: "grill" },
            { name: "Private parking", icon: "parking" }, { name: "Table tennis", icon: "table_tennis" }, { name: "Satellite/Cable", icon: "satellite" },
            { name: "Iron & Board", icon: "iron" }, { name: "Wi-Fi", icon: "wifi" }, { name: "Towels", icon: "towels" }, { name: "Toiletries", icon: "toiletries" }, { name: "Hair dryer", icon: "hairdryer" }
        ],
        distances: standardDistances, kitchen: standardKitchen
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([40.7128, -74.0060], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const toggleIconHtml = `
    <div class="custom-toggle-marker">
      <div class="inner-circle"></div>
    </div>
  `;

    const toggleIcon = L.divIcon({
        className: 'custom-toggle-icon',
        html: toggleIconHtml,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    });

    const marker = L.marker([40.7128, -74.0060], {
        icon: toggleIcon,
        draggable: true
    }).addTo(map);

    marker.bindPopup("<b>Selected Location</b>").openPopup();
    map.on('click', function (e) {
        marker.setLatLng(e.latlng);
        marker.openPopup();
    });
});