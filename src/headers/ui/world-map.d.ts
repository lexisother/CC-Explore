export {};

declare global {
  namespace sc {
    interface MapWorldMap extends ig.GuiElementBase {
      switcher: sc.TextCarousel;

      show(this: this): void;
    }
  }
}
