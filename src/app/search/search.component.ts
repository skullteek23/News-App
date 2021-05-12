import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { NewsService } from '../shared/services/news.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('Filter', { static: true }) filterInput: ElementRef;
  fitlerSub: Subscription;
  notFoundError$: Observable<boolean>;

  constructor(private newsServ: NewsService) {}
  ngOnInit(): void {
    this.notFoundError$ = this.newsServ.errorOccured;
    this.fitlerSub = fromEvent(this.filterInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter((res) => res.length > 2),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((val: string) => this.newsServ.onSearch(val));
  }
  ngOnDestroy() {
    this.fitlerSub.unsubscribe();
  }
}
