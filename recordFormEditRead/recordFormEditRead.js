import { LightningElement, track } from 'lwc';

export default class RecordFormEditRead extends LightningElement {


    @track firstInputBox = false;
    @track firstOutput = true;
    @track updateOne = "John Doe"
    @track updateTwo =  "Marry kom"
    handle(){
        this.firstInputBox = true;
        this.firstOutput = false;
        // const element = this.template.querySelector('[data-id="text-input-id-1"]');
        // element.focus();
    }


    handleSave(){
         //console.log('ssss')
         this.updateOne = this.template.querySelector('[data-id="text-input-id-1"]').value;
         this.updateTwo = this.template.querySelector('[data-id="text-input-id-2"]').value;
         this.firstInputBox = false;
         this.firstOutput = true;
    }

    handleCancel(){
        this.firstInputBox = false;
         this.firstOutput = true;
    }
}