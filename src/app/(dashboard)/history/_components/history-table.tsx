"use client";

import { useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { OrderResponse } from "@/api/generated";

interface HistoryTableProps {
  orders: OrderResponse[];
}

const columns: ColumnDef<OrderResponse>[] = [
  {
    accessorKey: "orderId",
    header: "거래 ID",
    cell: (info) => info.getValue(),
    size: 100,
  },
  {
    accessorKey: "orderedAt",
    header: "거래 일시",
    cell: (info) => {
      const value = info.getValue() as string;
      return value.replace("T", " ").slice(0, 19);
    },
    size: 220,
  },
  {
    accessorKey: "fromAmount",
    header: "매수 금액",
    cell: (info) => (info.getValue() as number).toLocaleString(),
    size: 200,
    meta: {
      align: "right",
    },
  },
  {
    accessorKey: "appliedRate",
    header: "체결 환율",
    cell: (info) => (info.getValue() as number).toLocaleString(),
    size: 200,
    meta: {
      align: "right",
    },
  },
  {
    accessorKey: "toAmount",
    header: "매도 금액",
    cell: (info) => (info.getValue() as number).toLocaleString(),
    size: 200,
    meta: {
      align: "right",
    },
  },
];

export function HistoryTable({ orders }: HistoryTableProps) {
  /* eslint-disable-next-line react-hooks/incompatible-library */
  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 57,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - virtualRows[virtualRows.length - 1].end
      : 0;

  return (
    <div className="overflow-hidden rounded-[1rem] border border-[#E5E8EB] py-6">
      <div
        ref={tableContainerRef}
        className="bg-white"
        style={{ maxHeight: "600px", overflow: "auto" }}
      >
        <table className="w-full table-fixed">
          <thead className="bg-white sticky top-0 z-10 shadow-[inset_0_1px_0_0_#E5E8EB,inset_0_-1px_0_0_#E5E8EB]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta as
                    | { align?: string }
                    | undefined;
                  return (
                    <th
                      key={header.id}
                      className="px-[1.5rem] py-[1rem] text-[1rem] font-medium text-[#646F7C]"
                      style={{
                        width: header.getSize(),
                        textAlign: (meta?.align as "left" | "right") || "left",
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta as
                      | { align?: string }
                      | undefined;
                    return (
                      <td
                        key={cell.id}
                        className="px-[1.5rem] py-[1rem] text-[1rem] text-[#28323C]"
                        style={{
                          textAlign:
                            (meta?.align as "left" | "right") || "left",
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
