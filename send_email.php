<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// ===== CONFIGURACIÓN =====
$SMTP_USER = getenv('PSICO_SMTP_USER') ?: 'tu_correo_gmail@gmail.com';
$SMTP_PASS = getenv('PSICO_SMTP_PASS') ?: 'xxxx xxxx xxxx xxxx'; // Contraseña de aplicación Gmail
$DESTINO        = 'elicamejo210489@gmail.com';
$DESTINO_NOMBRE = 'Lic. Elizabeth Camejo';
// =========================

header('Content-Type: application/json; charset=utf-8');

function responder($ok, $msg, $redirect = null) {
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&
        strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
        echo json_encode(['success' => $ok, 'message' => $msg]);
        exit();
    }
    $url = $redirect ?: 'index.html';
    $sep = strpos($url, '?') === false ? '?' : '&';
    header("Location: {$url}{$sep}mensaje=" . ($ok ? 'ok' : 'error'));
    exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    responder(false, 'Método no permitido.', 'index.html');
}

$nombre   = trim($_POST['nombre']   ?? '');
$email    = trim($_POST['email']    ?? '');
$telefono = trim($_POST['telefono'] ?? '');
$asunto   = trim($_POST['asunto']   ?? 'Contacto Web');
$mensaje  = trim($_POST['mensaje']  ?? '');

if ($nombre === '' || $email === '' || $asunto === '' || $mensaje === '') {
    responder(false, 'Por favor completa todos los campos obligatorios.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(false, 'El correo electrónico no es válido.');
}

$nombre = preg_replace('/[\r\n]+/', ' ', $nombre);
$email  = preg_replace('/[\r\n]+/', '',  $email);
$asunto = preg_replace('/[\r\n]+/', ' ', $asunto);

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $SMTP_USER;
    $mail->Password   = $SMTP_PASS;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom($SMTP_USER, 'Web Lic. Elizabeth Camejo');
    $mail->addAddress($DESTINO, $DESTINO_NOMBRE);
    $mail->addReplyTo($email, $nombre);

    $mail->isHTML(true);
    $mail->Subject = '[Web Psicología] ' . $asunto . ' - ' . $nombre;

    $h = fn($s) => htmlspecialchars($s, ENT_QUOTES, 'UTF-8');

    $mail->Body = "
    <html><body style='font-family: Arial, sans-serif; color:#333;'>
        <h2 style='color:#7C3AED;'>📩 Nuevo mensaje desde psicologiacamejo.uy</h2>
        <table cellpadding='6' style='border-collapse:collapse;'>
            <tr><td><strong>Nombre:</strong></td><td>"   . $h($nombre)   . "</td></tr>
            <tr><td><strong>Email:</strong></td><td>"    . $h($email)    . "</td></tr>
            <tr><td><strong>Teléfono:</strong></td><td>" . $h($telefono ?: 'No especificado') . "</td></tr>
            <tr><td><strong>Asunto:</strong></td><td>"   . $h($asunto)   . "</td></tr>
        </table>
        <p><strong>Mensaje:</strong></p>
        <p style='background:#F9FAFB; padding:12px; border-radius:8px;'>" . nl2br($h($mensaje)) . "</p>
        <hr>
        <p style='color:#999; font-size:12px;'>Enviado desde el formulario de contacto</p>
    </body></html>";

    $mail->AltBody  = "Nuevo mensaje desde psicologiacamejo.uy\n\n";
    $mail->AltBody .= "Nombre: {$nombre}\n";
    $mail->AltBody .= "Email: {$email}\n";
    $mail->AltBody .= "Teléfono: " . ($telefono ?: 'No especificado') . "\n";
    $mail->AltBody .= "Asunto: {$asunto}\n";
    $mail->AltBody .= "Mensaje: {$mensaje}\n";

    $mail->send();

    responder(true, '¡Mensaje enviado! Te responderé a la brevedad.', 'index.html#contacto');

} catch (Exception $e) {
    error_log("[send_email.php] Error: " . $mail->ErrorInfo);
    responder(false, 'Hubo un problema al enviar el mensaje. Intenta más tarde.');
}