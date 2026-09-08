'use client'

import React from 'react'
import LargeRectangle from "../Assets/Rectangle Large.png"
import MediumRectangle from "../Assets/Rectangle Medium.png"
import SmallRectangle from "../Assets/Rectangle Small.png"
import LeftButton from "../Assets/button-icon-left.png"
import RightButton from "../Assets/button-icon-right.png"
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
            <div className="select__grid">
                <a href="/summary" className='demographics__button--wrapper'>
                    <button className='select__button demographics__button'><p className='button__text'>DEMOGRAPHICS</p></button>
                </a>
                <button className='select__button skin-type__button'><p className='button__text'>SKIN TYPE <br/> DETAILS</p></button>
                <button className='select__button cosmetic__button'><p className='button__text'>COSMETIC <br/> CONCERNS</p></button>
                <button className="select__button weather__button"><p className='button__text'>WEATHER</p></button>
            </div>
            <Image src={LargeRectangle} alt='large rectangle' className='large__rectangle--select'></Image>
            <Image src={MediumRectangle} alt='medium rectangle' className='medium__rectangle--select'></Image>
            <Image src={SmallRectangle} alt='small rectangle' className='small__rectangle--select'></Image>
        </div>
        <a className="back__button" href="/results">
            <Image src={LeftButton} alt='back button'></Image>
            <span>BACK</span>
        </a>
        <a className="proceed__button" href="/summary">
          <span>GET SUMMARY</span>
          <Image src={RightButton} alt='proceed button'></Image>
        </a>
    </div>
  )
}
