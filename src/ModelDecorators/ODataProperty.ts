import { EdmType } from "../EndpointModel/EdmTypes";
import { DecoratorDescriptorStore } from "./DecoratorDescriptorStore";

export class ODataPropertyDesrciptorEntry {
    PropertyName: string;
    EdmType: EdmType;
}

function isODataPropertyDesrciptorEntry(obj: any): obj is ODataPropertyDesrciptorEntry {
    return obj.PropertyName !== undefined && obj.EdmType !== undefined;
}

export class Properties {
    /**
     * Gets a collection of property descriptors to the given models
     * @param entityTypeClass The model class to get the properties decorated with @Property
     */
    public static GetFor<T>(entityTypeClass: { new (): T }): ODataPropertyDesrciptorEntry[] {
        try{
            let found = DecoratorDescriptorStore.GetDescriptor(entityTypeClass);
            return found.Entries.filter(a => isODataPropertyDesrciptorEntry(a)).map(a => <ODataPropertyDesrciptorEntry>a);
        } catch (e){
            return [];
        }
    }

    /**
     * Indicates if the specified model class has OData properties (decorated with @Property)
     * @param entityTypeClass The model class to check
     */
    public static HasFor<T>(entityTypeClass: { new (): T }): boolean {
        try{
            let found = DecoratorDescriptorStore.GetDescriptor(entityTypeClass);
            return (found && found.Entries && found.Entries.length > 0) ? true : false;
        } catch (e) {
            return false;
        }

    }
}

/**
 * Decorator for an OData property
 */
export function Property(target: Object, propertyKey: string) {
    DecoratorDescriptorStore.Add(<any>target, <ODataPropertyDesrciptorEntry>{
        PropertyName: propertyKey,
        EdmType: EdmType.Unknown
    });
}