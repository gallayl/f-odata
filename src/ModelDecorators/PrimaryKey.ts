import { DecoratorDescriptorStore } from './DecoratorDescriptorStore';

class PrimaryKeyDescriptorEntry {
    FieldName: string;
    Type: string;
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
        let found = DecoratorDescriptorStore.GetDescriptor(entityTypeClass);
        if (!found) {
            throw new Error(`Key not registered for '${entityTypeClass.name}'`);
        }
        console.log("Entries",found.Entries);
        let entry = <PrimaryKeyDescriptorEntry>found.Entries.find(a => (<PrimaryKeyDescriptorEntry>a).Type == "PrimaryKey");
        return entry.FieldName;
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
        FieldName: propertyKey,
        Type: "PrimaryKey"
    });
}