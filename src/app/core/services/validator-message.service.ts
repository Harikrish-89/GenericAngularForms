import { Injectable } from "@angular/core";
import { ValidatorConfig } from "../config/ValidatorConfig";

@Injectable({
  providedIn: "root"
})
export class ValidatorMessageService {
  constructor() {}
  getRequiredValidationMessage(inputValidators: ValidatorConfig[]): string {
    return inputValidators.find(
      inputValidator => inputValidator.type === "required"
    )
      ? inputValidators.find(
          inputValidator => inputValidator.type === "required"
        ).message
      : null;
  }

  getMinLengthValidationMessage(inputValidators: ValidatorConfig[]): string {
    return inputValidators.find(
      inputValidator => inputValidator.type === "minLength"
    )
      ? inputValidators.find(
          inputValidator => inputValidator.type === "minLength"
        ).message
      : null;
  }

  getMaxLengthValidationMessage(inputValidators: ValidatorConfig[]): string {
    return inputValidators.find(
      inputValidator => inputValidator.type === "maxLength"
    )
      ? inputValidators.find(
          inputValidator => inputValidator.type === "maxLength"
        ).message
      : null;
  }

  getPatternValidationMessage(inputValidators: ValidatorConfig[]): string {
    return inputValidators &&
      inputValidators.find(inputValidator => inputValidator.type === "pattern")
      ? inputValidators.find(
          inputValidator => inputValidator.type === "pattern"
        ).message
      : null;
  }

  getEmailValidationMessage(inputValidators: ValidatorConfig[]): string {
    return inputValidators.find(
      inputValidator => inputValidator.type === "email"
    )
      ? inputValidators.find(inputValidator => inputValidator.type === "email")
          .message
      : null;
  }

  getWhiteSpaceValidationMessage(inputValidators: ValidatorConfig[]): string {
    return inputValidators.find(
      inputValidator => inputValidator.type === "allowBlanks"
    )
      ? inputValidators.find(
          inputValidator => inputValidator.type === "allowBlanks"
        ).message
      : null;
  }
}
