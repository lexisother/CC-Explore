export {};

declare global {
  namespace ig {
    enum TIMER_MODE {
      ONCE = 0,
      REPEAT = 1,
      BLINK = 2,
      SINUS = 3,
      SINUS_RND = 4,
    }
  }
  namespace sc {
    enum START_MODE {
      EXPLORE = 32789,
    }
    enum MENU_SUBMENU {
      EXPLORE = 32789,
    }

    interface ExploreMenu extends BaseMenu {
      buttonInteract: ig.ButtonInteractEntry;
      buttongroup: ig.ButtonGroup;
      content: ig.GuiElementBase;
      startButton: sc.ButtonGui;
      msgBox: sc.CenterBoxGui;

      onBackButtonPress(): void;
      onBeginButtonPress(): void;
      modelChanged(): void;
    }
    interface ExploreMenuConstructor extends ImpactClass<ExploreMenu> {
      new (): ExploreMenu;
    }
    let ExploreMenu: ExploreMenuConstructor;

    interface GameModel {
      enterReset(): void;
      enterRunning(): void;
    }
    interface MenuModel {
      optionsLocalMode: boolean;
    }
    interface CrossCode extends ig.Game {
      _startMode: sc.START_MODE;
      transitionTimer: number;
      currentTeleportColor: {
        r: number;
        g: number;
        b: number;
        lighter: boolean;
      };

      transitionEnded(): void;
      setTeleportColor(r: number, g: number, b: number, lighter: boolean): void;
      setPaused(paused: boolean): void;
    }
  }
}
