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

  const CURRENT_FILTERS = {
    sort: null,
    filters: [],
  };

  const STUDENTS = [];

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
      let sorted = [...students];

      if (sortCode === SORT_CODES.fioSort) {
        sorted = students.sort((a, b) => sortString(a.fio, b.fio));
      }

      if (sortCode === SORT_CODES.facSort) {
        sorted = students.sort((a, b) => sortString(a.faculty, b.faculty));
      }

      if (sortCode === SORT_CODES.yearsSort) {
        sorted = students.sort((a, b) => sortString(a.startDate, b.startDate));
      }

      if (sortCode === SORT_CODES.birthSort) {
        sorted = students.sort((a, b) => sortDate(a.birthDate, b.birthDate));
      }

      return sorted;
    };

    const getFilters = (students, value, type) => {
      let edited = [...students];

      if (Object.keys(SORT_CODES).includes(type)) {
        CURRENT_FILTERS.sort = type;
      }

      if (Object.keys(FILTER_TYPES).includes(type)) {
        let filters = [...CURRENT_FILTERS.filters];

        if (filters.find((item) => item.code === type)) {
          filters = filters.filter((el) => el.code !== type);
          filters.push({ code: type, value });
        } else {
          filters.push({ code: type, value });
        }

        if (!value) {
          filters = filters.filter((el) => el.code !== type);
        }

        CURRENT_FILTERS.filters = filters;
      }

      edited = [
        ...getFilteredStudents(edited, CURRENT_FILTERS.filters, FILTER_TYPES),
      ];

      edited = [...getSortedStudents(edited, CURRENT_FILTERS.sort)];
      updateTable(edited);
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
