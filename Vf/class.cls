public class AccountListViewController{
public List<Account> AccountsortList {get; set;}
public String SortingExpression = 'name';
public String DirectionOfSort = 'ASC';
public List<wrapAccount> wrapAccountList {get; set;}
public List<Account> selectedAccounts{get;set;}
    
    
    public AccountListViewController(ApexPages.StandardSetController controller) {
        selectedAccounts = new List<Account>();
        ApexPages.StandardSetController ssc = new ApexPages.StandardSetController(selectedAccounts);
    }

    public String ExpressionSort {
        get {
            return SortingExpression;
        }
        set {
            If(value == SortingExpression) {
                DirectionOfSort = (DirectionOfSort == 'ASC')? 'DESC' : 'ASC';
            }
            else {
                DirectionOfSort = 'ASC';
                SortingExpression = value;
            }
        }

    }

    public String getDirectionOfSort() {
        If(SortingExpression == Null || SortingExpression == '') {
            return 'DESC';
        }
        else {
            return DirectionOfSort;
        }
    }

    public void setDirectionOfSort(String value) {
        DirectionOfSort = value;
    }


    public void processSelected() {
    selectedAccounts = new List<Account>();
        for(wrapAccount wrapAccountObj : wrapAccountList) {
            if(wrapAccountObj.selected == true) {
                selectedAccounts.add(wrapAccountObj.acc);
            }
        }
      system.debug('jindal' + selectedAccounts);
    }

     public PageReference ViewData() {
        String FullSortExpression = SortingExpression + ' ' + DirectionOfSort;
        system.debug('SortingExpression:::::'+SortingExpression);
        system.debug(DirectionOfSort);

       String Queryitem = ' SELECT Id, Name, Phone, BillingCountry, BillingState, Type, Owner.Name, Website FROM Account WHERE Account.Name != Null AND BillingState !=Null ORDER BY ' + FullSortExpression +' Limit 10';
       system.debug(Queryitem);

        selectedAccounts = DataBase.query(Queryitem);
        wrapAccountList  = new List<wrapAccount>();
        for(Account a: selectedAccounts) {
                wrapAccountList.add(new wrapAccount(a));
         }
         system.debug(selectedAccounts);
         return Null;
    }
    
    public class wrapAccount {
        public Account acc {get; set;}
        public Boolean selected {get; set;}
        
        public wrapAccount(Account a) {
            acc = a;
            selected = false;
        }
    }
}