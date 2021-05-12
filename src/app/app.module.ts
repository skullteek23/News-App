import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { NewsTableComponent } from './news-table/news-table.component';
import { AppMaterialModule } from './app-material.module';
import { FormsModule } from '@angular/forms';
import { TextShortenPipe } from './shared/pipes/text-shorten.pipe';
import { ArticleDialogComponent } from './article-dialog/article-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NewsTableComponent,
    TextShortenPipe,
    ArticleDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
