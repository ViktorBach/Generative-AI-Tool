const button = document.querySelector("#button")
const input = document.querySelector("input")
const generatedStory = document.querySelector(".generated-story");
const loadingSpan = document.querySelector('.loading');
button.addEventListener("click", () => {
    const inputText = input.value
    loadingSpan.classList.remove("hidden")
    generatedStory.innerHTML = ""
    button.classList.add("unclickable")

    fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama2",
            prompt: `Generate 10 dishes that include one of these items: ${inputText} and describe how to make them step by step. The recipes do not need to include every single item in the input field. Remember the title of the dishes. Also include the amount of each ingredient needed in european measurements. Make the title of the dishes bold and a larger font.`,
            stream: false
        })
    })
        .then(response => response.json())
        .then(responseText => {
            generatedStory.innerText = responseText.response
            loadingSpan.classList.add('hidden');
            button.classList.remove("unclickable");
        })
        .catch(error => {
            console.error("Error:", error);
        });
})
