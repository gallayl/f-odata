// import Endpoint from "./endpoint";
import * as Express from "express";
import { Builder } from "./EndpointModel";
import { PrimaryKey } from "./ModelDecorators/PrimaryKey";
let app = Express();

let builder = new Builder();



class Alma {

    @PrimaryKey
    id: number;
    a: string;
}


builder.EntityType(Alma, "id");
builder.EntitySet(Alma, "almák");

// let endpoint = new Endpoint(app, "api", builder);

app.listen(1111);