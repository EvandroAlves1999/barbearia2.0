<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $to = 'evandroalvessanto@gmail.com';
    $subject = 'Nova solicitação de consultoria - Saga';
    
    $message = "Nome: " . $data['name'] . "\n";
    $message .= "Email: " . $data['email'] . "\n";
    $message .= "Telefone: " . $data['phone'] . "\n";
    $message .= "Empresa: " . $data['company'] . "\n\n";
    $message .= "Tipo de Projeto: " . $data['projectType'] . "\n";
    $message .= "Orçamento: " . $data['budget'] . "\n";
    $message .= "Prazo Desejado: " . ($data['deadline'] ?? 'Não especificado') . "\n\n";
    $message .= "Descrição do Projeto:\n" . $data['description'];
    
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