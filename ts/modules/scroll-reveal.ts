import { $$} from '../core/utils';
import { createObserver } from '../core/observer';

export function initScrollReveal(): void {
    const revealElements = $$('.reveal');
    if (revealElements.length === 0) return;

    const observer = createObserver({
        threshold: 0.15,
        once: true,
        onEnter(entry) {
            entry.target.classList.add('reveal--visible');
        },
    });

    for (const el of revealElements) {
        observer.observe(el);
    }

    // Handle stagger containers — observe the container itself
    const staggerContainers = $$('.reveal--stagger');
    const staggerObserver = createObserver({
        threshold: 0.1,
        once: true,
        onEnter(entry) {
            const children = Array.from(
                entry.target.querySelectorAll<HTMLElement>('.reveal')
            );
            children.forEach((child, i) => {
                child.style.transitionDelay = `${i * 120}ms`;
                child.classList.add('reveal--visible');
            });
        },
    });

    for (const container of staggerContainers) {
        staggerObserver.observe(container);
    }
}
