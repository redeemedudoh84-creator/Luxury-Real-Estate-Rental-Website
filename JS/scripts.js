document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const villaId = urlParams.get('villa') || 'soho'; 

    const villa = villasData[villaId];

    const getIcon = (iconName) => {
        const wrapper = document.createElement('span');
        wrapper.className = 'svg-icon';
        wrapper.innerHTML = SVG_ICONS[iconName] || '';
        return wrapper;
    };

    if (villa) {
        document.getElementById('villa-name').textContent = villa.name;
        document.getElementById('price-tag').textContent = `From ${villa.price} / daily`;
        document.getElementById('location').textContent = villa.location;
        document.title = villa.name + " - Luxury Rental";

        document.querySelector('[data-icon="save"]').innerHTML = SVG_ICONS.save;
        document.querySelector('[data-icon="share"]').innerHTML = SVG_ICONS.share;

        const statsRow = document.getElementById('stats-row');
        statsRow.innerHTML = ''; 
        const statsData = [
            { icon: 'guests', text: `${villa.guests} guests` },
            { icon: 'bed', text: `${villa.bedrooms} bedrooms` },
            { icon: 'bath', text: `${villa.bathrooms} bathrooms` },
            { icon: 'size', text: villa.size }
        ];
        statsData.forEach(stat => {
            const span = document.createElement('span');
            span.className = 'stat-item';
            span.appendChild(getIcon(stat.icon));
            span.appendChild(document.createTextNode(stat.text));
            statsRow.appendChild(span);
        });

        const amenitiesList = document.getElementById('amenities-list');
        amenitiesList.innerHTML = ''; 
        villa.amenities.forEach(amenity => {
            const div = document.createElement('div');
            div.className = 'icon-list-item'; // Apply the specific class for alignment
            div.appendChild(getIcon(amenity.icon)); // Use the specific amenity icon
            div.appendChild(document.createTextNode(amenity.name));
            amenitiesList.appendChild(div);
        });

        const distancesList = document.getElementById('distances-list');
        distancesList.innerHTML = '';
        villa.distances.forEach(dist => {
            const div = document.createElement('div');
            div.className = 'icon-list-item';
            div.appendChild(getIcon(dist.icon));
            div.appendChild(document.createTextNode(`${dist.name} (${dist.val})`));
            distancesList.appendChild(div);
        });

        const kitchenList = document.getElementById('kitchen-list');
        kitchenList.innerHTML = '';
        villa.kitchen.forEach(item => {
            const div = document.createElement('div');
            div.className = 'icon-list-item';
            div.appendChild(getIcon(item.icon));
            div.appendChild(document.createTextNode(item.name));
            kitchenList.appendChild(div);
        });

        document.querySelector('[data-icon="phone"]').innerHTML = SVG_ICONS.phone;
        document.querySelector('[data-icon="mail"]').innerHTML = SVG_ICONS.mail;
        document.querySelector('[data-icon="globe"]').innerHTML = SVG_ICONS.globe;
    }
});