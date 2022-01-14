import React from "react";
import { useStateValue } from "../StateProvider";
import "../styles/Product.css";

function Product({ id, title, image, rating, price }) {
    const [{ basket }, dispatch] = useStateValue();

    const addToBasket = () => {
        console.log("this is the basket: ", basket);

        // dispatch the item into the data layer
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                image: image,
                rating: rating,
                price: price,
            },
        });
    };

    return (
        <div className="product">
            <div className="product__info">
                <p className="product__title">{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating)
                        .fill()
                        .map((_, index) => {
                            return <p key={index}>🌟</p>;
                        })}
                </div>
            </div>
            <img src={image} alt="not found" />
            <button onClick={addToBasket}> Add to basket</button>
        </div>
    );
}

export default Product;
