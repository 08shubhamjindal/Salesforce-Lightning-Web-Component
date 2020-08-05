import { LightningElement, track, api } from 'lwc';
import getAccountList from '@salesforce/apex/getAccountList.getAccountList1';
export default class InfiniteLoading extends LightningElement {
    @track items = [];
    @track data = [];
    async connectedCallback(){
        this.data = await getAccountList();
        this.items = [];
        let i = 0;
        console.log(this.data[0].Id)
        while(this.data.length>=i && i++ < 5) {
            this.items.push( {id:this.data[i].Id, name:this.data[i].Name, desc: this.data[i].Phone} );
        }
        //let loadingpos = parentThis.template.querySelector('loadingpos');
        var ss = ()=> {
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    let i = 0, t = this.items.length;
                    console.log(this)
                    while(this.data.length>=i+t && i++ < 5) {
                        this.items.push( {id:this.data[i+t].Id, name:this.data[i+t].Name, desc: this.data[i+t].Phone} );
                    }
            }
        }
        window.addEventListener('scroll',  ss);
    }
}


        //let parentThis = this;