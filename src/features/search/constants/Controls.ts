import {
  ArrowDown,
  ArrowUp,
  Clock,
  GitFork,
  Package,
  Plus,
  Search,
  Star,
  Target,
  User
} from 'lucide-react';
import React from 'react';

import { type SelectOption } from "../types/search";

export const SORT_OPTIONS: SelectOption[] = [
  { value: 'relevance', label: 'Relevancia', icon: React.createElement(Target, { size: 16 }) },
  { value: 'updated', label: 'Más reciente', icon: React.createElement(Clock, { size: 16 }) },
  { value: 'stars', label: 'Más estrellas', icon: React.createElement(Star, { size: 16 }) },
  { value: 'created', label: 'Más nuevo', icon: React.createElement(Plus, { size: 16 }) },
  { value: 'forks', label: 'Más forks', icon: React.createElement(GitFork, { size: 16 }) },
];

export const SEARCH_TYPE_OPTIONS: SelectOption[] = [
  { value: 'repository', label: 'Repositorios', icon: React.createElement(Package, { size: 16 }) },
  { value: 'user', label: 'Usuarios', icon: React.createElement(User, { size: 16 }) },
  { value: 'both', label: 'Ambos', icon: React.createElement(Search, { size: 16 }) },
];

export const ORDER_OPTIONS: SelectOption[] = [
  { value: 'desc', label: 'Descendente', icon: React.createElement(ArrowDown, { size: 16 }) },
  { value: 'asc', label: 'Ascendente', icon: React.createElement(ArrowUp, { size: 16 }) },
];

// Eliminamos LANGUAGE_OPTIONS y STAR_RANGE_OPTIONS ya que ahora serán campos de texto libre