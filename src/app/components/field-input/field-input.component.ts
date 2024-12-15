import { Component, Input, OnInit } from '@angular/core';
import { FormField } from '../../common/interface/FormField';
import { FieldInput } from '../../common/class/FieldInput';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-field-input',
  standalone: true,
  imports: [InputTextModule],
  templateUrl: './field-input.component.html',
  styleUrl: './field-input.component.scss',
})
export class FieldInputComponent implements OnInit {
  @Input() formField: FormField | undefined;
  fieldInput: FieldInput | undefined;

  ngOnInit(): void {
    console.log('ngOnInit: inputData is', this.formField); // Available here
    if (this.formField) {
      this.fieldInput = new FieldInput(this.formField);
    }
  }
}
