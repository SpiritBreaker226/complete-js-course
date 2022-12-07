import { API_KEY, API_URL, RESULTS_PER_PAGE } from './config';
import { AJAX } from './helpers';

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

const createRecipesObject = data => {
  const {
    data: { recipe: apiRecipe },
  } = data;

  return {
    id: apiRecipe.id,
    title: apiRecipe.title,
    publisher: apiRecipe.publisher,
    sourceUrl: apiRecipe.source_url,
    image: apiRecipe.image_url,
    servings: apiRecipe.servings,
    cookingTime: apiRecipe.cooking_time,
    ingredients: apiRecipe.ingredients,
    ...(apiRecipe.key && { key: apiRecipe.key }),
  };
};

export const loadRecipe = async recipeId => {
  const data = await AJAX(`${API_URL}${recipeId}`);

  state.recipe = createRecipesObject(data);

  state.recipe.isBookmarked = state.bookmarks.has(recipeId);
};

export const loadSearchResults = async query => {
  // resets search
  state.search.query = query;
  state.search.page = 1;
  state.search.results = [];

  const data = await AJAX(`${API_URL}?search=${query}`);

  state.search.results = data.data.recipes.map(recipe => ({
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    image: recipe.image_url,
    ...(recipe.key && { key: recipe.key }),
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

export const updateRecipe = async newRecipe => {
  const ingredients = Object.entries(newRecipe)
    .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    .map(([_, ingredient]) => {
      const ingredientArray = ingredient.replaceAll(' ', '').split(',');

      if (ingredientArray.length !== 3) {
        throw new Error(
          'Wrong ingredient format! Please use the correct format :)'
        );
      }

      const [quantity, unit, description] = ingredientArray;

      return { quantity: quantity ? +quantity : null, unit, description };
    });

  const recipe = await AJAX(`${API_URL}?key=${API_KEY}`, {
    title: newRecipe.title,
    publisher: newRecipe.publisher,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    servings: +newRecipe.servings,
    cooking_time: +newRecipe.cookingTime,
    ingredients,
  });

  state.recipe = createRecipesObject(recipe);

  addBookmark(state.recipe);
};

const init = () => {
  const storedBookmarks = localStorage.getItem('bookmarks');

  if (storedBookmarks) {
    state.bookmarks = new Map(JSON.parse(storedBookmarks));
  }
};

init();
