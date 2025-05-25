import { useQuery } from '@tanstack/react-query';

import { fetchProvinces } from '@app/services/locationAPI';

export const useGetProvince = () => {
  return useQuery({
    queryKey: ['provinces'],
    queryFn: fetchProvinces,
  });
};
