import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ownerAccPayload } from '../ownerAccPayload';
import { ownerAccService } from '../ownerAccService';
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { Card } from 'primereact/card';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { InputText } from 'primereact/inputtext';
import { payloadHandler } from '../../../helpers/handler';
import { tooltipOptions } from '../../../constants/config';
import { Button } from 'primereact/button';
import { paths } from '../../../constants/paths';
import { Dropdown } from 'primereact/dropdown';
import { Loading } from '../../../shares/Loading';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';
import { formBuilder } from '../../../helpers/formBuilder';
import { FormMainAction } from "../../../shares/FormMainAction";


const OwnerAccCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(ownerAccPayload.create);
    const [appType, setAppType] = useState([]);
    const { translate } = useSelector(state => state.setting);
    

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const submitCreateOwner = async () => {
        setLoading(true);
        
        const formData = formBuilder(payload, ownerAccPayload.create);
        const result = await ownerAccService.store(formData, dispatch);

        if (result.status === 200) {
            navigate(`${paths.ownerAcc}/${result.data.id}`);
        }

        setLoading(false);
    }

    return (
        <div className='col-4'>
            <Card>
                <div className=" py-3">
                            <label htmlFor="email" className='input-label text-black'>{translate.owner} <span>(required*)</span> </label>
                            <div className="p-inputgroup mt-2">
                            <InputText 
                                id="owner-acc"
                                name="ownerAcc"
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
                            <ValidationMessage field="ownerAcc" />
                        </div>
                        <button className='ownerCreateButton' onClick={submitCreateOwner} disabled={loading}>
                            {loading ? "Submitting..." : translate.create}
                        </button>

            </Card>
        </div>
    )
}

export default OwnerAccCreate