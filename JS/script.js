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