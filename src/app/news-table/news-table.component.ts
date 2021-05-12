import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { ArticleDialogComponent } from '../article-dialog/article-dialog.component';
import { article } from '../shared/models/news.model';
import { NewsService } from '../shared/services/news.service';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.css'],
})
export class NewsTableComponent implements OnInit {
  news$: Observable<article[]>;
  notFoundError$: Observable<boolean>;
  cols: string[] = ['Image', 'Source', 'Author', 'Title', 'publishedAt', 'URL'];
  placeholder: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKklzborQemHwwI3RzILzBJZ1lV8WVJi54gFGvi-eA4eTf6gSB5huo_GMGYACbExkeutc&usqp=CAU';
  constructor(private newsServ: NewsService, private dialog: MatDialog) {
    this.news$ = newsServ.articlesChanged.pipe(share());
  }
  ngOnInit(): void {}
  onPageChange(page: PageEvent) {
    this.newsServ.onPaginate(page.pageIndex);
  }
  onSortData(data: Sort) {
    if (data.direction != '') this.newsServ.onSort(data);
  }
  onViewArticle(selectedArticle: article) {
    this.dialog.open(ArticleDialogComponent, {
      panelClass: 'large-dialogs',
      data: selectedArticle,
    });
  }
}
