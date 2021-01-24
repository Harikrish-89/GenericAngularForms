import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { FormConfigService } from "src/app/core/services/form-config.service";
import { FormConfig } from "src/app/core/config/FormConfig";
import { Subscription, BehaviorSubject } from "rxjs";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { InputConfig } from "src/app/core/config/InputConfig";
import { ActionConfig } from "src/app/core/config/ActionConfig";
import { ActionConfigService } from "src/app/core/services/action-config.service";

@Component({
  selector: "app-generic-form",
  templateUrl: "./generic-form.component.html",
  styleUrls: ["./generic-form.component.scss"]
})
export class GenericFormComponent implements OnInit {
  @Input() public formConfig: FormConfig;

  @Input() public formConfigSubject: BehaviorSubject<FormConfig>;

  public parentForm: FormGroup;

  public actionConfigs: ActionConfig[];

  private submitAction: ActionConfig;

  constructor(
    private actionService: ActionConfigService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initialize();
  }
  private initialize() {
    if (!this.formConfig) {
      this.formConfigSubject.subscribe(formConfig => {
        if (formConfig) {
          this.formConfig = formConfig;
          this.loadForm();
        }
      });
    } else {
      this.loadForm();
    }
  }

  private loadForm() {
    this.loadParentForm(this.formConfig.inputConfigurations);
    this.actionConfigs = this.formConfig.actionConfigurations;
    console.log(this.parentForm);
  }

  loadParentForm(inputConfigurations: InputConfig[]) {
    this.parentForm = this.formBuilder.group(
      this.getFormValuesFromInputConfig(inputConfigurations)
    );
  }

  private getFormValuesFromInputConfig(
    inputConfigurations: InputConfig[]
  ): { [key: string]: any } {
    return inputConfigurations.reduce((acc, inputConfig) => {
      acc[inputConfig.formEntityProperty] =
        inputConfig.type === "tree"
          ? inputConfig.tree
          : inputConfig.initialValue;
      return acc;
    }, {});
  }

  onSubmit() {
    this.actionService
      .processAction(this.submitAction, this.parentForm.value)
      .subscribe(
        data => {
          alert("Action completed successfully");
        },
        error => {
          alert("Error completing action");
        }
      );
  }

  onResetForm() {
    window.location.reload();
  }

  onPrimaryButtonClick(action: ActionConfig) {
    this.submitAction = action;
  }
}
