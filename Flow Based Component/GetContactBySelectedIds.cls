public with sharing class GetContactBySelectedIds {

    @InvocableMethod(label='Method Label' description='Method description')
    public static List<List<Contact>> getContact(list<list<string>> accid){

         System.debug(accId[0]);
         List<Contact> con = [SELECT ID, LastName, AccountId FROM Contact WHERE AccountId in :accID[0]];
         System.debug(con);
         List<List<Contact>> itemListList = new List<List<Contact>>();
         List<Contact> itemList = new List<Contact>();
         for(Contact cti : con){
             itemList.add(cti);
         }
         itemListList.add(itemList);
         return itemListList;

        //list<Contact> lst = [SELECT Id, LastName from Contact WHERE AccountId in:accid];
        //return lst;
    }
}