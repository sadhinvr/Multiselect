function multiSelect(q, i) {
    const select = document.querySelector(q);

    const inpBox = document.createElement("div");
    const inp = document.createElement("input");
    inp.type = "text";
    inp.value = "[]";
    inp.name = select.name;
    inp.dataset.name = inp.name;
    inpBox.style = `visibility:hidden;width:0px;height:0px;overflow:hidden;margin:0px;padding:0px;border:none;outline:none`;
    select.style = `visibility:hidden;width:0px;height:0px;overflow:hidden;margin:0px;padding:0px;border:none;outline:none`;
    const newSelect = document.createElement("div");
    newSelect.className = "multiselect";
    select.insertAdjacentElement("afterend", newSelect);
    inpBox.appendChild(inp);
    select.insertAdjacentElement("afterend", inpBox);

    const multiSelectOptions = document.createElement("div");
    multiSelectOptions.className = "multiselect_options";
    newSelect.appendChild(multiSelectOptions);

    const dropDownBox = document.createElement("div");
    dropDownBox.className = "multiselect_dropdown_box";
    newSelect.appendChild(dropDownBox);

    const mousedown = (e) => {
        if (
            e.target != multiSelectOptions &&
            e.target.parentElement != multiSelectOptions &&
            e.target.parentElement.parentElement != multiSelectOptions &&
            dropDownBox.classList.contains("active")
        ) {
            dropDownBox.classList.remove("active");
        }
    };
    window.addEventListener("mousedown", mousedown);

    multiSelectOptions.addEventListener("mouseup", (e) => {
        dropDownBox.classList.toggle("active");
    });

    const remove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.parentElement.remove();
        let curValue = JSON.parse(inp.value);
        curValue = curValue.filter(
            (item) => item !== e.currentTarget.dataset.value
        );
        inp.value = JSON.stringify(curValue);
        console.log(inp.value);
        dropDownBox.querySelector(`[data-value="${e.currentTarget.dataset.value}"]`).classList.remove('added');
    };

    const click = (e) => {
      if(!e.currentTarget.classList.contains('added')){
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

        JSON.parse(inp.value).push(e.currentTarget.dataset.value).toString();
        const curValue = JSON.parse(inp.value);
        curValue.push(e.currentTarget.dataset.value);
        inp.value = JSON.stringify(curValue);
        console.log(inp.value);

        e.currentTarget.classList.add('added');
      }else{
        multiSelectOptions.querySelector(`[data-value="${e.currentTarget.dataset.value}"]`).dispatchEvent(new Event('mouseup'));
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

    select.style.display = 'none';
}


