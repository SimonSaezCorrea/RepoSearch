import { type Repository } from '../../../shared/api/type/github';

export interface CardProps {
  title: string;
  username: string;
  avatar_url: string;
  git_user_url: string;
  project_url: string;
  description?: string;
  size?: number;
  stars?: number;
  language?: string;
}

export interface CardGridProps {
  repositories: Repository[];
  previousCount: number;
}