import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {}

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="overflow-x-auto">
        <table
          ref={ref}
          className={cn('min-w-full divide-y divide-gray-200', className)}
          {...props}
        />
      </div>
    );
  }
);

Table.displayName = 'Table';

export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {}

const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className, ...props }, ref) => {
    return (
      <thead ref={ref} className={cn('bg-gray-50', className)} {...props} />
    );
  }
);

TableHead.displayName = 'TableHead';

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <tbody ref={ref} className={cn('bg-white divide-y divide-gray-200', className)} {...props} />
    );
  }
);

TableBody.displayName = 'TableBody';

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn('hover:bg-gray-50 transition-colors', className)}
        {...props}
      />
    );
  }
);

TableRow.displayName = 'TableRow';

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  colSpan?: number;
}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, colSpan, ...props }, ref) => {
    return (
      <td
        ref={ref}
        colSpan={colSpan}
        className={cn('px-6 py-4 whitespace-nowrap text-sm text-gray-900', className)}
        {...props}
      />
    );
  }
);

TableCell.displayName = 'TableCell';

export interface TableHeaderCellProps extends HTMLAttributes<HTMLTableCellElement> {
  colSpan?: number;
}

const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ className, colSpan, ...props }, ref) => {
    return (
      <th
        ref={ref}
        colSpan={colSpan}
        className={cn(
          'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
          className
        )}
        {...props}
      />
    );
  }
);

TableHeaderCell.displayName = 'TableHeaderCell';

export { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell };
