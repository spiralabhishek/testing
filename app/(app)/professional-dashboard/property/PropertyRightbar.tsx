'use client'

import React from 'react'
import Select from 'react-select'
const PropertyRightbar = () => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <div>
            <div className="flex items-center gap-5">
                <div className="rounded-2xl flex justify-end items-end">
                    <Select options={options} placeholder="סוכן" />
                </div>
                <div className="rounded-2xl flex justify-end items-end">
                    <Select options={options} placeholder="חדרים" />
                </div>
                <div className="rounded-2xl flex justify-end items-end">
                    <Select options={options} placeholder="סוג נכס" />
                </div>
                <div className="rounded-2xl flex justify-end items-end">
                    <Select options={options} placeholder="סטטוס" />
                </div>
            </div>
        </div>
    )
}

export default PropertyRightbar
