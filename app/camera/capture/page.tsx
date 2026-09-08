"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import WhiteDiamond from "../../Assets/white-diamond.png";
import BackButton from "../../Assets/back-button-white.png";
import CameraPicture from "../../Assets/take-picture.png";
import ProceedButton from "../../Assets/proceed-button-white.png";

export default function Capture() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        if (!mounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch {
        setCameraError(true);
      }
    };

    startCamera();
    return () => {
      mounted = false;
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const handleTakePicture = () => {
    const video = videoRef.current;
    if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas
      .getContext("2d")
      ?.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhoto(canvas.toDataURL("image/jpeg"));
    streamRef.current?.getTracks().forEach((track) => track.stop());
  };

  const handleProceed = async () => {
    if (!photo || loading) return;
    setLoading(true);
    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: photo }),
        },
      );
      const data = await response.json();
      sessionStorage.setItem("analysisResult", JSON.stringify(data));
    } catch (error) {
      console.error("Error uploading camera photo:", error);
    } finally {
      router.push("/select");
    }
  };

  return (
    <div className="capture__container">
      <div className="capture__camera">
        {photo ? (
            <>
          <Image
            src={photo}
            alt="Captured selfie"
            fill
            sizes="80vw"
            className="capture__preview"
          />
          <div className="picture__text">GREAT SHOT!</div>
          </>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="capture__video"
          />
        )}
        {cameraError && !photo && (
          <p className="capture__error">CAMERA ACCESS IS REQUIRED</p>
        )}
      </div>
      {!photo && (
      <div className="take__picture--wrapper">
        <button
          className="capture__action"
          onClick={handleTakePicture}
          disabled={Boolean(photo) || cameraError}
        >
          <span className="take__picture--text">TAKE PICTURE</span>
          <Image src={CameraPicture} alt="camera picture"></Image>
        </button>
      </div>
      )}
      <div className="capture__text--bottom">
        <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
        <div className="bottom__text--wrapper">
          <div className="bottom__text">
            <Image src={WhiteDiamond} alt="diamond"></Image>
            <p>NEUTRAL EXPRESSION</p>
          </div>
          <div className="bottom__text">
            <Image src={WhiteDiamond} alt="diamond"></Image>
            <p>FRONTAL POSE</p>
          </div>
          <div className="bottom__text">
            <Image src={WhiteDiamond} alt="diamond" className="diamond"></Image>
            <p>ADEQUATE LIGHTING</p>
          </div>
        </div>
      </div>
      <a className="back__button" href="/results">
        <Image src={BackButton} alt="back button"></Image>
        <span className="capture__text">BACK</span>
      </a>
      {photo && (
        <button
          className="proceed__button"
          onClick={handleProceed}
          disabled={loading}
        >
          <span className="capture__text">PROCEED</span>
          <Image src={ProceedButton} alt="proceed button"></Image>
        </button>
      )}
    </div>
  );
}
