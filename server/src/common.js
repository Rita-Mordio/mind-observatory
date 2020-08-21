const COMMON = {
  isEmptyValue: (value) => {
    if (value === null) return true;
    else if (value === undefined) return true;
    else if (value === "") return true;
    else return false;
  },
};

export default COMMON;
