import React from "react";
import { useStateValue } from "../StateProvider";
import "../styles/CheckoutProduct.css";

function CheckoutProduct({ id, title, image, price, rating }) {
    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = (id) => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id
        });
    };

    return (
        <div className="checkoutProduct">
            <div className="checkoutProduct__image">
                <img src={image} alt="not found" />
            </div>
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating)
                        .fill()
                        .map((_, index) => {
                            return <p key={index}>🌟</p>;
                        })}
                </div>

                <button onClick={() => removeFromBasket(id)}>Remove from basket</button>
            </div>
        </div>
    );
}

export default CheckoutProduct;
