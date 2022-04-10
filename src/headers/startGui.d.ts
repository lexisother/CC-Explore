export {};

declare global {
  namespace sc {
    interface PlaygroundStartGui extends ig.GuiElementBase {
      transitions: { [name: string]: ig.GuiHook.Transition };
      gfx: ig.Image;
      timer: ig.WeightTimer;

      show(): void;
      hide(): void;
    }
    interface PlaygroundStartGuiConstructor extends ImpactClass<PlaygroundStartGui> {
      new (): PlaygroundStartGui;
    }
    var PlaygroundStartGui: PlaygroundStartGuiConstructor;

    interface TitleScreenGui extends ig.GuiElementBase {
      startGui: sc.PlaygroundStartGui;
    }

    interface ChangelogGui extends ig.GuiElementBase {
      clearLogs(): void;
    }
    interface ChangelogGuiConstructor extends ImpactClass<ChangelogGui> {
      new (): ChangelogGui;
    }
    var ChangelogGui: ChangelogGuiConstructor;

    interface TitleScreenButtonGui extends ig.GuiElementBase {
      namedButtons: { [name: string]: sc.ButtonGui };
      changelogGui: sc.ChangelogGui;
      buttonInteract: ig.ButtonInteractEntry;
    }
  }
}
