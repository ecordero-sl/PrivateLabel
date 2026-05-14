import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-code-snippet',
  imports: [],
  templateUrl: './code-snippet.html',
  styleUrl: './code-snippet.css',
})
export class CodeSnippet {
  code = input<string>('{greeting: Hello, World!}')
  targetSubdomain = input<string>('')

  buttonText = computed(() => this.targetSubdomain() === '' ? 'Copy' : `Copy for ${this.targetSubdomain().toUpperCase()}`)
  confirmCopy = signal<boolean>(false);

  async copyCodeSnippet(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      setTimeout(() => {
        this.confirmCopy.set(true);
      }, 1000);
    } catch (error) {
      console.log('An error occurred while copying:', error);
      this.confirmCopy.set(false);
    }
    setTimeout(() => {
      this.confirmCopy.set(false);
    }, 5000);
  }
}
