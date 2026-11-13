document.addEventListener('DOMContentLoaded', () => {

    const locationField = document.querySelector('.hero__field--location');
    const locationLabel = locationField.querySelector('.hero__field-label');
    const locationOptions = locationField.querySelectorAll('.hero__dropdown-item');

    locationField.addEventListener('click', (e) => {
        if (e.target.classList.contains('hero__dropdown-item')) return;
        closeAllDropdowns();
        locationField.classList.toggle('is-open');
    });

    locationOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
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
    let startDate = null;
    let endDate = null;
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
    datesField.addEventListener('click', (e) => { if (e.target.closest('.hero__calendar')) return; closeAllDropdowns(); datesField.classList.toggle('is-open'); });
    renderCalendar();

    const guestsField = document.querySelector('.hero__field--guests');
    const guestsLabel = guestsField.querySelector('.hero__field-label');
    let adults = 1, children = 0;
    let hasInteractedWithGuests = false;
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
        btnAdultsMinus.disabled = adults <= 1;
        btnChildrenMinus.disabled = children <= 0;
        const total = adults + children;
        btnAdultsPlus.disabled = total >= maxGuests;
        btnChildrenPlus.disabled = total >= maxGuests;

        if (hasInteractedWithGuests) {
            let labelText = children === 0 ? (adults === 1 ? '1 Guest' : `${adults} Guests`) : `${adults} Adult${adults > 1 ? 's' : ''}, ${children} Child${children > 1 ? 'ren' : ''}`;
            guestsLabel.textContent = labelText;
            guestsLabel.classList.add('is-selected');
        } else {
            guestsLabel.textContent = 'Guests';
            guestsLabel.classList.remove('is-selected');
        }
    }

    btnAdultsPlus.addEventListener('click', (e) => { e.stopPropagation(); if (adults + children < maxGuests) { adults++; hasInteractedWithGuests = true; updateGuestUI(); } });
    btnAdultsMinus.addEventListener('click', (e) => { e.stopPropagation(); if (adults > 1) { adults--; hasInteractedWithGuests = true; updateGuestUI(); } });
    btnChildrenPlus.addEventListener('click', (e) => { e.stopPropagation(); if (adults + children < maxGuests) { children++; hasInteractedWithGuests = true; updateGuestUI(); } });
    btnChildrenMinus.addEventListener('click', (e) => { e.stopPropagation(); if (children > 0) { children--; hasInteractedWithGuests = true; updateGuestUI(); } });

    guestsField.addEventListener('click', (e) => { if (e.target.closest('.hero__counter')) return; closeAllDropdowns(); guestsField.classList.toggle('is-open'); });
    updateGuestUI();

    const priceField = document.querySelector('.hero__field--price');
    const priceLabel = priceField.querySelector('.hero__field-label');
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');
    const priceMinText = document.getElementById('price-min-text');
    const priceMaxText = document.getElementById('price-max-text');
    const sliderTrack = document.getElementById('slider-track');
    let hasInteractedWithPrice = false; 

    function updatePriceUI() {
        let minVal = parseInt(priceMinInput.value);
        let maxVal = parseInt(priceMaxInput.value);

        if (minVal > maxVal - 10) {
            minVal = maxVal - 10;
            priceMinInput.value = minVal;
        }
        if (maxVal < minVal + 10) {
            maxVal = minVal + 10;
            priceMaxInput.value = maxVal;
        }

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

    priceMinInput.addEventListener('input', () => {
        if (parseInt(priceMinInput.value) > parseInt(priceMaxInput.value) - 10) {
            priceMinInput.value = parseInt(priceMaxInput.value) - 10;
        }
        hasInteractedWithPrice = true; 
        updatePriceUI();
    });

    priceMaxInput.addEventListener('input', () => {
        if (parseInt(priceMaxInput.value) < parseInt(priceMinInput.value) + 10) {
            priceMaxInput.value = parseInt(priceMinInput.value) + 10;
        }
        hasInteractedWithPrice = true;
        updatePriceUI();
    });

    priceField.addEventListener('click', (e) => {
        if (e.target.closest('.hero__price-dropdown')) return;
        closeAllDropdowns();
        priceField.classList.toggle('is-open');
    });

    updatePriceUI();

    function closeAllDropdowns() {
        locationField.classList.remove('is-open');
        datesField.classList.remove('is-open');
        guestsField.classList.remove('is-open');
        priceField.classList.remove('is-open');
    }

    document.addEventListener('click', (e) => {
        if (!locationField.contains(e.target)) locationField.classList.remove('is-open');
        if (!datesField.contains(e.target)) datesField.classList.remove('is-open');
        if (!guestsField.contains(e.target)) guestsField.classList.remove('is-open');
        if (!priceField.contains(e.target)) priceField.classList.remove('is-open');
    });
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