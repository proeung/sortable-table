import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { City } from '../../api/getCities';
import { ReactComponent as CaretUp } from '../../assets/CaretUp.svg';
import { ReactComponent as CaretDown } from '../../assets/CaretDown.svg';
import { ReactComponent as SortIcon } from '../../assets/Sort.svg';
import Button from 'components/Button/Button';

interface SortableTableProps {
  ariaLabel: string;
  caption?: string;
  columns: Array<{ Header: string; accessor: keyof City }>;
  data: City[];
}

const SortableTable: React.FC<SortableTableProps> = ({ ariaLabel, caption, columns, data }) => {
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

  return (
    <table
      {...getTableProps()}
      aria-label={ariaLabel}
      className='w-full text-md text-left text-salt-900'>
      {caption &&
        <caption className='text-left mb-6 text-salt-900'>
          {caption}
        </caption>
      }
      <thead className='border-y border-salt-700 text-salt-800 bg-salt-200 leading-none'>
        {headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                scope='col'
                aria-sort={column.isSorted ? (column.isSortedDesc ? 'descending' : 'ascending') : 'none'}
                className='px-5 py-3.5'
              >
                <Button
                  ariaLabel={`Sort by ${column.render('Header')} ${column.isSorted ? (column.isSortedDesc ? 'ascending' : 'descending') : 'ascending'}`}
                >
                  <span>{column.render('Header')}</span>
                  {column.isSorted ? (
                    column.isSortedDesc ? <CaretDown /> : <CaretUp />
                  ) : <SortIcon />}
                </Button>

              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className='bg-white border-b border-salt-700 hover:bg-salt-200'
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
    </table>
  );
};

export default SortableTable;
