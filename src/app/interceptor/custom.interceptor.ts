import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (request, next) => {
  const token =  localStorage.getItem('gAIlenusToken');
  const cloned = request.clone({
    headers: request.headers.set('Authorization', `Bearer ${token}`)
  })
  return next(cloned);
};
