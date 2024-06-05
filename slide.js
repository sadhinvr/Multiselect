(function () {
    // ////////
    const st = document.createElement("style");
    st.textContent = `
        .inp-required{
            border:red solid 1px;
        }

        html{
            scroll-behavior: smooth;
        }
    `;
    document.head.appendChild(st);

    document.createElement("div").focus();
    //////////

    var a = document.querySelectorAll(".two-button"),
        dots = document.querySelector(".w-slider-nav.w-round").children,
        slideNo = 1;
    function url(e) {
        var t = e.currentTarget;
        var val = t.value.trim();
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
    function fun() {
        function tel(e) {
            var val = e.currentTarget.value;
            if (val) {
                console.log(val);
            }
        }

        const inpUrl = document.querySelectorAll('input[type="url"]');
        const inpTel = document.querySelectorAll('input[type="tel"]');
        inpTel.forEach((cur) => {
            cur.addEventListener("change", tel);
        });

        inpUrl.forEach((cur) => {
            cur.addEventListener("change", url);
        });
    }

    // fun();

    function changeSlide(e) {
        var n = e.currentTarget.dataset.slide;
        if (n > slideNo) {
            const a = e.currentTarget.parentElement.parentElement;
            const inpText = a.querySelectorAll('input[type="text"]');
            const inpUrl = a.querySelectorAll('input[type="url"]');
            const inpNum = a.querySelectorAll('input[type="number"]');
            const inpTel = a.querySelectorAll('input[type="tel"]');
            const select = a.querySelectorAll("select:not([multiple])");
            const textarea = a.querySelectorAll("textarea");
            const all = [
                ...inpText,
                ...inpUrl,
                ...inpNum,
                ...inpTel,
                ...select,
                ...textarea,
            ];

            let alltrue = true;

            function onchangeforall(e) {
                console.log("hello ");
                var ct = e.currentTarget;

                if (ct.type == "url") {
                    url(e);
                } else if (ct.classList.contains("mul_inp_hidden")) {
                    var cls = ct.parentElement.nextElementSibling.classList;
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

            // const allR = a.querySelector('[req]')
            all.forEach((cur) => {
                cur.removeEventListener("change", onchangeforall);

                if (cur.classList.contains("mul_inp_hidden")) {
                    var cls = cur.parentElement.nextElementSibling.classList;
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

                cur.addEventListener("change", onchangeforall);
            });

            alltrue || a.querySelector(".inp-required").focus();

            alltrue &&
                n > 0 &&
                n <= a.length &&
                dots[n - 1].click() &&
                (slideNo = n);

            dots[0].click();
        }
    }
    a.forEach((cur, i) => {
        var btn = cur.children;
        btn[0].dataset.slide || (btn[0].dataset.slide = i);
        btn[1].dataset.slide || (btn[1].dataset.slide = i + 2);
        btn[0].addEventListener("click", changeSlide);
        btn[1].addEventListener("click", changeSlide);
    });
})();
