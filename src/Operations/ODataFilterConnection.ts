import { ODataFilterBuilder } from './ODataFilterBuilder';
import { ODataFilterExpression } from './ODataFilterExpression';
export type FilterArgs<T, K> = [K, string];
export type FilterSegment<T> = ODataFilterExpression<T> | ODataFilterConnection<T>;

export class ODataFilterConnection<T>{

    private type: string;
    constructor(public filterBuilderRef: ODataFilterBuilder<T>) { }

    /**
     * Sets the connection between OData Filter expression segments to 'AND' type
     * @returns The next ODataFilterExpression (Fluent)
     */
    public get And() {
        this.type = 'and';
        this.filterBuilderRef.filterSegments.push(this);
        return new ODataFilterExpression<T>(this.filterBuilderRef);
    }

    /**
     * Sets the connection between OData Filter expression segments to OR type
     * @returns The next ODataFilterExpression (Fluent)
     */
    public get Or() {
        this.type = 'or';
        this.filterBuilderRef.filterSegments.push(this);
        return new ODataFilterExpression<T>(this.filterBuilderRef);
    }

    public toString() {
        return this.type;
    }
}
