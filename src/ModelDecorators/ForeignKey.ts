import { DecoratorDescriptorStore } from "./DecoratorDescriptorStore";

export class ForeignKeyDescriptorEntry {
    ForeignKeyField: string;
    ReferenceName: string;
}

function isForeignKeyDescriptorEntry(descriptor: any): descriptor is ForeignKeyDescriptorEntry {
    return (<ForeignKeyDescriptorEntry>descriptor).ForeignKeyField !== undefined
        &&
        (<ForeignKeyDescriptorEntry>descriptor).ReferenceName !== undefined;
}

export class ForeignKeys {

    public static GetFor<T>(entityTypeClass: { new (): T }): ForeignKeyDescriptorEntry[] {
        let descriptor = DecoratorDescriptorStore.GetDescriptor(entityTypeClass);
        return <ForeignKeyDescriptorEntry[]>descriptor.Entries.filter(a => isForeignKeyDescriptorEntry(a));
    }
}


export function ForeignKey<T>(foreignClassType: { new (): T }, foreignKeyFieldName: string) {
    return function (target: any, propertyName: string) {
        DecoratorDescriptorStore.Add(target,<ForeignKeyDescriptorEntry>{
            ForeignKeyField: foreignKeyFieldName,
            ReferenceName: foreignClassType.name
        });
    };
}