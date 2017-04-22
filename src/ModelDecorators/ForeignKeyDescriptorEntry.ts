export class ForeignKeyDescriptorEntry {
    public ForeignKeyField: string;
    public ReferenceName: string;

    /**
     *
     */
    constructor(foreignKeyField: string, referenceName: string) {
        this.ForeignKeyField = foreignKeyField;
        this.ReferenceName = referenceName;
    }
}
