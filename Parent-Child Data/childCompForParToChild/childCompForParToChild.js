import { LightningElement, api, track } from 'lwc';

export default class ChildCompForParToChild extends LightningElement {

    @track data
    
    @api
    getContactFromParent(contactdata){
        console.log('contact data in child');
        console.log(contactdata);
        this.data = contactdata;
    }
}