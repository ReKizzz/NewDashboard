import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column";
import { Search } from "../../../shares/Search";
import { Button } from "primereact/button";
import { auditColumns, paginateOptions } from "../../../constants/config";
import { useCallback, useEffect, useRef, useState } from "react";
import { PaginatorRight } from "../../../shares/PaginatorRight";
import { useDispatch, useSelector } from "react-redux";
import { Paginator } from "primereact/paginator";
import { Status } from "../../../shares/Status";
import { paths } from "../../../constants/paths";
import { datetime } from "../../../helpers/datetime";
import { setDateFilter, setStatusFilter } from "../../../shares/shareSlice";
import moment from "moment";
import { FilterByDate } from "../../../shares/FilterByDate";
import { Card } from "primereact/card";
import { NavigateId } from "../../../shares/NavigateId";
import { discountService } from "../discountService";
import { discountPayload } from "../discountPayload";
import { setPaginate } from "../discountSlice";
import { Checkbox } from "primereact/checkbox";
import { FilterByStatus } from "../../../shares/FilterByStatus";
import { endpoints } from "../../../constants/endpoints";
import { getRequest } from "../../../helpers/api";

export const DiscountTableView = () => {

    const dispatch = useDispatch();
    const { discounts, paginateParams } = useSelector(state => state.discount);
    const { translate } = useSelector(state => state.setting);

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);
    const columns = useRef(discountPayload.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));
    const first = useRef(0);
    const total = useRef(0);
    const discountStatus = useRef(['ALL']);

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
    const onSearchChange = (event) => {
        dispatch(
            setPaginate({
                ...paginateParams,
                search: event,
            })
        );
    };

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

    const onFilterByDate = (e) => {
        let updatePaginateParams = { ...paginateParams };

        if (e.startDate === "" || e.endDate === "") {
            delete updatePaginateParams.start_date;
            delete updatePaginateParams.end_date;
        } else {
            updatePaginateParams.start_date = moment(e.startDate).format("yy-MM-DD");
            updatePaginateParams.end_date = moment(e.endDate).format("yy-MM-DD");
        }

        dispatch(setDateFilter(e));
        dispatch(setPaginate(updatePaginateParams));
    };

    /**
    * On Change Filter
    * @param {*} e
    */
    const onFilter = (e) => {
        let updatePaginateParams = { ...paginateParams };

        if (e === "ALL") {
            updatePaginateParams.filter = "";
            updatePaginateParams.value = "";
        } else {
            updatePaginateParams.filter = "status";
            updatePaginateParams.value = e;
        }

        dispatch(setPaginate(updatePaginateParams));
        dispatch(setStatusFilter(e));
    };

    /**
     * Loading Data
     */
    const loadingData = useCallback(async () => {
        setLoading(true);
        const response = await discountService.index(dispatch, paginateParams);
        if (response.status === 200) {
            total.current = response.data.total ? response.data.total : response.data.length;
        }
        setLoading(false);
    }, [dispatch, paginateParams]);

    useEffect(() => {
        loadingData();
    }, [loadingData]);

    /**
* loading User Status
*/
    const loadingStatus = useCallback(async () => {
        const status = await getRequest(
            `${endpoints.status}?type=member_discount`
        );

        if (status.status === 200) {
            discountStatus.current = discountStatus.current.concat(
                status.data.member_discount
            );
        }
    }, []);

    useEffect(() => {
        loadingStatus();
    }, [loadingStatus]);

    const FooterRender = () => {
        return (
            <div className=' flex items-center justify-content-between'>
                <div>{translate.total} - <span style={{ color: "#4338CA" }}>{total.current > 0 ? total.current : 0}</span></div>
                <div className=' flex align-items-center gap-3'>
                    <Button
                        outlined
                        icon="pi pi-refresh"
                        size="small"
                        onClick={() => {
                            dispatch(setPaginate(discountPayload.paginateParams));
                            dispatch(setDateFilter({ startDate: "", endDate: "" }));
                        }}
                    />
                    <PaginatorRight
                        show={showAuditColumn}
                        onHandler={(e) => setShowAuditColumn(e)}
                        label={translate.audit_columns}
                    />
                </div>
            </div>
        )
    }

    /**
    * Table Header Render
    */
    const HeaderRender = () => {
        return (
            <div className="w-full flex flex-column md:flex-row justify-content-between md:justify-content-start align-items-start md:align-items-center gap-3">
                <Search
                    tooltipLabel={discountPayload.paginateParams.columns}
                    placeholder={translate.search}
                    onSearch={(e) => onSearchChange(e)}
                    label={translate.press_enter_key_to_search}
                />

                <FilterByStatus
                    status={discountStatus.current}
                    onFilter={(e) => onFilter(e)}
                    label={translate.filter_by}
                />

                <FilterByDate
                    onFilter={(e) => onFilterByDate(e)}
                    label={translate.filter_by}
                />
            </div>
        )
    }

    return (
        <Card
            title={translate.discount_list}
        >
            <DataTable
                dataKey="id"
                size="normal"
                value={discounts}
                sortField={paginateParams.order}
                sortOrder={paginateParams.sort === 'DESC' ? 1 : paginateParams.sort === 'ASC' ? -1 : 0}
                onSort={onSort}
                loading={loading}
                emptyMessage="No discount found."
                globalFilterFields={discountPayload.columns}
                sortMode={paginateOptions.sortMode}
                header={<HeaderRender />}
                footer={<FooterRender />}
            >
                {showColumns.current.map((col, index) => {
                    return (
                        <Column
                            key={`discount_index_${index}`}
                            style={{ minWidth: `${col.with}px` }}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(value) => {

                                switch (col.field) {
                                    case "label":
                                        return (
                                            <NavigateId
                                                url={`${paths.discount}/${value.id}`}
                                                value={value[col.field]}
                                            />
                                        );
                                    case "discount_percentage":
                                        return <span> {value[col.field] ? value[col.field] : 0} % </span>
                                    case "is_expend_limit":
                                        return <Checkbox checked={value[col.field]} />
                                    case "is_fix_amount":
                                        return <Checkbox checked={value[col.field]} />
                                    case "discount_fix_amount":
                                        return <span> {Number(value[col.field]).toLocaleString()} Ks </span>
                                    case "expend_limit":
                                        return <span> {Number(value[col.field]).toLocaleString()} Ks </span>
                                    case "start_date":

                                        return value[col.field] === null ? <span>Not choose</span> : moment(value[col.field]).format('yy-MM-DD')
                                    case "end_date":
                                        return value[col.field] === null ? <span>Not choose</span> : moment(value[col.field]).format('yy-MM-DD')

                                    case "status":
                                        return <Status status={value[col.field]} />;
                                    default:
                                        return value[col.field];
                                }
                            }}
                        />
                    )
                })}

                {showAuditColumn && auditColumns.map((col, index) => {
                    return (
                        <Column
                            key={`audit_column_key_${index}`}
                            style={{ minWidth: "250px" }}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(value) => <label> {datetime.long(value[col.field])} </label>}
                        />
                    )
                })}
            </DataTable>
            <Paginator
                first={first.current}
                rows={paginateParams.per_page}
                totalRecords={total.current}
                rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
                template={"FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"}
                currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
                onPageChange={onPageChange}
            />
        </Card>
    )
}