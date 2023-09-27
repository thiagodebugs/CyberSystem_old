const form = document.getElementById("form");
const http = new XMLHttpRequest();
const url = "http://localhost/processa.php";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = form.nome;
  let cpf = form.cpf;
  let email = form.email;
  let tel = form.tel;

  if (name.value == "" || email.value == "") {
    alert("Preencha o compos obrigatórios!!");
  } else if (!valEmail(email)) {
    alert("Email invalido!");
  } else {
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(
      `name=${name.value}&cpf=${cpf.value}&email=${email.value}&tel=${tel.value}`
    );
    http.onload = () => {
      name.value = "";
      cpf.value = "";
      email.value = "";
      tel.value = "";
      alert("Enviado com sucesso!");
    };
  }
});

form.cpf.addEventListener("input", (e) => {
  form.cpf.value = form.cpf.value.replace(/\D/g, "");
  form.cpf.value = form.cpf.value.replace(
    /([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/g,
    "$1.$2.$3-$4"
  );
});

form.tel.addEventListener("input", (e) => {
  form.tel.value = form.tel.value.replace(/\D/g, "");
  form.tel.value = form.tel.value.replace(
    /([0-9]{2})([0-9]{5})([0-9]{4})/g,
    "($1) $2-$3"
  );
});

function valEmail(email) {
  usuario = email.value.substring(0, email.value.indexOf("@"));
  dominio = email.value.substring(
    email.value.indexOf("@") + 1,
    email.value.length
  );

  if (
    usuario.length >= 1 &&
    dominio.length >= 3 &&
    usuario.search("@") == -1 &&
    dominio.search("@") == -1 &&
    usuario.search(" ") == -1 &&
    dominio.search(" ") == -1 &&
    dominio.search(".") != -1 &&
    dominio.indexOf(".") >= 1 &&
    dominio.lastIndexOf(".") < dominio.length - 1
  ) {
    return true;
  } else return false;
}
