import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { LoadingService } from '../services/loading.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    @Inject(PLATFORM_ID) private platformId: Object // To detect platform
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Show loading
    this.loadingService.show();

    const baseUrl = environment.apiUrl;
    let token: string | null = null;

    // Check if we're in the browser before accessing localStorage
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token');
    }

    // Clone the request with the base URL
    let modifiedReq = req.clone({
      url: `${baseUrl}${req.url}`,
    });

    // Add the Authorization header if token is available
    if (token) {
      modifiedReq = modifiedReq.clone({
        setHeaders: {
          // Authorization: `Bearer ${token}`,
          token: token
        },
      });
    }

    // Pass on the modified request
    return next.handle(modifiedReq).pipe(
      finalize(() => {
        // Hide loading when the response is received
        this.loadingService.hide();
      })
    );
  }
}
