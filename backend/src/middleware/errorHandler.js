// Crée une erreur avec un statusCode personnalisé
export const createError = (message, statusCode = 500) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

// Wrapper async pour éviter les try/catch répétitifs
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Middleware global de gestion d'erreurs
export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message    = err.message    || 'Erreur interne du serveur';

  console.error(`[${new Date().toISOString()}] ❌ ${statusCode} — ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};