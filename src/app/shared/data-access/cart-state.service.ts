//! lo hemos colocado acá ya que el servicio del carrito va hacer algo que se va a compartir en el header, el componente del carrito va hacer un state global, por eso lo hemos colocado en el shared.

import { Injectable } from "@angular/core";
import { ProductItemCart } from "../interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice";

interface State {
    products: ProductItemCart[];
    loaded: boolean; //! el loaded es una flag para saber si ya se cargaron los productos
}

@Injectable({providedIn: 'root'})
export class CartStateService {

    private initialState: State = {
        products: [],
        loaded: false
    }

    state = signalSlice({
        initialState: this.initialState,
        
    })

}