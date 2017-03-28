import * as chai from "chai";
import { suite, test } from "mocha-typescript";
import { PrimaryKey, Properties, Property } from "../src/ModelDecorators";


class NoPropertiesDefined {
    Id: number;
    Name: string;
    Prop: any;
}

class OneProperty {
    Id: number;

    @Property
    Prop1: string;
}

class TwoProperties {
    @PrimaryKey
    Id: number;
    @Property
    Prop1: string;
    @Property
    Prop2: string;
}

@suite("OData Property decorator and store tests")
export class PropertyTests {

    @test("HasFor should return false if model doesn't have properties declared")
    hasForShouldReturnFalse() {
        const result = Properties.HasFor(NoPropertiesDefined);
        chai.expect(result).equals(false);
    }

    @test("HasFor should return true if model has properties declared")
    hasForShouldReturTrue() {
        const result = Properties.HasFor(OneProperty);
        chai.expect(result).equals(true);

        const res2 = Properties.HasFor(TwoProperties);
        chai.expect(res2).equals(true);
    }

    @test("Should get an empty array if no property defined")
    shouldGetEmptyArrayIfPropertyNotSpecified() {
        const result = Properties.GetFor(NoPropertiesDefined);
        chai.expect(result.length).equals(0);
    }

    @test("Should get one if a property is defined")
    shouldGetOne() {
        const result = Properties.GetFor(OneProperty);
        chai.expect(result.length).equals(1);
    }

    @test("Should get 2 if 2 property and a primary key is defined")
    shouldGetTwo() {
        const result = Properties.GetFor(TwoProperties);
        chai.expect(result.length).equals(2);
    }

}