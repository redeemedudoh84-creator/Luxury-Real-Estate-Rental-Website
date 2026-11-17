document.addEventListener('DOMContentLoaded', () => {

    let selectedLocation = null;
    let startDate = null;
    let endDate = null;
    let adults = 0, children = 0;
    let hasInteractedWithGuests = false;
    let hasInteractedWithPrice = false;
    const searchBtn = document.querySelector('.hero__search-button');

    function toggleDropdown(field) {
        if (field.classList.contains('is-open')) {
            field.classList.remove('is-open');
        } else {
            closeAllDropdowns();
            field.classList.add('is-open');
        }
    }

    function closeAllDropdowns() {
        document.querySelectorAll('.hero__field').forEach(f => f.classList.remove('is-open'));
    }

    const locationField = document.querySelector('.hero__field--location');
    const locationLabel = locationField.querySelector('.hero__field-label');
    const locationOptions = locationField.querySelectorAll('.hero__dropdown-item');

    locationField.addEventListener('click', (e) => {
        if (e.target.closest('.hero__dropdown-menu')) return;
        toggleDropdown(locationField);
    });

    locationOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            selectedLocation = option.getAttribute('data-value');
            locationLabel.textContent = option.textContent;
            locationLabel.classList.add('is-selected');
            locationField.classList.remove('is-open');
        });
    });

    const datesField = document.querySelector('.hero__field--dates');
    const datesLabel = datesField.querySelector('.hero__field-label');
    const calendarDays = document.getElementById('calendarDays');
    const calendarTitle = document.getElementById('calendarTitle');
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function renderCalendar() {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        calendarTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        calendarDays.innerHTML = '';

        const isCurrentMonth = (currentYear === today.getFullYear() && currentMonth === today.getMonth());
        const isPastMonth = (currentYear < today.getFullYear()) || (currentYear === today.getFullYear() && currentMonth < today.getMonth());
        prevBtn.disabled = isCurrentMonth || isPastMonth;

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'hero__calendar-day is-empty';
            calendarDays.appendChild(emptyDiv);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'hero__calendar-day';
            dayDiv.textContent = i;
            const thisDate = new Date(currentYear, currentMonth, i);

            if (thisDate < today) {
                dayDiv.classList.add('is-past');
            } else {
                if (startDate && endDate) {
                    if (thisDate >= startDate && thisDate <= endDate) {
                        dayDiv.classList.add('is-in-range');
                        if (thisDate.getTime() === startDate.getTime()) dayDiv.classList.add('is-selected', 'range-start');
                        if (thisDate.getTime() === endDate.getTime()) dayDiv.classList.add('is-selected', 'range-end');
                    }
                } else if (startDate && thisDate.getTime() === startDate.getTime()) {
                    dayDiv.classList.add('is-selected');
                }

                dayDiv.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (!startDate || (startDate && endDate)) {
                        startDate = thisDate;
                        endDate = null;
                    } else if (startDate && !endDate) {
                        if (thisDate < startDate) { endDate = startDate; startDate = thisDate; }
                        else { endDate = thisDate; }
                    }
                    updateDateLabel();
                    renderCalendar();
                });
            }
            calendarDays.appendChild(dayDiv);
        }
    }

    function updateDateLabel() {
        if (startDate) {
            const startStr = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            if (endDate) {
                const endStr = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                datesLabel.textContent = `${startStr} - ${endStr}`;
            } else {
                datesLabel.textContent = startStr;
            }
            datesLabel.classList.add('is-selected');
        }
    }

    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); currentMonth--; if (currentMonth < 0) { currentMonth = 11; currentYear--; } renderCalendar(); });

    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); currentMonth++; if (currentMonth > 11) { currentMonth = 0; currentYear++; } renderCalendar(); });

    datesField.addEventListener('click', (e) => { if (e.target.closest('.hero__calendar')) return; toggleDropdown(datesField); });

    renderCalendar();

    const guestsField = document.querySelector('.hero__field--guests');
    const guestsLabel = guestsField.querySelector('.hero__field-label');
    const maxGuests = 12;

    const countAdultsEl = document.getElementById('count-adults');
    const countChildrenEl = document.getElementById('count-children');
    const btnAdultsMinus = document.getElementById('btn-adults-minus');
    const btnAdultsPlus = document.getElementById('btn-adults-plus');
    const btnChildrenMinus = document.getElementById('btn-children-minus');
    const btnChildrenPlus = document.getElementById('btn-children-plus');

    function updateGuestUI() {
        countAdultsEl.textContent = adults;
        countChildrenEl.textContent = children;

        btnAdultsMinus.disabled = adults <= 0;
        btnChildrenMinus.disabled = children <= 0;

        const total = adults + children;
        btnAdultsPlus.disabled = total >= maxGuests;
        btnChildrenPlus.disabled = total >= maxGuests;

        if (hasInteractedWithGuests) {
            let labelText = '';
            if (adults === 0 && children === 0) labelText = '0 Guests';
            else if (children === 0) labelText = adults === 1 ? '1 Guest' : `${adults} Guests`;
            else labelText = `${adults} Adult${adults > 1 ? 's' : ''}, ${children} Child${children > 1 ? 'ren' : ''}`;

            guestsLabel.textContent = labelText;
            guestsLabel.classList.add('is-selected');
        } else {
            guestsLabel.textContent = 'Guests';
            guestsLabel.classList.remove('is-selected');
        }
    }

    btnAdultsPlus.addEventListener('click', (e) => { e.stopPropagation(); if (adults + children < maxGuests) { adults++; hasInteractedWithGuests = true; updateGuestUI(); } });

    btnAdultsMinus.addEventListener('click', (e) => { e.stopPropagation(); if (adults > 0) { adults--; hasInteractedWithGuests = true; updateGuestUI(); } });

    btnChildrenPlus.addEventListener('click', (e) => { e.stopPropagation(); if (adults + children < maxGuests) { children++; hasInteractedWithGuests = true; updateGuestUI(); } });

    btnChildrenMinus.addEventListener('click', (e) => { e.stopPropagation(); if (children > 0) { children--; hasInteractedWithGuests = true; updateGuestUI(); } });

    guestsField.addEventListener('click', (e) => { if (e.target.closest('.hero__counter')) return; toggleDropdown(guestsField); });

    updateGuestUI();

    const priceField = document.querySelector('.hero__field--price');
    const priceLabel = priceField.querySelector('.hero__field-label');
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');
    const priceMinText = document.getElementById('price-min-text');
    const priceMaxText = document.getElementById('price-max-text');
    const sliderTrack = document.getElementById('slider-track');

    function updatePriceUI() {
        let minVal = parseInt(priceMinInput.value);
        let maxVal = parseInt(priceMaxInput.value);

        if (minVal > maxVal - 10) { minVal = maxVal - 10; priceMinInput.value = minVal; }
        if (maxVal < minVal + 10) { maxVal = minVal + 10; priceMaxInput.value = maxVal; }

        priceMinText.textContent = `€${minVal}`;
        priceMaxText.textContent = `€${maxVal}`;

        if (hasInteractedWithPrice) {
            priceLabel.textContent = `€${minVal} - €${maxVal}`;
            priceLabel.classList.add('is-selected');
        } else {
            priceLabel.textContent = 'Price';
            priceLabel.classList.remove('is-selected');
        }

        const minPercent = ((minVal - 110) / (350 - 110)) * 100;
        const maxPercent = ((maxVal - 110) / (350 - 110)) * 100;
        sliderTrack.style.setProperty('--fill-left', `${minPercent}%`);
        sliderTrack.style.setProperty('--fill-width', `${maxPercent - minPercent}%`);
    }

    priceMinInput.addEventListener('input', () => { if (parseInt(priceMinInput.value) > parseInt(priceMaxInput.value) - 10) priceMinInput.value = parseInt(priceMaxInput.value) - 10; hasInteractedWithPrice = true; updatePriceUI(); });

    priceMaxInput.addEventListener('input', () => { if (parseInt(priceMaxInput.value) < parseInt(priceMinInput.value) + 10) priceMaxInput.value = parseInt(priceMinInput.value) + 10; hasInteractedWithPrice = true; updatePriceUI(); });

    priceField.addEventListener('click', (e) => { if (e.target.closest('.hero__price-dropdown')) return; toggleDropdown(priceField); });

    updatePriceUI();

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();

        let missingFields = [];
        if (!selectedLocation) missingFields.push("Location");
        if (!startDate) missingFields.push("Dates");
        if (adults + children < 1) missingFields.push("At least 1 Guest");
        if (!hasInteractedWithPrice) missingFields.push("Price Range");

        if (missingFields.length > 0) {
            const errorMsg = `Please select the following before searching:\n\n• ${missingFields.join('\n• ')}`;
            alert(errorMsg);
            return;
        }

        console.log("Search Validated!", {
            location: selectedLocation,
            start: startDate,
            end: endDate,
            adults: adults,
            children: children,
            priceMin: priceMinInput.value,
            priceMax: priceMaxInput.value
        });
        alert("Search conditions met! Ready to filter the villas.");
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.hero__field')) {
            closeAllDropdowns();
        }
    });

    const addFiltersBtn = document.querySelector('.hero__add-filters');
    const filtersPopup = document.querySelector('.hero__filters-popup');
    const closeFiltersBtn = document.getElementById('closeFilters');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const showVillasBtn = document.getElementById('showVillas');
    const filterCheckboxes = document.querySelectorAll('.hero__filters-label input[type="checkbox"]');

    addFiltersBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeAllDropdowns();
        filtersPopup.classList.toggle('is-open');
    });

    closeFiltersBtn.addEventListener('click', (e) => {
        e.preventDefault();
        filtersPopup.classList.remove('is-open');
    });

    clearFiltersBtn.addEventListener('click', (e) => {
        e.preventDefault();
        filterCheckboxes.forEach(cb => cb.checked = false);
    });

    showVillasBtn.addEventListener('click', (e) => {
        e.preventDefault();
        filtersPopup.classList.remove('is-open');

    });

    filtersPopup.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
        if (!filtersPopup.contains(e.target) && !addFiltersBtn.contains(e.target)) {
            filtersPopup.classList.remove('is-open');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.villa-card__dot[data-image]').forEach(dot => {
        const preloadImg = new Image();
        preloadImg.src = dot.getAttribute('data-image');
    });

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

    const STORAGE_KEY = 'savedVillas';

    function getSaved() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch (e) {
            return {};
        }
    }

    function setSaved(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function readVillaData(heartBtn) {
        const d = heartBtn.dataset;
        return {
            id: d.villaId,
            name: d.villaName,
            location: d.villaLocation,
            category: d.villaCategory,
            price: d.villaPrice,
            image: d.villaImage,
            guests: d.villaGuests,
            bedrooms: d.villaBedrooms,
            bathrooms: d.villaBathrooms,
            sqm: d.villaSqm
        };
    }

    const clearAllBtn = document.getElementById('clearAllBtn');

    const saved = getSaved();

    document.querySelectorAll('.villa-card__heart').forEach(heartBtn => {
        const villa = readVillaData(heartBtn);

        if (saved[villa.id]) {
            heartBtn.classList.add('villa-card__heart--active');
        }

        heartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const current = getSaved();

            if (current[villa.id]) {
                delete current[villa.id];
                heartBtn.classList.remove('villa-card__heart--active');
                showToast('Removed from Favourites');
            } else {
                current[villa.id] = villa;
                heartBtn.classList.add('villa-card__heart--active');
                showToast('Added to Favourites. Check Saved Properties');
            }

            setSaved(current);
        });
    });

    document.querySelectorAll('.villa-card').forEach(card => {
        const dots = card.querySelectorAll('.villa-card__dot');
        const mainImage = card.querySelector('.villa-card__image');
        if (!dots.length || !mainImage) return;

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                dots.forEach(d => d.classList.remove('villa-card__dot--active'));
                dot.classList.add('villa-card__dot--active');

                const newSrc = dot.getAttribute('data-image');
                if (!newSrc) return;

                mainImage.style.opacity = '0.4';
                setTimeout(() => {
                    mainImage.src = newSrc;
                    mainImage.style.opacity = '1';
                }, 150);
            });
        });
    });

    const trackWrapper = document.getElementById('villasTrack');

    const leftBtn = document.querySelector('.top-pick-villas__nav-btn--left');

    const rightBtn = document.querySelector('.top-pick-villas__nav-btn--right');

    if (trackWrapper) {
        const STEP = 472;

        const updateArrows = () => {
            if (!leftBtn || !rightBtn) return;
            const maxScroll = trackWrapper.scrollWidth - trackWrapper.clientWidth;
            leftBtn.disabled = trackWrapper.scrollLeft <= 1;
            rightBtn.disabled = trackWrapper.scrollLeft >= maxScroll - 1;
        };

        if (leftBtn) {
            leftBtn.addEventListener('click', () => {
                trackWrapper.scrollBy({ left: -STEP, behavior: 'smooth' });
            });
        }

        if (rightBtn) {
            rightBtn.addEventListener('click', () => {
                trackWrapper.scrollBy({ left: STEP, behavior: 'smooth' });
            });
        }

        trackWrapper.addEventListener('scroll', updateArrows);
        window.addEventListener('resize', updateArrows);
        updateArrows();

        trackWrapper.setAttribute('tabindex', '0');
        trackWrapper.setAttribute('role', 'region');
        if (!trackWrapper.hasAttribute('aria-label')) {
            trackWrapper.setAttribute('aria-label', 'Villa carousel — use the left and right arrow keys to scroll');
        }

        trackWrapper.addEventListener('keydown', (e) => {
            if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
            e.preventDefault();
            trackWrapper.scrollBy({
                left: e.key === 'ArrowLeft' ? -STEP : STEP,
                behavior: 'smooth'
            });
        });
    }

    const savedGrid = document.getElementById('savedGrid');
    const savedEmpty = document.getElementById('savedEmpty');

    if (savedGrid && savedEmpty) {
        const villas = Object.values(getSaved());

        if (villas.length === 0) {
            savedEmpty.style.display = 'block';
            savedGrid.style.display = 'none';
            if (clearAllBtn) clearAllBtn.style.display = 'none';
            return;
        }

        savedEmpty.style.display = 'none';
        savedGrid.style.display = 'flex';
        if (clearAllBtn) clearAllBtn.style.display = 'inline-flex';

        villas.forEach(villa => {
            const card = document.createElement('article');

            card.className = 'villa-card';

            card.dataset.villaId = villa.id;

            card.innerHTML = `
                <div class="villa-card__image-wrapper">

                    <img src="${villa.image}" alt="${villa.name}" class="villa-card__image">
                    <div class="villa-card__overlay"></div>
                    <div class="villa-card__badge"><span>From <strong>€${villa.price}</strong> / daily</span></div>

                    <button class="villa-card__heart villa-card__heart--active"
                        data-villa-id="${villa.id}"
                        data-villa-name="${villa.name}"
                        data-villa-location="${villa.location}"
                        data-villa-category="${villa.category}"
                        data-villa-price="${villa.price}"
                        data-villa-image="${villa.image}"
                        data-villa-guests="${villa.guests}"
                        data-villa-bedrooms="${villa.bedrooms}"
                        data-villa-bathrooms="${villa.bathrooms}"
                        data-villa-sqm="${villa.sqm}"
                        aria-label="Remove ${villa.name} from favorites">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>

                </div>

                <div class="villa-card__content">

                    <div class="villa-card__location">
                        <span class="villa-card__country">${villa.location}</span>
                        <span class="villa-card__separator">•</span>
                        <span class="villa-card__category">${villa.category}</span>
                    </div>

                    <h3 class="villa-card__name">${villa.name}</h3>

                    <div class="villa-card__amenities">

                        <div class="villa-card__amenity"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg><span>${villa.guests} guests</span></div>

                        <div class="villa-card__amenity"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg><span>${villa.bedrooms} bedrooms</span></div>

                        <div class="villa-card__amenity"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 15l6-6"></path></svg><span>${villa.sqm} m²</span></div>

                        <div class="villa-card__amenity"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"></path><line x1="10" y1="5" x2="8" y2="7"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="7" y1="19" x2="7" y2="21"></line><line x1="17" y1="19" x2="17" y2="21"></line></svg><span>${villa.bathrooms} bathrooms</span></div>

                    </div>
                </div>
            `;

            savedGrid.appendChild(card);

            const removeBtn = card.querySelector('.villa-card__heart');

            removeBtn.addEventListener('click', () => {
                const current = getSaved();

                delete current[villa.id];

                setSaved(current);

                showToast('Removed from Favourites');

                card.style.opacity = '0';

                card.style.transform = 'scale(0.95)';

                setTimeout(() => {
                    card.remove();
                    if (savedGrid.children.length === 0) {
                        savedGrid.style.display = 'none';
                        savedEmpty.style.display = 'block';
                        if (clearAllBtn) clearAllBtn.style.display = 'none';
                    }
                }, 250);
            });
        });

        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => {
                if (!confirm('Remove all saved properties? This cannot be undone.')) return;

                localStorage.removeItem(STORAGE_KEY);
                showToast('All saved properties cleared');

                savedGrid.style.opacity = '0';
                setTimeout(() => {
                    savedGrid.innerHTML = '';
                    savedGrid.style.display = 'none';
                    savedGrid.style.opacity = '1';
                    savedEmpty.style.display = 'block';
                    clearAllBtn.style.display = 'none';
                }, 300);
            });
        }
    }

    const termsCheckbox = document.getElementById('terms');
    const submitBtn = document.getElementById('submitBtn');

    if (termsCheckbox && submitBtn) {
        const toggleSubmit = () => submitBtn.disabled = !termsCheckbox.checked;
        termsCheckbox.addEventListener('change', toggleSubmit);
        toggleSubmit();
    }
});

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const termsCheckbox = document.getElementById('terms');
const submitBtn = document.getElementById('submitBtn');

function checkFormStatus() {
    const hasName = nameInput.value.trim() !== '';
    const hasEmail = emailInput.value.trim() !== '';
    const hasMessage = messageInput.value.trim() !== '';
    const termsAccepted = termsCheckbox.checked;

    if (hasName && hasEmail && hasMessage && termsAccepted) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

nameInput.addEventListener('input', checkFormStatus);
emailInput.addEventListener('input', checkFormStatus);
messageInput.addEventListener('input', checkFormStatus);
termsCheckbox.addEventListener('change', checkFormStatus);

checkFormStatus();


