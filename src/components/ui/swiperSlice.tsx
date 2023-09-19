import {FC, useEffect, useRef, useState} from 'react';
import * as React from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Scrollbar, A11y, FreeMode, Thumbs, Autoplay} from 'swiper/modules';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import '../../app/(user)/(home)/tour/swiper.css'

interface SlideProps {
    previewImage :string[]
}

//bang

const Slice:FC<SlideProps> = (props) => {
    const { previewImage } = props
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const swiperRef = useRef(null);
    return (
        <div>
            <Swiper
                className={'w-full h-4/6 md:h-5/6 flex justify-center mb-[12px]'}
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                thumbs={{swiper: thumbsSwiper}}
                spaceBetween={50}
                slidesPerView={1}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{clickable: true}}
                modules={[Autoplay,Navigation, FreeMode, Thumbs,Pagination]}
            >
                {previewImage && previewImage?.map((item, index) =>
                    (
                        <SwiperSlide key={index}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className={'w-full h-[200px] sm:h-[300px] xxl:h-[400px] object-cover'} src={item} alt={'err'} loading={'lazy'}
                            />
                        </SwiperSlide>
                    )
                )}
                <div className="swiper-button-next bg-white rounded-full" style={{width:'30px', height:'30px'}}>
                    <KeyboardArrowRightIcon sx={{color:'black', opacity:'1'}}/>
                </div>
                <div className="swiper-button-prev bg-white rounded-full" style={{width:'30px', height:'30px'}}>
                    <KeyboardArrowLeftIcon sx={{color:'black'  ,opacity:'1'}}/>
                </div>
            </Swiper>
            {/*<Swiper*/}
            {/*    className={'mySwiper'}*/}
            {/*    onSwiper={setThumbsSwiper}*/}
            {/*    // loop={true}*/}
            {/*    spaceBetween={10}*/}
            {/*    slidesPerView={4}*/}
            {/*    freeMode={true}*/}
            {/*    pagination={{ clickable: true }}*/}
            {/*    watchSlidesProgress={true}*/}
            {/*    modules={[FreeMode, Navigation, Thumbs]}*/}
            {/*>*/}
            {/*    {previewImage && previewImage?.map((item, index) => (*/}
            {/*            // eslint-disable-next-line react/jsx-key*/}
            {/*            <SwiperSlide key = {index} className={'opacity-40'}>*/}
            {/*                /!* eslint-disable-next-line @next/next/no-img-element *!/*/}
            {/*                <img className={'xxl:h-[100px] h-[50px] sm:h-[75px] w-full object-fill'} src={item} alt={'err'} loading={'lazy'}*/}
            {/*                />*/}
            {/*            </SwiperSlide>*/}
            {/*        )*/}
            {/*    )}*/}
            {/*</Swiper>*/}
        </div>
    );
}

export default Slice;