import { TEntityType, TEntitySet, TEntityKeyElement, TProperty, SchemaType } from "../../xmlns/docs.oasis-open.org/odata/ns/edm";
import { PrimaryKeys, Properties } from "../ModelDecorators";
import { DecoratorDescriptorStore } from "../ModelDecorators/DecoratorDescriptorStore";

export class Builder {


    private EntityTypes: TEntityType[] = [];
    private EntitySets: TEntitySet[] = [];

    constructor(private namespaceRoot: string = "Api") { }

    public GetModel(): SchemaType {
        return <SchemaType>{
            Namespace: this.namespaceRoot,
            EntityType: this.EntityTypes,
            EntityContainer: [{
                EntitySet: this.EntitySets
            }]
        };
    }

    public EntityType<T>(entityTypeClass: { new (): T }): TEntityType {

        let entityTypeName = DecoratorDescriptorStore.GetName(entityTypeClass);

        let existing = this.EntityTypes.find(t => t.Name === entityTypeName);
        if (existing) {
            return existing;
        }
        let keyfield = PrimaryKeys.GetFor(entityTypeClass);

        if (!keyfield) {
            throw new Error(`Key field(s) are required on the first definition for EntityType '${entityTypeName}'`);
        }

        let entityType = <TEntityType>{
            Name: entityTypeName,
            Property: [],
            NavigationProperty: []
        };

        entityType.Key = <TEntityKeyElement[]>[{
            PropertyRef: [
                {"Name": keyfield},
            ]
        }];

        Properties.GetFor(entityTypeClass).forEach(prop=>{
            entityType.Property.push(<TProperty>{
                "Name": prop.PropertyName,
                "Type": prop.EdmType.toString()
            });
        });

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