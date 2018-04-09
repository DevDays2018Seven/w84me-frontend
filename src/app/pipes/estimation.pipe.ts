import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estimation'
})
export class EstimationPipe implements PipeTransform {

  transform(value: number): string {
    const milliSeconds = value;
    const seconds = milliSeconds / 1000;
    const minutes = Math.round(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const restMinutes = minutes - (hours * 60);
    const result = hours + 'h ' + restMinutes + 'min';
    console.log(result);
    return result;
  }
}
