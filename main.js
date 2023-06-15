(() => {
  const container = document.createElement("div");
  container.classList.add("container");

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");

    const { form, inputs } = createForm();
    const [firstname, lastname, dadName, date, start, fac] = inputs;

    container.append(form);

    root.append(container);

    form.addEventListener(
      "submit",
      (e) => {
        if (!form.checkValidity()) {
          e.preventDefault();
          e.stopPropagation();
          form.classList.add("was-validated");
        }

        if (!inputs.some((el) => el.value === "")) {
          e.preventDefault();
          form.classList.remove("was-validated");

          console.log(
            firstname.value,
            lastname.value,
            dadName.value,
            date.value,
            start.value,
            fac.value
          );

          inputs.forEach((item) => (item.value = ""));
        }
      },
      false
    );
  });
})();
