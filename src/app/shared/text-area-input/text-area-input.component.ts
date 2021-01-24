import { Component, OnInit, Input, forwardRef } from "@angular/core";
import {
  ControlValueAccessor,
  FormGroup,
  FormBuilder,
  Validators,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import { InputConfig } from "src/app/core/config/InputConfig";
import { ValidatorService } from "src/app/core/services/validator.service";
import { ValidatorMessageService } from "src/app/core/services/validator-message.service";

@Component({
  selector: "app-text-area-input",
  templateUrl: "./text-area-input.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextAreaInputComponent),
      multi: true
    }
  ],
  styleUrls: ["./text-area-input.component.scss"]
})
export class TextAreaInputComponent
  implements OnInit, ControlValueAccessor, Validator {
  @Input() inputConfig: InputConfig;

  public formValue: string;

  public requiredValidationMessage: string;

  public blanksNotAllowedValidationMessage: string;

  public patternNotAllowedValidationMessage: string;

  public inputTextAreaForm: FormGroup;

  propagateChange = (_: any) => {};

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService,
    private validatorMessageService: ValidatorMessageService
  ) {}

  ngOnInit() {
    this.formValue = this.inputConfig.initialValue;
    this.loadValidationMessages();
    this.inputTextAreaForm = this.loadForm(
      this.validatorService.getValidators(this.inputConfig.validatorsConfig)
    );
  }

  private loadValidationMessages() {
    if (this.inputConfig.validatorsConfig) {
      this.requiredValidationMessage = this.validatorMessageService.getRequiredValidationMessage(
        this.inputConfig.validatorsConfig
      );
      this.blanksNotAllowedValidationMessage = this.validatorMessageService.getWhiteSpaceValidationMessage(
        this.inputConfig.validatorsConfig
      );
      this.patternNotAllowedValidationMessage = this.validatorMessageService.getPatternValidationMessage(
        this.inputConfig.validatorsConfig
      );
    }
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.formValue = value;
      this.inputTextAreaForm
        .get("textAreaInputFormControl")
        .setValue(this.formValue);
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    // do nothing
  }
  setDisabledState?(isDisabled: boolean): void {
    // do nothing
  }

  onChange() {
    this.formValue = this.inputTextAreaForm.get(
      "textAreaInputFormControl"
    ).value;
    this.propagateChange(this.formValue);
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.inputTextAreaForm.valid
      ? null
      : {
          error: this.inputTextAreaForm.get("textAreaInputFormControl").errors
        };
  }

  private loadForm(validators: Validators[]): FormGroup {
    return this.formBuilder.group({
      textAreaInputFormControl: [this.formValue, validators ? validators : []]
    });
  }
}
