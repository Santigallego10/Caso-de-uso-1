import { Product } from "./model/Product.js";

// Definir los datos iniciales de la tabla
const dataSet = [];

let tabla;
let loginForm = document.getElementById("product_form");

function deleteProduct(name) {
  for (let index = 0; index < dataSet.length; index++) {
    const element = dataSet[index];
    if (element[0] == name) {
      dataSet.splice(index, 1);
    }
  }
  tabla.clear().rows.add(dataSet).draw();
}

function showButton(bool) {
  if (bool) {
    document.getElementById("submit_container").style.display = "none";
    document.getElementById("edit_container").style.display = "block";
  } else {
    document.getElementById("submit_container").style.display = "block";
    document.getElementById("edit_container").style.display = "none";
  }
}

function editProduct(name) {
  for (let index = 0; index < dataSet.length; index++) {
    const element = dataSet[index];
    if (element[0] == name) {
      document.getElementById("input_name").value = element[0];
      document.getElementById("input_price").value = element[1];
      document.getElementById("input_sku").value = element[2];
      document.getElementById("input_stock").value = element[3];
      showButton(true);
    }
  }
  tabla.clear().rows.add(dataSet).draw();
}

$(document).ready(function () {
  tabla = $("#table").DataTable({
    columns: [
      { title: "Nombre" },
      { title: "Precio" },
      { title: "SKU" },
      { title: "Stock" },
      { title: "Opciones" },
    ],
    data: dataSet,
  });

  $("#table").on("click", ".btn-danger", function () {
    let name = $(this).closest("tr").find("td:first").text();
    deleteProduct(name);
  });

  $("#table").on("click", ".btn-primary ", function () {
    let name = $(this).closest("tr").find("td:first").text();
    editProduct(name);
  });
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById("input_name").value;
  let price = document.getElementById("input_price").value;
  let sku = document.getElementById("input_sku").value;
  let stock = document.getElementById("input_stock").value;

  let product = new Product(name, price, sku, stock);

  const nuevoDato = [
    product.name,
    product.price,
    product.sku,
    product.stock,
    "<button type='button' class='btn btn-primary delete_btn'>Editar</button>" +
      "<button type='button' class='btn btn-danger'>Eliminar</button>",
  ];

  dataSet.push(nuevoDato);

  tabla.clear().rows.add(dataSet).draw();
});
