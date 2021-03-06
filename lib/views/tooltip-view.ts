import * as spacePen from "atom-space-pen-views";
const $ = spacePen.jQuery;

interface Rect {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export class TooltipView extends spacePen.View {

    public static content() {
        return this.div({ class: "atom-typescript-tooltip tooltip" }, () => {
            this.div({ class: "tooltip-inner", outlet: "inner" });
        });
    }

    constructor(public rect: Rect) {
        super();
        $(document.body).append(this[0]);
        this.updatePosition();
    }

    private inner: JQuery;

    public updateText(text: string) {
        this.inner.html(text);
        this.inner.css({ "white-space": "pre", "text-align": "left" });
        this.updatePosition();
        (<any>this).fadeTo(300, 1);
    }

    public updatePosition() {
        const offset = 10;
        let left = this.rect.right;
        let top = this.rect.bottom;
        let right: number = undefined;

        // X axis adjust
        if (left + this[0].offsetWidth >= $(document.body).width())
            left = $(document.body).width() - this[0].offsetWidth - offset;
        if (left < 0) {
            this.css({ "white-space": "pre-wrap" });
            left = offset;
            right = offset;
        }

        // Y axis adjust
        if (top + this[0].offsetHeight >= $(document.body).height()) {
            top = this.rect.top - this[0].offsetHeight;
        }

        this.css({ left, top, right });
    }
}
