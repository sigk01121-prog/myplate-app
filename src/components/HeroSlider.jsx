import React, { useEffect, useState } from 'react'
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react'
/* 
1. 슬라이드에 들어갈 사진 3장+alt로 이미지 제목
2. 지금 몇 번째 이미지인지 순서를 기억  -> slideIndex(변수) setSlideIndex(index 번호를 업데이트해주는 함수) => useState
3. 3초마다 다음 사진으로 바뀜 -> timer
4. < > 인디케이터를 클릭해도 사진이 바뀜 
*/
const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop',
    alt: "건강한 아보카도 샐러드"
  },

  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1555243896-c709bfa0b564?q=80&w=1470&auto=format&fit=crop',
    alt: "신선한 연어 샐러드"
  },

  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1546069901-55d1670321aa?q=80&w=1476&auto=format&fit=crop',
    alt: "고소한두부 옥수수 샐러드"
  }
]
console.log(slides)
slides.map((img) => {
  console.log('img', img)
})

function HeroSlider() {
  const [slideIndex, setSlideIndex] = useState(0);
  //console.log(slideIndex)

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((currentIndex) => {
        console.log('currentIndex', currentIndex);
        return (currentIndex + 1) % slides.length;
      })
      //초기변수 slideIndex = 0이 저장
      //setSlideIndex라는 함수를 실행하면 매개변수명 prev에 0이 전달실행
      setSlideIndex((prev) => (prev + 1) % slides.length)
    }, 3000);
    return () => clearInterval(timer); // 화면을 다른 페이지로 이동
  }, []);

  const prevSlider = () => setSlideIndex((currentIndex) => (currentIndex - 1 + slides.length) % slides.length)
  /* 
    currentIndex => currentIndex -1 + 3 / 3 =
  */

  const nextSlider = () => {
    setSlideIndex((prev) => (prev + 1) % slides.length)
  }
  return (
    <div className="hero-slide">
      <img src={slides[slideIndex].image} alt={slides[slideIndex].alt} />

      <button className="slide-btn prev" onClick={prevSlider} aria-label='이전이미지'><CircleChevronLeft size={44} color='rgba(255,255,255,0.8)' /></button>
      <button className="slide-btn next" onClick={nextSlider} aria-label='다음이미지'><CircleChevronRight size={44} color='rgba(255,255,255,0.8)' /></button>

      <div className="slide-dots">
        {
          slides.map((slide, index) => (
            <button key={index} className={index === slideIndex ? 'on' : ''} onClick={() => setSlideIndex(index)} aria-label={`${index + 1}번 이미지`} />

          ))
        }
      </div>
    </div>
  )
}

export default HeroSlider

