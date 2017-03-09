import { ODataFilterBuilder, ODataFilterExpression } from "./ODataFilterBuilder";
import { ODataOperation } from "./ODataOperation";

export class ODataQuery<EntityType> extends ODataOperation<EntityType> {
    private _filter: string;
    private _top: number;
    private _skip: number;
    private _orderBy: string;

    private buildQueryUrl(): string {
        let url = "?";
        if (this._filter) { url += `$filter=${this._filter}&`; }
        if (this._top) { url += `$top=${this._top}&`; }
        if (this._skip) { url += `$skip=${this._skip}&`; }
        if (this._orderBy) { url += `$orderby=${this._orderBy}&`; }
        if (this._expand) { url += `$expand=${this._expand}&`; }
        if (this._select) { url += `$expand=${this._select}&`; }
        return url;
    }

    constructor() {
        super();
    }

    /**
     * Sets the '$filter=' variable in the OData Query URL.
     * @param filter The plain text value for the odata $filter. Overrides the FilterBuilder
     * @returns the ODataQuery instance (Fluent)
     */
    public Filter(filter: string): ODataQuery<EntityType> {
        this._filter = filter;
        return this;
    };


    /**
     * Builds a query expression for the OData Query
     * @param build The builder expression
     * @returns The ODataQuery instance (Fluent)
     */
    public BuildFilter(build: (b: ODataFilterExpression<EntityType>) => void): ODataQuery<EntityType> {
        let builder = ODataFilterBuilder.Create<EntityType>();
        build(builder);
        this._filter = builder.filterBuilderRef.toString();
        return this;
    }

    /**
     * Sets the OData $top= query attribute
     * @param top The value to be returned by the query
     * @returns The ODataQuery instance (Fluent)
     */
    public Top(top: number): ODataQuery<EntityType> {
        this._top = top;
        return this;
    };

    /**
     * Sets the OData $skip= query attribute
     * @param skip The value to be skipped by the query
     * @returns The ODataQuery instance (Fluent)
     */
    public Skip(skip: number): ODataQuery<EntityType> {
        this._skip = skip;
        return this;
    }

    /**
     * Sets the OData $orderby= query attribute
     * @param orderBy The field name(s) in string
     * @returns The ODataQuery instance (Fluent)
     */
    public OrderBy<K extends keyof EntityType>(...orderBy: K[]): ODataQuery<EntityType> {
        this._orderBy = this.parseStringOrStringArray(...orderBy);
        return this;
    }

}
