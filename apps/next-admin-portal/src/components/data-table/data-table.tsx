'use client';

import React, { useRef } from 'react';
import classNames from 'classnames';
import { ColumnDef, flexRender, Table as TTable } from '@tanstack/react-table';
import { Loading } from '~ui/components/ui/loading';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~ui/components/ui/table';
import { useSmoothDragToScroll } from '~shared-web/hooks/use-smooth-drag-to-scroll';

import NoData from '../no-data';

interface IDataTableProps<TData, TValue, T> {
  tableClassName?: string;
  columns: ColumnDef<TData, TValue>[];
  table: TTable<T>;
  isFetching?: boolean;
}

export function DataTable<TData, TValue, T>({
  tableClassName,
  columns,
  table,
  isFetching
}: IDataTableProps<TData, TValue, T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useSmoothDragToScroll(containerRef);

  return (
    <>
      <div className="relative mt-3 flex h-full grow flex-col">
        {/* scrollbar absolute left-0 top-0 max-h-full min-h-fit w-full overflow-auto rounded border */}
        <div ref={containerRef} className="scrollbar overflow-auto rounded border">
          <Table className={classNames(tableClassName)}>
            <TableHeader className="bg-card after:absolute after:bottom-0 after:h-[1px] after:w-full after:bg-border after:content-['']">
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    const size = header.column.columnDef.size;
                    const style = {
                      width: size === 0 ? 'auto' : size + 'px'
                    };

                    return (
                      <TableHead key={header.id} style={style} className="border-l first:border-none">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <TableCell key={cell.id} className="border-l first:border-none">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 border-l first:border-none">
                    <div className="flex items-center justify-center">
                      {isFetching ? <Loading className="mx-auto" /> : <NoData />}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
