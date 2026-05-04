const BASE_URL = "https://open.er-api.com/v6/latest";

const dropdowns = document.querySelectorAll(".select-wrapper select");
const btn = document.querySelector(".convert-btn");
const fromCurr = document.querySelector("#from-currency");
const toCurr = document.querySelector("#to-currency");
const msg = document.querySelector(".exchange-rate");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    try {
        let amount = document.querySelector("#amount");
        let amtVal = amount.value || 1;
        if (amtVal < 0) {
            amtVal = 1;
            amount.value = "1";
        }

        const URL = `${BASE_URL}/${fromCurr.value}`;
        
        msg.innerText = "Getting exchange rate...";
        
        let response = await fetch(URL);
        let data = await response.json();

        let rate = data.rates[toCurr.value];
        let finalAmount = (amtVal * rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch (error) {
        console.error("Fetch error:", error);
        msg.innerText = "Something went wrong. Try again.";
    }
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.closest(".select-wrapper").querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});