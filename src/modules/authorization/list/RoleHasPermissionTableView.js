import { Checkbox } from 'primereact/checkbox'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useRef, useState } from 'react'
import { authorizationPayload } from '../authorizationPayload'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { authorizationService } from '../authorizatonService'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'primereact/card'

export const RoleHasPermissionTableView = ({ dataSource, callback }) => {

    const columns = useRef(authorizationPayload.roleHasPermissionColumns);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [checkAll, setCheckAll] = useState(false);
    const [checkList, setCheckList] = useState([]);

    const dispatch = useDispatch();
    const { translate } = useSelector(state => state.setting);

    const onPerChange = (e) => {
        let permission = [...checkList];

        if (e.checked) {
            permission.push(e.value);
        }
        else
            permission = permission.filter(per => per !== e.value);

        setCheckList(permission);
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
    };

    const submitRoleRemovePermission = async () => {
        setLoading(true);

        const payload = {
            permissions: checkList
        }
        const res = await authorizationService.rolePermissionRemove(dispatch, dataSource?.id, payload);
        if (res.status === 200) {
            callback()
        }
        setLoading(false);
    }

    useEffect(() => {
        if (!globalFilterValue) {
            setFilters(dataSource?.role?.permissions);
            return;
        }

        const result = filters?.filter((per) =>
            per.name.toLowerCase().includes(globalFilterValue.toLowerCase())
        );
        setFilters(result);

    }, [globalFilterValue, filters, dataSource?.role?.permissions])

    useEffect(() => {
        if (checkAll === true) {
            const result = filters?.map((per) => per.id)
            setCheckList(result)
        }
    }, [checkAll,filters])

    useEffect(() => {
        if (dataSource) {
            setFilters(dataSource?.role?.permissions)
        }
    }, [dataSource]);

    const RenderFooter = () => {
        const isDisable = checkList?.length > 0 ? false : true;

        return (
            <div className=' flex align-items-center justify-content-end'>
                <Button
                    type='submit'
                    label={translate.remove_permission}
                    disabled={isDisable}
                    severity='danger'
                    onClick={submitRoleRemovePermission}
                    outlined
                />
            </div>
        )
    }

    return (
        <div></div>
    )
}
