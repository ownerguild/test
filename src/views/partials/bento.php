<section class="section" id="why">
    <h2 class="section-header reveal"><?= $content['features']['heading'] ?></h2>

    <div class="bento-grid reveal--stagger">
        <?php foreach ($content['features']['cards'] as $card): ?>
            <div class="card reveal<?= $card['dark'] ? ' card--dark' : '' ?>">
                <div>
                    <div class="card-label"><?= htmlspecialchars($card['label']) ?></div>
                    <div class="card-title"><?= $card['title'] ?></div>
                </div>
                <div class="card-desc"><?= htmlspecialchars($card['desc']) ?></div>
            </div>
        <?php endforeach; ?>
    </div>
</section>
