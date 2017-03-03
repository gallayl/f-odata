import Endpoint from "./endpoint";
import * as Express from "express";
import { Builder } from "./EndpointModel";
import { IODataEntity } from "./Interfaces/";
let app = Express();

let builder = new Builder();


class Alma implements IODataEntity{
    a:string;
}


let t = builder.EntitySet(Alma, "almák");

let endpoint = new Endpoint(app, "api", builder);

app.listen(1111);