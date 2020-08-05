public with sharing class getAccountList {
    public getAccountList() {

    }
    @AuraEnabled
       public static List<Account> getAccountList1(){
      return [select id, Name , Phone from Account limit 2000];
    }
}
