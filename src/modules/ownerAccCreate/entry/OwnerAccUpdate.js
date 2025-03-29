import React, { useCallback, useEffect, useState } from 'react'
import { ownerAccPayload } from '../ownerAccPayload';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { tooltipOptions } from '../../../constants/config';
import { payloadHandler } from '../../../helpers/handler';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { Button } from 'primereact/button';
import { paths } from '../../../constants/paths';
import { Dropdown } from 'primereact/dropdown';
import { ownerAccService } from '../ownerAccService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { generalStatus } from '../../../helpers/StatusHandler';
import { Loading } from '../../../shares/Loading';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';
import { formBuilder } from '../../../helpers/formBuilder';

const OwnerAccUpdate = () => {

    const { translate } = useSelector((state) => state.setting);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(ownerAccPayload.update);
    const { owner } = useSelector((state) => state.owner);
    console.log(owner,"acc")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadingData = useCallback(async () => {
            setLoading(true);
            await ownerAccService.show(dispatch, params.id);
            setLoading(false);
        }, [params.id, dispatch])
    
        useEffect(() => {
            loadingData()
        }, [loadingData])

    useEffect(() => {
        if (owner) {
            setPayload(owner)
        }
    }, [owner])

    const submitUpdateownerAcc = async () => {
        setLoading(true);
        const formData = formBuilder(payload, ownerAccPayload.update);
        await ownerAccService.update(dispatch, payload?.id, formData);
        setLoading(false);
    }

    return (
        <Card
            title={translate.owner_acc_update}
        >
            <Loading loading={loading} />

            <div className=' grid'>
                <div className=' col-12 md:col-3 lg:col-3 mt-3'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="name" className=' text-black'> Name </label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="name"
                            aria-describedby="title-help"
                            tooltip='ownerAcc name'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter ownerAcc name'
                            disabled={loading}
                            value={payload.name ? payload.name : ""}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"name"} />
                    </div>
                </div>

                <div className="col-12">
                    <div className="flex flex-row justify-content-end align-items-center">
                        <Button
                            className="mx-2"
                            label="CANCEL"
                            severity="secondary"
                            outlined
                            size='small'
                            disabled={loading}
                            onClick={() => navigate(paths.ownerAccCreate)}
                        />

                        <Button
                            className="mx-2"
                            label="UPDATE"
                            severity="danger"
                            size='small'
                            disabled={loading}
                            onClick={() => submitUpdateownerAcc()}
                        />
                    </div>
                </div>

            </div>
        </Card>
    )
}

export default OwnerAccUpdate;