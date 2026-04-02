import { $ } from '../core/utils';

export function initPlayer(): void {
    const _a = document.getElementById('audio-track') as HTMLAudioElement | null;
    const _b = $('#player-btn');
    const _e = $('#nav-eq');
    if (!_a || !_b || !_e) return;

    const audio: HTMLAudioElement = _a;
    const btn: HTMLElement = _b;
    const eq: HTMLElement = _e;

    let started = false;

    function setPlaying(v: boolean): void {
        eq.classList.toggle('nav-eq--paused', !v);
    }

    // Start paused visually
    setPlaying(false);

    function start(): void {
        if (started) return;
        started = true;
        audio.volume = 0.7;
        audio.play().then(() => setPlaying(true)).catch(() => { started = false; setPlaying(false); });
    }

    // Try autoplay immediately
    audio.volume = 0.7;
    audio.play().then(() => {
        started = true;
        setPlaying(true);
    }).catch(() => {
        // Blocked — start on first click anywhere
        document.addEventListener('click', () => start(), { once: true });
        document.addEventListener('touchstart', () => start(), { once: true });
        document.addEventListener('keydown', () => start(), { once: true });
    });

    // Toggle play/pause
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!started) {
            start();
            return;
        }
        if (audio.paused) {
            audio.play().then(() => setPlaying(true));
        } else {
            audio.pause();
            setPlaying(false);
        }
    });
}
