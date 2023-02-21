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
