export interface RepositoryOwner {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  size: number;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  owner: RepositoryOwner;
}

export interface GitHubApiResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export interface ApiError {
  message: string;
  documentation_url?: string;
}

export interface BufferState {
  currentApiPage: number;
  currentClientPage: number;
  repositoryBuffer: Repository[];
  allLoadedRepositories: Repository[];
  hasMoreApiData: boolean;
  isPreloading: boolean;
  currentQuery: string;
  currentSort: string;
  currentOrder: string;
}