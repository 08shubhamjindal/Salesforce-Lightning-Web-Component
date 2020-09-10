import { LightningElement, track } from "lwc";
import getformData from '@salesforce/apex/formHandler.getformData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class FormValidation extends LightningElement {

    @track emailId;
    @track lastName;

    handleClick() {
        this.lastName = this.template.querySelector('[data-id="text-input-id-1"]').value;
        this.emailId = this.template.querySelector('[data-id="text-input-id-2"]').value;
        getformData({
            emailId: this.emailId,
            lastName: this.lastName
        }).then(data => {
            if (data == 'Exceed') {
                this.showErrorToast(data);
            } else if (data == 'Update') {
                this.showSuccessToast(data);
            } else if (data == 'Insert') {
                this.showSuccessToast(data);
            }

            this.template.querySelector('[data-id="text-input-id-1"]').value = '';
            this.template.querySelector('[data-id="text-input-id-2"]').value = '';
            console.log(data);
        }).catch(err => {
            this.showErrorToast(err);
            console.log(err);
        })
    }

    showSuccessToast(data) {
        const evt = new ShowToastEvent({
            title: data,
            message: 'Opearion sucessful',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    showErrorToast(data) {
        const evt = new ShowToastEvent({
            title: data,
            message: 'Some unexpected error',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

}
