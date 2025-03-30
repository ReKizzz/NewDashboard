import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { tooltipOptions } from '../../../constants/config';
import { paths } from '../../../constants/paths';
import { payloadHandler } from '../../../helpers/handler';
import { Loading } from '../../../shares/Loading';
import { FormMainAction } from '../../../shares/FormMainAction';
import { Calendar } from 'primereact/calendar';
import moment from 'moment';
import { Dropdown } from 'primereact/dropdown';
import { ownerPayload } from '../ownerPayload';
import { userService } from '../../user/userService';
import { ownerService } from '../ownerService';
// import { ownerCardService } from '../../ownerCard/ownerCardService';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';
import { AppEditor } from '../../../shares/AppEditor';

export const OwnerUpdate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(ownerPayload.create);
    const [userList, setUserList] = useState([]);
    const [ownerList, setOwnerList] = useState([]);
    const [ownerStatus, setownerStatus] = useState([]);
    const [desc, setDesc] = useState();

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { translate } = useSelector(state => state.setting);
    const { owner } = useSelector(state => state.owner);

    /**
    * Loading user Data
    */
    const loadingUserData = useCallback(async () => {
        setLoading(true);

        const response = await getRequest(`${endpoints.status}?type=owner`);
        if (response.status === 200) {
            setownerStatus(response.data.owner);
        };

        const result = await userService.index(dispatch);
        if (result.status === 200) {
            await ownerService.show(dispatch, params.id)
            const formatData = result.data?.map((user) => {
                return {
                    label: user?.name,
                    value: user?.id
                }
            })
            setUserList(formatData);
        }

        setLoading(false);
    }, [dispatch,params.id]);

    useEffect(() => {
        loadingUserData()
    }, [loadingUserData])

    useEffect(() => {
        if (owner) {
            setPayload(owner)
        }
    }, [owner])

    /**
    * Loading user Data
    */
    const loadingownerCardData = useCallback(async () => {
        setLoading(true);

        // const result = await ownerCardService.index(dispatch);
        // if (result.status === 200) {
        //     const formatData = result.data?.map((region) => {
        //         return {
        //             label: region?.label,
        //             value: region?.id
        //         }
        //     })
        //     setOwnerList(formatData);
        // }

        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadingownerCardData()
    }, [loadingownerCardData])


    const submitOwnerUpdate = async () => {
        setLoading(true);

        let updatePayload = {...payload};
        updatePayload.expired_at = moment(updatePayload.expired_at).format("yy-MM-DD")
        updatePayload.description = desc;

        await ownerService.update(dispatch,params.id,updatePayload);
        setLoading(false);
    }

    return (
        <>

            <div className=' grid'>

                <div className=' col-12'>
                    <Card
                        title={translate.owner_update}

                    >

                        <Loading loading={loading} />

                        <div className=' grid'>

                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <label htmlFor="user" className='input-label text-black'>{translate.user} </label>
                                <div className="p-inputgroup mt-2">
                                    <Dropdown
                                        inputId='user'
                                        autoComplete='user name'
                                        name='user'
                                        filter
                                        value={payload.user_id ? payload.user_id : ''}
                                        onChange={(e) => payloadHandler(payload, e.value, 'user_id', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                        options={userList}
                                        placeholder="Select a user"
                                        disabled={loading}
                                        className="p-inputtext-sm"
                                    />
                                </div>
                                <ValidationMessage field="user_id" />
                            </div>

                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <label htmlFor="owner_card" className='input-label text-black'>{translate.owner_card} </label>
                                <div className="p-inputgroup mt-2">
                                    <Dropdown
                                        inputId='owner_card'
                                        autoComplete='owner card'
                                        name='owner card'
                                        filter
                                        value={payload.ownercard_id ? payload.ownercard_id : ''}
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
                                    <label htmlFor="amount" className=' text-black'>{translate.amount} </label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="amount"
                                        name="amount"
                                        autoComplete='amont'
                                        aria-describedby="amount help"
                                        tooltip='owner id label'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter amount'
                                        value={payload.amount}
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'amount', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"amount"} />
                                </div>
                            </div>

                            <div className=" col-12 md:col-6 lg:col-4 py-3 ">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="expired_at" className=" text-black">
                                        {translate.expired_at}
                                    </label>
                                    <Calendar
                                        name='expired_at'
                                        className="p-inputtext-sm sm:w-full mt-3 md:mt-0"
                                        placeholder="Select expired at"
                                        selectionMode={"single"}
                                        value={payload.expired_at ? new Date(payload.expired_at) : ''}
                                        onChange={(e) =>
                                            payloadHandler(
                                                payload,
                                                e.target.value,
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

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="owner_id" className=' text-black'>{translate.owner_id}</label>
                                    <InputText
                                        name='owner_id'
                                        className="p-inputtext-sm"
                                        placeholder="Select a owner id"
                                        tooltip='owner id'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        disabled={loading}
                                        value={payload.owner_id ? payload.owner_id : ''}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'owner_id', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />

                                    <ValidationMessage field={"owner_id"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="status" className=' text-black'>{translate.status}</label>
                                    <Dropdown
                                        inputId='status'
                                        name='status'
                                        className="p-inputtext-sm"
                                        options={ownerStatus}
                                        placeholder="Select a owner status"
                                        disabled={loading}
                                        value={payload.status ? payload.status : ''}
                                        onChange={(e) => payloadHandler(payload, e.value, 'status', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />

                                    <ValidationMessage field={"status"} />
                                </div>
                            </div>

                            <div className=" col-12 py-3">
                                <div className="flex flex-column gap-2">
                                    <span className=" text-black">{translate.description} </span>
                                    <AppEditor value={payload.description ? payload.description : ''} onChange={(e) => setDesc(e)} />
                                    <ValidationMessage field={"description"} />
                                </div>
                            </div>

                            <FormMainAction
                                cancel={translate.cancel}
                                onCancel={() => navigate(paths.owner)}
                                submit={translate.update}
                                onSubmit={submitOwnerUpdate}
                                loading={loading}
                            />

                        </div>

                    </Card>
                </div>
            </div>

        </>
    )
}
