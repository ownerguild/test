<?php

declare(strict_types=1);

require_once __DIR__ . '/src/bootstrap.php';

$router = new Router();
$router->get('/', [HomeController::class, 'index']);
$router->dispatch($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
