import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PRIVATE_LABELS } from './constants';
import { EmailPreview } from './email-preview/email-preview';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmailPreview],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  privateLabels = PRIVATE_LABELS;
  managerId = signal<string>(this.privateLabels[0].managerId);
}
