import { LightningElement, api, track } from 'lwc';

export default class ChildComponent extends LightningElement {

    @track data

    @api
    getContactFromParent(contactdata){
        console.log('contact data in child');
        console.log(contactdata);
        this.data = contactdata;
    }

    sendthisContacttoParent(event){
        console.log('i am here')
        console.log(event.currentTarget.dataset.key)
        const customevt = new CustomEvent(
            'gettingidfromchild',{
                 detail : {
                     id : event.currentTarget.dataset.key
                 }
            })
            this.dispatchEvent(customevt); 
    }
}