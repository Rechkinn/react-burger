type TCollectedUserDataResult = {
  email?: string;
  password?: string;
  name?: string;
  token?: string;
};

export const collectUserData = (
  elements: HTMLFormControlsCollection | Array<Element>
): TCollectedUserDataResult => {
  let collectedUserData: TCollectedUserDataResult = {};

  for (let i = 0; i < elements.length; i++) {
    const inputElement: HTMLInputElement = elements[i] as HTMLInputElement;

    if (inputElement.name) {
      collectedUserData = {
        ...collectedUserData,
        [inputElement.name]: inputElement.value,
      };
    }
  }
  return collectedUserData;
};
