import { DecoratorDescriptor } from './DecoratorDescriptor';

export class DecoratorDescriptorStore {

    /**
     * The list of DecoratorDescriptors for an Object
     */
    private static descriptorsInternal: DecoratorDescriptor[] = [];

    /**
     * Gets the DecoratorDescriptor for the specified object
     * @param obj The object to get the DecoratorDescriptor for.
     */
    public static GetDescriptor<T>(obj: { new (): T }): DecoratorDescriptor {
        return this.descriptorsInternal.filter((k) => obj === k.Object || obj.prototype === k.Object)[0];
    }

    /**
     * Gets the Entity Name for the specified model class
     * @param obj The model to get the EntityName for
     */
    public static GetName<T>(obj: { new (): T }): string {
        return this.GetDescriptor(obj).Object.constructor.name;
    }

    /**
     * Adds a value to the Decorator Descriptor store.
     * Adds an entry for the Object if it not exist, appends the Entries otherwise.
     * @param newValue The new Object and Key values
     */
    public static Add<T>(entityTypeClass: { new (): T }, descriptorEntry: any) {
        const found = this.GetDescriptor(entityTypeClass);
        if (!found) {
            this.descriptorsInternal.push({
                Entries: [descriptorEntry],
                Object: entityTypeClass,
            });

        } else {
            found.Entries.push(descriptorEntry);
        }
    }
}
