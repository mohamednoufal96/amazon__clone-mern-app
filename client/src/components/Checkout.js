import React from "react";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../StateProvider";
import "../styles/Checkout.css";

function Checkout() {
    const [{ basket }] = useStateValue();

    return (
        <div className="checkout__container">
            <div className="checkout__left">
                <img
                    className="checkout__adImage"
                    src="https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-aws.jpg"
                    alt="not found"
                />

                <h2 className="checkout__title">Your shopping basket</h2>
                {basket.map((item, index) => {
                    return (
                        <CheckoutProduct
                            key={index}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    );
                })}
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    );
}

export default Checkout;
