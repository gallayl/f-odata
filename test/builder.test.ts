import * as chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { Builder } from '../src/EndpointModel';
import chaiHttp = require('chai-http');
import { PrimaryKey, PrimaryKeyDescriptorEntry, Property } from '../src/ModelDecorators';
import { DecoratorDescriptorStore } from '../src/ModelDecorators/DecoratorDescriptorStore';

class A {
    @PrimaryKey
    public Id: number;
    public Name: string;
}

// tslint:disable-next-line:max-classes-per-file
class B {
    @PrimaryKey
    public Id: number;
    public Name: any;
}
// tslint:disable-next-line:max-classes-per-file
class WithoutKey {
    public Id: number;
}
// tslint:disable-next-line:max-classes-per-file
class WithoutKeyWithProperty {
    @Property
    public prop1: string;
}

// tslint:disable-next-line:max-classes-per-file
@suite('OData Endpoint builder tests')
export class EndpointBuilderTests {

    private b: Builder;

    constructor() {
        chai.use(chaiHttp);
    }

    public before() {
        this.b = new Builder('api');
    }

    @test('Register EntityType \'A\'')
    public RegisterClassA() {
        new Builder('api').EntityType(A);
    }

    @test('Register EntityType \'B\'')
    public RegisterClassB() {
        new Builder('api').EntityType(B);
    }

    @test('Register EntityType \'A\' and EntityType \'B\' into the same builder')
    public RegisterClassAB() {
        this.b.EntityType(A);
        this.b.EntityType(B);
    }

    @test('Register EntityType without key field should throw error')
    public RegisterClassAWithoutKeyThrowError() {
        chai.assert.throw(() => {
            this.b.EntityType(WithoutKey);
        }, Error);

        chai.assert.throw(() => {
            this.b.EntityType(WithoutKeyWithProperty);
        }, Error);
    }

    @test('Register EntityType \'A\' and get EntityType \'A\' without keyfield')
    public RegisterSetA() {
        this.b.EntityType(A);
        const aType = this.b.EntityType(A);
        chai.expect(aType.Name).equals('A');
        chai.expect(aType.Key[0].PropertyRef[0].Name).equals('Id');
    }

    @test('Register EntityType \'A\' and register EntitySet \'As\'')
    public RegisterAandAs() {
        this.b.EntityType(A);
        this.b.EntitySet(A, 'As');
    }

    @test('Register EntityType \'A\', \'B\' and EntitySet \'As\' and \'Bs\'')
    public RegisterABandAsBs() {
        this.b.EntityType(A);
        this.b.EntityType(B);
        this.b.EntitySet(A, 'As');
        this.b.EntitySet(B, 'Bs');
    }

    @test('Register EntityType \'A\', EntitySet \'As\' and get EntitySet \'As\'')
    public RegisterAandAsAndGetA() {
        this.b.EntityType(A);
        this.b.EntitySet(A, 'As');

        const type = this.b.EntityType(A);
        const set = this.b.EntitySet(A, 'As');

        chai.expect(set.Name).equals('As');
        chai.expect(set.EntityType).equals(type.Name);
    }

    @test('Register EntitySet for entity \'A\' without defining EntityType \'A\' should throw an error')
    public RegisterAsWithoutAShouldThrow() {
        chai.expect(() => {
            this.b.EntitySet(A, 'As');
        }).throw(Error);
    }

    @test('Register Type \'A\',\'B\', set \'As\' and register B into As should throw mismatch error')
    public RegisterEntitySetDifferentTypeMismatch() {
        const b = new Builder('api');
        b.EntityType(A);
        b.EntityType(B);
        b.EntitySet(A, 'As');

        chai.expect(() => {
            b.EntitySet(B, 'As');
        }).to.throw(Error);
    }
}
