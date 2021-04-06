<?php


// //Block 4
// $dbc = mysqli_connect($host, $user, $password, $dbase)
//     or die("Unable to select database");

// //Block 5
// $query = "SELECT * FROM $table";
// $result = mysqli_query($dbc, $query)
//     or die('Error querying database.');
// $rows = mysqli_num_rows($result); // количество полученных строк

// for ($i = 0; $i < $rows; ++$i) {
//     for ($j = 0 ; $j < 6 ; ++$j) {
//         $message . = "<td>$row[$j]</td>";
//     $row = mysqli_fetch_row($result);
//     $message .= $i[$id]['name'] . ' --- ';
//     $message .= $count . ' --- ';
//     $message .= $count * $i[$id]['cost'];
//     $message .= '<br>';
//     $sum = $sum + $count * $i[$id]['cost'];}
// }
// // foreach ($cart as $id=>$count) {
// //     $message .=$result[$id]['name'].' --- ';
// //     $message .=$count.' --- ';
// //     $message .=$count*$result[$id]['cost'];
// //     $message .='<br>';
// //     $sum = $sum +$count*$result[$id]['cost'];
// // }
// $message .= 'Всього: ' . $sum;
// $message .= '<br>';
// $message .= 'Str: ' . $rows;
// $message .= '<br>';
// $message .= 'hz: ' . $row;




$user = "vspilok_rb";
$password = "retrobaza#1";
$host = "localhost";
$dbase = "vspilok_rb";
$table = "goods";

//Block 2
$from = 'vspilok@gmail.com';

$conn = new mysqli($host, $user, $password, $dbase);
$rows = array();
//Block 5
$sql = "SELECT * FROM $table";

$result = $conn->query($sql) or die("cannot write");
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

$json = json_encode($rows, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); //убираєм шифровку 

//читаємо json файл
//$json = file_get_contents('../goods.json');
$j = json_decode($json, true);


//лист
$message = '';
$message .= '<h1>Замовлення в магазині</h1>';
$message .= '<p>Телефон: ' . $_POST['ephone'] . '</p>';
$message .= '<p>Пошта: ' . $_POST['email'] . '</p>';
$message .= '<p>Клієнт: ' . $_POST['ename'] . '</p>';

$cart = $_POST['cart'];
$sum = 0;

foreach ($cart as $id => $count) {
    $message .= $id.$cart['name'] . ' --- ';
   // $message .= '<br>';
    //$message .= $j[$id]['name'] . ' --- ';
    $message .= $count;
    $message .= '<br>';
    $sum = $sum + $count ;
}
$message .= 'Всього: ' . $sum;

//print_r($message);


$to = 'vspilok@gmail.com' . ','; //пошта отримувача
$to .= $_POST['email'];
$spectext = '<!DOCTYPE HTML><html><head><title>Заказ</title></head><body>';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$m = mail($to, 'Замовлення в магазині', $spectext . $message . '</body></html>', $headers);

if ($m) {
    echo 1;
} else {
    echo 0;
}

// //лист
// $message = '';
// $message .= '<h1>Замовлення в магазині</h1>';
// $message .= '<p>Телефон: ' . $_POST['ephone'] . '</p>';
// $message .= '<p>Пошта: ' . $_POST['email'] . '</p>';
// $message .= '<p>Клієнт: ' . $_POST['ename'] . '</p>';

// $cart = $_POST['cart'];
// $sum = 0;

// foreach ($cart as $id=>$count) {
//     $message .=$json[$id]['name'].' --- ';
//     $message .=$count.' --- ';
//     $message .=$count*$json[$id]['cost'];
//     $message .='<br>';
//     $sum = $sum +$count*$json[$id]['cost'];
// }
// $message .= '<br>';
// $message .= 'Всього: ' . $sum;
// $message .= '<br>';
// $message .= 'json: ' . $json;



// //print_r($message);


// $to = 'vspilok@gmail.com' . ','; //пошта отримувача
// $to .= $_POST['email'];
// $spectext = '<!DOCTYPE HTML><html><head><title>Замовлення</title></head><body>';
// $headers  = 'MIME-Version: 1.0' . "\r\n";
// $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

// $m = mail($to, 'Замовлення в магазині', $spectext . $message . '</body></html>', $headers);

// if ($m) {
//     echo 1;
// } else {
//     echo 0;
// }


mysqli_close($conn);
