// @ts-expect-error It doesn't *actually* exist in-game, so we have to assign it.
sc.MENU_SUBMENU.EXPLORE = 32789
sc.SUB_MENU_INFO[sc.MENU_SUBMENU.EXPLORE] = {
    Clazz: sc.OptionsMenu,
    name: "options"
}