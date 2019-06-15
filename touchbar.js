const {
    app,
    BrowserWindow,
    TouchBar
} = require('electron')

const {
    TouchBarLabel,
    TouchBarButton,
    TouchBarSpacer
} = TouchBar

let cookies = 0;



// Spin result label
const cookieLabel = new TouchBarLabel();
cookieLabel.label = `Cookies: ${cookies}`;



function addCookie(amount = 1) {
    cookies += amount;
    cookieLabel.label = `Cookies: ${cookies}`;
    updateButtons();
}

function subCookies(amount = 1) {
    cookies -= amount;
    cookieLabel.label = `Cookies: ${cookies}`;
    updateButtons();
}

const buttons = {
    main: {
        button: new TouchBarButton({
            label: '🍪',
            backgroundColor: '#7851A9',
            click: () => {
                addCookie();
            }
        }),
        cost: 0
    },
    worker: {
        button: new TouchBarButton({
            label: '👨🏼‍🔧',
            backgroundColor: '#fff',
            click: () => {
                if (cookies >= 10) {
                    subCookies(10);
                    setInterval(() => {
                        addCookie();
                    }, 1000);
                }
            }
        }),
        cost: 10
    },
    "grandma": {
        button: new TouchBarButton({
            label: '👵🏽',
            backgroundColor: "#fff",
            click: () => {
                if (cookies >= 100) {
                    subCookies(100);
                    setInterval(() => {
                        addCookie();
                    }, 1000);
                }
            }
        }),
        cost: 100
    }
};

function updateButtons() {
    for (let buttonObj of Object.values(buttons)) {
        if (cookies >= buttonObj.cost) {
            buttonObj.button.backgroundColor = "#7851A9";
        } else {
            buttonObj.button.backgroundColor = "fff";
        }
    }
}
// Spin button
// const cookieBtn = 

// const workerBtn = ;

const touchBar = new TouchBar({
    items: [
        buttons.main.button,
        buttons.worker.button,
        buttons.grandma.button,
        new TouchBarSpacer({
            size: 'flexiable'
        }),
        cookieLabel
    ]
})

let window

app.once('ready', () => {
    window = new BrowserWindow({
        frame: false,
        titleBarStyle: 'hiddenInset',
        width: 0,
        height: 0,
        backgroundColor: '#000',
    })
    window.loadURL('about:blank');
    window.setTouchBar(touchBar);
})