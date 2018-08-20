import { Pipe, PipeTransform } from '@angular/core';
import { HTTP_SERVICE } from '../../config/config.enviroments';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: string, folder: string, token?: string): string {
    if (!token) {
      return `${HTTP_SERVICE}upload/image/${folder}/${value}`;
    } else {
      return `${HTTP_SERVICE}upload/image/${folder}/${value}?token=${token}`;
    }
  }
}
