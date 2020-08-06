import { LightningElement, track } from 'lwc';
import getAccountist from '@salesforce/apex/GetDataFromAnotherOrg.getAccountist'
export default class ShowAccountFromAnotherOrg extends LightningElement {

    @track data;

    async connectedCallback(){
     this.data = await getAccountist();
     for(let i=0; i<this.data.length; i++){
        console.log(this.data[i].id);
        console.log(this.data[i].name);
     }
    }
}