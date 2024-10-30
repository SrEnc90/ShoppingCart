import { Injectable } from "@angular/core";
import { BaseHttpService } from "../../shared/data-access/base-http.service";
import { Observable } from "rxjs";
import { Product } from "../../shared/interfaces/product.interface";

const LIMIT = 5;

//@Injectable() //! no hemos colocado metadata providers: 'root' en el decorador Injectable(El providedIn: 'root' convierte nuestro ProductService en un servicio singleton, cuando se cree una instancia de este servicio en otra clase va a preguntar si se tiene la instancia creada, si no se tiene la crea y si la tiene creada solo la recupera, al no colocar el providedIn debemos especificar el servicio en el array de providers de un módulo para que se cree una instancia única de este servicio en toda la aplicación, en este caso es el módulo de productos)
@Injectable({
    providedIn: 'root'
})
export class ProductsService extends BaseHttpService { //! el this.http proviene de nuestra extensión de la clase BaseHttpService
    
    getProducts(page: number): Observable<Product[]> { //! el Observable<Product[]> es el tipo de dato que va a retornar el método getProducts
        return this.http.get<Product[]>(`${this.apiUrl}/products`, {
            params: {
                limit: page * LIMIT
            }
        });
    }

    getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
    }
}