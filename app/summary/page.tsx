'use client'

import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import LeftButton from "../Assets/button-icon-left.png"
import PercentageBarFill from "../Assets/progress-bar-fill.png"
import PercentageBarEmpty from "../Assets/progress-bar-empty.png"
import SelectedIcon from "../Assets/selected-icon.png"
import UnselectedIcon from "../Assets/unselected-icon.png"

type CategoryData = Record<string, number>
type AnalysisData = {
    race: CategoryData
    age: CategoryData
    gender: CategoryData
}

const categories = ['race', 'age', 'gender'] as const
type Category = typeof categories[number]

const categoryLabels: Record<Category, string> = {
    race: 'RACE',
    age: 'AGE',
    gender: 'SEX'
}

function formatLabel(label:string) {
    return label.toUpperCase()
}

function getSortedEntries(data: CategoryData) {
    return Object.entries(data).sort((a, b) => b[1] - a[1])
}



export default function Summary() {
    const [analysisResult, setAnalysisResult] = useState<{data:AnalysisData} | null>(null)
    const [selection, setSelection] = useState<Category>('race')
    const [selectedValues, setSelectedValues] = useState<Record<Category, string> | null>(null)

    useEffect(() => {
        const stored = sessionStorage.getItem('analysisResult')
        if (stored) {
            const parsed = JSON.parse(stored)
            setAnalysisResult(parsed)
            
            const defaults = {} as Record<Category, string>
            categories.forEach((cat) => {
                const sorted = getSortedEntries(parsed.data[cat])
                defaults[cat] = sorted[0][0]
            })
        setSelectedValues(defaults)
        }
    }, [])

    if(!analysisResult || !selectedValues) {
        return (
        <div className='summary__container'>
          <div className="summary__row">
            <p>Loading analysis data ...</p>
          </div>
        </div>)
    }

    const currentCategoryData = analysisResult.data[selection]
    const sortedCurrent = getSortedEntries(currentCategoryData)
    const currentSelectedValue = selectedValues[selection]
    const currentSelectedConfidence = currentCategoryData[currentSelectedValue]

    const handleRightBoxClick = (label:string) => {
        setSelectedValues((prev) => prev ? {...prev, [selection]:label}: prev)
    }

    const percent = Math.round(currentSelectedConfidence * 100)


  return (
    <>
      <div className="summary__container">
        <div className="summary__title--wrapper">
          <h2 className="summary__title">A.I.ANALYSIS</h2>
          <h3 className="summary__sub-title">DEMOGRAPHICS</h3>
          <h4 className="summary__text">PREDICTED AGE & RACE</h4>
        </div>
        <div className="summary__grid">
          <div className="left__grid">
            {categories.map((cat) => (
              <div
                key={cat}
                className={
                  selection === cat
                    ? "left__grid--box-chosen"
                    : "left__grid--box"
                }
                onClick={() => setSelection(cat)}
              >
                <p className="grid__text">{formatLabel(selectedValues[cat])}</p>
                <h4 className="label">{categoryLabels[cat]}</h4>
              </div>
            ))}
          </div>
          <div className="center__grid">
            <p className="center__grid--label">
              {formatLabel(currentSelectedValue)}
              {selection === "age" ? " y.o." : ""}
            </p>
            <div className="percentage__bar--wrapper">
              <p className="percentage">
                {Math.round(currentSelectedConfidence * 100)}
                <span className="percentage__symbol">%</span>
              </p>
              <Image
                src={PercentageBarFill}
                className="percentage__bar"
                alt="percentage bar"
                style={{
                    WebkitMaskImage: `conic-gradient(black ${percent}%, transparent ${percent}% 100%)`,
                    maskImage: `conic-gradient(black ${percent}%, transparent ${percent}% 100%)`
                }}
              ></Image>
              <Image
                src={PercentageBarEmpty}
                className="percentage__bar--empty"
                alt="percentage bar background"
              ></Image>
            </div>
            <p className="center__grid--text">
              If A.I. estimate is wrong, select the correct one.
            </p>
          </div>
          <div className="right__grid">
            <div className="right__grid--title-box">
              <h4 className="title__text">RACE</h4>
              <h4 className="title__text">A.I. CONFIDENCE</h4>
            </div>
            {sortedCurrent.map(([label, value]) => {
              const isChosen = label === currentSelectedValue;
              return (
                <div
                  key={label}
                  className={
                    isChosen ? "right__grid--box-chosen" : "right__grid--box"
                  }
                  onClick={() => handleRightBoxClick(label)}
                >
                  <div className="left__box">
                    <Image
                      src={isChosen ? SelectedIcon : UnselectedIcon}
                      alt={isChosen ? "selected icon" : "unselected icon"}
                      className="icon"
                    ></Image>
                    <p className="grid__text">{formatLabel(label)}</p>
                  </div>
                  <p className="grid__text">{Math.round(value * 100)}%</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="summary__bottom">
        <a className="summary__back--button" href="/select">
          <Image src={LeftButton} alt="back button"></Image>
          <span>BACK</span>
        </a>
        <p className="summary__bottom--text">
          If A.I. estimate is wrong, select the correct one.
        </p>
        <div className="summary__button--wrapper">
          <button className="reset__button">RESET</button>
          <button className="confirm__button">CONFIRM</button>
        </div>
      </div>
    </>
  );
}
