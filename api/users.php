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
    if ($_SERVER['REQUEST_METHOD'] === 'GET'){
        if (isset($parsedUri[4])){
            $user->id = $parsedUri[4];
            $usersFromDb = $user->getUserById();
            if ($usersFromDb)
                echo json_encode(['status' => true, 'data' => $user->getUserById()]);
            else
                echo json_encode(['status' => false]);
        } else if ($user->getUsers())
            echo json_encode(['status' => true, 'data' => $user->getUsers()]);
        else
            echo json_encode(['status' => false]);
    } else if ($_SERVER['REQUEST_METHOD'] === 'POST'){
        $user->createUser($data);
        if ($user->insertUser())
            echo json_encode(['status' => true]);
        else
            echo json_encode(['status' => false]);
    } else if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){
        if (isset($parsedUri[4])){
            $user->id = $parsedUri[4];
            if ($user->deleteUserById())
                echo json_encode(['status' => true]);
            else
                echo json_encode(['status' => false]);
        }else{
            return http_response_code(400);
        }
    } else if ($_SERVER['REQUEST_METHOD'] === 'PUT'){
        if (isset($parsedUri[4])){
            $data->id = $parsedUri[4];
            $user->createUser($data);
            if ($user->updateUserById())
                echo json_encode(['status' => true]);
            else
                echo json_encode(['status' => false]);
        } else {
            echo http_response_code(400);
        }  
    } else if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS')
        return http_response_code(200);
    else {
        echo http_response_code(400);
    }
