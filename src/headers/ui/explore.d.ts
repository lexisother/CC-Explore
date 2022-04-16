export {};

declare global {
  namespace sc {
    interface ExploreMenu extends BaseMenu {
      buttons: sc.ExploreMenuButtonGui;
      content: ig.GuiElementBase;
      startButton: sc.ButtonGui;
      msgBox: sc.CenterBoxGui;

      onBackButtonPress(): void;
      onBeginButtonPress(): void;
      onGitButtonPress(): void;
      modelChanged(): void;
    }
    interface ExploreMenuConstructor extends ImpactClass<ExploreMenu> {
      new (): ExploreMenu;
    }
    let ExploreMenu: ExploreMenuConstructor;

    interface ExploreMenuButtonGui extends ig.GuiElementBase {
      buttongroup: ig.ButtonGroup;
      offset: number;
      spacing: number;
      maxHeight: number;

      pushButton(this: this, button: ig.FocusGui): void;
      pushButtons(this: this, buttons: ig.FocusGui[]): void;
    }
    interface ExploreMenuButtonGuiConstructor extends ImpactClass<ExploreMenuButtonGui> {
      new (): ExploreMenuButtonGui;
    }
    let ExploreMenuButtonGui: ExploreMenuButtonGuiConstructor;
  }
}
