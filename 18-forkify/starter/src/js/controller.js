import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';
import { TIMEOUT_MODEL_CLOSE_SECONDS } from './config';
import paginationView from './views/paginationView';
import recipeView from './views/recipeView';
import addRecipeView from './views/addRecipeView';
import resultsView from './views/resultsView';
import searchView from './views/searchView';
import bookmarksView from './views/bookmarksView';

if (module.hot) {
  module.hot.accept;
}

const controlRecipes = async () => {
  try {
    const recipeId = window.location.hash.slice(1);

    if (!recipeId) {
      return;
    }

    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update([...model.state.bookmarks.values()]);

    await model.loadRecipe(recipeId);

    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();

    throw error;
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

    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (error) {
    resultsView.renderError();

    throw error;
  }
};

const controlPagination = gotoPage => {
  resultsView.render(model.getSearchResultsPage(gotoPage));
  paginationView.render(model.state.search);
};

const controlServings = newServings => {
  if (newServings < 1) {
    return;
  }

  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};

const controlAddBookmark = () => {
  if (model.state.recipe.isBookmarked) {
    model.deleteBookmark(model.state.recipe.id);
  } else {
    model.addBookmark(model.state.recipe);
  }

  recipeView.update(model.state.recipe);

  bookmarksView.render([...model.state.bookmarks.values()]);
};

const controlBookmarks = () => {
  bookmarksView.render([...model.state.bookmarks.values()]);
};

const controlAddRecipe = async newRecipe => {
  try {
    addRecipeView.renderSpinner();

    await model.updateRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    // successfully message
    addRecipeView.renderMessage();
    bookmarksView.render([...model.state.bookmarks.values()]);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close model after X seconds
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, TIMEOUT_MODEL_CLOSE_SECONDS * 1000);
  } catch (error) {
    addRecipeView.renderError(error);

    throw error;
  }
};

const init = () => {
  try {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe);
  } catch (error) {
    console.error(`${error} ????????????`);
  }
};
init();
