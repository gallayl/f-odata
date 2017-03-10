import { suite, test } from "mocha-typescript";
import { PrimaryKey, ForeignKey } from "../src/ModelDecorators";
import { InMemoryStore } from "../src/EntityStores";
import * as chai from "chai";
import { TestHelpers } from "./";
class TestChild {
    Id: number;
    Value: string;
}

class TestClass {
    @PrimaryKey
    Id: number;
    Name: string;
    OtherValue?: string;

    ChildId?: number;
    @ForeignKey(TestChild, "ChildId")
    Child?: TestChild;
}

@suite("In Memory Store tests")
export class InMemoryStoreTests{
    private store: InMemoryStore<TestClass, Number, keyof TestClass>;

    before() {
        this.store = InMemoryStore.CreateWithId(TestClass);
    }

    @test("NotFound should return empty array")
    async NotFoundTest() {
        let result = await this.store.GetSingleAsync({
            PrimaryKey: 1,
            Expand: ["Child"],
            Select: ["Name"]
        });

        chai.expect(result).equals(undefined);
    }

    @test("Test Store Post method")
    async Post() {

        let name = TestHelpers.RandomString(3);
        let otherVal = TestHelpers.RandomString(3);

        let postResult = await this.store.PostAsync({
            Id: 1,
            Name: name,
            OtherValue: otherVal
        });
        let reloaded = await this.store.GetSingleAsync({PrimaryKey: postResult.Id});
        chai.expect(reloaded.Name).equals(name);
        chai.expect(reloaded.OtherValue).equals(otherVal);
    }

    @test("Test POST and assert GetCollection length")
    async PostGetCollection(){
        let n1 = TestHelpers.RandomString(3);
        let n2 = TestHelpers.RandomString(3);

        await this.store.PostAsync({Id:1, Name: n1});
        await this.store.PostAsync({Id:2, Name: n2});

        let result = await this.store.GetCollectionAsync();
    }

}

