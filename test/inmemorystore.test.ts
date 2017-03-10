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
export class InMemoryStoreTests {
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
        let reloaded = await this.store.GetSingleAsync({ PrimaryKey: postResult.Id });
        chai.expect(reloaded.Name).equals(name);
        chai.expect(reloaded.OtherValue).equals(otherVal);
    }

    @test("Test POST and assert GetCollection length")
    async PostGetCollection() {
        let n1 = TestHelpers.RandomString(3);
        let n2 = TestHelpers.RandomString(3);

        await this.store.PostAsync({ Id: 1, Name: n1 });
        await this.store.PostAsync({ Id: 2, Name: n2 });

        let result = await this.store.GetCollectionAsync();
        chai.expect(result.length).equals(2);
    }

    @test("Test POST and Patch, expect that only the patched values will be changed")
    async PostPatchGetSingle() {
        let id = 1;
        let n1 = TestHelpers.RandomString(3);
        let v1 = TestHelpers.RandomString(3);

        let v2 = TestHelpers.RandomString(3);
        await this.store.PostAsync({ Id: id, Name: n1, OtherValue: v1 });

        let entity = await this.store.GetSingleAsync({ PrimaryKey: id });

        chai.expect(entity.Name).equals(n1);
        chai.expect(entity.OtherValue).equals(v1);

        await this.store.PatchAsync(id, { OtherValue: v2 });

        let reloaded = await this.store.GetSingleAsync({ PrimaryKey: id });

        chai.expect(reloaded.Name).equals(n1);
        chai.expect(reloaded.OtherValue).equals(v2);
    }

    @test("Test POST and PUT, expect that the not provided property will be nulled")
    async PostPutGetSingle() {
        let id = 1;
        let n1 = TestHelpers.RandomString(3);
        let v1 = TestHelpers.RandomString(3);

        let n2 = TestHelpers.RandomString(3);
        await this.store.PostAsync({ Id: id, Name: n1, OtherValue: v1 });

        let entity = await this.store.GetSingleAsync({ PrimaryKey: id });

        chai.expect(entity.Name).equals(n1);
        chai.expect(entity.OtherValue).equals(v1);

        await this.store.PutAsync(id, { Id: id, Name: n2 });

        let reloaded = await this.store.GetSingleAsync({ PrimaryKey: id });

        chai.expect(reloaded.Name).equals(n2);
        chai.expect(reloaded.OtherValue).equals(undefined);
    }

    @test("Test POST and Delete")
    async PostDelete() {
        let e1: TestClass = {
            Id: 1,
            Name: TestHelpers.RandomString(3)
        };

        let e2: TestClass = {
            Id: 2,
            Name: TestHelpers.RandomString(3)
        }

        await this.store.PostAsync(e1);
        await this.store.PostAsync(e2);

        let res = await this.store.GetCollectionAsync();
        chai.expect(res.length).equals(2);

        await this.store.Delete(e1.Id);

        let res2 = await this.store.GetCollectionAsync();
        chai.expect(res2.length).equals(1);
        chai.expect(res2[0].Id).equals(e2.Id);

        await this.store.Delete(e2.Id);
        let res3 = await this.store.GetCollectionAsync();
        chai.expect(res3.length).equals(0);
    }


}

