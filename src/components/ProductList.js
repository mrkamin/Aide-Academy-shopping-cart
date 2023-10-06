// import dependancies and external libraries
import React, { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Data from '../Data';

const ProductList = () => (
  
  <div className="all-product-list mt-2">
    <div className="container d-flex flex-column align-items-center">
      <div className="container product-list-container d-flex align-items-center justify-content-center">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          breakpoints={{
            // when window width is >= 1200px
            1200: {
              slidesPerView: 4,
            },
            // when window width is >= 992px
            992: {
              slidesPerView: 3,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 2,
            },
            // when window width is >= 576px
            576: {
              slidesPerView: 1,
            },
          }}
          className="swiper-contatiner"
        >
          {Data.map((product) => (
            <SwiperSlide
              key={product.id}
              className="d-flex flex-column justify-content-center product-items"
            >
              <div className="product-slider d-flex align-items-center justify-content-center">
                <Swiper
                  pagination={{
                      clickable: true,
                    }}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                  {product.image.url1 && (
                      <SwiperSlide>
                        <img src={product.image.url1} alt={product.title} />
                      </SwiperSlide>
                    )}
                  {product.image.url2 && (
                      <SwiperSlide>
                        <img src={product.image.url2} alt={product.title} />
                      </SwiperSlide>
                    )}
                  {product.image.url3 && (
                      <SwiperSlide>
                        <img src={product.image.url3} alt={product.title} />
                      </SwiperSlide>
                    )}
                </Swiper>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center mt-2">
                <h4>{product.title}</h4>
                <p>
                  $
                    {product.price}
                </p>
                <p>{product.discription}</p>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </div>
);

export default ProductList;
