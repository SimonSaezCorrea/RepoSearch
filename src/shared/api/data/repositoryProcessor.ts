import { DATA } from '../constants/APIGitHub';
import type { Repository } from '../type/github';

/**
 * Procesa un repositorio de la API para asegurar tipos y valores por defecto
 */
export const processRepository = (item: Repository): Repository => ({
  id: item.id,
  name: item.name,
  description: item.description || DATA.DEFAULT_DESCRIPTION,
  html_url: item.html_url,
  size: item.size,
  stargazers_count: item.stargazers_count,
  forks_count: item.forks_count || 0,
  language: item.language || DATA.DEFAULT_LANGUAGE,
  owner: {
    login: item.owner.login,
    avatar_url: item.owner.avatar_url,
    html_url: item.owner.html_url,
  },
});