import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject, Observable, interval, Subscription } from 'rxjs';
import { Message, MessageType } from '../model/message.model';

@Injectable()
export class ToastMessageService {

  toastMessageSubject$: Subject<Message> = new Subject();
  interval$: Subscription = Subscription.EMPTY;

  getMessage(): Observable<Message> {
    return this.toastMessageSubject$.asObservable();
  }

  sendMessage(message: string, type: MessageType): void {
    const toastMessage = new Message(message, type);
    this.toastMessageSubject$.next(toastMessage);
    this.hideToastAfter5Sec();
  }

  hideToastAfter5Sec(): void {
    this.interval$ = interval(5000).pipe(take(1)).subscribe(() => this.hideToast());
  }

  hideToast(): void {
    this.toastMessageSubject$.next(null);
    this.interval$.unsubscribe();
  }
}
