import { DecoratorDescriptorStore } from './DecoratorDescriptorStore';
import { ForeignKeyDescriptorEntry } from './ForeignKeyDescriptorEntry';

function isForeignKeyDescriptorEntry(descriptor: any): descriptor is ForeignKeyDescriptorEntry {
    return (descriptor as ForeignKeyDescriptorEntry).ForeignKeyField !== undefined
        &&
        (descriptor as ForeignKeyDescriptorEntry).ReferenceName !== undefined;
}

export class ForeignKeys {

    public static GetFor<T>(entityTypeClass: { new (): T }): ForeignKeyDescriptorEntry[] {
        const descriptor = DecoratorDescriptorStore.GetDescriptor(entityTypeClass);
        return descriptor.Entries.filter((a) => isForeignKeyDescriptorEntry(a)) as ForeignKeyDescriptorEntry[];
    }
}

export function ForeignKey<T>(foreignClassType: { new (): T }, foreignKeyFieldName: string) {
    return (target: any, propertyName: string) => {
        DecoratorDescriptorStore.Add(target, {
            ForeignKeyField: foreignKeyFieldName,
            ReferenceName: foreignClassType.name,
        } as ForeignKeyDescriptorEntry);
    };
}
