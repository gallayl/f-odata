import Endpoint from "./endpoint";
import * as Express from "express";
import { Builder } from "./EndpointModel";
import { PrimaryKey, Property, ODataEntity } from "./ModelDecorators";
let app = Express();

let builder = new Builder();

@ODataEntity({
    Namespace: "Models"
})
class Alma {

    @PrimaryKey
    id: number;
    @Property
    a: string;
    b: string;
}

builder.EntityType(Alma);
builder.EntitySet(Alma, "almák");

let endpoint = new Endpoint(app, "api", builder);

app.listen(1111);