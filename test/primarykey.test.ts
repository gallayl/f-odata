import * as chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { PrimaryKey, PrimaryKeys } from '../src/ModelDecorators/PrimaryKey';

export class WithoutKey {
    public MyProperty: string;
}

// tslint:disable-next-line:max-classes-per-file
export class HasKey {
    @PrimaryKey
    public id: number;
}

// tslint:disable-next-line:max-classes-per-file
@suite('Primary Key Decorator tests')
export class PrimaryKeyTest {

    @test('Without key should throw an error')
    public WithoutKeyShouldThrow() {
        chai.expect(() => {
            PrimaryKeys.GetFor(WithoutKey);
        }).throw(Error);
    }

    @test('WithKeyShouldSucceed')
    public WithKeyShouldGetRegisteredKey() {
        const key = PrimaryKeys.GetFor(HasKey);
        chai.expect(key).equals('id');
    }

    @test('HasForShouldReturnFalseIfNotFound')
    public HasForNotFound() {
        chai.expect(PrimaryKeys.HasFor(WithoutKey)).equals(false);
    }

    @test('HasForShouldReturnTrueIfFound')
    public HasForFound() {
        chai.expect(PrimaryKeys.HasFor(HasKey)).equals(true);
    }

}
