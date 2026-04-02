<section class="section section--gray" id="products">
    <h2 class="section-header reveal"><?= $content['products']['heading'] ?></h2>

    <div class="products-grid">
        <?php foreach ($content['products']['items'] as $product): ?>
            <div class="product-card reveal">
                <div class="product-badge" style="background: <?= $product['color'] ?>">
                    <?= htmlspecialchars($product['name']) ?>
                </div>
                <h3 class="product-name"><?= htmlspecialchars($product['tagline']) ?></h3>
                <p class="product-slogan"><?= htmlspecialchars($product['slogan']) ?></p>
                <p class="product-desc"><?= htmlspecialchars($product['desc']) ?></p>
                <div class="product-price">
                    <span class="product-price-label">Цена:</span>
                    <span class="product-price-value"><?= htmlspecialchars($product['price']) ?></span>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</section>
