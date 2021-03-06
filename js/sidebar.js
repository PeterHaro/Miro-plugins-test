let lastSelectedWidgetId;
let widgetName = document.querySelector('#widget-name');
let widgetInfo = document.querySelector('.widget-info');
let editor = document.querySelector('#editor');
let placeholder = document.querySelector('.no-selected-widget');

function onSelectionChange(e) {
    let selectedWidgets = e.data
    updateSelection(selectedWidgets)
}

async function updateSelection(selectedWidgets) {
    let selectedWidget = selectedWidgets[0]
    if (selectedWidgets.length === 1) {
        showElement(widgetInfo)
        hideElement(placeholder)
        saveEditorData()
        lastSelectedWidgetId = selectedWidget.id
        widgetName.innerText = selectedWidget.type
        let data = await getData(lastSelectedWidgetId);
        editor.value = data["textual_metadata"];
    } else {
        showElement(placeholder)
        hideElement(widgetInfo)
    }
}

function showElement(el) {
    el.style.display = 'block'
}

function hideElement(el) {
    el.style.display = 'none'
}

hideElement(placeholder)
hideElement(widgetInfo)

miro.onReady(() => {
    miro.addListener(miro.enums.event.SELECTION_UPDATED, onSelectionChange)
    miro.board.selection.get().then((selectedWidgets) => {
        updateSelection(selectedWidgets)
    })
})

editor.addEventListener('change', saveEditorData)

async function saveEditorData() {
    if (lastSelectedWidgetId) {
        saveData(lastSelectedWidgetId, editor.value)
        lastSelectedWidgetId = undefined
    }
}

const LS_KEY = 'rtb-plugin-widget-info'

/*function saveData(widgetId, text) {
    let data = JSON.parse(localStorage.getItem(LS_KEY)) || {}
    data[widgetId] = text
    localStorage.setItem(LS_KEY, JSON.stringify(data))
    //Use miro API to upload the entry to widget for cross-machine collab
}*/

async function saveData(widgetId, metadata) {
    if (metadata === "[object Object]") {
        return;
    }
    const appId = miro.getClientId()
    //let widgets = getBoardWidgetsSdk();
    let widgets = null;
    await miro.board.widgets.get().then(function (response) {
        console.log(response);
        widgets = response;
    });

    const metadata_payload = {
        [applicationId]: {
            textual_metadata: metadata
        }
    };

    for (const widget of widgets) {
        if (widget.id === widgetId) {
            widget.metadata = metadata_payload;
            //await miro.board.widgets.update(widget);
            await miro.board.widgets.update([widget]);
            break;
        }
    }
    //let response = updateWidget(widgetId, metadata);
    //console.log(response);
}

async function getData(widgetId) {
    const appId = await miro.getClientId()
    let widgets = null;
    await miro.board.widgets.get().then(function (response) {
        console.log(response);
        widgets = response;
    });
    for (const widget of widgets) {
        if (widget.id === widgetId) {
            return await widget.metadata[appId];
        }
    }
    return "";
}

/*function getData(widgetId) {
    let data = JSON.parse(localStorage.getItem(LS_KEY)) || {}
    return data[widgetId] || ''
}*/

