import { LightningElement, api, track } from 'lwc';
import getcontact from '@salesforce/apex/ContactRecord.getcontact';

export default class ParentComponent extends LightningElement {
    @api recordId
    @api objectApiname
    @track contactId

    getContacts(){
        getcontact({
            accountid : this.recordId
        }).then(data=>{
            console.log('jindal12222');
            console.log(data);
            this.template.querySelector('c-child-comp-for-par-to-child').getContactFromParent(data);
        })
    }

    contactIDbychild(event){
        console.log('jindalhere')
        this.contactId = event.detail.id;
    }
}