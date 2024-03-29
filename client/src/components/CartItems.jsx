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

  const handleRemovedCart = async (id) => {
    await removeCart(id);
  };

  const handleSizeChange = async (
    idProduct,
    sizeSingleProduct,
    updatedTitle
  ) => {
    await updateCart(idProduct, sizeSingleProduct, updatedTitle);
  };

  const handleQuantityChange = async (idProduct, countOfQuan) => {
    await updateQuantiy(idProduct, countOfQuan);
  };

  const subtotals = item.attributes.price * quantity;

  return (
    <>
      <div className="gap-10 px-12 py-4 my-6 shadow-xl">
        <div className="xl:grid xl:grid-cols-4 lg:grid lg:grid-cols-4 md:flex-[1]">
          <div className="flex justify-start xl:items-baseline lg:items-baseline md:items-center sm:items-center max-[639px]:items-center flex-col">
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
                      defaultValue={item.attributes.selectedSize}
                      onChange={(e) =>
                        handleSizeChange(
                          item.id,
                          e.target.value,
                          item.attributes.title
                        )
                      }
                      className="outline-none cursor-pointer"
                    >
                      {item?.attributes.size?.data?.map((data, i) => {
                        return (
                          <option
                            key={i}
                            value={data.size}
                            disabled={!data.enabled ? true : false}
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
                ฿{item.attributes.price.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex-[1] w-full flex justify-center items-center">
            <div className="flex w-[180px] items-center justify-between h-full rounded-md border-black border-[1px]">
              <button
                className="mr-2 border-r-[1px] border-black h-full w-10 flex items-center justify-center text-black text-2xl"
                onClick={() => {
                  setQuantity((prevQuantity) => {
                    const minusQuantity = prevQuantity - 1;
                    const newMinusQuantity =
                      minusQuantity < 1 ? 1 : minusQuantity;
                    handleQuantityChange(item.id, newMinusQuantity);
                    return newMinusQuantity;
                  });
                }}
              >
                -
              </button>
              <span className="flex items-center mx-4 font-medium">
                {quantity}
              </span>
              {quantity === item.attributes.stock ? (
                <button className="ml-2 h-full bg-[#CCC] w-10 flex items-center justify-center rounded-[0_6px_6px_0] text-black text-2xl">
                  +
                </button>
              ) : (
                <button
                  className="ml-2 h-full bg-[#DB4444] w-10 flex items-center justify-center rounded-[0_6px_6px_0] text-white text-2xl"
                  onClick={() => {
                    setQuantity((prevQuantity) => {
                      const plusQuantity = prevQuantity + 1;
                      const newPlusQuantity =
                        plusQuantity >= item.attributes.stock
                          ? item.attributes.stock
                          : plusQuantity;
                      handleQuantityChange(item.id, newPlusQuantity);
                      return newPlusQuantity;
                    });
                  }}
                >
                  +
                </button>
              )}
            </div>
          </div>

          <div className="flex-[1] justify-center items-center">
            <div className="flex items-center w-full h-full justify-center">
              <span className="text-[#DB4444] h-full flex items-center font-medium">
                ฿{subtotals.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItems;
