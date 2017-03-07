import Endpoint from "./endpoint";
import * as Express from "express";
import { Builder } from "./EndpointModel";
import { PrimaryKey, Property, ForeignKey } from "./ModelDecorators";
let app = Express();

let builder = new Builder("Api");
class Alma {

    @PrimaryKey
    id: number;
    @Property
    a: string;
    b: string;

    almaKey:number;
    @ForeignKey("almaKey")
    childAlma: Alma;
}

builder.EntityType(Alma);
builder.EntitySet(Alma, "almák");

let endpoint = new Endpoint(app, builder);

app.listen(1111);