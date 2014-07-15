declare module Website1 {
    module Skin {
        interface Page {
            Title: string;
            Body: __ABBREV.__List.T<any>;
        }
    }
    module Controls {
        interface EntryPoint {
            get_Body(): __ABBREV.__Html.IPagelet;
        }
    }
    module Client {
        var Start : {
            (input: string, k: {
                (x: string): void;
            }): void;
        };
        var Main : {
            (): __ABBREV.__Html.Element;
        };
    }
    module Circles {
        var Join : {
            (data: number[], context: __ABBREV.__Dom.Element): void;
        };
        var Data : {
            (): number[];
        };
    }
    module MainScreen {
        var D3Div : {
            (): __ABBREV.__Html.Element;
        };
        var Input : {
            (): __ABBREV.__Html.Element;
        };
        var Label : {
            (): __ABBREV.__Html.Element;
        };
    }
    module Server {
        var greetMe : {
            (): string;
        };
    }
    interface Action {
    }
    interface Website {
    }
}
declare module __ABBREV {
    
    export import __List = IntelliFactory.WebSharper.List;
    export import __Html = IntelliFactory.WebSharper.Html;
    export import __Dom = IntelliFactory.WebSharper.Dom;
}
