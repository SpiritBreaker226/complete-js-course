import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';
import recipeView from './views/RecipeView';
import resultsView from './views/ResultsView';
import searchView from './views/SearchView';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
  try {
    const recipeId = window.location.hash.slice(1);

    if (!recipeId) {
      return;
    }

    recipeView.renderSpinner();

    await model.loadRecipe(recipeId);

    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    const query = searchView.getQuery();

    if (!query) {
      return;
    }

    resultsView.renderSpinner();

    await model.loadSearchResults(query);

    resultsView.render(model.state.search.results);
  } catch (error) {
    resultsView.renderError();
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
