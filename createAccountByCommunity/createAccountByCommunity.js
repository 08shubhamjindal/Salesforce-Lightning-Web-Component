import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CreateAccountByCommunity extends LightningElement {

    @track value = "Hi Enter Something Here";
    @track index = 1;
    @track first = 'Enable';
    @track second = 'Disable'

    // @track myVariable;

    // set index(value) {
    //   console.log(value)
    //   this.myVariable = value;
    //  }

    // @api
    // get index(){
    //     return(this.myVariable === 0)
    // }

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


    storeInputValue(event){
       this.value = event.detail.value;
    }

    getInputValue(){
      console.log(this.value)
      if(this.value==undefined || this.value==""){
        const evt = new ShowToastEvent({
          title: 'Input Field is Blank',
          message: 'Enter Some thing in Input Field',
          variant: 'error',
         });
        this.dispatchEvent(evt);
      }else{
           this.first = 'Disable';
           this.index = 2;
           this.second = 'Enable';
      }
    }
}