import React, { useRef } from "react";
import Header from "./components/header/Header";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
// import "swiper/css";
import "swiper/scss/navigation";
import "swiper/scss/mousewheel";
import "swiper/scss/effect-coverflow";

import "./App.scss";

// import required modules
import {
  Keyboard,
  Scrollbar,
  Navigation,
  Zoom,
  EffectCoverflow,
  Mousewheel,
} from "swiper";
import { VideoObserver } from "./components/IntersectionObserver";

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

const sampleItems = [
  {
    id: 1,
    title: "Hosting & Dev",
    text: "We offer you hosting which will not be limited to monthly transfers (actions). We do not allow you to jump on furniture though, only kids are allowed to do that.",
    buttonText: "Discover",
    imgSrc: "https://swiperjs.com/demos/images/nature-1.jpg",
  },
  {
    id: 2,
    title: "Web",
    text: "We are kings of html and all that jazz. In our kingdom we have a few magicians that are doing wonders with codes. We love codes. ",
    buttonText: "Explore",
    imgSrc: "https://swiperjs.com/demos/images/nature-2.jpg",
  },
  {
    id: 3,
    title: "Vr",
    text: "VR takes us back when we were as kids watching SciFi movies about virtual reality and we didn’t had a clue that VR is going to be part of our life.",
    buttonText: "Discover",
    imgSrc: " https://swiperjs.com/demos/images/nature-3.jpg",
  },
  {
    id: 4,
    title: "About us",
    text: "We challenge convention and push technology to the edge of possibility. Welcome to Rimac. This is our story.",
    buttonText: "Explore",
    imgSrc: "https://swiperjs.com/demos/images/nature-4.jpg",
  },
];
export default function App() {
  const swiperRef = useRef();
  let interleaveOffset = 2 * Math.PI;
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
        direction="vertical"
        slidesPerView={1}
        spaceBetween={30}
        speed={900}
        mousewheel={{
          sensitivity: 1.5,
          enabled: true,
        }}
        centeredSlides={true}
        keyboard={{
          // enabled: true,
          onlyInViewport: true,
        }}
        grabCursor={false}
        loop={true}
        breakpoints={{
          100: {
            longSwipesRatio: 0.5,
            shortSwipes: true,
            allowTouchMove: true,
          },
          1024: {
            allowTouchMove: false,
            longSwipesRatio: true,
            shortSwipes: false,
          },
        }}
        watchSlidesProgress={true}
        // onSlideChange={() => console.log("slidechanged")}
        navigation={true}
        onProgress={(swiper, progress) => {
          for (let i = 0; i < swiper.slides.length; i++) {
            // progress = swiper.slides[i].progress;
            // console.log(progress);
            // let innerOffset = swiper.width * interleaveOffset;
            // let innerTranslate = progress * innerOffset;
            // swiper.slides[i].querySelector(".slide_inner").style.transform = `
            //     scale(0.6 0.7);
            //     translate3d(0, ${innerTranslate}px, 0)
            // `;
            let slide = swiper.slides[i];
            let translate, innerTranslate;
            progress = slide.progress;

            if (progress > 0) {
              translate = progress * swiper.width;
              innerTranslate = translate * interleaveOffset;
            } else {
              innerTranslate =
                Math.abs(progress * swiper.width) * interleaveOffset;
              translate = 0;
            }
            slide.querySelector(".slide_inner").style.scale = `1 1`;
            slide.querySelector(
              "video"
            ).style.transform = `translate3d(${translate}px,0,0)`;

            slide.querySelector(
              ".slide_inner"
            ).style.transform = `translate3d(0,${innerTranslate}px,0)`;
          }
        }}
        onTouchStart={(swiper) => {
          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = "";
          }
        }}
        // onTransitionStart={(swiper) => {
        //   for (let i = 0; i < swiper.slides.length; i++) {
        //     const slide = swiper.slides[i];
        //     slide.querySelector(".slide_inner").style.scale = ``;
        //   }
        // }}
        onTransitionEnd={(swiper) => {
          for (let i = 0; i < swiper.slides.length; i++) {
            const slide = swiper.slides[i];
            slide.querySelector(".slide_inner").style.scale = `1 1`;
          }
        }}
        onSlideChange={(swiper) => {
          console.log("Slide change");
          for (let i = 0; i < swiper.slides.length; i++) {
            const slide = swiper.slides[i];
            slide.querySelector(".slide_inner").style.background = ``;
            slide.querySelector(".slide_inner").style.scale = `0.9 0.6`;
          }
        }}
        onSetTransition={(swiper, speed) => {
          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].querySelector(
              ".slide_inner"
            ).style.transition = `${speed}ms`;
            swiper.slides[i].querySelector(
              "video"
            ).style.transition = `${speed}ms`;
          }
        }}
        scrollbar={{
          draggable: false,
        }}
        modules={[
          Keyboard,
          Scrollbar,
          Navigation,
          Zoom,
          EffectCoverflow,
          Mousewheel,
        ]}
      >
        {items.map(({ id, title, text, buttonText, vidSrc, type }) => (
          <SwiperSlide key={id}>
            {/*  <img src={imgSrc} alt={title} className="slide_inner" />*/}
            <VideoObserver
              type={type}
              src={vidSrc}
              className="slide_inner"
              id="video"
            />
            <div className="overlay"></div>
            <h2 className="title">{title}</h2>
            <p className="description">{text}</p>
            <div className="btn__wrapper btn__wrapper-dark">
              <button className="btn">{buttonText}</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="navigation">
        <ul>
          {items.map(({ id, title }) => (
            <li
              key={id}
              className="list-items"
              onClick={() => swiperRef?.current?.slideTo(id)}
            >
              {id} {title}
            </li>
          ))}
        </ul>
      </div>
      <div className="c-scrolldown">
        <div className="c-line"></div>
      </div>
    </div>
  );
}
