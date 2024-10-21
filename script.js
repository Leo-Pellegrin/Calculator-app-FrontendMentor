// Sélectionne les éléments radio et feuilles de style
const themeRadios = {
    theme1: document.getElementById('option1'),
    theme2: document.getElementById('option2'),
    theme3: document.getElementById('option3')
};
const themes = {
    theme1: { stylesheet: document.getElementById('theme1'), delColor: 'hsl(225, 21%, 49%)', btnColor: 'hsl(30, 25%, 89%)', equalColor: 'hsl(6, 63%, 50%)', equalBg: '#F96C5B', resetColor: 'hsl(225, 21%, 49%)', resetBg: '#A2B3E1' },
    theme2: { stylesheet: document.getElementById('theme2'), delColor: 'hsl(185, 42%, 37%)', btnColor: 'hsl(45, 7%, 89%)', equalColor: 'hsl(25, 98%, 40%)', equalBg: '#FA8B38', resetColor: 'hsl(185, 42%, 37%)', resetBg: '#62B5BD' },
    theme3: { stylesheet: document.getElementById('theme3'), delColor: 'hsl(281, 89%, 26%)', btnColor: 'hsl(268, 47%, 21%)', equalColor: 'hsl(176, 100%, 44%)', equalBg: '#94FFF9', resetColor: 'hsl(281, 89%, 26%)', resetBg: '#8631B0' }
};

const result = document.getElementById('result');
const calcbuttons = document.querySelectorAll('.calcbutton');
const resetbutton = document.getElementById('resetbutton');
const equalbutton = document.getElementById('equalbutton');

// Fonction pour détecter le thème actif
function getActiveTheme() {
    return Object.keys(themeRadios).find(theme => themeRadios[theme].checked);
}

// Fonction pour appliquer le thème
function applyTheme(theme) {
    // Active uniquement la feuille de style du thème sélectionné
    Object.keys(themes).forEach(key => themes[key].stylesheet.disabled = (key !== theme));

    // Applique les styles des boutons
    calcbuttons.forEach(button => {
        if (button.innerHTML === 'DEL') {
            button.style.backgroundColor = themes[theme].delColor;
        } else {
            button.style.backgroundColor = themes[theme].btnColor;
        }
    });
    resetbutton.style.backgroundColor = themes[theme].resetColor;
    equalbutton.style.backgroundColor = themes[theme].equalColor;
}

// Fonction de calcul
function calc(e) {
    const operations = ['+', '-', 'x', '/'];
    const valeur = e.innerHTML;

    if (valeur === '=') {
        if (result.innerHTML !== '') {
            try {
                const expression = result.innerHTML.replace(/x/g, '*');
                const currentValue = eval(expression);

                result.innerHTML = Number.isInteger(currentValue) ? currentValue : currentValue.toFixed(2);
            } catch (error) {
                result.innerHTML = 'Erreur';
            }
        }
        return;
    }

    if (valeur === 'RESET') {
        result.innerHTML = '';
        return;
    }

    if (valeur === 'DEL') {
        result.innerHTML = result.innerHTML.slice(0, -1);
        return;
    }

    if (operations.includes(valeur)) {
        const expression = result.innerHTML.replace(/x/g, '*');
        const currentValue = eval(expression);
        result.innerHTML = (Number.isInteger(currentValue) ? currentValue : currentValue.toFixed(2)) + valeur;
    } else {
        result.innerHTML += valeur;
    }
}

// Ajoute des écouteurs d'événements pour les boutons
calcbuttons.forEach(button => button.addEventListener('click', () => calc(button)));
resetbutton.addEventListener('click', () => calc(resetbutton));
equalbutton.addEventListener('click', () => calc(equalbutton));

// Changement de thème
Object.values(themeRadios).forEach(radio => radio.addEventListener('change', () => applyTheme(getActiveTheme())));

// Gestion du changement de couleur au clic
function handleButtonClickColor(button, theme) {
    let currentcolor;
    if (button === resetbutton) {
        button.style.backgroundColor = themes[theme].resetBg;
        currentcolor = themes[theme].resetColor;
    } else if (button === equalbutton) {
        button.style.backgroundColor = themes[theme].equalBg;
        currentcolor = themes[theme].equalColor;
    } else if (button.innerHTML === 'DEL') {
        button.style.backgroundColor = themes[theme].resetBg;
        currentcolor = themes[theme].delColor;
    } else {
        button.style.backgroundColor = '#6B34AC';
        currentcolor = themes[theme].btnColor;
    }

    setTimeout(() => {
        button.style.backgroundColor = currentcolor;
    }, 250);
}

// Ajoute les écouteurs pour le changement de couleur au clic
calcbuttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClickColor(button, getActiveTheme()));
});
resetbutton.addEventListener('click', () => handleButtonClickColor(resetbutton, getActiveTheme()));
equalbutton.addEventListener('click', () => handleButtonClickColor(equalbutton, getActiveTheme()));

// Initialiser le thème
applyTheme(getActiveTheme());