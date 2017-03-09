import { ODataGetOperation, ODataQuery } from "../Operations";
import { PrimaryKeys, Properties, ODataPropertyDesrciptorEntry, ForeignKeys, ForeignKeyDescriptorEntry } from "../ModelDecorators";

export abstract class EntityStore<T>{

    protected readonly PrimaryKeyName: string;
    protected readonly Properties: ODataPropertyDesrciptorEntry[];
    protected readonly ForeignKeys: ForeignKeyDescriptorEntry[];

    constructor(entityReference: {new():T}) {
        this.PrimaryKeyName = PrimaryKeys.GetFor(entityReference);
        this.Properties = Properties.GetFor(entityReference);
        this.ForeignKeys = ForeignKeys.GetFor(entityReference);
    }

    protected EvaluateGetOperation(
        primaryKey: any,
        get: (op: ODataGetOperation<T>)=>ODataGetOperation<T> | ODataGetOperation<T> | undefined){
        if (typeof get === "function"){
            return get(new ODataGetOperation<T>(primaryKey));
        }
        return get;
    }

    public abstract async GetSingleAsync(
            primaryKey: any,
            get: (op: ODataGetOperation<T>)=>ODataGetOperation<T> | ODataGetOperation<T> | undefined): Promise<T>;
    public abstract async GetCollectionAsync(query: (op: ODataQuery<T>)=>ODataQuery<T> | ODataQuery<T> | undefined): Promise<T[]>;
    public abstract async PostAsync(entity: T): Promise<T>;
    public abstract async PatchAsync(primaryKey: any, delta: Partial<T>): Promise<T>;
    public abstract async PutAsync(primaryKey: any, entity: T): Promise<T>;
    public abstract async Delete(primaryKey: any): Promise<any>;

}