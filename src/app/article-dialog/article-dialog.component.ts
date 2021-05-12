import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { article } from '../shared/models/news.model';

@Component({
  selector: 'app-article-dialog',
  templateUrl: './article-dialog.component.html',
  styleUrls: ['./article-dialog.component.css'],
})
export class ArticleDialogComponent implements OnInit {
  placeholder: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKklzborQemHwwI3RzILzBJZ1lV8WVJi54gFGvi-eA4eTf6gSB5huo_GMGYACbExkeutc&usqp=CAU';
  constructor(
    public dialogRef: MatDialogRef<ArticleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: article
  ) {}
  ngOnInit(): void {}
  onCloseDialog() {
    this.dialogRef.close();
  }
}
