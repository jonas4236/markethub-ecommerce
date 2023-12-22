import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ProductDetails from "../components/ProductDetails";
import RelatedItems from "../components/RelatedItems";
import axios from "axios";
import { useParams } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);

  const { slug } = useParams();
  // console.log("slug: ", slug);

  useEffect(() => {
    const fetchPd = async () => {
      const res = await axios.get(
        `http://localhost:1337/api/products?populate=*&filters[slug][$eq]=${slug}`
      );

      setProduct(res.data);
    };

    fetchPd();
  }, [slug]);

  // console.log("DATA SP: ", product);
  const pd = product.data?.[0]?.attributes?.name;
  // const dataImg = product.data?.[0]?.attributes.Images.data[0].attributes.url;
  const categoryy = product.data?.[0]?.attributes;
  const size = product.data?.[0]?.attributes.size;
  const slugRelated =
    product.data?.[0]?.attributes.categories.data[0].attributes.slug;
  const test = product.data;
  // const pro = product.data?.[0]?.attributes;
  const Categorys = test?.[0]?.attributes.Images.data;

  // console.log("TEST: ",size)

  useEffect(() => {
    const fetchRelated = async () => {
      const res = await axios.get(
        `http://localhost:1337/api/products?populate=*&filters[categories][slug][$eq]=${slugRelated}&filters[slug][$ne]=${slug}`
      );

      setRelatedProduct(res.data);
    };

    fetchRelated();
  }, [slugRelated, slug]);

  // console.log("TEST: ", slugRelated);
  // console.log("productRelated: ", relatedProduct);

  return (
    <>
      <div className="">
        <div className="w-[1200px] mx-auto">
          <div className="mt-16">
            <span className="text-[16px] font-medium text-gray-500">
              Product /{" "}
              <span className="text-[16px] font-medium text-[#DB4444]">
                {categoryy?.categories.data[0].attributes.name} /{" "}
                <span className="text-[16px] font-medium text-[#DB4444]">
                  {pd}
                </span>
              </span>
            </span>
          </div>

          <div className="flex gap-16 mt-16">
            <div className="flex-[2]">
              <div className="">
                <Carousel
                  showArrows={true}
                  infiniteLoop={true}
                  showIndicators={false}
                  showStatus={false}
                  thumbWidth={120}
                  className="productCarousel w-[600px]"
                >
                  {Categorys?.map((images, idx) => (
                    <img
                      className="h-[600px] object-contain bg-[#F5F5F5]"
                      src={images.attributes.url}
                      key={""}
                      alt=""
                    />
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="flex-[2]">
              <ProductDetails product={product} size={size} />
            </div>
          </div>
          <div className="">
            <RelatedItems product={relatedProduct} slug={slugRelated} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
