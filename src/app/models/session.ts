export class WaitSession {
    static fromJson(json) {
        return new WaitSession(json.id, json.locationId, json.timestampStart, json.timestampEnd);
    }
    constructor(
        private _locationId: number,
        private _id?: number,
        private _timestampStart?: number,
        private _timestampEnd?: number
    ) { }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get locationId() {
        return this._locationId;
    }
    set locationId(value) {
        this._locationId = value;
    }
    get timestampStart() {
        return this._timestampStart;
    }
    set timestampStart(value) {
        this._timestampStart = value;
    }
    get timestampEnd() {
        return this._timestampEnd;
    }
    set timestampEnd(value) {
        this._timestampEnd = value;
    }
    toJson() {
        return {
            id: this.id,
            locationId: this.locationId,
            timestampStart: this.timestampStart,
            timeStampEnd: this.timestampEnd
        };
    }
}
