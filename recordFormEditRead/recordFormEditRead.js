import { LightningElement, track } from "lwc";

export default class RecordFormEditRead extends LightningElement {
  @track firstInputBox = false;
  @track firstOutput = true;
  @track updateOne = "John Doe";

  @track updateTwo = "New";
  @track updateTwoValue = "new";

  @track selectedLabel = "New";
  @track value = "new";

  get options() {
    return [
      { label: "New", value: "new" },
      { label: "In Progress", value: "inProgress" },
      { label: "Finished", value: "finished" }
    ];
  }

  handleChange(event) {
    this.value = event.detail.value;
    this.selectedLabel = event.target.options.find(
      (opt) => opt.value === event.detail.value
    ).label;
  }

  handle() {
    this.firstInputBox = true;
    this.firstOutput = false;
  }

  handleSave() {
    this.updateOne = this.template.querySelector(
      '[data-id="text-input-id-1"]'
    ).value;
    this.updateTwo = this.selectedLabel;
    this.updateTwoValue = this.value;
    this.firstInputBox = false;
    this.firstOutput = true;
  }

  handleCancel() {
    this.firstInputBox = false;
    this.firstOutput = true;
  }
}
