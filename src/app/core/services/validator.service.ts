import { Injectable } from "@angular/core";
import { ValidatorConfig } from "../config/ValidatorConfig";
import { Validators, FormControl } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class ValidatorService {
  constructor() {}

  public getValidators(inputValidatorsConfig: ValidatorConfig[]): Validators[] {
    const validators: Validators[] = [];
    if (inputValidatorsConfig) {
      inputValidatorsConfig.forEach(validatorConfig => {
        if (validatorConfig.type === "required") {
          validators.push(Validators.required);
        }
        if (validatorConfig.type === "minLength") {
          validators.push(
            Validators.minLength(Number(validatorConfig.validatorValue))
          );
        }
        if (validatorConfig.type === "maxLength") {
          validators.push(
            Validators.maxLength(Number(validatorConfig.validatorValue))
          );
        }
        if (validatorConfig.type === "pattern") {
          validators.push(Validators.pattern(validatorConfig.validatorValue));
        }
        if (
          validatorConfig.type === "allowBlanks" &&
          validatorConfig.validatorValue === "false"
        ) {
          validators.push(this.noWhitespaceValidator);
        }
        if (validatorConfig.type === "email") {
          validators.push(Validators.email);
        }
      });
    }

    return validators;
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    return isValid
      ? null
      : {
          isWhiteSpace: true
        };
  }
}
