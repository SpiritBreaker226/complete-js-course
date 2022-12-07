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
  bookmarks: new Map(),
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

  state.recipe.isBookmarked = state.bookmarks.has(recipeId);
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

const persistBookmarks = () => {
  localStorage.setItem(
    'bookmarks',
    JSON.stringify([...state.bookmarks.entries()])
  );
};

export const addBookmark = recipe => {
  // adds the bookmark
  state.bookmarks.set(state.recipe.id, recipe);

  // mark current recipe as bookmark
  if (recipe.id === state.recipe.id) {
    state.recipe.isBookmarked = true;
  }

  persistBookmarks();
};

export const deleteBookmark = id => {
  // removes the bookmark from bookmarks
  state.bookmarks.delete(id);

  // remove mark current recipe as bookmark
  if (id === state.recipe.id) {
    state.recipe.isBookmarked = false;
  }

  persistBookmarks();
};

// TODO: For future use
const clearBookmarks = () => {
  localStorage.removeItem('bookmarks');
};

const init = () => {
  const storedBookmarks = localStorage.getItem('bookmarks');

  if (storedBookmarks) {
    state.bookmarks = new Map(JSON.parse(storedBookmarks));
  }
};

init();
