import React from 'react'

export default function Testing() {
  return (
    <div className='testing__container'>
      <div className="progress__container">
        <p className="progress__text">TO START ANALYSIS</p>
      </div>
      <div className="testing__row">
        <p className="intro__text">CLICK TO TYPE</p>
        <form action="submit">
          <input type="text" placeholder='Introduce Yourself' autoComplete='off' name='name' />
        </form>
      </div>
    </div>
  )
}
