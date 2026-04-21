import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret_dev';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret_dev';

export const generateAccessToken = (userId) =>
  jwt.sign({ id: userId }, ACCESS_SECRET, { expiresIn: '15m' });

export const generateRefreshToken = (userId) =>
  jwt.sign({ id: userId }, REFRESH_SECRET, { expiresIn: '7d' });

export const verifyAccessToken = (token) =>
  jwt.verify(token, ACCESS_SECRET);

export const verifyRefreshToken = (token) =>
  jwt.verify(token, REFRESH_SECRET);