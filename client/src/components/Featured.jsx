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

        setFootcat(res.data)
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
      <div className="w-[1200px] mx-auto mt-[80px]">
        <div className="grid grid-cols-6 grid-rows-6 gap-4 h-[600px]">
          <div className="col-span-2 row-span-6">
            <Featured5 cate={data1} />
          </div>
          <div className="col-span-4 row-span-3 col-start-3">
            <Featured2 cate={data2} />
          </div>
          <div className="col-span-2 row-span-3 col-start-3 row-start-4">
            <Featured3 cate={data3} />
          </div>
          <div className="col-span-2 row-span-3 col-start-5 row-start-4">
            <Featured4 cate={data4} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;
