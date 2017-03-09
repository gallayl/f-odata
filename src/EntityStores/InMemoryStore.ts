import { EntityStore } from "../Abstracts/EntityStore";
import { ODataGetOperation, ODataQuery } from "../Operations";
import { PrimaryKeys } from "../ModelDecorators";

export class InMemoryStore<EntityType, PrimaryKeyType, Fields> extends EntityStore<EntityType, PrimaryKeyType> {

    private Entities: EntityType[] = [];

    public async GetSingleAsync<K extends keyof EntityType>(get: ODataGetOperation<EntityType, PrimaryKeyType, K> | PrimaryKeyType): Promise<EntityType> {
        let key = get;
        if (get["PrimaryKey"]){
            return 
        }
        return this.Entities.find(a=><PrimaryKeyType>a[this.PrimaryKeyName] === key);
    }
    public async GetCollectionAsync(q: ODataQuery<EntityType, Fields>): Promise<EntityType[]> {
        return this.Entities;
    }
    public async PostAsync(entity: EntityType): Promise<EntityType> {
        this.Entities.push(entity);
        return entity;
    }
    public async PatchAsync(primaryKey: PrimaryKeyType, delta: Partial<EntityType>): Promise<EntityType> {
        let e = await this.GetSingleAsync(primaryKey);
        Object.keys(delta).forEach((val, name)=>{
            e[name] = val;
        });
        return e;
    }
    public async PutAsync(primaryKey: PrimaryKeyType, entity: EntityType): Promise<EntityType> {
        let e = await this.GetSingleAsync(primaryKey);
        e = entity;
        return e;
    }
    public async Delete(primaryKey: PrimaryKeyType): Promise<any> {
        let e = await this.GetSingleAsync(primaryKey);
        let index = this.Entities.indexOf(e);
        this.Entities.splice(index,1);
        return true;
    }

    public static CreateWithId<EntityType, K extends keyof EntityType>(entityRef:{new():EntityType}){
        return new InMemoryStore<EntityType, number, K>(entityRef);
    }
 
}
