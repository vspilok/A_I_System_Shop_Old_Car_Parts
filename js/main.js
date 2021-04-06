var cart = {}; // корзина

function init() {
    
    //зчитування файл goods.json
     // $.getJSON("goods.json", goodsOut);
    $.post(
        "admin/core.php",
        {
            "action": "loadGoods"
        },
        goodsOut
    );
}

function goodsOut(data) {//виведення товарів на сторінку
    data = JSON.parse(data);
    console.log(data);

    var out = '';
    for (var key in data) {
        out += '<div class = "cart">';
        out += `<button class="later" data-id="${key}" >&#9829;</button>`;
        out += `<p class="name"><a href="goods.html#${key}">${data[key].name}</a></p>`;
        out += `<img src="images/goods/${data[key].img}" alt="">`;
        out += `<div class="cost">${"&#8372;" + data[key].cost}</div>`;
        out += `<button class="add-to-cart" data-id="${key}" >Купити</button>`;
        out += '</div>';
    }
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);
    $('.later').on('click', AddToLater);
}

function AddToLater() {
    //додаємо товар в бажане
    var later = {};
    if (localStorage.getItem('later')) {
        // якщо є - розшифровуємо і записуємо в змінну cart
        later = JSON.parse(localStorage.getItem('later'));
    }
    alert('додано в бажання');
    var id = $(this).attr('data-id');
    later[id]=1;
    localStorage.setItem('later', JSON.stringify(later));//бажання в строку

}
function addToCart() {
    //додаємо товар в корзину
    var id = $(this).attr('data-id');
    //  console.log(id);
    if (cart[id] == undefined) {
        cart[id] = 1; //якщо корзина пуста - =1
    }
    else {
        cart[id]++; //якщо товар є то +1
    }
    //console.log(cart);
    showMiniCart();
    saveCart();
}
function saveCart() {
    //зберігаю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
    console.log('cart to string');
}
function showMiniCart() {
    //показуємо міні корзину
    var out = "";
    for (var key in cart) {
        out = "Товарів: " + Object.keys(cart).reduce((total, key) => total += cart[key], 0) + '<br>';//кількість товарів
        //out += key +' --- '+ cart[key]+'<br>';//список товарів з кількістю 
    }

    //вивод кода товара з кількістю
    // for (var key in cart) {

    //     out += key+ ' --- ' + cart[key] + '<br>';//список товарів з кількістю 
    // }
    $('.mini-cart').html(out);
}
function loadCart() {
    //Перевіряємо чи є в localStorage запис cart
    if (localStorage.getItem('cart')) {
        // якщо є - розшифровуємо і записуємо в змінну cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}

$(document).ready(function () {
    init();
    loadCart();
});
