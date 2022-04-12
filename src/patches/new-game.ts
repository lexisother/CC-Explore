import '../ui/submenu.js';
sc.NewGameModeSelectDialog.inject({
  explore: null,
  init(callback) {
    this.parent(callback);

    ig.lang.labels.sc.gui.menu['new-game'].dialogs.explore = 'Explore';
    ig.lang.labels.sc.gui.menu['new-game'].dialogs.exploreDescription =
      'Explore the world of Shadoon.';

    this.explore = new sc.NewGameModeDialogButton(
      ig.lang.get('sc.gui.menu.new-game.dialogs.explore'),
      1,
    );
    this.explore.setAlign(ig.GUI_ALIGN.X_CENTER, ig.GUI_ALIGN.Y_TOP);
    this.explore.setPos(0, 27);
    this.explore.data = 2;

    this.content.addChildGui(this.explore);
    this.buttongroup.addFocusGui(this.explore, 2, 0);

    this.content.setSize(400, 200);
    this.info.setMaxWidth(394);
    this.msgBox.resize();

    for (const child of this.content.hook.children) {
      if (child.gui instanceof sc.LineGui) {
        child.gui.hook.size.x = 400;
      }
    }

    this.buttongroup.addSelectionCallback((info) => {
      if (!(info instanceof sc.ButtonGui)) return;
      if (info.data === 2) {
        this.info.doStateTransition('DEFAULT', true);
        this.info.setText(ig.lang.get('sc.gui.menu.new-game.dialogs.exploreDescription'));
      }
    });
    this.buttongroup.addPressCallback((info) => {
      if (!(info instanceof sc.ButtonGui)) return;
      if (info.data === 2) {
        sc.menu.setDirectMode(true, sc.MENU_SUBMENU.EXPLORE);
        sc.menu.optionsLocalMode = true;
        sc.model.enterMenu(true);
      }
    });
  },
});
