function createFilterInput(label, type = "text", filterType) {
  const filterInput = document.createElement("div");
  filterInput.classList.add("col-md-3", "mb-2");

  const labelField = document.createElement("labelField");
  labelField.classList.add("form-label");
  labelField.textContent = label;

  const input = document.createElement("input");
  input.classList.add("form-control");
  input.setAttribute("type", type);
  input.setAttribute("data-filter-type", filterType);

  filterInput.append(labelField, input);

  return { filterInput, input };
}

function createFilter() {
  const filterTitle = document.createElement("h5");
  filterTitle.classList.add("pb-2", "pt-5");
  filterTitle.textContent = "Фильтры";

  const filter = document.createElement("div");
  filter.classList.add("d-flex", "flex-column");

  const { filterInput: fioInput, input: fioFilter } = createFilterInput(
    "Ф.И.О.",
    "text",
    "fio"
  );

  const { filterInput: facultyInput, input: facultyFilter } = createFilterInput(
    "Факультет",
    "text",
    "faculty"
  );

  const { filterInput: startInput, input: startFilter } = createFilterInput(
    "Год начала обучения",
    "number",
    "start"
  );

  const { filterInput: endInput, input: endFilter } = createFilterInput(
    "Год окончания обучения",
    "number",
    "end"
  );

  const row = createRow([fioInput, facultyInput, startInput, endInput]);

  filter.append(filterTitle, row);

  return {
    filter,
    inputs: [fioFilter, facultyFilter, startFilter, endFilter],
  };
}
