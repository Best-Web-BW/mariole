import { action, observable, /* computed, */ makeObservable, runInAction } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import { useMemo } from 'react';

enableStaticRendering(typeof window === 'undefined');

let store;

class Store {
    constructor() {
        makeObservable(this);
    }

    @observable ready = false;

    @observable favorite = [];
    @action setFavorite = favorite => {
        localStorage.setItem("favorite", JSON.stringify(favorite));
        this.favorite = favorite;
    };
    filterFavorite = id => this.favorite.filter(entry => entry !== id);
    addToFavorite = id => this.setFavorite([...this.filterFavorite(id), id]);
    removeFromFavorite = id => this.setFavorite(this.filterFavorite(id));
    toggleFavorite = id => this.favorite.includes(id) ? this.removeFromFavorite(id) : this.addToFavorite(id);
    resetFavorite = () => this.setFavorite([]);

    @observable cart = [];
    @action setCart = cart => {
        localStorage.setItem("cart", JSON.stringify(cart));
        this.cart = cart;
    };
    filterCartID = id => this.cart.filter(entry => entry.id !== id);
    filterCartUID = uid => this.cart.filter(entry => entry.uid !== uid);
    addToCart = (id, size, quantity) => {
        const uid = `${id}-${size}`;
        this.setCart([...this.filterCartUID(uid), { uid, id, size, quantity }]);
    };
    removeFromCart = (id, size) => {
        if(!size) this.setCart(this.filterCartID(id));
        else this.setCart(this.filterCartUID(`${id}-${size}`));
    };
    setCartQuantity = (id, size, quantity) => {
        const uid = `${id}-${size}`;
        this.setCart(this.cart.map(entry => entry.uid === uid ? { ...entry, quantity } : entry));
    };
    resetCart = () => this.setCart([]);

    @observable recent = [];
    @action setRecent = recent => {
        localStorage.setItem("recent", JSON.stringify(recent));
        this.recent = recent;
    };
    cutRecent = () => this.recent.slice(-3); // 3 last products
    addToRecent = id => this.setRecent([...this.cutRecent(), id]);

    @observable admin = false;
    @action enableAdmin = () => {
        this.admin = true;
        localStorage.setItem("admin", 1);
    };
    @action disableAdmin = () => {
        this.admin = false;
        localStorage.removeItem("admin");
    }

    @action initStore = ({ favorite, cart, recent, admin }) => runInAction(() => {
        this.ready = true;
        this.favorite = favorite ? JSON.parse(favorite) : [];
        this.cart = cart ? JSON.parse(cart) : [];
        this.recent = recent ? JSON.parse(recent) : [];
        this.admin = admin
    });

    initClientStore = () => this.initStore({
        favorite: localStorage.getItem("favorite"),
        cart: localStorage.getItem("cart"),
        recent: localStorage.getItem("recent"),
        admin: false
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
        this.recent = data.recent ?? [];
        this.admin = false;

        /*  Examples of hydrate use

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
