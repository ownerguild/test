<section class="section">
    <div class="bento-grid bento-grid--2 reveal--stagger">
        <?php foreach ($content['accessories']['items'] as $item): ?>
            <div class="card card--light reveal">
                <div>
                    <div class="card-label"><?= htmlspecialchars($item['label']) ?></div>
                    <div class="card-title"><?= $item['title'] ?></div>
                </div>
                <div class="card-desc"><?= htmlspecialchars($item['desc']) ?></div>
            </div>
        <?php endforeach; ?>
    </div>
</section>
