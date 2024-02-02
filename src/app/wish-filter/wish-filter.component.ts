import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { WishItem } from '../../shared/models/wishItem';
import { FormsModule } from '@angular/forms';

const filters = [
  (item : WishItem) => item,
  (item : WishItem) => !item.isComplete,
  (item : WishItem) => item.isComplete
]

@Component({
  selector: 'wish-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './wish-filter.component.html',
  styleUrl: './wish-filter.component.css'
})
export class WishFilterComponent implements OnInit {
  // This is a two way binding
  @Input() filter : any;
  @Output() filterChange = new EventEmitter<any>();

  listFilter : any = '0';

  ngOnInit(): void {
    this.updateFilter('0');
  }

  updateFilter(value : any) {
    // We want to emit the filter function that will be applied to the array
    this.filter = filters[value];
    this.filterChange.emit(this.filter);
  }
}
