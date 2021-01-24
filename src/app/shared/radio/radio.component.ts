import { Component, OnInit, Input, forwardRef } from "@angular/core";
import {
  ControlValueAccessor,
  FormGroup,
  FormBuilder,
  Validators,
  NG_VALUE_ACCESSOR,
  Validator,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import { ValidatorConfig } from "src/app/core/config/ValidatorConfig";
import { ValidatorService } from "src/app/core/services/validator.service";
import { ValidatorMessageService } from "src/app/core/services/validator-message.service";
import { InputConfig } from "src/app/core/config/InputConfig";

@Component({
  selector: "app-radio",
  templateUrl: "./radio.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ],
  styleUrls: ["./radio.component.scss"]
})
export class RadioComponent implements OnInit, ControlValueAccessor, Validator {

  @Input() inputConfig: InputConfig;

  public inputRadioForm: FormGroup;

  public requiredValidationMessage: string;

  public currentValue: any;

  propagateChange = (_: any) => {};

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService,
    private validatorMessageService: ValidatorMessageService
  ) {}

  ngOnInit() {
    this.currentValue = this.inputConfig.initialValue;
    this.requiredValidationMessage = this.inputConfig.validatorsConfig && this.validatorMessageService.getRequiredValidationMessage(
      this.inputConfig.validatorsConfig
    );

    this.inputRadioForm = this.loadForm(this.validatorService.getValidators(
      this.inputConfig.validatorsConfig
    ));
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.currentValue = value;
      this.inputRadioForm.get("radioInput").setValue(this.currentValue);
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
    this.currentValue = this.inputRadioForm.get("radioInput").value;
    this.propagateChange(this.currentValue);
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.inputRadioForm.valid
      ? null
      : { error: this.inputRadioForm.get("radioInput").errors };
  }

  private loadForm(validators: Validators[]): FormGroup {
    return this.formBuilder.group({
      radioInput: [this.currentValue, validators ? validators : []]
    });
  }
}
