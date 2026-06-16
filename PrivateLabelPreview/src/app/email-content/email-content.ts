import { Component, computed, input } from '@angular/core';
import { IPrivateLabel } from '../constants';
import { buildEmailBottomStyle, buildEmailTopStyle } from '../private-label-formatting-utils';

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

  emailTopStyle = computed(() => buildEmailTopStyle(this.privateLabel().email));
  emailBottomStyle = computed(() => buildEmailBottomStyle(this.privateLabel().email));
}
