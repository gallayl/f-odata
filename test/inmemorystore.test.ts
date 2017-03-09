import { suite, test } from "mocha-typescript";
import { PrimaryKey, PrimaryKeys, ForeignKey, ForeignKeys } from "../src/ModelDecorators";
import {InMemoryStore} from "../src/EntityStores";
import * as chai from "chai";
class TestChild{
    Id: number;
    Value: string;
}

class TestClass{
    @PrimaryKey
    Id: number;
    Name: string;

    ChildId: number;
    @ForeignKey(TestChild,"ChildId")
    Child: TestChild;
}

@suite("In Memory Store tests")
export class InMemoryStoreTests{
    private store: InMemoryStore<TestClass,Number,any>
    
    before()
    {
        this.store = InMemoryStore.CreateWithId(TestClass);
    }
    
    @test("NotFound should return empty array")
    async NotFoundTest(){
        let result = await this.store.GetSingleAsync({
            PrimaryKey: 1,
            Expand: ["Child"]
        });

        chai.expect(result).equals(undefined);
    }

}

