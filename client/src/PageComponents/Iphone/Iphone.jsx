import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Iphone() {

  let [Product,setProduct] = useState([]);
// console.log(Product);
  // useEffect(() => {
  //   fetch("http://localhost:4000/iphone")
  //     .then(res => res.json())
  //     .then(data => {
  //       // console.log(data);
  //       setProduct(data.productsall);
  //     })
  //     .catch(() => console.log("error"));
  // }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/iphone");
        const data = await res.json();
// console.log(res);
        //  console.log(data);
        setProduct(data?.productsall);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <section className="internal-page-wrapper">
        <div className="container">
          <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-12 mt-5 pt-5">
              <h1 className="font-weight-bold">Iphone</h1>
              <div className="brief-description mb-5">
                The best for the brightest
              </div>
            </div>
          </div>
          {Product.map((Productvar, i) => {
            let productsection = (
              <div
                key={i}
                className="row justify-content-center text-center h-100"
              >
                <div
                  className={`col-sm-12 col-md-6 my-auto order-${
                    i % 2 === 0 ? "1" : "2"
                  }`}
                >
                  <div className="product-title">{Productvar.product_name}</div>
                  <div className="product-brief">
                    {Productvar.product_brief_description}
                  </div>
                  <div className="starting-price">{`Starting at ${Productvar.starting_price}`}</div>
                  <div className="monthly-price">{Productvar.price_range}</div>
                  <div className="links-wrapper">
                    <ul>
                      <li>
                        <Link to={`/iphone/${Productvar.product_id}`}>
                          Learn more
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`col-sm-12 col-md-6 order-${
                    i % 2 === 0 ? "2" : "1"
                  }`}
                >
                  <div className="product-image">
                    <img src = {Productvar.product_img} alt="images" />
                  </div>
                </div>
              </div>
            );
            return productsection;
          })}
        </div>
      </section>
    </>
  );
}

export default Iphone