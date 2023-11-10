<?php $server="localhost";
$user='root';
$password="Vinileandro0807200323!";
$name='animesite';
$port=3308;
$connect=mysqli_connect($server, $user, $password, $name, $port); if (!$connect){ die("Connection failed: " . mysqli_connect_error());} if ($_SERVER["REQUEST_METHOD"]==="POST"){ if (isset($_POST['token'], $_POST['password'])){ $token=$_POST['token']; $newPassword=$_POST['password']; $checkTokenQuery="SELECT * FROM password_reset_tokens WHERE Token='$token'"; $tokenResult=mysqli_query($connect, $checkTokenQuery); if (mysqli_num_rows($tokenResult) >0){ $row=mysqli_fetch_assoc($tokenResult); $userId=$row['User_id']; $hashedPassword=password_hash($newPassword, PASSWORD_DEFAULT); $updateQuery="UPDATE cadastro SET Senha='$hashedPassword' WHERE Id=$userId"; if (mysqli_query($connect, $updateQuery)){ $deleteTokenQuery="DELETE FROM password_reset_tokens WHERE Token='$token'"; mysqli_query($connect, $deleteTokenQuery); echo "Senha atualizada com sucesso!";} else{ echo "Erro ao atualizar a senha: " . mysqli_error($connect);}} else{ echo "Token inválido ou expirado. Solicite uma nova recuperação de senha.";}} else{ echo "Parâmetros inválidos.";}} mysqli_close($connect);
?>