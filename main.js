// DOM
const button = document.querySelector("#button")
const input = document.querySelector("input")
const generatedRecipes = document.querySelector(".generated-recipe");
const loadingSpan = document.querySelector('.loading');
//button evenlistener on click
button.addEventListener("click", () => {
    //get the users input
    const inputText = input.value
    //remove .hidden class from loadingSpan (see CSS)
    loadingSpan.classList.remove("hidden")
    //clear recipes
    generatedRecipes.innerHTML = ""
    //add .unclickable class to button (see CSS)
    button.classList.add("unclickable")
    //fetch request to the llama local API
    fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama2",
            //prompt that includes users input and is sent to API
            prompt: `Generate 10 dishes that include one of these items: ${inputText} and describe how to make them step by step. The recipes do not need to include every single item in the input field. Remember the title of the dishes. Also include the amount of each ingredient needed in european measurements. Make the title of the dishes bold and a larger font.`,
            stream: false
        })
    })
        .then(response => response.json())
        .then(responseText => {
            //put the genrated recipes into HTML element
            generatedRecipes.innerText = responseText.response
            //add .hidden class back to loadingSpan (see CSS)
            loadingSpan.classList.add('hidden');
            //remove .unclickable class from button (see CSS)
            button.classList.remove("unclickable");
        })
        //catching any errors in console
        .catch(error => {
            console.error("Error:", error);
        });
})
