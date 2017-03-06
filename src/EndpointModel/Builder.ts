import EntitySet from "./EntitySet";
import EntityType from "./EntityType";

export class Builder {

    private EntityTypes: EntityType[] = [];
    private EntitySets: EntitySet[] = [];

    public EntityType<K extends keyof T, T>(entityTypeClass: { new (): T }, keyfield?: K | K[]): EntityType {
        let existing = this.EntityTypes.find(t => t.Name == entityTypeClass.name);
        if (existing) {
            return existing;
        }

        if (!keyfield) {
            throw new Error(`Key field(s) are required on the first definition for EntityType '${entityTypeClass.name}'`);
        }

        let entityType = EntityType.CreateFor(entityTypeClass, keyfield);
        this.EntityTypes.push(entityType);
        return entityType;
    }

    public EntitySet<T>(entityTypeClass: { new (): T }, entitySetName: string): EntitySet {

        let existing = this.EntitySets.find(s => s.CollectionName === entitySetName);
        if (existing) {
            if (existing.EntityType.Name != entityTypeClass.name) {
                throw new Error(`Mismatch on registering entitySet '${entitySetName}', with type '${entityTypeClass.name}. 
                Already registered to type '${existing.EntityType.Name}'`)
            }
            return existing;
        }

        let entityType = this.EntityTypes.find(e => e.Name === entityTypeClass.name);
        if (!entityType) {
            throw new Error(`Entity type not yet added for type '${entityTypeClass.name}', please add it first.`)
        }

        let newEntitySet: EntitySet = {
            CollectionName: entitySetName,
            EntityType: entityType
        };

        this.EntitySets.push(newEntitySet);

        return newEntitySet;
    }
}