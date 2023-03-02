import { filterDataByFields } from "./utils";

const API_URI = "https://www.thecocktaildb.com/api/json/v1/1";

export async function getPopularCocktails() {
  try {
    const cocktails = [];
    const startId = 11000;
    const endId = 11007;
    for (let i = startId; i <= endId; i++) {
      const res = await fetch(`${API_URI}/lookup.php?i=${i}`);
      const data = await res.json();
      const cocktail = data.drinks[0];
      cocktails.push(cocktail);
    }
    return cocktails;
  } catch (err) {
    console.error(err);
  }
}

export async function getCocktailsByFirstLetter(firstLetter: string) {
  try {
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`
    );
    const data = await res.json();
    const cocktails = data.drinks || [];
    return cocktails;
  } catch (err) {
    console.error(err);
  }
}

export async function getAllCocktails() {
  try {
    let allCocktails: any[] = [];
    for (let i of "12345679abcdefghijklmnopqrstvwyz") {
      const cocktails = await getCocktailsByFirstLetter(i);
      const filteredCocktails = filterDataByFields(cocktails, [
        "idDrink",
        "strDrink",
        "strDrinkThumb",
      ]);
      allCocktails = [...allCocktails, ...filteredCocktails];
    }
    return allCocktails;
  } catch (err) {
    console.error(err);
  }
}

export async function getAllCocktailIdsAndNames() {
  try {
    let allCocktails: any[] = [];
    for (let i of "12345679abcdefghijklmnopqrstvwyz") {
      const cocktails = await getCocktailsByFirstLetter(i);
      const filteredCocktails = filterDataByFields(cocktails, [
        "idDrink",
        "strDrink",
      ]);
      allCocktails = [...allCocktails, ...filteredCocktails];
    }
    return allCocktails;
  } catch (err) {
    console.error(err);
  }
}

export async function getCocktailDetailsById(id: number) {
  try {
    const res = await fetch(`${API_URI}/lookup.php?i=${id}`);
    const data = await res.json();
    const cocktail = data.drinks ? data.drinks[0] : {};
    return cocktail;
  } catch (err) {
    console.error(err);
  }
}

export async function getCocktailsByCategory(category: string) {
  try {
    const res = await fetch(`${API_URI}/filter.php?c=${category}`);
    const data = await res.json();
    const cocktails = data.drinks || [];
    return cocktails;
  } catch (err) {
    console.error(err);
  }
}

export async function getCocktailsByIngredient(ingredientName: string) {
  try {
    const res = await fetch(`${API_URI}/filter.php?i=${ingredientName}`);
    const data = await res.json();
    const cocktails = data.drinks || [];
    return cocktails;
  } catch (err) {
    console.error(err);
  }
}

export async function searchCocktailByName(query: string) {
  try {
    const res = await fetch(`${API_URI}/search.php?s=${query}`);
    const data = await res.json();
    const cocktails = data.drinks || [];
    return cocktails;
  } catch (err) {
    console.error(err);
  }
}

export async function getIngredientByID(id: number) {
  try {
    const res = await fetch(`${API_URI}/lookup.php?iid=${id}`);
    const data = await res.json();
    const ingredient = data.ingredients[0];
    return ingredient;
  } catch (err) {
    console.error(err);
  }
}

export async function getPopularIngredients() {
  try {
    const popularIngredients = [];
    for (let i = 1; i <= 4; i++) {
      let ingredient = await getIngredientByID(i);
      popularIngredients.push(ingredient);
    }
    return popularIngredients;
  } catch (err) {
    console.error(err);
  }
}

export async function getAllIngredients() {
  try {
    const res = await fetch(`${API_URI}/list.php?i=list`);
    const data = await res.json();
    const allIngredients = data.drinks.sort((a: any, b: any) =>
      a.strIngredient1.localeCompare(b.strIngredient1)
    );
    return allIngredients;
  } catch (err) {
    console.error(err);
  }
}

export async function getIngredientByName(ingredientName: string) {
  try {
    const res = await fetch(`${API_URI}/search.php?i=${ingredientName}`);
    const data = await res.json();
    const ingredient = data.ingredients[0];
    return ingredient;
  } catch (err) {
    console.error(err);
  }
}
