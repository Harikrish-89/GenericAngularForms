import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ViewChild,
  Renderer2,
  ElementRef
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ControlValueAccessor,
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
  selector: "app-text-input",
  templateUrl: "./text-input.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ],
  styleUrls: ["./text-input.component.scss"]
})
export class TextInputComponent
  implements OnInit, ControlValueAccessor, Validator {
  @Input() inputConfig: InputConfig;

  public formValue: string;

  public requiredValidationMessage: string;

  public minLengthValidationMessage: string;

  public maxLengthValidationMessage: string;

  public blanksNotAllowedValidationMessage: string;

  public patternNotAllowedValidationMessage: string;

  public inputTextForm: FormGroup;

  propagateChange = (_: any) => {};

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService,
    private validatorMessageService: ValidatorMessageService
  ) {}

  ngOnInit() {
    this.formValue = this.inputConfig.initialValue;
    this.loadValidationMessages();
    this.inputTextForm = this.loadForm(
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
      this.minLengthValidationMessage = this.validatorMessageService.getMinLengthValidationMessage(
        this.inputConfig.validatorsConfig
      );
      this.maxLengthValidationMessage = this.validatorMessageService.getMaxLengthValidationMessage(
        this.inputConfig.validatorsConfig
      );
    }
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.formValue = value;
      this.inputTextForm.get("textInputFormControl").setValue(this.formValue);
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
    this.formValue = this.inputTextForm.get("textInputFormControl").value;
    this.propagateChange(this.formValue);
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.inputTextForm.valid
      ? null
      : { error: this.inputTextForm.get("textInputFormControl").errors };
  }

  private loadForm(validators: Validators[]): FormGroup {
    return this.formBuilder.group({
      textInputFormControl: [this.formValue, validators ? validators : []]
    });
  }
}
