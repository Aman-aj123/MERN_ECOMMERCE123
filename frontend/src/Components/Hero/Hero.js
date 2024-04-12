import "./Hero.css";

import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Swiper modules
import { Navigation, Pagination, A11y } from 'swiper/modules';


const Hero = () => {
    return (

        <div className="Hero w-full" id="Hero">
            <div className="Hero-wrapper w-full">
                <Swiper
                    className="mySwiper"
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                >

                    <SwiperSlide>
                        <div className="Hero-items h-full w-full">
                            <img className="w-full h-full" src="https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg" alt="hero-image" />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="Hero-items h-full w-full">
                            <img className="w-full h-full" src="https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg" alt="hero-image" />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="Hero-items h-full w-full">
                            <img className="w-full h-full" src="https://m.media-amazon.com/images/I/61USQwqEHkL._SX1500_.jpg" alt="hero-image" />
                        </div>
                    </SwiperSlide>


                    <SwiperSlide>
                        <div className="Hero-items h-full w-full">
                            <img className="w-full h-full" src="https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg" alt="hero-image" />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="Hero-items h-full w-full">
                            <img className="w-full h-full" src="https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg" alt="hero-image" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="Hero-items h-full w-full">
                            <img className="w-full h-full" src="https://m.media-amazon.com/images/I/71U-Q+N7PXL._SX3000_.jpg" alt="hero-image" />
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </div>

    )


}


export default Hero;