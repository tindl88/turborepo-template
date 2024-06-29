import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { validate } from 'uuid';

@ValidatorConstraint({ name: 'isEmptyOrUUID', async: false })
export class IsEmptyOrUUIDConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, _args: ValidationArguments) {
    return typeof value === 'string' && (value === '' || validate(value));
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Value must be either an empty string or a valid UUID';
  }
}

export function IsEmptyOrUUID(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmptyOrUUIDConstraint
    });
  };
}
