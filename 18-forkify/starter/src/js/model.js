export const state = {
  recipe: {},
};

export const loadRecipe = async recipeId => {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }

    const {
      data: { recipe: apiRecipe },
    } = data;

    state.recipe = {
      id: apiRecipe.id,
      title: apiRecipe.title,
      publisher: apiRecipe.publisher,
      sourceUrl: apiRecipe.source_url,
      image: apiRecipe.image_url,
      servings: apiRecipe.servings,
      cookingTime: apiRecipe.cooking_time,
      ingredients: apiRecipe.ingredients,
    };
  } catch (error) {
    console.error(error);
  }
};
