import React, { useCallback, useEffect, useState } from 'react'
import { renterPayload } from '../renterPayload';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { tooltipOptions } from '../../../constants/config';
import { payloadHandler } from '../../../helpers/handler';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { Button } from 'primereact/button';
import { paths } from '../../../constants/paths';
import { renterService } from '../renterService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../../../shares/Loading';
import { formBuilder } from '../../../helpers/formBuilder';

const RenterUpdate = () => {

    const { translate } = useSelector((state) => state.setting);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(renterPayload.update);
    const { owner } = useSelector((state) => state.owner);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadingData = useCallback(async () => {
        setLoading(true);
        await renterService.show(dispatch, params.id);
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

    const submitUpdaterenter = async () => {
        setLoading(true);
        const formData = formBuilder(payload, renterPayload.update);
        await renterService.update(dispatch, payload?.id, formData);
        setLoading(false);
    }

    return (
        <Card
            title={translate.renter_update}
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
                            tooltip='renter name'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter renter name'
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
                            onClick={() => navigate(paths.renterCreate)}
                        />

                        <Button
                            className="mx-2"
                            label="UPDATE"
                            severity="danger"
                            size='small'
                            disabled={loading}
                            onClick={() => submitUpdaterenter()}
                        />
                    </div>
                </div>

            </div>
        </Card>
    )
}

export default RenterUpdate;