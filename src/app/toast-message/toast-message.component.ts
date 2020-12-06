import { Message, MessageType } from './../model/message.model';
import { Observable } from 'rxjs/internal/Observable';
import { ToastMessageService } from './../services/toast-message.service';
import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faExclamationCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.css']
})
export class ToastMessageComponent implements OnInit {

  successIcon = faCheckCircle;
  errorIcon = faExclamationCircle;
  closeIcon = faTimesCircle;
  toastMessageDetails$: Observable<Message>;
  messageType = MessageType;

  constructor(
    private toastMessageService: ToastMessageService
  ) {}

  ngOnInit() {
    this.toastMessageDetails$ = this.toastMessageService.getMessage();
  }

  closeToastMessage(): void {
    this.toastMessageService.hideToast();
  }
}
