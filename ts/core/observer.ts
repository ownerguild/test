interface ObserverConfig {
    threshold?: number | number[];
    rootMargin?: string;
    onEnter: (entry: IntersectionObserverEntry) => void;
    onExit?: (entry: IntersectionObserverEntry) => void;
    once?: boolean;
}

export function createObserver(config: ObserverConfig): IntersectionObserver {
    return new IntersectionObserver(
        (entries, observer) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    config.onEnter(entry);
                    if (config.once) {
                        observer.unobserve(entry.target);
                    }
                } else if (config.onExit) {
                    config.onExit(entry);
                }
            }
        },
        {
            threshold: config.threshold ?? 0.2,
            rootMargin: config.rootMargin ?? '0px',
        }
    );
}
