
export class DecoratorDescriptor {
    Object: Object;
    ClassName: string;
    Entries: Object[];
}

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
        return this.descriptorsInternal.find(k => k.Object.constructor === obj);
    }

    /**
     * Adds a value to the Decorator Descriptor store.
     * Adds an entry for the Object if it not exist, appends the Entries otherwise.
     * @param newValue The new Object and Key values
     */
    public static Add<T>(entityTypeClass: { new (): T }, descriptorEntry: Object) {
        
        let found = this.GetDescriptor(entityTypeClass);      
        if (!found) {
            this.descriptorsInternal.push({
                ClassName: entityTypeClass.name,
                Object: entityTypeClass,
                Entries: [descriptorEntry]
            });

        } else {
            found.Entries.push(descriptorEntry)
        }
    }
}