export {};

declare global {
  namespace ig {
    interface ButtonInteractEntry {
      removeButtonGroup(this: this, buttonGroup: ig.ButtonGroup): void;
    }

    interface FocusGui {
      keepMouseFocus: boolean;
    }
  }
  namespace sc {
    namespace ButtonGui {
      interface Type {
        height: number;
      }
    }

    interface LineGui extends ig.BoxGui {}
    interface LineGuiConstructor extends ImpactClass<LineGui> {
      new (width: number): LineGui;
    }
    let LineGui: LineGuiConstructor;
  }
}
