import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import './Cart.css';

import { addToCart, getList, reduceFromCart } from '../../app/reducers/productsSlice';
import { formatToUSD } from '../../utils';

export function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(getList);

  const pInCart = products.filter(e => e.quantity)
  const totalItems = pInCart.length || 0
  const handleBackToHomeClick = () => navigate('/')
  const totalSavings = pInCart.filter(e => e.original_price && e.original_price > e.final_price).reduce((a, b) => a + (b.quantity * (b.original_price - b.final_price)), 0)
  const tax = 2;
  const deliveryFee = 5
  const totalAmont = tax + deliveryFee + pInCart.reduce((a, b) => a + (b.quantity * b.final_price), 0)


  return (
    <div className='cart-container p-16'>
      <div onClick={() => handleBackToHomeClick()} className='text-detail cursor-pointer'><FontAwesomeIcon icon={faArrowLeft} /><span className='m-l-8 '>Back to Home</span></div>
      {
        totalItems ?
          <>
            <div className='primary-heading'>Order Summary ({totalItems})</div>
            <div className='cart-subcontainer'>
              <div className='p-16 summary-box'>
                <div className='flex-row table-h m-b-24 '>
                  <div className='flex-1'>S. NO.</div>
                  <div className='flex-2'>ITEMS</div>
                  <div className='flex-2 '>QTY</div>
                </div>
                <hr></hr>
                {
                  pInCart.map((p, i) =>
                    <div key={i} className='table-row m-b-24'>
                      <div className='flex-1 '>{i + 1}</div>
                      <div className='flex-2'>{p.name}</div>
                      <div className='flex-row flex-2  quantity-wrapper'>
                        <button className="btn counter-wrap-btn-sm" onClick={() => dispatch(reduceFromCart({ id: p.id, quantity: p.quantity }))}>-</button>
                        <div className="width-half text-center">{p.quantity}</div>
                        <button className="btn counter-wrap-btn-sm" onClick={() => dispatch(addToCart({ id: p.id, quantity: p.quantity }))}>+</button>
                      </div>
                    </div>)
                }
                <hr></hr>
                <div className='text-primary'>Add more items +</div>
              </div>
              <div className='p-16 order-box  '>
                <div className='secondary-heading m-b-24'>Price Details</div>
                <hr></hr>
                {
                  pInCart.map((e, i) =>
                    <div key={i} className='flex-row spc-btwn m-b-24 order-row'>
                      <div className='flex-row'>
                        <span>{e.quantity}</span>
                        <span>&nbsp;x&nbsp;</span>
                        <span>{formatToUSD(e.final_price)}</span>
                      </div>
                      <div>{formatToUSD(e.final_price * e.quantity)}</div>
                    </div>
                  )
                }
                <hr></hr>
                {totalSavings ?
                  <div className='flex-row spc-btwn m-b-16'>
                    <div className='text-detail'>Total Savings</div>
                    <div className='text-success'>{formatToUSD(-totalSavings)}</div>
                  </div> : <></>
                }
                <div className='flex-row spc-btwn m-b-16'>
                  <div className='text-detail'>Delivery Fee</div>
                  <div>{formatToUSD(5)}</div>
                </div>
                <div className='flex-row spc-btwn m-b-16'>
                  <div className='text-detail'>Taxes and Charges&nbsp;<span><FontAwesomeIcon icon={faCircleInfo} /></span></div>
                  <div >{formatToUSD(2)}</div>
                </div>
                <hr></hr>
                <div className='flex-row spc-btwn m-b-16'>
                  <div className='secondary-heading'>To Pay</div>
                  <div className='currency-text'>{formatToUSD(totalAmont)}</div>
                </div>
              </div>
            </div>
          </>
          :
          <div>
            <div className='primary-heading'>
              No Items in Cart!</div>
          </div>
      }
    </div>
  )
}