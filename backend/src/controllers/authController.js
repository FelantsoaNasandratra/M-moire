import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../config/jwt.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { successResponse } from '../utils/helpers.js';

// ============================================
// 🔐 INSCRIPTION
// ============================================
export const register = asyncHandler(async (req, res, next) => {
  const { email, password, nom_complet } = req.body;

  if (!email || !password || !nom_complet) {
    return next(createError('Tous les champs sont obligatoires', 400));
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return next(createError('Email déjà utilisé', 400));
  }

  const password_hash = await bcrypt.hash(password, 12);

  const user = await User.create({ email, password_hash, nom_complet });

  const accessToken  = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return successResponse(res, {
    user: { id: user.id, email: user.email, nom_complet: user.nom_complet },
    accessToken,
    refreshToken
  }, 'Inscription réussie !', 201);
});

// ============================================
// 🔐 CONNEXION
// ============================================
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createError('Email et mot de passe requis', 400));
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return next(createError('Email ou mot de passe incorrect', 401));
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return next(createError('Email ou mot de passe incorrect', 401));
  }

  const accessToken  = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return successResponse(res, {
    user: { id: user.id, email: user.email, nom_complet: user.nom_complet },
    accessToken,
    refreshToken
  }, 'Connexion réussie !');
});

// ============================================
// 🔄 REFRESH TOKEN
// ============================================
export const refreshToken = asyncHandler(async (req, res, next) => {
  const { refreshToken: token } = req.body;

  if (!token) return next(createError('Refresh token manquant', 401));

  try {
    const decoded     = verifyRefreshToken(token);
    const accessToken = generateAccessToken(decoded.id);
    return successResponse(res, { accessToken }, 'Token renouvelé');
  } catch {
    return next(createError('Refresh token invalide ou expiré', 401));
  }
});

// ============================================
// 👤 PROFIL UTILISATEUR
// ============================================
export const getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ['password_hash'] }
  });

  if (!user) return next(createError('Utilisateur introuvable', 404));

  return successResponse(res, user, 'Profil récupéré');
});