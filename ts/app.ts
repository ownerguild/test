/**
 * Нахуй — Apple-style Satirical Website
 * @author x0doit — https://github.com/x0doit · https://crazydev.pro
 */
import { initScrollReveal } from './modules/scroll-reveal';
import { initParallax } from './modules/parallax';
import { initCounters } from './modules/counters';
import { initNavigation } from './modules/navigation';
import { initGenerator } from './modules/generator';
import { initMicrointeractions } from './modules/microinteractions';
import { initEasterEggs } from './modules/easter-eggs';
import { initPlayer } from './modules/player';

function init(): void {
    initScrollReveal();
    initCounters();
    initNavigation();
    initParallax();
    initMicrointeractions();
    initGenerator();
    initEasterEggs();
    initPlayer();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
