let updateYear = document.getElementById("date");

function date() {
  const date = new Date();
  let year = date.getFullYear();

  updateYear.textContent = year;
}

date();
