const sticky_board_id = "o9J_lVvvXXw=";
const applicationId = "3074457354078869572";

function getBoardName(boardName, bearer) {
    fetch("https://api.miro.com/v1/boards/" + boardName, {
        "method": "GET",
        "headers": {
            "Authorization": bearer
        }
    })
        .then(response => {
            return response;
        })
        .catch(err => {
            console.error(err);
        });
}

function getBoardWidgetsSdk() {
    
}

function getBoardWidgets(boardId, bearer) {
    fetch("https://api.miro.com/v1/boards/" + boardId + "/widgets/", {
        "method": "GET",
        "headers": {
            "Authorization": bearer
        }
    })
        .then(response => {
            return response;
        })
        .catch(err => {
            console.error(err);
        });
}

function getSpecificWidget(widgetId) {
    const options = {method: 'GET', headers: {Authorization: bearer}};

    fetch(`https://api.miro.com/v1/boards/o9J_lVvvXXw%3D/widgets/${widgetId}`, options)
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(err => console.error(err));
}

function updateWidget(widgetId, payload) {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": bearer
        },
        raw_body: `{"metadata":{${applicationId}: {${payload}}}}`,
    };

    fetch("https://api.miro.com/v1/boards/" + sticky_board_id + "/widgets/" + widgetId, options)
        .then(response => {
            return response;
        })
        .catch(err => {
            console.error(err);
        });
}