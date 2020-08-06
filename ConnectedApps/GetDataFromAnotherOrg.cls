public class GetDataFromAnotherOrg {

    public class responseWrapper {
        public string id;
        public string access_token;
        public string instance_url;
    }
    
    public class responseWrapper1 {
        @AuraEnabled
        public String id {get;set;}
        @AuraEnabled
        public String name {get;set;}
    }
    
    @AuraEnabled(cacheable=true)
    public static  string getRequestToken() {
    string cKey = '3MVG9n_HvETGhr3CLn1E4X0X_zfqAPPxQz8.4GGTwS2P0Dvk_fr2ujNdx47XyHEmDcbgFmY97ppGkgtlE18Fy';
    string cSecret = '113B50B6334914DAC23DB896A19C705CEEED542B2814AEF56B42F26B8C53CA22';
    string uName = 'connectedapp@jindal.com';
    string passwd = 'ubuntu@123qUSkWQqiqmFEhRSAanNphN4S';
    string reqBody = 'grant_type=password&client_id=' + cKey + '&client_secret=' + cSecret + '&username=' + uName + '&password=' + passwd;
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setBody(reqBody);
        req.setMethod('POST');
        req.setEndpoint('https://login.salesforce.com/services/oauth2/token');
        HttpResponse hresp = h.send(req);
        system.debug('jindal' + hresp.getBody());
        responseWrapper wResp = (responseWrapper) JSON.deserialize(hresp.getBody(), responseWrapper.class);
        system.debug('Instance url' + wResp.instance_url);
        system.debug('session id' + wResp.access_token);
        return wResp.access_token;
    }

    @AuraEnabled(cacheable=true)
    public static List<responseWrapper1> getAccountist() {
        list < account > accList1 = new list < account > ();
        String accToken;
        string responseBody;
        string endPoint = 'https://ap16.salesforce.com/services/apexrest/getAccountOnExternalIdtofetchList/';
       
        accToken = getRequestToken();
        system.debug('access token' + accToken);
        list<responseWrapper1> wResp = new list<responseWrapper1>();
        if (accToken != '') {
            Http h1 = new Http();
            HttpRequest req1 = new HttpRequest();
            req1.setHeader('Authorization', 'Bearer ' + accToken);
            req1.setHeader('Content-Type', 'application/json');
           // String Ids  = '0012v00002u2CkLAAU';
            
            String reqBody  = '{' ;
                   reqBody += '  "Id" : "0012v00002u2CkLAAU",' ;
                   reqBody += '  "Id1": "0012v00002u2CkLAAU"' ;
                   reqBody += '}';
            System.debug('reqBody' + reqBody);
            //reqBody += '"QuoteId" : "' +objOrder.O2Q_Quote_Name__c+ '",';
            //String reqBody = Ids
            req1.setBody(reqBody);
            
            req1.setMethod('POST');
            req1.setEndpoint(endPoint);
            HttpResponse hresp1 = h1.send(req1);
            system.debug('jindal' + hresp1.getBody());
             wResp = (List<responseWrapper1>) JSON.deserialize(hresp1.getBody(), List<responseWrapper1>.class);
            system.debug('kkkkkkkkkkkk' + wResp);
        }
        return wResp;
    }

}