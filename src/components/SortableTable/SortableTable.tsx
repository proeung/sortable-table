import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { City } from '../../api/getCities';
import { StatusType } from 'types/status';
import { ReactComponent as SortAsc } from '../../assets/SortAsc.svg';
import { ReactComponent as SortDesc } from '../../assets/SortDesc.svg';
import { ReactComponent as SortIcon } from '../../assets/Sort.svg';
import Button from 'components/Button/Button';

interface SortableTableProps {
  ariaLabel: string;
  caption?: string;
  columns: Array<{ Header: string; accessor: keyof City }>;
  data: City[];
  status: StatusType;
  crash?: React.ReactNode;
  empty?: React.ReactNode;
}

const SortableTable: React.FC<SortableTableProps> = ({ ariaLabel, caption, columns, data, status, crash, empty }) => {
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

  if (status === 'error') {
    return <>{crash}</>; // Render crash message outside of table structure
  }

  // Check if there's data
  const hasData = status === 'success' && rows.length > 0;

  return (
    <div>
      <table
        {...getTableProps()}
        aria-label={ariaLabel}
        className='w-full text-md text-left text-salt-900 lg:table-fixed'>
        {caption &&
          <caption className='text-left mb-8 text-salt-900'>
            {caption}
          </caption>
        }
        <thead className='sticky z-[2] top-0 border-y border-salt-700 text-salt-800 bg-salt-200 leading-none'>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  scope='col'
                  className='overflow-hidden relative whitespace-nowrap'
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
        {hasData ? (
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
        ) : (
          <tbody>
            <tr>
              <td colSpan={columns.length}>{empty}</td>
            </tr>
          </tbody>
        )}
      </table>
      { }
    </div>
  );
};

export default SortableTable;
