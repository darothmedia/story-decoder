import { RECEIVE_CATEGORIES } from "../actions/emoji_actions";

const CategoriesReducer = (state = {}, action) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_CATEGORIES:
      let catarr = []
      action.categories.map((category) => {
        catarr.push(category.slug)
        // category.subCategories.map((subCat) => {
        //   catarr.push(subCat)
        // })
      })
      return catarr
    default:
      return state;
  }
}

export default CategoriesReducer