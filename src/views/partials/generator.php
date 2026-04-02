<section class="section" id="generator">
    <h2 class="section-header reveal"><?= htmlspecialchars($content['generator']['heading']) ?></h2>
    <p class="section-sub reveal"><?= htmlspecialchars($content['generator']['subheading']) ?></p>

    <div class="generator reveal">
        <div class="generator-output" id="ai-response">
            <?= htmlspecialchars($content['generator']['placeholder']) ?>
        </div>
        <button class="cta-button cta-button--dark" data-ai-trigger>
            <?= htmlspecialchars($content['generator']['button']) ?>
        </button>
    </div>
</section>
