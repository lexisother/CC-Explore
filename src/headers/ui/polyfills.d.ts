export {};

declare global {
  namespace ig {
    interface ButtonInteractEntry {
      removeButtonGroup(this: this, buttonGroup: ig.ButtonGroup): void;
    }
  }
  namespace sc {
    interface LineGui extends ig.BoxGui {}
    interface LineGuiConstructor extends ImpactClass<LineGui> {
      new (width: number): LineGui;
    }
    let LineGui: LineGuiConstructor;
  }
}
