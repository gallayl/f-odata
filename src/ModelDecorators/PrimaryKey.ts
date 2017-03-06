class KeyModel {
    Object: Object;
    ClassName: string;
    PropertyName: string;
}

/**
 * internal class to store the primary key values. Hides the Add() method
 */
class KeyStoreInner {

    /**
     * The list of the Object - KeyField relations
     */
    private static keysInternal: KeyModel[] = [];

    /**
     * Gets the Key field name for the specified object
     * @param obj The object to get the Primary Key field for.
     */
    public static GetKey<T>(obj: { new (): T }): string {
        let found = this.keysInternal.find(k => k.Object.constructor === obj);
        if (!found) {
            return null;
        }
        return found.PropertyName;
    }

    /**
     * Adds a value to the Primary Key store. Used by PrimaryKey decorator only.
     * @param newValue The new Object and Key values
     */
    public static Add<T>(entityTypeClass: { new (): T }, propertyName: string) {
        this.keysInternal.push({
            ClassName: entityTypeClass.name,
            PropertyName: propertyName,
            Object: entityTypeClass
        });
    }
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
        let found = KeyStoreInner.GetKey(entityTypeClass);
        if (!found){
            throw new Error(`Key not registered for '${entityTypeClass.name}'`);
        }
        return found;
    }

    /**
     * Indicates whatever the object has a registered Key field
     * @param entityTypeClass The class to check the key for.
     */
    public static HasFor<T>(entityTypeClass: { new (): T }): boolean {
        return KeyStoreInner.GetKey(entityTypeClass) != null;
    }
}

/**
 * 
 * @param target The target obect
 * @param propertyKey The property that should be a primary key
 */
export function PrimaryKey(target: Object, propertyKey: string) {
    console.log(`PrimaryKeyDecorator for '${target.constructor.name}' is property '${propertyKey}'`);
    KeyStoreInner.Add(<any>target, propertyKey);
}