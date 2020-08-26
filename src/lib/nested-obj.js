export function arrToPath(arr) {
  let toRet = '';
  for (const index in arr) {
    toRet += `${arr[index]}/`;
  }

  return toRet;
}

export function pathToArr(path) {
  const pathArr = path.split('/');

  if (pathArr[0].length < 1) {
    pathArr.shift();
  }

  if (pathArr[pathArr.length - 1].length < 1) {
    pathArr.pop();
  }

  return pathArr;
}

export function getProp(obj, path) {
  if (!obj) {
    return undefined;
  }

  if (typeof path === 'string') {
    path = pathToArr(path);
  }

  if (path.length === 1) {
    return obj[path[0]];
  }

  const nextObj = obj[path[0]];
  path.shift();
  return getProp(nextObj, path);
}
