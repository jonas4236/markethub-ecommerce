import React, { useContext, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ProductDetails from "../components/ProductDetails";
import RelatedItems from "../components/RelatedItems";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductReview from "../components/Reviews/ProductReview";
import { AuthContext } from "../components/Context/AuthContext";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [rating, setRating] = useState({ stars: null, count: 0 });
  const [isProductUpdate, setIsProductUpdate] = useState(false);

  const { token } = useContext(AuthContext);

  const { slug } = useParams();

  // console.log("slug:", slug);

  useEffect(() => {
    const fetchPd = async () => {
      const res = await axios.get(
        `${process.env.API_STRAPI}/api/products?populate=*&filters[slug][$eq]=${slug}`
      );

      setProduct(res.data);
      setIsProductUpdate(false);
    };

    fetchPd();
  }, [slug, isProductUpdate]);

  const id = product.data?.[0]?.id;

  // console.log("product:", product);
  // console.log("token:", token);

  const productName = product.data?.[0]?.attributes?.name;
  const productMainCategoryName = product.data?.attributes?.name;
  const categoryy = product.data?.[0]?.attributes;
  const size = product.data?.[0]?.attributes.size;
  const slugRelated =
    product.data?.[0]?.attributes.categories.data[0]?.attributes?.slug || "";
  const slugMainCategory =
    product.data?.[0]?.attributes.main_category.data?.attributes?.slug;
  const slugFooterCategory =
    product.data?.[0]?.attributes.footer_category.data?.attributes?.slug;
  const productData = product.data;
  const Categorys = productData?.[0]?.attributes.Images.data;

  const findProductRelated =
    slugRelated || slugMainCategory || slugFooterCategory;
  const findCategories = slugRelated
    ? "categories"
    : slugMainCategory
    ? "main_category"
    : slugFooterCategory
    ? "footer_category"
    : null;

  useEffect(() => {
    if (!findCategories || !findProductRelated || !slug) {
      return;
    }

    const apiUrl = `${process.env.API_STRAPI}/api/products?populate=*&filters[${findCategories}][slug][$eq]=${findProductRelated}&filters[slug][$ne]=${slug}`;
    // console.log("API URL:", apiUrl);
    const fetchRelated = async () => {
      const res = await axios.get(apiUrl);

      setRelatedProduct(res.data);
    };

    fetchRelated();
  }, [findProductRelated, findCategories, setRelatedProduct, slug]);

  // console.log("findCategories:", findCategories);
  // console.log("findProductRelated:", findProductRelated);
  // console.log("relatedProduct:", relatedProduct);

  return (
    <>
      <div className="">
        <div className="2xl:w-[1200px] xl:w-[1200px] lg:w-full xl:px-0 px-8 mx-auto">
          <div className="mt-16">
            <span className="text-[16px] font-medium text-gray-500">
              Product /{" "}
              <span className="text-[16px] font-medium text-[#DB4444]">
                {categoryy?.categories.data[0]?.attributes.name ||
                  categoryy?.main_category.data?.attributes.name ||
                  categoryy?.footer_category.data?.attributes.name}{" "}
                /{" "}
                <span className="text-[16px] font-medium text-[#DB4444]">
                  {productName || productMainCategoryName}
                </span>
              </span>
            </span>
          </div>

          <div className="flex gap-16 mt-16 flex-col xl:flex-row">
            <div className="flex-[3]">
              <div className="">
                <Carousel
                  showArrows={true}
                  infiniteLoop={true}
                  showIndicators={false}
                  showStatus={false}
                  swipeable={true}
                  emulateTouch={true}
                  swipeScrollTolerance={100}
                  thumbWidth={120}
                  swipe={true}
                  className="productCarousel w-full"
                  axis="horizontal"
                >
                  {Categorys?.map((images, idx) => (
                    <img
                      className="h-[600px] w-full object-contain bg-[#F5F5F5]"
                      src={images.attributes.url}
                      key={idx}
                      alt="IMAGE_DETAILS"
                    />
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="flex-[2]">
              <ProductDetails product={product} size={size} />
            </div>
          </div>
          <div className="mt-20">
            <ProductReview
              token={token}
              productId={id}
              setRating={setRating}
              setIsProductUpdate={setIsProductUpdate}
            />
          </div>
          <div className="">
            <RelatedItems product={relatedProduct} slug={findProductRelated} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
