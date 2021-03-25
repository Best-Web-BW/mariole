import { action, observable, /* computed, */ makeObservable, runInAction } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import { useMemo } from 'react';

enableStaticRendering(typeof window === 'undefined');

let store;

class Store {
    constructor() {
        makeObservable(this);
    }

    @observable favorite = [];
    filterFavorite = id => this.favorite.filter(entry => entry !== id);

    @action setFavorite = favorite => {
        localStorage.favorite = JSON.stringify(favorite);
        this.favorite = favorite;
    };
    @action addToFavorite = id => this.setFavorite([...this.filterFavorite(id), id]);
    @action removeFromFavorite = id => this.setFavorite(this.filterFavorite(id));
    @action toggleFavorite = id => {
        this.favorite.includes(id) ? this.removeFromFavorite(id) : this.addToFavorite(id);
    };

    @observable cart = [];
    filterCart = id => this.cart.filter(entry => entry !== id);

    @action setCart = cart => {
        localStorage.cart = JSON.stringify(cart);
        this.cart = cart;
    };
    @action addToCart = id => this.setCart([...this.filterCart(id), id]);
    @action removeFromCart = id => this.setCart(this.filterCart(id));   

    @action initClientStore = () => runInAction(() => {
        this.favorite = localStorage.favorite ? JSON.parse(localStorage.favorite) : [];
        this.cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];
    });

    /*  Examples of store use.

        @observable lastUpdate = 0;
        @observable light = false;

        @action start = () => {
            this.timer = setInterval(() => runInAction(() => {
                this.lastUpdate = Date.now();
                this.light = true;
            }), 1000);
        }

        @computed get timeString() {
            const pad = n => n < 10 ? `0${n}` : n;
            const format = t => `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`;
            return format(new Date(this.lastUpdate));
        }

        stop = () => clearInterval(this.timer); */

    @action hydrate = data => {
        if(!data) return;

        this.favorite = data.favorite ?? [];
        this.cart = data.cart ?? [];

        /*  Examples of 

            this.dark = !!data.dark;

            this.lastUpdate = data.lastUpdate ?? Date.now();
            this.light = !!data.light; */
    }
}

function initializeStore(initialData = null) {
    const _store = store ?? new Store();

    if(initialData) _store.hydrate(initialData);

    if(typeof window === 'undefined') return _store;
    if(!store) return store = _store;
}

export function useStore(initialState) {
    return useMemo(() => initializeStore(initialState), [initialState]);
}
