import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'average'
})
export class AveragePipe implements PipeTransform {

  transform(value: any): string {
    switch (value) {
      case 'NORMAL':
        return `<span class="badge badge-info"><i class="mdi mdi-emoticon"></i>${value}</span>`;
      case 'SERIOUS':
      return `<span class="badge badge-warning"><i class="mdi mdi-emoticon-sad"></i>${value}</span>`;
      case 'VERY SERIOUS':
      return `<span class="badge badge-danger"><i class="mdi mdi-emoticon-dead"></i>${value}</span>`;
      default:
      return `<span class="badge badge-info"><i class="mdi mdi-emoticon"></i>${value}</span>`;
    }
  }
}
