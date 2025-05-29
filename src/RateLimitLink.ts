import { ApolloLink, Observable, Operation, NextLink } from '@apollo/client';

/**
 * Simple rate limiting link that allows `limit` operations per `interval`.
 * Additional requests are queued and executed when tokens refill.
 */
export default class RateLimitLink extends ApolloLink {
  private tokens: number;
  private queue: Array<{
    operation: Operation;
    forward: NextLink;
    observer: ZenObservable.Observer<any>;
  }> = [];

  constructor(private limit: number, private interval: number) {
    super();
    this.tokens = limit;
    setInterval(() => {
      this.tokens = this.limit;
      this.flush();
    }, interval);
  }

  request(operation: Operation, forward: NextLink) {
    return new Observable(observer => {
      this.queue.push({ operation, forward, observer });
      this.flush();
    });
  }

  private flush() {
    while (this.tokens > 0 && this.queue.length > 0) {
      const { operation, forward, observer } = this.queue.shift()!;
      this.tokens--;
      forward(operation).subscribe({
        next: value => observer.next?.(value),
        error: err => observer.error?.(err),
        complete: () => observer.complete?.(),
      });
    }
  }
}
