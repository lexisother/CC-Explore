// @ts-expect-error It doesn't *actually* exist in-game, so we have to assign it.
sc.MAP_EVENT.MAP_CHANGED = Math.max(...Object.values(sc.MAP_EVENT)) + 1;

// Dynamic™️ additional menu states
sc.MenuModel.inject({
  additionalStates: null,
  additionalStateGets: null,
  additionalStateSets: null,
  init() {
    this.parent();
    this.additionalStates = {};
    this.additionalStateGets = {};
    this.additionalStateSets = {};
  },

  registerAdditionalState(stateName, get, set, initialValue) {
    this.additionalStates[stateName] = initialValue;
    this.additionalStateGets[stateName] = get;
    this.additionalStateSets[stateName] = set;
  },

  getAS(key) {
    return this.additionalStateGets[key]
      ? this.additionalStateGets[key]?.()
      : this.additionalStates[key];
  },

  setAS(key, value) {
    if (this.additionalStateSets[key]) {
      this.additionalStateSets[key]?.(key);
    } else {
      this.additionalStates[key] = value;
    }
  },
});

sc.TextCarousel = ig.GuiElementBase.extend({
  left: null,
  right: null,
  text: [],
  activeText: null,
  index: 0,
  cyclic: true,
  onChange: null,
  transitions: {
    DEFAULT: { state: {}, time: 0.2, timeFunction: KEY_SPLINES.LINEAR },
    HIDDEN: {
      state: { offsetX: -195, alpha: 0 },
      time: 0.2,
      timeFunction: KEY_SPLINES.LINEAR,
    },
  },
  init(labelPath, labels, width) {
    this.parent();
    this.setAlign(ig.GUI_ALIGN.X_RIGHT, ig.GUI_ALIGN.Y_TOP);
    this.setPos(25, 27);

    this.activeText = new sc.TextGui('Croissant');
    this.activeText.setAlign(ig.GUI_ALIGN.X_CENTER, ig.GUI_ALIGN.Y_CENTER);
    this.addChildGui(this.activeText);

    let maxWidth = 0;
    labels.forEach((label) => {
      let text = ig.lang.get(`${labelPath}.${label}`);
      let newText = new sc.TextGui(text);
      newText.setTextAlign(ig.Font.ALIGN.CENTER);
      newText.setAlign(ig.GUI_ALIGN.X_CENTER, ig.GUI_ALIGN.Y_CENTER);
      maxWidth = Math.max(maxWidth, newText.hook.size.x);
      this.text.push(newText);
    });

    maxWidth = width || maxWidth;

    // TODO: Add padding to the buttons
    // Left arrow button
    this.left = new sc.ButtonGui('\\i[arrow-left]', 34, true, sc.BUTTON_TYPE.SMALL);
    this.left.setPos(0, 0);
    this.left.keepMouseFocus = true;
    this.left.onButtonPress = () => {
      this.updateStatusPage(-1);
    };
    this.addChildGui(this.left);

    // Right arrow button
    this.right = new sc.ButtonGui('\\i[arrow-right]', 34, true, sc.BUTTON_TYPE.SMALL);
    this.right.setAlign(ig.GUI_ALIGN.X_RIGHT, ig.GUI_ALIGN.Y_TOP);
    this.right.keepMouseFocus = true;
    this.right.onButtonPress = () => {
      this.updateStatusPage(1);
    };
    this.addChildGui(this.right);

    sc.menu.registerAdditionalState(
      'mapPageIndex',
      null,
      () => {
        this.onChange?.(this.index);
      },
      0,
    );

    this.setSize(maxWidth + 34 * 2, sc.BUTTON_TYPE.SMALL.height);

    this.doStateTransition('HIDDEN', true);
  },
  show() {
    this.updateCurrentPageName();
    sc.menu.buttonInteract.addGlobalButton(this.left, this.onLeftPressCheck);
    sc.menu.buttonInteract.addGlobalButton(this.right, this.onRightPressCheck);
    this.doStateTransition('DEFAULT');
  },
  hide() {
    sc.menu.buttonInteract.removeGlobalButton(this.left);
    sc.menu.buttonInteract.removeGlobalButton(this.right);
    this.doStateTransition('HIDDEN');
  },

  updateCurrentPageName() {
    let texts = ig.lang.get('sc.gui.menu.world.page');
    let text = Object.values(texts)[this.index];
    this.activeText.setText(text);
  },

  updateStatusPage(delta) {
    this.index += delta;
    sc.menu.setAS('mapPageIndex', this.index);
    this.updateCurrentPageName();
  },

  onLeftPressCheck() {
    return ig.interact.isBlocked() ? false : sc.control.menuCircleLeft();
  },
  onRightPressCheck() {
    return ig.interact.isBlocked() ? false : sc.control.menuCircleRight();
  },
});
