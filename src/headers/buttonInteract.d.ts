export {}

declare global {
    namespace ig {
        interface ButtonInteractEntry {
            removeButtonGroup(this: this, buttonGroup: ig.ButtonGroup): void;
        }
    }
}