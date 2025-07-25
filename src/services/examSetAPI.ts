import axios from 'axios';

import { API_URL } from '@app/constants';

export const getAllExamSetApi = () => axios.get(API_URL.EXAM_SETS);
