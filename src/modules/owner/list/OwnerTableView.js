import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column";
import { paginateOptions } from "../../../constants/config";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paginator } from "primereact/paginator";
import { paths } from "../../../constants/paths";
import { Card } from "primereact/card";
import { NavigateId } from "../../../shares/NavigateId";
import { ownerPayload } from "../ownerPayload";
import { setPaginate } from "../ownerSlice";
import { ownerService } from "../ownerService";

export const OwnerTableView = () => {

    const dispatch = useDispatch();
    const { owners, paginateParams } = useSelector(state => state.owner);
    const { translate } = useSelector(state => state.setting);

    const [loading, setLoading] = useState(false);
    // const [showAuditColumn, setShowAuditColumn] = useState(false);
    const columns = useRef(ownerPayload.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));
    const first = useRef(0);
    const total = useRef(0);
    // const ownerStatus = useRef(['ALL']);

    /**
     * Event - Paginate Page Change
     * @param {*} event 
     */
    const onPageChange = (event) => {
        first.current = event.page * paginateParams.per_page;
        dispatch(
            setPaginate({
                ...paginateParams,
                page: event?.page + 1,
                per_page: event?.rows,
            })
        );
    };

    /**
     * Event - Search
     * @param {*} event 
     */
    // const onSearchChange = (event) => {
    //     dispatch(
    //         setPaginate({
    //             ...paginateParams,
    //             search: event,
    //         })
    //     );
    // };

    /**
 * Event - Column sorting "DESC | ASC"
 * @param {*} event 
 */
    const onSort = (event) => {
        const sortOrder = event.sortOrder === 1 ? "DESC" : "ASC";
        dispatch(
            setPaginate({
                ...paginateParams,
                sort: sortOrder,
                order: event.sortField
            })
        );
    }

    /**
     * Loading Data
     */
    const loadingData = useCallback(async () => {
        setLoading(true);
        const response = await ownerService.index(dispatch, paginateParams);
        if (response.status === 200) {
            total.current = response.data.total ? response.data.total : response.data.length;
        }
        setLoading(false);
    }, [dispatch, paginateParams]);

    useEffect(() => {
        loadingData();
    }, [loadingData]);

    return (
        <Card
            title={translate.owner_list}
        >
            <DataTable
    className="custom-data-table"
    dataKey="id"
    size="normal"
    value={owners}
    sortField={paginateParams.order}
    sortOrder={paginateParams.sort === 'DESC' ? 1 : paginateParams.sort === 'ASC' ? -1 : 0}
    onSort={onSort}
    loading={loading}
    emptyMessage="No Records."
    globalFilterFields={ownerPayload.columns}
    sortMode={paginateOptions.sortMode}
>

                            {showColumns.current.map((col, index) => {
                                return (
                                    <Column
                                        key={`owner_index_${index}`}
                                        style={{ minWidth: `${col.width}px` }}
                                        field={col.field}
                                        header={col.header}
                                        sortable
                                        body={(value, {rowIndex}) => {
                                            switch (col.field) {
                                                case "index":
                                                    return rowIndex + 1;
                                                case "owner_id":
                                                    return (
                                                        <NavigateId
                                                            url={`${paths.ownerDetail}/${value['id']}`}
                                                            value={value[col.field]}
                                                        />
                                                    );
                                                default:
                                                    return value[col.field];
                                            }
                                        }}
                                    />
                                )
                            })}
                        </DataTable>
            

            <Paginator
                first={first.current}
                rows={paginateParams.per_page}
                totalRecords={total?.current ? total.current : 0}
                rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
                template={"FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"}
                currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
                onPageChange={onPageChange}
            />
        </Card>
    )
}