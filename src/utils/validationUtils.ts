/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Utilidades para validación de datos de la aplicación
 */

import { type Repository } from '../services/gitService';

/**
 * Valida que un repositorio tenga la estructura correcta
 */
export const isValidRepository = (repo: unknown): repo is Repository => {
  return (
    repo &&
    typeof repo === 'object' &&
    'id' in repo &&
    typeof (repo as any).id === 'number' &&
    'name' in repo &&
    typeof (repo as any).name === 'string' &&
    'html_url' in repo &&
    typeof (repo as any).html_url === 'string' &&
    'size' in repo &&
    typeof (repo as any).size === 'number' &&
    'stargazers_count' in repo &&
    typeof (repo as any).stargazers_count === 'number' &&
    'owner' in repo &&
    (repo as any).owner &&
    typeof (repo as any).owner === 'object' &&
    'login' in (repo as any).owner &&
    typeof (repo as any).owner.login === 'string' &&
    'avatar_url' in (repo as any).owner &&
    typeof (repo as any).owner.avatar_url === 'string' &&
    'html_url' in (repo as any).owner &&
    typeof (repo as any).owner.html_url === 'string'
  );
};

/**
 * Filtra y valida una lista de repositorios
 */
export const validateRepositories = (repositories: unknown[]): Repository[] => {
  return repositories.filter(isValidRepository);
};

/**
 * Verifica si una query es válida para GitHub API
 */
export const isValidGitHubQuery = (query: string): boolean => {
  if (!query || query.trim().length === 0) {
    return false;
  }
  
  // GitHub tiene límites en el tamaño de la query
  if (query.length > 256) {
    return false;
  }
  
  // Caracteres básicos válidos para GitHub search
  const validCharacters = /^[a-zA-Z0-9\s\-_.:@#$%&*+=!?<>(){}[\]|"'`,;]+$/;
  return validCharacters.test(query);
};

/**
 * Sanitiza una query para GitHub API
 */
export const sanitizeGitHubQuery = (query: string): string => {
  return query
    .trim()
    .replace(/\s+/g, ' ') // Múltiples espacios a uno solo
    .slice(0, 256); // Limitar longitud
};

/**
 * Verifica si los resultados están vacíos
 */
export const isEmpty = <T>(items: T[]): boolean => {
  return !items || items.length === 0;
};

/**
 * Verifica si una respuesta de API es válida
 */
export const isValidApiResponse = (response: unknown): boolean => {
  if (!response || typeof response !== 'object') {
    return false;
  }
  
  const resp = response as any;
  return (
    'total_count' in resp &&
    typeof resp.total_count === 'number' &&
    'incomplete_results' in resp &&
    typeof resp.incomplete_results === 'boolean' &&
    'items' in resp &&
    Array.isArray(resp.items)
  );
};