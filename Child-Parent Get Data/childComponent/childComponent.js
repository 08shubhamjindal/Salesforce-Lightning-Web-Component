import { LightningElement, wire, track } from 'lwc';
import getAccountbyPassingParameter from '@salesforce/apex/ContactRecord.getAccountbyPassingParameter'

export default class ChildComponent extends LightningElement {

    @track searchterm
    @track accounts;
    @track error;
    
    renderedCallback() {
            getAccountbyPassingParameter({
            name : this.searchterm
         })
         getAccountbyPassingParameter().then(result=>{
             this.accounts = result;
         })
        // const customevt = new CustomEvent('accountlist');
        // this.dispatchEvent(customevt);
    }

    progress(event){
            const customevt = new CustomEvent(
            'callparent',{
                 detail : event.target.value
            })
            this.dispatchEvent(customevt);
    }

    sendIdtoParent(event){
       console.log(event.currentTarget.dataset.key);
       console.log(event.currentTarget.dataset.key1);
        const customev1t = new CustomEvent(
            'gettingidfromchild',{
                 detail : {
                     id : event.currentTarget.dataset.key,
                     name : event.currentTarget.dataset.key1
                 }
            })
            this.dispatchEvent(customev1t); 
    }
}