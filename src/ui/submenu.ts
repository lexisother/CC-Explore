sc.ExploreMenu = sc.BaseMenu.extend({
    buttonGroup: null,
    init() {
        this.parent()
        this.hook.size.x = ig.system.width
        this.hook.size.y = ig.system.height

        this.buttonGroup = new sc.ButtonGroup()

        this.doStateTransition("DEFAULT", true)
    },

    showMenu() {
        this.addObservers()

        sc.menu.buttonInteract.pushButtonGroup(this.buttonGroup)
        sc.menu.pushBackCallback(this.onBackButtonPress)
        sc.menu.moveLeaSprite(0, 0, sc.MENU_LEA_STATE.HIDDEN);
    },

    hideMenu() {
        this.removeObservers()
        sc.menu.moveLeaSprite(0, 0, sc.MENU_LEA_STATE.LARGE)
        sc.menu.buttonInteract.removeButtonGroup(this.buttonGroup);
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

    modelChanged(..._args: unknown[]) {

    }
})

// @ts-expect-error It doesn't *actually* exist in-game, so we have to assign it.
sc.MENU_SUBMENU.EXPLORE = 32789
sc.SUB_MENU_INFO[sc.MENU_SUBMENU.EXPLORE] = {
    Clazz: sc.ExploreMenu,
    name: "explore"
}