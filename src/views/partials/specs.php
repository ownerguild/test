<section class="section section--dark" id="stats">
    <h2 class="section-header reveal"><?= $content['specs']['heading'] ?></h2>

    <div class="specs-grid">
        <?php foreach ($content['specs']['items'] as $spec): ?>
            <div class="spec-item reveal">
                <div class="spec-value" data-counter="<?= $spec['counter'] ?>" data-target="<?= $spec['value'] ?>" data-suffix="<?= htmlspecialchars($spec['suffix']) ?>">
                    —
                </div>
                <div class="spec-label"><?= htmlspecialchars($spec['label']) ?></div>
                <p class="spec-desc"><?= htmlspecialchars($spec['desc']) ?></p>
            </div>
        <?php endforeach; ?>
    </div>
</section>
