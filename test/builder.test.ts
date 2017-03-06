import { suite, test } from "mocha-typescript";
import { Builder } from "../src/EndpointModel";
import * as chai from "chai";
import chaiHttp = require("chai-http");

class A {
    Id: number;
    Name: string;
}

class B {
    Id: number;
    Name: any;
}

@suite("OData Endpoint builder tests")
export class EndpointBuilderTests {

    private b: Builder;

    constructor() {
        chai.use(chaiHttp);
    }

    before() {
        this.b = new Builder();
    }

    @test("Register EntityType 'A'")
    RegisterClassA() {
        new Builder().EntityType(A, "Id");
    }

    @test("Register EntityType 'B'")
    RegisterClassB() {
        new Builder().EntityType(B, "Id");
    }

    @test("Register EntityType 'A' and EntityType 'B' into the same builder")
    RegisterClassAB() {
        this.b.EntityType(A, "Id");
        this.b.EntityType(B, "Id");
    }

    @test("Register EntityType 'A' without key field should throw error")
    RegisterClassAWithoutKeyThrowError() {
        chai.assert.throw(() => {
            this.b.EntityType(A);
        }, Error);
    }

    @test("Register EntityType 'A' and get EntityType 'A' without keyfield")
    RegisterSetA() {
        this.b.EntityType(A, "Id");
        let aType = this.b.EntityType(A);
        chai.expect(aType.Name).equals("A");
        chai.expect(aType.KeyPropertyRef).equals("Id");
    }

    @test("Register EntityType 'A' and register EntitySet 'As'")
    RegisterAandAs() {
        this.b.EntityType(A, "Id");
        this.b.EntitySet(A, "As");
    }

    @test("Register EntityType 'A', 'B' and EntitySet 'As' and 'Bs'")
    RegisterABandAsBs() {
        this.b.EntityType(A, "Id");
        this.b.EntityType(B, "Id");
        this.b.EntitySet(A, "As");
        this.b.EntitySet(B, "Bs");
    }

    @test("Register EntityType 'A', EntitySet 'As' and get EntitySet 'As'")
    RegisterAandAsAndGetA() {
        this.b.EntityType(A, "Id");
        this.b.EntitySet(A, "As");
        let type = this.b.EntityType(A);
        let set = this.b.EntitySet(A, "As");
        chai.expect(set.CollectionName).equals("As");
        chai.expect(set.EntityType.Name).equals(type.Name);
    }

    @test("Register EntitySet for entity 'A' without defining EntityType 'A' should throw an error")
    RegisterAsWithoutAShouldThrow() {
        chai.expect(() => {
            this.b.EntitySet(A, "As");
        }).throw(Error);
    }

    @test("Register Type 'A','B', set 'As' and register B into As should throw mismatch error")
    RegisterEntitySetDifferentTypeMismatch() {
        let b = new Builder();
        b.EntityType(A, "Id");
        b.EntityType(B, "Id");
        b.EntitySet(A, "As");

        chai.expect(() => {
            b.EntitySet(B, "As");
        }).to.throw(Error)
    }
}