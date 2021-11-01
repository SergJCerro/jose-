function clearing() {
    //clears all text fields and sets focus to the first field in the form. 

    document.getElementById("payment").value = "";
    document.getElementById("payment").disabled = true;
    document.getElementById("term").value = "";
    document.getElementById("apr").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("amount_warning").innerHTML = "";
    document.getElementById("term_warning").innerHTML = "";
    document.getElementById("apr_warning").innerHTML = "";
    document.getElementById("apr").focus();

}


function beginsWithFloat(val) {
    val = parseFloat(val);
    return !isNaN(val);
}

function computePayment(principal, annualRate, years, periodsPerYear) {
    let r = annualRate / periodsPerYear;
    let p = (principal * r) / (1 - (1 + r) ** (-periodsPerYear * years));
    return p.toFixed(2);
}

function validateApr() {
    //VALIDATE APR
    var apr = document.getElementById("apr").value;
    //If it's empty
    if (!apr) {
        document.getElementById("apr_warning").innerHTML = "This field is mandatory";
        return false;
    }
    //If it's a number
    else if (!beginsWithFloat(apr)) {
        document.getElementById("apr_warning").innerHTML = "This field must be a number between 0 and 25% not inclusive";
        return false;
    }
    //if it's the correct size
    else if (apr < 0 || apr > 25) {
        document.getElementById("apr_warning").innerHTML = "This field must be a number between 0 and 25% not inclusive";
        return false;
    } else {
        document.getElementById("apr_warning").innerHTML = "";
        return true;
    }
}

function validateTerm() {
    //VALIDATE TERM
    var term = document.getElementById("term").value;
    //If it's empty
    if (!term) {
        document.getElementById("term_warning").innerHTML = "This field is mandatory";
        return false;
    } else if (!beginsWithFloat(term)) {
        document.getElementById("term_warning").innerHTML = "This field must be a number between 0 and 40 inclusive";
        return false;
    }
    //if it's the correct size
    else if (term < 0 || term >= 40) {
        document.getElementById("term_warning").innerHTML = "This field must be a number between 0 and 40 inclusive";
        return false;

    } else {
        document.getElementById("term_warning").innerHTML = "";
        return true;
    }
}

function validateAmount() {
    //VALIDATE AMOUNT
    var amount = document.getElementById("amount").value;
    //If it's empty
    if (!amount) {
        document.getElementById("amount_warning").innerHTML = "This field is mandatory";
        return false;
    } else if (!beginsWithFloat(amount)) {
        document.getElementById("amount_warning").innerHTML = "This field must be a number";
        return false;
    }
    //if it's the correct size
    else if (amount < 0) {
        document.getElementById("amount_warning").innerHTML = "This field must be a number bigger than 0";
        return false;
    } else {
        document.getElementById("amount_warning").innerHTML = "";
        return true;
    }
}

function calculateMortage() {
    var booleanApr = false;
    var booleanamount = false;
    var booleanTerm = false;

    var apr = document.getElementById("apr").value;
    booleanApr = validateApr();

    var term = document.getElementById("term").value;
    booleanTerm = validateTerm();

    var amount = document.getElementById("amount").value;
    booleanamount = validateAmount();


    //give focus
    if (!booleanApr) {
        document.getElementById("apr").focus();
    } else if (!booleanTerm) {
        document.getElementById("term").focus();
    } else if (!booleanamount) {
        document.getElementById("amount").focus();
    } else {

        document.getElementById("payment").value = computePayment(amount, apr / 100, term, 12);
    }
}
