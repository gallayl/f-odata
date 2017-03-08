export enum BindingType {
    None,
    Entity,
    Collection
}

export class ODataFunctionDescriptorEntry<TBound>{
    Name: string;
    BindingType: BindingType;
    FunctionMethod: (...args: any[]) => any;
}

export function ODataFunction(binding: BindingType = BindingType.None) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        // toDo

    };

}