
const cards = document.querySelectorAll('.card'),
    finishButton = document.querySelector('.button-finish'),
    formFinish = document.querySelector('.modal-finish'),
    modalResult = document.querySelector('.modal-result'),
    finish = document.querySelector('.finish'),
    playerName = document.querySelector('.input-finish'),
    end = document.getElementsByClassName('open'),
    data = document.getElementById('data'),
    itemsResult = document.querySelector('.item-result');
    
    
let frontCard = false,
    blockOpen = false,
    firstOpen, secondOpen,
    num = 0,
    items = JSON.parse(localStorage.getItem('items'));

finish.addEventListener('submit', getName);

function getName(e) {
    e.preventDefault();
    const name = e.target.name.value;
    console.log(name);
    console.log(num);
    const item = {
        name: name,
        num: num
    }
    items = items ||[];
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    console.log(item);
    console.log(items);
    displayItems(items, itemsResult);
    formFinish.style.display = "none";
    modalResult.style.display = "flex";
}
function displayItems(data, list) {
    console.log(data);
    if (data.length<=10){
    list.innerHTML = data.map((data, index) => {
       return `<li class="result"><div class="name-result">${data.name}</div> <div class="num-result">${data.num}</div></li>`;
    }).join('');
}
list.innerHTML = data.map((data) => {
     return `<li class="result"><div class="name-result">${data.name}</div> <div class="num-result">${data.num}</div></li>`;
}).slice(-10).join('');

}
function openCard() {
    num++;
    if (blockOpen) return;
    if (this === firstOpen) return;
    this.classList.add('open');
    if (!frontCard) {
        frontCard = true;
        firstOpen = this;
        console.log(num);
        return;
    }
    secondOpen = this;
    check();
    console.log(num);
    if (end.length === 12) {
        data.textContent = num;
        formFinish.style.display = "flex";
    }
}

function check() {
    if (firstOpen.dataset.character === secondOpen.dataset.character) {
        disableCard();
        return;
    }
    close();
}

function disableCard() {
    firstOpen.removeEventListener('click', openCard);
    secondOpen.removeEventListener('click', openCard);
    reset();
}

function close() {
    blockOpen = true;
    setTimeout(() => {
        firstOpen.classList.remove('open');
        secondOpen.classList.remove('open');
        reset();
    }, 500);
}

function reset() {
    frontCard = false;
    blockOpen = false;
    firstOpen = [];
    secondOpen = [];

}

(function mix() {
    cards.forEach(card => {
        let random = Math.floor(Math.random() * 12); // количество блоков
        card.style.order = random;
    });
})();



cards.forEach(card => card.addEventListener('click', openCard));
