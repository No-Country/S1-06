import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-desafio-card',
  templateUrl: './desafio-card.component.html',
  styleUrls: ['./desafio-card.component.css']
})
export class DesafioCardComponent implements OnInit {
  @Input()data:any;
  created_by: String = '';
  constructor() { }

  ngOnInit(): void {
  }

  getCreatedBy (): void {

  }
}
