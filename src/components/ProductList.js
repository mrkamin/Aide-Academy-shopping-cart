// import dependancies and external libraries
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

const ProductList = () => {
  // The component uses the React useState hook to manage two pieces of state:
  const [cart, setCart] = useState([]);
  // An array that holds the selected products in the shopping cart.
  const [totalCost, setTotalCost] = useState(0);
  // A number representing the total cost of the items in the cart.

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

    // Capture the HTML element containing your table
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
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }
    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const updatedQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  useEffect(() => {
    const cost = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
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
      <div className="d-flex flex-column mt-2">
        <div className="cart container d-flex flex-column align-items-center">
          <h2>Shopping Cart</h2>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>
                    $
                    {item.price}
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updatedQuantity(item.id, parseInt(e.target.value, 10))}
                    />
                  </td>
                  <td>
                    $
                    {item.price * item.quantity}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Total: $
            {totalCost}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-dark"
          onClick={generateAndOpenPDF}
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default ProductList;
