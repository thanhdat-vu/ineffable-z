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

export function filterDataByFields(data: any[], fields: string[]) {
  const filteredData = data.map((item) => {
    return Object.keys(item)
      .filter((key) => fields.includes(key))
      .reduce((acc, key) => ({ ...acc, [key]: item[key] }), {});
  });
  return filteredData;
}

export function breakToSentences(paragraph: string) {
  const sentences = paragraph.split(
    /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/g
  );
  if (sentences[sentences.length - 1] === "") {
    sentences.pop();
  }
  return sentences;
}

export function getIngredientImageURI(name: string) {
  return `https://www.thecocktaildb.com/images/ingredients/${name}.png`;
}
