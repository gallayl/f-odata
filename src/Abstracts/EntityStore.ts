import { ODataGetOperation, ODataQuery } from "../Operations";
import { PrimaryKeys, Properties, ODataPropertyDesrciptorEntry, ForeignKeys, ForeignKeyDescriptorEntry } from "../ModelDecorators";

export abstract class EntityStore<EntityType, PrimaryKeyType>{

    protected readonly PrimaryKeyName: string;
    protected readonly Properties: ODataPropertyDesrciptorEntry[];
    protected readonly ForeignKeys: ForeignKeyDescriptorEntry[];

    constructor(entityReference: {new():EntityType}) {
        this.PrimaryKeyName = PrimaryKeys.GetFor(entityReference);
        this.Properties = Properties.GetFor(entityReference);
        this.ForeignKeys = ForeignKeys.GetFor(entityReference);
    }

    public abstract async GetSingleAsync<K extends keyof EntityType>(
            get: ODataGetOperation<EntityType, PrimaryKeyType, K> | undefined): Promise<EntityType>;
    public abstract async GetCollectionAsync<K extends keyof EntityType>(query: ODataQuery<EntityType, K> | undefined): Promise<EntityType[]>;
    public abstract async PostAsync(entity: EntityType): Promise<EntityType>;
    public abstract async PatchAsync(primaryKey: PrimaryKeyType, delta: Partial<EntityType>): Promise<EntityType>;
    public abstract async PutAsync(primaryKey: PrimaryKeyType, entity: EntityType): Promise<EntityType>;
    public abstract async Delete(primaryKey: PrimaryKeyType): Promise<any>;
}