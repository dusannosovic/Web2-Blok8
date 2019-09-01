import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


declare var $;

@Injectable()
export class LokacijaService{
    private proxy: any;
    private proxyName: string = 'lokacija';
    private connection: any;
    public connectionExists: Boolean;

    public locationReceived: EventEmitter < string >;

    constructor(){
        this.locationReceived = new EventEmitter<string>();
        this.connectionExists = false;
        this.connection = $.hubConnection("http://localhost:52295/");
        this.connection.qs = { "token" : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiJ9.eyJuYW1laWQiOiJhZG1pbiIsInVuaXF1ZV9uYW1lIjoiYWRtaW5AeWFob28uY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS9hY2Nlc3Njb250cm9sc2VydmljZS8yMDEwLzA3L2NsYWltcy9pZGVudGl0eXByb3ZpZGVyIjoiQVNQLk5FVCBJZGVudGl0eSIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiZTA2YzY2YTgtZWMwNC00M2UwLTgzNTYtZTAzZjY0MDNjNmM0Iiwicm9sZSI6IkFkbWluIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MjI5NSIsImF1ZCI6ImJXbHNZWE5vYVc0PSIsImV4cCI6MTU1OTU3MzIxMCwibmJmIjoxNTU5NDg2ODEwfQ.uGs1m19mRCf-6ZETmiRGpuhSHgp2eeOHNh0kCxAS2oV5lFQIJjXQPM-QlCyBM9g9irODOmsNTKQXnWLHTqMngA" };
        this.proxy = this.connection.createHubProxy(this.proxyName);
    }
    
    public startConnection(): Observable<Boolean> { 
      
        return Observable.create((observer) => {
           
            this.connection.start()
            .done((data: any) => {  
                console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id)
                this.connectionExists = true;
    
                observer.next(true);
                observer.complete();
            })
            .fail((error: any) => {  
                console.log('Could not connect ' + error);
                this.connectionExists = false;
    
                observer.next(false);
                observer.complete(); 
            });  
          });
      }

      public registerForLocation() : void {
          console.log('dudule');
              this.proxy.on('getLocation', (data: string)=>{
                  console.log(data);
                  this.locationReceived.emit(data);
              });
      }

    // public registerForLocation() : Observable<string> {
    //     return Observable.create((observer)=>{
    //         this.proxy.on('getLocation', (data : string)=>{
    //             console.log(data);
    //             observer.next(data);
    //         })
    //     })
    // }
    
      public Start(){
          this.proxy.invoke("Start");
      }

      public Stop(){
          this.proxy.invoke("Stop");
      }
}