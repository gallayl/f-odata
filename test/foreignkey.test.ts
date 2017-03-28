import * as chai from "chai";
import { suite, test } from "mocha-typescript";
import { ForeignKey, ForeignKeys, PrimaryKey, PrimaryKeys } from "../src/ModelDecorators";

class WithoutForeignKey {
    @PrimaryKey
    id: number;
    a: number;
    b: number;
}

class WithForeignKey {
    @PrimaryKey
    id: number;

    ref_id: number;
    @ForeignKey(WithForeignKey, "ref_id")
    reference: WithForeignKey;
}

@suite("Foreign key decorator tests")
export class ForeignKeyTests {

    @test("Without defined keys should return empty array")
    WithoutKeyShouldReturnempty() {
        const result = ForeignKeys.GetFor(WithoutForeignKey);
        chai.expect(result.length).equals(0);
    }

    @test("With defined keys should return a key descriptor")
    WithKeyShouldReturnKeyDescriptor() {
        const result = ForeignKeys.GetFor(WithForeignKey);
        chai.expect(result.length).equals(1);
    }


}