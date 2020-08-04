import { LightningElement, api } from 'lwc';

export default class FlowBasedComponent extends LightningElement {
    @api selectedAccs = [];
    @api selectedAccsString;
    @api Accs = [];

    handleCheck(event) {
        console.log(event)
        console.log(event.currentTarget.name);
        if(!this.selectedAccs.includes(event.currentTarget.name))
            this.selectedAccs.push(event.currentTarget.name);
        else {
            for(let i = 0; i < this.selectedAccs.length; i++) {
                if(event.currentTarget.name === this.selectedAccs[i])
                this.selectedAccs.splice(i, 1);
            }
        }
        this.selectedAccsString = JSON.stringify(this.selectedAccs);
        
    }
}