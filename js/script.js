const wrapper = document.querySelector('.wrapper');
const carousel = document.querySelector('.carousel');
const arrowsBtns = document.querySelectorAll('.wrapper i');
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
let carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Добавляем копии элементов только если их ещё нет
if (carousel.querySelectorAll('.card').length === carouselChildrens.length) {
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
    });

    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML('beforeend', card.outerHTML);
    });
}

carouselChildrens = [...carousel.children];

arrowsBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove('dragging');
};

const autoPlay = () => {
    if (window.innerWidth < 800) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2000);
};
autoPlay();

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add('no-transition');
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove('no-transition');
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add('no-transition');
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove('no-transition');
    }

    clearTimeout(timeoutId);
    if (wrapper.matches(":hover")) autoPlay();
};

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


// Фильтрация книг по жанру
document.querySelectorAll('.genre-filter').forEach(filter => {
    filter.addEventListener('click', () => {
        const genre = filter.textContent.trim();

        document.querySelectorAll('.card-book').forEach(card => {
            card.classList.add('hidden');
        });


        document.querySelectorAll('.card-body').forEach(bookBody => {
            const bookGenre = bookBody.querySelector('.book-genre').textContent.trim();
            if (bookGenre === genre) {
                bookBody.parentElement.classList.remove('hidden');
            }
            else if (genre === "All") {
                bookBody.parentElement.classList.remove('hidden');
            }
        });
    });
});

// Sign in confirmation
document.getElementById('previewButton').addEventListener('click', function (event) {
    event.preventDefault();

    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const birthDate = document.getElementById('birth-date').value;
    const favoriteGenre = document.getElementById('favorite-genre').value;
    const newsletter = document.getElementById('newsletter').checked ? 'Yes' : 'No';

    const confirmationList = document.getElementById('confirmationList');
    confirmationList.innerHTML = `
    <li><strong>Full Name: </strong> &nbsp&nbsp ${fullName}</li>
    <li><strong>Email: </strong> &nbsp&nbsp ${email}</li>
    <li><strong>Password: </strong> &nbsp&nbsp ${'*'.repeat(password.length)}</li>
    <li><strong>Date of Birth: </strong> &nbsp&nbsp ${birthDate}</li>
    <li><strong>Favorite Genre: </strong> &nbsp&nbsp ${favoriteGenre}</li>
    <li><strong>Subscribe to Newsletter: </strong> &nbsp&nbsp ${newsletter}</li>
`;

    $('#registrationModal').modal('hide');
    $('#confirmationModal').modal('show');
});
$(document).ready(function() {
    document.getElementById('confirmButton').addEventListener('click', function() {     
        // Hide the modal
        $('#confirmationModal').modal('hide');    
        // Remove the backdrop
        $('.modal-backdrop').remove();
    });
});