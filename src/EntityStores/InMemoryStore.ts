import { EntityStore } from "../Abstracts/EntityStore";
import { ODataGetOperation, ODataQuery } from "../Operations";

export class InMemoryStore<T> extends EntityStore<T> {


    private Entities: T[] = [];

    public async GetSingleAsync<K extends T>(primaryKey: K,
            get: (op: ODataGetOperation<T>)=>ODataGetOperation<T> | ODataGetOperation<T> | undefined): Promise<T> {
        
        return this.Entities.find(a=>a[this.PrimaryKeyName] === primaryKey)

    }
    public GetCollectionAsync(query: (op: ODataQuery<T>)=>ODataQuery<T> | undefined): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    public PostAsync(entity: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    public PatchAsync(primaryKey: any, delta: Partial<T>): Promise<T> {
        throw new Error("Method not implemented.");
    }
    public PutAsync(primaryKey: any, entity: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    public Delete(primaryKey: any): Promise<any> {
        throw new Error("Method not implemented.");
    }


}