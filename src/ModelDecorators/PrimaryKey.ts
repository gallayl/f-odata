import { DecoratorDescriptorStore } from "./DecoratorDescriptorStore";

class PrimaryKeyDescriptorEntry {
    PrimaryKey: string;
}

function isPrimaryKeyDescriptorEntry(descriptor: any): descriptor is PrimaryKeyDescriptorEntry{
    return (<PrimaryKeyDescriptorEntry>descriptor).PrimaryKey !== undefined;
}

/**
 * Public API to the Primary Key store
 */
export class PrimaryKeys {
    /**
     * Gets the Primary Key field name for the specified object
     * @param entityTypeClass The class to get the key for.
     */
    public static GetFor<T>(entityTypeClass: { new (): T }): string {

        let descriptor = DecoratorDescriptorStore.GetDescriptor(entityTypeClass);
        if (!descriptor) {
            throw new Error(`Descriptor not registered for '${entityTypeClass.name}'`);
        }
        let entry = <PrimaryKeyDescriptorEntry>descriptor.Entries.find(a => isPrimaryKeyDescriptorEntry(a));
        if (!entry){
            throw new Error(`No primary key registered for '${entityTypeClass.name}'`);
        }
        return entry.PrimaryKey;
    }

    /**
     * Indicates whatever the object has a registered Key field
     * @param entityTypeClass The class to check the key for.
     */
    public static HasFor<T>(entityTypeClass: { new (): T }): boolean {
        return DecoratorDescriptorStore.GetDescriptor(entityTypeClass) != null;
    }
}

/**
 * 
 * @param target The target obect
 * @param propertyKey The property that should be a primary key
 */
export function PrimaryKey(target: Object, propertyKey: string) {
    console.log(`PrimaryKeyDecorator for '${target.constructor.name}' is property '${propertyKey}'`);

    DecoratorDescriptorStore.Add(<any>target, <PrimaryKeyDescriptorEntry>{
        PrimaryKey: propertyKey
    });
}