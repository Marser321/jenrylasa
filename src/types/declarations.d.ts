import React from "react";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace React.JSX {
        interface IntrinsicElements {
            'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                src?: string;
                'ios-src'?: string;
                poster?: string;
                alt?: string;
                'shadow-intensity'?: string;
                'camera-controls'?: boolean;
                'auto-rotate'?: boolean;
                ar?: boolean;
                'ar-modes'?: string;
                'ar-scale'?: string;
                'camera-orbit'?: string;
                style?: React.CSSProperties;
            }, HTMLElement>;
        }
    }
}

export { };
