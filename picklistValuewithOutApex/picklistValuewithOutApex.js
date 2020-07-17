import { LightningElement, wire, track } from 'lwc';
import { getPicklistValues, getPicklistValuesByRecordType, getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_SOURCE from '@salesforce/schema/Account.AccountSource';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
/*
    getPicklistValues -
        RecordtypeId - Required... 
        fieldApiName - Required
*/
/*
    getPicklistValuesByRecordType
        recordTypeId - Required Type Id (Real One)
        objectApiName - API Name of your Object
*/
export default class PicklistValuewithOutApex extends LightningElement {
    @track pickListvalues;
    @track error;
    @track values;
    @track pickListvaluesByRecordType;
    @track accountsource;

    /*--------------------------------*/    
    @wire(getPicklistValues, {
        recordTypeId : '012000000000000AAA',
        fieldApiName : ACCOUNT_SOURCE
    })
        wiredPickListValue({ data, error }){
            if(data){
                console.log(` Picklist values are `, data.values);
                this.pickListvalues = data.values;
                this.error = undefined;
            }
            if(error){
                console.log(` Error while fetching Picklist values  ${error}`);
                this.error = error;
                this.pickListvalues = undefined;
            }
        }

    /*--------------------------------*/    
    @wire(getPicklistValuesByRecordType, {
        recordTypeId : '012000000000000AAA',
        objectApiName : ACCOUNT_OBJECT
    })
    wiredRecordtypeValues({data, error}){
            if(data){
                console.log(' Picklist Values ', data.picklistFieldValues.Industry.values);
                this.pickListvaluesByRecordType = data.picklistFieldValues.Industry.values;
                this.accountsource = data.picklistFieldValues.AccountSource.values;
            }
            if(error){
                console.log(error);
            }
        }

    /*--------------------------------*/    
    @wire(getObjectInfo,{
        objectApiName : ACCOUNT_OBJECT
    })
        wiredObject({data, error}){
            if(data){
                console.log(' Object iformation ', data);
                console.table(data);
            }
            if(error){
                console.log(error);
            }
        }
    handleChange(){
        
    }

}