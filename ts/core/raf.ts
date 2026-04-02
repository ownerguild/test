type FrameCallback = (timestamp: number) => void;

class RafScheduler {
    private callbacks = new Set<FrameCallback>();
    private running = false;
    private frameId = 0;

    add(cb: FrameCallback): void {
        this.callbacks.add(cb);
        if (!this.running) {
            this.running = true;
            this.frameId = requestAnimationFrame((t) => this.tick(t));
        }
    }

    remove(cb: FrameCallback): void {
        this.callbacks.delete(cb);
        if (this.callbacks.size === 0 && this.running) {
            cancelAnimationFrame(this.frameId);
            this.running = false;
        }
    }

    private tick(timestamp: number): void {
        for (const cb of this.callbacks) {
            cb(timestamp);
        }
        if (this.callbacks.size > 0) {
            this.frameId = requestAnimationFrame((t) => this.tick(t));
        } else {
            this.running = false;
        }
    }
}

export const raf = new RafScheduler();
