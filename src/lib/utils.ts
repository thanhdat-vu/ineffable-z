export function stringToPathName(str: string) {
  return str.toLowerCase().replaceAll("/", "or").replaceAll(" ", "-");
}

function toCapitalCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

export function pathNameToString(pathName: string) {
  return toCapitalCase(pathName.replaceAll("-or-", "-/-").replaceAll("-", " "));
}
