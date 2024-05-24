var mode = 0;

window.onload = function () {
  createForm();
  getShoppingList();
};

createForm = () => {
  const root = document.getElementById("root");
  const form = document.createElement("form");
  form.setAttribute("class", "m-3");

  //Type input and label
  const typeLabel = document.createElement("label");
  typeLabel.setAttribute("for", "type");
  typeLabel.setAttribute("class", "form-label");
  const typeLabelText = document.createTextNode("Type");
  typeLabel.appendChild(typeLabelText);
  const typeInput = document.createElement("input");
  typeInput.setAttribute("type", "text");
  typeInput.setAttribute("name", "type");
  typeInput.setAttribute("id", "type");
  typeInput.setAttribute("class", "form-control");

  //count input and label
  const countLabel = document.createElement("label");
  countLabel.setAttribute("for", "count");
  countLabel.setAttribute("class", "form-label");
  const countLabelText = document.createTextNode("Count");
  countLabel.appendChild(countLabelText);
  const countInput = document.createElement("input");
  countInput.setAttribute("type", "number");
  countInput.setAttribute("name", "count");
  countInput.setAttribute("id", "count");
  countInput.setAttribute("class", "form-control");

  //count input and label
  const priceLabel = document.createElement("label");
  priceLabel.setAttribute("for", "price");
  priceLabel.setAttribute("class", "form-label");
  const priceLabelText = document.createTextNode("Price");
  priceLabel.appendChild(priceLabelText);
  const priceInput = document.createElement("input");
  priceInput.setAttribute("type", "number");
  priceInput.setAttribute("name", "price");
  priceInput.setAttribute("id", "price");
  priceInput.setAttribute("step", "0.01");
  priceInput.setAttribute("class", "form-control");

  const submitButton = document.createElement("input");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("id", "submitbutton");
  submitButton.setAttribute("class", "btn btn-primary");
  submitButton.setAttribute("value", "Add");

  //Append form and root
  form.append(
    typeLabel,
    typeInput,
    countLabel,
    countInput,
    priceLabel,
    priceInput,
    submitButton
  );
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    addShoppingItem();
  });

  root.appendChild(form);
};

addShoppingItem = async () => {
  const typeInput = document.getElementById("type");
  const countInput = document.getElementById("count");
  const priceInput = document.getElementById("price");
  let item = {
    type: typeInput.value,
    count: countInput.value,
    price: priceInput.value,
  };
  let url = "/api/shopping";
  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  };
  if (mode) {
    url = "/api/shopping/" + mode;
    request.method = "PUT";
  }
  const response = await fetch(url, request);
  if (response.ok) {
    typeInput.value = "";
    countInput.value = "";
    priceInput.value = "";
    const submitButton = document.getElementById("submitbutton");
    submitButton.value = "Add";
    mode = 0;
    getShoppingList();
  } else {
    console.log(
      "Server responded with a status " +
        response.status +
        " " +
        response.statusText
    );
  }
};

getShoppingList = async () => {
  const response = await fetch("/api/shopping");
  if (response.ok) {
    const list = await response.json();
    if (list) {
      populateTable(list);
    } else {
      console.log(
        "Server responded with a status " +
          response.status +
          " " +
          response.statusText
      );
    }
  }
};

removeItem = async (id) => {
  const url = "/api/shopping/" + id;
  const request = {
    method: "DELETE",
  };
  const response = await fetch(url, request);
  if (response.ok) {
    getShoppingList();
  } else {
    console.log(
      "Server responded with a status " +
        response.status +
        " " +
        response.statusText
    );
  }
};

editItem = (item) => {
  const typeInput = document.getElementById("type");
  const countInput = document.getElementById("count");
  const priceInput = document.getElementById("price");
  typeInput.value = item.type;
  countInput.value = item.count;
  priceInput.value = item.price;
  mode = item.id;
  const submitButton = document.getElementById("submitbutton");
  submitButton.value = "Save";
};

populateTable = (list) => {
  const root = document.getElementById("root");
  const oldTable = document.getElementById("table");
  if (oldTable) {
    root.removeChild(oldTable);
  }
  const table = document.createElement("table");
  table.setAttribute("class", "table table-striped");
  table.setAttribute("id", "table");

  //Table headers
  const header = document.createElement("thead");
  const headerRow = document.createElement("tr");

  //Type header
  const typeHeader = document.createElement("th");
  const typeHeaderNode = document.createTextNode("Type");
  typeHeader.appendChild(typeHeaderNode);

  //count header
  const countHeader = document.createElement("th");
  const countHeaderNode = document.createTextNode("Count");
  countHeader.appendChild(countHeaderNode);

  //price header
  const priceHeader = document.createElement("th");
  const priceHeaderNode = document.createTextNode("Price");
  priceHeader.appendChild(priceHeaderNode);

  //remove header
  const removeHeader = document.createElement("th");
  const removeHeaderNode = document.createTextNode("Remove");
  removeHeader.appendChild(removeHeaderNode);

  //edit header
  const editHeader = document.createElement("th");
  const editHeaderNode = document.createTextNode("Edit");
  editHeader.appendChild(editHeaderNode);

  headerRow.append(
    typeHeader,
    countHeader,
    priceHeader,
    removeHeader,
    editHeader
  );
  header.appendChild(headerRow);
  table.appendChild(header);

  //Table body
  const body = document.createElement("tbody");
  for (let i = 0; i < list.length; i++) {
    const row = document.createElement("tr");
    for (x in list[i]) {
      if (x === "id") {
        continue;
      }
      const column = document.createElement("td");
      const info = document.createTextNode(list[i][x]);
      column.appendChild(info);
      row.appendChild(column);
    }
    const removeColumn = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "btn btn-danger");
    const removeText = document.createTextNode("Remove");
    removeButton.appendChild(removeText);
    removeButton.addEventListener("click", function (e) {
      removeItem(list[i].id);
    });
    removeColumn.appendChild(removeButton);

    const editColumn = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.setAttribute("class", "btn btn-secondary");
    const editText = document.createTextNode("Edit");
    editButton.appendChild(editText);
    editButton.addEventListener("click", function (e) {
      editItem(list[i]);
    });
    editColumn.appendChild(editButton);

    row.append(removeColumn, editColumn);
    body.appendChild(row);
  }
  table.appendChild(body);
  root.appendChild(table);
};
