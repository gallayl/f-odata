import Endpoint from "./endpoint";
import * as Express from "express";
import { Builder } from "./EndpointModel";

let app = Express();



let builder = new Builder();
let endpoint = new Endpoint(app, "api", builder);

app.listen(1111);