function createTh(title, code, scope) {
  const colTitle = document.createElement("th");
  colTitle.classList.add("table-head");
  colTitle.setAttribute("scope", scope);
  colTitle.innerText = title;
  colTitle.setAttribute("data-sort-code", code);

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

  const sorters = [];

  [
    { title: "Ф.И.О.", code: "fioSort" },
    { title: "Факультет", code: "facSort" },
    { title: "Дата рождения и возраст", code: "birthSort" },
    { title: "Годы обучения", code: "yearsSort" },
  ].forEach((item) => {
    const sorter = createTh(item.title, item.code, "col");
    trElement.append(sorter);
    sorters.push(sorter);
  });

  tableHeader.append(trElement);
  return { header: tableHeader, sorters };
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

  const { header, sorters } = createHeader();
  table.append(header, tableBody);

  return { studentsTable: table, updateTable, sorters };
}
