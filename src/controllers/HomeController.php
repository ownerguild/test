<?php

declare(strict_types=1);

class HomeController
{
    public function index(): void
    {
        $content = require DATA_DIR . '/content.php';
        View::render('layout', ['content' => $content]);
    }
}
