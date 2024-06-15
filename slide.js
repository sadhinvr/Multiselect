// ////////
// const st = document.createElement("style");
// st.textContent = `
//         .inp-required{
//             border:red solid 1px !important;
//         }

//         html{
//             scroll-behavior: smooth;
//         }
//     `;
// document.head.appendChild(st);

//////////

(function () {
    let a = document.querySelectorAll(".two-button"),
        dots = document.querySelector(".w-slider-nav.w-round").children,
        slideNo = 1;

    function url(e) {
        let t = e.currentTarget;
        let val = t.value.trim().replace("http://", "");
        t.value = val;

        if (val) {
            if (t.checkValidity()) {
                t.classList.remove("inp-required");
            } else {
                t.value = "https://" + val;
                if (t.checkValidity()) {
                    t.classList.remove("inp-required");
                } else {
                    t.value = val;
                    t.classList.add("inp-required");
                }
            }
        }
    }
    function onchangeforall(e) {
        // console.log("hello ");
        let ct = e.currentTarget;

        if (ct.type == "url") {
            url(e);
        } else if (ct.classList.contains("mul_inp_hidden")) {
            let cls =
                ct.parentElement.nextElementSibling.firstElementChild.classList;
            console.log("inside foreach");
            if (ct.checkValidity()) {
                cls.remove("inp-required");
            } else {
                cls.add("inp-required");
                alltrue = false;
            }
        } else {
            if (ct.checkValidity()) {
                ct.classList.remove("inp-required");
            } else {
                ct.classList.add("inp-required");
                alltrue = false;
            }
        }
    }
    function changeSlide(e) {
        let n = e.currentTarget.dataset.slide;

        if (n > 0 && n <= a.length) {
            if (n > slideNo) {
                const formHolder = e.currentTarget.parentElement.parentElement;
                const inpText =
                    formHolder.querySelectorAll('input[type="text"]');
                const inpUrl = formHolder.querySelectorAll('input[type="url"]');
                const inpNum = formHolder.querySelectorAll(
                    'input[type="number"]'
                );
                const inpTel = formHolder.querySelectorAll('input[type="tel"]');
                const select = formHolder.querySelectorAll(
                    "select:not([multiple])"
                );
                const textarea = formHolder.querySelectorAll("textarea");
                const all = [
                    ...inpText,
                    ...inpUrl,
                    ...inpNum,
                    ...inpTel,
                    ...select,
                    ...textarea,
                ];

                let alltrue = true;

                // const allR = a.querySelector('[req]')
                all.forEach((cur) => {
                    if (cur.classList.contains("mul_inp_hidden")) {
                        let cls =
                            cur.parentElement.nextElementSibling
                                .firstElementChild.classList;

                        // console.log("inside foreach");
                        if (cur.checkValidity()) {
                            cls.remove("inp-required");
                        } else {
                            cls.add("inp-required");
                            alltrue = false;
                        }
                    } else {
                        if (cur.checkValidity()) {
                            cur.classList.remove("inp-required");
                        } else {
                            cur.classList.add("inp-required");
                            alltrue = false;
                        }
                    }

                    setTimeout(() => {
                        cur.removeEventListener("change", onchangeforall);
                        // console.log("hellodjkdjfkdjkf");
                    }, 100);

                    setTimeout(() => {
                        cur.addEventListener("change", onchangeforall);
                        // console.log("wwww");
                    }, 300);
                });

                alltrue || formHolder.querySelector(".inp-required").focus();

                if (alltrue) {
                    dots[n - 1].click();
                    slideNo = n;
                }

                // console.log(alltrue, n > 0, n <= a.length, a, slideNo);

                // dots[0].click();
            } else if (n < slideNo) {
                dots[n - 1].click();
                slideNo = n;
            }
        }
    }

    a.forEach((cur, i) => {
        let btn = cur.children;
        btn[0].dataset.slide || (btn[0].dataset.slide = i);
        btn[1].dataset.slide || (btn[1].dataset.slide = i + 2);
        btn[0].addEventListener("click", changeSlide);
        btn[1].addEventListener("click", changeSlide);
    });
})();
