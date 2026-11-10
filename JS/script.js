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

document.addEventListener('DOMContentLoaded', () => {
    const villaCards = document.querySelectorAll('.villa-card');

    villaCards.forEach(card => {
        const dots = card.querySelectorAll('.villa-card__dot');
        const mainImage = card.querySelector('.villa-card__image');

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                dots.forEach(d => d.classList.remove('villa-card__dot--active'));
                
                dot.classList.add('villa-card__dot--active');
                const newImageSrc = dot.getAttribute('data-image');
                if (newImageSrc && mainImage) {
                    mainImage.style.opacity = '0.5';
                    setTimeout(() => {
                        mainImage.src = newImageSrc;
                        mainImage.style.opacity = '1';
                    }, 150);
                }
            });
        });
    });
});