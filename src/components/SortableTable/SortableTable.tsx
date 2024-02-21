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
  empty?: React.ReactNode;
}

const SortableTable: React.FC<SortableTableProps> = ({ ariaLabel, caption, columns, data, status, empty }) => {
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

  // Determine if the table body should be rendered or if the empty prop should be shown
  const shouldShowEmpty = status !== 'success' || rows.length === 0;

  return (
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
        {headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                scope='col'
                aria-sort={column.isSorted ? (column.isSortedDesc ? 'descending' : 'ascending') : 'none'}
                className='overflow-hidden relative whitespace-nowrap'
              >
                <Button
                  ariaLabel={`Sort by ${column.render('Header')} ${column.isSorted ? (column.isSortedDesc ? 'ascending' : 'descending') : 'ascending'}`}
                >
                  <span>{column.render('Header')}</span>
                  {column.isSorted ? (
                    column.isSortedDesc ? <SortDesc /> : <SortAsc />
                  ) : <SortIcon />}
                </Button>

              </th>
            ))}
          </tr>
        ))}
      </thead>
      {!shouldShowEmpty ? (
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className='bg-white border-b border-salt-700 leading-8'
              >
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    className='px-5 py-4'
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      ) :
        <tbody {...getTableBodyProps()}>
          <tr>
            <td colSpan={columns.length}>
              {empty}
            </td>
          </tr>
        </tbody>
      }
    </table>
  );
};

export default SortableTable;
