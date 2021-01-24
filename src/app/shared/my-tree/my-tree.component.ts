import { Component, OnInit, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { InputConfig } from "src/app/core/config/InputConfig";
import { Branch } from "src/app/core/config/models/Branch";
import { Tree } from "src/app/core/config/models/Tree";

@Component({
  selector: "app-my-tree",
  templateUrl: "./my-tree.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyTreeComponent),
      multi: true
    }
  ],
  styleUrls: ["./my-tree.component.scss"]
})
export class MyTreeComponent implements OnInit, ControlValueAccessor {
  @Input() inputConfig: InputConfig;

  public tree: Tree;

  public treeLabel: string;

  public selectedTreeItem: string = null;

  public activeItemIndicator: string = null;

  public isFirstCollapsed = true;

  public isSecondCollapsed = true;

  public initialTree: string;

  propagateChange = (_: any) => {};

  constructor() {}

  ngOnInit(): void {
    this.tree = { ...this.inputConfig.tree };
    this.initialTree = JSON.stringify(this.inputConfig.tree);
    this.treeLabel = this.inputConfig.label;
  }
  writeValue(tree: Tree): void {
    if (tree !== undefined) {
      this.tree = tree;
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
    this.activeItemIndicator = null;
    this.selectedTreeItem = null;
    this.propagateChange(this.tree);
  }
  onAddOneFromLeftToRightClicked() {
    this.tree.leftBranch.nodes.splice(
      this.tree.leftBranch.nodes.indexOf(this.selectedTreeItem),
      1
    );
    this.tree.rightBranch.nodes.push(this.selectedTreeItem);
    this.onChange();
  }

  onAddAllFromLeftToRightClicked() {
    this.tree.rightBranch.nodes.push(...this.tree.leftBranch.nodes);
    this.tree.leftBranch.nodes = [];
    this.onChange();
  }

  onAddAllFromRightToLeftClicked() {
    this.tree.leftBranch.nodes.push(...this.tree.rightBranch.nodes);
    this.tree.rightBranch.nodes = [];
    this.onChange();
  }

  onAddOneFromRightToLeftClicked() {
    this.tree.rightBranch.nodes.splice(
      this.tree.rightBranch.nodes.indexOf(this.selectedTreeItem),
      1
    );
    this.tree.leftBranch.nodes.push(this.selectedTreeItem);
    this.onChange();
  }

  makeMeActive(treeNode: number, activeItemIndex: number) {
    this.selectedTreeItem =
      treeNode === 0
        ? this.tree.leftBranch.nodes[activeItemIndex]
        : this.tree.rightBranch.nodes[activeItemIndex];
    this.activeItemIndicator = treeNode + "_" + activeItemIndex;
  }

  isLeftSingleMoveEnabled(): boolean {
    return (
      this.tree.leftBranch &&
      this.activeItemIndicator &&
      this.activeItemIndicator.startsWith("0_")
    );
  }
  isLeftAllMoveEnabled(): boolean {
    return (
      this.tree.leftBranch &&
      this.tree.leftBranch.nodes &&
      this.tree.leftBranch.nodes.length > 0
    );
  }
  isRightSingleMoveEnabled(): boolean {
    return (
      this.tree.rightBranch &&
      this.activeItemIndicator &&
      this.activeItemIndicator.startsWith("1_")
    );
  }
  isRightAllMoveEnabled(): boolean {
    return (
      this.tree.rightBranch &&
      this.tree.rightBranch.nodes &&
      this.tree.rightBranch.nodes.length > 0
    );
  }
}
