const checkIfEmpty = (el, domEl) => {
  if (el.trim() === "") {
    domEl.classList.add("is-invalid");
  } else {
    domEl.classList.remove("is-invalid");
  }
};

const getCurrentDateString = () => {
  const currentDate = new Date(Date.now())
    .toLocaleDateString("en-US")
    .split("/")
    .reverse();

  return currentDate.join("-");
};
