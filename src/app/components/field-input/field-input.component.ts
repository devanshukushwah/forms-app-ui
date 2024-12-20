import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormField } from '../../common/interface/FormField';
import { FieldInput } from '../../common/interface/FieldInput';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-field-input',
  standalone: true,
  imports: [InputTextModule, FormsModule],
  templateUrl: './field-input.component.html',
  styleUrl: './field-input.component.scss',
})
export class FieldInputComponent implements OnInit {
  @Input() formField: FormField | undefined;
  fieldInput!: FieldInput;

  @Output() myOnChangeCallBack = new EventEmitter<any>();

  ngOnInit(): void {
    if (this.formField) {
      const fieldInput: FieldInput = {
        fieldId: this.formField.fieldId,
        fieldType: this.formField.fieldType,
        formId: this.formField.formId,
        value: '',
        title: '',
        attrId: -1,
      };
      this.formField.attributes.forEach((item) => {
        if (item.attr == 'title') {
          fieldInput.attrId = item.attrId;
          fieldInput.title = item.value;
        }
      });

      this.fieldInput = fieldInput;
    }
  }

  handleInputChange(): void {
    this.myOnChangeCallBack.emit(this.fieldInput);
  }
}
