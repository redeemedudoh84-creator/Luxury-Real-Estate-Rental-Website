document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const villaId = urlParams.get('villa') || 'soho';
    const villa = villasData[villaId];

    let toastTimeout;
    function showToast(message) {
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'toast';
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        void toast.offsetWidth;
        toast.classList.add('toast--show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => toast.classList.remove('toast--show'), 3500);
    }

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

        if (document.querySelector('[data-icon="save"]')) document.querySelector('[data-icon="save"]').innerHTML = SVG_ICONS.save;

        if (document.querySelector('[data-icon="share"]')) document.querySelector('[data-icon="share"]').innerHTML = SVG_ICONS.share;

        if (document.querySelector('[data-icon="phone"]')) document.querySelector('[data-icon="phone"]').innerHTML = SVG_ICONS.phone;

        if (document.querySelector('[data-icon="mail"]')) document.querySelector('[data-icon="mail"]').innerHTML = SVG_ICONS.mail;

        if (document.querySelector('[data-icon="globe"]')) document.querySelector('[data-icon="globe"]').innerHTML = SVG_ICONS.globe;

        const statsRow = document.getElementById('stats-row');
        if (statsRow) {
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
        }

        const populateList = (elementId, dataArray, formatText) => {
            const list = document.getElementById(elementId);
            if (!list) return;
            list.innerHTML = '';
            dataArray.forEach(item => {
                const div = document.createElement('div');
                div.className = 'icon-list-item';
                div.appendChild(getIcon(item.icon));
                div.appendChild(document.createTextNode(formatText ? formatText(item) : item.name));
                list.appendChild(div);
            });
        };

        populateList('amenities-list', villa.amenities);
        populateList('distances-list', villa.distances, (dist) => `${dist.name} (${dist.val})`);
        populateList('kitchen-list', villa.kitchen);

        const saveBtn = document.getElementById('save-btn');
        const STORAGE_KEY = 'savedVillas';

        const getSaved = () => {
            try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
            catch (e) { return {}; }
        };

        const setSaved = (data) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        };

        const savedData = getSaved();
        if (savedData[villaId]) {
            saveBtn.classList.add('active');
        }

        saveBtn.addEventListener('click', () => {
            const current = getSaved();
            if (current[villaId]) {
                delete current[villaId];
                saveBtn.classList.remove('active');
                showToast('Removed from Favourites');
            } else {
                current[villaId] = {
                    id: villaId,
                    name: villa.name,
                    location: villa.location,
                    category: villa.location,
                    price: villa.price.replace('€', ''),
                    image: `/Images/Index/${villaId}-one.jpg`,
                    guests: villa.guests,
                    bedrooms: villa.bedrooms,
                    bathrooms: villa.bathrooms,
                    sqm: villa.size.replace('m²', '')
                };
                saveBtn.classList.add('active');
                showToast('Added to Favourites. Check Saved Properties');
            }
            setSaved(current);
        });

        const shareBtn = document.getElementById('share-btn');
        const shareModal = document.getElementById('shareModal');
        const closeShareBtn = document.getElementById('closeShare');

        shareBtn.addEventListener('click', () => shareModal.classList.add('active'));
        closeShareBtn.addEventListener('click', () => shareModal.classList.remove('active'));
        shareModal.addEventListener('click', (e) => {
            if (e.target === shareModal) shareModal.classList.remove('active');
        });

        document.getElementById('copyLinkBtn').addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(window.location.href);
                showToast('Link Copied to Clipboard!');
            } catch (err) {
                showToast('Failed to copy link.');
            }
        });

        document.getElementById('shareFacebookBtn').addEventListener('click', () => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
        });

        document.getElementById('shareTwitterBtn').addEventListener('click', () => {
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check out ${villa.name}!`, '_blank');
        });

        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            const locationCoords = {
                "Seaside": [43.1729, 16.4411],
                "Mountains": [43.3499, 17.0500],
                "Town": [43.5081, 16.4402],
                "Village": [43.5147, 16.2210],
                "Countryside": [43.3188, 11.3308],
                "Dalmatia": [43.5081, 16.4402]
            };
            let coords = locationCoords[villa.location] || [43.5081, 16.4402];
            const map = L.map('map').setView(coords, 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap contributors' }).addTo(map);
            L.marker(coords).addTo(map).bindPopup(`<b>${villa.name}</b><br>${villa.location}`).openPopup();
            setTimeout(() => { map.invalidateSize(); }, 100);
        }

        try {
            let rawPrice = villa.price || "€350";
            let numericPrice = parseInt(rawPrice.replace('€', '').trim());
            if (isNaN(numericPrice)) numericPrice = 350;

            const dailyDisplay = document.getElementById('daily-price-display');
            if (dailyDisplay) dailyDisplay.textContent = `From €${numericPrice} / daily`;

            let currentDate = new Date(); currentDate.setDate(1);
            let startDate = null; let endDate = null;

            function renderCalendar() {
                const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const month1 = currentDate.getMonth(); const year1 = currentDate.getFullYear();
                const monthName1 = document.getElementById('month-name-1');
                if (monthName1) monthName1.textContent = `${monthNames[month1]} ${year1}`;
                generateDaysGrid(year1, month1, 'days-grid-1');

                const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
                const month2 = nextMonthDate.getMonth(); const year2 = nextMonthDate.getFullYear();
                const monthName2 = document.getElementById('month-name-2');
                if (monthName2) monthName2.textContent = `${monthNames[month2]} ${year2}`;
                generateDaysGrid(year2, month2, 'days-grid-2');
                updatePriceDisplay();
            }

            function generateDaysGrid(year, month, containerId) {
                const container = document.getElementById(containerId);
                if (!container) return; container.innerHTML = '';
                const firstDay = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                const today = new Date(); today.setHours(0, 0, 0, 0);

                for (let i = 0; i < firstDay; i++) {
                    const emptyDiv = document.createElement('div');
                    emptyDiv.className = 'day empty'; container.appendChild(emptyDiv);
                }
                for (let day = 1; day <= daysInMonth; day++) {
                    const dayDiv = document.createElement('div');
                    dayDiv.className = 'day'; dayDiv.textContent = day;
                    const thisDate = new Date(year, month, day);

                    if (thisDate < today) dayDiv.classList.add('disabled');
                    else dayDiv.addEventListener('click', () => handleDateClick(thisDate));

                    if (startDate && thisDate.getTime() === startDate.getTime()) dayDiv.classList.add('start-date');
                    else if (endDate && thisDate.getTime() === endDate.getTime()) dayDiv.classList.add('end-date');
                    else if (startDate && endDate && thisDate > startDate && thisDate < endDate) dayDiv.classList.add('in-range');
                    container.appendChild(dayDiv);
                }
            }

            function handleDateClick(clickedDate) {
                if (!startDate || (startDate && endDate)) { startDate = clickedDate; endDate = null; }
                else if (startDate && !endDate) {
                    if (clickedDate < startDate) startDate = clickedDate;
                    else if (clickedDate.getTime() === startDate.getTime()) startDate = null;
                    else endDate = clickedDate;
                }
                renderCalendar();
            }

            function updatePriceDisplay() {
                const totalDisplay = document.getElementById('total-price-display');
                if (!totalDisplay) return;
                if (startDate && endDate) {
                    const timeDiff = endDate.getTime() - startDate.getTime();
                    const nights = Math.round(timeDiff / (1000 * 3600 * 24));
                    totalDisplay.textContent = `Total for ${nights} nights: €${nights * numericPrice}`;
                } else if (startDate) totalDisplay.textContent = `Select check-out date`;
                else totalDisplay.textContent = `Select dates`;
            }

            const prevBtn = document.getElementById('prev-month');
            const nextBtn = document.getElementById('next-month');
            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', () => {
                    currentDate.setMonth(currentDate.getMonth() - 1);
                    const today = new Date();
                    if (currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() < today.getMonth()) {
                        currentDate = new Date(); currentDate.setDate(1);
                    }
                    renderCalendar();
                });
                nextBtn.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); });
            }
            renderCalendar();
        } catch (error) { console.error("Calendar error:", error); }
    }

    const termsCheckbox = document.getElementById('terms');
    const submitBtn = document.getElementById('submitBtn');

    if (termsCheckbox && submitBtn) {
        const toggleSubmit = () => submitBtn.disabled = !termsCheckbox.checked;
        termsCheckbox.addEventListener('change', toggleSubmit);
        toggleSubmit();
    }
});

