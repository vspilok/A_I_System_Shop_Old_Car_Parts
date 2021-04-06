var cart = {};
function loadCart() {
    //Перевіряємо чи є в localStorage запис cart
    if (localStorage.getItem('cart')) {
        // якщо є - розшифровуємо і записуємо в змінну cart
        console.log('showcart1');
        cart = JSON.parse(localStorage.getItem('cart'));
        console.log('showcart2');
        showCart();
       // goodsOut
        console.log('showcart3');
    }
    else{
        $('.main-cart').html('Корзина пуста!');
    }
}

function showCart() {
   
    
    //вивод корзини
    if (!isEmpty(cart)) {
        $('.main-cart').html('Корзина пуста!');
        console.log('showcart4');
    }
    else {
        $.post(
            "admin/core.php", 
                
             { 
                    "action" : "loadGoods"      
             },
             function(data) {
                var goods = JSON.parse(data);
                console.log(goods);
                         var out = '';
                         var allsum=0;
                         for (var id in cart) {
                                    out = "Товарів: "+Object.keys(cart).reduce((total, key) => total += cart[key], 0)+'<br><br><br>';//кількість товарів
                                    
                                }
                         for (var id in cart) {
                             out += `<button data-id="${id}" class="del-goods " >x</button>`;
                             out += `<img src="images/goods\\${goods[id].img}">`;
                             out += ` ${goods[id].name  }`;
                             out += `  <button data-id="${id}" class="minus-goods">-</button>  `;
                             out += ` ${cart[id]}`;
                             out += `  <button data-id="${id}" class="plus-goods">+</button>  `;
                             out += cart[id]*goods[id].cost;
                             out += '<br>';
                             allsum = (cart[id] * goods[id].cost) + allsum;
                         } 
                         
                         out += '<span class="allsum">Всього:' + allsum + '₴</span>';
                         $('.main-cart').html(out);
                       
                    
                         $('.del-goods').on('click', delGoods);
                         $('.plus-goods').on('click', plusGoods);
                         $('.minus-goods').on('click', minusGoods);
                         
               });
        // console.log('showcart5');
        // $.getJSON('goods.json', function (data) {
        //     var goods = data;
        //     var out = '';
        //     var allsum=0;
        //     for (var id in cart) {
        //         out = "Товарів: "+Object.keys(cart).reduce((total, key) => total += cart[key], 0)+'<br>';//кількість товарів
                
        //     }

        //     for (var id in cart) {
        //         console.log('showcart6');
        //         out += `<button data-id="${id}" class="del-goods">x</button>`;
        //         out += `<img src="images/goods\\${goods[id].img}">`;
        //         out += ` ${goods[id].name  }`;
        //         out += `  <button data-id="${id}" class="minus-goods">-</button>  `;
        //         out += ` ${cart[id]  }`;
        //         out += `  <button data-id="${id}" class="plus-goods">+</button>  `;
        //         out += cart[id]*goods[id].cost;
        //         out += '<br>';
        //         allsum = (cart[id] * goods[id].cost) + allsum;
        //         console.log('showcart7');
        //     }
        //     out += '<span class="allsum">Всього:' + allsum + '₴</span>';
        //     $('.main-cart').html(out);
        //     $('.goods-out').html(out);
        //     $('.del-goods').on('click', delGoods);
        //     $('.plus-goods').on('click', plusGoods);
        //     $('.minus-goods').on('click', minusGoods);
        //    // AddTo();
        // });
    }
}
// function init() {
//     //зчитування файл goods.json
//     $.post(
//         "admin/core.php",
//         {
//             "action": "loadGoods"
//         },
//         goodsOut
//     );
// }
// function goodsOut(data) {//виведення товарів на сторінку
//     data = JSON.parse(data);
//     console.log(data);

//     var out = '';
//     var allsum=0;
//     for (var id in cart) {
//         console.log('showcart6');
//         out += `<button data-id="${id}" class="del-goods">x</button>`;
//       //  out += `<img src="images/goods\\${goods[id].img}">`;
//         out += ` ${goods[id].name  }`;
//         out += `  <button data-id="${id}" class="minus-goods">-</button>  `;
//         out += ` ${cart[id]  }`;
//         out += `  <button data-id="${id}" class="plus-goods">+</button>  `;
//         out += cart[id]*goods[id].cost;
//         out += '<br>';
//         allsum = (cart[id] * goods[id].cost) + allsum;
//         console.log('showcart7');
//     }
//     out += '<span class="allsum">Всього:' + allsum + '₴</span>';
//     $('.main-cart').html(out);
//     $('.goods-out').html(out);
//     $('.del-goods').on('click', delGoods);
//     $('.plus-goods').on('click', plusGoods);
//     $('.minus-goods').on('click', minusGoods);
//     AddTo();
// }

// function AddTo() {
//     //додаємо товар в бажане
//     var cart = {};
//     if (localStorage.getItem('cart')) {
//         // якщо є - розшифровуємо і записуємо в змінну cart
//         cart = JSON.parse(localStorage.getItem('cart'));
//     }
    
//     var id = $(this).attr('data-id');
//     cart[id]=1;
//     localStorage.setItem('cart', JSON.stringify(cart));//бажання в строку

// }

function delGoods() {
    //удаляємо товар з корзини
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}
function plusGoods() {
    //додає 1 товар в корзині
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}
function minusGoods() {
    //прибирає 1 товар в корзині
    var id = $(this).attr('data-id');
    if (cart[id]==1) {
        delete cart[id];
    }
    else {
        cart[id]--;
    }
    saveCart();
    showCart();
}

function saveCart() {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
    
}

function isEmpty(object) {
    //перевірка корзини на пустоту
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

function sendEmail() {
    var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    if (ename!='' && email!='' && ephone!='') {
        if (isEmpty(cart)) {
            $.post(
                "core/mail.php",
                {
                    "ename" : ename,
                    "email" : email,
                    "ephone" : ephone,
                    "cart" : cart
                },
                function(data){
                    if (data==1) {
                        alert('Замовлення відправлено');
                    }
                    else {
                        alert('Повторіть замовлення');
                    }
                }
            );
        }
        else {
            alert('Корзина пуста');
        }
    }
    else {
        alert('Заповніть поля');
    }

}

$(document).ready(function () {
   // init();
    loadCart();
    $('.send-email').on('click', sendEmail); // відправити лист з замовленням
 });
