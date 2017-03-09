import { ODataOperation } from "./ODataOperation";

export class ODataGetOperation<EntityType, PrimaryKeyType, K extends keyof EntityType> extends ODataOperation<EntityType, K> {
    public PrimaryKey: PrimaryKeyType;
}
