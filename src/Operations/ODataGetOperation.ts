import { ODataOperation } from "./ODataOperation";

export class ODataGetOperation<T> extends ODataOperation<T> {

    public BuildQueryUrl(): string {
        let url = "?";
        if (this._expand) { url += `$expand=${this._expand}&`; }
        if (this._select) { url += `$expand=${this._select}&`; }
        return url;
    }

    constructor(private idSegment: string) {
        super();
    }

}
