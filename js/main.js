miro.onReady(() => {
    miro.initialize({
        extensionPoints: {
            bottomBar: {
                title: 'Metadata Manager',
                svgIcon:
                    '<path fill="currentColor" d="M12 2.617L2.617 12 12 21.383 21.383 12 12 2.617zm.707-2.121l10.797 10.797a1 1 0 0 1 0 1.414L12.707 23.504a1 1 0 0 1-1.414 0L.496 12.707a1 1 0 0 1 0-1.414L11.293.496a1 1 0 0 1 1.414 0z"></path>',
                onClick: function () {
                    miro.board.ui.openLeftSidebar('sidebar.html')
                },
                bottomBar: {
                    title: "Data exporter",
                    svgIcon: '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
                    onClick: function() {
                        miro.board.ui.openLeftSidebar('export_sidebar.html')
                    },
                }
            },
        },
    })
})
