import { ODataFilterBuilder } from './ODataFilterBuilder';
import { ODataFilterExpression } from './ODataFilterExpression';
import { ODataOperation } from './ODataOperation';

export class ODataQuery<EntityType, FieldType> extends ODataOperation<EntityType, FieldType> {

    /**
     * Sets the '$filter=' variable in the OData Query URL.
     */
    public Filter: string;

    /**
     * Builds a query expression for the OData Query
     * @param build The builder expression
     * @returns The ODataQuery instance (Fluent)
     */
    public BuildFilter(build: (b: ODataFilterExpression<EntityType>) => void): ODataQuery<EntityType, FieldType> {
        const builder = ODataFilterBuilder.Create<EntityType>();
        build(builder);
        this.Filter = builder.filterBuilderRef.toString();
        return this;
    }

    /**
     * Sets the OData $top= query attribute
     */
    public Top?: number;

    /**
     * Sets the OData $skip= query attribute
     */
    public Skip?: number;

    /**
     * Sets the OData $orderby= query attribute
     */
    public OrderBy?: FieldType[];

}
