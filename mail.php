<?php
header("Access-Control-Allow-Origin: *");
    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["con_name"]));
        $name = str_replace(array("\r","\n"),array(" "," "),$name);

        $lastname = strip_tags(trim($_POST["con_lastname"]));
        $lastname = str_replace(array("\r","\n"),array(" "," "),$lastname);

        $email = filter_var(trim($_POST["con_email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["con_message"]);
        $check = strip_tags($_POST["check"]);
        $phone = strip_tags($_POST["con_phone"]);
 
        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR empty($check) OR empty($phone) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Por favor complete el formulario e intente nuevamente.";
            exit;
        }
 
        // Set the recipient email address.
        $recipient = "contacto@tikitakaapp.cl";
 
        // Set the email subject.
        $subject = "Formulario de contacto aysoft - Correo desde $name";
 
        // Build the email content.
        $email_content = "Nombre: $name\n";
        $email_content .= "Apellido: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Teléfono: $phone\n\n";
        // $email_content .= "check: $check\n\n";
        $email_content .= "Mensaje:\n$message\n";
 
        // Build the email headers.
        $email_headers = "From: $name <$email>";
 
        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "¡Gracias! Tu mensaje ha sido enviado.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Algo salió mal y no pudimos enviar su mensaje.";
        }
 
    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "Hubo un problema con su envío, vuelva a intentarlo.";
    }
