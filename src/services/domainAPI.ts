import axios from 'axios';

import { API_URL } from '@app/constants';
import { Domain } from '@app/interface/domain.interface';

export const getDomainNamesAPI = async (): Promise<Domain[]> => {
  const response = await axios.get(API_URL.DOMAIN_NAMES);
  return response.data.data;
};
