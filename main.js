(() => {
  let IS_VALID_YEAR = false;

  const container = document.createElement("div");
  container.classList.add("container", "trans", "trans-active");

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");

    const { form, inputs, toggleButton, startValidate, dateValidate } =
      createForm();
    const [firstname, lastname, dadName, date, start, facultet] = inputs;

    container.append(form);
    root.append(container);

    toggleButton.addEventListener("click", () => {
      container.classList.toggle("trans-active");
      toggleButton.classList.toggle("hide");
    });

    const checkStartYear = (year) => {
      const condition =
        year > 2000 && year <= new Date(Date.now()).getFullYear();
      if (!condition) {
        startValidate.textContent = "от 2000г. до текущего";
      }

      IS_VALID_YEAR = condition;
    };

    inputs.forEach((el) =>
      el.addEventListener("input", (e) => checkIfEmpty(e.target.value, el))
    );

    start.addEventListener("input", (e) =>
      checkStartYear(e.target.value, start)
    );

    form.addEventListener(
      "submit",
      (e) => {
        if (!form.checkValidity()) {
          e.preventDefault();
          e.stopPropagation();
          form.classList.add("was-validated");
        }

        const allFilled = !inputs
          .map((el) => el.value.trim() === "")
          .some((el) => el);

        if (allFilled && IS_VALID_YEAR) {
          e.preventDefault();
          form.classList.remove("was-validated");
          container.classList.toggle("trans-active");
          toggleButton.classList.toggle("hide");

          console.log(
            firstname.value.trim(),
            lastname.value.trim(),
            dadName.value.trim(),
            date.value.trim(),
            start.value.trim(),
            facultet.value.trim()
          );

          inputs.forEach((item) => (item.value = ""));
        }

        e.preventDefault();
      },
      false
    );
  });
})();
