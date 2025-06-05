import { Province } from '@app/interface/location.interface';

export const fetchProvinces = async (): Promise<Province[]> => {
  const response = await fetch('https://provinces.open-api.vn/api/p/');
  if (!response.ok) {
    throw new Error('Failed to fetch province');
  }

  const rawData = await response.json();

  return rawData.map((item: any) => ({
    codeName: item.codename,
    name: item.name,
  }));
};
