"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import columns from "./columns";
import { Transaction } from "@/types";

const TransactionHistoryTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="rounded-md shadow-xs border hidden lg:flex">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="bg-muted" key={headerGroup.id}>
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
                  );
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="lg:hidden grid gap-6 text-base">
        {table.getRowModel().rows.map((row) => {
          const transaction = row.original as Transaction;
          return (
            <div
              key={transaction.id}
              className="border rounded-md shadow-xs p-6 grid gap-6"
            >
              <div className="grid">
                <p className="text-muted-foreground">Date</p>
                <p className="font-medium">
                  {new Date(transaction.transaction_date).toLocaleString()}
                </p>
              </div>
              <div className="grid">
                <p className="text-muted-foreground">Description</p>
                <p className="font-medium">{transaction.description}</p>
              </div>
              <div className="grid">
                <p className="text-muted-foreground">Amount</p>
                <p className="font-medium">
                  {new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  }).format(parseInt(transaction.amount))}
                </p>
              </div>
              <div className="grid">
                <p className="text-muted-foreground">Running balance</p>
                <p className="font-medium">
                  {new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  }).format(parseInt(transaction.running_balance))}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TransactionHistoryTable;
