/// <reference path="../../global.d.ts" />
import './press-start.js';

ig.module('playground.title-screen')
  .requires('playground.start-gui')
  .defines(() => {
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
        exploreButton.onButtonPress = () => {
          this.changelogGui.clearLogs();
          ig.bgm.clear('MEDIUM_OUT');
          ig.interact.removeEntry(this.buttonInteract);
          ig.game.start(sc.START_MODE.EXPLORE, 1);
        };
        exploreButton.doStateTransition('DEFAULT', true);
        this.buttonGroup.addFocusGui(exploreButton, 0, this.buttons.length);
        this.addChildGui(exploreButton);
        this.namedButtons.explore = exploreButton;
        this.buttons.push(exploreButton);
      },
    });
  });
