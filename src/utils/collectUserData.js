export const collectUserData = (elements) => {
  let collectedUserData = {};

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].name) {
      collectedUserData = {
        ...collectedUserData,
        [elements[i].name]: elements[i].value,
      };
    }
  }
  return collectedUserData;
};
