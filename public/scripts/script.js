// console.log("loaded");
document.addEventListener("DOMContentLoaded", function() {
    // initialize email format options and "other" textbox visibility on page load
    updateEmailFormatVisibility();
    updateOtherTextboxVisibility();

    // select the form 
    document.getElementById("contact-form").onsubmit = function(event) {
        clearErrors();
        let isValid = true;

        // validate first name
        let first = document.getElementById("fname").value;
        if (first.trim() === "") {
            document.getElementById("err-fname").style.display = "inline";
            isValid = false;
        }

        // validate last name
        let last = document.getElementById("lname").value;
        if (last.trim() === "") {
            document.getElementById("err-lname").style.display = "inline";
            isValid = false;
        }

        // validate email address
        let email = document.getElementById("email").value;
        let mailingListChecked = document.querySelector('input[name="mailinglist"]').checked;
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex

        if (mailingListChecked || !(email === "")) {
            if (email.trim() === "") {
                document.getElementById("err-email").innerText = "Required!";
                document.getElementById("err-email").style.display = "inline";
                isValid = false;
            } else if (!emailPattern.test(email)) {
                document.getElementById("err-email").innerText = "Invalid email format, must include @ and .";
                document.getElementById("err-email").style.display = "inline";
                isValid = false;
            }
        }

        // validate LinkedIn URL
        let linkedin = document.getElementById("linkedinurl").value;
        if (linkedin.trim() !== "" && !linkedin.startsWith("https://www.linkedin.com/in/")) {
            document.getElementById("err-linkedinurl").style.display = "inline";
            isValid = false;
        }

        // validate meeting selection
        let meeting = document.querySelector('select[name="meeting"]').value;
        if (meeting === "") {
            document.getElementById("err-meeting").style.display = "inline";
            isValid = false;
        }
        return isValid;
    }

    function clearErrors() {
        let errors = document.getElementsByClassName("err");
        for (let i = 0; i < errors.length; i++) {
            errors[i].style.display = "none"; 
        }
    }

    // show/hide email format options based on mailing list checkbox
    document.querySelector('input[name="mailinglist"]').onchange = function() {
        updateEmailFormatVisibility();
    }

    // show/hide "Other" textbox based on dropdown selection
    document.querySelector('select[name="meeting"]').onchange = function() {
        updateOtherTextboxVisibility();
    }
    
    function updateEmailFormatVisibility() {
        let emailFormatOptions = document.getElementById("email-row");
        let mailingListChecked = document.querySelector('input[name="mailinglist"]').checked;
        if (mailingListChecked) {
            emailFormatOptions.style.display = "block";
        } else {
            emailFormatOptions.style.display = "none";
        }
    }

    function updateOtherTextboxVisibility() {
        let otherSection = document.getElementById("other-section");
        
        let meetingValue = document.querySelector('select[name="meeting"]').value;
        if (meetingValue === "other met") {
            otherSection.style.display = "block";
        } else {
            otherSection.style.display = "none";
        }
    }
});
