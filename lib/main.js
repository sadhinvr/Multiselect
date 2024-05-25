const ss = document.createElement('style');
ss.textContent = `
.multiselect {
    position: relative;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  .multiselect_options {
    padding: 6px;
    border: .5px solid #9d9d9d;
    min-height: calc(1em + 6px);
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  
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
  
  .multi_option_icon {
    padding: 5px;
    border-right: #fff solid .5px;
  }
  
  .multi_option_text {
    padding: 5px 10px;
  }
  
  .multi_option_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  .multi_option_icon svg {
    width: 14px;
    height: 14px;
    background-color: #fff;
    border-radius: 50%;
  }
  
  .multiselect_dropdown_box {
    display: none;
    position: absolute;
    top: 100%;
    right: 0px;
    left: 0px;
    z-index: 9999;
    background: #fff;
    max-height: 300px;
    overflow-y: scroll;
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
  
  .multiselect_dropdown:first-child {
    border-top: .5px solid #9d9d9d;
    /* border-radius: 5px 5px 0px 0px; */
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
    inp.value = "[]";
    inp.name = select.name;
    inp.dataset.name = inp.name;
    inpBox.style = `visibility:hidden;width:0px;height:0px;overflow:hidden;margin:0px;padding:0px;border:none;outline:none;position:absolute;pointer-events:none;`;
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
      dropDownBox.querySelector(`[data-value="${e.currentTarget.dataset.value}"]`).classList.remove("added");
    };
    const click = e => {
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
        mulOp.insertAdjacentHTML("beforeend", `<div class="multi_option_text">${e.currentTarget.innerHTML}</div>`);
        multiSelectOptions.appendChild(mulOp);
        JSON.parse(inp.value).push(e.currentTarget.dataset.value).toString();
        const curValue = JSON.parse(inp.value);
        curValue.push(e.currentTarget.dataset.value);
        inp.value = JSON.stringify(curValue);
        console.log(inp.value);
        e.currentTarget.classList.add("added");
      } else {
        multiSelectOptions.querySelector(`[data-value="${e.currentTarget.dataset.value}"]`).dispatchEvent(new Event("mouseup"));
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
    select.style.display = "none";
  }
  selects.forEach(selectFun);
}