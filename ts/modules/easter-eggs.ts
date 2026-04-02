import { raf } from '../core/raf';

export function initEasterEggs(): void {
    initContextMenu();
    initKonamiCode();
    initScrollSpeedDetector();
}

function initContextMenu(): void {
    const menu = document.createElement('div');
    menu.className = 'custom-context-menu';
    menu.innerHTML = `
        <div class="context-item" data-action="dismiss">Отстань</div>
        <div class="context-item" data-action="generate">Послать ещё разок</div>
    `;
    document.body.appendChild(menu);

    document.addEventListener('contextmenu', (e: MouseEvent) => {
        e.preventDefault();
        menu.style.left = `${e.clientX}px`;
        menu.style.top = `${e.clientY}px`;

        // Keep menu within viewport
        requestAnimationFrame(() => {
            const rect = menu.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                menu.style.left = `${window.innerWidth - rect.width - 8}px`;
            }
            if (rect.bottom > window.innerHeight) {
                menu.style.top = `${window.innerHeight - rect.height - 8}px`;
            }
            menu.classList.add('custom-context-menu--visible');
        });
    });

    document.addEventListener('click', () => {
        menu.classList.remove('custom-context-menu--visible');
    });

    menu.addEventListener('click', (e) => {
        const target = (e.target as HTMLElement).closest('[data-action]') as HTMLElement;
        if (!target) return;

        const action = target.dataset.action;
        menu.classList.remove('custom-context-menu--visible');

        if (action === 'generate') {
            const generator = document.getElementById('generator');
            if (generator) {
                generator.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    const btn = document.querySelector<HTMLElement>('[data-ai-trigger]');
                    btn?.click();
                }, 800);
            }
        }
    });
}

function initKonamiCode(): void {
    const sequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA',
    ];
    let position = 0;

    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.code === sequence[position]) {
            position++;
            if (position === sequence.length) {
                triggerKonamiEgg();
                position = 0;
            }
        } else {
            position = 0;
        }
    });
}

function triggerKonamiEgg(): void {
    const overlay = document.createElement('div');
    overlay.className = 'easter-egg-overlay';
    const text = document.createElement('div');
    text.className = 'easter-egg-text';
    text.textContent = 'One more thing...';
    overlay.appendChild(text);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        overlay.classList.add('easter-egg-overlay--visible');
    });

    setTimeout(() => {
        text.style.fontWeight = '700';
        text.textContent = 'Нахуй.';
    }, 2000);

    setTimeout(() => {
        overlay.classList.remove('easter-egg-overlay--visible');
        setTimeout(() => overlay.remove(), 800);
    }, 4000);
}

function initScrollSpeedDetector(): void {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let cooldown = false;

    const check = (): void => {
        const now = performance.now();
        const dt = now - lastTime;
        if (dt < 16) return; // Skip if too frequent

        const dy = Math.abs(window.scrollY - lastScrollY);
        const speed = dy / dt;

        if (speed > 8 && !cooldown) {
            showToast('Куда торопишься?');
            cooldown = true;
            setTimeout(() => { cooldown = false; }, 15000);
        }

        lastScrollY = window.scrollY;
        lastTime = now;
    };

    raf.add(check);
}

function showToast(message: string): void {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('toast--visible');
    });

    setTimeout(() => {
        toast.classList.remove('toast--visible');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}
