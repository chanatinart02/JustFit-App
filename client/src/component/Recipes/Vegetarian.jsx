import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Vegetarian() {
  const [vegetarian, setVegetarian] = useState([]);
  useEffect(() => {
    getVegetarian();
  }, []);

  const getVegetarian = async () => {
    const endpoint = `https://api.spoonacular.com/recipes/random?apiKey=${
      import.meta.env.VITE_APP_API_KEY
    }&number=9&diet=vegetarian`;

    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data.recipes);
    setVegetarian(data.recipes);
  };

  return (
    <div className="wrapper">
      <h3 className="title">Recommend menu</h3>

      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "2rem",
          breakpoints: {
            768: {
              perPage: 1,
            },
          },
        }}
      >
        {vegetarian &&
          vegetarian.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <div className="card">
                  <Link to={"/recipes/" + recipe.id}>
                    <img src={recipe.image} alt={recipe.title} />
                    <h5>{recipe.title}</h5>
                  </Link>
                </div>
              </SplideSlide>
            );
          })}
      </Splide>
    </div>
  );
}

export default Vegetarian;
