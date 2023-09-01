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

  // Lặp 3 lần:
  // - Lần 1 : i = 0 Lấy độ dài của value + với chuỗi secret (biến merged) = 24 / 2 = 12 ==> output = "i", index = "12"
  // - Lần 2 : i = 1 lengthMerged = 12 /2 = 6 => output = "h", index = "6"
  // - Lần 3 : i = 2 Lấy độ dài của biết merged  = 24/2 = 12.
  //                Lấy lengthMerged đã được gán từ lần 2 = 6/2 = 3
  //                 ==> index = 12 + 3 = 15 => output = "o"
  for (let i = 0; i < 3; i++) {
    let index =
      i === 2
        ? Math.floor(merged.length / 2 + lengthMerged / 2)
        : Math.floor(lengthMerged / 2);
    output += merged.charAt(index);
    lengthMerged = index;
  }
  return `${value.charAt(0)}${output}`.toUpperCase(); //Output gồm 4 kí tự in hoa với charAt(0) là chữ cái đầu của value
  /// ==> "T"+"IHO"
};

export default generateCode;
