

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auditColumns, paginateOptions } from '../../../constants/config';
import { Search } from '../../../shares/Search';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { PaginatorRight } from '../../../shares/PaginatorRight';
import { Column } from 'primereact/column';
import { datetime } from '../../../helpers/datetime';
import { paths } from '../../../constants/paths';
import { Paginator } from 'primereact/paginator';
import { authorizationPayload } from '../authorizationPayload';
import { authorizationService } from '../authorizatonService';
import { setRolePaginate } from '../authorizationSlice';
import { FilterByDate } from '../../../shares/FilterByDate';
import moment from 'moment';
import { setDateFilter, setStatusFilter } from '../../../shares/shareSlice';
import { Card } from 'primereact/card';
import { NavigateId } from '../../../shares/NavigateId';

export const RoleTableView = () => {

    const dispatch = useDispatch();
    const { roles, rolePaginateParams } = useSelector(state => state.auth);
    const { translate } = useSelector(state => state.setting);

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const first = useRef(0);
    const total = useRef(0);
    const columns = useRef(authorizationPayload.roleColumns);
    const showColumns = useRef(columns?.current?.filter(col => col.show === true));


    /**
     * Event - Paginate Page Change
     * @param {*} event 
     */
    const onPageChange = (event) => {
        first.current = event.page * rolePaginateParams.per_page;
        dispatch(
            setRolePaginate({
                ...rolePaginateParams,
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
            setRolePaginate({
                ...rolePaginateParams,
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
            setRolePaginate({
                ...rolePaginateParams,
                sort: sortOrder,
                order: event.sortField
            })
        );
    }

    const onFilterByDate = (e) => {
        let updatePaginateParams = { ...rolePaginateParams };

        updatePaginateParams.start_date = moment(e.startDate).format('yy-MM-DD');
        updatePaginateParams.end_date = moment(e.endDate).format('yy-MM-DD');

        dispatch(setDateFilter(e));
        dispatch(setRolePaginate(updatePaginateParams));
    };

    /**
     *  Loading Data
     */
    const loadingData = useCallback(async () => {
        setLoading(true);
        const result = await authorizationService.roleIndex(dispatch, rolePaginateParams);
        if (result.status === 200) {
            total.current = result?.data?.total ? result.data.total : result.data.length;
        }

        setLoading(false);
    }, [dispatch, rolePaginateParams]);

    useEffect(() => {
        loadingData();
    }, [loadingData])

    /**
     * Table footer Rnder
     * **/
    const FooterRender = () => {
        return (
            <div className=' flex items-center justify-content-between'>
                <div>{translate.total} - <span style={{ color: "#4338CA" }}>{total ? total.current : 0}</span></div>
                <div className=' flex align-items-center gap-3'>
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
                    tooltipLabel={"search role by id, name, description"}
                    placeholder={"Search role"}
                    onSearch={(e) => onSearchChange(e)}
                    label={translate.press_enter_key_to_search}
                />

                {/* <FilterByDate onFilter={(e) => onFilterByDate(e)} label={translate.filter_by} /> */}

            </div>
        )
    }


    return (
        <Card
            title={translate.role_list}
        >

            <DataTable
                dataKey="id"
                size="normal"
                value={roles}
                sortField={rolePaginateParams.order}
                sortOrder={rolePaginateParams.sort === 'DESC' ? 1 : rolePaginateParams.sort === 'ASC' ? -1 : 0}
                onSort={onSort}
                sortMode={paginateOptions.sortMode}
                loading={loading}
                emptyMessage="No role found."
                globalFilterFields={authorizationPayload.roleColumns}
                header={<HeaderRender />}
                footer={<FooterRender />}
            >
                {showColumns && showColumns.current?.map((col, index) => {
                    return (
                        <Column
                            key={`role_col_index_${index}`}
                            style={{ minWidth: "250px" }}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(value) => {

                                switch (col.field) {
                                    case "name":
                                      return (
                                        <NavigateId
                                          url={`${paths.role}/${value.id}`}
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

                {showAuditColumn && auditColumns?.map((col, index) => {
                    return (
                        <Column
                            key={`audit_column_key_${index}`}
                            style={{ minWidth: "250px" }}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(value) => {
                                if (col.field === 'created_at' || col.field === 'updated_at' || col.field === 'deleted_at') {
                                    return <label> {datetime.long(value[col.field])} </label>
                                } 
                                else if (col.field === 'created_by' || col.field === 'updated_by'){
                                    return <label>{value[col.field]}</label>
                                } 
                                else {
                                    return <label> {value[col.field] && value[col.field].name} </label>
                                }
                            }}
                        />
                    )
                })}
            </DataTable>
            <Paginator
                first={first.current}
                rows={rolePaginateParams.per_page}
                totalRecords={total?.current}
                rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
                template={"FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"}
                currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
                onPageChange={onPageChange}
            />
        </Card>
    )
}