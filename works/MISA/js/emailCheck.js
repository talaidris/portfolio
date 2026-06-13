/* Name: Kanza Alam
* Student Number: 400528885
* Date created: April 12 2025
* Description: This is the JavaScript file to check if the email entry is valid or not
*              and displaying error messages accordingly for signup.html.
*/

// this event listener initializes the page when it loads
window.addEventListener("load", function () {

    // initializing variables to hold the information from the form
    let form = document.getElementById("signupForm");
    let emailWarning = document.getElementById("emailWarning");

    emailWarning.style.display = "none";

    /**
    * Validates the email format when the form is submitted. Displays an error message if invalid email format.
    *
    * @param {Event} event
    * @returns {void} - This function does not return any value.
    */
    form.addEventListener("submit", function (event) {

        let email = document.getElementById("email").value;

        // split the email at the "@" symbol and ensure it contains exactly one "@" by checking for two parts
        let emailParts = email.split("@");
        if (emailParts.length !== 2) {
            emailWarning.innerText = "Please enter a valid email address with a single '@' symbol.";
            emailWarning.style.display = "block";
            event.preventDefault();
            return;
        }

        let localPart = emailParts[0];
        let domainPart = emailParts[1];
        let domainParts = domainPart.split('.');

        // check the domain part (after the "@") and ensure it contains exactly one "."
        if (domainParts.length !== 2) {
            emailWarning.innerText = "Please enter a valid email domain with one '.' after the '@'.";
            emailWarning.style.display = "block";
            event.preventDefault();
            return;
        }

        // check if the local part starts with a dot, which is not allowed
        if (localPart.startsWith(".")) {
            emailWarning.innerText = "The part of the email before '@' should not start with a '.'.";
            emailWarning.style.display = "block";
            event.preventDefault();
            return;
        }

        // check if the local part ends with a dot, which is not allowed
        if (localPart.endsWith(".")) {
            emailWarning.innerText = "The part of the email before '@' should not end with a '.'.";
            emailWarning.style.display = "block";
            event.preventDefault();
            return;
        }

        // check if the domain part starts with a dot, which is not allowed
        if (domainPart.startsWith(".")) {
            emailWarning.innerText = "The part of the email after '@' should not start with a '.'.";
            emailWarning.style.display = "block";
            event.preventDefault();
            return;
        }

        // check if the domain part ends with a dot, which is not allowed
        if (domainPart.endsWith(".")) {
            emailWarning.innerText = "The part of the email after '@' should not end with a '.'.";
            emailWarning.style.display = "block";
            event.preventDefault();
            return;
        }

        // check if the part before "@" symbol (localPart) and the part after "@" symbol but before the "." (domainName) are the same
        if (localPart === domainParts[0]) {
            emailWarning.innerText = "The part before and after the '@' should not be the same.";
            emailWarning.style.display = "block";
            event.preventDefault();
            return;
        }

        emailWarning.innerText = "";
        emailWarning.style.display = "none";
    });
});