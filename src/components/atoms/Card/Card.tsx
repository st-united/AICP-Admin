import { Card as AntdCard, CardProps as AntdCardProps } from 'antd';
import clsx from 'clsx';
import React from 'react';
import './card.scss';

interface CustomCardProps extends Omit<AntdCardProps, 'title'> {
  actions?: React.ReactNode[];
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
}

const Card: React.FC<CustomCardProps> = ({
  actions,
  className,
  children,
  loading = false,
  ...antdProps
}) => {
  const cardClasses = clsx(
    'shadow-md hover:shadow-lg transition-shadow duration-300 !p-0',
    className,
  );

  return (
    <AntdCard className={cardClasses} actions={actions} loading={loading} {...antdProps}>
      <div className='p-4'>{children}</div>
    </AntdCard>
  );
};

export default Card;
