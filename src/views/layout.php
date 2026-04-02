<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($content['site']['title']) ?></title>
    <meta name="description" content="<?= htmlspecialchars($content['site']['description']) ?>">
    <meta property="og:title" content="<?= htmlspecialchars($content['site']['title']) ?>">
    <meta property="og:description" content="<?= htmlspecialchars($content['site']['description']) ?>">
    <meta property="og:type" content="website">
    <meta name="author" content="x0doit">
    <link rel="author" href="https://github.com/x0doit">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🖕</text></svg>">
</head>
<body>
    <?php View::partial('nav', compact('content')) ?>

    <main>
        <?php View::partial('hero', compact('content')) ?>
        <?php View::partial('bento', compact('content')) ?>
        <?php View::partial('specs', compact('content')) ?>
        <?php View::partial('whatnow', compact('content')) ?>
        <?php View::partial('testimonials', compact('content')) ?>
        <?php View::partial('generator', compact('content')) ?>
        <?php View::partial('statement', compact('content')) ?>
    </main>

    <?php View::partial('footer', compact('content')) ?>

    <script>
        window.__phrases = <?= json_encode($content['generator']['phrases'], JSON_UNESCAPED_UNICODE) ?>;
    </script>
    <script src="/js/app.js" defer></script>
</body>
</html>
