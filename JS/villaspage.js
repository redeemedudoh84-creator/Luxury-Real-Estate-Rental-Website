document.addEventListener('DOMContentLoaded', () => {

    const VILLA_LIST = Object.entries(villasData).map(([id, v]) => ({
        id,
        name: v.name,
        country: v.country,
        location: v.location,
        guests: v.guests,
        bedrooms: v.bedrooms,
        bathrooms: v.bathrooms,
        size: v.size,
        priceLabel: v.price,
        priceNum: Number(String(v.price).replace(/[^\d]/g, '')) || 0,
        image: v.image || `/Images/villas/${id}.jpg`,
        amenityNames: v.amenities.map(a => a.name)
    }));

    const p = new URLSearchParams(window.location.search);
    const list = (s) => (s ? s.split(',').filter(Boolean) : []);
    const filters = {
        location: p.get('location') || '',
        adults: Number(p.get('adults')) || 0,
        children: Number(p.get('children')) || 0,
        priceMin: p.has('priceMin') ? Number(p.get('priceMin')) : null,
        priceMax: p.has('priceMax') ? Number(p.get('priceMax')) : null,
        amenities: list(p.get('amenities')),
        regions: list(p.get('regions')),
        villa: p.get('villa') || ''
    };

    function filterVillas() {
        const totalGuests = filters.adults + filters.children;
        return VILLA_LIST.filter(v => {
            if (filters.location && v.country !== filters.location) return false;
            if (totalGuests > 0 && v.guests < totalGuests) return false;
            if (filters.priceMin != null && v.priceNum < filters.priceMin) return false;
            if (filters.priceMax != null && v.priceNum > filters.priceMax) return false;
            if (filters.regions.length && !filters.regions.includes(v.location)) return false;
            if (filters.amenities.length && !filters.amenities.every(a => v.amenityNames.includes(a))) return false;
            return true;
        });
    }

    const resultsGrid = document.getElementById('villasGrid');
    const resultsEmpty = document.getElementById('villasEmpty');
    const resultsCount = document.getElementById('resultsCount');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsSubtitle = document.getElementById('resultsSubtitle');
    const resetSearchBtn = document.getElementById('resetSearchBtn');

    const STORAGE_KEY = 'savedVillas';
    function getSaved() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
        catch (e) { return {}; }
    }

    function setSaved(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }

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

    function renderResults(villas) {
        const n = villas.length;
        resultsCount.textContent = `${n} ${n === 1 ? 'villa' : 'villas'}`;
        resultsSubtitle.textContent = `${n} ${n === 1 ? 'result' : 'results'}`;
        resultsGrid.innerHTML = '';

        if (n === 0) { resultsEmpty.hidden = false; return; }
        resultsEmpty.hidden = true;

        const saved = getSaved();

        for (const v of villas) {
            const isSaved = saved[v.id] ? 'villa-card__heart--active' : '';

            const card = document.createElement('article');
            card.className = 'villas-results__card';
            card.innerHTML = `
                <a class="villas-results__card-link" href="/HTML/villas.html?villa=${v.id}">
                    <div class="villas-results__image-wrapper">
                        <div class="villas-results__card-image" style="background-image:url('${v.image}')"></div>
                        <button class="villa-card__heart ${isSaved}" 
                            data-villa-id="${v.id}"
                            data-villa-name="${v.name}"
                            data-villa-location="${v.location}"
                            data-villa-category="${v.category || 'Villa'}"
                            data-villa-price="${v.priceNum}"
                            data-villa-image="${v.image}"
                            data-villa-guests="${v.guests}"
                            data-villa-bedrooms="${v.bedrooms}"
                            data-villa-bathrooms="${v.bathrooms}"
                            data-villa-sqm="${v.size.replace('m²', '')}"
                            aria-label="Add ${v.name} to favorites">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="villas-results__card-body">
                        <h3 class="villas-results__card-title">${v.name}</h3>
                        <p class="villas-results__card-meta">${v.country} · ${v.location} · ${v.guests} guests · ${v.bedrooms} bd · ${v.bathrooms} ba</p>
                        <p class="villas-results__card-price">${v.priceLabel} / night</p>
                    </div>
                </a>`;

            const heartBtn = card.querySelector('.villa-card__heart');
            heartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const current = getSaved();
                const villaData = {
                    id: heartBtn.dataset.villaId,
                    name: heartBtn.dataset.villaName,
                    location: heartBtn.dataset.villaLocation,
                    category: heartBtn.dataset.villaCategory,
                    price: heartBtn.dataset.villaPrice,
                    image: heartBtn.dataset.villaImage,
                    guests: heartBtn.dataset.villaGuests,
                    bedrooms: heartBtn.dataset.villaBedrooms,
                    bathrooms: heartBtn.dataset.villaBathrooms,
                    sqm: heartBtn.dataset.villaSqm
                };

                if (current[villaData.id]) {
                    delete current[villaData.id];
                    heartBtn.classList.remove('villa-card__heart--active');
                    showToast('Removed from Favourites');
                } else {
                    current[villaData.id] = villaData;
                    heartBtn.classList.add('villa-card__heart--active');
                    showToast('Added to Favourites. Check Saved properties'); 
                }
                setSaved(current);
            });

            resultsGrid.appendChild(card);
        }
    }

    resetSearchBtn.addEventListener('click', () => {
        window.location.href = '/HTML/villaspage.html';
    });

    if (filters.villa) {
        resultsTitle.textContent = 'Villa';
        renderResults(VILLA_LIST.filter(v => v.id === filters.villa));
    } else {
        renderResults(filterVillas());
    }

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const termsCheckbox = document.getElementById('terms');
    const submitBtn = document.getElementById('submitBtn');

    if (submitBtn) {
        function checkFormStatus() {
            const ok = nameInput.value.trim() && emailInput.value.trim() &&
                messageInput.value.trim() && termsCheckbox.checked;
            submitBtn.disabled = !ok;
        }
        nameInput.addEventListener('input', checkFormStatus);
        emailInput.addEventListener('input', checkFormStatus);
        messageInput.addEventListener('input', checkFormStatus);
        termsCheckbox.addEventListener('change', checkFormStatus);
    }
});