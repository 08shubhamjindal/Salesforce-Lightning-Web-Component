import { LightningElement, track } from 'lwc';
import getRecommendedData from '@salesforce/apex/StockDataa.getRecommendedData'
import getWholeDataofSymbol from '@salesforce/apex/StockDataa.getWholeDataofSymbol'
var options =[];
export default class HttpCallOutNewFeature extends LightningElement {
    
    @track searchTeram
    @track value
    @track selectedcompnay
    @track optionvalue
    @track wholeData
    getInputValue(event){
        console.log('here')
        this.searchTeram = event.target.value;
        console.log(this.searchTeram.length);
        if(this.searchTeram.length>=2){
            let endpointURL =  'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+this.searchTeram+'&apikey=PK3NUFTIK4W7AHCF';
            getRecommendedData({
                strEndPointURL : endpointURL
            }).then(data=>{
                console.log(JSON.stringify(data));
                 options = []
                for(var i=0; i<data['bestMatches'].length; i++){
                    options.push({
                        label : data['bestMatches'][i]['2. name'],
                        value : data['bestMatches'][i]['1. symbol']
                    })
                }
                this.optionvalue = options;
                this.optionvaluefunction(options);

            }).catch(error=>{
               console.log(error);
            })
        }
    }

    optionvaluefunction(options){
      console.log(options);
    }
    handleChange(event){
        this.value = event.detail.value
    }
    getDataofCompany(){
        this.selectedcompnay = this.value;
        console.log('sssssssssssssssssssssssssssssss')
        console.log(this.value)
        let endpoint = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+this.value+'&apikey=PK3NUFTIK4W7AHCF'
        getWholeDataofSymbol({
            strEndPointURL : endpoint
        }).then(data=>{
            console.log('after data')
            console.log(JSON.stringify(data))
            let objData = {
                open : '',
                high : '',
                low : '',
                close : '',
                volume : '',
            };
            objData.open =  data['Time Series (Daily)']['2020-05-22']['1. open'];
            objData.high =  data['Time Series (Daily)']['2020-05-22']['2. high'];
            objData.low =  data['Time Series (Daily)']['2020-05-22']['3. low'];
            objData.close =  data['Time Series (Daily)']['2020-05-22']['4. close'];
            objData.volume =  data['Time Series (Daily)']['2020-05-22']['5. volume'];
           this.wholeData = objData;

        }).catch(err=>{

        })
    }
}