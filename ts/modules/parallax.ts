import { $ } from '../core/utils';
import { raf } from '../core/raf';
import { createObserver } from '../core/observer';

interface ParallaxTarget {
    element: HTMLElement;
    speed: number;
    sectionTop: number;
    sectionHeight: number;
}

export function initParallax(): void {
    const targets: ParallaxTarget[] = [];

    const heroTitle = $('.hero-title');
    const heroSub = $('.hero-sub');
    const statementTitle = $('.statement-title');

    if (heroTitle) {
        const hero = heroTitle.closest('.hero') as HTMLElement;
        if (hero) {
            targets.push({
                element: heroTitle,
                speed: 0.3,
                sectionTop: hero.offsetTop,
                sectionHeight: hero.offsetHeight,
            });
        }
    }

    if (heroSub) {
        const hero = heroSub.closest('.hero') as HTMLElement;
        if (hero) {
            targets.push({
                element: heroSub,
                speed: 0.15,
                sectionTop: hero.offsetTop,
                sectionHeight: hero.offsetHeight,
            });
        }
    }

    if (statementTitle) {
        const section = statementTitle.closest('.statement') as HTMLElement;
        if (section) {
            targets.push({
                element: statementTitle,
                speed: 0.2,
                sectionTop: section.offsetTop,
                sectionHeight: section.offsetHeight,
            });
        }
    }

    if (targets.length === 0) return;

    let active = false;

    const onFrame = (): void => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        for (const t of targets) {
            const relativeScroll = scrollY - t.sectionTop + vh;
            const center = t.sectionHeight / 2;
            const offset = (relativeScroll - center) * t.speed;
            t.element.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
    };

    const activate = (): void => {
        if (!active) {
            active = true;
            raf.add(onFrame);
        }
    };

    const deactivate = (): void => {
        if (active) {
            active = false;
            raf.remove(onFrame);
        }
    };

    const sections = [
        heroTitle?.closest('.hero'),
        statementTitle?.closest('.statement'),
    ].filter(Boolean) as HTMLElement[];

    let visibleCount = 0;

    const observer = createObserver({
        threshold: 0,
        rootMargin: '200px',
        onEnter() {
            visibleCount++;
            activate();
        },
        onExit() {
            visibleCount--;
            if (visibleCount <= 0) {
                visibleCount = 0;
                deactivate();
            }
        },
    });

    for (const section of sections) {
        observer.observe(section);
    }

    // Recalculate positions on resize
    window.addEventListener('resize', () => {
        for (const t of targets) {
            const section = t.element.closest('section, .hero, .statement') as HTMLElement;
            if (section) {
                t.sectionTop = section.offsetTop;
                t.sectionHeight = section.offsetHeight;
            }
        }
    });
}
