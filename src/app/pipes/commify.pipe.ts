import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commify',
  standalone: true
})
export class CommifyPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined) return '';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US'); 
  }
}
