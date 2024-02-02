import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WishItem } from '../shared/models/wishItem';
import { FormsModule } from '@angular/forms';
import { WishListComponent } from './wish-list/wish-list.component';
import { AddWishFormComponent } from './add-wish-form/add-wish-form.component';
import { WishFilterComponent } from './wish-filter/wish-filter.component';
import { EventService } from '../shared/services/EventService';
import { HttpClientModule } from '@angular/common/http';
import { WishService } from './wish.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, WishListComponent, AddWishFormComponent, WishFilterComponent, HttpClientModule],
  providers: [EventService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'wish-list';

  items: WishItem[] = []

  ngOnInit(): void {
    this.wishService.getWishes().subscribe((data : any) => {
      this.items = data;
    }, (error: any) => {
      alert(error.message)
    }) 
  }

  constructor(events : EventService, private wishService : WishService) {
    events.listen('removeWish', (wishToDelete) => {
      // remove wish from wishes
      console.log(wishToDelete);
      this.items = this.items.filter(wish => wishToDelete != wish);
    })
  }

  filter: any = () => { }
}
