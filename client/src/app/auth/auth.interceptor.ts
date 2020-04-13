import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';
import {AuthService} from '../services/auth.service';
import {catchError, tap} from 'rxjs/operators';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private static NEW_JWT_HEADER = 'APP_NEW_JWT';

    constructor(private tokenService: TokenStorageService, private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authReq = req;
        const token = this.tokenService.getToken();
        if (token != null) {
            authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
        }
        return next.handle(authReq).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    if (evt.headers.has(AuthInterceptor.NEW_JWT_HEADER)) {
                        this.tokenService.saveToken(evt.headers.get(AuthInterceptor.NEW_JWT_HEADER));
                    }
                }
            }),
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    this.handleErrorResponse(err);
                }
                throw err;
            })
        );
    }

    private handleErrorResponse(evt: HttpErrorResponse) {
        if (evt.status === 401) {
            this.authService.logout();
            window.location.reload();
        }
    }
}

export const authInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
