import { EdmType } from "../EndpointModel/EdmTypes";
import { DecoratorDescriptorStore } from "./DecoratorDescriptorStore";

export class ODataPropertyDesrciptorEntry {
    PropertyName: string;
    EdmType: EdmType;
}

function isODataPropertyDesrciptorEntry(obj: any): obj is ODataPropertyDesrciptorEntry{
    return obj.PropertyName !== undefined && obj.EdmType !== undefined;
}

export class Properties {
    public static GetFor<T>(entityTypeClass: { new (): T }): ODataPropertyDesrciptorEntry[] {
        let found = DecoratorDescriptorStore.GetDescriptor(entityTypeClass);
        if (!found) {
            return [];
        }
        return found.Entries.filter(a => isODataPropertyDesrciptorEntry(a)).map(a=> <ODataPropertyDesrciptorEntry>a);
    }

    public static HasFor<T>(entityTypeClass: { new (): T }): boolean {
        let found = DecoratorDescriptorStore.GetDescriptor(entityTypeClass);
        return (found && found.Entries && found.Entries.length > 0) ? true : false;
    }
}

export function Property(target: Object, propertyKey: string) {
    console.log(`Property '${propertyKey}' added to '${target.constructor.name}'`);
    DecoratorDescriptorStore.Add(<any>target, <ODataPropertyDesrciptorEntry>{
        PropertyName: propertyKey,
        EdmType: EdmType.Unknown
    });
}