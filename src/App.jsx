import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube } from "swiper";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/scss/scrollbar";

import "./App.scss";
import { useRef } from "react";
import Header from "./components/header/Header";

const items = [
  {
    id: 0,
    title: "Hosting & Dev",
    text: "We offer you hosting which will not be limited to monthly transfers (actions). We do not allow you to jump on furniture though, only kids are allowed to do that.",
    buttonText: "Discover",
    vidSrc: "http://izstop.izstop.si/instagram/vid.mp4",
  },
  {
    id: 1,
    title: "Web",
    text: "We are kings of html and all that jazz. In our kingdom we have a few magicians that are doing wonders with codes. We love codes. ",
    buttonText: "Explore",
    vidSrc: "http://izstop.izstop.si/instagram/vid.mp4",
  },
  {
    id: 2,
    title: "Vr",
    text: "VR takes us back when we were as kids watching SciFi movies about virtual reality and we didn’t had a clue that VR is going to be part of our life.",
    buttonText: "Discover",
    vidSrc: " http://izstop.izstop.si/instagram/vid_2.mp4",
  },
  {
    id: 3,
    title: "About us",
    text: "We challenge convention and push technology to the edge of possibility. Welcome to Rimac. This is our story.",
    buttonText: "Explore",
    vidSrc: "http://izstop.izstop.si/nobackup/OZEMPIC_final_4.mp4",
  },
];

export default function App() {
  const swiperRef = useRef();
  console.log(swiperRef, "first");
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
        {items.map(({ id, title, text, buttonText, vidSrc }) => (
          <SwiperSlide key={id}>
            <video autoPlay loop muted id="video">
              <source src={vidSrc} type="video/mp4" />
            </video>
            <h2>{title}</h2>
            <p>{text}</p>
            <div className="btn__wrapper btn__wrapper-dark">
              <a href="#" className="btn">
                {buttonText}
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="navigation">
        <ul>
          {items.map(({ id, title }) => {
            console.log(swiperRef, "scond");
            console.log(id);
            return (
              <li
                key={id}
                onClick={() => {
                  swiperRef.current.slideTo(id);
                }}
                className={`${swiperRef.activeIndex === id ? "active" : ""}`}
              >
                <p>{title}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <i className="scroll-indicator"></i>
      <div className="section-scroll">
        <span className="hscroll-line"></span>
      </div>
    </div>
  );
}
