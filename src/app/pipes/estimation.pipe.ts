import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estimation'
})
export class EstimationPipe implements PipeTransform {

  transform(value: number): string {
    console.log(value);
    if (value === null) {
      return '---';
    }

    const milliSeconds = value;
    const seconds = milliSeconds / 1000;
    const minutes = Math.round(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours === 0) {
      return `${minutes}min`
    }

    const restMinutes = minutes - (hours * 60);
    return `${hours}h ${restMinutes}min`;
  }
}
