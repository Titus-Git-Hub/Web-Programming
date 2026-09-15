/* ---------- 1. Tabs on the sub pages ---------- */

const tabs = document.getElementsByClassName("tab");

function markTab(target) {
    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].getAttribute("href") === target) {
            tabs[i].classList.add("active");        
        } else {
            tabs[i].classList.remove("active");     
        }
    }
}

for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () {
        markTab(tabs[i].getAttribute("href"));
    });
}

if (window.location.hash !== "") {
    markTab(window.location.hash);
}


/* ---------- 2. Popups ---------- */

// the HTML specifies which button opens which popup: data-open=“popup-work” opens id=“popup-work”.
const openButtons = document.querySelectorAll("[data-open]");     // all elements with the “data-open” attribute
const closeButtons = document.querySelectorAll("[data-close]");   // all the close buttons like X and “‹ Map”
const modals = document.getElementsByClassName("display_text");   // all Popups

// opens the popup with the specified id
function openPopup(id) {
    document.getElementById(id).classList.remove("hideP");        // Get the popup; hideP gone = visible
}

// closes all pop-ups (always only one open)
function closePopups() {
    for (let i = 0; i < modals.length; i++) {
        modals[i].classList.add("hideP");                         // hideP on = not visible
    }
}

// any button with the “data-open” attribute opens its popup when clicked.
for (let i = 0; i < openButtons.length; i++) {
    openButtons[i].addEventListener("click", function () {
        openPopup(openButtons[i].getAttribute("data-open"));
    });
}

// any button with the “data-close” attribute closes when clicked.
for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", closePopups);
}

// a click on the dark background closes the popup as well
for (let i = 0; i < modals.length; i++) {
    modals[i].addEventListener("click", function (event) {
        if (event.target === modals[i]) {
            closePopups();
        }
    });
}

// escape key closing the popup
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closePopups();
    }
});


/* ---------- 3. Tools (only on working-student.html) ---------- */

const toolGrid = document.getElementById("tool-grid");

// The other pages have no tool grid, so the code should only run here
if (toolGrid !== null) {
    const tools = toolGrid.getElementsByClassName("tool");       

    for (let i = 0; i < tools.length; i++) {
        const tool = tools[i];                                  

        // While the mouse is on a tile, the other tiles get lighter (connected to .dimmed in styles.css)
        tool.addEventListener("mouseenter", function () {
            toolGrid.classList.add("dimmed");
        });

        tool.addEventListener("mouseleave", function () {
            toolGrid.classList.remove("dimmed");
        });

        // Copy the content of the clicked tile into the popup, then open it
        tool.addEventListener("click", function () {
            const glyph = tool.querySelector(".glyph");          // the colored square
            const popupGlyph = document.getElementById("tool-popup-glyph");

            // copy the content
            popupGlyph.innerHTML = glyph.innerHTML;
            // use the classes as well, so e.g. adding "glyph bg-blue" and "large"
            popupGlyph.className = glyph.className + " large";

            // Use the name and category as plain text
            document.getElementById("tool-popup-name").textContent = tool.querySelector(".tool-name").textContent;
            document.getElementById("tool-popup-category").textContent = tool.querySelector(".tool-category").textContent;
            // Description using innerHTML, because it may contain characters such as &amp;
            document.getElementById("tool-popup-text").innerHTML = tool.querySelector(".tool-text").innerHTML;

            openPopup("tool-popup");
        });
    }
}


/* ---------- 4. Language switch ---------- */

// All texts that can be translated have a data-text attribute in the HTML.
// The value is the key for the texts in de.json and en.json.
const languageButtons = document.querySelectorAll(".lang-button");   // all DE/EN-Buttons 

function loadLanguage(language) {
    // language is either "de" or "en", so either "de.json" or "en.json" will be loaded
    fetch(language + ".json")
        .then(response => response.json())         
        .then(texts => {                             
            const elements = document.querySelectorAll("[data-text]");   

            for (let i = 0; i < elements.length; i++) {
                const key = elements[i].getAttribute("data-text");       

                // replace only works if the key exists in the corresponding file
                if (texts[key] !== undefined) {
                    elements[i].innerHTML = texts[key];
                }
            }

            markLanguageButtons(language);

            // localStorage remembers the language, so the next page opens in the same language
            localStorage.setItem("language", language);
        })
        .catch(error => console.error("Language file could not be loaded:", error)); 
}

function markLanguageButtons(language) {
    for (let i = 0; i < languageButtons.length; i++) {
        if (languageButtons[i].getAttribute("data-lang") === language) {
            languageButtons[i].classList.add("active");
        } else {
            languageButtons[i].classList.remove("active");
        }
    }
}

// clicking on DE or EN loads the language from data-lang
for (let i = 0; i < languageButtons.length; i++) {
    languageButtons[i].addEventListener("click", function () {
        loadLanguage(languageButtons[i].getAttribute("data-lang"));
    });
}

// When the page loads the command to use the saved language 
const savedLanguage = localStorage.getItem("language");

if (savedLanguage === "en") {
    loadLanguage("en");
}
