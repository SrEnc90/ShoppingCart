import { inject, Injectable } from "@angular/core";
import { Product } from "../../shared/interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice";
import { ProductsService } from "./products.service";
import { catchError, map, of, startWith, Subject, switchMap } from "rxjs";

interface State {
    products: Product[];
    status: 'loading' | 'success' | 'error';
    page: number;
}

@Injectable() //! No hemos colocado el providedIn: 'root' en el decorador Injectable(El providedIn: 'root) ya está explicado en el archivo products.service.ts
export class ProductsStateService {

    private productsService = inject(ProductsService);

    private initialState: State = {
        products: [],
        status: 'loading' as const, //! el const es para que no pueda ser modificado es cómo si fuera un enum
        page: 1
    }

    //! el subject es un tipo especial de observable que permite emitir valores a otros observables, tiene la capacidad de emitir valores a múltiples suscriptores. Acá el suscriptor es el método changePage() ubicado en el archivo product-list.component.ts que se encarga de cambiar la página y emite el valor de la página a la que se quiere cambiar a todos los suscriptores que estén escuchando el cambio de página, Los suscriptores en este caso son las funciones dentro de sources[...] en tu signalSlice
    changePage$ = new Subject<number>();

    //! el pipe es un operador que se utiliza para encadenar operadores y ejecutarlos en un orden específico, en este caso se está utilizando el operador startWith(1) para emitir un valor inicial de 1, el operador switchMap() para cambiar el valor de la página y el operador map() para mapear el valor de la página
    loadProducts$ = this.changePage$.pipe(
        startWith(1),
        switchMap((page) => this.productsService.getProducts(page)),
        map((products) => ({products, status: 'success' as const})),
        catchError(() => {
            return of({
                products: [],
                status: 'error' as const
            });
        })
    );

    //! Estoy usando la librería ngxtension para crear un slice de estado, para instalarla en el proyecto ejecuta npm install ngxtension
    state = signalSlice({
        initialState: this.initialState,
        sources: [
            this.changePage$.pipe(
                map((page) => ({page, status: 'loading' as const}))),
            //! se cambió lo de abajo por loadProducts$, para poder realizar una paginación
            // this.productsService
            // .getProducts(1)
            // .pipe(map((products) => ({products, status: 'success' as const})))
            this.loadProducts$
        ]
    })


}