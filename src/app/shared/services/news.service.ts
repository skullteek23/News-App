import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { article, newsResponse } from '../models/news.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root',
})
export class NewsService implements OnDestroy {
  newsSubscription: Subscription;
  articles: article[] = [];
  articlesChanged = new Subject<article[]>();
  errorOccured = new BehaviorSubject<boolean>(false);

  // for pagination (10 per page)
  onPaginate(page: number) {
    this.fetchArticles(page + 1);
  }

  // for searching and emitting new filtered articles array
  onSearch(searchVal: string) {
    let filterArticles = this.articles.filter(
      (ar) => ar.title.includes(searchVal) || ar.description.includes(searchVal)
    );
    this.errorOccured.next(filterArticles.length == 0);
    this.articlesChanged.next(filterArticles);
  }

  // for sorting the articles list
  onSort(sortType: Sort) {
    if (sortType.direction == 'asc')
      this.articlesChanged.next(this.articles.sort(this.sortAsc));
    else if (sortType.direction == 'desc')
      this.articlesChanged.next(this.articles.sort(this.sortDesc));
  }

  // desctroying the subscription created
  ngOnDestroy() {
    this.newsSubscription.unsubscribe();
  }

  constructor(private _http: HttpClient) {
    // fetching first page of articles data
    this.fetchArticles(1);
  }

  // private functions
  private API_KEY = 'e2424aaae1a34f0da2ef205f690baaf0';
  private API_ENDPOINT = 'https://newsapi.org/v2/everything?';
  private fetchArticles(page: number) {
    this.newsSubscription = this._http
      .get<newsResponse>(
        this.API_ENDPOINT +
          'q=bitcoin&pageSize=10&page=' +
          page.toString() +
          '&domains=bbc.co.uk,techcrunch.com,engadget.com&apiKey=' +
          this.API_KEY
      )
      .pipe(map((resp) => resp.articles))
      .subscribe((data) => {
        this.articles = data;
        this.articlesChanged.next(this.articles);
      });
  }
  private sortAsc(a: article, b: article) {
    return (
      (new Date(a.publishedAt).getTime() > new Date(b.publishedAt).getTime() &&
        1) ||
      -1
    );
  }
  private sortDesc(a: article, b: article) {
    if (new Date(b.publishedAt).getTime() > new Date(a.publishedAt).getTime())
      return 1;
    else if (
      new Date(b.publishedAt).getTime() < new Date(a.publishedAt).getTime()
    )
      return -1;
    else return 0;
  }
}
