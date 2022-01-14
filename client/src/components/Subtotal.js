import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";
import { getBasketTotal, getUserState } from "../reducer";
import { API_URL } from "../constants";
import { useHistory } from "react-router-dom";
import "../styles/Subtotal.css";

function Subtotal() {
    const [{ basket, user }] = useStateValue();
    const [_user, setUser] = useState();
    const history = useHistory();
    const basketTotal = getBasketTotal(basket);

    useEffect(() => {
        if (user) {
            setUser(user);
        }
    });

    const [addProductAlert, setAddProductAlert] = useState("");

    const goToPaymentHandler = () => {
        if (_user && basketTotal > 0) {
            debugger;
            // if logged in then go for payment
            // add the logic to make the payment

            // (1) make API call to the BE and get the payment checksum
            const data = {
                amount: basketTotal,
                email: user.email,
                mobileNo: "9999999999",
            };
            getChecksum(data)
                .then((result) => {
                    debugger;
                    // (2) go to the paytm website, on the paytm website, finish the payment
                    let information = {
                        action: "https://securegw-stage.paytm.in/order/process",
                        params: result,
                    };
                    postTheInformationToPaytm(information);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (_user) {
            setAddProductAlert("Please add some products to your basket  !");
        } else {
            alert("Please login to checkout !");
            history.push("/login");
        }
    };

    const getChecksum = (data) => {
        return fetch(`${API_URL}/payment`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((resp) => {
                return resp.json();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const postTheInformationToPaytm = (info) => {
        // build the form data
        const form = buildForm(info);

        // attach in the request body
        document.body.appendChild(form);

        // submit the form
        form.submit();

        // destroy the form
        form.remove();
    };

    const buildForm = (details) => {
        const { action, params } = details;
        const form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", action);
        Object.keys(params).forEach((key) => {
            const input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("name", key);
            input.setAttribute("value", stringifyValue(params[key]));
            form.appendChild(input);
        });
        return form;
    };

    const stringifyValue = (value) => {
        if (isObj(value) && !isDate(value)) {
            return JSON.stringify(value);
        } else {
            return value;
        }
    };
    const isDate = (val) => {
        return Object.prototype.toString.call(val) === "[object Date]";
    };

    const isObj = (val) => {
        return typeof val === "object";
    };

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            <span> Subtotal({basket.length} items) : </span>

                            <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> <span>This order contains a gift</span>
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            {addProductAlert ? <h5 className="subtotal__addProduct__alert">{addProductAlert}</h5> : null}
            <button className="subtotal__checkoutButton" onClick={goToPaymentHandler}>
                Proceed to Checkout
            </button>
        </div>
    );
}

export default Subtotal;
