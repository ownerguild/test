export function $(selector: string, parent: Element | Document = document): HTMLElement | null {
    return parent.querySelector<HTMLElement>(selector);
}

export function $$(selector: string, parent: Element | Document = document): HTMLElement[] {
    return Array.from(parent.querySelectorAll<HTMLElement>(selector));
}

export function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}

export function easeOutExpo(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, factor: number): number {
    return start + (end - start) * factor;
}

export function throttle<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
    let last = 0;
    return function (this: unknown, ...args: unknown[]) {
        const now = Date.now();
        if (now - last >= ms) {
            last = now;
            fn.apply(this, args);
        }
    } as T;
}
