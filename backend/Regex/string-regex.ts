const regExp: RegExp = /^[a-z]+$/;

const onlyLowercaseRegExp = (isOnlyLowercase: string[]): boolean => {
  isOnlyLowercase.forEach((element) => {
    if (!element.match(regExp)) {
      return false;
    }
  });
  return true;
};

export { onlyLowercaseRegExp };
