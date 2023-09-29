export const extractPriceFromString = (string) => {
  let price = 0;
  if (string.search("đồng/tháng") > 0) {
    price = +string.replace(/\D/g, "") / Math.pow(10, 6);
  } else if (string.search("triệu/tháng") > 0) {
    price = +string.match(/\d+/)[0];
  }
  return price;
};
export const extractPriceFromStringV2 = (string) => {
  let price = 0;
  if (string.search("đồng/tháng") > 0) {
    price = +string.replace(/\D/g, "") / Math.pow(10, 6);
  } else if (string.search("triệu/tháng") > 0) {
    price = +string.split(" ")[0];
  }
  return price;
};

export const extractNumberFromString = (string) => +string.match(/\d+/)[0];
