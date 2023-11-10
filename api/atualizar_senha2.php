<?php
session_start();
$server="localhost";
$user='root';
$password="Vinileandro0807200323!";
$name='animesite';
$port=3308;
$connect=mysqli_connect($server, $user, $password, $name, $port); if (!$connect){ die("Connection failed: " . mysqli_connect_error());} $data=json_decode(file_get_contents('php://input'), true); if (isset($data['username']) && isset($data['newPassword'])){ $username=$data['username']; $newPassword=$data['newPassword']; error_log("Username: " . $username); error_log("New Password: " . $newPassword); $hashedPassword=password_hash($newPassword, PASSWORD_DEFAULT); $updatePasswordQuery="UPDATE cadastro SET Senha='$hashedPassword' WHERE UserName='$username'"; $updateResult=mysqli_query($connect, $updatePasswordQuery); if ($updateResult){ $response=array("status"=>"success", "message"=>"Senha atualizada com sucesso!");} else{ $response=array("status"=>"error", "message"=>"Erro ao atualizar a senha: " . mysqli_error($connect));} header('Content-Type: application/json'); echo json_encode($response);} else{ echo "Parâmetros inválidos!"; error_log("Username: " . $username); error_log("New Password: " . $newPassword);} mysqli_close($connect);
?>