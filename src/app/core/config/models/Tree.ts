import { Branch } from "./Branch";

export interface Tree {
  id: string;
  leftBranch: Branch;
  rightBranch: Branch;
}
