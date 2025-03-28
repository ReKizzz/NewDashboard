import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { OwnerUpdate } from '../entry/OwnerUpdate';

const OwnerDetail = () => {

  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className='col-12'>
            <OwnerUpdate />
        </div>

    </div>
  )
}

export default OwnerDetail