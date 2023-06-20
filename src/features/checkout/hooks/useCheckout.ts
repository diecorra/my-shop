import { selectCartList, selectTotalCartCost, useCart } from '@/services/cart';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useCheckout() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '' });
  const [dirty, setDirty] = useState(false);
  const totalCartCost = useCart(selectTotalCartCost);
  const order = useCart(selectCartList);
  const clearCart = useCart((state) => state.clearCart);

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setDirty(true);

    setUser((state) => ({ ...state, [name]: value }));
  }

  function sendOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const orderInfo = {
      user,
      order,
      status: 'pending',
      total: totalCartCost,
    };
    console.log(orderInfo);
    clearCart();
    navigate('/thankyou');
  }

  const isNameValid = user.name.length;
  const isEmailValid = user.email.match(EMAIL_REGEX);
  const isValid = isNameValid && isEmailValid;

  return {
    validators: {
      isNameValid,
      isEmailValid,
      isValid,
    },
    actions: {
      sendOrder,
      changeHandler,
    },
    totalCartCost,
    user,
    dirty,
  };
}
