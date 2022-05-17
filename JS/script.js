/*
* Создаем список карточек всех уровней
 */
let list_cards = new Map();

list_cards.set("Christmas","images/cards/christmas-gift.svg");
list_cards.set("Coffee","images/cards/coffee.svg");
list_cards.set("Dog","images/cards/dog.svg");
list_cards.set("Dumbbell","images/cards/dumbbell.svg");
list_cards.set("Followers","images/cards/followers.svg");
list_cards.set("Password","images/cards/forget-password.svg");
list_cards.set("Healthy","images/cards/healthy.svg");
list_cards.set("Ise","images/cards/ice-cream.svg");
list_cards.set("Map","images/cards/map-location.svg");
list_cards.set("Merry","images/cards/merry-christmas.svg");
list_cards.set("Pocket","images/cards/pocket-knief.svg");
list_cards.set("Sanitizer","images/cards/sanitizer.svg");
list_cards.set("Santa","images/cards/santa.svg");
list_cards.set("Sneezing","images/cards/sneezing.svg");
list_cards.set("Tea","images/cards/tea.svg");
list_cards.set("Wallet","images/cards/wallet.svg");
list_cards.set("Wash","images/cards/wash-hand.svg");
list_cards.set("Work1","images/cards/work-from-home-1.svg");
list_cards.set("Work2","images/cards/work-from-home-2.svg");
list_cards.set("Working","images/cards/working.svg");

/*
* Словарь наименования всех карточек
 */
const list_cards_names = {
    1: "Christmas",
    2: "Coffee",
    3: "Dog",
    4: "Dumbbell",
    5: "Followers",
    6: "Password",
    7: "Healthy",
    8: "Ise",
    9: "Map",
    10: "Merry",
    11: "Pocket",
    12: "Sanitizer",
    13: "Santa",
    14: "Sneezing",
    15: "Tea",
    16: "Wash",
    17: "Wallet",
    18: "Work1",
    19: "Work2",
    20: "Working"
}

// const settings = {
//     2: [],
//     3: [],
//     5: [], creatingCard
//
// }

const section = document.querySelector('.chuvsu-game');

/*
* Создание карточек
 */
function creatingCard(card, index) {
    card.classList.add("chuvsu-card");
    card.setAttribute("data-framework", list_cards_names[index].toLowerCase());

    let image_1 = document.createElement('img');
    image_1.classList.add("front-face");
    image_1.setAttribute("src", list_cards.get(list_cards_names[index]));
    image_1.setAttribute("alt", list_cards_names[index]);
    card.appendChild(image_1);

    let image_2 = document.createElement('img');
    image_2.classList.add("back-face");
    image_2.setAttribute("src", "images/chuvsu.svg");
    image_2.setAttribute("alt", "Memory card");
    card.appendChild(image_2);

    return card;

}


/*
* Добавление карточек на поле
 */
function addCards () {
    for (let i = 1; i <= 9; i++) {
        let card = creatingCard(document.createElement('div'), i);

        section.appendChild(card);
        section.appendChild(card.cloneNode(true));


    }
}


addCards();


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