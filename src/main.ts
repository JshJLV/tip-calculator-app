const inputBill = document.getElementById("bill") as HTMLInputElement;
const inputTipPercentage = document.querySelectorAll(
  ".calculator__tip-radio"
) as NodeList;
const inputCustomTip = document.getElementById(
  "tip-custom"
) as HTMLInputElement;
const inputNumberPeople = document.getElementById(
  "number-people"
) as HTMLInputElement;
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

let billValue: number | null;
let percentageValue: number | null;
let peopleValue: number | null;
let selectedRadioLabel: HTMLLabelElement;
btnReset.disabled = true;

const calculateTotal = () => {
  if (!billValue || !peopleValue || !percentageValue) {
    return;
  }

  if (btnReset.disabled) {
    btnReset.disabled = false;
    btnReset.classList.remove("calculator__reset--disabled");
  }

  const tipPerPerson: number =
    (billValue * (percentageValue / 100)) / peopleValue;
  const totalWithoutPerson = billValue / peopleValue;
  spanTipAmountPerson.innerText = `$${tipPerPerson.toFixed(2)}`;
  spanTotalPerson.innerText = `$${(tipPerPerson + totalWithoutPerson).toFixed(
    2
  )}`;
};

inputBill.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;
  const spanError = target?.previousElementSibling?.children[1];

  if (target && target.value && Number(target.value) > 0) {
    target?.classList.remove("calculator__input--error");
    spanError?.classList.add("hide-span");
    billValue = Number(target.value);
    calculateTotal();
  } else {
    spanError?.classList.remove("hide-span");
    target?.classList.add("calculator__input--error");
  }
});

inputTipPercentage.forEach((radio) => {
  radio.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement;
    const labelSibling = target.nextElementSibling as HTMLLabelElement;
    if (target.checked) {
      if (percentageValue) {
        inputCustomTip.value = "";
      }

      if (selectedRadioLabel) {
        selectedRadioLabel.htmlFor !== labelSibling.htmlFor
          ? selectedRadioLabel.classList.remove(
              "calculator__tip-label--selected"
            )
          : "";
      }

      selectedRadioLabel = labelSibling;
      selectedRadioLabel.classList.add("calculator__tip-label--selected");
      percentageValue = Number(target.value);
      calculateTotal();
    }
  });
});

inputCustomTip.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;
  if (percentageValue) {
    inputTipPercentage!.forEach((radio) => {
      (radio as HTMLInputElement).checked = false;
    });

    if (selectedRadioLabel) {
      selectedRadioLabel.classList.remove("calculator__tip-label--selected");
    }
  }
  percentageValue = Number(target.value);
});

inputCustomTip.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;
  percentageValue = Number(target.value);
  calculateTotal();
});

inputNumberPeople.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;
  const spanError = target.previousElementSibling?.children[1];

  if (target && target.value && Number(target.value) > 0) {
    target?.classList.remove("calculator__input--error");
    spanError?.classList.add("hide-span");
    peopleValue = Number(target.value);
    calculateTotal();
  } else {
    spanError?.classList.remove("hide-span");
    target?.classList.add("calculator__input--error");
  }
});

btnReset.addEventListener("click", () => {
  // reset values
  billValue = null;
  percentageValue = null;
  peopleValue = null;

  // reset input bill
  inputBill.value = "";
  inputBill.classList.remove("calculator__input--error");

  // reset input radio
  inputTipPercentage.forEach((radio) => {
    (radio as HTMLInputElement).checked = false;
  });
  if (selectedRadioLabel) {
    selectedRadioLabel.classList.remove("calculator__tip-label--selected");
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
});
