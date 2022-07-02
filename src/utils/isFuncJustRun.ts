import isUndefinedOrNull from "./isUndefinedOrNull";

const isFuncJustRun = (theFunc: Function, singleParam: any) => {
  if (!isUndefinedOrNull(theFunc)) return theFunc(singleParam);
};

export default isFuncJustRun;
