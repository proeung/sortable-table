import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { City } from '../../api/getCities';
import { ReactComponent as SortAsc } from '../../assets/SortAsc.svg';
import { ReactComponent as SortDesc } from '../../assets/SortDesc.svg';
import { ReactComponent as SortIcon } from '../../assets/Sort.svg';
import Button from 'components/Button/Button';

interface SortableTableProps {
  ariaLabel: string;
  caption?: string;
  columns: Array<{ Header: string; accessor: keyof City }>;
  data: City[];
  inlineStyles?: React.CSSProperties;
  loading: boolean;
  error: Error | null;
  crash?: React.ReactNode;
  empty?: React.ReactNode;
  loader?: React.ReactNode;
}

const SortableTable: React.FC<SortableTableProps> = ({
  ariaLabel,
  caption,
  columns,
  data,
  inlineStyles,
  loading,
  error,
  crash,
  empty,
  loader
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  // Render Loader and Crash message
  if (loading) {
    return <>{loader}</>;
  }

  if (error) {
    return <>{crash}</>;
  }

  // Check for empty
  const isEmpty = rows.length === 0;

  return (
    <table
      {...getTableProps()}
      aria-label={ariaLabel}
      className='w-full text-md text-left text-salt-900 table-auto lg:table-fixed'
      style={inlineStyles}>
      {caption &&
        <caption className='text-left mb-8 text-salt-900'>
          {caption}
        </caption>
      }
      <thead className='sticky z-[2] top-0 text-salt-800 bg-salt-200 leading-none'>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                scope='col'
                className='overflow-hidden relative whitespace-nowrap [box-shadow:0_-1px_0_0_#919197_inset,_0_1px_0_0_#919197_inset]'
                aria-sort={column.isSorted ? (column.isSortedDesc ? 'descending' : 'ascending') : 'none'}
                title={`Sort by ${column.render('Header')}`}
              >
                <Button ariaLabel={`Sort by ${column.render('Header')}`}>
                  <span>{column.render('Header')}</span>
                  {column.isSorted ? (column.isSortedDesc ? <SortDesc /> : <SortAsc />) : <SortIcon />}
                </Button>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      {isEmpty ? (
        <tbody>
          <tr>
            <td colSpan={columns.length}>{empty}</td>
          </tr>
        </tbody>
      ) : (
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className='bg-white border-b border-salt-700 leading-8'>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className='px-5 py-4'>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      )}
      { }
    </table>

  );
};

export default SortableTable;
