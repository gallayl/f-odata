import * as chai from "chai";
import * as Express from "express";
import { suite, test } from "mocha-typescript";
import Endpoint from "../src/endpoint";
import { Builder } from "../src/EndpointModel";
import chaiHttp = require("chai-http");


@suite
export class EndpointTests {

    private Endpoint: Endpoint;
    private EndpointBuilder: Builder;
    private static ExpressApp: Express.Application = Express();
    private Route: string = "api";

    constructor() {
        chai.use(chaiHttp);
    }

    before() {
        this.EndpointBuilder = new Builder(this.Route);
        this.Endpoint = new Endpoint(EndpointTests.ExpressApp, this.EndpointBuilder);
    }

    @test
    Create() {
        chai.expect(this.Endpoint).not.undefined;
    }

    @test
    StartExpress(done: () => void) {
        EndpointTests.ExpressApp.listen(3000, () => {
            done();
        });
    }

    @test
    "CheckApiRootAvailable"(done: () => void) {

        const body = this.Endpoint.GetApiRootBody();

        chai.request(EndpointTests.ExpressApp)
            .get("/" + this.Route + "/")
            .then((res) => {
                chai.expect(res.body.message).to.eql(body);
                done();
            })
            .catch((err) => {
                done();
            });
    }

    @test
    "CheckMetadataAvailable"(done: () => void) {
        const body = this.Endpoint.GetMetadataBody();
        chai.request(EndpointTests.ExpressApp)
            .get("/" + this.Route + "/$metadata")
            .then((res) => {
                chai.expect(res.body.message).to.eql(body);
                done();
            })
            .catch((err) => {
                done();
            });
    }
}