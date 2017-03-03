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

    constructor() {
        chai.use(chaiHttp);
    }

    @test("Create Builder")
    CreateBuilder() {
        let b = new Builder();
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
        let b = new Builder();
        b.EntityType(A, "Id");
        b.EntityType(B, "Id");
    }

    @test("Register EntityType 'A' without key field should throw error")
    RegisterClassAWithoutKeyThrowError() {
        let b = new Builder();
        //b.EntityType(A, "Id");
        chai.assert.throw(() => {
            b.EntityType(A);
        }, Error);
    }

    @test("Register EntityType 'A' and get EntityType 'A' without keyfield")
    RegisterSetA(){
        let b = new Builder();
        b.EntityType(A,"Id");
        let aType = b.EntityType(A);
        chai.expect(aType.Name).equals("A");
        chai.expect(aType.KeyPropertyRef).equals("Id");
    }

    @test("Register EntityType 'A' and register EntitySet 'As'")
    RegisterAandAs(){
        let b = new Builder();
        b.EntityType(A, "Id");
        b.EntitySet(A, "As");
    }

    @test("Register EntityType 'A', 'B' and EntitySet 'As' and 'Bs'")
    RegisterABandAsBs(){
        let b = new Builder();
        b.EntityType(A,"Id");
        b.EntityType(B,"Id");
        b.EntitySet(A,"As");
        b.EntitySet(B,"Bs");
    }

    @test("Register EntityType 'A', EntitySet 'As' and get EntitySet 'As'")
    RegisterAandAsAndGetA(){
        let b = new Builder();
        b.EntityType(A,"Id");
        b.EntitySet(A,"As");
        let type = b.EntityType(A);
        let set = b.EntitySet(A,"As");
        chai.expect(set.CollectionName).equals("As");
        chai.expect(set.EntityType.Name).equals(type.Name);
    }

    @test("Register Type 'A','B', set 'As' and register B into As should throw mismatch error")
    RegisterEntitySetDifferentTypeMismatch(){
        let b = new Builder();
        b.EntityType(A,"Id");
        b.EntityType(B,"Id");
        b.EntitySet(A,"As");

        chai.expect(()=>{
            b.EntitySet(B,"As");
        }).to.throw(Error)
    }
}