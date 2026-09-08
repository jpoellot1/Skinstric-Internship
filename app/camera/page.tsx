'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import LargeRectangle from "../Assets/Rectangle Large.png"
import MediumRectangle from "../Assets/Rectangle Medium.png"
import SmallRectangle from "../Assets/Rectangle Small.png"
import CameraIcon from "../Assets/camera-icon.png"
import Diamond from "../Assets/unselected-icon.png"

export default function Camera() {
    const router = useRouter()

    useEffect(() => {
        const timeout = window.setTimeout(() => router.push('/camera/capture'), 3500)
        return () => window.clearTimeout(timeout)
    }, [router])

  return (
    <div className='camera__container'>
        <div className="camera__row">
            <div className="camera__box">
                <Image src={LargeRectangle} alt='large rectangle' className='large__rectangle--camera'></Image>
                <Image src={MediumRectangle} alt='medium rectangle' className='medium__rectangle--camera'></Image>
                <Image src={SmallRectangle} alt='small rectangle' className='small__rectangle--camera'></Image>
                <Image src={CameraIcon} alt="camera icon" className='camera__icon--pulse'></Image>
                <h3>SETTING UP CAMERA...</h3>
            </div>
            <div className="camera__text--bottom">
                <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
                <div className="bottom__text--wrapper">
                    <div className="bottom__text">
                        <Image src={Diamond} alt="diamond"></Image>
                        <p>NEUTRAL EXPRESSION</p>
                    </div>
                    <div className="bottom__text">
                        <Image src={Diamond} alt="diamond"></Image>
                        <p>FRONTAL POSE</p>
                    </div>
                    <div className="bottom__text">
                        <Image src={Diamond} alt="diamond" className='diamond'></Image>
                        <p>ADEQUATE LIGHTING</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
