import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        // add authorization header with our token if available
        let token: string;
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

        if (userInfo !== null) {
            token = userInfo.token;
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + token
                }
            });
        }

        return next.handle(request);
    }
}
