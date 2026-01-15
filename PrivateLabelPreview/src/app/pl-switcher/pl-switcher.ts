import { Component, computed, inject, model } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IPrivateLabel, PRIVATE_LABELS } from '../constants';

@Component({
  selector: 'app-pl-switcher',
  imports: [ReactiveFormsModule],
  templateUrl: './pl-switcher.html',
  styleUrl: './pl-switcher.css',
})
export class PlSwitcher {
  privateLabels: IPrivateLabel[] = PRIVATE_LABELS;
  managerId = model.required<string>({ alias: 'managerIdSelection' });
  selectedManagerId = computed(
    () => this.privateLabels.filter((pl) => pl.managerId === this.managerId())[0].managerId
  );
  isDarkTheme = model.required<boolean>({ alias: 'isDarkThemeSelection' });
  isDarkThemeSelected = computed(() => this.isDarkTheme());

  fb = inject(FormBuilder);
  switcherForm = new FormGroup({
    managerId: new FormControl(this.privateLabels[0].managerId),
    isDarkTheme: new FormControl(false),
  });

  onClick(index: number): void {
    this.managerId.set(this.privateLabels[index].managerId);
  }
  onThemeChange(event: any): void {
    console.log(event.target.checked);
    this.isDarkTheme.set(!this.isDarkTheme());
  }
}
