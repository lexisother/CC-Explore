export {}

declare global {
    namespace sc {
        interface LineGui extends ig.BoxGui {}
        interface LineGuiConstructor extends ImpactClass<LineGui> {
            new (width: number): LineGui;
        }
        let LineGui: LineGuiConstructor;
    }
}