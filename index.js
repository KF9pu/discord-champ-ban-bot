import { Client, GatewayIntentBits, Events } from "discord.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
import "dotenv/config";
import isMaches from "./libs/isMaches.js";
import { banPattern } from "./commands.js";
import getBanList from "./libs/getBanList.js";

client.once("ready", () => console.log(client.user.tag + "준비완료"));

client.on(Events.MessageCreate, msg => {
  // 밴방법
  if (msg.content === "!방법")
    msg.reply(
      `!{챔피언이름} {챔피언이름} {챔피언이름} {챔피언이름} ... 밴\n을 입력하면 입력된 챔피언을 제외한 각 팀별 15챔피언이 보여집니다.`
    );

  // 입력반은 챔피언 이외에 챔피언을 나누어서 뿌려줌
  if (isMaches(msg, banPattern)) getBanList(msg);

  if (msg.content === "!") {
    console.log("");
  }

  if (msg.content === "!오늘뭐먹지") {
    console.log("");
  }
});

client.login(process.env.TOKEN);
