import { EdmType } from '../EndpointModel/EdmTypes';
import { DecoratorDescriptorStore } from './DecoratorDescriptorStore';
import { ODataPropertyDesrciptorEntry } from './ODataPropertyDescriptorEntry';

export function isODataPropertyDesrciptorEntry(obj: any): obj is ODataPropertyDesrciptorEntry {
    return obj.PropertyName !== undefined && obj.EdmType !== undefined;
}

export class Properties {
    /**
     * Gets a collection of property descriptors to the given models
     * @param entityTypeClass The model class to get the properties decorated with @Property
     */
    public static GetFor<T>(entityTypeClass: { new (): T }): ODataPropertyDesrciptorEntry[] {
        try {
            const found = DecoratorDescriptorStore.GetDescriptor(entityTypeClass);
            return found.Entries.filter((a) =>
                isODataPropertyDesrciptorEntry(a)).map((a) =>  a as ODataPropertyDesrciptorEntry);
        } catch (e) {
            return [];
        }
    }

    /**
     * Indicates if the specified model class has OData properties (decorated with @Property)
     * @param entityTypeClass The model class to check
     */
    public static HasFor<T>(entityTypeClass: { new (): T }): boolean {
        const found = DecoratorDescriptorStore.GetDescriptor(entityTypeClass);
        return (found && found.Entries && found.Entries.length > 0) ? true : false;
    }
}

/**
 * Decorator for an OData property
 */
export function Property(target: object, propertyKey: string) {
    DecoratorDescriptorStore.Add( target as any,
    new ODataPropertyDesrciptorEntry(propertyKey, EdmType.Unknown));
}
