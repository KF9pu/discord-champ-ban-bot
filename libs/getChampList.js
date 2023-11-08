import { getChampionList } from "./champs.js";

export default function getChampList(banList, maxCnt) {
  const allChampionList = getChampionList();

  // banList에 포함되지 않는 챔피언들을 필터링합니다.
  const filteredChampions = allChampionList.filter(
    champion => !banList.includes(champion)
  );

  // 중복 없이 랜덤하게 30개의 챔피언을 추출합니다.
  const randomChampions = getRandomChampions(filteredChampions, maxCnt);

  // 추출한 챔피언을 2개의 그룹으로 나눕니다.
  const firstTeam = randomChampions.slice(0, maxCnt / 2);

  const secondTeam = randomChampions.slice(maxCnt / 2, randomChampions.length);

  return {
    firstTeam: transformText(firstTeam, 1),
    secondTeam: transformText(secondTeam, 2),
  };
}

function getRandomChampions(arr, count) {
  const shuffled = arr.slice(); // 배열 복제
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // 요소를 랜덤하게 섞음
  }
  return shuffled.slice(0, count);
}

function transformText(teamData, teamNumber) {
  return teamData
    .map(
      (item, idx) => `${teamNumber === 1 ? "💛" : "💙"} ${idx + 1}. ${item}\n  `
    )
    .join("");
}
