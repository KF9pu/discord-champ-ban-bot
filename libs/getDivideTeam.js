import { teamDivisionPattern } from "../commands.js";
import isMaches from "./isMaches.js";

export default function getDivideTeam(msg) {
  const match = isMaches(msg, teamDivisionPattern);
  const names = match[1].split(" ");

  if (names.length <= 10) {
    const isEven = names.length % 2 === 0;

    if (isEven) {
      names.sort(() => Math.random() - 0.5);

      const team1 = names.slice(0, names.length / 2).join("\n-");
      const team2 = names.slice(names.length / 2).join("\n-");

      msg.reply(`1팀\n-${team1} \n2팀\n-${team2}
  `);
    } else {
      msg.reply(`이름 갯수가 짝수가 아닙니다. 😅`);
    }
  } else {
    msg.reply(`이름 갯수가 10개를 초과합니다. 😅`);
  }
}
