import { Pagination, Select, Table as TableAntd, TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { EmptyData } from '@app/components/molecules';

import './Table.scss';

export interface PaginateProp {
  page: number;
  take: number;
}

interface PaginateOptions {
  table: PaginateProp;
  setTable: (value: any) => void;
  total: number;
  pageCount: number;
}

type TableProps = {
  columns: ColumnsType<any>;
  dataSource: [];
  loading?: boolean;
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>,
  ) => void;
  paginate?: PaginateOptions;
  disablePaginate?: boolean;
  summary?: (data: readonly any[]) => ReactNode;
  className?: string;
  hiddenScrollX?: boolean;
  expandableRender?: (record: any) => ReactNode;
  expandedRowKeys?: React.Key[];
  setExpandedRowKeys?: (keys: React.Key[]) => void;
};

export const Table: React.FC<TableProps> = ({
  loading,
  columns,
  dataSource,
  paginate,
  onChange,
  disablePaginate = false,
  summary,
  className = '',
  hiddenScrollX = false,
  expandableRender,
  expandedRowKeys,
  setExpandedRowKeys,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`table-antd shadow-custom rounded-lg ${className}`}>
      <TableAntd
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={(record) => record.id}
        onChange={onChange}
        scroll={{ x: 'max-content' }}
        showSorterTooltip={false}
        pagination={false}
        locale={{
          emptyText: <EmptyData />,
        }}
        className={`${disablePaginate === true ? 'br12' : ''} ${
          hiddenScrollX ? 'hidden-scroll-x' : ''
        }`}
        summary={summary}
        expandable={
          expandableRender
            ? {
                expandedRowRender: (record) => expandableRender(record),
                rowExpandable: (record) => !record?.user?.upcomingCount,
                expandedRowKeys: expandedRowKeys,
                onExpand: (expanded, record) => {
                  if (!setExpandedRowKeys) return;
                  if (expanded) {
                    setExpandedRowKeys([record.id]);
                  } else {
                    setExpandedRowKeys([]);
                  }
                },
                expandIcon: () => null,
              }
            : undefined
        }
      />

      {disablePaginate === false && (
        <>
          {paginate && (
            <div className='flex gap-2 justify-end items-center py-4 pr-6 shadow-custom rounded-b-lg bg-white'>
              <Pagination
                showSizeChanger={false}
                total={paginate.total}
                current={paginate.table.page}
                pageSize={paginate.table.take}
                onChange={(page: number) => {
                  paginate.setTable({
                    ...paginate.table,
                    page: page,
                  });
                }}
              />
              <Select
                defaultValue={paginate && paginate.table.take}
                onChange={(value: number) => {
                  paginate &&
                    paginate.setTable({
                      ...paginate.table,
                      take: value,
                      page: 1,
                    });
                }}
                options={[
                  {
                    value: 10,
                    label: t('TABLE.PER_PAGE', { number: 10 }),
                  },
                  {
                    value: 20,
                    label: t('TABLE.PER_PAGE', { number: 20 }),
                  },
                  {
                    value: 50,
                    label: t('TABLE.PER_PAGE', { number: 50 }),
                  },
                  {
                    value: 100,
                    label: t('TABLE.PER_PAGE', { number: 100 }),
                  },
                ]}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
