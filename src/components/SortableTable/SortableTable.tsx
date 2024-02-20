import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { City } from '../../api/getCities';
import { ReactComponent as CaretUp } from '../../assets/CaretUp.svg';
import { ReactComponent as CaretDown } from '../../assets/CaretDown.svg';
import { ReactComponent as SortIcon } from '../../assets/Sort.svg';

interface SortableTableProps {
  ariaLabel: string;
  columns: Array<{ Header: string; accessor: keyof City }>;
  data: City[];
}

const SortableTable: React.FC<SortableTableProps> = ({ ariaLabel, columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );

  return (
    <table {...getTableProps()} aria-label={ariaLabel}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                scope='col'
                aria-sort={column.isSorted ? (column.isSortedDesc ? 'descending' : 'ascending') : 'none'}
              >
                <button type="button">
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? <CaretDown /> : <CaretUp />
                    ) : <SortIcon />}
                  </span>
                </button>

              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SortableTable;
