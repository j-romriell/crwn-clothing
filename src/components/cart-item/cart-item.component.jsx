import React from 'react';

import './cart-item.styles.scss';

const CartItem = ({ item: { imageUrl, price, name, quantity }}) => (
    <div className='cart-item'>
        <img src={imageUrl} alt='item'></img>
        <div className='item-details'>
            <span calssName='name'>{name}</span>
            <span calssName='price'>
                {quantity} x ${price}
            </span>
        </div>
    </div>
)

export default CartItem;