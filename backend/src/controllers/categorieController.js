import { Categorie } from '../models/index.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { successResponse } from '../utils/helpers.js';

// Liste toutes les catégories
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Categorie.findAll();
  return successResponse(res, categories, 'Catégories récupérées');
});

// Créer une catégorie
export const createCategorie = asyncHandler(async (req, res) => {
  const { nom, slug, description, icone } = req.body;
  const categorie = await Categorie.create({ nom, slug, description, icone });
  return successResponse(res, categorie, 'Catégorie créée !', 201);
});

// Modifier une catégorie
export const updateCategorie = asyncHandler(async (req, res, next) => {
  const categorie = await Categorie.findByPk(req.params.id);
  if (!categorie) return next(createError('Catégorie introuvable', 404));
  await categorie.update(req.body);
  return successResponse(res, categorie, 'Catégorie modifiée !');
});

// Supprimer une catégorie
export const deleteCategorie = asyncHandler(async (req, res, next) => {
  const categorie = await Categorie.findByPk(req.params.id);
  if (!categorie) return next(createError('Catégorie introuvable', 404));
  await categorie.destroy();
  return successResponse(res, null, 'Catégorie supprimée !');
});