import React from 'react'
import Image from "next/image"
import LargeRectangle from "../Assets/Rectangle Large.png"
import MediumRectangle from "../Assets/Rectangle Medium.png"
import SmallRectangle from "../Assets/Rectangle Small.png"
import LeftButton from "../Assets/button-icon-left.png"
import CameraIcon from "../Assets/camera-icon.png"
import GalleryIcon from "../Assets/gallery-icon.png"
import ScanLine from "../Assets/Downward-line.png"

export default function Results() {
  return (
    <div className='results__container'>
        <div className="progress__container">
        <p className="progress__text">TO START ANALYSIS</p>
      </div>
      <div className="results__row">
        <div className="camera__wrapper">
            <div className="camera">
                <Image src={CameraIcon} alt="camera icon" className='camera__icon'></Image>
                <div className="camera__text">
                    <Image src={ScanLine} alt='upward line' className='upward__line'></Image>
                    <p>ALLOW A.I<br/>TO SCAN YOUR FACE</p>
                </div>
            </div>
            <Image src={LargeRectangle} alt='large rectangle' className='large__rectangle--results'></Image>
            <Image src={MediumRectangle} alt='medium rectangle' className='medium__rectangle--results'></Image>
            <Image src={SmallRectangle} alt='small rectangle' className='small__rectangle--results'></Image>
            
       </div>
        <div className="gallery__wrapper">
            <div className="gallery">
                <Image src={GalleryIcon} alt="gallery icon" className='gallery__icon'></Image>
                <div className="gallery__text">
                    <p>ALLOW A.I<br/>ACCESS GALLERY</p>
                    <Image src={ScanLine} alt='downward line' className='downward__line'></Image>
                </div>
            </div>
            <Image src={LargeRectangle} alt='large rectangle' className='large__rectangle--results'></Image>
            <Image src={MediumRectangle} alt='medium rectangle' className='medium__rectangle--results'></Image>
            <Image src={SmallRectangle} alt='small rectangle' className='small__rectangle--results'></Image>
        </div>
      </div>
      <a className="back__button" href="/">
        <Image src={LeftButton} alt='back button'></Image>
        <span>BACK</span>
      </a>
    </div>
  )
}
