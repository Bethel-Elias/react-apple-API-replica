import React from 'react';
import { useEffect,useState } from 'react';
import { data, useParams } from 'react-router-dom';
import Four04 from '../Four04/Four04';

function SingleAppleProduct() {
    let [single,setsingle] = useState([]);
    let { ID } = useParams();

    useEffect(() => {
        fetchData();
    },[ID]);

    let fetchData = async () => {
        try{
            let res = await fetch(`http://localhost:4000/iphone/${ID}`);
            let data = await res.json();
            setsingle(data.productsall);
            console.log(data);
        }catch(error) {}
    };
console.log(single);
    if(single.length){
        return (
          <>
                <section className="internal-page-wrapper">
                    <div className="container">
                        {single?.map((singlepage) => {
                            return (
                              <div key={singlepage.product_id}>
                                <div className="row justify-content-center text-center">
                                  <div className="col-12 mt-5 pt-5">
                                    <div className="title-wrapper font-weight-bold">
                                      {singlepage.product_name}
                                    </div>
                                    <div className="brief-description">
                                      {singlepage.product_brief_description}
                                    </div>
                                  </div>
                                </div>
                                <div className="row justify-content-center text-center h-100 m-5">
                                  <div className="col-sm-12 col-md-6 my-auto">
                                    <div className="starting-price">{`Starts at ${singlepage.starting_price}`}</div>
                                    <div className="monthly-price">
                                      {singlepage.price_range}
                                    </div>
                                    <div className="product-details">
                                      {singlepage.product_description}
                                    </div>
                                  </div>
                                  <div className="col-sm-12 col-md-6">
                                    <div className="product-image">
                                      <img
                                        src={singlepage.product_img}
                                        alt="image"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                        })};
                    </div>
                </section>
          </>       
        );
    
    }else{
        return<Four04/>;
    } 
}

export default SingleAppleProduct