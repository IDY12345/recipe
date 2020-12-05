import React from "react";
import { useEffect, useState } from "react";
import './App.css';
import Default from "./Default";
import Recipe from "./Recipe";

function Home() {
    const APP_ID = "YOUR_APP_ID";
    const APP_KEY = "YOUR_APP_KEY";

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");

    useEffect(async () => {
        GET_RECIPES();
    }, [query]);

    const GET_RECIPES = async () => {
        const RESPONCE = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        const DATA = await RESPONCE.json();
        setRecipes(DATA.hits);
    };

    const UPDATE_SEARCH = event => {
        setSearch(event.target.value);
    };

    const GET_SEARCH = event => {
        event.preventDefault();
        setQuery(search);
    }

    if (!(query === "")) {
        return (
            <div className="App">
                <div className="title">
                    <h1>Recipes Finder</h1>
                </div>
                <form onSubmit={GET_SEARCH} className="search-form">
                    <input className="search-bar" type="text" placeholder="Find Recipes" value={search} onChange={UPDATE_SEARCH} />
                    <button className="search-button" type="submit">Search</button>
                </form>
                <div className="recipe-container">
                    {recipes.map((recipe) => (
                        <Recipe
                            title={recipe.recipe.label}
                            calories={Math.round(recipe.recipe.calories)}
                            image={recipe.recipe.image}
                            key={recipe.recipe.title}
                            url={recipe.recipe.url}
                            source={recipe.recipe.source}
                        />
                    ))}
                </div>
                <div id="edamam-badge" data-color="transparent"></div>
            </div>

        );
    } else {
        return (
            <div className="App">
                <div className="title">
                    <h1>Recipes Finder</h1>
                </div>
                <form onSubmit={GET_SEARCH} className="search-form">
                    <input className="search-bar" type="text" placeholder="Find Recipes" value={search} onChange={UPDATE_SEARCH} />
                    <button className="search-button" type="submit">Search</button>
                </form>
                <div className="recipe-container">
                    <Default />
                </div>
                <div id="edamam-badge" data-color="transparent"></div>
            </div>
        )
    }
}

export default Home;