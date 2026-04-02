<?php

declare(strict_types=1);

define('ROOT_DIR', dirname(__DIR__));
define('SRC_DIR', ROOT_DIR . '/src');
define('VIEWS_DIR', SRC_DIR . '/views');
define('DATA_DIR', SRC_DIR . '/data');

spl_autoload_register(function (string $class): void {
    $paths = [
        SRC_DIR . '/' . $class . '.php',
        SRC_DIR . '/controllers/' . $class . '.php',
    ];

    foreach ($paths as $path) {
        if (file_exists($path)) {
            require_once $path;
            return;
        }
    }
});
