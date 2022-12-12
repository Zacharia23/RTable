import React, {useMemo, Fragment} from "react";
import {useTable, useExpanded, usePagination, useSortBy} from "react-table";
import {
    Pagination,
    PagincationButtonContainer,
    PaginationButton,
    PaginationIndex,
    RightIconSpan,
    LeftIconSpan,
    NextButtonIcon,
    BackButtonIcon,
} from "./index.style";


const TableComponent = ({columns, data, fetchData, pageCount: controlledPageCount, loading, isPaginated = true, ...props}) => {
    const defaultColumn = useMemo(() => ({
        minWidth: 20, maxWidth: 115,
    }), [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setHiddenColumns,
        state: {pageIndex, pageSize}
    } = useTable({
        columns, data, defaultColumn, initialState: {
            pageIndex: 0, pageSize: 15, hiddenColumns: columns.filter((column) => !column.show).map((column) => column.id)
        }, manualPagination: true, manualSortBy: true, autoResetPage: false, pageCount: controlledPageCount
    }, useSortBy, useExpanded, usePagination)

    React.useEffect(() => {
        fetchData && fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])

    return (
        <Fragment>
            {
                loading ? (
                    <div className="flex items-center font-medium text-sm text-gray-400">
                        Loading, please wait...
                    </div>
                ) : (
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-md">
                        <table {...getTableProps()} className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            {headerGroups.map((headerGroup) => (
                                <tr key="" {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th key=""
                                            scope="col"
                                            className="whitespace-nowrap py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                            {...column.getHeaderProps()}
                                        >
                                            {column.render("Header")}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                            </thead>

                            <tbody {...getTableBodyProps()} className="divide-y divide-gray-200 bg-white">
                                {page.map((row, i) => {
                                        prepareRow(row)
                                    return (
                                       <tr key={""} {...row.getRowProps()}>
                                           {row.cells.map((cell) => {
                                                return (
                                                    <td
                                                        key={""} {...cell.getCellProps()}
                                                        className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"
                                                    >
                                                        {cell.render("Cell")}
                                                    </td>
                                                )
                                           })}
                                       </tr>
                                    )
                                    })}
                            </tbody>
                        </table>
                        {Boolean(isPaginated) && (
                            <nav className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6" aria-label="Pagination">
                                <div className="hidden sm:block">
                                    <p className="text-sm text-gray-700">
                                        showing {pageIndex + 1} of {pageOptions.length}
                                    </p>
                                </div>{" "}
                                <div className="flex flex-1 justify-between sm:justify-end">
                                    {canPreviousPage ? (
                                        <a
                                            onClick={() => previousPage()}
                                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                                        >
                                            Previous
                                        </a>
                                    ) : null }
                                    {canNextPage ? (
                                        <a
                                            onClick={() => nextPage()}
                                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                                        >
                                            Next
                                        </a>
                                    ) : null }
                                </div>
                            </nav>
                        )}
                    </div>
                )
            }
        </Fragment>
    )
}

export default TableComponent