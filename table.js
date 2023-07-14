function createTh(title, scope) {
  const colTitle = document.createElement("th");
  colTitle.setAttribute("scope", scope);
  colTitle.innerText = title;

  return colTitle;
}

function createTd(title) {
  const rowTitle = document.createElement("td");
  rowTitle.textContent = title;

  return rowTitle;
}

function createTableRow(row) {
  const tableRow = document.createElement("tr");
  Object.keys(row).forEach((key) => tableRow.append(createTd(row[key])));

  return tableRow;
}

function createHeader() {
  const tableHeader = document.createElement("thead");
  tableHeader.classList.add("thead", "table-light");

  const trElement = document.createElement("tr");

  ["Ф.И.О.", "Факультет", "Дата рождения и возраст", "Годы обучения"].forEach(
    (title) => trElement.append(createTh(title, "col"))
  );

  tableHeader.append(trElement);
  return tableHeader;
}

function createTable() {
  const table = document.createElement("table");
  table.classList.add("table", "table-bordered");

  const noData = document.createElement("span");
  noData.classList.add("h6", "text-danger");
  noData.textContent = "Данные о студентах отсутствуют";

  const tableBody = document.createElement("tbody");

  const updateTable = (items) => {
    tableBody.innerHTML = "";

    items.length
      ? items.forEach((row) => tableBody.append(createTableRow(row)))
      : tableBody.append(noData);
  };

  const header = createHeader();
  table.append(header, tableBody);

  return { studentsTable: table, updateTable };
}
