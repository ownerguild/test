<section class="section section--gray" id="testimonials">
    <h3 class="testimonials-label reveal"><?= htmlspecialchars($content['testimonials']['heading']) ?></h3>

    <?php foreach ($content['testimonials']['quotes'] as $i => $quote): ?>
        <?php if ($i > 0): ?>
            <hr class="testimonial-divider">
        <?php endif; ?>
        <div class="testimonial reveal">
            <blockquote class="testimonial-text">
                &laquo;<?= htmlspecialchars($quote['text']) ?>&raquo;
            </blockquote>
            <p class="testimonial-author">— <?= htmlspecialchars($quote['author']) ?></p>
        </div>
    <?php endforeach; ?>
</section>
