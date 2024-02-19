import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Button } from "../components/ui/button";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";


export function DataTable({
  columns,
  data,
  filterField,
}) {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    getFilteredRowModel : getFilteredRowModel(),
  })

  return (
    <div>

      {/* Input */}
      <div className="flex items-start justify-center space-x-2 py-4">
        <Input
          type="text"
          placeholder="Search"
          value={table.getColumn(filterField).getFilterValue() || ""}
          onChange={(e) => {
            table.getColumn(filterField).setFilterValue(e.target.value);
          }}
        />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {table.getAllColumns().filter(column => column.getCanHide()).map((column) => (
              <DropdownMenuCheckboxItem key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={() => column.toggleVisibility()}
                className="capitalize"
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={() => {navigate("/employee/add")}}>Add</Button>
      </div>

      <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>
      
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button variant="outline" size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <Button variant="outline" size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>
      </div>
    </div>
  )
}
