import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WishItem } from '../../shared/models/wishItem';
import { EventService } from './../../shared/services/EventService';

@Component({
  selector: 'wish-list-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './wish-list-item.component.html',
  styleUrl: './wish-list-item.component.css'
})
export class WishListItemComponent {
  @Input() wish! : WishItem;

  events : EventService;

  constructor(events : EventService) {
    this.events = events;
  }

  toggleFullfilled() {
    this.wish.isComplete = !this.wish.isComplete;
  }

  removeWish() {
    this.events.emit('removeWish', this.wish);
  }
}
