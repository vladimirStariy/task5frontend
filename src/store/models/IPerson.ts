export class IPerson {
    num: string;
    id: string;
    fullName: string;
    adress: string;
    phone: string;

    constructor(num: string, id: string, fullName: string, adress: string, phone: string) {
        this.num = num;
        this.id = id;
        this.fullName = fullName;
        this.adress = adress;
        this.phone = phone;
    }
}

export interface IPersonRequest {
    locale: string,
    fakerSeed: number,
    pageNumber: number,
    recordsCount: number,
    errorOffset: number
}