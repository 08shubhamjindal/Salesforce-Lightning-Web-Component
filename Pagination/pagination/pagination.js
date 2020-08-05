import { LightningElement,track } from 'lwc';
import getAccountList from '@salesforce/apex/getAccountList.getAccountList1';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'Phone' },
    ];

export default class Pagination extends LightningElement {
    data=[];
    @track page = 1;
    perpage = 5;
    @track pages = [];
    set_size = 5;

    columns = columns
    
    renderedCallback(){
      this.renderButtons();   
    }
    renderButtons = ()=>{
        this.template.querySelectorAll('button').forEach((but)=>{
            but.style.backgroundColor = this.page===parseInt(but.dataset.id,10)?'yellow':'white';
         });
    }
    get pagesList(){
        let mid = Math.floor(this.set_size/2) + 1 ;
        if(this.page > mid){
            return this.pages.slice(this.page-mid, this.page+mid-1);
        } 
        return this.pages.slice(0,this.set_size);
     }
    
     async connectedCallback(){
        this.data = await getAccountList();
        this.setPages(this.data);
        
     }
    
    pageData = ()=>{
        let page = this.page;
        let perpage = this.perpage;
        let startIndex = (page*perpage) - perpage;
        let endIndex = (page*perpage);
        return this.data.slice(startIndex,endIndex);
     }

    setPages = (data)=>{
        let numberOfPages = Math.ceil(data.length / this.perpage);
        for (let index = 1; index <= numberOfPages; index++) {
            this.pages.push(index);
        }
     }  
    
    get hasPrev(){
        return this.page > 1;
    }
    
    get hasNext(){
        return this.page < this.pages.length
    }

    onNext = ()=>{
        ++this.page;
    }

    onPrev = ()=>{
        --this.page;
    }

    onPageClick = (e)=>{
        this.page = parseInt(e.target.dataset.id,10);
        
    }

    get currentPageData(){
        return this.pageData();
    }

}