import {
  Validate,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'passwordRequirements', async: false })
export class PasswordRequirementsValidator
  implements ValidatorConstraintInterface
{
  validate(value: string, args: ValidationArguments) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password must be at least 6 characters long and contain at least one uppercase letter and one number.';
  }
}

export function IsPasswordRequirementsValid(
  validationOptions?: ValidationOptions
) {
  return Validate(PasswordRequirementsValidator, validationOptions);
}
