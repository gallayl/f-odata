import * as chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { PrimaryKey, Properties, Property } from '../src/ModelDecorators';

class NoPropertiesDefined {
    public Id: number;
    public Name: string;
    public Prop: any;
}

// tslint:disable-next-line:max-classes-per-file
class OneProperty {
    public Id: number;

    @Property
    public Prop1: string;
}

// tslint:disable-next-line:max-classes-per-file
class TwoProperties {
    @PrimaryKey
    public Id: number;
    @Property
    public Prop1: string;
    @Property
    public Prop2: string;
}

// tslint:disable-next-line:max-classes-per-file
@suite('OData Property decorator and store tests')
export class PropertyTests {

    @test('HasFor should return false if model doesn\'t have properties declared')
    public hasForShouldReturnFalse() {
        const result = Properties.HasFor(NoPropertiesDefined);
        chai.expect(result).equals(false);
    }

    @test('HasFor should return true if model has properties declared')
    public hasForShouldReturTrue() {
        const result = Properties.HasFor(OneProperty);
        chai.expect(result).equals(true);

        const res2 = Properties.HasFor(TwoProperties);
        chai.expect(res2).equals(true);
    }

    @test('Should get an empty array if no property defined')
    public shouldGetEmptyArrayIfPropertyNotSpecified() {
        const result = Properties.GetFor(NoPropertiesDefined);
        chai.expect(result.length).equals(0);
    }

    @test('Should get one if a property is defined')
    public shouldGetOne() {
        const result = Properties.GetFor(OneProperty);
        chai.expect(result.length).equals(1);
    }

    @test('Should get 2 if 2 property and a primary key is defined')
    public shouldGetTwo() {
        const result = Properties.GetFor(TwoProperties);
        chai.expect(result.length).equals(2);
    }

}
