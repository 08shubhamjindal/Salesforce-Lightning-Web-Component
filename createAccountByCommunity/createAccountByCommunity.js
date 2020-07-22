import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import inseertAccount from '@salesforce/apex/CreateAccountByCommunity.inseertAccount'
export default class CreateAccountByCommunity extends LightningElement {

    @track value = "Hi Enter Something Here";
    @track accountNumber;
    @track index = 1;
    @track first = 'Enable';
    @track second = 'Disable'


    get hasRendered(){
      console.log('count--->'+this.index);
      if(this.index === 1 && this.first==='Enable'){
        return true;
      }
      return false;
    }

    get hasRendered1(){
      console.log('count1--->'+this.index);
     if(this.index === 2 && this.second==='Enable'){
        return true;
    }
    return false;  
    }


    storeAccountName(event){
       this.value = event.detail.value;
    }

    getAccountName(){
      if(this.value==undefined || this.value==""){
        const evt = new ShowToastEvent({
          title: 'Account Name Field is Blank',
          message: 'Enter Some thing in Name Field',
          variant: 'error',
         });
        this.dispatchEvent(evt);
      }else{
           this.first = 'Disable';
           this.index = 2;
           this.second = 'Enable';
      }
    }

    storeAccountNumber(event){
         this.accountNumber = event.detail.value;
    }

    previousAction(){
      this.first = 'Enable';
      this.index = 1;
      this.second = 'Disable';
    }

    getAccountNumber(){
      if(this.accountNumber==undefined || this.accountNumber==""){
        const evt = new ShowToastEvent({
          title: 'Account Number Field is Blank',
          message: 'Enter Some thing in Account Number Field',
          variant: 'error',
         });
        this.dispatchEvent(evt);
      }else{
          console.log('now i am here')
          inseertAccount({
            Name : this.value,
            numberss : this.accountNumber
          }).then(data=>{
             console.log(data);
             const evt = new ShowToastEvent({
              title: 'Account Created',
              message: 'Success',
              variant: 'success',
             });
            this.dispatchEvent(evt);
          }).catch(err=>{

          })
      }
    }
}