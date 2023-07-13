const checkIfEmpty = (el, domEl) => {
  if (el.trim() === "") {
    domEl.classList.add("is-invalid");
  } else {
    domEl.classList.remove("is-invalid");
  }
};

const getCurrentDateString = () => {
  const currentDate = new Date(Date.now())
    .toLocaleDateString("en-US")
    .split("/")
    .reverse();

  return currentDate.join("-");
};

const getFullName = (firstname, lastname, dadName) => {
  return `${lastname.trim()} ${firstname.trim()} ${dadName.trim()}`;
};

const getFormattedDateString = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru");
};

const getFullYears = (date) => {
  let postfix = "лет";

  const nowDate = Date.now();
  const birthDate = new Date(date);
  const age = Math.abs(new Date(nowDate - birthDate).getUTCFullYear() - 1970);

  if (age % 10 === 1) postfix = "год";
  if (age % 10 > 1 && age % 10 < 5) postfix = "года";

  return `${age} ${postfix}`;
};

const getBirthDate = (date) => {
  return `${getFormattedDateString(date)} (${getFullYears(date)})`;
};

const getStudyYears = (startYear) => {
  let course = "закончил";
  const currentYear = new Date(Date.now()).getUTCFullYear();
  const diff = currentYear - startYear;
  const currentMonth = new Date(Date.now()).getMonth() + 1;

  if (diff <= 4 && currentMonth < 9) {
    course = `${diff} курс`;
  }

  return `${startYear} - ${+startYear + 4} (${course})`;
};
