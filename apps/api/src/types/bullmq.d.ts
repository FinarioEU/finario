// TypeScript shim for BullMQ to unblock builds when the library or its types
// are not available at build-time. This is a minimal surface typed as "any".
// Replace with the real "bullmq" package for production use.
declare module 'bullmq' {
  export class Queue<T = any> {
    constructor(name: string, opts?: any);
    add(name: string, data: T, opts?: any): Promise<any>;
  }
  export class Worker<T = any, R = any, N = any> {
    constructor(name: string, processor: any, opts?: any);
    close(): Promise<void>;
    on(event: string, handler: (...args: any[]) => void): void;
  }
  export interface Job<T = any> {
    id?: string;
    name: string;
    data: T;
    [key: string]: any;
  }
}
