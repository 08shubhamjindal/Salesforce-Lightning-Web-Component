import { LightningElement, api } from 'lwc';
import getcontact from '@salesforce/apex/ContactRecord.getcontact';

export default class ParentCompForParToChild extends LightningElement {
    @api recordId
    @api objectApiname

    getContacts(){
        getcontact({
            accountid : this.recordId
        }).then(data=>{
            console.log('jindal12222');
            console.log(data);
            this.template.querySelector('c-child-comp-for-par-to-child').getContactFromParent(data);
        })
    }
}