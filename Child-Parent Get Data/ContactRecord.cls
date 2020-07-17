public with sharing class ContactRecord {
    public ContactRecord() {

    }

    @AuraEnabled(cacheable = true)
    public static map<Integer, String> getcontact(){
        map<Integer, String> mapp = new map<Integer, String>();
        mapp.put(1, 'shubham Jindal1');
        mapp.put(2, 'shubham Jindal2');
        mapp.put(3, 'shubham Jindal3');
        mapp.put(4, 'shubham Jindal4');
        mapp.put(5, 'shubham Jindal5');
        mapp.put(6, 'shubham Jindal6');
        
      return mapp;
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
