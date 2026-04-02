import { $, $$ } from '../core/utils';
import { raf } from '../core/raf';
import { clamp } from '../core/utils';
import { createObserver } from '../core/observer';

export function initNavigation(): void {
    const nav = $('#navbar');
    if (!nav) return;

    // Smooth scroll for nav links
    const links = $$('.nav-link');
    for (const link of links) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (!href) return;
            const target = $(href);
            if (target) {
                const top = target.getBoundingClientRect().top + window.scrollY - 48;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    }

    // Nav opacity on scroll
    const onFrame = (): void => {
        const scrollY = window.scrollY;
        const opacity = clamp(0.72 + (scrollY / 200) * 0.2, 0.72, 0.92);
        nav.style.backgroundColor = `rgba(251, 251, 253, ${opacity})`;

        if (scrollY > 10) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    raf.add(onFrame);

    // Active section tracking
    const sections = $$('section[id], .statement[id]');
    const linkMap = new Map<string, HTMLElement>();

    for (const link of links) {
        const href = link.getAttribute('href');
        if (href) linkMap.set(href.slice(1), link);
    }

    const sectionObserver = createObserver({
        threshold: [0, 0.5],
        rootMargin: '-48px 0px 0px 0px',
        onEnter(entry) {
            if (entry.intersectionRatio >= 0.5) {
                const id = entry.target.id;
                for (const link of links) {
                    link.classList.remove('nav-link--active');
                }
                linkMap.get(id)?.classList.add('nav-link--active');
            }
        },
    });

    for (const section of sections) {
        sectionObserver.observe(section);
    }

    // Mobile burger menu
    const burger = $('#nav-burger');
    const navLinks = $('#nav-links');
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-links--open');
            burger.classList.toggle('nav-burger--active');
        });

        // Close menu on link click
        for (const link of links) {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-links--open');
                burger.classList.remove('nav-burger--active');
            });
        }
    }
}
