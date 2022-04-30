export { };

declare global {
  namespace sc {
    interface TextCarousel extends ig.GuiElementBase {
      left: ButtonGui;
      right: ButtonGui;
      text: TextGui[];
      activeText: TextGui;
      index: number;
      cyclic: boolean;
      padding: number;
      onChange: (index: number) => void;

      show(this: this): void;
      hide(this: this): void;
      updateCurrentPageName(this: this, delta: number): void;
      updateStatusPage(this: this, delta: number): void;
      onLeftPressCheck(this: this): boolean;
      onRightPressCheck(this: this): boolean;
    }
    interface TextCarouselConstructor extends ImpactClass<TextCarousel> {
      new(labelPath: string, labels: string[], width?: number): TextCarousel;
    }
    let TextCarousel: TextCarouselConstructor;

    namespace ButtonGui {
      interface Type {
        alignXPadding?: number;
        height: number;
        ninepatch: ig.NinePatch;
        highlight: Highlight;
      }

      interface Highlight {
        startX: number;
        endX: number;
        leftWidth: number;
        rightWidth: number;
        offsetY: number;
        gfx: ig.Image;
        pattern: ig.ImagePattern;
      }
    }
  }

  namespace ig {
    interface FocusGui {
      keepMouseFocus: boolean
    }
  }
}
