import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); // o donde lo guardes

  const cloned = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  return next(cloned);
};
