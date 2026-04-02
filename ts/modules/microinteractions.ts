import { $$ } from '../core/utils';

export function initMicrointeractions(): void {
    initCardTilt();
    initButtonRipple();
}

function initCardTilt(): void {
    const cards = $$('.card');

    for (const card of cards) {
        card.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const normalX = (x / rect.width) * 2 - 1;
            const normalY = (y / rect.height) * 2 - 1;

            const rotateY = normalX * 3;
            const rotateX = -normalY * 3;

            card.style.transform =
                `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
            card.style.boxShadow =
                `${-normalX * 8}px ${-normalY * 8}px 30px rgba(0,0,0,0.06)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
            card.style.boxShadow = '';
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        });
    }
}

function initButtonRipple(): void {
    const buttons = $$('.cta-button');

    for (const btn of buttons) {
        btn.addEventListener('click', (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            btn.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    }
}
