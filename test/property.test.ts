import { suite, test } from "mocha-typescript";
import { Properties, PrimaryKey, Property } from "../src/ModelDecorators";
import * as chai from "chai";


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

class TwoProperties{
    @PrimaryKey
    Id: number;
    @Property
    Prop1: string;
    @Property
    Prop2: string;
}

@suite("OData Property decorator and store tests")
export class PropertyTests {

    @test("Should get an empty array if no property defined")
    shouldGetEmptyArrayIfPropertyNotSpecified() {
        let result = Properties.GetFor(NoPropertiesDefined);
        chai.expect(result.length).equals(0);
    }

    @test("Should get one if a property is defined")
    shouldGetOne() {
        let result = Properties.GetFor(OneProperty);
        chai.expect(result.length).equals(1);
    }

    @test("Should get 2 if 2 property and a primary key is defined")
    shouldGetTwo() {
        let result = Properties.GetFor(TwoProperties);
        console.log(result);
        chai.expect(result.length).equals(2);
    }

}