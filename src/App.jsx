import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube } from "swiper";
import Header from "./components/header/Header";
import YoutubeBackground from "react-youtube-background";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/scss/scrollbar";

import "./App.scss";

const VIDEO_WIDTH = 1920;
const VIDEO_HEIGHT = 1080;
const items = [
  {
    id: 1,
    title: "Hosting & Dev",
    text: "We offer you hosting which will not be limited to monthly transfers (actions). We do not allow you to jump on furniture though, only kids are allowed to do that.",
    buttonText: "Discover",
    vidSrc: "http://izstop.izstop.si/instagram/vid.mp4",
    // "https://www.youtube.com/embed/aEvP2tqaZD4?controls=0&showninfo=0&autoplay=1&mute=1",
    type: "video/mp4",
  },
  {
    id: 2,
    title: "Web",
    text: "We are kings of html and all that jazz. In our kingdom we have a few magicians that are doing wonders with codes. We love codes. ",
    buttonText: "Explore",
    vidSrc: "http://izstop.izstop.si/instagram/vid.mp4",
    type: "video/mp4",
  },
  {
    id: 3,
    title: "Vr",
    text: "VR takes us back when we were as kids watching SciFi movies about virtual reality and we didn’t had a clue that VR is going to be part of our life.",
    buttonText: "Discover",
    vidSrc: " http://izstop.izstop.si/instagram/vid_2.mp4",
    type: "video/mp4",
  },
  {
    id: 4,
    title: "About us",
    text: "We challenge convention and push technology to the edge of possibility. Welcome to Izstop. Our story tells about our uniqueness.",
    buttonText: "Explore",
    vidSrc: "http://izstop.izstop.si/nobackup/OZEMPIC_final_4.mp4",
    type: "video/mp4",
  },
];

export default function App() {
  const swiperRef = useRef();
  console.log(swiperRef);

  //add as blob
  async function fetchVideo() {
    await items.map(({ id, vidSrc }) => {
      const videoSrc = fetch(`${vidSrc}`)
        .then((res) => {
          return res.blob();
        })
        .then((blob) => {
          let obj = URL.createObjectURL(blob);
          document.querySelector("video").src = blobUrl;
          console.log(blobUrl);
        });
      return videoSrc;
    });
  }
  return (
    <div className="App">
      <Header />
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        loop={true}
        effect="cube"
        direction="vertical"
        cubeEffect={{
          shadow: false,
          slideShadows: false,
        }}
        grabCursor={true}
        pagination={true}
        modules={[EffectCube]}
      >
        {items.map(({ id, title, text, buttonText, vidSrc, type }) => (
          <SwiperSlide key={id}>
            {type === "video/mp4" ? (
              <video autoPlay loop muted className="video">
                <source src={vidSrc} type={type} />
              </video>
            ) : (
              <YoutubeBackground className="yt" videoId={vidSrc}>
                <div style={{ height: 500 }}>Content</div>
              </YoutubeBackground>
            )}
            <h2>{title}</h2>
            <p>{text}</p>
            <div className="btn__wrapper btn__wrapper-dark">
              <a href="#" className="btn">
                {buttonText}
              </a>
            </div>
          </SwiperSlide>
        ))}
        <div className="navigation">
          <i className="moving-bar opacity-100">
            <span className="rect"></span>
            <span className="circle"></span>
          </i>
          <ul>
            {items.map(({ id, title }) => (
              <li
                key={id}
                onClick={() => {
                  swiperRef.current.slideTo(id);
                }}
              >
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div class="c-scrolldown">
          <div class="c-line"></div>
        </div>
      </Swiper>
    </div>
  );
}
