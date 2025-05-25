import { Province } from '@app/interface/location.interface';

export const fetchProvinces = async (): Promise<Province[]> => {
  const response = await fetch('https://provinces.open-api.vn/api/p/');
  if (!response.ok) {
    throw new Error('Failed to fetch province');
  }
  return response.json();
};
