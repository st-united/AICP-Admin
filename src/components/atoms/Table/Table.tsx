import {
  Pagination,
  Select,
  Table as TableAntd,
  TableProps as AntdTableProps,
  TablePaginationConfig,
} from 'antd';
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
  setTable: (value: PaginateProp) => void;
  total: number;
  pageCount: number;
}

type TableProps<T extends Record<string, any>> = {
  rowSelection?: AntdTableProps<T>['rowSelection'];
  columns: ColumnsType<T>;
  dataSource: T[];
  loading?: boolean;
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
    extra: TableCurrentDataSource<T>,
  ) => void;
  paginate?: PaginateOptions;
  disablePaginate?: boolean;
  summary?: (data: readonly T[]) => ReactNode;
  className?: string;
  hiddenScrollX?: boolean;
  onRow?: (record: T) => any;
  expandableRender?: (record: T) => ReactNode;
  expandedRowKeys?: React.Key[];
  setExpandedRowKeys?: (keys: React.Key[]) => void;
};

export const Table = <T extends Record<string, any>>({
  loading,
  columns,
  dataSource,
  paginate,
  onChange,
  onRow,
  disablePaginate = false,
  summary,
  className = '',
  hiddenScrollX = false,
  expandableRender,
  expandedRowKeys,
  setExpandedRowKeys,
  rowSelection,
}: TableProps<T>) => {
  const { t } = useTranslation();

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
    extra: TableCurrentDataSource<T>,
  ) => {
    onChange?.(pagination, filters, sorter, extra);

    if (paginate) {
      paginate.setTable({
        ...paginate.table,
        page: 1,
      });
    }
  };

  return (
    <div className={`table-antd shadow-custom rounded-lg ${className}`}>
      <TableAntd<T>
        onRow={onRow}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={(record) => (record as any).id}
        rowSelection={rowSelection}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
        showSorterTooltip={false}
        pagination={false}
        locale={{
          emptyText: <EmptyData />,
        }}
        className={`${disablePaginate ? 'br12' : ''} ${hiddenScrollX ? 'hidden-scroll-x' : ''}`}
        summary={summary}
        expandable={
          expandableRender
            ? {
                expandedRowRender: (record) => expandableRender(record),
                rowExpandable: (record) => !(record as any)?.user?.upcomingCount,
                expandedRowKeys: expandedRowKeys,
                onExpand: (expanded, record) => {
                  if (!setExpandedRowKeys) return;
                  if (expanded) {
                    setExpandedRowKeys([(record as any).id]);
                  } else {
                    setExpandedRowKeys([]);
                  }
                },
                expandIcon: () => null,
              }
            : undefined
        }
      />

      {!disablePaginate && paginate && (
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
            value={paginate.table.take}
            onChange={(value: number) => {
              paginate.setTable({
                ...paginate.table,
                take: value,
                page: 1,
              });
            }}
            options={[10, 20, 50, 100].map((value) => ({
              value,
              label: t('TABLE.PER_PAGE', { number: value }),
            }))}
          />
        </div>
      )}
    </div>
  );
};
