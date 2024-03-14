import React, { useContext } from "react";
import { BsBagHeart } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";

// Lightbox
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import FullScreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import { AuthContext } from "./Context/AuthContext";

const AddToCart = ({
  thumbnail,
  name,
  wlId,
  username,
  title,
  slug,
  category,
  priceperpiece,
  image,
  discount,
  isExist,
}) => {
  const [open, setOpen] = React.useState(false);

  const { addWishlist } = useContext(AuthContext);

  const handleAddedWishlist = async (event) => {
    event.preventDefault();

    await addWishlist({
      wlId,
      username,
      title,
      slug,
      category,
      priceperpiece,
      image,
      discount,
    });
  };

  // console.log("wlId:",wlId)
  // console.log("username:",username)
  // console.log("title:",title)
  // console.log("slug:",slug)
  // console.log("category:",category)
  // console.log("priceperpiece:",priceperpiece)
  // console.log("image:",image)
  // console.log("discount:",discount)

  // console.log("isExist:", isExist);

  return (
    <>
      <span
        onClick={() => setOpen(true)}
        className="absolute bg-black text-white hover:bg-black hover:text-[#DB4444] top-[15px] p-[8px] rounded-full right-[24px]"
      >
        <Lightbox
          open={open}
          plugins={[Zoom, FullScreen, Captions]}
          close={() => setOpen(false)}
          slides={[
            {
              src: thumbnail,
              alt: "IMAGE_TOGGLE_THUMBNAIL",
              title: name,
            },
          ]}
          zoom={{
            scrollToZoom: true,
            maxZoomPixelRatio: 5,
          }}
        />
        <AiOutlineEye className="hover:bg-black hover:text-[#DB4444]" />
      </span>
      {!isExist && (
        <span
          onClick={handleAddedWishlist}
          className="absolute bottom-[0px] w-full bg-black text-white rounded-[0_0_6px_6px] flex justify-center items-center font-medium h-[40px]"
        >
          Add To Wishlist
        </span>
      )}
    </>
  );
};

export default AddToCart;
