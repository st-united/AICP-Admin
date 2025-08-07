import { SearchOutlined, PlusOutlined, FileExclamationOutlined } from '@ant-design/icons';
import { Button, Input, Select, Row, Col, Empty, Breadcrumb, Spin } from 'antd';
import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { TestCard, TestType as Test } from './../TestCard/index';
import { ALL_STATUS_VALUE } from '@app/constants/examset';
import { formatDate } from '@app/helpers/date';
import { useGetAllExamSet } from '@app/hooks/useExamset';
import { statusOptions } from '@app/interface/examSet.interface';
import './TestList.scss';
const { Option } = Select;

export function TestList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: fetchTests, isPending } = useGetAllExamSet();
  const [tests, setTests] = useState<Test[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(ALL_STATUS_VALUE);

  useEffect(() => {
    fetchTests(undefined, {
      onSuccess: (data: Test[]) => {
        const mapToTest = (item: Test): Test => ({
          ...item,
          startDate: formatDate(item.startDate),
          endDate: formatDate(item.endDate),
        });
        const mappedTests: Test[] = data.map(mapToTest);
        setTests(mappedTests);
      },
    });
  }, [fetchTests]);

  const filteredTests = useMemo(() => {
    let filtered = tests;

    if (searchTerm.trim()) {
      filtered = filtered.filter((test) =>
        test.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
      );
    }

    if (statusFilter !== ALL_STATUS_VALUE) {
      filtered = filtered.filter((test) => test.status === statusFilter);
    }

    return filtered.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [searchTerm, statusFilter, tests]);

  const hasNoTests = !isPending && tests.length === 0;
  const hasNoResults = !isPending && filteredTests.length === 0;
  const isSearchActive = searchTerm.trim() !== '' || statusFilter !== ALL_STATUS_VALUE;

  const handleCreateTest = () => {
    navigate('/tests/create');
  };

  const handleViewDetails = (testId: string) => {
    navigate(`/tests/${testId}`);
  };

  if (isPending) {
    return (
      <div className='w-full h-[18.75rem] flex justify-center items-center'>
        <Spin size='large' />
      </div>
    );
  }
  return (
    <div className='bg-gray-50 w-full mentor-booking__empty'>
      <div className='w-full mx-auto px-6 pb-6'>
        <div className='flex items-center justify-between mb-6 w-full'>
          <div className='w-full'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full'>
              <h1 className='text-2xl font-bold text-gray-900'>{t('TEST_LIST.TITLE')}</h1>
              <Button
                type='primary'
                onClick={handleCreateTest}
                className='bg-[#FE7743] hover:bg-[#FE7743] border-[#FE7743] hover:border-[#FE7743] px-6 py-2 h-auto font-medium shadow-lg hover:shadow-xl transition-all'
              >
                {t('TEST_LIST.BUTTON.ADD')}
              </Button>
            </div>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-4'>
          <div className='w-full sm:w-[30%] md1200:w-[15%_!important]'>
            <Input
              placeholder={t('TEST_LIST.INPUT.PLACEHOLDER') as string}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              suffix={<SearchOutlined className='w-4 h-4 text-[#6B7280]' />}
              className='bg-white border-gray-200 focus:border-purple-500 focus:shadow-purple-100 h-10'
            />
          </div>

          <div className='w-full sm:w-[30%] md1200:w-[15%_!important]'>
            <Select value={statusFilter} onChange={setStatusFilter} className='w-full h-10'>
              {statusOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <div className='w-full mx-auto px-6 pb-6'>
        {hasNoTests ? (
          <Empty
            image={<FileExclamationOutlined className='w-16 h-16 text-gray-400 mx-auto' />}
            description={
              <div className='text-center'>
                <h3 className='text-xs font-medium text-gray-900 mb-2'>
                  {t('TEST_LIST.EMPTY.NO_TEST.TITLE')}
                </h3>
                <p className='text-gray-600 mb-6'>{t('TEST_LIST.EMPTY.NO_TEST.DESCRIPTION')}</p>
              </div>
            }
          >
            <Button
              type='primary'
              onClick={handleCreateTest}
              className='bg-purple-600 hover:bg-purple-700 border-purple-600'
              icon={<PlusOutlined className='w-4 h-4' />}
            >
              {t('TEST_LIST.BUTTON.CREATE')}
            </Button>
          </Empty>
        ) : hasNoResults ? (
          <Empty
            image={
              <SearchOutlined className='w-16 h-16 sm:w-16 text-2xl sm:text-3xl sm:h-16 text-gray-400 mx-auto ' />
            }
            description={
              <div className='text-center px-4 sm:px-0'>
                <h3 className='text-sm sm:text-lg font-semibold text-gray-900 mb-2'>
                  {t('TEST_LIST.EMPTY.NO_RESULT.TITLE')}
                </h3>
                <p className='text-sm sm:text-base text-gray-600 mb-6'>
                  {isSearchActive
                    ? t('TEST_LIST.EMPTY.NO_RESULT.SEARCH_ACTIVE')
                    : t('TEST_LIST.EMPTY.NO_RESULT.NO_FILTER_MATCH')}
                </p>
              </div>
            }
          >
            <Button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
            >
              {t('TEST_LIST.BUTTON.CLEAR_FILTER')}
            </Button>
          </Empty>
        ) : (
          <Row gutter={[24, 24]}>
            {filteredTests.map((test) => (
              <Col key={test.id} xs={24} md={12} lg={8}>
                <TestCard test={test} onViewDetails={handleViewDetails} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
