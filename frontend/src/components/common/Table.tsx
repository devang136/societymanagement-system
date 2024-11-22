import React from 'react';
import { Table as ChakraTable, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
}

export const Table = <T extends Record<string, any>>({
  columns,
  data,
  onRowClick
}: TableProps<T>): JSX.Element => {
  if (!data.length) {
    return (
      <div className="text-center py-4 text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <Box overflowX="auto">
      <ChakraTable variant="simple">
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th key={index} width={column.width}>
                {column.header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, rowIndex) => (
            <Tr
              key={rowIndex}
              onClick={() => onRowClick?.(item)}
              cursor={onRowClick ? 'pointer' : 'default'}
              _hover={{ bg: onRowClick ? 'gray.50' : 'inherit' }}
            >
              {columns.map((column, colIndex) => (
                <Td key={colIndex}>
                  {typeof column.accessor === 'function'
                    ? column.accessor(item)
                    : item[column.accessor]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </Box>
  );
};
