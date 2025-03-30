import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { wardPayload } from '../wardPayload';
import { wardService } from '../wardService';
import { Card } from 'primereact/card';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { InputText } from 'primereact/inputtext';
import { payloadHandler } from '../../../helpers/handler';
import { tooltipOptions } from '../../../constants/config';
import { paths } from '../../../constants/paths';
import { formBuilder } from '../../../helpers/formBuilder';

const WardCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(wardPayload.create);
    const { translate } = useSelector(state => state.setting);
    

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const submitCreateOwner = async () => {
        setLoading(true);
        
        const formData = formBuilder(payload, wardPayload.create);
        const result = await wardService.store(formData, dispatch);

        if (result.status === 200) {
            setPayload(wardPayload.create)
        }

        setLoading(false);
    }

    return (
        <div className='col-4'>
            <Card>
                <div className=" py-3">
                            <label htmlFor="email" className='input-label text-black'>{translate.ward} <span>(required*)</span> </label>
                            <div className="p-inputgroup mt-2">
                            <InputText 
                                id="owner-acc"
                                name="ward"
                                autoComplete="off"
                                className="p-inputtext-sm"
                                keyfilter="alpha"
                                aria-describedby="owner-acc-help"
                                placeholder="Enter your owner acc"
                                value={payload.name}
                                tooltipOptions={{...tooltipOptions}}
                                disabled={loading}
                                onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                setPayload(updateValue);
                                })}
                            />

                            </div>
                            <ValidationMessage field="ward" />
                        </div>
                        <button className='ownerCreateButton' onClick={submitCreateOwner} disabled={loading}>
                            {loading ? "Submitting..." : translate.create}
                        </button>

            </Card>
        </div>
    )
}

export default WardCreate