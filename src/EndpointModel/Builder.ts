import {IODataEntity} from "../interfaces";

export class Builder {

    private EntitySets: {}[]

    public EntitySet<T extends IODataEntity, T2>(entityTypeClass: {new():T}, entitySetName:string):Builder{
        //ToDo: CheckMe
        // https://www.typescriptlang.org/docs/handbook/generics.html
        console.log(entityTypeClass.prototype);
        return this;
    }
}