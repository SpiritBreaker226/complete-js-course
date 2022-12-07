import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
};

export const loadRecipe = async recipeId => {
  const data = await getJSON(`${API_URL}${recipeId}`);

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
};
