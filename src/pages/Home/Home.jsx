import React from "react";
import { useSelector } from "react-redux";
import { getList } from "../../app/reducers/productsSlice";
import ProductCard from "./ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

export function Home() {
  const products = useSelector(getList);
  return (
    <>
      <div className="heading-container">
        <div className="primary-heading m-b-24">Most Popular</div>
        <div className="hr-wrap">
          <div className="hr-line"></div>
          <div className="star-icon"><FontAwesomeIcon icon={faStar} /></div>
          <div className="hr-line"></div>
        </div>
      </div>

      <div className="flex-row products-wrapper">
        {products.map((p, i) => (
          <ProductCard key={p.id} details={p} />
        ))}
      </div>
    </>
  );
}
