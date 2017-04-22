import * as Express from 'express';
import Endpoint from './endpoint';
import { Builder } from './EndpointModel';
import { InMemoryStore } from './EntityStores';
import { ForeignKey, PrimaryKey, Property } from './ModelDecorators';
import { DecoratorDescriptorStore } from "./ModelDecorators/DecoratorDescriptorStore";
const app = Express();

const builder = new Builder('Api');

class OtherClass {
    @PrimaryKey
    public id: number;
    public val: string;
}
// tslint:disable-next-line:max-classes-per-file
class Alma {

    @PrimaryKey
    public id: number;

    @Property
    public a: string;
    public b: string;

    public otherKey: number;
    @ForeignKey(OtherClass, 'otherKey')
    public otherClass: OtherClass;
}

builder.EntityType(OtherClass);
builder.EntityType(Alma);

builder.EntitySet(OtherClass, 'others');
builder.EntitySet(Alma, 'almák');

const d = DecoratorDescriptorStore.GetDescriptor(Alma);



const endpoint = new Endpoint(app, builder);

endpoint.GetApiRootBody.toString();

const almaStore = InMemoryStore.CreateWithId(Alma);

almaStore.GetSingleAsync({
    PrimaryKey: 1,
});

app.listen(1111);
