import getAllChampionList from "./getAllChampionList.js";

export default function checkChampsExistence(champName) {
  const allCHampNames = getAllChampionList();
  return allCHampNames.includes(champName);
}
