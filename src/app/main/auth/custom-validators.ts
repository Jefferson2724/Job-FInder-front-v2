import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { constants } from "src/app/constants";

export class CustomValidators {
	static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } => {
			if (!control.value) {
				return null;
			}

			const valid = regex.test(control.value);

			return valid ? null : error;
		};
	}

	static passwordMatchValidator(control: AbstractControl) {
		const password: string = control.get('password').value;
		const confirmPassword: string = control.get('confirmPassw').value;

		if (!confirmPassword) {
			control.get('confirmPassw').setErrors({ required: true });
		} else if (password !== confirmPassword) {
			control.get('confirmPassw').setErrors({ NoPassswordMatch: true });
		}
	}

	static notEmpty(control: AbstractControl): ValidationErrors | null {
		return (control.value && control.value.trim().length > 0) ? null : {
			notEmpty: {
				valid: false
			}
		};
	}

	private static validateEmail(username: string): boolean {
		const values = username.split('@');
		const validUsername = constants.EMAIL_LOCAL_PART_REGEX.test(values[0]);
		const validDomain = !!values[1] && constants.EMAIL_DOMAIN_REGEX.test(values[1]);

		return validUsername && validDomain;
	}

	private static validateUsername(email: string): boolean {
		const values = email.split('@');
		const validUsername = constants.EMAIL_LOCAL_PART_REGEX.test(values[0]);
		const validDomain = (values.length == 1) || constants.EMAIL_DOMAIN_REGEX.test(values[1]);

		return validUsername && validDomain;
	}

	private static validateLogin(login: string) {
		return constants.PHONE_BASIC_REGEX.test(login) || CustomValidators.validateEmail(login);
	}

	static usernameValidator(control: AbstractControl): ValidationErrors | null {
		return (control.value && CustomValidators.validateUsername(control.value) ? null : {
			usernameFormat: {
				valid: false
			}
		});
	}

	static emailValidator(control: AbstractControl): ValidationErrors | null {
		return (control.value && CustomValidators.validateEmail(control.value) ? null : {
			emailFormat: {
				valid: false
			}
		});
	}

	static loginValidator(control: AbstractControl): ValidationErrors | null {
		return (control.value && CustomValidators.validateLogin(control.value) ? null : {
			loginFormat: {
				valid: false
			}
		});
	}
}
