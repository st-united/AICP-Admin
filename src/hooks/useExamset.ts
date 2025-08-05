import { useMutation } from '@tanstack/react-query';

import { Test } from '@app/interface/examSet.interface';
import { getAllExamSetApi } from '@app/services/examSetAPI';
export const useGetAllExamSet = () => {
  return useMutation<Test[], Error, void>(async () => {
    const { data } = await getAllExamSetApi();
    console.log(data);

    return data;
  });
};
