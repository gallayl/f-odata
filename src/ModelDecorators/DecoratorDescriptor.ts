import { DescriptorEntryType, ForeignKeyDescriptorEntry,
    isForeignKeyDescriptorEntry, isODataPropertyDesrciptorEntry, isPrimaryKeyDescriptorEntry,
    ODataPropertyDesrciptorEntry,
    PrimaryKeyDescriptorEntry,
} from './';

export class DecoratorDescriptor {
    public Object: any = Object;
    public Entries: DescriptorEntryType[];

    /**
     *
     */
    // tslint:disable-next-line:no-empty
    constructor(object: any, entries: DescriptorEntryType[]) {
        this.Object = object;
        this.Entries = entries;
    }

    public get PrimaryKey(): PrimaryKeyDescriptorEntry{
        return this.Entries.filter((entry) => isPrimaryKeyDescriptorEntry(entry))
            .map((entry) => entry as PrimaryKeyDescriptorEntry)[0];
    }

    public get Properties(): ODataPropertyDesrciptorEntry[]{
        return this.Entries.filter((entry) => isODataPropertyDesrciptorEntry(entry))
            .map((entry) => entry as ODataPropertyDesrciptorEntry);
    }

    public get ForeignKeys(): ForeignKeyDescriptorEntry[]{
        return this.Entries.filter((entry) => isForeignKeyDescriptorEntry(entry))
            .map((entry) => entry as ForeignKeyDescriptorEntry);
    }
}
