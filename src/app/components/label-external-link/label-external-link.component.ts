import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-external-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label-external-link.component.html',
  styleUrl: './label-external-link.component.scss',
})
export class LabelExternalLinkComponent {
  @Input() link: string | null | undefined;
  @Input() label: string | null | undefined;
  @Input() textForNullValue: any;
}
