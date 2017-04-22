import { EdmType } from '../EndpointModel/EdmTypes';

export class ODataPropertyDesrciptorEntry {

    constructor(propertyName: string, edmType: EdmType) {
        this.PropertyName = propertyName;
        this.EdmType = edmType;
    }
    public PropertyName: string;
    public EdmType: EdmType;
}
