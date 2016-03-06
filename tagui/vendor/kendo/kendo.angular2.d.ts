// kendo.angular2.d.ts
declare module "kendo/angular2" {
    class KendoValueAccessor {
        private elementRef;
        private cd;
        onChange: (_: any) => void;
        onTouched: () => void;
        element: any;
        constructor(cd, elementRef);
        writeValue(value: any): void;
        registerOnChange(fn: (_: any) => {}): void;
        registerOnTouched(fn: () => {}): void;
    }
}