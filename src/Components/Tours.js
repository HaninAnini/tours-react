import React, {useEffect, useState} from "react";
import {data} from "../data";
import {FiRefreshCw} from 'react-icons/fi'
import Loader from "react-loader-spinner";


const Tours = () => {
  const [tours, setTours] = useState(data);
  const [isLoading, setIsLoading] = useState(true);
  const [readMore, setReadMore] = useState(false)

  const onClickDelete = (name) => {
    const newCities = tours.filter(item => item.name !== name);
    setTours(newCities)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)

  }, []);

  if (isLoading) {
    return (
      <div className={"loader"}>
        <Loader
          type="radio"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    )
  }


  return (
    <div>
      {tours.length ?
        <div className={"tours-page"}>
          <h1 className={"page-1-title"}>Our Tours</h1>
          <div className={"line"}/>
          <article className={"tours-list"}>
            {tours.map(tour => {
              const {img, name, days, price, information} = tour;
              return (
                <div key={name} className={"tour"}>
                  <img className="tour-img" src={img} alt={`${name} Photo`}/>
                  <div className="tour-data">
                    <section className={"tour-title"}>
                      <h2>{`Best Of ${name} in ${days} days`}</h2>
                      <h4><span style={{transform: "scale(1.1)"}}>$</span>{price}</h4>
                    </section>
                    <p>
                      {readMore ? information : `${information.substring(0, 200)}......`}
                      <button className={"info-button"}
                              onClick={() => setReadMore(!readMore)}>{readMore ? "Show less" : "Show more"}</button>
                    </p>
                    <button className={"delete-button"} type="button"
                            onClick={() => onClickDelete(name)}>
                      Not Interested
                    </button>
                  </div>
                </div>
              )
            })}
          </article>

        </div>
        :
        <div className={"page-2"}>
          <h1 className={"page-2-title"}> No Tours Left </h1>
          <button className={"refresh-button"} onClick={() => setTours(data)}>
            <FiRefreshCw/> Refresh
          </button>
        </div>
      }
    </div>
  );
};


export default Tours;