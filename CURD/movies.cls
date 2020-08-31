public with sharing class movies {


    public class responseWrapper1 {
        @AuraEnabled
        public String movie_title {get;set;}
        @AuraEnabled
        public String director_name {get;set;}
        @AuraEnabled
        public String actor_1_name {get;set;}
        @AuraEnabled
        public String actor_2_name {get;set;}
    }

    @AuraEnabled
    public static list<responseWrapper1> getDataOfMovies(String strEndPointURL){
        list<responseWrapper1> wResp = new list<responseWrapper1>();
        String strResponse = null;
        if(String.isNotBlank(strEndPointURL)) {
            HttpRequest httpRequest = new HttpRequest();  
            httpRequest.setEndpoint(strEndPointURL);

            httpRequest.setMethod('GET');   
            httpRequest.setHeader('Authorization', 'OAuth ' + UserInfo.getSessionId());        
            httpRequest.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId()); 
            
            try {  
                Http http = new Http();   
                HttpResponse httpResponse = http.send(httpRequest);  

                while(httpResponse.getStatusCode() == 302) {
                    httpRequest.setEndpoint(httpResponse.getHeader('Location'));
                    httpResponse = new Http().send(httpRequest);
                }

                if (httpResponse.getStatusCode() == 200 ) {  
                    strResponse = httpResponse.getBody();  
                } 
                else {  
                    throw new CalloutException(httpResponse.getBody());  
                }   
            } 
            catch(Exception ex) {  
                throw ex;  
            }  
        } 

        if(!String.isBlank(strResponse)) {
            wResp  = (List<responseWrapper1>)JSON.deserialize(strResponse, List<responseWrapper1>.class);
            System.debug('mapJsonData ===> '+wResp);
        }
    
        return wResp;
    }

    
    @AuraEnabled
    public static string postMovies(String movieName){
        
      System.debug('movieName'+ movieName);

      return 'done';
    }
    // @AuraEnabled
    // public static list<responseWrapper1> postDataOfMovies(String Name, String actor_Name){


    //     list<responseWrapper1> wResp = new list<responseWrapper1>();
    //     String strResponse = null;
    //     if(String.isNotBlank(strEndPointURL)) {
    //         HttpRequest httpRequest = new HttpRequest();  
    //         httpRequest.setEndpoint(strEndPointURL); // 
    //         httpRequest.setBody(body);
    //         httpRequest.setMethod('POST');   
    //         httpRequest.setHeader('Authorization', 'OAuth ' + UserInfo.getSessionId());        
    //         httpRequest.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId()); 
            
    //         try {  
    //             Http http = new Http();   
    //             HttpResponse httpResponse = http.send(httpRequest);  

    //             while(httpResponse.getStatusCode() == 302) {
    //                 httpRequest.setEndpoint(httpResponse.getHeader('Location'));
    //                 httpResponse = new Http().send(httpRequest);
    //             }

    //             if (httpResponse.getStatusCode() == 200 ) {  
    //                 strResponse = httpResponse.getBody();  
    //             } 
    //             else {  
    //                 throw new CalloutException(httpResponse.getBody());  
    //             }   
    //         } 
    //         catch(Exception ex) {  
    //             throw ex;  
    //         }  
    //     } 

    //     if(!String.isBlank(strResponse)) {
    //         wResp  = (List<responseWrapper1>)JSON.deserialize(strResponse, List<responseWrapper1>.class);
    //         System.debug('mapJsonData ===> '+wResp);
    //     }
    
    //     return wResp;
    // }
}