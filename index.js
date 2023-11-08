import { Client, GatewayIntentBits, Events } from "discord.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
import "dotenv/config";
import { ExistChamps } from "./libs/champs.js";
import getChampList from "./libs/getChampList.js";

client.once("ready", () => console.log(client.user.tag + "준비완료"));

client.on(Events.MessageCreate, msg => {
  // 밴방법
  if (msg.content === "!방법")
    msg.reply(
      `!{챔피언이름} {챔피언이름} {챔피언이름} {챔피언이름} ... 밴\n을 입력하면 입력된 챔피언을 제외한 각 팀별 15챔피언이 보여집니다.`
    );

  const pattern = /([가-힣]+(?: )?)+\s밴/g; // 한글 문자만 일치시키는 정규식

  const matches = msg.content.match(pattern);

  if (matches) {
    const banList = msg.content.split(" ").slice(0, -1);
    console.log(banList); // 배열로 변환된 결과 출력
    // 밴리스트에 담긴 친구들이 챔피언 이름이 맞는지 확인
    const isExistChamps = banList.map(item => {
      return ExistChamps(item);
    });

    const isExistChampsIdx = isExistChamps.indexOf(false);
    if (isExistChampsIdx !== -1) {
      // 챔피언 이름 이상
      console.log("🚀 ~ isExistChampsIdx:", banList[isExistChampsIdx]);
      msg.reply(
        `${banList[isExistChampsIdx]}라는 챔피은... /올챔 으로 이름을 확인해주세오 💚`
      );
    } else {
      // 통과 밴된 챔피언 빼고 30캐릭터 추출하고 절반으로 나눈다.
      const { firstTeam, secondTeam } = getChampList(banList, 30);

      msg.reply(`1팀\n  ${firstTeam} 2팀\n  ${secondTeam}
      `);
    }
  }
});

client.login(process.env.TOKEN);
