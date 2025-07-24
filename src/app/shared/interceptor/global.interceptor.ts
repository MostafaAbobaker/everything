import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from '../../../environments/environment';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const baseUrl = environment.apiUrl;

  // Show loader
  loadingService.show();

  // Get token from localStorage
  // const token = localStorage.getItem('userToken');

  const token = typeof window !== 'undefined' ? localStorage.getItem('everything-token') : null;
  debugger
  // Clone the request and add token if it exists
  if (token) {

    req = req.clone({
      url: `${baseUrl}${req.url}`,
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'accept-language': 'ar', // Default language
      }
    });
  } else {

    req = req.clone({
      url: `${baseUrl}${req.url}`,
      setHeaders: {
        'accept-language': 'ar', // Default language
      }
    });
  }

  // Process the request and handle the loader
  return next(req).pipe(
    finalize(() => {
      // Hide loader after request completes (success or error)
      loadingService.hide();
    })
  );
};
