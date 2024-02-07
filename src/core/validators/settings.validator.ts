import { registerDecorator, ValidationArguments, ValidationOptions, Validator } from "class-validator";


const typeValidator = {
    "string": function (value: any, args: ValidationArguments) {
        return typeof value === "string";
    },
    "number": function (value: any, args: ValidationArguments) {
        return typeof value === "number";
    },
    "boolean": function (value: any, args: ValidationArguments) {
        return typeof value === "boolean";
    },
};

export function IsType(types: (keyof (typeof typeValidator))[], validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "wrongType",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return types.some(v => typeValidator[v](value, args));
                },
                defaultMessage(validationArguments?: ValidationArguments) {
                    const lastType = types.pop();
                    if (types.length == 0)
                        return `Has to be ${lastType}`;
                    return `Can only be ${types.join(", ")} or ${lastType}.`;
                }
            }
        });
    };
}

export function matchDataType(data_type: string, value: string | number | boolean) {
    if(data_type === typeof value) {
        return true;
    }

    return false;
}