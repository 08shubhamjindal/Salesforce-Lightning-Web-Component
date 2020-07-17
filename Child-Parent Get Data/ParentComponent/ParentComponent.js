import { LightningElement, wire, track } from 'lwc';
import getcontact from '@salesforce/apex/ContactRecord.getcontact';
import getcontactlist from '@salesforce/apex/ContactRecord.getcontactlist';
import getAccountbyPassingParameter from '@salesforce/apex/ContactRecord.getAccountbyPassingParameter';

export default class ParentComponent extends LightningElement {

    @track searchterm
    @track accountsrecord
    // @wire(getAccountbyPassingParameter, {
    //     name : '$searchterm'
    // })
    
    @track barVal = 10;
    @track accId;
    @track accName;
    getAccountinJs(event){
        this.searchterm = event.target.value;
        getAccountbyPassingParameter({
           name : this.searchterm
        })
        console.log(this.searchterm);
        getAccountbyPassingParameter().then(result=>{
            console.log(result);
            this.accountsrecord = result;
        })
    }

    passToParent(event){
        this.barVal = event.detail;
    }

    AccountIdByChild(event){
        console.log(JSON.stringify(event))
        this.accId = event.detail.id;
        this.accName = event.detail.name;
        // getParticularAccountofClickedId({
        //     AccountId : this.accId
        // }).then(data=>{
        //     console.log(data);

        // }).catch(err=>{
        //     console.log(err);
        // })
    }

    
}