'use client'

import React from 'react'
import LargeRectangle from "../Assets/Rectangle Large.png"
import MediumRectangle from "../Assets/Rectangle Medium.png"
import SmallRectangle from "../Assets/Rectangle Small.png"
import LeftButton from "../Assets/button-icon-left.png"
import Image from 'next/image'

export default function Select() {

  return (
    <div className='select__container'>
        <div className="progress__container">
            <h1 className="progress__title">A.I. ANALYSIS</h1>
            <p className='progress__text--select'>
                A.I HAS ESTIMATED THE FOLLOWING.
                <br/>
                FIX ESTIMATED INFORMATION IF NEEDED.
            </p>
        </div>
        <div className="select__row">
            <Image src={LargeRectangle} alt='large rectangle' className='large__rectangle--select'></Image>
            <Image src={MediumRectangle} alt='medium rectangle' className='medium__rectangle--select'></Image>
            <Image src={SmallRectangle} alt='small rectangle' className='small__rectangle--select'></Image>
        </div>
    </div>
  )
}
