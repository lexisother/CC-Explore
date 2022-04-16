/// <reference path="../../global.d.ts" />
ig.module('ccexplore.start-gui').defines(() => {
  sc.CCExploreStartGui = ig.GuiElementBase.extend({
    transitions: {
      DEFAULT: {
        state: {},
        time: 0.2,
        timeFunction: KEY_SPLINES.EASE_OUT,
      },
      HIDDEN: {
        state: {
          alpha: 0,
          scaleY: 0.5,
        },
        time: 0.2,
        timeFunction: KEY_SPLINES.EASE_IN,
      },
    },
    gfx: new ig.Image('media/gui/buttons.png'),
    timer: null,
    init() {
      this.parent();
      this.setAlign(ig.GUI_ALIGN.X_CENTER, ig.GUI_ALIGN.Y_CENTER);
      this.setPos(0, -8);
      let pressStartText = new sc.TextGui('Press Start', {
        font: sc.fontsystem.font,
      });
      pressStartText.setAlign(ig.GUI_ALIGN.X_CENTER, ig.GUI_ALIGN.Y_CENTER);
      pressStartText.setPos(0, pressStartText.hook.size.y / 2);
      this.addChildGui(pressStartText);
      this.timer = new ig.WeightTimer(true, 3, ig.TIMER_MODE.SINUS);
      this.doStateTransition('HIDDEN', true);
    },
    show() {
      this.doStateTransition('DEFAULT');
    },
    hide() {
      this.doStateTransition('HIDDEN');
    },
    update() {
      this.timer.tick();
      for (let a = 0.6 + this.timer.get() * 0.4, b = this.hook.children, c = b.length; c--; )
        b[c].localAlpha = a;
    },
  });
});
