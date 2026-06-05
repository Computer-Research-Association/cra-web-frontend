import { useQuery } from '@tanstack/react-query';
import { getAllTags } from '~/api/board';

export function useAllTags(enabled = true): { id: number; name: string }[] {
  const { data } = useQuery({
    queryKey: ['tags.all'],
    queryFn: getAllTags,
    staleTime: 5 * 60 * 1000,
    enabled,
  });
  return data ?? [];
}
