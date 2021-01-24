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
import { ValidatorService } from "src/app/core/services/validator.service";
import { ValidatorMessageService } from "src/app/core/services/validator-message.service";
import { ValidatorConfig } from "src/app/core/config/ValidatorConfig";
import { InputConfig } from "src/app/core/config/InputConfig";

@Component({
  selector: "app-select",
  templateUrl: "./select.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  styleUrls: ["./select.component.scss"]
})
export class SelectComponent
  implements OnInit, ControlValueAccessor, Validator {
  @Input() inputConfig: InputConfig;

  public selectValue: string;

  public requiredValidationMessage: string;

  public inputSelectForm: FormGroup;

  propagateChange = (_: any) => {};

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService,
    private validatorMessageService: ValidatorMessageService
  ) {}

  ngOnInit() {
    this.selectValue = this.inputConfig.initialValue;
    this.requiredValidationMessage =
      this.inputConfig.validatorsConfig &&
      this.validatorMessageService.getRequiredValidationMessage(
        this.inputConfig.validatorsConfig
      );
    this.inputSelectForm = this.loadForm(
      this.validatorService.getValidators(this.inputConfig.validatorsConfig)
    );
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.selectValue = value;
      this.inputSelectForm.get("selectInput").setValue(this.selectValue);
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
    this.selectValue = this.inputSelectForm.get("selectInput").value;
    this.propagateChange(this.selectValue);
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.inputSelectForm.valid
      ? null
      : { error: this.inputSelectForm.get("selectInput").errors };
  }

  private loadForm(validators: Validators[]): FormGroup {
    return this.formBuilder.group({
      selectInput: [this.selectValue, validators ? validators : []]
    });
  }
}
