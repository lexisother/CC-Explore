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
  padding: 5,
  transitions: {
    DEFAULT: { state: {}, time: 0.2, timeFunction: KEY_SPLINES.LINEAR },
    HIDDEN: {
      state: { offsetX: 0, alpha: 0 },
      time: 0.2,
      timeFunction: KEY_SPLINES.LINEAR,
    },
  },
  init(labelPath, labels, width) {
    this.parent();

    // Track the max width the change the size of the carousel.
    let maxWidth = 0;

    // For each label provided create the text element
    labels.forEach((label) => {
      // Get the text and make the button
      let text = ig.lang.get(`${labelPath}.${label}`);
      let newText = new sc.TextGui(text);
      newText.setTextAlign(ig.Font.ALIGN.CENTER);
      newText.setAlign(ig.GUI_ALIGN.X_CENTER, ig.GUI_ALIGN.Y_CENTER);
      newText.transitions = {};
      newText.transitions.DEFAULT = {
        state: {},
        time: 0,
        timeFunction: KEY_SPLINES.LINEAR,
      };
      maxWidth = Math.max(maxWidth, newText.hook.size.x);
      this.text.push(newText);
      this.addChildGui(newText);
    });
    this.activeText = this.text[0];

    maxWidth = width || maxWidth;
    //this.transitions.HIDDEN.state.offsetX = maxWidth * -1;

    this.left = new sc.ButtonGui('\\i[arrow-left]', 34, true, sc.BUTTON_TYPE.SMALL);
    this.left.onButtonPress = () => this.updateStatusPage(-1);
    this.left.keepMouseFocus = true;
    this.addChildGui(this.left);

    this.right = new sc.ButtonGui('\\i[arrow-right]', 34, true, sc.BUTTON_TYPE.SMALL);
    this.right.onButtonPress = () => this.updateStatusPage(1);
    this.right.keepMouseFocus = true;
    this.addChildGui(this.right);

    // Set the right button to position itself right-ward.
    this.right.setAlign(ig.GUI_ALIGN.X_RIGHT, ig.GUI_ALIGN.Y_TOP);

    sc.menu.registerAdditionalState(
      'mapPageIndex',
      null,
      () => {
        this.onChange?.(this.index);
      },
      0,
    );

    this.setSize(maxWidth + 68 + this.padding * 2, sc.BUTTON_TYPE.SMALL.height);

    this.doStateTransition('HIDDEN', true);
  },

  show() {
    this.updateCurrentPageName(0);
    sc.menu.buttonInteract.addGlobalButton(this.left, this.onLeftPressCheck);
    sc.menu.buttonInteract.addGlobalButton(this.right, this.onRightPressCheck);
    this.doStateTransition('DEFAULT');
    // this.activeText.doStateTransition('DEFAULT');
  },

  hide() {
    sc.menu.buttonInteract.removeGlobalButton(this.left);
    sc.menu.buttonInteract.removeGlobalButton(this.right);
    this.doStateTransition('HIDDEN');
    //this.activeText.doStateTransition('HIDDEN');
  },

  updateCurrentPageName(delta) {
    if (delta) {
      let currentText = this.activeText;

      // Already updated in caller
      let newText = this.text[this.index];

      // @ts-expect-error Property isn't typed for some reason
      newText.hook.currentState = {
        offsetX: 0,
        offsetY: 0,
        alpha: 1,
        scaleX: 1,
        scaleY: 1,
        angle: 0,
      };

      currentText.hook.transitions = {
        HIDDEN: {
          state: {
            offsetX: this.hook.size.x * delta * 0.3,
            alpha: 0,
          },
          time: 0.2,
          timeFunction: KEY_SPLINES.LINEAR,
        },
      };

      // @ts-expect-error Property isn't typed for some reason
      newText.hook.currentState = {
        offsetX: this.hook.size.x * delta * -0.3,
        offsetY: 0,
        alpha: 0, // Hide it
        scaleX: 1,
        scaleY: 1,
        angle: 0,
      };

      newText.hook.transitions = {
        DEFAULT: {
          state: {
            offsetX: 0,
            alpha: 1,
          },
          time: 0.2,
          timeFunction: KEY_SPLINES.LINEAR,
        },
      };

      newText.doStateTransition('DEFAULT');
      currentText.doStateTransition('HIDDEN');
      this.activeText = newText;
    } else {
    }
  },

  updateStatusPage(delta) {
    let newIndex = this.index + delta;
    if (this.cyclic) {
      if (newIndex < 0) {
        this.index = this.text.length - 1;
      } else if (newIndex >= this.text.length) {
        this.index = 0;
      } else {
        this.index = newIndex;
      }
    } else if (newIndex >= 0 && newIndex < this.text.length) {
      this.index = newIndex;
    } else {
      // No change occurred.
      return;
    }

    sc.menu.setAS('mapPageIndex', this.index);
    this.updateCurrentPageName(delta);
  },

  onLeftPressCheck() {
    return ig.interact.isBlocked() ? false : sc.control.menuCircleLeft();
  },
  onRightPressCheck() {
    return ig.interact.isBlocked() ? false : sc.control.menuCircleRight();
  },
});
