require("dotenv").config();

const generateCode = (value) => {
  let output = "";
  // Chuyển value thành chuỗi viết liền, không dấu, không khoảng trắng. VD: "Thành Phố Hà Nội" => "thanhphohanoi"
  value = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("");
  let merged = value + process.env.SECRET_GENERATOR; //thanhphohanoiphongtro123
  let lengthMerged = merged.length; //24
  // Lấy ra 3 kí tự trong chuỗi với các vị trí: 1/2, 3/4, 1/4
  for (let i = 0; i < 3; i++) {
    let index =
      i === 2
        ? Math.floor(merged.length / 2 + lengthMerged / 2)
        : Math.floor(lengthMerged / 2);
    output += merged.charAt(index);
    lengthMerged = index;
  }
  return `${value.charAt(2)}${output}`.toUpperCase();
};

export default generateCode;
