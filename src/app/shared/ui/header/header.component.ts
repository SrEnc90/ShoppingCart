import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink], //! para poder utilizar el RouterLink en el html
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

}
