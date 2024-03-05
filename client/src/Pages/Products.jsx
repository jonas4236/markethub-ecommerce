import React, { useEffect, useState } from "react";
import Stars from "../components/Stars";
import SubCategories from "../components/SubCategories";
import PriceSubCate from "../components/PriceSubCate";
import ListItems from "../components/ListItems";
import axios from "axios";
import { useParams } from "react-router-dom";

const Products = () => {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1337/api/products?populate=*&filters[categories][slug][$eq]=${slug}`
        );

        setProducts(res.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    fetchData();
  }, [slug]);

  const filterProducts = () => {
    const filteredProducts = products.data?.filter((value) => {
      const productPrice = parseFloat(value.attributes.originalPrice);

      return (
        (!minPrice || productPrice >= minPrice) &&
        (!maxPrice || productPrice <= maxPrice)
      );
    });

    console.log("filteredProducts:", filteredProducts);
    setProducts(filteredProducts);
  };

  // console.log("products:", products.data.map((value) => value.attributes.originalPrice));
  // console.log("products:", products);

  const clearFilters = () => {
    setMaxPrice("");
    setMinPrice("");
    setProducts(products);
    window.location.reload();
  };

  console.log("minPrice:", minPrice);
  console.log("maxPrice:", maxPrice);

  return (
    <>
      <div className="">
        <div className="w-[1600px] mx-auto flex gap-16">
          <div className="flex-[1] w-full h-max bg-white shadow-xl p-4 mt-4 rounded-lg sticky top-[90px]">
            <div className="">
              <h2 className="text-[30px]">FILTERS 🔍</h2>
              <div className="w-full h-[1px] mt-2 mb-2 bg-black"></div>
              <h3 className="text-[22px]">Prices</h3>
              <PriceSubCate
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                minPrice={minPrice}
                maxPrice={maxPrice}
                clearFilters={clearFilters}
                filterProducts={filterProducts}
              />
              <div className="w-full h-[1px] mt-2 mb-2 bg-black"></div>
              <h3 className="text-[22px]">By Rating</h3>
              <div className="mt-2">
                <Stars />
              </div>
            </div>
          </div>
          <div className="flex-[4]">
            <div className="mt-8">
              <span className="text-black text-2xl">
                Result Of{" "}
                <span className="text-[#DB4444] font-medium capitalize">
                  {slug.includes("-") ? slug.replace("-", " ") : slug} (
                  {products.meta?.pagination?.total || products.length})
                </span>
              </span>
              <div className="grid grid-cols-4 h-full mt-8">
                {products.data ? (
                  <>
                    {products.data?.map((data) => (
                      <div className="" key={data.id}>
                        <ListItems
                          data={data}
                          minPrice={minPrice}
                          maxPrice={maxPrice}
                          slugCategory={slug}
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {products.map((data) => (
                      <div className="" key={data.id}>
                        <ListItems
                          data={data}
                          minPrice={minPrice}
                          maxPrice={maxPrice}
                          slugCategory={slug}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
