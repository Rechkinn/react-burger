import { SET_ACTIVE_SECTION } from "../actions/active-section";

const initialState = {
  activeSection: "BurgerConstructor",
};

export const activeSectionReduce = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_SECTION:
      return {
        ...state,
        activeSection: action.activeSection,
      };
    default:
      return state;
  }
};
