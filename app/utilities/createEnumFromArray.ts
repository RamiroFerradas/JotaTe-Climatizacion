type EnumObject = { [key: string]: string };

export function createEnumFromArray(arr: string[]): EnumObject {
  return arr.reduce((enumObj, key) => {
    enumObj[key] = `${key}:= '${key}'`;
    return enumObj;
  }, {} as EnumObject);
}
