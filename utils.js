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
