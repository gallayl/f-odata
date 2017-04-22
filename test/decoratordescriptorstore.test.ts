import * as chai from 'chai';
import * as Express from 'express';
import { suite, test } from 'mocha-typescript';
import Endpoint from '../src/endpoint';
import { Builder } from '../src/EndpointModel';
import chaiHttp = require('chai-http');
import { ForeignKey, ForeignKeyDescriptorEntry, ODataPropertyDesrciptorEntry,
    PrimaryKey, PrimaryKeyDescriptorEntry, Property,
} from '../src/ModelDecorators';
import { DecoratorDescriptor } from '../src/ModelDecorators/DecoratorDescriptor';
import { DecoratorDescriptorStore } from '../src/ModelDecorators/DecoratorDescriptorStore';

class A {
    @PrimaryKey
    public Id: number;
}

// tslint:disable-next-line:max-classes-per-file
class B {
    @PrimaryKey
    public Id: number;

    @Property
    public Prop: string;
}

// tslint:disable-next-line:max-classes-per-file
class C {
    @PrimaryKey
    public Id: number;

    @ForeignKey(B, 'B')
    public bId: number;
    public B: B;
}

// tslint:disable-next-line:max-classes-per-file
@suite
export class DecoratorDescriptorTest {
    @test('Get descriptor for A should return a descriptor instance')
    public GetEntriesFromDescriptorStore() {
        const aDescriptor = DecoratorDescriptorStore.GetDescriptor(A);
        chai.expect(aDescriptor).to.be.instanceOf(DecoratorDescriptor);
    }

    @test('Get descriptor for A should contain only a PrimaryKey entry')
    public GetDescriptorPrimaryKeyOnly() {
        const aDescriptor = DecoratorDescriptorStore.GetDescriptor(A);
        chai.expect(aDescriptor.Entries.length).to.be.equals(1);
        chai.expect(aDescriptor.PrimaryKey).to.be.instanceOf(PrimaryKeyDescriptorEntry);
        chai.expect(aDescriptor.Properties.length).to.be.equals(0);
        chai.expect(aDescriptor.ForeignKeys.length).to.be.equals(0);
    }

    @test('Get descriptor for B should contain a PrimaryKey entry and a Property entry')
    public GetDescriptorPrimaryKeyAndProperty() {
        const aDescriptor = DecoratorDescriptorStore.GetDescriptor(B);
        chai.expect(aDescriptor.Entries.length).to.be.equals(2);
        chai.expect(aDescriptor.PrimaryKey).to.be.instanceOf(PrimaryKeyDescriptorEntry);
        chai.expect(aDescriptor.Properties.length).to.be.equals(1);
        chai.expect(aDescriptor.Properties[0]).to.be.instanceOf(ODataPropertyDesrciptorEntry);

        chai.expect(aDescriptor.ForeignKeys.length).to.be.equals(0);
    }

    @test('Get descriptor for B should contain a PrimaryKey entry and a Property entry')
    public GetDescriptorPrimaryKeyAndForeignKey() {
        const aDescriptor = DecoratorDescriptorStore.GetDescriptor(C);
        chai.expect(aDescriptor.Entries.length).to.be.equals(2);
        chai.expect(aDescriptor.PrimaryKey).to.be.instanceOf(PrimaryKeyDescriptorEntry);
        chai.expect(aDescriptor.Properties.length).to.be.equals(0);
        chai.expect(aDescriptor.ForeignKeys.length).to.be.equals(1);
        chai.expect(aDescriptor.ForeignKeys[0]).to.be.instanceOf(ForeignKeyDescriptorEntry);
    }
}
