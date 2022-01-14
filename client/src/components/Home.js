import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Product from "./Product";
import axios from "axios";
import { useStateValue } from "../StateProvider";

export default function Home() {
    const API_URL = require("../constants").API_URL;

    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_URL}/getProductDetails`)
            .then((res) => {
                setProductsData(res.data.products);
                console.log(res.data.products);
            })
            .catch((error) => {
                console.log(error);
            });

        console.log(productsData);
    });

    return (
        <div className="home__container">
            <img
                src="https://m.media-amazon.com/images/I/61ZtySPW1QL._SX3000_.jpg"
                className="banner__image"
                alt="not found"
            />

            {/*  
            <div className="home__row">
                <Product
                    id="5234523"
                    title="The Real Anthony Fauci: Bill Gates, Big Pharma, and the Global War on Democracy…"
                    image="https://images-na.ssl-images-amazon.com/images/I/51wH91YObNL._AC_SX184_.jpg"
                    price={99.99}
                    rating={5}
                />
                <Product
                    id="34234123"
                    title="Atlas of the Heart: Mapping Meaningful Connection and the Language of Human…"
                    image="https://images-na.ssl-images-amazon.com/images/I/91DNhLLmUOL._AC_UL210_SR195,210_.jpg"
                    price={99.99}
                    rating={5}
                />
            </div>
            <div className="home__row">
                <Product
                    id="5454545"
                    title="The Real Anthony Fauci: Bill Gates,"
                    image="https://images-na.ssl-images-amazon.com/images/I/5111N6ROJWL._AC_SX184_.jpg"
                    price={43}
                    rating={5}
                />
                <Product
                    id="5565664"
                    title="2022 National Park Foundation Wall Calendar: 12-Month Nature Calendar &…"
                    image="https://images-na.ssl-images-amazon.com/images/I/A1gJMNy3K7L._AC_UL210_SR195,210_.jpg"
                    price={34}
                    rating={5}
                />
                <Product
                    id="42352352"
                    title="Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones"
                    image="https://images-na.ssl-images-amazon.com/images/I/A1gJMNy3K7L._AC_UL254_SR254,254_.jpg"
                    price={12}
                    rating={5}
                />
            </div>
            <div className="home__row">
                <Product
                    id="6574567"
                    title="Sold on a Monday: A Novel"
                    image="https://images-na.ssl-images-amazon.com/images/I/81bD6Ll-seL._AC_UL210_SR195,210_.jpg"
                    price={132}
                    rating={5}
                />
                <Product
                    id="5625272"
                    title="The Screaming Goat (Book & Figure)"
                    image="https://images-na.ssl-images-amazon.com/images/I/91vS2L5YfEL._AC_UL127_SR127,127_.jpg"
                    price={99.99}
                    rating={5}
                />
            </div>
            */}

            <div className="home__products__container">
                {productsData.map((item, index) => {
                    return (
                        <Product
                            key={index}
                            id={item.id}
                            title={item.name}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        ></Product>
                    );
                })}
            </div>
        </div>
    );
}
