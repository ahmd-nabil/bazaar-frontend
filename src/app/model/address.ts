import { Country } from "./country";
import { State } from "./state";

export class Address {
    id ?: number;
    country ?: Country;
    state ?: State ;

    street ?: string;
    city ?: string;
    zipcode ?: string;

    constructor(id?: number, country ?: Country, state ?: State, street ?: string, city ?: string, zipcode ?: string) {
        this.id = id;
        this.country = country;
        this.state = state;
        this.street = street;
        this.city = city;
        this.zipcode = zipcode;
    }
}