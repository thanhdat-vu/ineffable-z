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
