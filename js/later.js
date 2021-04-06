function init() {
    //зчитування файл goods.json
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
    var later = {};
    if (localStorage.getItem('later')) {
        // якщо є - розшифровуємо і записуємо в змінну later
        later = JSON.parse(localStorage.getItem('later'));
        for (var key in later) {
            out += '<div class = "cart">';
     
            out += `<p class="name">${data[key].name}</p>`;
            out += `<img src="images/goods/${data[key].img}" alt="">`;
            out += `<div class="cost">${"&#8372;" + data[key].cost}</div>`;
            out += `<a href="goods.html#${key}">Переглянути</a>`;
            out += '</div>';
        }
        $('.goods-out').html(out);
    }
    else{
        $('.goods-out').html('Додайте товар');
    }
   
   
   
}


$(document).ready(function () {
    init();
});
