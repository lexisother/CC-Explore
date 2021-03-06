export {};

declare global {
  namespace sc {
    interface CCExploreStartGui extends ig.GuiElementBase {
      transitions: { [name: string]: ig.GuiHook.Transition };
      gfx: ig.Image;
      timer: ig.WeightTimer;

      show(this: this): void;
      hide(this: this): void;
    }
    interface CCExploreStartGuiConstructor extends ImpactClass<CCExploreStartGui> {
      new (): CCExploreStartGui;
    }
    let CCExploreStartGui: CCExploreStartGuiConstructor;

    interface TitleScreenGui extends ig.GuiElementBase {
      startGui: sc.CCExploreStartGui;
    }

    interface ChangelogGui extends ig.GuiElementBase {
      clearLogs(): void;
    }
    interface ChangelogGuiConstructor extends ImpactClass<ChangelogGui> {
      new (): ChangelogGui;
    }
    let ChangelogGui: ChangelogGuiConstructor;

    interface TitleScreenButtonGui extends ig.GuiElementBase {
      namedButtons: { [name: string]: sc.ButtonGui };
      changelogGui: sc.ChangelogGui;
      buttonInteract: ig.ButtonInteractEntry;
    }
  }
}
