import { EntityStore } from "../Abstracts/EntityStore";
import { ODataGetOperation, ODataQuery } from "../Operations";

export class InMemoryStore<EntityType, PrimaryKeyType> extends EntityStore<EntityType, PrimaryKeyType> {

    private Entities: EntityType[] = [];

    public async GetSingleAsync(primaryKey: PrimaryKeyType,
        get: (op: ODataGetOperation<EntityType, PrimaryKeyType>) => ODataGetOperation<EntityType, PrimaryKeyType> | ODataGetOperation<EntityType, PrimaryKeyType> | undefined): Promise<EntityType> {
        return this.Entities.find(a => a[this.PrimaryKeyName] === primaryKey)
    }
    public GetCollectionAsync(query: (op: ODataQuery<EntityType>) => ODataQuery<EntityType> | undefined): Promise<EntityType[]> {
        throw new Error("Method not implemented.");
    }
    public PostAsync(entity: EntityType): Promise<EntityType> {
        throw new Error("Method not implemented.");
    }
    public PatchAsync(primaryKey: any, delta: Partial<EntityType>): Promise<EntityType> {
        throw new Error("Method not implemented.");
    }
    public PutAsync(primaryKey: any, entity: EntityType): Promise<EntityType> {
        throw new Error("Method not implemented.");
    }
    public Delete(primaryKey: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
}

export class InMemoryStoreId<EntityType> extends InMemoryStore<EntityType, number>{ }

export class InMemoryStoreGuid<EntityType> extends InMemoryStore<EntityType, string>{ }