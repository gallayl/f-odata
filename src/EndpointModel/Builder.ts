import { TEntityType, TEntitySet, TEntityKeyElement, TProperty, SchemaType } from "../../xmlns/docs.oasis-open.org/odata/ns/edm";
import { PrimaryKeys, Properties } from "../ModelDecorators";
import { DecoratorDescriptorStore } from "../ModelDecorators/DecoratorDescriptorStore";

/**
 * The Builder class provides you an API to create OData ShcemaTypes
 */
export class Builder {

    private EntityTypes: TEntityType[] = [];
    private EntitySets: TEntitySet[] = [];

    /**
     * The Builder class provides you an API to create OData ShcemaTypes
     * @param NameSpaceRoot The root of the public Express route where the Builder will be accessible
     */
    constructor(public NameSpaceRoot:string) { }

    /**
     * Gets the SchemaType based on the provided EntityTypes, EntitySets, etc...
     */
    public GetModel(): SchemaType {
        return {
            Namespace: this.NameSpaceRoot,
            EntityType: this.EntityTypes,
            EntityContainer: [{
                EntitySet: this.EntitySets
            }]
        } as SchemaType;
    }

    
    /**
     * Returns an EntityType for the model class (and registers it to the Builder is neccessary)
     * @param entityTypeClass The model class for the EntityType. @PrimaryKey is required.
     */
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

    /**
     * Gets an EntitySet with a specified name for an EntityType. Will be registered to the builder if neccessary
     * @param entityTypeClass entityTypeClass The model class for the EntitySet. Register as an EntityType before adding an EntitySet
     * @param entitySetName The collection name (will be part of the API URL)
     */
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