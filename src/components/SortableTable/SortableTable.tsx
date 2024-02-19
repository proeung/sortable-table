import React from 'react';
import { useTable, useSortBy, Column } from 'react-table';
import { City } from '../../api/getCities';

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
              >
                {column.render('Header')}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
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
