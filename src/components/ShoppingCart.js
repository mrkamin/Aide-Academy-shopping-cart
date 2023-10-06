import React from 'react';
import PropTypes from 'prop-types';

const ShoppingCart = ({
  cart, removeFromCart, updatedQuantity, totalCost, generateAndOpenPDF,
}) => (
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
                <button type="button" onClick={() => removeFromCart(item.id)} className="btn btn-danger">
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
);

const cartItemPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,

});

ShoppingCart.propTypes = {
  cart: PropTypes.arrayOf(cartItemPropTypes).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updatedQuantity: PropTypes.func.isRequired,
  totalCost: PropTypes.number.isRequired,
  generateAndOpenPDF: PropTypes.func.isRequired,
};

export default ShoppingCart;
