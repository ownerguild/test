import { $ } from '../core/utils';

declare global {
    interface Window {
        __phrases: string[];
    }
}

export function initGenerator(): void {
    const outputEl = $('#ai-response');
    const button = $('[data-ai-trigger]');
    if (!outputEl || !button) return;
    const output: HTMLElement = outputEl;

    const phrases: string[] = window.__phrases || [];
    if (phrases.length === 0) return;

    let lastIndex = -1;
    let cancelToken = 0;        // increments to cancel previous typing/glitch
    const typingSpeed = 35;

    function pickRandom(): string {
        let index: number;
        do {
            index = Math.floor(Math.random() * phrases.length);
        } while (index === lastIndex && phrases.length > 1);
        lastIndex = index;
        return phrases[index];
    }

    function typeText(text: string, token: number): void {
        output.textContent = '';
        output.classList.add('typing-cursor');
        let i = 0;

        function typeNext(): void {
            if (token !== cancelToken) return;  // cancelled
            if (i < text.length) {
                output.textContent += text[i];
                i++;
                const jitter = Math.random() * 30 - 15;
                setTimeout(typeNext, typingSpeed + jitter);
            } else {
                output.classList.remove('typing-cursor');
            }
        }

        typeNext();
    }

    function glitchOut(token: number): Promise<boolean> {
        return new Promise((resolve) => {
            const chars = '!@#$%^&*абвгдежзик';
            const len = output.textContent?.length || 10;
            let passes = 0;

            const glitch = setInterval(() => {
                if (token !== cancelToken) {
                    clearInterval(glitch);
                    resolve(false);
                    return;
                }
                output.textContent = Array.from({ length: len }, () =>
                    chars[Math.floor(Math.random() * chars.length)]
                ).join('');
                passes++;
                if (passes >= 4) {
                    clearInterval(glitch);
                    resolve(true);
                }
            }, 50);
        });
    }

    async function generate(): Promise<void> {
        // Cancel any running animation immediately
        cancelToken++;
        const myToken = cancelToken;

        const phrase = pickRandom();

        // Glitch if there's existing text
        if (output.textContent && output.textContent.length > 3) {
            const ok = await glitchOut(myToken);
            if (!ok) return;  // we got cancelled
        }

        if (myToken !== cancelToken) return;

        // Fade out
        output.style.opacity = '0';

        setTimeout(() => {
            if (myToken !== cancelToken) return;
            output.style.opacity = '1';
            typeText(phrase, myToken);
        }, 150);
    }

    button.addEventListener('click', generate);
}
