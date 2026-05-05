import { Component, computed, input } from '@angular/core';
import { IPrivateLabel } from '../constants';

@Component({
  selector: 'app-email-content',
  imports: [],
  templateUrl: './email-content.html',
  styleUrl: './email-content.css',
})
export class EmailContent {
  privateLabel = input.required<IPrivateLabel>()

  backgroundColor = computed<string>(() => this.privateLabel().email.backgroundColor)
  color = computed<string>(() => this.privateLabel().email.color)
  logoFile = computed<string>(() => this.privateLabel().email.logoFile)

  emailTopStyle = computed(
    () =>
      `background-color:${this.backgroundColor()};font-weight:600;color:${this.color()};width:700px;min-height:80px;border-top-left-radius:10px;border-top-right-radius:10px`
  );
  emailBottomStyle = computed(
    () =>
      `background-color:${this.backgroundColor()};font-weight:600;color:${this.color()};width:700px;min-height:96px;border-bottom-left-radius:10px;border-bottom-right-radius:10px`
  );
}
