import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { IPrivateLabel } from '../constants';

@Component({
  selector: 'app-preview-controls',
  imports: [],
  templateUrl: './preview-controls.html',
  styleUrl: './preview-controls.css',
})
export class PreviewControls implements AfterViewInit {
  privateLabels = input<IPrivateLabel[]>([]);
  private readonly buttonsContainer = viewChild<ElementRef<HTMLDivElement>>('buttonsContainer');

  selectedManagerId = output<string>();
  canScrollLeft = signal(false);
  canScrollRight = signal(false);

  newManagerId = model<string>('');
  managerId = computed(() => this.newManagerId());
  selectedPrivateLabelName = computed(
    () => this.privateLabels().find(pl => pl.managerId === this.managerId())?.name ?? ''
  );

  constructor() {
    effect(() => {
      this.selectedManagerId.emit(this.managerId());
    });

    effect(() => {
      const privateLabels = this.privateLabels();
      const currentManagerId = this.newManagerId();

      if (privateLabels.length === 0) {
        return;
      }

      const hasCurrentSelection = privateLabels.some(pl => pl.managerId === currentManagerId);

      if (!hasCurrentSelection) {
        this.newManagerId.set(privateLabels[0].managerId);
      }
    });
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.updateScrollIndicators());
  }

  onClick(event: any): void {
    this.newManagerId.set(event.target.value);
  }

  onButtonsScroll(): void {
    this.updateScrollIndicators();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateScrollIndicators();
  }

  private updateScrollIndicators(): void {
    const container = this.buttonsContainer()?.nativeElement;

    if (!container) {
      return;
    }

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const hasOverflow = maxScrollLeft > 1;

    this.canScrollLeft.set(hasOverflow && container.scrollLeft > 1);
    this.canScrollRight.set(hasOverflow && container.scrollLeft < maxScrollLeft - 1);
  }
}
