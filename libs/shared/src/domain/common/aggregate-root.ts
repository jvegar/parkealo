import { DomainEvent } from './domain-event.interface';

export abstract class AggregateRoot<
  Tid,
  TEvent extends DomainEvent = DomainEvent,
> {
  private readonly _domainEvents: TEvent[] = [];

  protected constructor(public readonly id: Tid) {}

  protected recordEvent(event: TEvent): void {
    this._domainEvents.push(event);
  }

  public pullEvents(): TEvent[] {
    const events = [...this._domainEvents];
    this._domainEvents.length = 0;
    return events;
  }
}
