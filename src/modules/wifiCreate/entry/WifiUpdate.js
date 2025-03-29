import React, { useCallback, useEffect, useState } from 'react'
import { wifiPayload } from '../wifiPayload';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { tooltipOptions } from '../../../constants/config';
import { payloadHandler } from '../../../helpers/handler';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { Button } from 'primereact/button';
import { paths } from '../../../constants/paths';
import { wifiService } from '../wifiService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../../../shares/Loading';
import { formBuilder } from '../../../helpers/formBuilder';

const WifiUpdate = () => {

    const { translate } = useSelector((state) => state.setting);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(wifiPayload.update);
    const { owner } = useSelector((state) => state.owner);
    console.log(owner,"acc")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadingData = useCallback(async () => {
            setLoading(true);
            await wifiService.show(dispatch, params.id);
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

    const submitUpdatewifi = async () => {
        setLoading(true);
        const formData = formBuilder(payload, wifiPayload.update);
        await wifiService.update(dispatch, payload?.id, formData);
        setLoading(false);
    }

    return (
        <Card
            title={translate.wifi_update}
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
                            tooltip='wifi name'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter wifi name'
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
                            onClick={() => navigate(paths.wifiCreate)}
                        />

                        <Button
                            className="mx-2"
                            label="UPDATE"
                            severity="danger"
                            size='small'
                            disabled={loading}
                            onClick={() => submitUpdatewifi()}
                        />
                    </div>
                </div>

            </div>
        </Card>
    )
}

export default WifiUpdate;