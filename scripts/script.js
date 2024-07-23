let bagItems;
onLoad();

function onLoad() {
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    displayItemsOnHomePage();
    displayBagIcon();
}

function addToBag(itemId) {
    bagItems.push(itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    displayBagIcon();
}

function displayBagIcon() {
    let bagItemCountElement = document.querySelector('.bag-item-count');
    if(bagItems.length > 0) {
        bagItemCountElement.style.visibility = 'visible';
        bagItemCountElement.innerText = bagItems.length;
    } else {
        bagItemCountElement.style.visibility = 'hidden';
    }
}

function displayItemsOnHomePage() {
    let itemsContainerElement = document.querySelector('.items-container');
    if(!itemsContainerElement) {
        return;
    }
    let innerHTML = '';
    items.forEach(item => {
        innerHTML += `
        <div class="item-container">
        <img class="item-image" src="${item.image}" alt="item image">
        <div class="rating">
        ${item.rating.stars} ⭐ | ${item.rating.count}
        </div>
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
        <span class="current-price">Rs. ${item.current_price}</span>
        <span class="original-price">Rs. ${item.original_price}</span>
        <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div>
        <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
        </div>`
    });

itemsContainerElement.innerHTML = innerHTML;
}





// Banner

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');
    const slideCount = slides.children.length;
    let currentIndex = 0;

    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
        slides.style.opacity = 0;
        setTimeout(() => {
            slides.style.opacity = 1;
        }, 50);
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        showSlide(currentIndex);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.getAttribute('data-index'));
            showSlide(currentIndex);
        });
    });

    setInterval(showNextSlide, 3000); // Change slide every 3 seconds

    showSlide(currentIndex); // Show the first slide initially
});