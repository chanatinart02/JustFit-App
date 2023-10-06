import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../component/Layout";
import "./Recipe.css";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});

  // generate a list of menu instructions
  const generateMenuList = (menuInstructions) => {
    // Split the menu instructions string into an array of individual instructions
    const instructionsArray = menuInstructions.split(". ");

    const listItems = instructionsArray.map((instruction) => {
      return <li>{instruction.trim()}.</li>;
    });
    return <ul>{listItems}</ul>;
  };

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information/?apiKey=${
        import.meta.env.VITE_APP_API_KEY
      }`
    );

    const detailData = await data.json();
    setDetails(detailData);
    console.log(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <Layout>
      <div className="contain">
        <div className="image">
          <div className="image-container">
            <img src={details.image} />
            <div className="caption">{details.title}</div>
          </div>
        </div>
        <div className="ingredients">
          <h3>Ingredients</h3>
          <ul>
            {details &&
              details.extendedIngredients &&
              details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
          </ul>
        </div>
        <div className="instructions">
          <h3 className="text-center my-4">How to make {details.title}</h3>
          {details.analyzedInstructions &&
          details.analyzedInstructions.length > 0 ? (
            details.analyzedInstructions.map((instructionGroup) => (
              <div key={instructionGroup.name}>
                <h4>{instructionGroup.name}</h4>
                <ul className="instruction-list">
                  {generateMenuList(
                    instructionGroup.steps.map((step) => step.step).join(". ")
                  )}
                </ul>
              </div>
            ))
          ) : (
            <p>No instructions found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Recipe;
