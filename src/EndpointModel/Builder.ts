import {IODataEntity} from "../interfaces";

export class Builder {

    private EntitySets: {}[]

    public EntitySet<T extends IODataEntity, T2>(entityTypeClass: {new():T}, entitySetName:string):Builder{

        console.log(entityTypeClass.prototype);
        return this;
    }
}