export {}

declare global {
    namespace sc {
        interface NewGameModeDialogButton extends ig.FocusGui {
            data: number;
        }
        interface NewGameModeDialogButtonConstructor extends ImpactClass<NewGameModeDialogButton> {
            new (title: string, data: number): NewGameModeDialogButton
        }
        let NewGameModeDialogButton: NewGameModeDialogButtonConstructor;
        
        interface NewGameModeSelectDialog extends ig.GuiElementBase {
            explore: sc.NewGameModeDialogButton;
            content: ig.GuiElementBase;
            info: sc.TextGui;
            msgBox: sc.CenterBoxGui;
            buttongroup: ig.ButtonGroup & {
                addSelectionCallback(callback: ig.ButtonGroup.SelectionCallback): void;
            };

            callback: (data: {data: number}, _this: NewGameModeSelectDialog) => void;
        }
        interface NewGameModeSelectDialogConstructor extends ImpactClass<NewGameModeSelectDialog> {
            new (callback: (data: {data: number}, _this: NewGameModeSelectDialog) => void): NewGameModeSelectDialog;
        }
        let NewGameModeSelectDialog: NewGameModeSelectDialogConstructor;
    }
}