document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const currentItem = question.parentElement;
            
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== currentItem) {
                currentlyActive.classList.remove('active');
            }

            currentItem.classList.toggle('active');
        });
    });
});