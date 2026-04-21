import { verifyAccessToken } from '../config/jwt.js';
import { createError } from './errorHandler.js';

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(createError('Token manquant — accès refusé', 401));
    }

    const token   = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);
    req.user      = decoded;
    next();
  } catch {
    return next(createError('Token invalide ou expiré', 401));
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return next(createError('Accès réservé aux administrateurs', 403));
  }
  next();
};