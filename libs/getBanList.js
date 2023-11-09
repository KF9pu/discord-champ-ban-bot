import checkChampsExistence from "./checkChampsExistence.js";
import getAllChampionList from "./getAllChampionList.js";

export default function getBanList(msg) {
  const banList = msg.content.split(" ").slice(0, -1);

  // 밴리스트에 담긴 친구들이 챔피언 이름이 맞는지 확인
  const isExistChamps = banList.map(item => {
    return checkChampsExistence(item);
  });

  const isExistChampsIdx = isExistChamps.indexOf(false);
  if (isExistChampsIdx !== -1) {
    msg.reply(
      `${banList[isExistChampsIdx]}라는 챔피은...없는 것 같아요 /올챔 으로 이름을 확인해주세오 💚`
    );
  } else {
    const { firstTeam, secondTeam } = getChampList(banList, 30); // 통과 밴된 챔피언 빼고 30캐릭터 추출하고 절반으로 나눈다.

    msg.reply(`1팀\n  ${firstTeam} 2팀\n  ${secondTeam}
      `);
  }
}

function getChampList(banList, maxCnt) {
  const allChampionList = getAllChampionList();

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
