<section class="section section--gray" id="whatnow">
    <h2 class="section-header reveal"><?= $content['whatnow']['heading'] ?></h2>

    <div class="steps-grid">
        <?php foreach ($content['whatnow']['steps'] as $step): ?>
            <div class="step-card reveal">
                <div class="step-number"><?= $step['number'] ?></div>
                <h3 class="step-title"><?= htmlspecialchars($step['title']) ?></h3>
                <p class="step-desc"><?= htmlspecialchars($step['desc']) ?></p>
            </div>
        <?php endforeach; ?>
    </div>
</section>
