export default function getAllChampionList() {
  return allChamps
    .map(champion => champion.name)
    .sort((a, b) => a.localeCompare(b, "ko", { sensitivity: "base" }));
}
