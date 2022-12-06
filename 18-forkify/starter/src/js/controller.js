import 'core-js/stable';
import 'regenerator-runtime/runtime';

import icons from 'url:../img/icons.svg';
import * as model from './model';
import recipeView from './views/RecipeView';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const renderSpinner = parentEl => {
  const markUp = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;

  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markUp);
};

const controlRecipes = async () => {
  try {
    const recipeId = window.location.hash.slice(1);

    if (!recipeId) {
      return;
    }

    renderSpinner(recipeContainer);

    await model.loadRecipe(recipeId);

    recipeView.render(model.state.recipe);

    // TODO: add errors
    /*`<div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>No recipes found for your query. Please try again!</p>
        </div>`*/
  } catch (error) {
    console.error(error);
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);
