import { Injectable } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Injectable({
  providedIn: 'root',
})
export class CopyClipboardService {
  constructor(private clipboard: Clipboard) {}

  copyShareFormLink(formId: string): void {
    const shareLink = `${window.location.origin}/${formId}`;
    this.clipboard.copy(shareLink);
  }
}
