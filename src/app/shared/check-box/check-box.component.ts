import { Component, OnInit, Input, forwardRef } from "@angular/core";
import {
  CheckboxControlValueAccessor,
  FormGroup,
  FormBuilder,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import { InputConfig } from "src/app/core/config/InputConfig";

@Component({
  selector: "app-check-box",
  templateUrl: "./check-box.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckBoxComponent),
      multi: true
    }
  ],
  styleUrls: ["./check-box.component.scss"]
})
export class CheckBoxComponent implements OnInit, ControlValueAccessor {

  @Input() inputConfig: InputConfig;

  public checked = false;

  public id: string;

  public inputCheckBoxForm: FormGroup;

  propagateChange = (_: any) => {};

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.checked = this.inputConfig.initialValue && this.inputConfig.initialValue === "true";
    this.id = this.inputConfig.label + "_checkBox";
    this.inputCheckBoxForm = this.loadForm();
  }

  writeValue(value: any): void {
    if (value) {
      this.checked = value;
      this.inputCheckBoxForm
        .get("checkBoxInputFormControl")
        .setValue(this.checked);
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
    this.checked = this.inputCheckBoxForm.get(
      "checkBoxInputFormControl"
    ).value;
    this.propagateChange(this.checked);
  }

  private loadForm(): FormGroup {
    return this.formBuilder.group({
      checkBoxInputFormControl: [this.checked]
    });
  }
}
