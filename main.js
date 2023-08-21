(() => {
  let IS_VALID_YEAR = false;
  let IS_VALID_DATE = false;

  const FILTER_TYPES = {
    fio: "fio",
    faculty: "faculty",
    start: "start",
    end: "end",
  };

  const SORT_CODES = {
    fioSort: "fioSort",
    facSort: "facSort",
    birthSort: "birthSort",
    yearsSort: "yearsSort",
  };

  const STUDENTS = [
    {
      fio: "Иванов Иван Иванович",
      faculty: "3",
      birthDate: "16.04.1990 (33 года)",
      startDate: "2008 - 2012 (закончил)",
    },
    {
      fio: "Петров Петр Петрович",
      faculty: "2",
      birthDate: "16.04.1991 (32 года)",
      startDate: "2013 - 2017 (закончил)",
    },
    {
      fio: "Сидоров Сидр Сидорович",
      faculty: "1",
      birthDate: "16.04.1992 (31 год)",
      startDate: "2022 - 2026 (2 курс)",
    },
    {
      fio: "Тестовый Тест Тестович",
      faculty: "2а",
      birthDate: "16.04.1992 (31 год)",
      startDate: "2022 - 2026 (2 курс)",
    },
    {
      fio: "Александров Александр Александрович",
      faculty: "2Б",
      birthDate: "16.04.1992 (31 год)",
      startDate: "2022 - 2026 (2 курс)",
    },
  ];

  const container = document.createElement("div");
  container.classList.add("container", "trans", "trans-active");

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");

    // Add student form
    const { form, inputs, toggleButton, startValidate, dateValidate } =
      createForm();
    const [firstname, lastname, dadName, date, start, facultet] = inputs;
    //

    // Filter block
    const { filter, inputs: filterInputs } = createFilter();
    //

    // Table
    let { studentsTable, sorters, updateTable } = createTable();
    updateTable(STUDENTS);
    //

    container.append(form, filter, studentsTable);
    root.append(container);

    toggleButton.addEventListener("click", () => {
      container.classList.toggle("trans-active");
      toggleButton.classList.toggle("hide");
    });

    const checkStartYear = (year) => {
      const condition =
        year > 1999 && year <= new Date(Date.now()).getFullYear();

      if (!condition) {
        startValidate.textContent = "от 2000г. до текущего";
      }

      IS_VALID_YEAR = condition;
    };

    const checkDate = (dateValue) => {
      const currentYear = new Date(dateValue).getFullYear();
      const condition =
        currentYear > 1900 && new Date(Date.now()) > new Date(dateValue);

      if (!condition) {
        dateValidate.textContent = "от 1900г. до текущей даты";
        form.classList.add("was-validated");
        date.classList.add("is-invalid");
      } else {
        form.classList.remove("was-validated");
        date.classList.remove("is-invalid");
      }

      IS_VALID_DATE = condition;
    };

    // Add student events
    inputs.forEach((el) =>
      el.addEventListener("input", (e) => checkIfEmpty(e.target.value, el))
    );
    start.addEventListener("input", (e) => checkStartYear(e.target.value));
    date.addEventListener("input", (e) => checkDate(e.target.value));

    form.addEventListener(
      "submit",
      (e) => {
        if (!form.checkValidity()) {
          e.preventDefault();
          e.stopPropagation();
          form.classList.add("was-validated");
        }

        const allFilled = !inputs
          .map((el) => el.value.trim() === "")
          .some((el) => el);

        if (allFilled && IS_VALID_YEAR && IS_VALID_DATE) {
          e.preventDefault();
          form.classList.remove("was-validated");
          container.classList.toggle("trans-active");
          toggleButton.classList.toggle("hide");

          const studentObject = {
            fio: getFullName(firstname.value, lastname.value, dadName.value),
            faculty: facultet.value.trim(),
            birthDate: getBirthDate(date.value),
            startDate: getStudyYears(start.value.trim()),
          };

          STUDENTS.push(studentObject);
          updateTable(STUDENTS);

          inputs.forEach((item) => (item.value = ""));
        }

        e.preventDefault();
      },
      false
    );
    //

    const getSortedStudents = (students, sortCode) => {
      let sorted = [];

      if (sortCode === SORT_CODES.fioSort) {
        sorted = students.sort((a, b) => sortString(a.fio, b.fio));
      }

      if (sortCode === SORT_CODES.facSort) {
        sorted = students.sort((a, b) => sortString(a.faculty, b.faculty));
      }

      updateTable(sorted);
    };

    const getFilters = (students, value, type) => {
      let edited = [...students];

      if (type === FILTER_TYPES.fio) {
        edited = students.filter(({ fio }) =>
          fio.toLowerCase().includes(value.toLowerCase())
        );
      }

      if (type === FILTER_TYPES.faculty) {
        edited = students.filter(({ faculty }) => faculty === value);
      }

      if (type === FILTER_TYPES.start) {
        edited = students.filter(
          ({ startDate }) => startDate.split(" ")?.[0] === value
        );
      }

      if (type === FILTER_TYPES.end) {
        edited = students.filter(
          ({ startDate }) => startDate.split(" ")?.[2] === value
        );
      }

      updateTable(edited);

      if (!value) {
        updateTable(STUDENTS);
      }
    };

    //Sorters events
    sorters.forEach((sorter) =>
      sorter.addEventListener("click", () =>
        getFilters(STUDENTS, null, sorter.dataset.sortCode)
      )
    );

    //Filters events
    filterInputs.forEach((filter) =>
      filter.addEventListener("input", () => {
        getFilters(STUDENTS, filter.value.trim(), filter.dataset.filterType);
      })
    );
    //
  });
})();
