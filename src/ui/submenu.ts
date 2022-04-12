sc.ExploreMenu = sc.BaseMenu.extend({
    buttonInteract: null,
    buttongroup: null,
    init() {
        this.parent()
        this.hook.size.x = ig.system.width
        this.hook.size.y = ig.system.height

        this.content = new ig.GuiElementBase()
        this.content.setSize(160, 110);

        this.buttonInteract = new ig.ButtonInteractEntry()
        this.buttongroup = new sc.ButtonGroup()
        this.buttonInteract.pushButtonGroup(this.buttongroup)
        this.buttongroup.addPressCallback(this.onBeginButtonPress)

        this.startButton = new sc.ButtonGui("\\i[help2] Start")
        this.startButton.setAlign(ig.GUI_ALIGN.X_CENTER, ig.GUI_ALIGN.Y_BOTTOM)
        this.startButton.onButtonPress = this.onBeginButtonPress
        let i = 4
        while (i-- > 0) this.buttongroup.addFocusGui(this.startButton, i, 1)
        this.content.addChildGui(this.startButton)

        this.msgBox = new sc.CenterBoxGui(this.content)
        this.msgBox.setAlign(ig.GUI_ALIGN.X_CENTER, ig.GUI_ALIGN.Y_CENTER)

        this.addChildGui(this.msgBox)

        this.doStateTransition("DEFAULT", true)
    },

    showMenu() {
        this.addObservers()

        sc.menu.buttonInteract.pushButtonGroup(this.buttongroup)
        sc.menu.pushBackCallback(this.onBackButtonPress)
        sc.menu.moveLeaSprite(0, 0, sc.MENU_LEA_STATE.HIDDEN);
    },

    hideMenu() {
        this.removeObservers()
        sc.menu.moveLeaSprite(0, 0, sc.MENU_LEA_STATE.LARGE)
        sc.menu.buttonInteract.removeButtonGroup(this.buttongroup);
    },

    addObservers() {
        sc.Model.addObserver(sc.menu, this)
    },

    removeObservers() {
        sc.Model.removeObserver(sc.menu, this)
    },

    onBackButtonPress() {
        sc.menu.popBackCallback()
        sc.menu.popMenu()
    },

    onBeginButtonPress() {
        ig.bgm.clear("MEDIUM_OUT")
        ig.game.start(sc.START_MODE.EXPLORE, 1)
        ig.game.setPaused(false)
    },

    // Stub
    modelChanged(..._args: unknown[]) {}
})

// @ts-expect-error It doesn't *actually* exist in-game, so we have to assign it.
sc.MENU_SUBMENU.EXPLORE = 32789
sc.SUB_MENU_INFO[sc.MENU_SUBMENU.EXPLORE] = {
    Clazz: sc.ExploreMenu,
    name: "explore"
}