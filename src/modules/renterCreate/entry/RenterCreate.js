import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { renterPayload } from '../renterPayload';
import { renterService } from '../renterService';
import { Card } from 'primereact/card';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { InputText } from 'primereact/inputtext';
import { payloadHandler } from '../../../helpers/handler';
import { tooltipOptions } from '../../../constants/config';
import { paths } from '../../../constants/paths';
import { formBuilder } from '../../../helpers/formBuilder';

const RenterCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(renterPayload.create);
    const { translate } = useSelector(state => state.setting);
    

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const submitCreateOwner = async () => {
        setLoading(true);
        
        const formData = formBuilder(payload, renterPayload.create);
        const result = await renterService.store(formData, dispatch);

        if (result.status === 200) {
            setPayload(renterPayload.create)
        }

        setLoading(false);
    }

    return (
        <div className='col-4'>
            <Card>
                <div className=" py-3">
                            <label htmlFor="email" className='input-label text-black'>{translate.renter} <span>(required*)</span> </label>
                            <div className="p-inputgroup mt-2">
                            <InputText 
                                id="owner-acc"
                                name="renter"
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
                            <ValidationMessage field="renter" />
                        </div>
                        <button className='ownerCreateButton' onClick={submitCreateOwner} disabled={loading}>
                            {loading ? "Submitting..." : translate.create}
                        </button>

            </Card>
        </div>
    )
}

export default RenterCreate