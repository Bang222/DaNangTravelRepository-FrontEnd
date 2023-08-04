import {FC, useState} from 'react';
import * as React from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Scrollbar, A11y, FreeMode, Thumbs} from 'swiper/modules';

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
    return (
        <div>
            <Swiper
                className={'w-full h-4/6 md:h-5/6 flex justify-center mb-[12px]'}
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                modules={[Navigation, FreeMode, Thumbs]}
                thumbs={{swiper: thumbsSwiper}}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{clickable: true}}
            >
                {previewImage && previewImage?.map((item, index) =>
                    (
                        <SwiperSlide key={index}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className={'w-full object-cover'} src={item} alt={'err'} loading={'lazy'}
                            />
                        </SwiperSlide>
                    )
                )}
            </Swiper>
            <Swiper
                className={'mySwiper'}
                onSwiper={setThumbsSwiper}
                // loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
            >
                {previewImage && previewImage?.map((item, index) => (
                        // eslint-disable-next-line react/jsx-key
                        <SwiperSlide key = {index} className={'opacity-40'}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className={'h-full w-full object-fill'} src={item} alt={'err'} loading={'lazy'}
                            />
                        </SwiperSlide>
                    )
                )}
            </Swiper>
        </div>
    );
}

export default Slice;