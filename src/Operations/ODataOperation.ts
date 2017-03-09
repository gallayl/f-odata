export abstract class ODataOperation<EntityType, Field> {
    public Expand?: Field[];
    public Select?: Field[];
}
