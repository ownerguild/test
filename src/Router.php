<?php

declare(strict_types=1);

class Router
{
    private array $routes = [];

    public function get(string $path, array $handler): void
    {
        $this->routes['GET'][$path] = $handler;
    }

    public function post(string $path, array $handler): void
    {
        $this->routes['POST'][$path] = $handler;
    }

    public function dispatch(string $uri, string $method): void
    {
        $path = parse_url($uri, PHP_URL_PATH) ?: '/';
        $path = rtrim($path, '/') ?: '/';

        $handler = $this->routes[$method][$path] ?? null;

        if ($handler) {
            [$class, $action] = $handler;
            (new $class())->$action();
        } else {
            http_response_code(404);
            echo '404 — Тебя тут не ждали.';
        }
    }
}
