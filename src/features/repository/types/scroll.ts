import { type Repository } from '../../../shared/api/type/github';

export interface ScrollableCardAreaProps {
  repositories: Repository[];
  previousCount: number;
  hasMoreData: boolean;
  isLoading: boolean;
  isRateLimited: boolean;
  onLoadMore: () => void;
  error?: string | null;
}