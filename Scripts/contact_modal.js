document.addEventListener("DOMContentLoaded", function () {

    const contactModal = document.getElementById("contactModal");

    const contactButton = document.getElementById("contactButton");

    const modalClose = document.getElementById("modalClose");


    const contactForm = document.getElementById("contactForm");


    /*
        Открытие модального окна
    */

    function openModal() {

        contactModal.classList.add("is-open");

        contactModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("modal-open");


        // Ставим курсор в поле Name

        setTimeout(function () {

            document.getElementById("name").focus();

        }, 250);
    }


    /*
        Закрытие модального окна
    */

    function closeModal() {

        contactModal.classList.remove("is-open");

        contactModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove("modal-open");
    }


    /*
        Contact Us
    */

    contactButton.addEventListener(
        "click",
        openModal
    );


    /*
        X
    */

    modalClose.addEventListener(
        "click",
        closeModal
    );


    /*
        Клик по затемненному фону
    */

    contactModal.addEventListener(
        "click",
        function (event) {

            if (event.target === contactModal) {

                closeModal();

            }

        }
    );


    /*
        Escape
    */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                contactModal.classList.contains("is-open")
            ) {

                closeModal();

            }

        }
    );


    /*
        Send

        Пока ничего не отправляем.
    */

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            console.log("Form submitted");

        }
    );

});