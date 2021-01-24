export interface ActionConfig {
  formActionType?: string; // indicates post, put , get or delete
  actionResourceUrl?: string;
  buttonName: string;
  buttonType: string;
  submitType: string;
  disableIfInvalid: boolean;
}
