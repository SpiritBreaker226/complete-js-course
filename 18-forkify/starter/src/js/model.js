import { API_URL, RESULTS_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
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

export const loadSearchResults = async query => {
  // resets search
  state.search.query = query;
  state.search.page = 1;
  state.search.results = [];

  const data = await getJSON(`${API_URL}?search=${query}`);

  state.search.results = data.data.recipes.map(recipe => ({
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    image: recipe.image_url,
  }));
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = newServings => {
  state.recipe.ingredients = state.recipe.ingredients.map(ingredient => {
    if (!ingredient.quantity) {
      return ingredient;
    }

    return {
      ...ingredient,
      quantity: (ingredient.quantity * newServings) / state.recipe.servings,
    };
  });
  state.recipe.servings = newServings;
};
