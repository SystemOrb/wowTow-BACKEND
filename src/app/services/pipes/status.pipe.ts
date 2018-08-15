import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: boolean, onTrue?: string, onFalse?: string): string {
    if (value) {
      return `<span class="badge badge-success">${onTrue}</span>`;
    } else {
      return `<span class="badge badge-warning">${onFalse}</span>`;
    }
  }

}
