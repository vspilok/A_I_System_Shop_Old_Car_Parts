<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration</title>
    
   
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
    
    <?php
    require('connect.php');

    if (isset($_POST['username']) && isset($_POST['password'])) {
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        $query = "INSERT INTO users(username, email, password  ) VALUES('$username', '$email', '$password')";
        $result = mysqli_query($connection, $query);

        if ($result) {
            $smgs = "Реєстрація пройшла успішно";
        } else {
            $fsmgs = "Помилка";
        }
    }
    ?>
    <div class="container">
        <form class="form-signin" method="POST">
            <h2>Реєстрація</h2>
            <?php if (isset($smgs)) { ?><div class="alert alert-success" role="alert"><?php echo $smgs; ?> </div><?php } ?>
            <?php if (isset($fsmgs)) { ?><div class="alert alert-danger" role="alert"><?php echo $fsmgs; ?> </div><?php } ?>
            <input type="text" name="username" class="form-control" placeholder="Ім'я" required>
            <input type="email" name="email" class="form-control" placeholder="Email" required>
            <input type="password" name="password" class="form-control" placeholder="Пароль" required>

            <button class="btn btn-lg btn-primary btn-block">Зареєстуватися</button>
            <br>
            <a href="login.php" class="btn btn-lg btn-primary btn-block">Login</a>
        </form>
    </div>
</body>

</html>