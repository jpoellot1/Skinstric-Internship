import React from 'react'
import Image from 'next/image'
import LeftBracket from "./Assets/Rectangle 2710.png"
import RightBracket from "./Assets/Rectangle 2711.png"

function Header() {
  return (
    <header>
        <div className="header__container">
            <div className="header__row">
                <div className="header__left">
                    <a href="#" className="header__title">SKINSTRIC</a>
                    <div className="header__intro">
                        <Image src={LeftBracket} alt="left bracket" className="left__bracket"></Image>
                        <p className="header__intro--text">INTRO</p>
                        <Image src={RightBracket} alt="right bracket" className='right__bracket'></Image>
                    </div>
                </div>
                <button className='header__button'>ENTER CODE</button>
            </div>  
        </div>
    </header>
  )
}

export default Header