import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    RatingModule,
    CommonModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) {}

  @Input() display: boolean = false;

  @Output() displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() confirm: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  @Input() product: Product = {
    name: '',
    price: '',
    rating: 0,
    image: '',
  };

  onConfirm() {
    this.confirm.emit(this.product);
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
