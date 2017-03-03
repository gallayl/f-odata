import Property from "./Property";
import NavigationProperty from "./NavigationProperty";

export default class EntityType {
    Name: string;
    KeyPropertyRef: string | string[];
    Properties: Property[];
    NavigationProperties: NavigationProperty[];

    public static CreateFor<K extends keyof T, T>(entityTypeClass: { new (): T,},  keyProperty: K | K[] ): EntityType {
        let properties:Property[] = [];
        let navigationProperties: NavigationProperty[] = [];

        return {
            Name: entityTypeClass.name,
            KeyPropertyRef: keyProperty,
            Properties: properties,
            NavigationProperties: navigationProperties
        }
    }
}