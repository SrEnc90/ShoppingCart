import { Routes } from "@angular/router";

export default [

    {
        path: 'products',
        loadComponent: () => import('../product-list/product-list.component') //! he colocado el default en el export de product-list.component.ts para que me haga la importación de frente y no tener que resolver una promesa(si no tendría que coloca .then() después de import. import('../product-list/product-list.component').then(m => m.default))
    },
    {
        path: 'product/:id',
        loadComponent: () => import('../product-detail/product-detail.component')
    }

] as Routes;