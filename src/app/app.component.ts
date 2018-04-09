import { Component } from '@angular/core';
import { Location } from './models/location';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public panelOpenState: boolean = false;
  public locations: Location[] = [1, 2, 3, 4, 5].map(el => new Location(el, `Name${el}`, `Description${el}`, 'here', 'there', 'nowhere'));

  public selectedLocation: Location | null = null;
}
