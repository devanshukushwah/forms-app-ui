import { Component, Input, OnInit } from '@angular/core';
import { FormField } from '../../common/interface/FormField';

@Component({
  selector: 'app-field-input',
  standalone: true,
  imports: [],
  templateUrl: './field-input.component.html',
  styleUrl: './field-input.component.scss',
})
export class FieldInputComponent implements OnInit {
  @Input() formField: FormField | undefined;

  ngOnInit(): void {
    console.log('ngOnInit: inputData is', this.formField); // Available here
  }
}
