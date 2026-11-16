export function seperatNumber(value) {
  value = value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return value;
}

export function enTofa(value) {
  if (!value) {
    return "۰";
  }
  value = value.toString();
  var englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
  value = value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  for (var i = 0, numbersLen = englishNumbers.length; numbersLen > i; i++) {
    value = value
      .toString()
      .replace(new RegExp(englishNumbers[i], "g"), persianNumbers[i]);
  }
  return value;
}

export function enTofaNum(value) {
  if (!value) {
    return;
  }
  value = value.toString();
  var englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
  for (var i = 0, numbersLen = englishNumbers.length; numbersLen > i; i++) {
    value = value
      .toString()
      .replace(new RegExp(englishNumbers[i], "g"), persianNumbers[i]);
  }
  return value;
}

export function faToenNum(value) {
  if (!value) {
    return;
  }
  value = value.toString();
  var englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
  for (var i = 0, numbersLen = englishNumbers.length; numbersLen > i; i++) {
    value = value
      .toString()
      .replace(new RegExp(persianNumbers[i], "g"), englishNumbers[i]);
  }
  return value;
}

export function calcDiscount(price, regularPrice, type) {
  const discount = regularPrice - price;

  if (type === 1) {
    return Math.round((discount / regularPrice) * 100);
  }

  return discount;
}

export const handleClickScroll = () => {
  const element = document.getElementById("root");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
