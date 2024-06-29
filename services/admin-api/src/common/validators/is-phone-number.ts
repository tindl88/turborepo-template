import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

@ValidatorConstraint({ async: false })
export class IsPhoneNumberConstraint implements ValidatorConstraintInterface {
  validate(phoneNumber: unknown, _args: ValidationArguments) {
    if (typeof phoneNumber !== 'string') {
      return false;
    }

    const phoneNumberObject = parsePhoneNumberFromString(phoneNumber);

    return phoneNumberObject ? phoneNumberObject.isValid() : false;
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Invalid phone number';
  }
}

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneNumberConstraint
    });
  };
}
