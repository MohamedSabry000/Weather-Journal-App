(function() {
    // API Data
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
    const apiKey = "4853ac8d7c2d9b856d816dd08bd5f96b";
    const port = 8081;

    // DOM Elements
    const zipElement = document.getElementById("zip");
    const feelingsElement = document.getElementById("feelings");
    const generateButton = document.getElementById("generate");
    const dateElement = document.getElementById("date");
    const errElement = document.getElementById("err");
    const temperatureElement = document.getElementById("temp");
    const contentElement = document.getElementById("content");

    // Date
    const date = new Date().toLocaleDateString("en", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    // Get Weather Information
    const getWeatherInfo = async(zip) => {
        const res = await fetch(`${baseUrl}?zip=${zip}&appid=${apiKey}&units=imperial`);
        try {
            const data = await res.json();
            return data;
        } catch (error) {
            console.log("zip number isn't correct");
        }
    }

    // Save Entry
    const saveEntry = async({ temperature, date, feeling }) =>
        await fetch(`http://localhost:${port}/projectData`, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ temperature, date, feeling })
        });

    // Update User Interface
    const updateUI = async() => {

        const res = await fetch(`http://localhost:${port}/projectData`);
        try {
            const { temperature, date, feeling } = await res.json();
console.log("data = ", temperature, date, feeling);
            dateElement.innerHTML = `Date: ${date}`;
            temperatureElement.innerHTML = `Temperature: ${temperature}`;
            contentElement.innerHTML = ` Feeling: ${feeling}`;
            errElement.innerHTML = "";
        } catch (err) {
            console.error(err);
        }
    };

    // Loading...
    generateButton.addEventListener("click", async() => {
        generateButton.textContent = "Updating...";
        const zip = zipElement.value;
        const feeling = feelingsElement.value;
        const res = await getWeatherInfo(zip);
        generateButton.textContent = "Generate";

        try {
            const {
                main: { temp: temperature }
            } = await res;
            await saveEntry({ temperature, date, feeling });
            await updateUI();
        } catch (err) {
            dateElement.innerHTML = "";
            temperatureElement.innerHTML = "";
            contentElement.innerHTML = "";
            errElement.innerHTML = "No City is associated with this ZIP Code";
        }
    });
})();