import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { fetchProvinces } from '@app/services/locationAPI';

export const useGetProvince = () => {
  return useQuery({
    queryKey: [QUERY_KEY.PROVINCE],
    queryFn: fetchProvinces,
  });
};
