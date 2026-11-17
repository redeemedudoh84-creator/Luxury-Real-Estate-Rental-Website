window.REGION_VALUES = ["Seaside", "Countryside", "Village", "Town", "Mountains"];

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
    {name: "Sea", icon: "sea", val: "2 km"}, {name: "City", icon: "city", val: "4 km"}, 
    {name: "Market", icon: "market", val: "0.5 km"}, {name: "Airport", icon: "airport", val: "30 km"}, 
    {name: "Restaurant", icon: "restaurant", val: "0.2 km"}, {name: "Ambulance", icon: "ambulance", val: "4 km"}, 
    {name: "Beach", icon: "beach", val: "2 km"}, {name: "Hospital", icon: "hospital", val: "5 km"}
];

const standardKitchen = [
    {name: "Plates", icon: "plate"}, {name: "Refrigerator", icon: "fridge"}, 
    {name: "Cooking utensils", icon: "utensils"}, {name: "Dishwasher", icon: "dishwasher"}, 
    {name: "Coffee machine", icon: "coffee"}, {name: "Oven", icon: "oven"}
];

const villasData = {

    roxane: {
        name: "Villa Roxane", country: "Greece", location: "Seaside", price: "€110", guests: 11, bedrooms: 6, bathrooms: 25, size: "120m²",
        image: "/Images/villas/roxane.png",
        amenities: allAmenities, distances: standardDistances, kitchen: standardKitchen
    },

    luna: {
        name: "Villa Luna", country: "Greece", location: "Seaside", price: "€350", guests: 11, bedrooms: 6, bathrooms: 2.5, size: "120m²",
        image: "/Images/villas/luna.jpg",
        amenities: [
            { name: "Swimming pool", icon: "pool" }, { name: "Outdoor dining table", icon: "outdoor_dining" }, { name: "Playstation", icon: "playstation" },
            { name: "Satellite/Cable", icon: "satellite" }, { name: "Air conditioning", icon: "ac" }, { name: "Iron & Board", icon: "iron" },
            { name: "Fireplace", icon: "fireplace" }, { name: "Wi-Fi", icon: "wifi" }, { name: "Towels", icon: "towels" }, { name: "Toiletries", icon: "toiletries" }, { name: "Hair dryer", icon: "hairdryer" }
        ], distances: standardDistances, kitchen: standardKitchen
    },

    aphrodite: {
        name: "Villa Aphrodite", country: "Greece", location: "Seaside", price: "€240", guests: 12, bedrooms: 6, bathrooms: 5, size: "460m²",
        image: "/Images/villas/aphrodite.png",
        amenities: [
            { name: "Indoor pool", icon: "indoor_pool" }, { name: "Sauna", icon: "sauna" }, { name: "Fitness/Gym", icon: "gym" },
            { name: "Electric car charger", icon: "ev" }, { name: "Table tennis", icon: "table_tennis" }, { name: "Feeding chair", icon: "feeding_chair" },
            { name: "Air conditioning", icon: "ac" }, { name: "Wi-Fi", icon: "wifi" }, { name: "Towels", icon: "towels" }, { name: "Toiletries", icon: "toiletries" }, { name: "Hair dryer", icon: "hairdryer" }
        ], distances: standardDistances, kitchen: standardKitchen
    },

    whitelady: {
        name: "Villa White Lady", country: "Greece", location: "Seaside", price: "€110", guests: 11, bedrooms: 6, bathrooms: 25, size: "120m²",
        image: "/Images/villas/whitelady.jpg",
        amenities: [
            { name: "Swimming pool", icon: "pool" }, { name: "Jacuzzi", icon: "jacuzzi" }, { name: "Outdoor grill", icon: "grill" },
            { name: "Playground", icon: "playground" }, { name: "Satellite/Cable", icon: "satellite" }, { name: "Iron & Board", icon: "iron" },
            { name: "Wi-Fi", icon: "wifi" }, { name: "Towels", icon: "towels" }, { name: "Toiletries", icon: "toiletries" }, { name: "Hair dryer", icon: "hairdryer" }
        ], distances: standardDistances, kitchen: standardKitchen
    },

    thebes: {
        name: "Villa Thebes", country: "Greece", location: "Seaside", price: "€200", guests: 12, bedrooms: 6, bathrooms: 5, size: "460m²",
        image: "/Images/villas/thebes.jpg",
        amenities: [
            { name: "Swimming pool", icon: "pool" }, { name: "Sauna", icon: "sauna" }, { name: "Boat mooring", icon: "boat" },
            { name: "Playstation", icon: "playstation" }, { name: "Air conditioning", icon: "ac" }, { name: "Wi-Fi", icon: "wifi" }, 
            { name: "Towels", icon: "towels" }, { name: "Toiletries", icon: "toiletries" }, { name: "Hair dryer", icon: "hairdryer" }
        ], distances: standardDistances, kitchen: standardKitchen
    },

    makarska: {
        name: "Villa Makarska", country: "Italy", location: "Mountains", price: "€240", guests: 8, bedrooms: 8, bathrooms: 4, size: "460m²",
        image: "/Images/villas/makarska.png",
        amenities: allAmenities, distances: standardDistances, kitchen: standardKitchen
    },

    tosca: {
        name: "Villa Tosca", country: "Italy", location: "Mountains", price: "€350", guests: 8, bedrooms: 8, bathrooms: 4, size: "460m²",
        image: "/Images/villas/tosca.jpg",
        amenities: [
            { name: "Jacuzzi", icon: "jacuzzi" }, { name: "Fireplace", icon: "fireplace" }, { name: "Outdoor grill", icon: "grill" },
            { name: "Private parking", icon: "parking" }, { name: "Satellite/Cable", icon: "satellite" }, { name: "Iron & Board", icon: "iron" },
            { name: "Air conditioning", icon: "ac" }, { name: "Wi-Fi", icon: "wifi" }, { name: "Towels", icon: "towels" }, { name: "Toiletries", icon: "toiletries" }, { name: "Hair dryer", icon: "hairdryer" }
        ], distances: standardDistances, kitchen: standardKitchen
    },

    sunset: {
        name: "Villa Sunset", country: "Italy", location: "Mountains", price: "€240", guests: 8, bedrooms: 8, bathrooms: 4, size: "460m²",
        image: "/Images/villas/sunset.jpg",
        amenities: [
            { name: "Swimming pool", icon: "pool" }, { name: "Outdoor dining table", icon: "outdoor_dining" }, { name: "Electric car charger", icon: "ev" },
            { name: "Playground", icon: "playground" }, { name: "Air conditioning", icon: "ac" }, { name: "Feeding chair", icon: "feeding_chair" },
            { name: "Wi-Fi", icon: "wifi" }, { name: "Towels", icon: "towels" }, { name: "Toiletries", icon: "toiletries" }, { name: "Hair dryer", icon: "hairdryer" }
        ], distances: standardDistances, kitchen: standardKitchen
    },

    soho: {
        name: "Villa SOHO", country: "Spain", location: "Town", price: "€350", guests: 8, bedrooms: 6, bathrooms: 6, size: "270m²",
        image: "/Images/villas/soho.jpg",
        amenities: allAmenities, distances: standardDistances, kitchen: standardKitchen
    },

    florence: {
        name: "Villa Florence", country: "Italy", location: "Town", price: "€280", guests: 6, bedrooms: 3, bathrooms: 2, size: "180m²",
        image: "/Images/villas/florence.jpg",
        amenities: [
            { name: "Fitness/Gym", icon: "gym" }, { name: "Outdoor dining table", icon: "outdoor_dining" }, { name: "Electric car charger", icon: "ev" },
            { name: "Playstation", icon: "playstation" }, { name: "Air conditioning", icon: "ac" }, { name: "Iron & Board", icon: "iron" },
            { name: "Wi-Fi", icon: "wifi" }, { name: "Towels", icon: "towels" }, { name: "Toiletries", icon: "toiletries" }, { name: "Hair dryer", icon: "hairdryer" }
        ], distances: standardDistances, kitchen: standardKitchen
    },

    aura: {
        name: "Villa Aura", country: "Italy", location: "Village", price: "€180", guests: 4, bedrooms: 2, bathrooms: 2, size: "110m²",
        image: "/Images/villas/aura.jpg",
        amenities: allAmenities, distances: standardDistances, kitchen: standardKitchen
    },

    vinea: {
        name: "Villa Vinea", country: "France", location: "Village", price: "€150", guests: 6, bedrooms: 3, bathrooms: 2, size: "140m²",
        image: "/Images/villas/vinea.jpg",
        amenities: [
            { name: "Swimming pool", icon: "pool" }, { name: "Sauna", icon: "sauna" }, { name: "Outdoor grill", icon: "grill" },
            { name: "Private parking", icon: "parking" }, { name: "Table tennis", icon: "table_tennis" }, { name: "Satellite/Cable", icon: "satellite" },
            { name: "Iron & Board", icon: "iron" }, { name: "Wi-Fi", icon: "wifi" }, { name: "Towels", icon: "towels" }, { name: "Toiletries", icon: "toiletries" }, { name: "Hair dryer", icon: "hairdryer" }
        ], distances: standardDistances, kitchen: standardKitchen
    },

    verona: {
        name: "Villa Verona", country: "Italy", location: "Countryside", price: "€310", guests: 10, bedrooms: 5, bathrooms: 4, size: "300m²",
        image: "/Images/villas/verona.jpg",
        amenities: allAmenities, distances: standardDistances, kitchen: standardKitchen
    }
};