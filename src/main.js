

const ss = document.createElement("style");
ss.textContent = `
.multiselect {
    position: relative;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width:100%;
  }
  
  .multiselect_options::after {
    content: attr(data-name);
    color: #999999;
    margin-left: 12px;
  }

  .multiselect_options:has(> .multi_option).multiselect_options::after {
    display: none;
  }

  .multiselect_options {
    cursor: text;
    padding: 4px;
    border: .5px solid #9d9d9d;
    min-height: 38px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    height: auto !important ;
    align-items:center;
  }
  
  .multi_option {
    display: flex;
    cursor: default;
    border: #fff solid .5px;
    border-radius: 3px;
    background: #ddd;
    color: #000;
    height: 100%;
    align-items: center;
  }
  
  .multi_option_text {
    padding: 4px 10px;
  }
  
  .multi_option_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 4px;
    border-right: #fff solid .5px;
  }
  
  .multi_option_icon svg,.multi_option_icon img {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    margin: 0;
    padding: 3px;
  }
  
  .multiselect_dropdown_box {
    display: none;
    position: absolute;
    z-index: 9999;
    background: #fff;
    max-height: 203px;
    overflow-y: auto;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, .10);
  }
  
  .multiselect_dropdown_box.active {
    display: block;
  }
  
  .multiselect_dropdown {
    padding: 7px 10px;
    border: .5px solid #9d9d9d;
    border-top: none;
    cursor: pointer;
  }
  
  .multiselect_dropdown.added {
    background: #ddd;
  }
  
  .multiselect_dropdown:hover {
    background: rgb(58, 156, 255);
    color: #fff;
  }
  
  .multiselect_dropdown_box.active.top .multiselect_dropdown:first-child {
    border-radius: 5px 5px 0px 0px;
  }

  .multiselect_dropdown_box.active.top .multiselect_dropdown:last-child {
    border-radius: 0px ;
  }

  .multiselect_dropdown:first-child {
    border-top: .5px solid #9d9d9d;

  }
  
  .multiselect_dropdown:last-child {
    border-radius: 0px 0px 5px 5px;
  }
`;

document.body.appendChild(ss);

function multiSelect(q, i) {
    const selects = document.querySelectorAll(q);

    function selectFun(select) {
        const inpBox = document.createElement("div");
        const inp = document.createElement("input");
        inp.type = "text";
        inp.name = select.name;
        inp.required = select.required;
        inp.dataset.name = inp.name;
        inpBox.style = `visibility:hidden;width:0px;height:0px;overflow:hidden;margin:0px;padding:0px;border:none;outline:none;position:absolute;pointer-events:none;`;
        select.style = `visibility:hidden;width:0px;height:0px;overflow:hidden;margin:0px;padding:0px;border:none;outline:none`;
        const newSelect = document.createElement("div");
        newSelect.className = "multiselect";

        select.insertAdjacentElement("afterend", newSelect);
        inpBox.appendChild(inp);
        select.insertAdjacentElement("afterend", inpBox);

        const multiSelectOptions = document.createElement("div");
        multiSelectOptions.className = "multiselect_options text-field w-input";
        multiSelectOptions.dataset.name = select.dataset.name || "";
        newSelect.appendChild(multiSelectOptions);
        let multiSelectionRect = multiSelectOptions.getBoundingClientRect(),
            dropboxBottom = true;

        const dropDownBox = document.createElement("div");
        dropDownBox.className = "multiselect_dropdown_box";
        document.body.appendChild(dropDownBox);

        const mousedown = (e) => {
            if (
                e.target != multiSelectOptions &&
                e.target.parentElement != multiSelectOptions &&
                e.target?.parentElement?.parentElement != multiSelectOptions &&
                dropDownBox.classList.contains("active")
            ) {
                dropDownBox.classList.remove("active");
            }

            window.removeEventListener("mousedown", mousedown);
        };

        multiSelectOptions.addEventListener("click", (e) => {
            dropDownBox.classList.add("active");
            window.addEventListener("mousedown", mousedown);

            boxPosition();
        });

        // window.addEventListener("mousedown", mousedown);

        // window.addEventListener("resize", resize);

        // window.addEventListener("scroll", scrollfun);

        // function scrollfun() {
        //     if (dropDownBox.classList.contains("active")) {
        //     }
        // }

        function boxPosition() {
            multiSelectionRect = multiSelectOptions.getBoundingClientRect();

            dropDownBox.style.top = `${
                multiSelectionRect.y +
                window.scrollY -
                dropDownBox.getBoundingClientRect().height
            }px`;
            
            if (
                dropDownBox.getBoundingClientRect().bottom +
                    dropDownBox.getBoundingClientRect().height >=
                window.innerHeight
            ) {
                dropboxBottom = false;
                dropDownBox.classList.add("top");
            } else {
                dropboxBottom = true;
                dropDownBox.classList.remove("top");
            }

            if (dropboxBottom) {
                dropDownBox.style.top = `${
                    multiSelectionRect.y +
                    multiSelectionRect.height +
                    window.scrollY
                }px`;
            } else {
                dropDownBox.style.top = `${
                    multiSelectionRect.y +
                    window.scrollY -
                    dropDownBox.getBoundingClientRect().height
                }px`;
            }

            dropDownBox.style.left = `${multiSelectionRect.x}px`;
            dropDownBox.style.right = `${
                multiSelectionRect.right - multiSelectionRect.width
            }px`;
        }

        boxPosition();

        function resize() {
            multiSelectionRect = multiSelectOptions.getBoundingClientRect();
        }

        const remove = (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.parentElement.remove();
            let curValue = inp.value?inp.value.split(','):[];
            curValue = curValue.filter(
                (item) => item !== e.currentTarget.dataset.value
            );
            inp.value = curValue.join();
            inp.dispatchEvent(new Event('change'));
            console.log(inp.value);
            dropDownBox
                .querySelector(
                    `[data-value="${e.currentTarget.dataset.value}"]`
                )
                .classList.remove("added");
        };

        const click = (e) => {
            if (!e.currentTarget.classList.contains("added")) {
                e.preventDefault();

                const mulOp = document.createElement("div");
                mulOp.className = "multi_option";

                const mulopI = document.createElement("div");
                mulopI.className = "multi_option_icon";
                mulopI.innerHTML = i;
                mulopI.dataset.value = e.currentTarget.dataset.value;
                mulopI.addEventListener("mouseup", remove);
                mulOp.appendChild(mulopI);
                mulOp.insertAdjacentHTML(
                    "beforeend",
                    `<div class="multi_option_text">${e.currentTarget.innerHTML}</div>`
                );
                multiSelectOptions.appendChild(mulOp);

                const curValue = inp.value?inp.value.split(','):[];
                curValue.push(e.currentTarget.dataset.value);
                inp.value = curValue.join();
                inp.dispatchEvent(new Event('change'));
                console.log(inp.value)
                e.currentTarget.classList.add("added");
            } else {
                multiSelectOptions
                    .querySelector(
                        `[data-value="${e.currentTarget.dataset.value}"]`
                    )
                    .dispatchEvent(new Event("mouseup"));
            }
        };

        select.querySelectorAll("option").forEach((cur) => {
            const md = document.createElement("div");
            md.className = "multiselect_dropdown";
            md.innerHTML = cur.innerHTML;
            md.dataset.value = cur.value;
            dropDownBox.appendChild(md);
            md.addEventListener("mousedown", click);
        });

        select.style.display = "none";
    }

    selects.forEach(selectFun);
}
