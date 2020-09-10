public with sharing class formHandler {
    public formHandler() {

    }
    @AuraEnabled
    public static String getformData(string emailId, string lastName){
       List<Contact> conList = [Select Id, LastName, Email, FormSubmitDate__c from Contact WHERE Email =:emailId];
       System.debug(conList);
       if(conList.size()>0){
        for(Contact cons : conList){
            Date today = System.today();
            Date mydate = cons.FormSubmitDate__c;
            Integer daysBetween = mydate.daysBetween(today);
            System.debug(daysBetween);
            if(daysBetween>=15){
                cons.Email  = emailId;
                cons.LastName = lastName;
                cons.FormSubmitDate__c = System.today();
                update cons;
                return 'Update';
            }else{
                return 'Exceed';
            }
        }
        return 'Never';
       }else{
           System.debug(emailId);
           Contact con = new Contact();
           con.Email  = emailId;
           con.LastName = lastName;
           con.FormSubmitDate__c = System.today();
           insert con;
           return 'Insert';
       } 
    }
}