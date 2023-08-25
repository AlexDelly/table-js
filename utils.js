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

const sortString = (a, b) => {
  const preparedA = a.toString().split(" ").join("").toLowerCase();
  const preparedB = b.toString().split(" ").join("").toLowerCase();

  return ("" + preparedA).localeCompare(preparedB);
};

const sortDate = (a, b) => {
  const firtsDate = a.split(" ")[0].split(".");
  const secondDate = b.split(" ")[0].split(".");

  const aTimestamp = Date.parse(
    `${firtsDate[1]}/${firtsDate[0]}/${firtsDate[2]}`
  );
  const bTimestamp = Date.parse(
    `${secondDate[1]}/${secondDate[0]}/${secondDate[2]}`
  );

  return ("" + aTimestamp).localeCompare(bTimestamp);
};

const getFilteredStudents = (students, filters, types) => {
  let filtered = [...students];

  filters.map(({ code, value }) => {
    if (code === types.fio) {
      filtered = students.filter(({ fio }) =>
        fio.toLowerCase().includes(value.toLowerCase())
      );
    }

    if (code === types.faculty) {
      filtered = students.filter(({ faculty }) => faculty === value);
    }

    if (code === types.start) {
      filtered = students.filter(
        ({ startDate }) => startDate.split(" ")?.[0] === value
      );
    }

    if (code === types.end) {
      filtered = students.filter(
        ({ startDate }) => startDate.split(" ")?.[2] === value
      );
    }
  });

  return filtered;
};
