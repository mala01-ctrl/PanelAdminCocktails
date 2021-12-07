<?php

require './Models/Cocktail.php';
header('Access-Control-Allow-Origin: *');

$URI = $_SERVER['REQUEST_URI'];
$parsedUri = explode('/', $URI);
$data = json_decode(file_get_contents('php://input'));
header("HTTP/1.1 200 OK");
header('HTTP/1.1 400 Bad Request');


$cocktail = new Cocktail();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($cocktail)) {
        if (isset($parsedUri[4])) {
            $cocktail->id = $parsedUri[4];
            if ($cocktail->getCocktailById() !== NULL)
                echo json_encode(['status' => true, 'data' => $cocktail->getCocktailById()]);
            else
                echo json_encode(['status' => false, 'data' => []]);
        } else {
            echo json_encode($cocktail->getCocktails());
        }
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($data)) {
        $cocktail->createCocktail($data);
        if ($cocktail->insertCocktail())
            echo json_encode(['status' => true]);
        else
            echo json_encode(['status' => false]);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    if (!array_key_exists(4, $parsedUri)){
        echo http_response_code(400);
        exit;
    }
    $cocktail->id = $parsedUri[4];
    if ($cocktail->deleteCocktailById())
        echo json_encode(['status' => true, 'deletedId' => $cocktail->id]);
    else
        echo json_encode(['status' => false]);

} else if ($_SERVER['REQUEST_METHOD'] === 'PUT'){
    if (!array_key_exists(4, $parsedUri)){
        echo http_response_code(400);
        exit;
    }
    $cocktail->id = $parsedUri[4];
    $cocktail->createCocktail($data);
    if ($cocktail->updateCocktailById())
        echo json_encode(['status' => true, 'updatedId' => $cocktail->id]);
    else
        echo json_encode(['status' => false]);
}else {
    echo http_response_code(400);
}
