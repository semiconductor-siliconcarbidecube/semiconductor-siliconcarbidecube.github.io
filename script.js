// Constants
const GI_NUMBER = 1000;
const GI_CLASSNAME = "GI";
const GC_CLASSNAME = "GC";
const BINARY_TOGGLE_INTERVAL = 1000;
const RANDOM_BORDER_INTERVAL = 500;
const TEXT_ANIMATION_INTERVAL = 500;

const A_SUB_TXT_LIST = [
    "Welcome to my site",
    "No This is not a company",
    "Feel free to explore",
    "Check out my interests",
    "Contact me anytime"
];

// Create GI Elements
const containerElement = document.querySelector(`.${GC_CLASSNAME}`);
if (containerElement) {
    Array.from({ length: GI_NUMBER }, (_, i) => {
        const newElement = document.createElement('div');
        newElement.className = GI_CLASSNAME;

        const spanElement = document.createElement('span');
        spanElement.textContent = i % 2 === 0 ? '0' : '1';

        newElement.appendChild(spanElement);
        containerElement.appendChild(newElement);
    });
} else {
    console.error(`No element with class '${GC_CLASSNAME}' found.`);
}

// Toggle Opacity for Odd and Even Elements
let toggle = false;

const toggleOpacity = () => {
    const elements = document.querySelectorAll(`.${GI_CLASSNAME} span`);
    if (elements.length === 0) return;

    elements.forEach((el, index) => {
        if ((toggle && index % 2 === 0) || (!toggle && index % 2 !== 0)) {
            el.style.opacity = '0.4'; // Visible
        } else {
            el.style.opacity = '0'; // Hidden
        }
    });

    toggle = !toggle;
};

setInterval(toggleOpacity, BINARY_TOGGLE_INTERVAL);

// Random Border Animation
const randomBorders = () => {
    const elements = document.querySelectorAll(`.${GI_CLASSNAME}`);
    if (elements.length === 0) return;

    const randomElements = [...elements]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

    randomElements.forEach(el => {
        const randomSide = ['border'][
            Math.floor(Math.random() * 4)
        ];
        el.style[randomSide] = '2px solid var(--red)';
    });

    setTimeout(() => {
        randomElements.forEach(el => {
            el.style.borderTop = '';
            el.style.borderBottom = '';
            el.style.borderRight = '';
            el.style.borderLeft = '';
        });
    }, 500);
};

setInterval(randomBorders, RANDOM_BORDER_INTERVAL);

// Uppercase Text Animation for .A_TXT
const animateText = () => {
    const element = document.querySelector('.A_TXT');
    if (element) {
        const text = element.textContent;
        const letters = text.split('');
        const uppercaseIndex = letters.findIndex(letter => letter === letter.toUpperCase());

        const updatedText = letters.map((letter, i) => {
            if (i === uppercaseIndex) {
                return letter.toLowerCase();
            }
            return letter;
        }).join('');
        element.innerHTML = updatedText;

        const nextIndex = (uppercaseIndex + 1) % letters.length;
        const coloredText = letters.map((letter, i) => {
            if (i === nextIndex) {
                return `<span style="color: var(--red);">${letter.toUpperCase()}</span>`;
            }
            return letter.toLowerCase();
        }).join('');
        element.innerHTML = coloredText;
    } else {
        console.error('Element with class "A_TXT" not found.');
    }
};

setInterval(animateText, TEXT_ANIMATION_INTERVAL);

// Sub text animation
const element = document.querySelector('.A_SUB');

if (element) {
    let currentSentenceIndex = 0;

    // Cursor blinking effect
    let isCursorVisible = false;

    setInterval(() => {
        // Append "_" if it's missing
        if (!element.textContent.endsWith("_")) {
            element.textContent += "_";
        }

        // Toggle the visibility of the "_"
        element.textContent = isCursorVisible
            ? element.textContent.slice(0, -1) + ""
            : element.textContent.slice(0, -1) + "_";

        isCursorVisible = !isCursorVisible;
    }, 500);


    const typeSentence = (sentence, callback) => {
        let currentIndex = 0;

        const interval = setInterval(() => {
            element.textContent = sentence.slice(0, currentIndex) + "_";
            currentIndex++;

            if (currentIndex > sentence.length) {
                clearInterval(interval);
                setTimeout(callback, 5000); // Wait 5 seconds before erasing
            }
        }, 100); // Typing speed (100ms per character)
    };

    const eraseSentence = (sentence, callback) => {
        let currentIndex = sentence.length;

        const interval = setInterval(() => {
            element.textContent = sentence.slice(0, currentIndex) + "_";
            currentIndex--;

            if (currentIndex < 0) {
                clearInterval(interval);
                callback(); // Start typing the next sentence
            }
        }, 100); // Erasing speed (100ms per character)
    };

    const cycleSentences = () => {
        const currentSentence = A_SUB_TXT_LIST[currentSentenceIndex];
        typeSentence(currentSentence, () => {
            eraseSentence(currentSentence, () => {
                currentSentenceIndex =
                    (currentSentenceIndex + 1) % A_SUB_TXT_LIST.length;
                cycleSentences();
            });
        });
    };

    // Start the animation cycle
    cycleSentences();
} else {
    console.error('Element with class "A_SUB" not found.');
}

// Menu hovering
// Select the elements
const menuItem1 = document.querySelector('.A_MENU_ITEM1');
const menuItem2 = document.querySelector('.A_MENU_ITEM2');
const menuItem3 = document.querySelector('.A_MENU_ITEM3');
const menuDes = document.querySelector('.A_MENU_DES');
const gc = document.querySelector('.GC');
const a_menu_sm = document.querySelector('.A_MENU_SM');
const root = document.documentElement;

// Function to update the right property of A_MENU_DES
const GCopacity = (value) => {
    if (gc) {
        gc.style.opacity = value;
        // a_menu_sm.style.opacity = value;
    }

    if (value === 0) {
        // gc.style.animation = 'GI_move 10s 1 alternate';
        gc.style.display = 'none';
    } else {
        // gc.style.animation = 'GI_move 10s infinite alternate';
        gc.style.display = 'grid';
    }
}

const updateMenuDesRight = (value) => {
    if (menuDes) {
        menuDes.style.right = value;
        GCopacity(0)
    }

    if (value === '') {
        GCopacity(0.3)
    }
};

// Add event listeners for hover
if (menuItem1 && menuItem2 && menuItem3) {
    menuItem1.addEventListener('mouseenter', () => updateMenuDesRight('-200vw'));
    menuItem2.addEventListener('mouseenter', () => updateMenuDesRight('-100vw'));
    menuItem3.addEventListener('mouseenter', () => updateMenuDesRight('0vw'));

    // Optionally, reset the right property on mouse leave
    menuItem1.addEventListener('mouseleave', () => updateMenuDesRight(''));
    menuItem2.addEventListener('mouseleave', () => updateMenuDesRight(''));
    menuItem3.addEventListener('mouseleave', () => updateMenuDesRight(''));
} else {
    console.error('Menu items or A_MENU_DES element not found.');
}

const updateRedVariable = (color) => {
    root.style.setProperty('--red', color);
};

// Add hover event listeners
if (menuItem1 && menuItem2 && menuItem3) {
    menuItem1.addEventListener('mouseenter', () => updateRedVariable('#34d6fe'));
    menuItem2.addEventListener('mouseenter', () => updateRedVariable('#fa524c'));
    menuItem3.addEventListener('mouseenter', () => updateRedVariable('#fdcd3e'));

    menuItem1.addEventListener('mouseleave', () => updateRedVariable(''));
    menuItem2.addEventListener('mouseleave', () => updateRedVariable(''));
    menuItem3.addEventListener('mouseleave', () => updateRedVariable(''));
} else {
    console.error('One or more menu items not found.');
}

// Loading text
let LOADING_TEXT = `
// INITIALIZING SYSTEM //
> INITIALIZING SYSTEM...  
> CHECKING HARDWARE COMPONENTS...  
> CPU STATUS: OPERATIONAL  
> RAM STATUS: OPERATIONAL  
> STORAGE STATUS: OPERATIONAL  

// POWERING UP SYSTEM MODULES //
> POWERING UP SYSTEM MODULES...  
> LOADING KERNEL MODULES...  
> LOADING NETWORK DRIVERS...  
> NETWORK ADAPTER STATUS: CONNECTED  

// VERIFYING OPERATING SYSTEM INTEGRITY //
> VERIFYING OPERATING SYSTEM INTEGRITY...  
> OPERATING SYSTEM LOADED SUCCESSFULLY  

// STARTING CORE SERVICES //
> STARTING CORE SERVICES...  
> DATABASE INITIALIZATION: COMPLETE  
> AUTHENTICATION MODULE: ACTIVE  
> CACHING SYSTEM: READY  

// LOADING USER CONFIGURATIONS //
> LOADING USER CONFIGURATIONS...  
> RETRIEVING PROFILE SETTINGS: SUCCESS  
> APPLYING CUSTOMIZATIONS: COMPLETE  

// INITIATING ADD-ON SERVICES //
> INITIATING ADD-ON SERVICES...  
> ENCRYPTION SERVICE: ENABLED  
> NOTIFICATION CENTER: LOADED  
> REAL-TIME MONITORING: ACTIVE  

// CHECKING SYSTEM HEALTH //
> CHECKING SYSTEM HEALTH...  
> TEMPERATURE: NORMAL  
> FAN SPEED: OPTIMAL  
> RESOURCE USAGE: WITHIN LIMITS  

// FINALIZING STARTUP SEQUENCE //
> FINALIZING STARTUP SEQUENCE...  
> SYSTEM STARTUP SUCCESSFUL  
> READY FOR OPERATION!  
`;

const BC_TXT = document.querySelector('.BC_TXT');
const B = document.querySelector('.B');
const lines = LOADING_TEXT.split('\n');

// Function to insert text line by line
const processLoadingText = () => {
    let i = 0;
    const interval = setInterval(() => {
        if (i < lines.length) {
            BC_TXT.innerHTML += `${lines[i]}<br>`;
            i++;
        } else {
            clearInterval(interval);
        }
    }, 200);
};

// Function to handle flashing and fading
const flashAndFade = () => {
    let flashCount = 0;
    const flashInterval = setInterval(() => {
        if (flashCount < 6) {
            B.style.opacity = B.style.opacity === '1' ? '0.8' : '1';
            flashCount++;
        } else {
            clearInterval(flashInterval);
            const fadeEffect = setInterval(() => {
                B.style.opacity -= 0.8;
                if (B.style.opacity <= 0) {
                    clearInterval(fadeEffect);
                    B.style.top = '-300vh';
                    setInterval(() => {
                        B.style.display = 'none';
                    }, 300);
                }
            }, 50);
        }
    }, 300);
};

// Run text insertion immediately
processLoadingText();

// Run flashing after DOM content is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     flashAndFade();
// });

window.addEventListener('load', () => {
    flashAndFade();
});


// Primary color changer
const updateColor = (nov) => {
    setTimeout(() => {
        const root = document.documentElement;

        if (nov == 0) {
            root.style.setProperty('--red', '#00ff5f');
        } if (nov == 1) {
            root.style.setProperty('--red', '#34d6fe');
        } if (nov == 2) {
            root.style.setProperty('--red', '#fa524c');
        } if (nov == 3) {
            root.style.setProperty('--red', '#fdcd3e');
        }
    }, 300);
};


// Function to remove A
const updateA = (value) => {

    const a = document.querySelector('.A');

    if (a) {
        if (value === 1) {
            a.style.transform = 'rotate(-90deg)';
            setTimeout(() => {
                a.style.top = '-300vw';
            }, 300);
        }

        if (value === 0) {
            a.style.transform = 'rotate(0deg)';
            setTimeout(() => {
                a.style.top = '0vw';
            }, 300);
        }
    }
}

const updateC = (value) => {

    const c = document.querySelector('.C');
    const gc = document.querySelector(".GC");

    if (c) {
        if (value === 1) {

            setTimeout(() => {
                gc.style.display = 'none';
                c.style.top = '0vw';
            }, 300);
        }

        if (value === 0) {
            setTimeout(() => {
                gc.style.display = 'grid';
                c.style.top = '300vw';
            }, 300);
        }
    }

}

const updateD = (value) => {
    const d = document.querySelector('.D');
    const gc = document.querySelector(".GC");

    if (d) {
        if (value === 1) {

            setTimeout(() => {
                gc.style.display = 'none';
                d.style.left = '0vw';
            }, 300);
        }

        if (value === 0) {
            setTimeout(() => {
                gc.style.display = 'grid';
                d.style.left = '-300vw';
            }, 300);
        }
    }
}

const updateE = (value) => {
    const e = document.querySelector('.E');
    const gc = document.querySelector(".GC");

    if (e) {
        if (value === 1) {

            setTimeout(() => {
                gc.style.display = 'none';
                e.style.right = '0vw';
            }, 300);
        }

        if (value === 0) {
            setTimeout(() => {
                gc.style.display = 'grid';
                e.style.right = '-500vw';
            }, 300);
        }
    }
}

// Interests slide
const I_C_L_D1 = document.querySelector(".I_C_L_D1");
const I_C_L_D2 = document.querySelector(".I_C_L_D2");
const I_C_L_D3 = document.querySelector(".I_C_L_D3");

const I_C_R_D1 = document.querySelector(".I_C_R_D1");
const I_C_R_D2 = document.querySelector(".I_C_R_D2");
const I_C_R_D3 = document.querySelector(".I_C_R_D3");

const I_C_R_D_D = document.querySelector(".I_C_R_D_D");

// Interests slide
const interestElements = {
    left: [
        I_C_L_D1,
        I_C_L_D2,
        I_C_L_D3
    ],

    right: [
        I_C_R_D1,
        I_C_R_D2,
        I_C_R_D3
    ],

    container: I_C_R_D_D
};

const colors = ["var(--coding)", "var(--arma3)", "var(--minecraft)"];

const updateInterests = (value) => {
    interestElements.container.style.top = `${-(value - 1) * 100}%`;

    interestElements.left.forEach((element, index) => {
        element.style.backgroundColor = index === value - 1 ? colors[index] : "transparent";
    });

    interestElements.right.forEach((element, index) => {
        element.style.opacity = index === value - 1 ? "1" : "0";
    });
};

I_C_L_D1.addEventListener("click", () => updateInterests(1));
I_C_L_D2.addEventListener("click", () => updateInterests(2));
I_C_L_D3.addEventListener("click", () => updateInterests(3));

// Copy
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);

        const copyElement = document.querySelector('.COPY_T');
        const copyTextElement = copyElement.querySelector('.COPY_T2');

        copyTextElement.innerHTML = text;
        copyElement.style.left = '2vw';

        setTimeout(() => {
            copyElement.style.left = '-80vw';
        }, 1500);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

const updateBackgroundPosition = (event) => {
    const maxX = -22; // Maximum x in vw
    const minX = 0;   // Minimum x in vw
    const maxY = -14; // Maximum y in vh
    const minY = -2;   // Minimum y in vh

    const sensitivity = 0.5; // Adjust sensitivity (0.1 = less movement, 2.0 = more movement)

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate movement with sensitivity scaling
    const offsetX = sensitivity * ((event.clientX / viewportWidth) * (minX - maxX) + maxX);
    const offsetY = sensitivity * ((event.clientY / viewportHeight) * (minY - maxY) + maxY);

    // Apply the calculated background position to the specified element
    const element = document.querySelector(".I_C_R_D2");
    if (element) {
        element.style.backgroundPosition = `${offsetX}vw ${offsetY}vh`;
    }
};

// Add event listener with the arrow function
document.addEventListener("mousemove", updateBackgroundPosition);
