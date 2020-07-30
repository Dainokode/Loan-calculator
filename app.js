// Loan Calculator

// Break code into small pieces

// add event listener to form the event listener should be submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  // hide results
  document.getElementById("results").style.display = "none";

  // show loader
  document.getElementById("loading").style.display = "block";

  // show results after two seconds
  setTimeout(calculateResults, 2000);

  // prevent default event(submit)
  e.preventDefault();
});

// look for a function calculate and pass event as an argument
function calculateResults() {
  console.log("Calculating...");
  // in the function calculate:

  // select UI variables (inputs)
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  // calculation part:

  // use parseFloat on amount.value to get a decimal and store it into a variable
  const principal = parseFloat(amount.value);

  // do the same for interests and divide by 100 and and 12
  const calculatedInterests = parseFloat(interest.value) / 100 / 12;

  // do the same for payments and multiply by 12
  const calculatedPayments = parseFloat(years.value) * 12;

  // compute monthly payments

  // use Math.pow(1 +  interestsVariable , paymentsVariable) store in a variable
  const x = Math.pow(1 + calculatedInterests, calculatedPayments);

  // create a variable that stores the amount variable times previous step variable times interestsVariable divided by (x-1)
  const monthly = (principal * x * calculatedInterests) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // show results
    document.getElementById("results").style.display = "block";

    // hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

function showError(error) {
  // create div
  const errorDiv = document.createElement("div");

  // get heading
  const heading = document.querySelector("#heading");
  // get container
  const container = document.querySelector(".container");

  // add class to errorDiv
  errorDiv.classList.add("alert-error");

  // insert text
  errorDiv.appendChild(document.createTextNode(error));

  container.insertBefore(errorDiv, heading);

  // hide loader
  document.getElementById("loading").style.display = "none";

  // clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// function clearError
function clearError() {
  document.querySelector(".alert-error").remove();
}
