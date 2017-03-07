import { TEntityType, TEntitySet, TEntityKeyElement, TProperty, SchemaType } from "../../xmlns/docs.oasis-open.org/odata/ns/edm";
import { PrimaryKeys, Properties } from "../ModelDecorators";
import { DecoratorDescriptorStore } from "../ModelDecorators/DecoratorDescriptorStore";

export class Builder {


    private EntityTypes: TEntityType[] = [];
    private EntitySets: TEntitySet[] = [];

    constructor(public NameSpaceRoot:string) { }

    public GetModel(): SchemaType {
        return {
            Namespace: this.NameSpaceRoot,
            EntityType: this.EntityTypes,
            EntityContainer: [{
                EntitySet: this.EntitySets
            }]
        } as SchemaType;
    }

    public EntityType<T>(entityTypeClass: { new (): T }): TEntityType {

        let entityTypeName = DecoratorDescriptorStore.GetName(entityTypeClass);

        let existing = this.EntityTypes.find(t => t.Name === entityTypeName);
        if (existing) {
            return existing;
        }
        let keyfield = PrimaryKeys.GetFor(entityTypeClass);

        let entityType = {
            Name: entityTypeName,
            Property: [],
            NavigationProperty: []
        } as TEntityType;

        entityType.Key = [{
            PropertyRef: [
                { "Name": keyfield },
            ]
        }] as TEntityKeyElement[];

        let odataProperties = Properties.GetFor(entityTypeClass);
        let tProperties = odataProperties.map(prop => <TProperty>{
                Name: prop.PropertyName,
                Type: prop.EdmType.toString()
            });

        entityType.Property = tProperties;


        this.EntityTypes.push(entityType);
        return entityType;
    }

    public EntitySet<T>(entityTypeClass: { new (): T }, entitySetName: string): TEntitySet {

        let existing = this.EntitySets.find(s => s.Name === entitySetName);

        let entityTypeName = DecoratorDescriptorStore.GetName(entityTypeClass);

        if (existing) {
            if (existing.EntityType !== entityTypeName) {
                throw new Error(`Mismatch on registering entitySet '${entitySetName}', with type '${entityTypeName}. 
                Already registered to type '${existing.EntityType}'`);
            }
            return existing;
        }

        let entityType = this.EntityTypes.find(e => e.Name === entityTypeName);
        if (!entityType) {
            throw new Error(`Entity type not yet added for type '${entityTypeName}', please add it first.`);
        }

        let newEntitySet = <TEntitySet>{
            Name: entitySetName,
            EntityType: entityTypeName,
        };
        this.EntitySets.push(newEntitySet);
        return newEntitySet;
    }
}