<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $to = 'evandroalvessanto@gmail.com';
    $subject = 'Nova mensagem do site Saga';
    
    $message = "Nome: " . $data['name'] . "\n";
    $message .= "Email: " . $data['email'] . "\n\n";
    $message .= "Mensagem:\n" . $data['message'];
    
    $headers = 'From: ' . $data['email'] . "\r\n" .
        'Reply-To: ' . $data['email'] . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200);
        echo json_encode(['status' => 'success']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error']);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
}