import React from "react";
import Layout from "../../component/Layout";
import Random from "../../component/Recipes/Random";
import Vegetarian from "../../component/Recipes/Vegetarian";

function Recipes() {
  return (
    <Layout>
      <Random />
      <Vegetarian />
    </Layout>
  );
}

export default Recipes;
