public with sharing class ContactRecord {
    public ContactRecord() {

    }

    @AuraEnabled(cacheable = true)
    public static list<Contact> getcontact(string accountid){
        list<Contact> con = [SELECT ID, Name, accountid  FROM Contact WHERE accountid =: accountid];
        System.debug('sss' + con);
        return con;
    }
    
    @AuraEnabled(cacheable = true)
    public static list<String> getcontactlist(){
     list<String> ssss = new list<String>();
      ssss.add('sssss1');
      ssss.add('sssss2');
      ssss.add('sssss3');
      ssss.add('sssss4');
      ssss.add('sssss5');
    return ssss;
  }

  @AuraEnabled(cacheable = true)
    public static list<Account> getAccountbyPassingParameter(string name){
     string ss = '%' + name + '%';
     List<Account> lst = [SELECT ID, Name, Phone FROM Account];
     return lst;
  }
  
}
