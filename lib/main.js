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
  const mousedown = e => {
    if (e.target != multiSelectOptions && e.target.parentElement != multiSelectOptions && e.target.parentElement.parentElement != multiSelectOptions && dropDownBox.classList.contains("active")) {
      dropDownBox.classList.remove("active");
    }
  };
  window.addEventListener("mousedown", mousedown);
  multiSelectOptions.addEventListener("mouseup", e => {
    dropDownBox.classList.toggle("active");
  });
  const remove = e => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.parentElement.remove();
    let curValue = JSON.parse(inp.value);
    curValue = curValue.filter(item => item !== e.currentTarget.dataset.value);
    inp.value = JSON.stringify(curValue);
    console.log(inp.value);
    dropDownBox.querySelector(`[data-value="${e.currentTarget.dataset.value}"]`).classList.remove('added');
  };
  const click = e => {
    if (!e.currentTarget.classList.contains('added')) {
      e.preventDefault();
      const mulOp = document.createElement("div");
      mulOp.className = "multi_option";
      const mulopI = document.createElement("div");
      mulopI.className = "multi_option_icon";
      mulopI.innerHTML = i;
      mulopI.dataset.value = e.currentTarget.dataset.value;
      mulopI.addEventListener("mouseup", remove);
      mulOp.appendChild(mulopI);
      mulOp.insertAdjacentHTML("beforeend", `<div class="multi_option_text">${e.currentTarget.innerHTML}</div>`);
      multiSelectOptions.appendChild(mulOp);
      JSON.parse(inp.value).push(e.currentTarget.dataset.value).toString();
      const curValue = JSON.parse(inp.value);
      curValue.push(e.currentTarget.dataset.value);
      inp.value = JSON.stringify(curValue);
      console.log(inp.value);
      e.currentTarget.classList.add('added');
    } else {
      multiSelectOptions.querySelector(`[data-value="${e.currentTarget.dataset.value}"]`).dispatchEvent(new Event('mouseup'));
    }
  };
  select.querySelectorAll("option").forEach(cur => {
    const md = document.createElement("div");
    md.className = "multiselect_dropdown";
    md.innerHTML = cur.innerHTML;
    md.dataset.value = cur.value;
    dropDownBox.appendChild(md);
    md.addEventListener("mousedown", click);
  });
  select.style.display = 'none';
}
var i = ` <svg viewBox="0 0 511.76 511.76"><g>
  <path
    d="M436.896 74.869c-99.84-99.819-262.208-99.819-362.048 0-99.797 99.819-99.797 262.229 0 362.048 49.92 49.899 115.477 74.837 181.035 74.837s131.093-24.939 181.013-74.837c99.819-99.818 99.819-262.229 0-362.048zm-75.435 256.448c8.341 8.341 8.341 21.824 0 30.165a21.275 21.275 0 0 1-15.083 6.251 21.277 21.277 0 0 1-15.083-6.251l-75.413-75.435-75.392 75.413a21.348 21.348 0 0 1-15.083 6.251 21.277 21.277 0 0 1-15.083-6.251c-8.341-8.341-8.341-21.845 0-30.165l75.392-75.413-75.413-75.413c-8.341-8.341-8.341-21.845 0-30.165 8.32-8.341 21.824-8.341 30.165 0l75.413 75.413 75.413-75.413c8.341-8.341 21.824-8.341 30.165 0 8.341 8.32 8.341 21.824 0 30.165l-75.413 75.413 75.415 75.435z"
    fill="currentColor" ></path>
</g>
</svg> `;
multiSelect("select[multiple]", i);