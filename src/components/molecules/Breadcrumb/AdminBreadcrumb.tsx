import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './AdminBreadcrumb.scss';

export interface BreadcrumbItem {
  key: string;
  label: string;
  path: string;
}

interface Props {
  items: BreadcrumbItem[];
}

const AdminBreadcrumbs: React.FC<Props> = ({ items }) => {
  const { t } = useTranslation();
  return (
    <div id='AdminBreadcrumbs'>
      <Breadcrumb separator='/'>
        <Breadcrumb.Item key='home'>
          <span className='breadcrumbs-link'>
            <HomeOutlined /> <span>{t('ADMIN_BREADCRUMB.HOME')}</span>
          </span>
        </Breadcrumb.Item>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <Breadcrumb.Item key={item.path}>
              {isLast ? (
                <span className='breadcrumbs-current'>{item.label}</span>
              ) : (
                <Link to={item.path} className='breadcrumbs-link'>
                  {item.label}
                </Link>
              )}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
};

export default AdminBreadcrumbs;
