public with sharing class CreateAccountByCommunity {
    public CreateAccountByCommunity() {

    }

    @AuraEnabled
    public static String inseertAccount(String Name, String numberss){
        System.debug(Name);
        
       Account acc = new Account();
       acc.Name = Name;
       acc.AccountNumber = numberss;

       insert acc;
       System.debug(acc);
       return 'SucessbyController';
    }
}
