<div class="player" id="player">
    <div class="player-eq">
        <span></span><span></span><span></span>
    </div>
    <button class="player-playpause" id="player-btn" aria-label="Пауза">
        <svg class="player-ico player-ico--pause" width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
            <rect x="0" y="0" width="2.5" height="10" rx="0.8"/>
            <rect x="5.5" y="0" width="2.5" height="10" rx="0.8"/>
        </svg>
        <svg class="player-ico player-ico--play" width="8" height="10" viewBox="0 0 8 10" fill="currentColor" style="display:none">
            <path d="M0 0.8C0 0.3 0.5 0 1 0.3L7.5 4.5C8 4.8 8 5.2 7.5 5.5L1 9.7C0.5 10 0 9.7 0 9.2V0.8Z"/>
        </svg>
    </button>
</div>
<audio id="audio-track" src="/nahui.mp3" loop preload="auto"></audio>
