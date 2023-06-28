function createRow(args) {
  const row = document.createElement("div");
  row.classList.add("row", "mb-2");
  row.append(...args);

  return row;
}

function createFormInput(label, validate, type = "text") {
  const formInput = document.createElement("div");
  formInput.classList.add("col-md-4", "mb-2");

  const labelField = document.createElement("labelField");
  labelField.classList.add("form-label");
  labelField.textContent = label;

  const input = document.createElement("input");
  input.classList.add("form-control");
  input.setAttribute("required", "");
  input.setAttribute("type", type);

  if (type === "number") {
    input.setAttribute("min", "2000");
    input.setAttribute("max", new Date(Date.now()).getFullYear());
  }

  if (type === "date") {
    input.setAttribute("min", "1900-01-01");
    input.setAttribute("max", getCurrentDateString());
  }

  if (type === "text") input.setAttribute("pattern", `.*[A-Za-z0-9].*`);

  const validateField = document.createElement("div");
  validateField.classList.add("invalid-feedback");
  validateField.textContent = validate;

  formInput.append(labelField, input, validateField);

  return { formInput, input, validateField };
}

function createForm() {
  const form = document.createElement("form");
  form.classList.add("col-12", "g-3", "needs-validation", "pt-3");
  form.setAttribute("novalidate", "");

  const formButton = document.createElement("button");
  formButton.classList.add("btn", "btn-success");
  formButton.setAttribute("type", "submit");
  formButton.textContent = "Добавить студента";

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("col-12", "mt-4");

  buttonContainer.append(formButton);

  const { formInput: firstnameInput, input: firstname } = createFormInput(
    "Имя",
    "Вы не ввели имя"
  );

  const { formInput: lastnameInput, input: lastname } = createFormInput(
    "Фамилия",
    "Вы не ввели фамилию"
  );

  const { formInput: dadInput, input: dadName } = createFormInput(
    "Отчество",
    "Вы не ввели отчество"
  );

  const {
    formInput: dateInput,
    input: date,
    validateField: dateValidate,
  } = createFormInput("Дата рождения", "Вы не указали дату рождения", "date");

  const {
    formInput: startInput,
    input: start,
    validateField: startValidate,
  } = createFormInput(
    "Год начала обучения",
    "Вы не указали год начала обучения",
    "number"
  );

  const { formInput: facInput, input: facultet } = createFormInput(
    "Факультет",
    "Вы не указали факультет"
  );

  const row1 = createRow([lastnameInput, firstnameInput, dadInput]);
  const row2 = createRow([dateInput, startInput, facInput]);

  const toggleButton = document.createElement("button");
  toggleButton.classList.add("btn", "btn-outline-secondary", "mt-4", "add");
  toggleButton.textContent = "+";
  toggleButton.setAttribute("type", "button");

  form.append(row1, row2, buttonContainer, toggleButton);

  return {
    form,
    inputs: [firstname, lastname, dadName, date, start, facultet],
    toggleButton,
    startValidate,
    dateValidate,
  };
}
