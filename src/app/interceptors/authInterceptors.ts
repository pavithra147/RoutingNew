import { Injectable } from "@angular/core";
import { HttpInterceptor,HttpRequest,HttpHandler,HttpHeaders, HttpEvent} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log(this.intercept);
        
       const token=localStorage.getItem('token');
            const authReq=req.clone({
               
              setHeaders: {
                    'Authorization':`Bearer ${token}`
                }
            })
            return next.handle(authReq)
        
    }
    
}