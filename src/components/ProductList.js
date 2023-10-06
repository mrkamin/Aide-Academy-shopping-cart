import React, { useState, useEffect } from 'react';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Data from '../Data';
import ShoppingCart from './ShoppingCart';

const ProductList = () => {
  const [cart, setCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  // Load cart data from local storage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Save cart data to local storage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const generateAndOpenPDF = () => {
    // Create a new jsPDF instance
    const pdfFile = new JsPDF('p', 'mm', 'a4');

    // Capture the HTML element containing table
    const tableElement = document.querySelector('.cart');

    // Use html2canvas to convert the table to an image
    html2canvas(tableElement).then((canvas) => {
      // Add the image (canvas) to the PDF
      const imgData = canvas.toDataURL('image/png');
      pdfFile.addImage(imgData, 'PNG', 10, 10, 190, 0);

      // Save the PDF with a unique name
      const pdfName = 'shopping_cart.pdf';
      pdfFile.save(pdfName);
    });
  };

  const addToCart = (product) => {
    // Create a copy of the current cart array
    const updatedCart = [...cart];

    // Check if the product to be added (identified by its id) already exists in the cart
    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      // If the product exists in the cart, increase its quantity by 1
      existingItem.quantity += 1;
    } else {
      // If the product is not in the cart, add it to the cart with a quantity of 1
      updatedCart.push({ ...product, quantity: 1 });
    }

    // Update the state with the updated cart
    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    // Create a new cart array that filters out the item with the specified productId
    const updatedCart = cart.filter((item) => item.id !== productId);

    // Update the state with the updated cart, effectively removing the specified product
    setCart(updatedCart);
  };

  const updatedQuantity = (productId, newQuantity) => {
    // Create a new cart array by mapping over the existing cart
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        // If the item's id matches the productId, update its quantity with newQuantity
        return { ...item, quantity: newQuantity };
      }
      // Otherwise, keep the item as it is
      return item;
    });

    // Update the state with the updated cart, reflecting the quantity change
    setCart(updatedCart);
  };

  useEffect(() => {
    const cost = cart.reduce(
      (acc, item) => acc + item.price * item.quantity, 0,

    );
    setTotalCost(cost);
  }, [cart]);

  return (
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
      <ShoppingCart
        cart={cart}
        removeFromCart={removeFromCart}
        updatedQuantity={updatedQuantity}
        totalCost={totalCost}
        generateAndOpenPDF={generateAndOpenPDF}
      />
    </div>
  );
};

export default ProductList;
