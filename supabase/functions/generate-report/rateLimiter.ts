export class RateLimiter {
  private requests: Map<string, number[]>;
  private windowMs: number;
  private maxRequests: number;

  constructor(options: { windowMs: number; maxRequests: number }) {
    this.requests = new Map();
    this.windowMs = options.windowMs;
    this.maxRequests = options.maxRequests;
  }

  async isAllowed(key: string): Promise<boolean> {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    let requests = this.requests.get(key) || [];
    requests = requests.filter(timestamp => timestamp > windowStart);
    
    if (requests.length >= this.maxRequests) {
      return false;
    }

    requests.push(now);
    this.requests.set(key, requests);
    return true;
  }
}