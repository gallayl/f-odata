import EntitySet from "./EntitySet";
import EntityType from "./EntityType";

export class Builder {

    private EntityTypes: EntityType[] = [];
    private EntitySets: EntitySet[] = [];

    public EntityType<K extends keyof T, T>(entityTypeClass: { new (): T }, keyfield: K): EntityType {

        if (this.EntityTypes.find(t=>t.Name == entityTypeClass.name)){
            throw new Error(`Entity type already registered for entity '${entityTypeClass.name}'`)
        }
        let entityType = EntityType.CreateFor(entityTypeClass, keyfield);
        this.EntityTypes.push(entityType);
        return entityType;
    }

    public EntitySet<T>(entityTypeClass: { new (): T }, entitySetName: string): EntitySet {
        if (this.EntitySets.find(s=>s.CollectionName == entitySetName)){
            throw new Error(`Entity set with name '${entitySetName}' already defined.`);
        }

        let entityType = this.EntityTypes.find(e=>e.Name == entityTypeClass.name);
        if (!entityType){
            throw new Error(`Entity type not yet added for type '${entityTypeClass.name}', please add it first.`)
        }

        let newEntitySet : EntitySet = {
            CollectionName: entitySetName,
            EntityType: entityType
        };

        return newEntitySet;
    }
}