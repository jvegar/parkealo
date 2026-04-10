//Unique Identity Management
//Domain Event Tracking
//- Maintains an internal private list
//- It provides a recordEvent() method
//- When repository saves the aggregate, it pulls this list, dispatches the events to your broker, and then calls clearEvents()
// Versioning (Concurrency Control)

// A generic class is a class that can work with a variety of data types while maintaining type safety. T -> type parameter
// It can have multiple type parameters (e.g. <T,U>)
export interface DomainEvent {
  readonly occurredAt: Date;
  readonly eventType: string;
}

export abstract class AggregateRoot<
  Tid,
  TEvent extends DomainEvent = DomainEvent,
> {
  private readonly _domainEvents: TEvent[] = [];
  // protected modifier restrictc class member access to within the class itself and its derived (child) subclasses, acting as a middle ground between private and public.
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
