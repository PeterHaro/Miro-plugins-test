let lastSelectedWidgetId;
let widgetName = document.querySelector('#widget-name');
let widgetInfo = document.querySelector('.widget-info');
let editor = document.querySelector('#editor');
let placeholder = document.querySelector('.no-selected-widget');
let export_button = document.querySelector("#export_buttonl");

function onSelectionChange(e) {
    let selectedWidgets = e.data
    updateSelection(selectedWidgets)
}

function updateSelection(selectedWidgets) {
    let selectedWidget = selectedWidgets[0]
    if (selectedWidgets.length === 1) {
        showElement(widgetInfo)
        hideElement(placeholder)
        saveEditorData()
        lastSelectedWidgetId = selectedWidget.id
        widgetName.innerText = selectedWidget.type
        editor.value = getData(lastSelectedWidgetId)
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

function saveData(widgetId, metadata) {
    let response = updateWidget(widgetId, metadata);
    console.log(response);
}

function getData(widgetId) {
    let data = getSpecificWidget(widgetId);
    return data.metadata;
}

/*function getData(widgetId) {
    let data = JSON.parse(localStorage.getItem(LS_KEY)) || {}
    return data[widgetId] || ''
}*/

function convertToCsv(filename, entries) {
    const items = entries.data;
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(items[0])
    const csv = [
        header.join(','), // header row first
        ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')

    let exportedFilename = filename + '.csv' || 'export.csv';
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilename);
    } else {
        let link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            let url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

}

function export_widgets() {
    let board = getBoardName(sticky_board_id, bearer);
    let entries = getBoardWidgets(sticky_board_id, bearer);
    let outputFormat = document.getElementById("export_formats").value;

    switch (outputFormat) {
        case "CSV":
            return convertToCsv(board.name, entries);
        case "JSON":
            return ""
        case "XML":
            return "";
        case "EAP":
            return "";
        default:
            alert("Could not export the data. Invalid output format, you selected: " + OUTPUT_FORMAT);
    }
}