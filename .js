const style = document.createElement("style");
style.textContent = `
.see_more{
    display: inline-flex;
    padding: 6px 12px 6px 4px;
    border-radius: 35px;
    align-items: center;
    justify-content: center;
    gap: 2px;
    transition: .3s;
    cursor: pointer;
    margin-left: -10px;

}
.see_more:hover{
    background: #e3e3e3;
}


.see_more svg{
    width:30px;
    transform: rotateZ(180deg);
    transition:.4s;
}
.see_more.open svg{
    width:30px;
    transform: rotateZ(0deg);
    
}

.see_more_box{
    transition: .4s;
    overflow:hidden;
}

.see_more .see_more_text{
    display:flex;
    position:relative;
    justify-content:center;
    align-items:center;
}

.see_more .see_more_text .see_more_text--less{
    position:absolute;
    display:none;
}

.see_more.open .see_more_text .see_more_text--more{
    visibility:hidden;
    opacity:0;
}

.see_more.open .see_more_text .see_more_text--less{
    display:block;
}



`;
document.head.appendChild(style);

var a = document.querySelectorAll(".filters-inner-wrapper");
var max = 5;
var innerHtml = `<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ExpandLessIcon"><path d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></svg>
                    <div class="see_more_text"> <div class="see_more_text--more">See More</div> <div class="see_more_text--less">See Less</div> </div>
                `;

function button(style, psizing) {
    const btn = document.createElement("div");
    btn.className = "see_more";
    btn.innerHTML = innerHtml;

    btn.addEventListener("mousedown", (e) => {
        const ec = e.currentTarget;
        ec.classList.toggle("open");
        if (ec.classList.contains("open")) {
            // ec.innerText = "See Less";
            style.height = `${psizing.big}px`;
        } else {
            // ec.innerText = "See More";
            style.height = `${psizing.sm}px`;
        }
    });

    return btn;
}

a.forEach((cur) => {
    if (cur.children[0].tagName == "LABEL" && cur.children.length > max) {
        const pRect = cur.getBoundingClientRect();
        const psizing = {
            sm: cur.children[max].getBoundingClientRect().top - pRect.top,
            big: pRect.height,
        };
        const btn = button(cur.style,psizing);
        cur.insertAdjacentElement("afterend", btn);
        cur.style.height = `${psizing.sm}px`;
        cur.classList.add('see_more_box')

    } else if (
        cur.children[0].classList.contains("w-dyn-list") &&
        cur.children[0].children[0].children.length > max
    ) {
        const p2 = cur.children[0].children[0];
        const pRect2 = p2.getBoundingClientRect();
        const psizing = {
            sm: p2.children[max].getBoundingClientRect().top - pRect2.top,
            big: pRect2.height,
        };

        const btn = button(p2.style,psizing);
        cur.children[0].insertAdjacentElement("beforeend", btn);
        p2.style.height = `${psizing.sm}px`;
        p2.classList.add('see_more_box')

    }
});
