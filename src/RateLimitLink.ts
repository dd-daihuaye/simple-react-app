import { ApolloLink, Observable, Operation, NextLink } from '@apollo/client';

/**
 * Rate limiting link that allows `limit` operations per `interval` for each
 * unique request payload (operation + variables). Additional requests with the
 * same payload are queued until tokens refill for that specific key.
 */
export default class RateLimitLink extends ApolloLink {
  private requests: Map<
    string,
    {
      tokens: number;
      queue: Array<{
        operation: Operation;
        forward: NextLink;
        observer: ZenObservable.Observer<any>;
      }>;
    }
  > = new Map();

  constructor(private limit: number, private interval: number) {
    super();
  }

  request(operation: Operation, forward: NextLink) {
    const key = this.getKey(operation);
    return new Observable(observer => {
      let entry = this.requests.get(key);
      if (!entry) {
        entry = { tokens: this.limit, queue: [] };
        this.requests.set(key, entry);
        setInterval(() => {
          entry!.tokens = this.limit;
          this.flushKey(key);
        }, this.interval);
      }

      entry.queue.push({ operation, forward, observer });
      this.flushKey(key);
    });
  }

  private flushKey(key: string) {
    const entry = this.requests.get(key);
    if (!entry) return;

    while (entry.tokens > 0 && entry.queue.length > 0) {
      const { operation, forward, observer } = entry.queue.shift()!;
      entry.tokens--;
      forward(operation).subscribe({
        next: value => observer.next?.(value),
        error: err => observer.error?.(err),
        complete: () => observer.complete?.(),
      });
    }
  }

  private getKey(operation: Operation): string {
    const query = operation.query?.loc?.source.body || '';
    const variables = JSON.stringify(operation.variables || {});
    const name = operation.operationName || '';
    return `${name}|${query}|${variables}`;
  }
}
