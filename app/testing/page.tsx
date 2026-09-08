'use client';

import React, { useState } from 'react'
import LargeRectangle from "../Assets/Rectangle Large.png"
import MediumRectangle from "../Assets/Rectangle Medium.png"
import SmallRectangle from "../Assets/Rectangle Small.png"
import LeftButton from "../Assets/button-icon-left.png"
import RightButton from "../Assets/button-icon-right.png"
import Image from 'next/image'

export default function Testing() {
  const [step, setStep] = useState<'name' | 'location' | 'proceed'>('name');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const isValidInput = (val: string) => {
    const trimmed = val.trim();
    return trimmed.length > 0 && !/\d/.test(trimmed) && /^[a-zA-Z\s\-',.]+$/.test(trimmed);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidInput(inputValue)) {
      setError('Please enter a valid value without numbers or special characters.');
      return;
    }

    setError('');

    if (step === 'name') {
      setName(inputValue.trim());
      setInputValue('');
      setStep('location');
    } else if (step === 'location') {
      const locationData = inputValue.trim();
      setLocation(locationData);
      setStep('proceed');

      try {
        await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, location: locationData }),
        });
      } catch (error) {
        console.error('Failed to send data:', error);
      }
    }
  };

  return (
    <div className='testing__container'>
      <div className="progress__container">
        <p className="progress__text">TO START ANALYSIS</p>
      </div>
      <div className="testing__row">
        <p className="intro__text">CLICK TO TYPE</p>
        <form onSubmit={handleSubmit} className="testing__form--wrapper">
          <input
            type="text"
            placeholder={step === 'name' ? 'Introduce Yourself' : 'Where are you from?'}
            name={step}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='testing__input'
          />
        </form>
      </div>
      <Image src={LargeRectangle} alt='large rectangle' className='large__rectangle'></Image>
      <Image src={MediumRectangle} alt='medium rectangle' className='medium__rectangle'></Image>
      <Image src={SmallRectangle} alt='small rectangle' className='small__rectangle'></Image>
      <a className="back__button" href="/">
        <Image src={LeftButton} alt='back button'></Image>
        <span>BACK</span>
      </a>
      { step === 'proceed' ?(
        <a className="proceed__button" href="/results">
          <span>PROCEED</span>
          <Image src={RightButton} alt='proceed button'></Image>
        </a>
      ):(
        <></>
      )}
    </div>
  )
}
