"use client";

import Image from "next/image";
import LeftBorder from "./Assets/Rectangle 2779.png"
import LeftButton from "./Assets/button-icon-left.png"
import RightBorder from "./Assets/Rectangle 2778.png"
import RightButton from "./Assets/button-icon-right.png"
import LargeRectangle from "./Assets/Rectangle Large.png"
import MediumRectangle from "./Assets/Rectangle Medium.png"

export default function Home() {
  return (
    <div className="container">
      <div className="left__section">
        <Image src={LeftBorder} alt="left border"></Image>
        <button className="left__button">
          <Image src={LeftButton} alt="left button"></Image>
          <span>DISCOVER A.I.</span>
        </button>
      </div>
      <div className="row">
        <h1 className="main__heading">
          Sophisticated 
          <br/> 
          skincare
        </h1>
        <Image src={LargeRectangle} alt='large rectangle' className='large__rectangle--home'></Image>
        <Image src={MediumRectangle} alt='medium rectangle' className='medium__rectangle--home'></Image>
      </div>
      <div className="right__section">
        <Image src={RightBorder} alt="right border"></Image>
        <a href="/testing">
          <button className="right__button">
            <span>TAKE TEST</span>
            <Image src={RightButton} alt="right button"></Image>
          </button>
        </a>
      </div>
      <p className="main__text">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A <br/>
        HIGHLY-PERSONALIZED ROUTINE TAILORED TO <br/>
        WHAT YOUR SKIN NEEDS.
      </p>
      <a href="/testing">
        <button className="enter__button">
          <span>ENTER EXPERIENCE</span>
          <Image src={RightButton} alt="right button"></Image>
        </button>
      </a>
    </div>
  );
}
