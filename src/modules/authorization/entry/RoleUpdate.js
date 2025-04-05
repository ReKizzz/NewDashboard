import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { authorizationPayload } from '../authorizationPayload';
import { Loading } from '../../../shares/Loading';
import { paths } from '../../../constants/paths';
import { InputText } from 'primereact/inputtext';
import { payloadHandler } from '../../../helpers/handler';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { tooltipOptions } from '../../../constants/config';
import { Card } from 'primereact/card';
import { authorizationService } from '../authorizatonService';
import { MultiSelect } from 'primereact/multiselect';
import { FormMainAction } from '../../../shares/FormMainAction';
import { Checkbox } from 'primereact/checkbox';

export const RoleUpdate = ({ dataSource, callback }) => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(authorizationPayload.updateRole);
    const [isMerchant, setIsMerchant] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { translate } = useSelector(state => state.setting);

    /**
     * update role
     * @returns
     * 
     * **/
    const submitUpdateRole = async () => {
        setLoading(true);
        const mainPayload = {
            name: payload.name,
            description: payload.description
        }

        const response = await authorizationService.roleUpdate(dispatch, dataSource.id, mainPayload);
        callback()
        setLoading(false);
        if (response){
            navigate(paths.role)
        }
    }


    useEffect(() => {
        if (dataSource) {
            setPayload(dataSource?.role)
            setIsMerchant(dataSource?.is_merchant)
        }
    }, [dataSource])

    return (
        <Card
            title={translate.role_update}
        >

            <Loading loading={loading} />

            <div className=' grid'>

                <div className="col-12 md:col-4 lg:col-4 py-3">
                    <label htmlFor="name" className='input-label'>{translate.name}</label>
                    <div className="p-inputgroup mt-2">
                        <InputText
                            id="name"
                            className="p-inputtext-sm"
                            placeholder="Enter role name"
                            value={payload?.name ? payload?.name : ''}
                            aria-describedby="name-help"
                            tooltip="Role name"
                            tooltipOptions={{ ...tooltipOptions }}
                            disabled={loading}
                            autoComplete='Role name'
                            onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                    </div>
                    <ValidationMessage field="name" />
                </div>

                <div className="col-12 md:col-4 lg:col-4 py-3">
                    <label htmlFor="description" className='input-label'>{translate.description}</label>
                    <div className="p-inputgroup mt-2">
                        <InputText
                            id="description"
                            className="p-inputtext-sm"
                            placeholder="Enter role descripiton"
                            value={payload?.description ? payload?.description : ''}
                            aria-describedby="description-help"
                            tooltip="Role description"
                            tooltipOptions={{ ...tooltipOptions }}
                            disabled={loading}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'description', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                    </div>
                    <ValidationMessage field="description" />
                </div>

                <FormMainAction
                    cancel={translate.cancel}
                    onCancel={() => navigate(paths.role)}
                    submit={translate.update}
                    onSubmit={submitUpdateRole}
                    loading={loading}
                />

            </div>

        </Card>
    )
}
