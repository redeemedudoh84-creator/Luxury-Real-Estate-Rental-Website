// document.addEventListener('DOMContentLoaded', () => {

//     document.querySelectorAll('.villa-card__dot[data-image]').forEach(dot => {
//         const preloadImg = new Image();
//         preloadImg.src = dot.getAttribute('data-image');
//     });

//     let toastTimeout;
//     function showToast(message) {
//         let toast = document.getElementById('toast');
//         if (!toast) {
//             toast = document.createElement('div');
//             toast.id = 'toast';
//             toast.className = 'toast';
//             toast.setAttribute('role', 'status');
//             toast.setAttribute('aria-live', 'polite');
//             document.body.appendChild(toast);
//         }
//         toast.textContent = message;

//         void toast.offsetWidth;
//         toast.classList.add('toast--show');
//         clearTimeout(toastTimeout);
//         toastTimeout = setTimeout(() => toast.classList.remove('toast--show'), 2400);
//     }

//     const STORAGE_KEY = 'savedVillas';

//     function getSaved() {
//         try {
//             return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
//         } catch (e) {
//             return {};
//         }
//     }

//     function setSaved(data) {
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
//     }

//     function readVillaData(heartBtn) {
//         const d = heartBtn.dataset;
//         return {
//             id: d.villaId,
//             name: d.villaName,
//             location: d.villaLocation,
//             category: d.villaCategory,
//             price: d.villaPrice,
//             image: d.villaImage,
//             guests: d.villaGuests,
//             bedrooms: d.villaBedrooms,
//             bathrooms: d.villaBathrooms,
//             sqm: d.villaSqm
//         };
//     }

//     const saved = getSaved();

//     document.querySelectorAll('.villa-card__heart').forEach(heartBtn => {
//         const villa = readVillaData(heartBtn);

//         if (saved[villa.id]) {
//             heartBtn.classList.add('villa-card__heart--active');
//         }

//         heartBtn.addEventListener('click', (e) => {
//             e.preventDefault();
//             const current = getSaved();

//             if (current[villa.id]) {
//                 delete current[villa.id];
//                 heartBtn.classList.remove('villa-card__heart--active');
//                 showToast('Removed from Favourites');
//             } else {
//                 current[villa.id] = villa;
//                 heartBtn.classList.add('villa-card__heart--active');
//                 showToast('Added to Favourites. Check Saved Properties');
//             }

//             setSaved(current);
//         });
//     });

//     document.querySelectorAll('.villa-card').forEach(card => {
//         const dots = card.querySelectorAll('.villa-card__dot');
//         const mainImage = card.querySelector('.villa-card__image');
//         if (!dots.length || !mainImage) return;

//         dots.forEach(dot => {
//             dot.addEventListener('click', () => {
//                 dots.forEach(d => d.classList.remove('villa-card__dot--active'));
//                 dot.classList.add('villa-card__dot--active');

//                 const newSrc = dot.getAttribute('data-image');
//                 if (!newSrc) return;

//                 mainImage.style.opacity = '0.4';
//                 setTimeout(() => {
//                     mainImage.src = newSrc;
//                     mainImage.style.opacity = '1';
//                 }, 150);
//             });
//         });
//     });

//     const trackWrapper = document.getElementById('villasTrack');
//     const leftBtn = document.querySelector('.top-pick-villas__nav-btn--left');
//     const rightBtn = document.querySelector('.top-pick-villas__nav-btn--right');

//     if (trackWrapper && leftBtn && rightBtn) {
//         const STEP = 472; 

//         const updateArrows = () => {
//             const maxScroll = trackWrapper.scrollWidth - trackWrapper.clientWidth;
//             leftBtn.disabled = trackWrapper.scrollLeft <= 1;
//             rightBtn.disabled = trackWrapper.scrollLeft >= maxScroll - 1;
//         };

//         leftBtn.addEventListener('click', () => {
//             trackWrapper.scrollBy({ left: -STEP, behavior: 'smooth' });
//         });

//         rightBtn.addEventListener('click', () => {
//             trackWrapper.scrollBy({ left: STEP, behavior: 'smooth' });
//         });

//         trackWrapper.addEventListener('scroll', updateArrows);
//         window.addEventListener('resize', updateArrows);
//         updateArrows();
//     }

//     const savedGrid = document.getElementById('savedGrid');
//     const savedEmpty = document.getElementById('savedEmpty');

//     if (savedGrid && savedEmpty) {
//         const villas = Object.values(getSaved());

//         if (villas.length === 0) {
//             savedEmpty.style.display = 'block';
//             savedGrid.style.display = 'none';
//             return;
//         }

//         savedEmpty.style.display = 'none';
//         savedGrid.style.display = 'flex';

//         villas.forEach(villa => {
//             const card = document.createElement('article');
//             card.className = 'villa-card';
//             card.dataset.villaId = villa.id;
//             card.innerHTML = `
//                 <div class="villa-card__image-wrapper">
//                     <img src="${villa.image}" alt="${villa.name}" class="villa-card__image">
//                     <div class="villa-card__overlay"></div>
//                     <div class="villa-card__badge"><span>From <strong>€${villa.price}</strong> / daily</span></div>
//                     <button class="villa-card__heart villa-card__heart--active"
//                         data-villa-id="${villa.id}"
//                         data-villa-name="${villa.name}"
//                         data-villa-location="${villa.location}"
//                         data-villa-category="${villa.category}"
//                         data-villa-price="${villa.price}"
//                         data-villa-image="${villa.image}"
//                         data-villa-guests="${villa.guests}"
//                         data-villa-bedrooms="${villa.bedrooms}"
//                         data-villa-bathrooms="${villa.bathrooms}"
//                         data-villa-sqm="${villa.sqm}"
//                         aria-label="Remove ${villa.name} from favorites">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
//                     </button>
//                 </div>
//                 <div class="villa-card__content">
//                     <div class="villa-card__location">
//                         <span class="villa-card__country">${villa.location}</span>
//                         <span class="villa-card__separator">•</span>
//                         <span class="villa-card__category">${villa.category}</span>
//                     </div>
//                     <h3 class="villa-card__name">${villa.name}</h3>
//                     <div class="villa-card__amenities">
//                         <div class="villa-card__amenity"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg><span>${villa.guests} guests</span></div>
//                         <div class="villa-card__amenity"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg><span>${villa.bedrooms} bedrooms</span></div>
//                         <div class="villa-card__amenity"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 15l6-6"></path></svg><span>${villa.sqm} m²</span></div>
//                         <div class="villa-card__amenity"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"></path><line x1="10" y1="5" x2="8" y2="7"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="7" y1="19" x2="7" y2="21"></line><line x1="17" y1="19" x2="17" y2="21"></line></svg><span>${villa.bathrooms} bathrooms</span></div>
//                     </div>
//                 </div>
//             `;
//             savedGrid.appendChild(card);

//             const removeBtn = card.querySelector('.villa-card__heart');
//             removeBtn.addEventListener('click', () => {
//                 const current = getSaved();
//                 delete current[villa.id];
//                 setSaved(current);
//                 showToast('Removed from Favourites');
//                 card.style.opacity = '0';
//                 card.style.transform = 'scale(0.95)';
//                 setTimeout(() => {
//                     card.remove();
//                     if (savedGrid.children.length === 0) {
//                         savedGrid.style.display = 'none';
//                         savedEmpty.style.display = 'block';
//                     }
//                 }, 250);
//             });
//         });
//     }

//     const termsCheckbox = document.getElementById('terms');
//     const submitBtn = document.getElementById('submitBtn');
//     if (termsCheckbox && submitBtn) {
//         const toggleSubmit = () => submitBtn.disabled = !termsCheckbox.checked;
//         termsCheckbox.addEventListener('change', toggleSubmit);
//         toggleSubmit();
//     }
// });

document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       1. IMAGE PRELOADING
       ===================================================== */
    document.querySelectorAll('.villa-card__dot[data-image]').forEach(dot => {
        const preloadImg = new Image();
        preloadImg.src = dot.getAttribute('data-image');
    });

    /* =====================================================
       2. TOAST NOTIFICATIONS
       ===================================================== */
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
        toastTimeout = setTimeout(() => toast.classList.remove('toast--show'), 2400);
    }

    /* =====================================================
       3. FAVOURITES (localStorage)
       ===================================================== */
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

    /* =====================================================
       4. HEART ICON TOGGLE (Home page)
       ===================================================== */
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

    /* =====================================================
       5. IMAGE CAROUSEL (dots)
       ===================================================== */
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

    /* =====================================================
       6. CAROUSEL NAVIGATION (buttons + keyboard)
       ===================================================== */
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

        // ---- NEW: Keyboard navigation ----
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

    /* =====================================================
       7. SAVED PROPERTIES PAGE RENDERER
       ===================================================== */
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

        // ---- NEW: Clear All ----
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

    /* =====================================================
       8. CONTACT FORM (safe no-op if elements absent)
       ===================================================== */
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


