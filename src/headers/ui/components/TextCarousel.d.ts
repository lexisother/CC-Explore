export {};

declare global {
  namespace sc {
    interface TextCarousel extends ig.GuiElementBase {
      left: ButtonGui;
      right: ButtonGui;
      text: TextGui[];
      activeText: TextGui;
      index: number;
      cyclic: boolean;
      onChange: (index: number) => void;

      show(this: this): void;
      hide(this: this): void;
      updateCurrentPageName(this: this): void;
      updateStatusPage(this: this, delta: number): void;
      onLeftPressCheck(): boolean;
      onRightPressCheck(): boolean;
    }
    interface TextCarouselConstructor extends ImpactClass<TextCarousel> {
      new (labelPath: string, labels: string[], width?: number): TextCarousel;
    }
    let TextCarousel: TextCarouselConstructor;
  }
}
