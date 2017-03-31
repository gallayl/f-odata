import { FilterSegment } from './ODataFilterConnection';
import { ODataFilterExpression } from './ODataFilterExpression';

export class ODataFilterBuilder<T>{

    public filterSegments: Array<FilterSegment<T>> = [];

    /**
     * Factory method for creating ODataFilterBuilders
     * @returns The first ODataFilterExpression value for the ODataFilterBuilder
     */
    public static Create<T>(): ODataFilterExpression<T> {
        const builder = new ODataFilterBuilder();
        const firstSegment = new ODataFilterExpression(builder);
        return firstSegment;
    }

    /**
     * Evaluates the ODataFilterBuilder<T>'s segments into a parsed OData Filter expression
     * @returns The Filter query expression
     */
    public toString(): string {
        return this.filterSegments.map((s) => s.toString()).join(' ');
    }
}
