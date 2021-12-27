<?php

require './Models/User.php';
@header('Content-Type: application/json');
@header('Access-Control-Allow-Origin: *');
@header("Access-Control-Allow-Headers: *");
@header("Access-Control-Allow-Methods: POST, OPTIONS");

$URI = $_SERVER['REQUEST_URI'];
$parsedUri = explode('/', $URI);
$data = json_decode(file_get_contents('php://input'));

$user = new User();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user->email = $data->email;
    $user->password = $data->password;
    $result = $user->login();
    if (gettype($result) === "boolean")
        echo json_encode(['status' => true]);
    else
        echo json_encode(['status' => false, 'message' => $result]);
} else if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    return true;
}else {
    echo http_response_code(400);
}
