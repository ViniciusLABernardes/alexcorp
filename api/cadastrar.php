<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php'; $server="localhost";
$user='root';
$password="Vinileandro0807200323!";
$name='animesite';
$port=3308;
$connect=mysqli_connect($server, $user, $password, $name, $port); if (!$connect){ die("Connection failed: " . mysqli_connect_error());} $insert=false; if (isset($_GET['username'])){ $userName=$_GET['username']; $checkUsernameQuery="SELECT * FROM cadastro WHERE UserName='$userName'"; $usernameResult=mysqli_query($connect, $checkUsernameQuery); if (mysqli_num_rows($usernameResult) >0){ echo "*nome indisponivel"; exit;} else{ echo "*nome disponivel";}} if (isset($_POST['username'], $_POST['email'], $_POST['password'])){ $userName=$_POST['username']; $email=$_POST['email']; $userPassword=$_POST['password']; $checkEmailQuery="SELECT * FROM cadastro WHERE Email='$email'"; $emailResult=mysqli_query($connect, $checkEmailQuery); if(mysqli_num_rows($emailResult) >0){ echo "Email já cadastrado!";} else{ $hashedPassword=password_hash($userPassword, PASSWORD_DEFAULT); $insert=mysqli_query($connect, "INSERT INTO cadastro (UserName, Email, Senha) VALUES ('$userName','$email','$hashedPassword')"); if ($insert){ $mail=new PHPMailer(true); $mail->isSMTP(); $mail->Host='smtp.gmail.com'; $mail->SMTPAuth=true; $mail->Username='alexcorp883@gmail.com'; $mail->Password='upqgmrcghrouqgto'; $mail->SMTPSecure='ssl'; $mail->Port=465; $mail->setFrom('alexcorp883@gmail.com'); $mail->addAddress($email); $mail->isHTML(true); $mail->Subject='Confirmacao de Cadastro'; $mail->Body='Obrigado por se cadastrar!'; if ($mail->send() & $insert){ echo "Cadastrado com sucesso!";} else{ echo "Erro ao enviar o e-mail de confirmação: " . $mail->ErrorInfo;}} else{ echo "Erro ao cadastrar." . mysqli_error($connect);}}} mysqli_close($connect);
?>