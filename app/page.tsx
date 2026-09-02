import Image from "next/image";
import LeftBorder from "./Assets/Rectangle 2779.png"
import LeftButton from "./Assets/button-icon-left.png"
import RightBorder from "./Assets/Rectangle 2778.png"
import RightButton from "./Assets/button-icon-right.png"

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
      </div>
      <div className="right__section">
        <Image src={RightBorder} alt="right border"></Image>
        <button className="right__button">
          <span>TAKE TEST</span>
          <Image src={RightButton} alt="right button"></Image>
        </button>
      </div>
      <p className="main__text">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A <br/>
        HIGHLY-PERSONALIZED ROUTINE TAILORED TO <br/>
        WHAT YOUR SKIN NEEDS.
        </p>
    </div>
  );
}
