import React, { useEffect, useState } from "react";
import Featured2 from "./FeaturedButtom/Featured2";
import Featured3 from "./FeaturedButtom/Featured3";
import Featured4 from "./FeaturedButtom/Featured4";
import Featured5 from "./FeaturedButtom/Featured5";
import axios from "axios";

const Featured = () => {
  const [footcat, setFootcat] = useState([]);

  useEffect(() => {
    const fetchFootcate = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1337/api/footer-categories?populate=*"
        );

        setFootcat(res.data);
      } catch (err) {
        console.log("error: ", err);
      }
    };

    fetchFootcate();
  }, []);

  const data1 = footcat.data?.[0];
  const data2 = footcat.data?.[1];
  const data3 = footcat.data?.[2];
  const data4 = footcat.data?.[3];

  // console.log("footcat: ",footcat)

  return (
    <>
      <div className="2xl:w-[1200px] xl:w-[1200px] lg:w-full xl:px-0 px-8 mx-auto mt-[80px]">
        <div className="xl:grid lg:grid md:flex-col grid-cols-6 grid-rows-6 gap-4 xl:h-[650px] lg:h-[650px] md:h-full mb-4">
          <div className="col-span-2 row-span-6 my-2">
            <Featured5 cate={data1} />
          </div>
          <div className="col-span-4 row-span-3 col-start-3 my-2">
            <Featured2 cate={data2} />
          </div>
          <div className="col-span-2 row-span-3 col-start-3 row-start-4 my-2">
            <Featured3 cate={data3} />
          </div>
          <div className="col-span-2 row-span-3 col-start-5 row-start-4 my-2">
            <Featured4 cate={data4} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;
