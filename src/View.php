<?php

declare(strict_types=1);

class View
{
    public static function render(string $layout, array $data = []): void
    {
        extract($data, EXTR_SKIP);
        ob_start();
        require VIEWS_DIR . '/' . $layout . '.php';
        echo ob_get_clean();
    }

    public static function partial(string $name, array $data = []): void
    {
        extract($data, EXTR_SKIP);
        require VIEWS_DIR . '/partials/' . $name . '.php';
    }
}
