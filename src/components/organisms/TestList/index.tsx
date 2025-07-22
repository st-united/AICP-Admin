import { HomeOutlined } from '@ant-design/icons';
import { Button, Input, Select, Row, Col, Empty, Breadcrumb } from 'antd';
import { Search, Plus, FileX } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { TestCard, TestType as Test } from './../TestCard/index';
import { useGetAllExamSet } from '@app/hooks';
import { TestStatus } from '@app/interface/examSet.interface';
const { Option } = Select;

const statusOptions = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: TestStatus.DRAFT, label: 'Bản nháp' },
  { value: TestStatus.PUBLISHED, label: 'Đã xuất bản' },
  { value: TestStatus.ACTIVE, label: 'Đang sử dụng' },
  { value: TestStatus.INACTIVE, label: 'Ngưng sử dụng' },
  { value: TestStatus.ARCHIVED, label: 'Đã lưu trữ' },
];

export function TestList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: fetchTests } = useGetAllExamSet();

  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const mapStatus = (test: any): Test['status'] => {
    if (!test.isActive) return TestStatus.INACTIVE;
    if (test.assessmentType === 'SELF_ASSESSMENT') return TestStatus.DRAFT;
    return TestStatus.ACTIVE;
  };

  useEffect(() => {
    fetchTests(undefined, {
      onSuccess: (data: any[]) => {
        const mappedTests: Test[] = data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          urlImage: item.urlImage,
          startDate: new Date(item.startDate).toLocaleDateString('vi-VN'),
          endDate: new Date(item.endDate).toLocaleDateString('vi-VN'),
          assessmentType: item.assessmentType,
          isActive: item.isActive,
          createdAt: item.createdAt,
          status: mapStatus(item),
        }));

        setTests(mappedTests);
        setLoading(false);
      },
      onError: (err) => {
        setLoading(false);
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

    if (statusFilter !== 'all') {
      filtered = filtered.filter((test) => test.status === statusFilter);
    }

    return filtered.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [searchTerm, statusFilter, tests]);

  const hasNoTests = !loading && tests.length === 0;
  const hasNoResults = !loading && filteredTests.length === 0;
  const isSearchActive = searchTerm.trim() !== '' || statusFilter !== 'all';

  const handleCreateTest = () => {
    navigate('/tests/create');
  };

  const handleViewDetails = (testId: string) => {
    navigate(`/tests/${testId}`);
  };

  return (
    <div className='bg-gray-50 w-full'>
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
          <div className='w-full [@media(min-width:600px)]:w-[30%] [@media(min-width:1200px)]:w-[15%_!important]'>
            <Input
              placeholder={t('TEST_LIST.INPUT.PLACEHOLDER') as string}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              suffix={<Search className='w-4 h-4 text-gray-400' />}
              className='bg-white border-gray-200 focus:border-purple-500 focus:shadow-purple-100 h-10'
            />
          </div>

          <div className='w-full [@media(min-width:600px)]:w-[30%] [@media(min-width:1200px)]:w-[15%_!important]'>
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
            image={<FileX className='w-16 h-16 text-gray-400 mx-auto' />}
            description={
              <div className='text-center'>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
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
              icon={<Plus className='w-4 h-4' />}
            >
              {t('TEST_LIST.BUTTON.CREATE')}
            </Button>
          </Empty>
        ) : hasNoResults ? (
          <Empty
            image={<Search className='w-16 h-16 text-gray-400 mx-auto' />}
            description={
              <div className='text-center'>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  {t('TEST_LIST.EMPTY.NO_RESULT.TITLE')}
                </h3>
                <p className='text-gray-600 mb-6'>
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
