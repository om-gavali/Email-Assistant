console.log("email content")

function createAiButton() {
    const button = document.createElement('div');
    button.className = 'T-J J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Replay';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate Ai reply');
    return button;
}

function findcomposeToolbar() {
    const selectors = [
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        'gU.Up'
    ];

    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
    }
    return null;
}

function getemailContent() {
    const selectors = [
        '.h7',
        '.a3s.ail',
        '.gmail_quote',
        '[role="presentation"]'
    ];

    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
    }
    return null;
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolbar = findcomposeToolbar();
    if (!toolbar) {
        console.log("not sound");
        return;
    }

    console.log("found button");
    const button = createAiButton();
    button.classList.add('ai-reply-button');

    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'generating......';
            button.disabled = true;

            const emailcontent = getemailContent();

            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: emailcontent,
                    tone: "professional"
                })
            });

            if (!response.ok) {
                throw new Error('api failed');
            }

            const genetatedreply = await response.text();
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, genetatedreply);
            } else {
                console.error("compose box not found");
            }

        } catch (error) {
            console.error(error);
            alert("Failed....");
        } finally {
            button.innerHTML = 'AI Replay';
            button.disabled = false;
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hascomposeElement = addedNodes.some(node =>
            node.nodeType === node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]') ||
             node.querySelector('.aDh, .btC, [role="dialog"]'))
        );

        if (hascomposeElement) {
            console.log("compose window show");
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
