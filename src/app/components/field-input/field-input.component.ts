import { Component, Input, OnInit } from '@angular/core';
import { FormField } from '../../common/interface/FormField';
import { FieldInput } from '../../common/interface/FieldInput';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-field-input',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule],
  templateUrl: './field-input.component.html',
  styleUrl: './field-input.component.scss',
})
export class FieldInputComponent implements OnInit {
  @Input() formField: FormField | undefined;
  fieldInput!: FieldInput;
  @Input() respFormGroup!: FormGroup;

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

  getString(obj: any): string {
    if (obj) {
      return obj.toString();
    }

    return '';
  }
}
