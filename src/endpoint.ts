import { Builder } from "./EndpointModel";
import * as Express from "express";

export default class Endpoint {

    /**
     * Returns the API Root response body
     */
    public GetApiRootBody(): string {
        return this.apiRootBody;
    }

    /**
     * Returns the $metadata response body
     */
    public GetMetadataBody(): string {
        return JSON.stringify(this.ModelBuilder.GetModel());
    }

    // todo: from modelbuilder
    private apiRootBody: string = "ApiRootBody";

    private router: Express.Router = Express.Router();

    private registerExpressRoute(expressAppRef: Express.Application, route: string) {
        this.router.get("/", (req, resp) => {
            resp
                // .set("Content-Type", "text/xml")
                .status(200)
                .send(this.GetApiRootBody());
        });

        this.router.get("/([\$])metadata", (req, resp) => {
            resp
                // .set("Content-Type", "text/xml")
                .status(200)
                .send(this.GetMetadataBody());
        });

        expressAppRef.use(`/${route}`, this.router);

    }

    /**
     * Constructs an OData endpoint from the specified models and registers it to an Express application to a specific route
     * @param expressAppRef The Express application reference to register the OData Endpoint
     * @param route The root for the OData endpoint (e.g. 'odata.svc')
     * @param ModelBuilder The OData modelbuilder which defines what entities will be registered into the endpoint
     */
    constructor(expressAppRef: Express.Application, private route: string, private ModelBuilder: Builder) {
        this.registerExpressRoute(expressAppRef, route);
    }
}