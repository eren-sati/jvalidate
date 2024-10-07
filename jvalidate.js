function jvalidate(formId) {
    this.formId = formId;

    this.validate = function (options) {
        let textElements = document.getElementById(this.formId).querySelectorAll('input[type="text"]');
        let passwordElements = document.getElementById(this.formId).querySelectorAll('input[type="password"]');
        let emailElements = document.getElementById(this.formId).querySelectorAll('input[type="email"]');
        let checkboxElements = document.getElementById(this.formId).querySelectorAll('input[type="checkbox"]');

        let selectElements = document.getElementById(this.formId).querySelectorAll('select');

        function createTippy(element, feedbackElement) {
            return tippy(element, {
                appendTo: feedbackElement,
                content: "",
                allowHTML: true,
                placement: "right",
                trigger: "manual",
                hideOnClick: false,
                arrow: true,
                animation: "none",
                onCreate() {
                    element.setAttribute("aria-describedby", "");

                    let tippyRoots = feedbackElement.children;
                    for (let tippyRoot of tippyRoots) {
                        tippyRoot.remove();
                    }
                },
                onMount() {
                    if (element.dataset.distance != undefined) {
                        let distanceItem = feedbackElement.children[0].children[0];
                        let distance = String(element.dataset.distance) + "px";
                        let tippyPlacement = this.placement;

                        if (tippyPlacement == "bottom" || tippyPlacement == "bottom-start" || tippyPlacement == "bottom-end") {
                            distanceItem.style.top = distance;
                        }
                        else if (tippyPlacement == "top" || tippyPlacement == "top-start" || tippyPlacement == "top-end") {
                            distanceItem.style.top = "-" + distance;
                        }
                        else if (tippyPlacement == "left" || tippyPlacement == "left-start" || tippyPlacement == "left-end") {
                            distanceItem.style.right = distance
                        }
                        else {
                            distanceItem.style.left = distance
                        }
                    }

                    if (element.dataset.animate) {
                        feedbackElement.querySelector(".tippy-box").style.setProperty("--animate-duration", `${element.dataset.animateDuration}ms`);

                        feedbackElement.querySelector(".tippy-box").addEventListener("animationend", eval(element.dataset.animateEndfunction));

                        feedbackElement.querySelector(".tippy-box").classList.add("animate__animated");
                        feedbackElement.querySelector(".tippy-box").classList.add(`${element.dataset.animateClass}`);
                    }
                }
            })
        }

        function addInvalidClass(element, validClass, invalidClass) {
            element.classList.remove(validClass);
            element.classList.add(invalidClass);
        }

        function addValidClass(element, validClass, invalidClass) {
            element.classList.remove(invalidClass);
            element.classList.add(validClass);
        }

        function requiredValid(element, validClass, invalidClass, tippyInstance) {
            if (element.validity.valueMissing == true) {
                addInvalidClass(element, validClass, invalidClass);

                tippyInstance.setContent(element.dataset.requiredText);
                tippyInstance.show();

                event.preventDefault();
                return false;
            }
            else {
                addValidClass(element, validClass, invalidClass);
            }
        }

        function minlengthValid(element, validClass, invalidClass, tippyInstance) {
            if (element.value.length < element.dataset.minlength) {
                addInvalidClass(element, validClass, invalidClass);

                tippyInstance.setContent(element.dataset.minlengthText);
                tippyInstance.show();

                event.preventDefault();
                return false;
            }
            else {
                addValidClass(element, validClass, invalidClass);
            }
        }

        function patternValid(element, validClass, invalidClass, tippyInstance) {
            if (element.validity.patternMismatch == true) {
                addInvalidClass(element, validClass, invalidClass);

                tippyInstance.setContent(element.dataset.patternText);
                tippyInstance.show();

                event.preventDefault();
                return false;
            }
            else {
                addValidClass(element, validClass, invalidClass);
            }
        }

        function maxlengthValid(element, validClass, invalidClass, tippyInstance) {
            if (element.value.length > element.dataset.maxlength) {
                addInvalidClass(element, validClass, invalidClass);

                tippyInstance.setContent(element.dataset.maxlengthText);
                tippyInstance.show();

                event.preventDefault();
                return false;
            }
            else {
                addValidClass(element, validClass, invalidClass);
            }
        }

        function emailValid(element, validClass, invalidClass, tippyInstance) {
            if (element.validity.typeMismatch == true) {
                addInvalidClass(element, validClass, invalidClass);

                tippyInstance.setContent(element.dataset.emailText);
                tippyInstance.show();

                event.preventDefault();
                return false;
            }
            else {
                addValidClass(element, validClass, invalidClass);
            }
        }

        function formSubmitEvent(event) {

            textElements.forEach((el) => {
                let element = el;
                let feedbackElement = document.querySelector("." + element.dataset.feedback);
                let value = element.value;

                if (element.dataset.jvalidate == "on") {
                    let tippyInstance = createTippy(element, feedbackElement);

                    (function () {
                        if (element.getAttribute("required") != null) {
                            if (requiredValid(element, "text-valid", "text-invalid", tippyInstance) == false) {
                                return;
                            }
                        }
                        if (element.dataset.minlength != undefined) {
                            if (minlengthValid(element, "text-valid", "text-invalid", tippyInstance) == false) {
                                return;
                            }
                        }
                        if (element.getAttribute("pattern") != null) {
                            if (patternValid(element, "text-valid", "text-invalid", tippyInstance) == false) {
                                return;
                            }
                        }
                        if (element.dataset.maxlength != undefined) {
                            if (maxlengthValid(element, "text-valid", "text-invalid", tippyInstance) == false) {
                                return;
                            }
                        }
                    })();
                }
            });

            passwordElements.forEach((el) => {
                let element = el;
                let feedbackElement = document.querySelector("." + element.dataset.feedback);
                let value = element.value;

                if (element.dataset.jvalidate == "on") {
                    let tippyInstance = createTippy(element, feedbackElement);

                    (function () {
                        if (element.getAttribute("required") != null) {
                            if (requiredValid(element, "password-valid", "password-invalid", tippyInstance) == false) {
                                return;
                            }
                        }
                        if (element.dataset.minlength != undefined) {
                            if (minlengthValid(element, "password-valid", "password-invalid", tippyInstance) == false) {
                                return;
                            }
                        }
                        if (element.getAttribute("pattern") != null) {
                            if (patternValid(element, "password-valid", "password-invalid", tippyInstance) == false) {
                                return;
                            }
                        }
                        if (element.dataset.maxlength != undefined) {
                            if (maxlengthValid(element, "password-valid", "password-invalid", tippyInstance) == false) {
                                return;
                            }
                        }
                    })();
                }
            })

            emailElements.forEach((el) => {
                let element = el;
                let feedbackElement = document.querySelector("." + element.dataset.feedback);
                let value = element.value;

                if (element.dataset.jvalidate == "on") {
                    let tippyInstance = createTippy(element, feedbackElement);

                    (function () {
                        if (element.getAttribute("required") != null) {
                            if (requiredValid(element, "email-valid", "email-invalid", tippyInstance) == false) {
                                return;
                            }
                        }
                        if (element.dataset.emailControl == "true") {
                            if (emailValid(element, "email-valid", "email-invalid", tippyInstance) == false) {
                                return;
                            }
                        }
                    })();
                }
            });

            checkboxElements.forEach((el) => {
                let element = el;
                let feedbackElement = document.querySelector("." + element.dataset.feedback);

                if (element.dataset.jvalidate == "on") {
                    let tippyInstance = createTippy(element, feedbackElement);

                    (function () {
                        if (element.getAttribute("required") != null) {
                            if (requiredValid(element, "checkbox-valid", "checkbox-invalid", tippyInstance) == false) {
                                return;
                            }
                        }
                    })()
                }
            });

            selectElements.forEach((el) => {
                let element = el;
                let feedbackElement = document.querySelector("." + element.dataset.feedback);
                let value = element.value;

                if (element.dataset.jvalidate == "on") {
                    let tippyInstance = createTippy(element, feedbackElement);

                    (function () {
                        if (element.getAttribute("required") != null) {
                            if (element.dataset.firstchildDisabled == "true") {
                                if (value == element.children[0].value) {
                                    addInvalidClass(element, "select-valid", "select-invalid");

                                    tippyInstance.setContent(element.dataset.requiredText);
                                    tippyInstance.show();

                                    event.preventDefault();
                                    return false;
                                }
                                else {
                                    addValidClass(element, "select-valid", "select-invalid");
                                }
                            }
                            else {
                                addValidClass(element, "select-valid", "select-invalid");
                            }
                        }
                        else {
                            addValidClass(element, "select-valid", "select-invalid");
                        }
                    })();
                }
            });
        }

        function handle_oninput_typeText() {
            let element = this;
            let feedbackElement = document.querySelector("." + element.dataset.feedback);
            let value = element.value;

            let tippyInstance = createTippy(element, feedbackElement);

            (function () {
                if (element.getAttribute("required") != null) {
                    if (requiredValid(element, "text-valid", "text-invalid", tippyInstance) == false) {
                        return;
                    }
                }
                if (element.dataset.minlength != undefined) {
                    if (minlengthValid(element, "text-valid", "text-invalid", tippyInstance) == false) {
                        return;
                    }
                }
                if (element.getAttribute("pattern") != null) {
                    if (patternValid(element, "text-valid", "text-invalid", tippyInstance) == false) {
                        return;
                    }
                }
                if (element.dataset.maxlength != undefined) {
                    if (maxlengthValid(element, "text-valid", "text-invalid", tippyInstance) == false) {
                        return;
                    }
                }
            })();
        }

        function handle_oninput_typePassword() {
            let element = this;
            let feedbackElement = document.querySelector("." + element.dataset.feedback);
            let value = element.value;

            let tippyInstance = createTippy(element, feedbackElement);

            (function () {
                if (element.getAttribute("required") != null) {
                    if (requiredValid(element, "password-valid", "password-invalid", tippyInstance) == false) {
                        return;
                    }
                }
                if (element.dataset.minlength != undefined) {
                    if (minlengthValid(element, "password-valid", "password-invalid", tippyInstance) == false) {
                        return;
                    }
                }
                if (element.getAttribute("pattern") != null) {
                    if (patternValid(element, "password-valid", "password-invalid", tippyInstance) == false) {
                        return;
                    }
                }
                if (element.dataset.maxlength != undefined) {
                    if (maxlengthValid(element, "password-valid", "password-invalid", tippyInstance) == false) {
                        return;
                    }
                }
            })();
        }

        function handle_oninput_typeEmail() {
            let element = this;
            let feedbackElement = document.querySelector("." + element.dataset.feedback);
            let value = element.value;

            let tippyInstance = createTippy(element, feedbackElement);

            (function () {
                if (element.getAttribute("required") != null) {
                    if (requiredValid(element, "email-valid", "email-invalid", tippyInstance) == false) {
                        return;
                    }
                }
                if (element.dataset.emailControl == "true") {
                    if (emailValid(element, "email-valid", "email-invalid", tippyInstance) == false) {
                        return;
                    }
                }
            })();
        }

        function handle_oninput_typeCheckbox() {
            let element = this;
            let feedbackElement = document.querySelector("." + element.dataset.feedback);

            let tippyInstance = createTippy(element, feedbackElement);

            (function () {
                if (element.getAttribute("required") != null) {
                    if (requiredValid(element, "checkbox-valid", "checkbox-invalid", tippyInstance) == false) {
                        return;
                    }
                }
            })();
        }

        function handle_oninput_typeSelect() {
            let element = this;
            let feedbackElement = document.querySelector("." + element.dataset.feedback);
            let value = element.value;

            let tippyInstance = createTippy(element, feedbackElement);

            (function () {
                if (element.getAttribute("required") != null) {
                    if (element.dataset.firstchildDisabled == "true") {
                        if (value == element.children[0].value) {
                            addInvalidClass(element, "select-valid", "select-invalid");

                            tippyInstance.setContent(element.dataset.requiredText);
                            tippyInstance.show();

                            event.preventDefault();
                            return false;
                        }
                        else {
                            addValidClass(element, "select-valid", "select-invalid");
                        }
                    }
                    else {
                        addValidClass(element, "select-valid", "select-invalid");
                    }
                }
                else {
                    addValidClass(element, "select-valid", "select-invalid");
                }
            })();
        }

        document.getElementById(this.formId).addEventListener("submit", formSubmitEvent);

        if (options.oninput) {
            for (let textElement of textElements) {
                if (textElement.dataset.jvalidate == "on") {
                    textElement.addEventListener("input", handle_oninput_typeText);
                }
            }

            for (let passwordElement of passwordElements) {
                if (passwordElement.dataset.jvalidate == "on") {
                    passwordElement.addEventListener("input", handle_oninput_typePassword);
                }
            }

            for (let emailElement of emailElements) {
                if (emailElement.dataset.jvalidate == "on") {
                    emailElement.addEventListener("input", handle_oninput_typeEmail);
                }
            }

            for (let checkboxElement of checkboxElements) {
                if (checkboxElement.dataset.jvalidate == "on") {
                    checkboxElement.addEventListener("input", handle_oninput_typeCheckbox);
                }
            }

            for (let selectElement of selectElements) {
                if (selectElement.dataset.jvalidate == "on") {
                    selectElement.addEventListener("input", handle_oninput_typeSelect);
                }
            }
        }
    };
}