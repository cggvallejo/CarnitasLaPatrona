export const locationsData = [
    {
        id: 1,
        name: "Sucursal Matriz",
        address: "Supermanzana 326 Manzana 2 Lote 9, Jardines del sur 1, 77536 Cancún, Q.R.",
        phone: "998 123 4567",
        hours: "Lunes a Domingo: 8:00 AM - 10:00 PM",
        image: "https://lh3.googleusercontent.com/aida/AOfcidU6z-3n2h6qYf3B4z9z4Z1wz7K7K-F1x4QY4h7Q9P4w8z8z9z-G1x4QY4h7Q9P4w8z8z9z-G1x4QY4h7Q9P4w8z8z9z",
        useImageInsteadOfMap: true,
        staticImage: "https://lh3.googleusercontent.com/p/AF1QipN-_B1yYxy-_B1yYxy-_B1yYxy-_B1yYxy-_B1yYxy=s680-w680-h510",
        iframeUrl: "",
        mapUrl: "https://maps.app.goo.gl/mM8eSoDbh5F6P4F9A",
        lat: 21.1118,
        lng: -86.8778
    },
    {
        id: 2,
        name: "Food Truck",
        address: "Av Huayacán 311, 77533 Cancún, Q.R.",
        phone: "998 987 6543",
        hours: "Viernes a Domingo: 12:00 PM - 11:00 PM",
        image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        iframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500!2d-86.8407!3d21.1070!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA2JzI1LjIiTiA4NsKwNTAnMjYuNSJX!5e0!3m2!1ses-419!2smx!4v1700000000000",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=21.1070,-86.8407",
        lat: 21.1070,
        lng: -86.8407
    }
];

// Calculate Haversine distance in kilometers
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

// Returns the closest branch object from locationsData
export const getClosestBranch = (userLat, userLng) => {
    if (!locationsData || locationsData.length === 0) return null;

    let closest = locationsData[0];
    let minDistance = calculateDistance(userLat, userLng, closest.lat, closest.lng);

    for (let i = 1; i < locationsData.length; i++) {
        const branch = locationsData[i];
        const dist = calculateDistance(userLat, userLng, branch.lat, branch.lng);
        if (dist < minDistance) {
            minDistance = dist;
            closest = branch;
        }
    }
    return closest;
};
