(() => {
  const container = document.createElement("div");
  container.classList.add("container", "trans", "trans-active");

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");

    const { form, inputs, toggleButton, changeButton } = createForm();
    const [firstname, lastname, dadName, date, start, fac] = inputs;

    container.append(form);

    root.append(container);

    toggleButton.addEventListener("click", () => {
      container.classList.toggle("trans-active");
      toggleButton.classList.toggle("hide");
    });

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
          container.classList.toggle("trans-active");
          toggleButton.classList.toggle("hide");

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
