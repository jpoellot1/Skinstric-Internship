'use client'

import React, { useRef, useState } from 'react'
import Image from "next/image"
import LargeRectangle from "../Assets/Rectangle Large.png"
import MediumRectangle from "../Assets/Rectangle Medium.png"
import SmallRectangle from "../Assets/Rectangle Small.png"
import LeftButton from "../Assets/button-icon-left.png"
import CameraIcon from "../Assets/camera-icon.png"
import GalleryIcon from "../Assets/gallery-icon.png"
import ScanLine from "../Assets/Downward-line.png"
import { useRouter } from 'next/navigation'

export default function Results() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [showCameraAccess, setShowCameraAccess] = useState(false)
  const router = useRouter()

  const handleGalleryClick = () => {
    fileInputRef.current?.click()
  }

  const handleCameraClick = () => {
    setShowCameraAccess(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async () => {
      const base64String = reader.result?.toString() || ''
      setLoading(true)
      try {
        const response = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64String }),
        })
        const data = await response.json()
        sessionStorage.setItem('analysisResult', JSON.stringify(data))
      } catch (error) {
        console.error('Error uploading file:', error)
      } finally {
        router.push('/select')
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className='results__container'>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
        <div className="progress__container">
            <p className="progress__text">TO START ANALYSIS</p>
        </div>
      { !loading ? (
        <div className="results__row">
            <div className="camera__wrapper">
                <div className="camera">
                    <button type="button" className="camera__button" onClick={handleCameraClick} aria-label="Use camera">
                      <Image src={CameraIcon} alt="camera icon" className='camera__icon'></Image>
                    </button>
                    <div className="camera__text">
                        <Image src={ScanLine} alt='upward line' className='upward__line'></Image>
                        <p>ALLOW A.I<br/>TO SCAN YOUR FACE</p>
                    </div>
                </div>
                <Image src={LargeRectangle} alt='large rectangle' className='large__rectangle--results'></Image>
                <Image src={MediumRectangle} alt='medium rectangle' className='medium__rectangle--results'></Image>
                <Image src={SmallRectangle} alt='small rectangle' className='small__rectangle--results'></Image>
                
            </div>
            <div className="gallery__wrapper" onClick={handleGalleryClick}>
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
        ):(
            <div className="loading__row">
                <div className="loading__wrapper">
                    <p className="loading__text">PREPARING YOUR ANALYSIS...</p>
                    <Image src={LargeRectangle} alt='large rectangle' className='large__rectangle--results'></Image>
                    <Image src={MediumRectangle} alt='medium rectangle' className='medium__rectangle--results'></Image>
                    <Image src={SmallRectangle} alt='small rectangle' className='small__rectangle--results'></Image>
                </div>
            </div>
        )}
      <a className="back__button" href="/testing">
        <Image src={LeftButton} alt='back button'></Image>
        <span>BACK</span>
      </a>
      {showCameraAccess && (
        <div className="access__overlay" role="dialog" aria-modal="true" aria-labelledby="camera-access-title">
          <div className="access__wrapper">
            <h2 className="access__top" id="camera-access-title">
              ALLOW A.I. TO ACCESS YOUR CAMERA
            </h2>
            <div className="access__bottom">
              <button type="button" className='deny__button' onClick={() => setShowCameraAccess(false)}>DENY</button>
              <button type="button" className='allow__button' onClick={() => router.push('/camera')}>ALLOW</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
