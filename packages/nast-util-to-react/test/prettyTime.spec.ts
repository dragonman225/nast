import { prettyTime } from "../src/util"

for (let hour = 0; hour < 24; hour++) {
  for (let minute = 0; minute < 60; minute++) {
    console.log(`${hour.toString().padStart(2)}:${minute.toString().padStart(2)}`, prettyTime(hour, minute))
  }
}