const state = {
    diceDisplay: 0,
    isSum: false,
    flashes: 8,
    isAdding: false,
    isUpdating: false,
}

const diceEl = document.getElementById('dice');
const diceDisplay = document.getElementById('dice-display');

function roll(max, min = 1) {
    return Math.floor(Math.random() * max) + min
}

diceEl.addEventListener('click', function(event) {
    if(event.target instanceof HTMLButtonElement && !state.isAdding && !state.isUpdating) {
        const diceType = Number(event.target.textContent);

        const rollValue = roll(diceType);
        console.log(rollValue)
        if (!state.isSum) {
            state.diceDisplay = rollValue;
            delayDisplay()
        } else {
            if (state.diceDisplay == 0) {
                state.diceDisplay += rollValue;
                diceDisplay.textContent = state.diceDisplay;
            }
            else {
                diceDisplay.classList.add('small-text');
                diceDisplay.textContent = `${state.diceDisplay}+${rollValue}`;
                state.isAdding = true;
                setTimeout(() => {
                    state.diceDisplay += rollValue;
                    diceDisplay.classList.remove('small-text');
                    diceDisplay.textContent = state.diceDisplay;
                    state.isAdding = false;
                }, 400)
            }
        }
    }
})

diceDisplay.addEventListener('click', function(event) {
    if (!state.isSum) {
        diceDisplay.classList.add('sum-display');
        state.diceDisplay = 0;
        diceDisplay.textContent = state.diceDisplay;
    } else {
        diceDisplay.classList.remove('sum-display');
        state.diceDisplay = 20;
        diceDisplay.textContent = state.diceDisplay;
    }
    
    state.isSum = !state.isSum;
})

function delayDisplay() {
    state.isUpdating = true;
    diceDisplay.textContent = ''
    setTimeout(() => {
        diceDisplay.textContent = state.diceDisplay;
        state.isUpdating = false;
    }, 200);
}