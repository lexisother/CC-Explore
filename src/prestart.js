/// <reference path="../global.d.ts" />

/*
 * Some points of interest:
 * sc.CrossCode#start
 */

ig.module('playground').defines(() => {
  sc.PlaygroundStartGui = ig.GuiElementBase.extend({
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

  sc.START_MODE.EXPLORE = Object.keys(sc.START_MODE).length;
  sc.CrossCode.inject({
    transitionEnded() {
      if (
        sc.model.currentSubState == sc.GAME_MODEL_SUBSTATE.NEWGAME &&
        this._startMode == sc.START_MODE.EXPLORE
      ) {
        this.teleport('Playground', new ig.TeleportPosition('main'), 'NEW');
      } else {
        this.parent();
      }
    },
  });

  sc.TitleScreenGui.inject({
    init() {
      this.parent();
      this.startGui = new sc.PlaygroundStartGui();
      this.addChildGui(this.startGui);
    },
  });

  sc.TitleScreenButtonGui.inject({
    init() {
      this.parent();
      let exploreButton = new sc.ButtonGui('Explore', sc.BUTTON_DEFAULT_WIDTH);
      exploreButton.setPos(12, this.buttons.last().hook.pos.y + 28);
      exploreButton.setAlign(ig.GUI_ALIGN.X_LEFT, ig.GUI_ALIGN.Y_BOTTOM);
      exploreButton.hook.transitions = {
        DEFAULT: {
          state: {},
          time: 0.2,
          timeFunction: KEY_SPLINES.EASE,
        },
        HIDDEN: {
          state: {
            offsetX: -(sc.BUTTON_DEFAULT_WIDTH + 12),
          },
          time: 0.2,
          timeFunction: KEY_SPLINES.LINEAR,
        },
      };
      exploreButton.onButtonPress = function () {
        this.changelogGui.clearLogs();
        ig.bgm.clear('MEDIUM_OUT');
        ig.interact.removeEntry(this.buttonInteract);
        ig.game.start(sc.START_MODE.EXPLORE, 1);
      }.bind(this);
      exploreButton.doStateTransition('DEFAULT', true);
      this.buttonGroup.addFocusGui(exploreButton, 0, this.buttons.length);
      this.addChildGui(exploreButton);
      this.namedButtons['explore'] = exploreButton;
      this.buttons.push(exploreButton);
    },
  });
});
