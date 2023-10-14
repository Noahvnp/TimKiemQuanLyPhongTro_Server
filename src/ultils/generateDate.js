import moment from "moment";

const formatDate = (dateObj) => {
  let dayOfWeek =
    dateObj.getDay() === 0 ? "Chủ nhật" : `Thứ ${dateObj.getDay() + 1}`;
  let date = `${dateObj.getDate()}/${
    dateObj.getMonth() + 1
  }/${dateObj.getFullYear()}`;
  let time = `${dateObj.getHours()}:${dateObj.getMinutes()}`;

  return `${dayOfWeek}, ${time} ${date}`;
};

const generateDate = () => {
  let today = new Date();
  let expireDay = moment(today).add(20, "d").toDate();

  return {
    today: formatDate(today),
    expireDay: formatDate(expireDay),
  };
};

export default generateDate;
