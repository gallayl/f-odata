import Endpoint from "./endpoint";
import * as Express from "express";
import { Builder } from "./EndpointModel";
import { PrimaryKey, Property, ForeignKey } from "./ModelDecorators";
import { InMemoryStore } from "./EntityStores";
const app = Express();

const builder = new Builder("Api");

class OtherClass {
    @PrimaryKey
    id: number;
    val: string;
}
class Alma {

    @PrimaryKey
    id: number;

    @Property
    a: string;
    b: string;

    otherKey: number;
    @ForeignKey(OtherClass, "otherKey")
    otherClass: OtherClass;
}

builder.EntityType(OtherClass);
builder.EntityType(Alma);

builder.EntitySet(OtherClass, "others");
builder.EntitySet(Alma, "almák");

const endpoint = new Endpoint(app, builder);

endpoint.GetApiRootBody.toString();

const almaStore = InMemoryStore.CreateWithId(Alma);

almaStore.GetSingleAsync({
    PrimaryKey: 1
});

app.listen(1111);