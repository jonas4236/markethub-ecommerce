import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

const CartItems = ({ item, quan }) => {
  // console.log("item:", item);
  const [quantity, setQuantity] = useState(quan);

  const { removeCart, updateCart, updateQuantiy } = useContext(AuthContext);

  const formattedText = (name) => {
    if (name.length <= 16) {
      return name;
    } else {
      return name.substring(0, 16) + "...";
    }
  };

  // useEffect(() => {
  //   setQuantity(item.attributes.quantity);
  // }, [item.attributes.quantity]);

  const total = (p, q) => {
    return p * q;
  };

  const handleRemovedCart = async (id) => {
    await removeCart(id);
  };

  const handleSizeChange = async (idProduct, sizeSingleProduct) => {
    await updateCart(idProduct, sizeSingleProduct);
  };

  const handleQuantityChange = async (idProduct, countOfQuan) => {
    await updateQuantiy(idProduct, countOfQuan);
  };

  return (
    <>
      <div className="flex gap-10 px-12 py-4 my-6 shadow-lg">
        <div className="flex-[1] justify-center items-center">
          <div className="flex items-center relative">
            <img
              className="w-[54px] h-[54px] object-contain"
              src={item.attributes.image}
              alt={item.attributes.title}
            />
            <button
              onClick={() => handleRemovedCart(item.id)}
              className="absolute top-[-9px] left-[-6px] w-5 h-5 flex justify-center items-center rounded-full bg-[#DB4444] text-white font-medium"
            >
              x
            </button>
            <div className="flex-col w-full">
              <span className="w-max ml-3 text-[#DB4444] font-medium">
                {formattedText(item.attributes.title)}
              </span>
              {item?.attributes.size && (
                <div className="flex ml-3">
                  <span>Size:</span>
                  <select
                    onChange={(e) => handleSizeChange(item.id, e.target.value)}
                    className="outline-none cursor-pointer"
                  >
                    {item?.attributes.size?.data?.map((data, i) => {
                      return (
                        <option
                          key={i}
                          value={data.size}
                          disabled={!data.enabled ? true : false}
                          selected={item.attributes.selectedSize === data.size}
                        >
                          {data.size}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-[1] justify-center items-center">
          <div className="flex items-center w-full h-full justify-center">
            <span className="text-[#DB4444] h-full flex items-center font-medium">
              ฿{item.attributes.price}
            </span>
          </div>
        </div>

        <div className="flex-[1] w-max flex justify-center">
          <div className="flex w-[180px] items-center justify-between h-full rounded-md border-black border-[1px]">
            <button
              className="mr-2 border-r-[1px] border-black h-full w-10 flex items-center justify-center text-black text-2xl"
              onClick={(e) => {
                const minusQuantity = quantity - 1;
                setQuantity(minusQuantity < 1 ? 1 : minusQuantity);
                handleQuantityChange(item.id, minusQuantity);
                // console.log("quan minus:", minusQuantity);
              }}
            >
              -
            </button>
            <span className="flex items-center mx-4 font-medium">
              {quantity}
            </span>
            <button
              className="ml-2 h-full bg-[#DB4444] w-10 flex items-center justify-center rounded-[0_6px_6px_0] text-white text-2xl"
              onClick={(e) => {
                const plusQuantity = quantity + 1;
                setQuantity(plusQuantity);
                handleQuantityChange(item.id, plusQuantity);
                // console.log("quan plus:", plusQuantity);
              }}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex-[1] justify-center items-center">
          <div className="flex items-center w-full h-full justify-center">
            <span className="text-[#DB4444] h-full flex items-center font-medium">
              ฿{total(item.attributes.price, quantity)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItems;
