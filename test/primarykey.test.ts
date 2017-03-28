import * as chai from "chai";
import { suite, test } from "mocha-typescript";
import { PrimaryKey, PrimaryKeys } from "../src/ModelDecorators/PrimaryKey";

export class WithoutKey {
    MyProperty: string;
}

export class HasKey {
    @PrimaryKey
    id: number;
}

@suite("Primary Key Decorator tests")
export class PrimaryKeyTest {


    @test("Without key should throw an error")
    WithoutKeyShouldThrow() {
        chai.expect(() => {
            PrimaryKeys.GetFor(WithoutKey);
        }).throw(Error);
    }

    @test("WithKeyShouldSucceed")
    WithKeyShouldGetRegisteredKey() {
        const key = PrimaryKeys.GetFor(HasKey);
        chai.expect(key).equals("id");
    }

    @test("HasForShouldReturnFalseIfNotFound")
    HasForNotFound() {
        chai.expect(PrimaryKeys.HasFor(WithoutKey)).equals(false);
    }

    @test("HasForShouldReturnTrueIfFound")
    HasForFound() {
        chai.expect(PrimaryKeys.HasFor(HasKey)).equals(true);
    }

}