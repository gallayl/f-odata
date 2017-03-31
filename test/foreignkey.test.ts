import * as chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { ForeignKey, ForeignKeys, PrimaryKey, PrimaryKeys } from '../src/ModelDecorators';

class WithoutForeignKey {
    @PrimaryKey
    public id: number;
    public a: number;
    public b: number;
}

// tslint:disable-next-line:max-classes-per-file
class WithForeignKey {
    @PrimaryKey
    public id: number;

    public refId: number;
    @ForeignKey(WithForeignKey, 'refId')
    public reference: WithForeignKey;
}

// tslint:disable-next-line:max-classes-per-file
@suite('Foreign key decorator tests')
export class ForeignKeyTests {

    @test('Without defined keys should return empty array')
    public WithoutKeyShouldReturnempty() {
        const result = ForeignKeys.GetFor(WithoutForeignKey);
        chai.expect(result.length).equals(0);
    }

    @test('With defined keys should return a key descriptor')
    public WithKeyShouldReturnKeyDescriptor() {
        const result = ForeignKeys.GetFor(WithForeignKey);
        chai.expect(result.length).equals(1);
    }

}
