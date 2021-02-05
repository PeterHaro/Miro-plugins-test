export_button.addEventListener('click', export_widgets);

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
    //let board = getBoardName(sticky_board_id, bearer);
    let title = getBoardNameSdk();
    //let entries = getBoardWidgets(sticky_board_id, bearer);
    let entries = getBoardWidgetsSdk();
    //let entries = miro.board.widgets.get().then();
    let outputFormat = document.getElementById("export_formats").value;

    switch (outputFormat) {
        case "CSV":
            return convertToCsv(title, entries);
        case "JSON":
            return ""
        case "XML":
            return "";
        case "EAP":
            return "";
        default:
            alert("Could not export the data. Invalid output format, you selected: " + outputFormat);
    }
}