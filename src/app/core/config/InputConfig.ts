import { ValidatorConfig } from "./ValidatorConfig";
import { Tree } from "./models/Tree";

export interface InputConfig {
  name: string;
  type: string;
  label: string;
  initialValue?: string;
  options?: string[];
  labels?: string[];
  validatorsConfig?: ValidatorConfig[];
  tree: Tree;
  formEntityProperty: string;
  disabled: boolean;
}
