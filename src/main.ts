const inputBill = document.getElementById("bill") as HTMLInputElement;
const inputTipPercentage = document.querySelectorAll(
  ".calculator__tip-radio"
) as NodeList;
const inputCustomTip = document.getElementById(
  "tip-custom"
) as HTMLInputElement;
const inputNumberPeople = document.getElementById("people") as HTMLInputElement;
const spanError = document.querySelectorAll(
  ".calculator__span--error"
) as NodeList;
const btnReset = document.getElementById("btn-reset") as HTMLButtonElement;
const spanTipAmountPerson = document.getElementById(
  "tip-amount-person"
) as HTMLSpanElement;
const spanTotalPerson = document.getElementById(
  "total-person"
) as HTMLSpanElement;

type inputKeys = "bill" | "percentage" | "people";

const inputValues: Record<inputKeys, number | null> = {
  bill: null,
  percentage: null,
  people: null,
};

let previusLabel: HTMLLabelElement | null = null;
btnReset.disabled = true;

const calculateTotal = () => {
  if (!inputValues.bill || !inputValues.people || !inputValues.percentage) {
    return;
  }

  if (btnReset.disabled) {
    btnReset.disabled = false;
    btnReset.classList.remove("calculator__reset--disabled");
  }

  const tipPerPerson: number =
    (inputValues.bill * (inputValues.percentage / 100)) / inputValues.people;
  const totalWithoutPerson = inputValues.bill / inputValues.people;
  spanTipAmountPerson.innerText = `$${tipPerPerson.toFixed(2)}`;
  spanTotalPerson.innerText = `$${(tipPerPerson + totalWithoutPerson).toFixed(
    2
  )}`;
};

// Function to handle the inputs bill and people
// where the value is extracted and stored in the inputValues ​​object
const handleInputs = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const spanError = target?.previousElementSibling?.children[1];
  const key = target.id as inputKeys;

  if (target && target.value && Number(target.value) > 0) {
    target.classList.remove("calculator__input--error");
    spanError?.classList.add("hide-span");
    inputValues[key] = Number(target.value);
    calculateTotal();
  } else {
    spanError?.classList.remove("hide-span");
    target?.classList.add("calculator__input--error");
  }
};

const handleInputsPercentage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const labelSibling = target.previousElementSibling as HTMLLabelElement;

  if (target.type === "radio") {
    previusLabel
      ? previusLabel.classList.remove("calculator__tip-label--selected")
      : "";
    labelSibling.classList.add("calculator__tip-label--selected");
    inputCustomTip.value = "";
    previusLabel = labelSibling;
  } else {
    previusLabel?.classList.remove("calculator__tip-label--selected");
  }

  inputValues.percentage = Number(target.value);
  calculateTotal();
};

const handleResetPage = () => {
  // reset values
  inputValues.bill = null;
  inputValues.percentage = null;
  inputValues.people = null;

  // reset input bill
  inputBill.value = "";
  inputBill.classList.remove("calculator__input--error");

  // reset input radio
  inputTipPercentage.forEach((radio) => {
    (radio as HTMLInputElement).checked = false;
  });

  if (previusLabel) {
    previusLabel.classList.remove("calculator__tip-label--selected");
  }

  // reset input custom tip
  inputCustomTip.value = "";

  // reset input number of people
  inputNumberPeople.value = "";
  inputNumberPeople.classList.remove("calculator__input--error");

  // clean errors
  spanError.forEach((span) => {
    (span as HTMLSpanElement).classList.add("hide-span");
  });

  // reset text
  spanTipAmountPerson.innerText = "$0.00";
  spanTotalPerson.innerText = "$0.00";

  // disabled button
  btnReset.disabled = true;
  btnReset.classList.add("calculator__reset--disabled");
};

window.addEventListener("DOMContentLoaded", () => {
  inputBill.addEventListener("input", handleInputs);
  inputTipPercentage.forEach((radio) => {
    radio.addEventListener("input", handleInputsPercentage);
  });
  inputCustomTip.addEventListener("input", handleInputsPercentage);
  inputNumberPeople.addEventListener("input", handleInputs);
  btnReset.addEventListener("click", handleResetPage);
});
