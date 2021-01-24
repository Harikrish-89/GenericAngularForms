import { InputConfig } from "./InputConfig";
import { ActionConfig } from "./ActionConfig";

export interface FormConfig {
  formLabel: string;
  inputConfigurations?: InputConfig[];
  actionConfigurations?: ActionConfig[];
  formEntity: any;
}
