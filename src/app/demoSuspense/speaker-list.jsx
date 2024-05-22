import path, { resolve } from "path";
import fs from "fs";
import SpeakerDetail from "./speaker-detail";

const dataFilePath = path.join(process.cwd(), "data.json");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function SpeakerList() {
  const speakers = await readData();
  return (
    <div className="container mt-3">
      <div className="row">
        {speakers.map((speaker) => (
          <SpeakerDetail speaker={speaker} key={speaker.id} />
        ))}
      </div>
    </div>
  );

  async function readData() {
    try {
      await sleep(2000);
      const data = await fs.readFile(dataFilePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        const defaultData = [
          {
            id: 1124,
            firstName: "Douglas",
            lastName: "Crockford",
            favorite: true,
          },
          {
            id: 1530,
            firstName: "Tammy",
            lastName: "Baker",
            favorite: false,
          },
          {
            id: 2920,
            firstName: "Ron",
            lastName: "Lichty",
            favorite: false,
          },
        ];
        await fs.writeFile(dataFilePath, JSON.stringify(defaultData, null, 2));
        return defaultData;
      } else {
        throw error;
      }
    }
  }
}
