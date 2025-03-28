import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { OwnerTableView } from '../list/OwnerTableView'

export const OwnerList = () => {
    return (
        <div className=' grid'>

            <div className=' col-12'>
                <BreadCrumb />
            </div>

            <div className=' col-12'>
                <OwnerTableView />
            </div>

        </div>
    )
}
