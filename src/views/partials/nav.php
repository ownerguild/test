<nav id="navbar">
    <div class="nav-inner">
        <a href="#" class="nav-logo"><?= $content['nav']['logo'] ?></a>
        <div class="nav-links" id="nav-links">
            <?php foreach ($content['nav']['links'] as $link): ?>
                <a href="<?= $link['href'] ?>" class="nav-link"><?= $link['text'] ?></a>
            <?php endforeach; ?>
        </div>
        <div class="nav-right">
            <button class="nav-audio" id="player-btn" aria-label="Музыка">
                <span class="nav-eq" id="nav-eq">
                    <i></i><i></i><i></i><i></i>
                </span>
            </button>
            <button class="nav-burger" id="nav-burger" aria-label="Меню">
                <span></span>
                <span></span>
            </button>
        </div>
    </div>
</nav>
<audio id="audio-track" src="/nahui.mp3" loop preload="auto"></audio>
