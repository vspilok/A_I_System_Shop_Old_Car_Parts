<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">

    <link rel="icon" type="image/png" href="images/logo/mini-logo.png" />
    <style>
        .form-signin {
            max-width: 400px;
            padding: 15px;
            margin: 0 auto;

        }
    </style>
</head>

<body>



    <div class="container">
        <form class="form-signin" method="POST">
            <h2>Вхід</h2>

            <input type="text" name="username" class="form-control" placeholder="Ім'я" required>

            <input type="password" name="password" class="form-control" placeholder="Пароль" required>

            <button class="btn btn-lg btn-primary btn-block">Вхід</button>
            <br>
            <a href="reg.php" class="btn btn-lg btn-primary btn-block">Реєстрація</a>
            <br>
            

        </form>
    </div>


    <div align="center">
    <?php
    session_start();
    require('connect.php');

    if (isset($_POST['username'])and isset($_POST['password'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $query = "SELECT * FROM users WHERE username='$username' and password='$password'";
        $result = mysqli_query($connection, $query) or die(mysqli_error($connection));
        $count = mysqli_num_rows($result);
        if ($count == 1) {
            $_SESSION['username'] = $username;
        } else {
            $fsmgs = "Помилка";
        }
        
    }
    if(isset($_SESSION['username'])){
        $username = $_SESSION['username'];
        
        echo "\n Привіт ", $username , "";
        echo " \nВи увійшли в аккаунт\n";
        echo "<a href='../admin/admin.html' class='btn btn-lg btn-primary btn-block'>Admin</a>";

        echo "<a href='../index.html' class='btn btn-lg btn-primary btn-block'  > Вийти</a>";
       
    }
    ?>
    </div>
</body>

</html>