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
    enum MAP_EVENT {
      MAP_CHANGED = 32789,
    }

    interface Control {
      menuCircleLeft(): boolean;
      menuCircleRight(): boolean;
    }

    interface GameModel {
      enterReset(): void;
      enterRunning(): void;
    }

    type nullableGetter = null | (() => unknown);
    type nullableSetter = null | ((value: unknown) => void);

    interface MenuModel {
      optionsLocalMode: boolean;
      additionalStates: { [index: string]: unknown };
      additionalStateGets: { [index: string]: nullableGetter };
      additionalStateSets: { [index: string]: nullableSetter };

      registerAdditionalState(
        this: this,
        stateName: string,
        get: nullableGetter,
        set: nullableSetter,
        initialValue: unknown,
      ): void;

      getAS(this: this, key: string): unknown;
      setAS(this: this, key: string, value: unknown): void;
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

      transitionEnded(this: this): void;
      setTeleportColor(r: number, g: number, b: number, lighter: boolean): void;
      setPaused(paused: boolean): void;
    }
  }
}
