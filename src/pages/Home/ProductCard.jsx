import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, reduceFromCart } from "../../app/reducers/productsSlice";
import { formatToUSD } from "../../utils";

function ProductCard(e) {
  const dispatch = useDispatch();
  const { details: productDetail } = e;
  return (
    <div className="flex-col product-card">
      <div className="">
        <img className="img-wrap m-b-24" src={productDetail.img_url} alt=""></img>
        <div className="flex-row spc-btwn m-b-8">
          <div className="secondary-heading">{productDetail.name}</div>
          <div className="currency-text">{typeof productDetail.original_price === "number" ? <span className="original-price-tag m-r-24">{formatToUSD(productDetail.original_price)}</span> : <></>}{formatToUSD(productDetail.final_price)}</div>
        </div >
        <div className="text-desc m-b-16">
          {productDetail.description}
        </div>
      </div>
      {
        productDetail.quantity > 0 ?
          <>
            <div className="flex-row counter-wrap" >
              <button className="btn counter-wrap-btn" onClick={() => dispatch(reduceFromCart({ id: productDetail.id, quantity: productDetail.quantity }))}>-</button>
              <div className="width-half text-center">{productDetail.quantity}</div>
              <button className="btn counter-wrap-btn" onClick={() => dispatch(addToCart({ id: productDetail.id, quantity: productDetail.quantity }))}>+</button>
            </div>
          </>
          :
          <>
            <button className="btn primary-btn" onClick={() => dispatch(addToCart({ id: productDetail.id, quantity: productDetail.quantity }))}>Add to Cart</button>
          </>
      }


    </div>
  );
}

export default ProductCard;
