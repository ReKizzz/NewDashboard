import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { tooltipOptions } from '../../../constants/config';
import { paths } from '../../../constants/paths';
import { payloadHandler } from '../../../helpers/handler';
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { Loading } from '../../../shares/Loading';
import { FormMainAction } from '../../../shares/FormMainAction';
import { Calendar } from 'primereact/calendar';
import moment from 'moment';
import { Dropdown } from 'primereact/dropdown';
import { ownerPayload } from '../ownerPayload';
import { ownerService } from '../ownerService';
import { ownerAccService } from '../../ownerAccCreate/ownerAccService';
// import { ownerCardService } from '../../ownerCard/ownerService';
import { AppEditor } from '../../../shares/AppEditor';
import { getRequest } from '../../../helpers/api';

export const OwnerCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(ownerPayload.create);
    const [desc, setDesc] = useState('');
    const [ownerList, setOwnerList] = useState([]);
    const total = useRef(0);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { translate } = useSelector(state => state.setting);

    /**
    * Loading user Data
    */
    const fetchData = useCallback(async () => {
        setLoading(true);
        const response = await ownerAccService.index(dispatch);  // Fetch the data
        if (response.status === 200) {
            // Assuming response.data is an array of owner objects
            setOwnerList(response.data.map(owner => ({
                label: owner.name,  // Adjust to the correct field name for owner name
                value: owner.id,    // Adjust to the correct field name for owner id
            })));
            total.current = response.data.total || response.data.length;
        }
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const submitOwnerCreate = async () => {
        setLoading(true);
        let updatePayload = { ...payload };
        updatePayload.description = desc;

        const result = await ownerService.store(updatePayload, dispatch);
        if(result.data) {
            navigate(`${paths.owner}/${result.data.id}`)
        }
        setLoading(false);
    }

    // console.log(payload);

    return (
        <>

            <div className=' grid'>
                <div className=' col-12'>
                    <BreadCrumb />
                </div>

                <div className=' col-12'>
                    <Card
                        title={translate.owner_create}

                    >

                        <Loading loading={loading} />

                        <div className=' grid'>
                            <h1 className='col-12 flex align-items-center justify-content-center'>Creating Your Owner Account</h1>
                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <label htmlFor="user" className='input-label'>{translate.owner} (required*) </label>
                                <div className="p-inputgroup mt-2">
                                    <Dropdown
                                        inputId='owner'
                                        autoComplete='owner name'
                                        name='owner'
                                        filter
                                        value={payload.owner_id}
                                        onChange={(e) => payloadHandler(payload, e.value, 'owner_id', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                        options={ownerList}
                                        placeholder="Select a owner"
                                        disabled={loading}
                                        className="p-inputtext-sm"
                                    />
                                </div>
                                <ValidationMessage field="user_id" />
                            </div>

                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <label htmlFor="owner_card" className='input-label'>{translate.owner_card} (required*) </label>
                                <div className="p-inputgroup mt-2">
                                    <Dropdown
                                        inputId='owner_card'
                                        autoComplete='owner card'
                                        name='owner card'
                                        filter
                                        value={payload.ownercard_id}
                                        onChange={(e) => payloadHandler(payload, e.value, 'ownercard_id', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                        options={ownerList}
                                        placeholder="Select a owner card"
                                        disabled={loading}
                                        className="p-inputtext-sm"
                                    />
                                </div>
                                <ValidationMessage field="ownercard_id" />
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="owner_id" className=' text-black'>{translate.owner_id} (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="owner_id"
                                        name="owner_id"
                                        autoComplete='name'
                                        aria-describedby="name-help"
                                        tooltip='owner id label'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter owner id'
                                        disabled={loading}
                                        value={payload.owner_id ? payload.owner_id : ''}
                                        onChange={(e) => payloadHandler(payload,e.target.value, 'owner_id', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"owner_id"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="amount" className=' text-black'>{translate.amount} (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="amount"
                                        name="amount"
                                        autoComplete='amont'
                                        aria-describedby="amount help"
                                        tooltip='owner id label'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter amount'
                                        disabled={loading}
                                        value={payload.amount}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'amount', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"amount"} />
                                </div>
                            </div>

                            <div className=" col-12 md:col-6 lg:col-4 py-3">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="expired_at" className=" text-black">
                                        {translate.expired_at}
                                    </label>
                                    <Calendar
                                        name='expired_at'
                                        className="p-inputtext-sm sm:w-full mt-3 md:mt-0"
                                        placeholder="Select expired at"
                                        selectionMode={"single"}
                                        onChange={(e) =>
                                            payloadHandler(
                                                payload,
                                                moment(e.target.value).format("yy-MM-DD"),
                                                "expired_at",
                                                (updateValue) => {
                                                    setPayload(updateValue);
                                                }
                                            )
                                        }
                                    />

                                    <ValidationMessage field={"expired_at"} />
                                </div>
                            </div>

                            <FormMainAction
                                cancel={translate.cancel}
                                onCancel={() => navigate(paths.owner)}
                                submit={translate.submit}
                                onSubmit={submitOwnerCreate}
                                loading={loading}
                            />

                        </div>

                    </Card>
                </div>
            </div>

        </>
    )
}
