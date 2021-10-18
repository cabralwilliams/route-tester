
const pageRender = (pageData) => {
    let pageKeys = Object.keys(pageData.paramData);
    let keyVals = [];
    for(let i = 0; i < pageKeys.length; i++) {
        keyVals.push(pageData.paramData[pageKeys[i]]);
    }
    console.log(keyVals);
    const createOption = (opVal) => {
        let output = `nextOption = document.createElement("option");
            nextOption.value = "${opVal}";
            nextOption.textContent = "${opVal}";
            selectEl1.appendChild(nextOption);
        `;
        return output;
    };

    let pageScript = `<script>
        const addButton = document.querySelector("#addButton");
        const removeButton = document.querySelector("#removeButton");
        const formSelector = document.querySelector("#formSelector");
        const methodSelect = document.querySelector("#methodSelect");
        const confirmRoute = document.querySelector("#confirmRoute");
        const formToSubmit = document.querySelector("#formToSubmit");

        function createHidden(keyStr,valStr) {
            const nextEl = document.createElement("input");
            nextEl.type = "hidden";
            nextEl.name = keyStr;
            nextEl.value = valStr;
            return nextEl;
        }

        addButton.addEventListener("click", () => {
            let elCount = parseInt(formSelector.dataset.inputpairs);
            let divEl = document.createElement("div");
            divEl.id = "div" + elCount;
            let spanEl1 = document.createElement("span");
            spanEl1.textContent = "Parameter/Property: ";
            let selectEl1 = document.createElement("select");
            selectEl1.id = "select" + elCount;
            selectEl1.name = "select" + elCount;
            let nextOption;
            ${keyVals.map(keyVal => createOption(keyVal)).join("")}
            let labelEl = document.createElement("label");
            labelEl.textContent = " | Value: ";
            labelEl.for = "input" + elCount;
            let inputEl = document.createElement("input");
            inputEl.type = "text";
            inputEl.id = "input" + elCount;
            inputEl.name = "input" + elCount;
            divEl.append(spanEl1,selectEl1,labelEl,inputEl);
            formSelector.setAttribute("data-inputpairs", String(elCount + 1));
            formSelector.appendChild(divEl);
        });

        removeButton.addEventListener("click", () => {
            let elCount = parseInt(formSelector.dataset.inputpairs);
            console.log(elCount);
            if(elCount > 0) {
                elCount--;
                let divId = "#div" + elCount;
                let lastDiv = document.querySelector(divId);
                formSelector.setAttribute("data-inputpairs", String(elCount));
                lastDiv.remove();
            }
        });

        confirmRoute.addEventListener("click", () => {
            formToSubmit.innerHTML = "";
            let elCount = parseInt(formSelector.dataset.inputpairs);
            let keyList = [];
            let valList = [];
            if(methodSelect.value === "POST") {
                formToSubmit.setAttribute("method", "POST");
            } else {
                formToSubmit.setAttribute("method", "GET");
            }
            if(elCount > 0) {
                for(let i = 0; i < elCount; i++) {
                    keyList.push(document.querySelector("#select" + i).value);
                    valList.push(document.querySelector("#input" + i).value);
                }
            }
            if(methodSelect.value === "GET_Param" && valList.length === 1) {
                formToSubmit.action = "../${pageData.metaData.routeName}/" + valList[0];
            } else {
                formToSubmit.action = "../${pageData.metaData.routeName}";
                if(elCount > 0) {
                    for(let i = 0; i < elCount; i++) {
                        if(keyList[i] !== "" && valList[i] !== "") {
                            formToSubmit.appendChild(createHidden(keyList[i],valList[i]));
                        }
                    }
                }
            }
            const submitBttn = document.createElement("button");
            submitBttn.textContent = "Submit";
            submitBttn.type = "submit";
            formToSubmit.appendChild(submitBttn);
        });
    </script>`;

    let output = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${pageData.metaData.pageName} Route</title>
    </head>
    <body>
        <h1>${pageData.metaData.pageName}</h1>
        <p>To test whether your route is working properly, include the required properties or the desired search parameters below.</p>
        <div data-inputpairs='0' id='formSelector'>
            <div><button id='addButton'>Add</button> | <button id='removeButton'>Remove</button></div>
            <div>
                <select id='methodSelect'>
                    <option value='GET_Query'>GET - Query</option>
                    <option value='GET_Param'>GET - Param</option>
                    <option value='POST'>POST</option>
                </select> | 
                <button id='confirmRoute'>Confirm</button>
            </div>
        </div>
        <form id="formToSubmit" action='../${pageData.metaData.routeName}'>
        </form>
        ${pageScript}
    </body>
    </html>`;
    return output;
};

module.exports = { pageRender };