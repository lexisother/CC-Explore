sc.ExploreMenu = sc.BaseMenu.extend({
  buttonInteract: null,
  buttongroup: null,
  init() {
    this.parent();
    this.setSize(ig.system.width, ig.system.height);

    // button group stuff
    this.buttonInteract = new ig.ButtonInteractEntry();
    this.buttongroup = new sc.ButtonGroup();
    this.buttonInteract.pushButtonGroup(this.buttongroup);
    this.buttongroup.addPressCallback(this.onBeginButtonPress);

    // enum manipulation
    ig.lang.labels.sc.gui.menu['menu-titles'].explore = 'Explore';

    // Wrapper structuring
    this.content = new ig.GuiElementBase();
    this.msgBox = new sc.CenterBoxGui(this.content);
    this.msgBox.setAlign(ig.GUI_ALIGN.X_CENTER, ig.GUI_ALIGN.Y_CENTER);

    // Textual content sizing
    let text = new sc.TextGui(
      'Note: CC-Explore is \\c[1]unfinished\\c[0].\nBug reports can be submitted on the GitHub repository.\nThank you for checking out the mod!',
    );
    text.setAlign(ig.GUI_ALIGN.X_CENTER, ig.GUI_ALIGN.Y_TOP);
    text.setTextAlign(ig.Font.ALIGN.CENTER);

    // Start button
    this.startButton = new sc.ButtonGui('Start');
    this.startButton.setAlign(ig.GUI_ALIGN.X_CENTER, ig.GUI_ALIGN.Y_BOTTOM);
    this.startButton.onButtonPress = this.onBeginButtonPress;

    // Add content
    this.content.addChildGui(text);
    this.content.addChildGui(this.startButton);

    // Set wrapper container to fit text content width (ignoring height)
    let textWidth = text.hook.size.x;
    let textHeight = text.hook.size.y;
    this.msgBox.setSize(textWidth + 20, textHeight + 20 + this.startButton.hook.size.y);
    this.content.setSize(textWidth + 10, textHeight + 10 + this.startButton.hook.size.y);

    // Resize to correct left+right border heights and bg
    this.msgBox.resize();

    // Add start button
    this.buttongroup.addFocusGui(this.startButton, 0, 1);

    this.addChildGui(this.msgBox);

    this.doStateTransition('DEFAULT', true);
  },

  showMenu() {
    this.addObservers();

    sc.menu.buttonInteract.pushButtonGroup(this.buttongroup);
    sc.menu.pushBackCallback(this.onBackButtonPress);
    sc.menu.moveLeaSprite(0, 0, sc.MENU_LEA_STATE.HIDDEN);
  },

  hideMenu() {
    this.removeObservers();
    sc.menu.moveLeaSprite(0, 0, sc.MENU_LEA_STATE.LARGE);
    sc.menu.buttonInteract.removeButtonGroup(this.buttongroup);
  },

  addObservers() {
    sc.Model.addObserver(sc.menu, this);
  },

  removeObservers() {
    sc.Model.removeObserver(sc.menu, this);
  },

  onBackButtonPress() {
    sc.menu.popBackCallback();
    sc.menu.popMenu();
  },

  onBeginButtonPress() {
    ig.bgm.clear('MEDIUM_OUT');
    ig.game.start(sc.START_MODE.EXPLORE, 1);
    ig.game.setPaused(false);
  },

  // Stub
  modelChanged(..._args: unknown[]) {},
});

// @ts-expect-error It doesn't *actually* exist in-game, so we have to assign it.
sc.MENU_SUBMENU.EXPLORE = 32789;
sc.SUB_MENU_INFO[sc.MENU_SUBMENU.EXPLORE] = {
  Clazz: sc.ExploreMenu,
  name: 'explore',
};
