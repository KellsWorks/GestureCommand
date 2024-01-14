const tagInput = document.getElementById('tag-input');
const submitButton = document.getElementsById('submitButton');

if (submitButton) {
    submitButton.addEventListener('click', () => {
        const tag = tagInput.value;

        chrome.runtime.sendMessage({
            type: 'GESTURE_COMMAND',
            data: {
                tag,
            }
        });

        console.log("This is a log message from the content script.");
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message && message.type === 'GESTURE_COMMAND' && message.data) {
        const { tag } = message.data;
        const element = document.getElementById(tag);

        if (element) {
            element.click();
        }
    }
});
