import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; 

const Wines = () => {
  const [wines, setWines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.sampleapis.com/wines/reds');
        setWines(response.data);
      } catch (error) {
        console.log('Error al recuperar los datos de los vinos: ', error);
      }
    };
    fetchData();
  }, []);

  const handleReset = () => {
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = wines.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container my-4 bg-dark p-4">
      <h1 className="text-center text-white bg-dark p-3 mb-4">Wines Carousel</h1>
      <div id="wineCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {currentItems.map((wine, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <div className="row">
                <div className="col-md-6 col-lg-4 mx-auto">
                  <div className="card mb-4">
                  <div className="card-body d-flex align-items-center text-justify">
                  <img src={wine.image} className="card-img-top mr-3 mb-3 mb-md-0" alt={wine.wine} /> 
                  <div className="card-content bg-white p-3">
                   <h5 className="card-title">{wine.wine}</h5>
                   <p className="card-text">Winery: {wine.winery}</p>
                   <p className="card-text">Rating: {wine.rating.average} ({wine.rating.reviews})</p>
                   <p className="card-text">Location: {wine.location}</p>
                   <p className="card-text">Year: {wine.year}</p> {/* Año de cosecha */}
                   <p className="card-text">Grape Variety: {wine.grapeVariety}</p> {/* Variedad de uva */}
                   <p className="card-text">Description: {wine.description}</p> {/* Descripción del vino */}
                   <p className="card-text">Pairing: {wine.pairing}</p> {/* Maridaje */}
                   <p className="card-text">Price: ${wine.price}</p> {/* Precio */}
                   </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev btn btn-primary" type="button" data-bs-target="#wineCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next btn btn-success" type="button" data-bs-target="#wineCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
export default Wines;