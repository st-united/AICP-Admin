import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { Domain } from '@app/interface/domain.interface';
import { getDomainNamesAPI } from '@app/services/domainAPI';

export const useGetDomainNames = () => {
  return useQuery(
    [QUERY_KEY.DOMAIN],
    async (): Promise<Domain[]> => {
      return await getDomainNamesAPI();
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  );
};
