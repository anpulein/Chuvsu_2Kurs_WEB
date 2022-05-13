/*
* Создаем список карточек всех уровней
 */
const list_cards = {
    christmas: ["Christmas","images/cards/christmas-gift.svg"],
    coffee: ["Coffee","images/cards/coffee.svg.svg"],
    dog: ["Dog","images/cards/dog.svg"],
    dumbbell: ["Dumbbell","images/cards/dumbbell.svg"],
    followers: ["Followers","images/cards/followers.svg"],
    password: ["Password","images/cards/forget-password.svg"],
    healthy: ["Healthy","images/cards/healthy.svg"],
    ice: ["Ise","images/cards/ice-cream.svg"],
    map: ["Map","images/cards/map-location.svg"],
    merry: ["Merry","images/cards/merry-christmas.svg"],
    pocket: ["Pocket","images/cards/pocket-knief.svg"],
    sanitizer: ["Sanitizer","images/cards/sanitizer.svg"],
    santa: ["Santa","images/cards/santa.svg"],
    sneezing: ["Sneezing","images/cards/sneezing.svg"],
    tea: ["Tea","images/cards/tea.svg"],
    wallet: ["Wallet","images/cards/wallet.svg"],
    wash: ["Wash","images/cards/wash-hand.svg"],
    work1: ["Work1","images/cards/work-from-home-1.svg"],
    work2: ["Work2","images/cards/work-from-home-2.svg"],
    working: ["Working","images/cards/working.svg"]
}

const section = document.querySelector('.chuvsu-game');


function creatingCard () {
    for (let i = 1; i <= 20; i++) {
        document.createElement('div').setAttribute("class", "chuvsu-card");
    }
}



// Создаем массив карточек
const cards = document.querySelectorAll('.chuvsu-card');

let isFlippedsCard = false; // Нажатие на 2 карточки
let lockBoard = false; // Предотвращает переворот других карточек
let firstCard, secondCard;

/*
* Функция отвечает за переварот карточки
 */
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip'); // При нажатии на карточку добавляет класс переворота

    // Если нажата карточка, контекст этой карточки передается в firstCard
    if (!isFlippedsCard) {
        isFlippedsCard = true;
        firstCard = this;
        return;
    }

    // Получаем контекст второй карточки, сразу же после первой
    secondCard = this;
    checkForMatch(); // запускаем проверку
}

/*
* Проверка на совпадение первой и второй карточки
 */
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : enableCards();
}

/*
* Карточки одинаковые, события сбросятся чтобы их больше нельзя было переворачивать
 */
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard(); // сброс переменных
}

/*
* Карточки разные, сбрасываются классы переворота и переменные
 */
function enableCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [isFlippedsCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

/*
* Рандомно расставляет карточки на поле
 */
(function randomBoardCards() {
    cards.forEach(card => {
        card.style.order = Math.floor(Math.random() * 12);
    });
})();

/*
* Добавляем на каждую карточку ожидания нажатия на неё
 */
cards.forEach(card => card.addEventListener('click', flipCard));