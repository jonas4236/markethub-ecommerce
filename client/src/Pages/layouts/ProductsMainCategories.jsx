import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PriceSubCate from "../../components/filters/PriceSubCate";
import SortBy from "../../components/filters/SortBy";
import Stars from "../../components/filters/Stars";
import ListItems from "../../components/ListItems";

const Products = () => {
  const { slug } = useParams();
  // console.log("slug:", slug)

  const [products, setProducts] = useState([]);

  // state for filter min/max price
  const [priceFilterActive, setPriceFilterActive] = useState(false);
  const [priceFilterMin, setPriceFilterMin] = useState("");
  const [priceFilterMax, setPriceFilterMax] = useState("");
  const [countOfResultFilter, setCountOfResultFilter] = useState(null);

  // state for filter sort low/high price
  const [sorted, setSorted] = useState(null);

  // state for filter by stars
  const [starFilterActive, setStarFilterActive] = useState(false);
  const [starSorted, setStarSorted] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1337/api/products?populate=*&filters[main_category][slug][$eq]=${slug}`
        );

        setProducts(res.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchData();
  }, [slug]);
//   console.log("products:", products);


  // -------------------- filter min/max price --------------------------
  const filterMinMaxPrice = (min, max) => {
    setPriceFilterActive(true);
    setPriceFilterMin(min);
    setPriceFilterMax(max);
  };

  const clearFilters = () => {
    setPriceFilterActive(false);
    setPriceFilterMax("");
    setPriceFilterMin("");
    setCountOfResultFilter("");
  };
  // -------------------- filter min/max price --------------------------

  // -------------------- filter sorted by stars --------------------------
  const filterSortedByStars = (stars) => {
    setStarFilterActive(true);
    setStarSorted(stars);
  };

  const clearStarFilter = () => {
    setStarFilterActive(false);
    setStarSorted("");
  };
  // -------------------- filter sorted by stars --------------------------

  return (
    <>
      <div className="">
        <div className="2xl:w-[1600px] xl:w-full lg:w-full 2xl:px-0 xl:px-8 px-8 mx-auto flex lg:justify-center md:justify-center sm:justify-center max-[639px]:justify-center max-[639px]:items-center xl:items-baseline lg:items-center md:items-center sm:items-center xl:flex-row lg:flex-col md:flex-col sm:flex-col max-[639px]:flex-col gap-16">
          <div className="flex-[1] xl:w-full lg:w-max h-max bg-white shadow-xl p-4 mt-4 rounded-lg xl:sticky top-[90px]">
            <div className="">
              <h2 className="text-[30px]">FILTERS 🔍</h2>
              <div className="w-full h-[1px] mt-2 mb-2 bg-black"></div>
              <h3 className="text-[22px]">Prices</h3>
              <PriceSubCate
                clearFilters={clearFilters}
                filterMinMaxPrice={filterMinMaxPrice}
                priceFilterMin={priceFilterMin}
                priceFilterMax={priceFilterMax}
              />
              <div className="w-full h-[1px] mt-2 mb-2 bg-black"></div>
              <h3 className="text-[22px]">Sort By</h3>
              <SortBy setSorted={setSorted} />
              <div className="w-full h-[1px] mt-2 mb-2 bg-black"></div>
              <h3 className="text-[22px]">By Rating</h3>
              <div className="mt-2">
                <Stars
                  filterSortedByStars={filterSortedByStars}
                  clearStarFilter={clearStarFilter}
                />
              </div>
            </div>
          </div>
          <div className="flex-[4]">
            <div className="mt-8">
              <span className="text-black text-2xl">
                Result Of{" "}
                <span className="text-[#DB4444] font-medium capitalize">
                  {slug.includes("-") ? slug.replace("-", " ") : slug} (
                  {countOfResultFilter === null || countOfResultFilter === ""
                    ? products.meta?.pagination?.total
                      ? products.meta?.pagination?.total
                      : 0
                    : countOfResultFilter}
                  )
                </span>
              </span>
              <div className="flex xl:justify-normal lg:justify-normal md:justify-center sm:justify-center max-[639px]:justify-center">
                <ListItems
                  data={products}
                  sorted={sorted}
                  priceFilterOn={priceFilterActive}
                  priceMin={priceFilterMin}
                  priceMax={priceFilterMax}
                  starFilterOn={starFilterActive}
                  starSorted={starSorted}
                  slugCategory={slug}
                  setCountOfResultFilter={setCountOfResultFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
