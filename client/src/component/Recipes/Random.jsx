import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
import "./Random.css";

function Random() {
  const [random, setRandom] = useState([]);

  useEffect(() => {
    getRandom();
  }, []);

  const getRandom = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${
        import.meta.env.VITE_APP_API_KEY
      }&number=9&cuisine=korean`
    );
    const data = await api.json();
    localStorage.setItem("random", JSON.stringify(data.recipes));
    setRandom(data.recipes);
    console.log(data.recipes);
  };

  return (
    <div className="wrapper">
      <h3 className="title">Dish of the day</h3>

      <Splide
        options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "4rem",
          breakpoints: {
            768: {
              perPage: 1,
            },
          },
        }}
      >
        {random &&
          random.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <div className="card random">
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

export default Random;
