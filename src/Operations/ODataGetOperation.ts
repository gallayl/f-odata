import { ODataOperation } from "./ODataOperation";

export class ODataGetOperation<EntityType, PrimaryKeyType, Fields> extends ODataOperation<EntityType, Fields> {
    public PrimaryKey: PrimaryKeyType;
}
