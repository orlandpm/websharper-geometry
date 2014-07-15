namespace Website1

open System
open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.D3
open IntelliFactory.WebSharper.Html

module Server =
    [<Rpc>]
    let greetMeServer x y =
        sprintf "(%d, %d)" x y

    [<JavaScript>]
    let greetMe() = 
        "hi"

[<JavaScript>]
module MainScreen =
    let D3Div = Div []                  
    let Input = Input [Text ""]
    let Label = Div [Text ""]

[<JavaScript>]
module Circles =

    [<Inline "+$x">]
    let inline double (x: 'T) = double x

    /// Imagine some sample data (from 10 to 100 with a step of 10).
    /// This could be coming from anywhere, including server-side F#.
    let Data = [| 10.0 .. 10.0 .. 30.0 |]

    /// D3 operates in terms of "joins".
    /// Roughly, a join syncs a data collection to a DOM element collection, 1:1.
    /// Existing elements are updated with their matching data points.
    /// For data points without a matching element, new elements are created ("enter").
    /// Elements without a matching data points, typically are removed ("exit").
    let Join (data: double[]) (context: Dom.Element) =

        /// First, setup a context.
        let ctx =
            D3.Select(context) // select the element
                .Append("svg") // append a new <svg/> and focus on it
                .Attr("height", 300) // give a height to the <svg/>; width = auto

        /// Let us define the join.
        /// Select some elements (SVG circles) and the data set.
        /// Note that WebSharper types the result as `Selection<double>`
        /// since you gave a `double[]` - to help you with types later on.
        let joined = ctx.SelectAll("circle").Data(data)

        /// Now, "enter" selection describes what happens to elements that
        /// enter the theater stage so to speak, that is, how do we create
        /// elements for data points that do not have an element yet.
        /// Here we create circles and set some attributes, dependent on data.
        joined.Enter()
            .Append("circle")
            .AttrFn("cx", fun x -> x * 5.) // center x coord
            .AttrFn("cy", fun x -> 50. + x * x / 40.) // center y coord
            .Attr("r", 5)
            .Attr("fill", "red")
            .Attr("cursor", "pointer")
            .On("click", (fun elt _ _ -> 
                MainScreen.Label.Text <- "click!!!!"
                elt.SetAttribute("fill","blue") ))
        |> ignore

        /// If you look at D3.js examples, you will not
        /// find ".AttrFn" and ".AttrIx".
        /// In this WebSharper binding, these are all synonyms of ".Attr",
        /// but it is helpful to distinguish for better type inference.

[<JavaScript>]
module Client =

    let Start input k =
        async {
            let! data = Remoting.Process(input)
            return k data
        }
        |> Async.Start

    let Main () =
        Div [
            MainScreen.D3Div
                |>! OnAfterRender (fun element ->
                                            Circles.Join Circles.Data (element.Dom))
                |>! OnClick (fun _ e ->
                    Start MainScreen.Input.Value (fun out ->
                    MainScreen.Label.Text <- Server.greetMeServer e.X e.Y))
            MainScreen.Input
            MainScreen.Label
            Button [Text "Click"]

        ]
        