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

    protected EvaluateGetOperation(
        primaryKey: PrimaryKeyType,
        get: (op: ODataGetOperation<EntityType, PrimaryKeyType>)=>ODataGetOperation<EntityType, PrimaryKeyType> | ODataGetOperation<EntityType, PrimaryKeyType> | undefined){
        if (typeof get === "function"){
            return get(new ODataGetOperation<EntityType, PrimaryKeyType>(primaryKey));
        }
        return get;
    }

    public abstract async GetSingleAsync(
            primaryKey: PrimaryKeyType,
            get: (op: ODataGetOperation<EntityType, PrimaryKeyType>)=>ODataGetOperation<EntityType, PrimaryKeyType> | ODataGetOperation<EntityType, PrimaryKeyType> | undefined): Promise<EntityType>;
    public abstract async GetCollectionAsync(query: (op: ODataQuery<EntityType>)=>ODataQuery<EntityType> | ODataQuery<EntityType> | undefined): Promise<EntityType[]>;
    public abstract async PostAsync(entity: EntityType): Promise<EntityType>;
    public abstract async PatchAsync(primaryKey: PrimaryKeyType, delta: Partial<EntityType>): Promise<EntityType>;
    public abstract async PutAsync(primaryKey: PrimaryKeyType, entity: EntityType): Promise<EntityType>;
    public abstract async Delete(primaryKey: PrimaryKeyType): Promise<any>;

}