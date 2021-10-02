import store from "@/store";
const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export default (value) => {
  if (store.state.language === "en") {
    return value;
  }

  if (typeof value === "number" && value === 0) {
    return persianDigits[0];
  }

  if (!value) {
    return "";
  }

  if (typeof value !== "string") {
    value = String(value);
  }
  return value.replace(/\d/g, (x) => persianDigits[x]);
};
