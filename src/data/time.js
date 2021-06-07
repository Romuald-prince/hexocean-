import { addZero } from "../utils/timeUtils";

export function hours(){
  const hours = Array.from(Array(24).keys()).map((item) => ({
    label: addZero(item.toString()),
    value: addZero(item.toString()),
  }));
  console.log("hours",hours);
  return hours;
}

export function minutes(){
    const minutes = Array.from(Array(60).keys()).map((item) => ({
      label: addZero(item.toString()),
      value: addZero(item.toString()),
    }));
    console.log("hours",hours);
    return minutes;
  }

  export function seconds(){
    const seconds = Array.from(Array(60).keys()).map((item) => ({
      label: addZero(item.toString()),
      value: addZero(item.toString()),
    }));
    console.log("hours",hours);
    return seconds;
  }
