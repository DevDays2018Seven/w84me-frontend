export class WaitLocation {

    constructor(
        private _id: number,
        private _name: string,
        private _description: string,
        private _address: string,
        private _latitude: string,
        private _longitude: string
    ) {}

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }

    public get address(): string {
        return this._address;
    }

    public set address(value: string) {
        this._address = value;
    }

    public get latitude(): string {
        return this._latitude;
    }

    public set latitude(value: string) {
        this._latitude = value;
    }

    public get longitude(): string {
        return this._longitude;
    }

    public set longitude(value: string) {
        this._longitude = value;
    }

    // public toJson(): any {
    //     return {
    //         id: this.id,
    //         name: this.name
    //     };
    // }

    public static fromJson(json: any): WaitLocation {
        return new WaitLocation(
            json._id,
            json._name,
            json._description,
            json._address,
            json._latitude,
            json._longitude
        );
    }

}
