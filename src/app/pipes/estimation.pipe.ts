import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estimation'
})
export class EstimationPipe implements PipeTransform {

  transform(value: number): string {
    const milliSeconds = value;
    const seconds = milliSeconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;

    return hours + 'h ' + minutes + 'min';
  }
}
