import { Builder } from "./EndpointModel";
import * as Express from "express";

export default class Endpoint {

    public GetApiRootBody():string{
        return this.apiRootBody;
    }

    public GetMetadataBody():string{
        return this.metadataBody
    }


    private apiRootBody:string = "ApiRootBody";
    private metadataBody:string = "ApiMetadataBody";

    private router: Express.Router = Express.Router();

    private registerExpressRoute(expressAppRef: Express.Application, route: string) {
        this.router.get("/", (req, resp)=>{
            resp.send(200, {message: this.apiRootBody});
        });

        this.router.get("/([\$])metadata", (req, resp)=>{
            resp.send(200, {message: this.metadataBody });
        });

        expressAppRef.use(`/${route}`, this.router);

    }

    constructor(expressAppRef: Express.Application, private route: string, private ModelBuilder: Builder) {
        this.registerExpressRoute(expressAppRef, route);
    }
}