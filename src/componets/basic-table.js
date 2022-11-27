import React, { useState } from "react";
import { GoTriangleDown, GoTriangleRight } from "react-icons/go";
import { VscCircleFilled } from "react-icons/vsc";

import {
  createTable,
  useTableInstance,
  getCoreRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import STUDENTS from "../students.json";

const table = createTable();
const defaultData = [...STUDENTS.slice(0, 5)];
const defaultColumns = [
  table.createGroup({
    header: "Full Name",
    columns: [
      table.createDataColumn("firstName", {
        id: "First Name",
        header: (props) => (
          <>
            <button
              style={{ cursor: "pointer" }}
              onClick={props.instance.getToggleAllRowsExpandedHandler()}
            >
              {props.instance.getIsAllRowsExpanded() ? (
                <GoTriangleDown />
              ) : (
                <GoTriangleRight />
              )}
            </button>
            First Name
          </>
        ),
        cell: (props) => {
          return (
            <div style={{ paddingLeft: `${props.row.depth * 2}rem` }}>
              {props.row.getCanExpand() ? (
                <>
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={props.row.getToggleExpandedHandler()}
                  >
                    {props.row.getIsExpanded() ? (
                      <GoTriangleDown />
                    ) : (
                      <GoTriangleRight />
                    )}
                  </button>
                </>
              ) : (
                <VscCircleFilled />
              )}
              {props.getValue()}
            </div>
          );
        },
      }),
      table.createDataColumn("middleName", {
        id: "Middle Name",
      }),
      table.createDataColumn("lastName", {
        id: "Last Name",
      }),
    ],
  }),
  table.createDataColumn("age", {
    id: "Age",
  }),
  table.createGroup({
    header: "Phone Number",
    columns: [
      table.createDataColumn((row) => row.phone[1], {
        id: "Phone Number 1",
      }),
      table.createDataColumn((row) => row.phone[2], {
        id: "Phone Number 2",
      }),
    ],
  }),
  // table.createDataColumn("email", {
  //   id: "E-mail Address",
  // }),
  // table.createGroup({
  //   header: "Full Address",
  //   columns: [
  //     table.createDataColumn((row) => row.address.street, {
  //       id: "Street",
  //     }),
  //     table.createDataColumn((row) => row.address.city, {
  //       id: "City",
  //     }),
  //     table.createDataColumn((row) => row.address.state, {
  //       id: "Address",
  //     }),
  //     table.createDataColumn((row) => row.address.pincode, {
  //       id: "Pin Code",
  //     }),
  //   ],
  // }),
  table.createGroup({
    header: "Date Details",
    columns: [
      table.createDataColumn("date_of_birth", {
        id: "Date of Birth",
        cell: (props) => new Date(props.getValue()).toDateString(),
      }),
      table.createDataColumn("date_of_admission", {
        id: "Date of Admission",
        cell: (props) => new Date(props.getValue()).toDateString(),
      }),
    ],
  }),
];
const BasicTable = () => {
  const [data] = useState([...defaultData]);
  const [columns] = useState([...defaultColumns]);
  const [expanded, setExpanded] = useState({});

  const instance = useTableInstance(table, {
    data,
    columns,
    state: {
      expanded,
    },
    getSubRows: (row) => row.subRows,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });
  return (
    <div>
      <table border={1}>
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {instance.getRowModel().rows.map((row) => (
            <tr key={row.id} className={`depth-${row.depth}`}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.renderCell()}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {instance.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderFooter()}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default BasicTable;
