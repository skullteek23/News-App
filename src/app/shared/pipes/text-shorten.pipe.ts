import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textShorten',
})
export class TextShortenPipe implements PipeTransform {
  // a pipe that shortens string length if length > maxlength and appends '...' to end of string
  transform(value: string, maxLength: number): string {
    return value.length > maxLength
      ? value.slice(0, maxLength - 3).concat('...')
      : value;
  }
}
