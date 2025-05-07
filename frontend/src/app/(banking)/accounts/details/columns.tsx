"use client";

import { Transaction } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transaction_date",
    header: "Date",
    cell: ({ getValue }) => (
      <p>{new Date(getValue<string>()).toLocaleString()}</p>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ getValue }) => <p>{getValue<string>()}</p>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => {
      const formatted = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(getValue<number>());

      return <p>{formatted}</p>;
    },
  },
  {
    accessorKey: "running_balance",
    header: "Running Balance",
    cell: ({ getValue }) => {
      const formatted = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(getValue<number>());

      return <p>{formatted}</p>;
    },
  },
];

export default columns;
