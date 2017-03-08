import Endpoint from "./endpoint";
import * as Express from "express";
import { Builder } from "./EndpointModel";
import { PrimaryKey, Property, ForeignKey, ODataFunction } from "./ModelDecorators";
let app = Express();

let builder = new Builder("Api");

class OtherClass {
    @PrimaryKey
    id: number;
    val: string;

    @ODataFunction()
    getTrue() {
        return true;
    }

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

let endpoint = new Endpoint(app, builder);

endpoint.GetApiRootBody.toString();

app.listen(1111);