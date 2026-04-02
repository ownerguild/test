import { $$ } from '../core/utils';
import { easeOutExpo } from '../core/utils';
import { createObserver } from '../core/observer';

function animatePercent(el: HTMLElement): void {
    const duration = 2000;
    const start = performance.now();

    function tick(now: number): void {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutExpo(progress);
        const value = Math.round(100 * (1 - eased));
        el.textContent = `${value}%`;
        if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}

function animateInfinity(el: HTMLElement): void {
    el.style.transform = 'scale(0)';
    el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    el.textContent = '∞';

    requestAnimationFrame(() => {
        el.style.transform = 'scale(1)';
    });

    setTimeout(() => {
        el.classList.add('spec-value--pulsing');
        el.style.transition = '';
    }, 500);
}

function animateClock(el: HTMLElement): void {
    const duration = 1500;
    const interval = 80;
    const suffix = el.dataset.suffix || '/7';
    let elapsed = 0;

    const timer = setInterval(() => {
        elapsed += interval;
        if (elapsed >= duration) {
            clearInterval(timer);
            el.textContent = `24${suffix}`;
            return;
        }
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        el.textContent = `${h}:${m}`;
    }, interval);
}

export function initCounters(): void {
    const counters = $$('[data-counter]');
    if (counters.length === 0) return;

    const observer = createObserver({
        threshold: 0.3,
        once: true,
        onEnter(entry) {
            const el = entry.target as HTMLElement;
            const type = el.dataset.counter;

            switch (type) {
                case 'percent':
                    animatePercent(el);
                    break;
                case 'infinity':
                    animateInfinity(el);
                    break;
                case 'clock':
                    animateClock(el);
                    break;
            }
        },
    });

    for (const el of counters) {
        observer.observe(el);
    }
}
