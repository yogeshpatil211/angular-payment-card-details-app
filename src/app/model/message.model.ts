export enum MessageType {
  SUCCESS = 'success',
  ERROR = 'error'
}

export class Message {

  message: string;
  type: MessageType;

  constructor(message, type) {
    this.message = message;
    this.type = type;
  }

}
