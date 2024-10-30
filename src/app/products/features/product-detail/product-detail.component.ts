import { Component, effect, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailStateService } from '../../data-access/product-detail-state.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe], //! con el currencypipe podemos formatear el precio del producto.
  templateUrl: './product-detail.component.html',
  providers: [ProductDetailStateService],
  styles: ``
})
export default class ProductDetailComponent {

  productDetailState = inject(ProductDetailStateService).state; //! inyectamos el servicio ProductDetailStateService y solo accedemos a su propiedad state

  //! 1 forma de recuperar el id del producto
  // private activatedRoute = inject(ActivatedRoute); //! inyectamos el servicio ActivatedRoute

  //! en el constructor nos suscribimos a los cambios de la ruta para obtener el id del producto
  // constructor() {
  //   this.activatedRoute.params.subscribe((params) => {
  //     console.log(params);
  //   })
  // }

  //! 2 forma de recuperar el id del producto -> Los parámetros de la ruta los podemos utilizar como inputs propios de nuestro componente. Para lo cuál debemos agregar en el app.config.ts en el provideRoute(withComponentInputBinding())
  //! debemos colocar el mismo nombre de nuestro parámetro de la url con el nombre del input(en nuestro caso se debe llamar id)
  id = input.required<string>();

  constructor() {
    effect(() => {
      this.productDetailState.getById(this.id());
    })
  }

}
