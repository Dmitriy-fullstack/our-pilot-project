const currentDate = new Date(`${(new Date()).getFullYear()}.${(new Date()).getMonth() + 1}.${(new Date()).getDate()} 23:59:59`);
const yesterday = new Date();
yesterday.setDate(currentDate.getDate() - 1);
const tomorrow = new Date();
tomorrow.setDate(currentDate.getDate() + 1);
const week = new Date();
week.setDate(currentDate.getDate() + 6);

const dateTime = { yesterday, currentDate, tomorrow, week };

export default dateTime;