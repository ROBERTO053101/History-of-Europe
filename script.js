// Language translations
const translations = {
    "ro": {
        "welcome": "Bun venit pe History of Europe",
        "profilePicture": "Selectează poza de profil",
        "name": "Nume",
        "email": "Email",
        "register": "Înregistrare",
        "language": "Limbă",
        "profile": "Profil",
        "mainWelcome": "Bun venit pe HISTORY OF EUROPE",
        "exploreHistory": "Explorează Istoria Europei",
        "interactiveMap": "Hartă interactivă",
        "leaders": "Conducătorii secolului 20",
        "majorEvents": "Evenimente majore",
        "alliances": "Alianțe și organizații",
        "borders": "Evoluția granițelor",
        "culture": "Cultură și societate",
        "economy": "Economie și industrie", 
        "technology": "Tehnologie și știință",
        "regimes": "Regimuri politice",
        "aboutApp": "Despre aplicație",
        "myProfile": "Profilul meu",
        "myProgress": "Progresul meu",
        "completed": "completat",
        "visitedPages": "Pagini vizitate",
        "placeholderName": "Introduceți numele",
        "placeholderEmail": "Introduceți email-ul"
    },
    "en": {
        "welcome": "Welcome to History of Europe",
        "profilePicture": "Select profile picture",
        "name": "Name",
        "email": "Email",
        "register": "Register",
        "language": "Language",
        "profile": "Profile",
        "mainWelcome": "Welcome to HISTORY OF EUROPE",
        "exploreHistory": "Explore European History",
        "interactiveMap": "Interactive Map",
        "leaders": "20th Century Leaders",
        "majorEvents": "Major Events",
        "alliances": "Alliances and Organizations",
        "borders": "Border Evolution",
        "culture": "Culture and Society",
        "economy": "Economy and Industry",
        "technology": "Technology and Science",
        "regimes": "Political Regimes",
        "aboutApp": "About the Application",
        "myProfile": "My Profile",
        "myProgress": "My Progress",
        "completed": "completed",
        "visitedPages": "Visited pages",
        "placeholderName": "Enter your name",
        "placeholderEmail": "Enter your email"
    },
    "fr": {
        "welcome": "Bienvenue sur Histoire de l'Europe",
        "profilePicture": "Sélectionnez la photo de profil",
        "name": "Nom",
        "email": "Email",
        "register": "Inscription",
        "language": "Langue",
        "profile": "Profil",
        "mainWelcome": "Bienvenue sur HISTOIRE DE L'EUROPE",
        "exploreHistory": "Explorez l'Histoire Européenne",
        "interactiveMap": "Carte Interactive",
        "leaders": "Dirigeants du 20ème Siècle",
        "majorEvents": "Événements Majeurs",
        "alliances": "Alliances et Organisations",
        "borders": "Évolution des Frontières",
        "culture": "Culture et Société",
        "economy": "Économie et Industrie",
        "technology": "Technologie et Science",
        "regimes": "Régimes Politiques",
        "aboutApp": "À Propos de l'Application",
        "myProfile": "Mon Profil",
        "myProgress": "Ma Progression",
        "completed": "terminé",
        "visitedPages": "Pages visitées",
        "placeholderName": "Entrez votre nom",
        "placeholderEmail": "Entrez votre email"
    }
};

// Function to set the language
function setLanguage(lang) {
    localStorage.setItem("selectedLanguage", lang);
    applyLanguage(lang);
}

// Function to apply language translations
function applyLanguage(lang) {
    if (!translations[lang]) {
        console.error("Language not supported:", lang);
        return;
    }
    
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update placeholders
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    
    if (nameInput) {
        nameInput.placeholder = translations[lang]["placeholderName"];
    }
    
    if (emailInput) {
        emailInput.placeholder = translations[lang]["placeholderEmail"];
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Apply saved language
    const selectedLanguage = localStorage.getItem("selectedLanguage") || "ro";
    applyLanguage(selectedLanguage);
    
    // Language selector functionality
    const languageButton = document.getElementById("languageButton");
    const languageDropdown = document.querySelector(".language-dropdown");
    const languageLinks = document.querySelectorAll(".language-dropdown a");
    
    if (languageButton) {
        languageButton.addEventListener("click", function () {
            languageDropdown.classList.toggle("show");
        });
        
        // Close dropdown when clicking outside
        window.addEventListener("click", function (e) {
            if (!e.target.matches('#languageButton')) {
                languageDropdown.classList.remove("show");
            }
        });
    }
    
    languageLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const lang = this.getAttribute("data-lang");
            setLanguage(lang);
        });
    });
    
    // Registration form handling
    const registerForm = document.getElementById("registerForm");
    
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const profilePic = document.querySelector('input[name="profilePic"]:checked').value;
            
            if (name && email) {
                // Save user data
                localStorage.setItem("userName", name);
                localStorage.setItem("userEmail", email);
                localStorage.setItem("userProfilePic", profilePic);
                localStorage.setItem("userProgress", "0");
                localStorage.setItem("visitedPages", JSON.stringify([]));
                
                // Redirect to main page
                window.location.href = "main.html";
            } else {
                const lang = localStorage.getItem("selectedLanguage") || "ro";
                alert(translations[lang]["placeholderName"] + " & " + translations[lang]["placeholderEmail"]);
            }
        });
    }
    
    // Profile button functionality
    const profileButton = document.getElementById("profileButton");
    const profileModal = document.getElementById("profileModal");
    const closeModalProfile = document.querySelector(".close-modal-profile");
    
    if (profileButton && profileModal) {
        profileButton.addEventListener("click", function () {
            // Load user profile data
            document.getElementById("profileName").textContent = localStorage.getItem("userName") || "";
            document.getElementById("profileEmail").textContent = localStorage.getItem("userEmail") || "";
            document.getElementById("profilePicDisplay").src = "images/" + (localStorage.getItem("userProfilePic") || "avatar1.jpg");
            
            // Load progress data
            const progress = localStorage.getItem("userProgress") || "0";
            document.getElementById("progressPercent").textContent = progress;
            document.getElementById("progressBar").style.width = progress + "%";
            
            const visitedPages = JSON.parse(localStorage.getItem("visitedPages") || "[]");
            document.getElementById("visitedPages").textContent = visitedPages.length;
            
            // Show modal
            profileModal.style.display = "block";
        });
        
        if (closeModalProfile) {
            closeModalProfile.addEventListener("click", function () {
                profileModal.style.display = "none";
            });
        }
        
        window.addEventListener("click", function (e) {
            if (e.target === profileModal) {
                profileModal.style.display = "none";
            }
        });
    }
    
    // About button functionality
    const aboutButton = document.getElementById("aboutButton");
    const aboutModal = document.getElementById("aboutModal");
    const closeModal = document.querySelector(".close-modal");
    
    if (aboutButton && aboutModal) {
        aboutButton.addEventListener("click", function (e) {
            e.preventDefault();
            aboutModal.style.display = "block";
        });
        
        if (closeModal) {
            closeModal.addEventListener("click", function () {
                aboutModal.style.display = "none";
            });
        }
        
        window.addEventListener("click", function (e) {
            if (e.target === aboutModal) {
                aboutModal.style.display = "none";
            }
        });
    }
    
    // Track page visits for progress
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage !== "index.html" && currentPage !== "") {
        let visitedPages = JSON.parse(localStorage.getItem("visitedPages") || "[]");
        if (!visitedPages.includes(currentPage)) {
            visitedPages.push(currentPage);
            localStorage.setItem("visitedPages", JSON.stringify(visitedPages));
            
            // Update progress percentage
            const totalPages = 9; // Total number of content pages
            const progress = Math.floor((visitedPages.length / totalPages) * 100);
            localStorage.setItem("userProgress", progress.toString());
        }
    }
    
    // Interactive map functionality
    const maps = document.querySelectorAll('.historical-map');
    const yearSlider = document.getElementById('yearSlider');
    const yearTitle = document.getElementById('year-title');
    const yearInput = document.getElementById('yearInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (maps.length && yearSlider && yearTitle) {
        // Preload all images for better performance
        function preloadImages() {
            maps.forEach(map => {
                const img = new Image();
                img.src = map.src;
            });
        }
        
        // Function to update map visibility based on index
        function updateMapDisplay(index) {
            // Hide all maps
            maps.forEach(map => {
                map.classList.remove('active');
            });
            
            // Show only current map
            maps[index].classList.add('active');
            
            // Update year title
            const currentYear = maps[index].getAttribute('data-year');
            yearTitle.textContent = currentYear;
            
            // Improve active image quality
            setTimeout(() => {
                maps[index].style.imageRendering = 'auto';
                maps[index].style.imageRendering = '-webkit-optimize-contrast';
            }, 100);
        }
        
        // Update map based on year
        function updateMapByYear(year) {
            // Calculate index based on year (1900 = index 0, 1901 = index 1, etc.)
            const index = year - 1900;
            if (index >= 0 && index < maps.length) {
                updateMapDisplay(index);
                // Update slider to reflect year
                yearSlider.value = index;
            }
        }
        
        // Event listener for slider
        yearSlider.addEventListener('input', function() {
            // Get index from slider value (0-100)
            const index = parseInt(this.value);
            updateMapDisplay(index);
        });
        
        // Event listener for search button
        if (searchBtn && yearInput) {
            searchBtn.addEventListener('click', function() {
                const year = parseInt(yearInput.value);
                if (year >= 1900 && year <= 2000) {
                    updateMapByYear(year);
                } else {
                    const lang = localStorage.getItem("selectedLanguage") || "ro";
                    if (lang === "ro") {
                        alert('Vă rugăm introduceți un an între 1900 și 2000.');
                    } else if (lang === "en") {
                        alert('Please enter a year between 1900 and 2000.');
                    } else if (lang === "fr") {
                        alert('Veuillez entrer une année entre 1900 et 2000.');
                    }
                }
            });
            
            // Add functionality for Enter key
            yearInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchBtn.click();
                }
            });
        }
        
        // Add keyboard navigation support
        document.addEventListener('keydown', function(e) {
            const currentIndex = parseInt(yearSlider.value);
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                yearSlider.value = currentIndex - 1;
                updateMapDisplay(currentIndex - 1);
            } else if (e.key === 'ArrowRight' && currentIndex < maps.length - 1) {
                yearSlider.value = currentIndex + 1;
                updateMapDisplay(currentIndex + 1);
            }
        });
        
        // Preload all images
        preloadImages();
        
        // Initialize display
        updateMapDisplay(0);
        
        // Implementation for max quality images
        maps.forEach(map => {
            map.addEventListener('load', function() {
                // Ensure max quality
                this.style.width = '100%';
                this.style.maxWidth = 'none';
                
                // Apply optimal rendering
                this.style.imageRendering = 'auto';
                this.style.imageRendering = '-webkit-optimize-contrast';
            });
            
            // Add full resolution loading
            if (map.complete) {
                map.dispatchEvent(new Event('load'));
            }
        });
    }
    
    // Events page functionality
    const eventCategory = document.getElementById('eventCategory');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const eventSections = document.querySelectorAll('.event-section');
    const pageIndicators = document.querySelectorAll('.page-indicator');
    
    if (eventCategory && prevButton && nextButton && eventSections.length > 0) {
        // Show selected section and hide others
        function showEventSection(categoryId) {
            eventSections.forEach(section => {
                if (section.id === categoryId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
            
            // Reset to first page for each section
            resetToFirstPage();
        }
        
        // Function to show specific page in active section
        function showEventPage(pageIndex) {
            const activeSection = document.querySelector('.event-section.active');
            if (!activeSection) return;
            
            const pages = activeSection.querySelectorAll('.event-page');
            const indicators = activeSection.querySelectorAll('.page-indicator');
            
            pages.forEach((page, index) => {
                if (index === pageIndex) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });
            
            indicators.forEach((indicator, index) => {
                if (index === pageIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        // Reset to first page
        function resetToFirstPage() {
            const activeSection = document.querySelector('.event-section.active');
            if (!activeSection) return;
            
            const pages = activeSection.querySelectorAll('.event-page');
            const indicators = activeSection.querySelectorAll('.page-indicator');
            
            pages.forEach((page, index) => {
                if (index === 0) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });
            
            indicators.forEach((indicator, index) => {
                if (index === 0) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        // Get active page index from active section
        function getActivePageIndex() {
            const activeSection = document.querySelector('.event-section.active');
            if (!activeSection) return 0;
            
            const pages = activeSection.querySelectorAll('.event-page');
            let activeIndex = 0;
            
            pages.forEach((page, index) => {
                if (page.classList.contains('active')) {
                    activeIndex = index;
                }
            });
            
            return activeIndex;
        }
        
        // Navigate to previous page
        function goToPrevPage() {
            const activeIndex = getActivePageIndex();
            const activeSection = document.querySelector('.event-section.active');
            if (!activeSection) return;
            
            const pages = activeSection.querySelectorAll('.event-page');
            
            if (activeIndex > 0) {
                showEventPage(activeIndex - 1);
            }
        }
        
        // Navigate to next page
        function goToNextPage() {
            const activeIndex = getActivePageIndex();
            const activeSection = document.querySelector('.event-section.active');
            if (!activeSection) return;
            
            const pages = activeSection.querySelectorAll('.event-page');
            
            if (activeIndex < pages.length - 1) {
                showEventPage(activeIndex + 1);
            }
        }
        
        // Event listener for category selection
        eventCategory.addEventListener('change', function() {
            showEventSection(this.value);
        });
        
        // Event listener for navigation buttons
        prevButton.addEventListener('click', goToPrevPage);
        nextButton.addEventListener('click', goToNextPage);
        
        // Event listeners for page indicators
        pageIndicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const pageIndex = parseInt(this.getAttribute('data-page')) - 1;
                showEventPage(pageIndex);
            });
        });
        
        // Initialize
        showEventSection(eventCategory.value);
    }
});

// Quiz handling
const quizzes = {
    "ww": [
        {
            question: "În ce an a început Primul Război Mondial?",
            options: ["1912", "1914", "1916", "1918"],
            correct: 1
        },
        {
            question: "Care a fost principalul motiv al declanșării Primului Război Mondial?",
            options: ["Asasinarea Arhiducelui Franz Ferdinand", "Invazia Poloniei", "Criza economică", "Revoluția Rusă"],
            correct: 0
        },
        {
            question: "Care țări formau Puterile Centrale?",
            options: ["Germania, Austro-Ungaria, Imperiul Otoman, Bulgaria", "Franța, Marea Britanie, Rusia, Italia", "SUA, Japonia, China, Rusia", "Spania, Portugalia, Grecia, România"],
            correct: 0
        },
        {
            question: "Ce bătălie navală decisivă a avut loc în 1916 între Marea Britanie și Germania?",
            options: ["Bătălia de la Verdun", "Bătălia de la Somme", "Bătălia de la Iutlanda", "Bătălia de la Gallipoli"],
            correct: 2
        },
        {
            question: "Când a intrat România în Primul Război Mondial?",
            options: ["1914", "1915", "1916", "1917"],
            correct: 2
        },
        {
            question: "Care a fost primul conflict în care s-au folosit masiv armele chimice?",
            options: ["Războiul Crimeei", "Războiul Civil American", "Primul Război Mondial", "Războiul Ruso-Japonez"],
            correct: 2
        },
        {
            question: "Ce tratat a pus capăt Primului Război Mondial?",
            options: ["Tratatul de la Versailles", "Tratatul de la Trianon", "Tratatul de la Brest-Litovsk", "Tratatul de la Saint-Germain"],
            correct: 0
        },
        {
            question: "Ce cunoscută revoluție a avut loc în timpul Primului Război Mondial?",
            options: ["Revoluția Americană", "Revoluția Franceză", "Revoluția Rusă", "Revoluția Industrială"],
            correct: 2
        },
        {
            question: "În ce an a început Al Doilea Război Mondial în Europa?",
            options: ["1937", "1939", "1941", "1943"],
            correct: 1
        },
        {
            question: "Ce țară a invadat Germania pentru a declanșa oficial Al Doilea Război Mondial?",
            options: ["Franța", "Marea Britanie", "Polonia", "Uniunea Sovietică"],
            correct: 2
        },
        {
            question: "Care a fost numele operațiunii de invadare a Uniunii Sovietice de către Germania nazistă?",
            options: ["Operațiunea Overlord", "Operațiunea Barbarossa", "Operațiunea Market Garden", "Operațiunea Torch"],
            correct: 1
        },
        {
            question: "Ce bătălie navală din 1942 a marcat un punct de cotitură în războiul din Pacific?",
            options: ["Bătălia de la Midway", "Bătălia de la Coral Sea", "Bătălia de la Leyte Gulf", "Bătălia de la Pearl Harbor"],
            correct: 0
        },
        {
            question: "Care a fost numele codificat al debarcării aliate în Normandia din 6 iunie 1944?",
            options: ["Operațiunea Overlord", "Operațiunea Torch", "Operațiunea Market Garden", "Operațiunea Husky"],
            correct: 0
        },
        {
            question: "Când a capitulat Germania nazistă?",
            options: ["8 mai 1944", "8 mai 1945", "6 august 1945", "2 septembrie 1945"],
            correct: 1
        },
        {
            question: "Ce conferință dintre Aliați a avut loc în februarie 1945 pentru a planifica organizarea Europei postbelice?",
            options: ["Conferința de la Teheran", "Conferința de la Yalta", "Conferința de la Potsdam", "Conferința de la Casablanca"],
            correct: 1
        },
        {
            question: "Ce țară a fost prima care a dezvoltat și folosit arma atomică?",
            options: ["Germania", "Japonia", "Statele Unite ale Americii", "Uniunea Sovietică"],
            correct: 2
        },
        {
            question: "În ce perioadă aproximativă s-a desfășurat Războiul Rece?",
            options: ["1914-1918", "1939-1945", "1947-1991", "1950-1975"],
            correct: 2
        },
        {
            question: "Ce organizație militară a fost creată în 1949 de țările occidentale?",
            options: ["Pactul de la Varșovia", "NATO", "ONU", "Comunitatea Economică Europeană"],
            correct: 1
        },
        {
            question: "Ce criză din 1962 a adus lumea în pragul unui război nuclear?",
            options: ["Criza Suezului", "Criza rachetelor din Cuba", "Criza Berlinului", "Criza petrolului"],
            correct: 1
        },
        {
            question: "Când a fost construit Zidul Berlinului?",
            options: ["1945", "1953", "1961", "1968"],
            correct: 2
        },
        {
            question: "Ce eveniment din 1989 a marcat simbolic sfârșitul Războiului Rece?",
            options: ["Căderea Zidului Berlinului", "Revoluția din România", "Dizolvarea URSS", "Reunificarea Germaniei"],
            correct: 0
        },
        {
            question: "Care a fost numele politicii externe a URSS în anii '80 care a dus la sfârșitul Războiului Rece?",
            options: ["Doctrina Truman", "Glasnost și Perestroika", "Containment", "Detente"],
            correct: 1
        },
        {
            question: "Ce țară a fost prima care a lansat un satelit artificial în spațiu în 1957?",
            options: ["SUA", "China", "Uniunea Sovietică", "Franța"],
            correct: 2
        },
        {
            question: "În ce an s-a dizolvat oficial Uniunea Sovietică?",
            options: ["1989", "1990", "1991", "1993"],
            correct: 2
        },
        {
            question: "Ce eveniment a marcat începutul Marii Crize din 1929?",
            options: ["Crahul de pe Wall Street", "Începutul Primului Război Mondial", "Revoluția Rusă", "Tratatul de la Versailles"],
            correct: 0
        },
        {
            question: "În ce zi a avut loc prăbușirea bursei de la New York, cunoscută ca 'Joia Neagră'?",
            options: ["24 octombrie 1929", "29 octombrie 1929", "15 septembrie 1929", "4 iulie 1929"],
            correct: 0
        },
        {
            question: "Ce politică economică a adoptat Franklin D. Roosevelt pentru a combate efectele Marii Crize?",
            options: ["Doctrina Monroe", "New Deal", "Planul Marshall", "Politica Porților Deschise"],
            correct: 1
        },
        {
            question: "Ce fenomen natural a agravat criza economică în SUA în anii '30?",
            options: ["Uragane", "Cutremure", "Furtuni de nisip (Dust Bowl)", "Inundații"],
            correct: 2
        },
        {
            question: "Ce țară europeană a resimțit cel mai puternic efectele Marii Crize, contribuind la ascensiunea nazismului?",
            options: ["Franța", "Italia", "Germania", "Marea Britanie"],
            correct: 2
        },
        {
            question: "Care a fost efectul Marii Crize asupra producției industriale mondiale?",
            options: ["A scăzut cu aproximativ 40%", "A crescut cu 15%", "A rămas neschimbată", "A scăzut cu 5%"],
            correct: 0
        },
        {
            question: "Până în ce an s-au resimțit efectele Marii Crize în majoritatea țărilor afectate?",
            options: ["1932", "1935", "1939", "1945"],
            correct: 2
        },
        {
            question: "Ce eveniment a marcat începutul secolului XX în Europa?",
            options: ["Primul Război Mondial", "Revoluția Rusă", "Unificarea Germaniei", "Războiul Ruso-Japonez"],
            correct: 0
        },
        {
            question: "Ce regim politic s-a instalat în Rusia după Revoluția din 1917?",
            options: ["Monarhia", "Republica Parlamentară", "Comunismul", "Fascismul"],
            correct: 2
        },
        {
            question: "Ce doctrină politică a fost promovată de Benito Mussolini în Italia?",
            options: ["Comunismul", "Fascismul", "Liberalismul", "Anarhismul"],
            correct: 1
        },
        {
            question: "Ce țară a devenit prima republică socialistă din lume în 1922?",
            options: ["China", "Cuba", "România", "Uniunea Sovietică"],
            correct: 3
        },
        {
            question: "Ce plan american a contribuit la reconstrucția Europei după Al Doilea Război Mondial?",
            options: ["Planul Marshall", "New Deal", "Planul Schuman", "Programul Lend-Lease"],
            correct: 0
        },
        {
            question: "Ce organizație a reprezentat precursorul Uniunii Europene?",
            options: ["NATO", "Comunitatea Economică a Cărbunelui și Oțelului", "Liga Națiunilor", "Consiliul Europei"],
            correct: 1
        },
        {
            question: "Ce eveniment a marcat începutul Revoluțiilor din 1989 în Europa de Est?",
            options: ["Revoluția din Ungaria", "Primăvara de la Praga", "Solidaritatea din Polonia", "Revoluția din România"],
            correct: 2
        },
        {
            question: "Când a fost semnat Tratatul de la Maastricht care a creat Uniunea Europeană?",
            options: ["1957", "1973", "1992", "2004"],
            correct: 2
        },
        {
            question: "Ce conflict sângeros a urmat dezintegrării Iugoslaviei în anii '90?",
            options: ["Războiul din Vietnam", "Războaiele Iugoslave", "Războiul din Afganistan", "Războiul din Golf"],
            correct: 1
        },
        {
            question: "Ce fenomen demografic major a avut loc în Europa în a doua jumătate a secolului XX?",
            options: ["Creșterea explosivă a populației", "Migrația masivă din colonii", "Scăderea ratei natalității", "Creșterea speranței de viață"],
            correct: 2
        }
    ],
  
};

// Single quiz initialization function
function initializeQuiz(category) {
    console.log(`Initializing quiz for category: ${category}`);
    
    const quizContainer = document.querySelector(`#${category} .quiz-container`);
    if (!quizContainer) {
        console.error(`Quiz container for ${category} not found`);
        return;
    }
    
    const quizStartButton = quizContainer.querySelector('.quiz-start');
    if (!quizStartButton) {
        console.error(`Start button for ${category} quiz not found`);
        return;
    }
    
    const quizData = quizzes[category];
    if (!quizData || quizData.length === 0) {
        console.error(`No quiz data found for ${category}`);
        return;
    }
    
    let currentQuestion = 0;
    let score = 0;
    
    // Function to display current question
    function showQuestion() {
        const q = quizData[currentQuestion];
        const selectedLang = localStorage.getItem("selectedLanguage") || "ro";
        
        // Clear previous content
        quizContainer.innerHTML = `
            <div class="quiz-progress">Întrebarea ${currentQuestion + 1}/${quizData.length}</div>
            <div class="quiz-question">${q.question}</div>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <div class="quiz-option" data-index="${i}">${opt}</div>
                `).join('')}
            </div>
            <button class="quiz-next" disabled>Următoarea întrebare</button>
        `;
        
        // Add event listeners to options
        quizContainer.querySelectorAll('.quiz-option').forEach(opt => {
            opt.addEventListener('click', function() {
                // Clear previous selections
                quizContainer.querySelectorAll('.quiz-option').forEach(o => 
                    o.style.background = 'rgba(255, 215, 0, 0.1)');
                // Highlight selected option
                this.style.background = 'rgba(255, 215, 0, 0.3)';
                // Enable next button
                quizContainer.querySelector('.quiz-next').disabled = false;
            });
        });
        
        // Add event listener to next button
        quizContainer.querySelector('.quiz-next').addEventListener('click', () => {
            const selected = quizContainer.querySelector('.quiz-option[style*="0.3"]');
            if(selected) {
                const answerIndex = parseInt(selected.dataset.index);
                if(answerIndex === q.correct) score++;
                currentQuestion++;
                
                if(currentQuestion < quizData.length) {
                    showQuestion();
                } else {
                    showResults();
                }
            }
        });
    }
    
    // Function to show quiz results
    function showResults() {
        const selectedLang = localStorage.getItem("selectedLanguage") || "ro";
        let resultText = "Rezultat:";
        let buttonText = "Înapoi la conținut";
        
        if (selectedLang === "en") {
            resultText = "Result:";
            buttonText = "Back to content";
        } else if (selectedLang === "fr") {
            resultText = "Résultat:";
            buttonText = "Retour au contenu";
        }
        
        quizContainer.innerHTML = `
            <div class="quiz-results show">
                <h4>${resultText} ${score}/${quizData.length}</h4>
                <button onclick="location.reload()">${buttonText}</button>
            </div>
        `;
    }
    
    // Add event listener to start button
    quizStartButton.addEventListener('click', function() {
        console.log("Quiz start button clicked for category:", category);
        this.style.display = 'none';
        showQuestion();
    });
}

// Initialize quizzes when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded, initializing quizzes");
    
    // Initialize quizzes for each section with available quiz data
    document.querySelectorAll('.event-section').forEach(section => {
        const category = section.id;
        console.log("Checking quiz for category:", category);
        if(quizzes[category]) {
            console.log("Initializing quiz for category:", category);
            initializeQuiz(category);
        } else {
            console.log("No quiz data found for category:", category);
        }
    });
    
    // Also check for general quiz on the main page
    const mainQuizContainer = document.querySelector('.quiz-container');
    if (mainQuizContainer) {
        const mainQuizStart = mainQuizContainer.querySelector('.quiz-start');
        if (mainQuizStart && quizzes["ww"]) {
            console.log("Setting up main page quiz");
            mainQuizStart.addEventListener('click', function() {
                this.style.display = 'none';
                let currentQuestion = 0;
                let score = 0;
                const quizData = quizzes["ww"];
                
                function showMainQuestion() {
                    const q = quizData[currentQuestion];
                    mainQuizContainer.innerHTML = `
                        <div class="quiz-progress">Întrebarea ${currentQuestion + 1}/${quizData.length}</div>
                        <div class="quiz-question">${q.question}</div>
                        <div class="quiz-options">
                            ${q.options.map((opt, i) => `
                                <div class="quiz-option" data-index="${i}">${opt}</div>
                            `).join('')}
                        </div>
                        <button class="quiz-next" disabled>Următoarea întrebare</button>
                    `;
                    
                    // Add event listeners to options
                    mainQuizContainer.querySelectorAll('.quiz-option').forEach(opt => {
                        opt.addEventListener('click', function() {
                            mainQuizContainer.querySelectorAll('.quiz-option').forEach(o => 
                                o.style.background = 'rgba(255, 215, 0, 0.1)');
                            this.style.background = 'rgba(255, 215, 0, 0.3)';
                            mainQuizContainer.querySelector('.quiz-next').disabled = false;
                        });
                    });
                    
                    mainQuizContainer.querySelector('.quiz-next').addEventListener('click', () => {
                        const selected = mainQuizContainer.querySelector('.quiz-option[style*="0.3"]');
                        if(selected) {
                            const answerIndex = parseInt(selected.dataset.index);
                            if(answerIndex === q.correct) score++;
                            currentQuestion++;
                            
                            if(currentQuestion < quizData.length) {
                                showMainQuestion();
                            } else {
                                mainQuizContainer.innerHTML = `
                                    <div class="quiz-results show">
                                        <h4>Rezultat: ${score}/${quizData.length}</h4>
                                        <button onclick="location.reload()">Înapoi la conținut</button>
                                    </div>
                                `;
                            }
                        }
                    });
                }
                
                showMainQuestion();
            });
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Selectează toate opțiunile quiz
    const quizOptions = document.querySelectorAll('.quiz-option');
    
    // Adaugă event listener pentru fiecare opțiune
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            console.log('Click pe opțiunea:', this.textContent);
            
            // Găsește răspunsul corect - folosește un atribut sau variabilă
            const correctAnswer = 'răspunsul_corect'; // Schimbă asta cu răspunsul corect real
            
            // Resetează toate clasele anterioare
            quizOptions.forEach(opt => {
                opt.classList.remove('correct', 'incorrect', 'selected');
            });
            
            // Aplică clasa selected
            this.classList.add('selected');
            
            // Verifică răspunsul și aplică clasa corespunzătoare
            if (this.getAttribute('data-answer') === correctAnswer || 
                this.textContent.trim() === correctAnswer) {
                this.classList.add('correct');
                console.log('Răspuns corect!');
            } else {
                this.classList.add('incorrect');
                console.log('Răspuns greșit!');
                
                // Evidențiază răspunsul corect
                quizOptions.forEach(opt => {
                    if (opt.getAttribute('data-answer') === correctAnswer ||
                        opt.textContent.trim() === correctAnswer) {
                        opt.classList.add('correct');
                    }
                });
            }
        });
    });
});