import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  @Output() questionDispatch: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
