import { QuestionService } from './../../services/question.service';
import { Component, Input, OnInit } from '@angular/core';
import { KeyValueChanges, KeyValueDiffer, KeyValueDiffers } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input()data:any;
  @Input()index:any;
  @Input()selected: Array<any> = [];

  da: any;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
  }

  onChangeEvent (event: any) {
    const payload = {choice: event.target.value, question: this.data.id}
    this.questionService.questionDispatch.emit({
      ...payload
    })
  }
  checked (option: any):Boolean{
    return this.selected.includes(option)
  }

}
