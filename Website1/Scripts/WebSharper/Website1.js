(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Seq,Operators,d3,Website1,MainScreen,Html,Default,List,Operators1,Circles,Client,Remoting,EventsPervasives,Concurrency,T;
 Runtime.Define(Global,{
  Website1:{
   Circles:{
    Data:Runtime.Field(function()
    {
     return Seq.toArray(Operators.step(10,10,30));
    }),
    Join:function(data,context)
    {
     d3.select(context).append("svg").attr("height",300).selectAll("circle").data(data).enter().append("circle").attr("cx",function(x)
     {
      return x*5;
     }).attr("cy",function(x)
     {
      return 50+x*x/40;
     }).attr("r",5).attr("fill","red").attr("cursor","pointer").on("click",function()
     {
      MainScreen.Label().set_Text("click!!!!");
      return this.setAttribute("fill","blue");
     });
    }
   },
   Client:{
    Main:function()
    {
     var x,x1,arg00;
     x=MainScreen.D3Div();
     Operators1.OnAfterRender(function(element)
     {
      return Circles.Join(Circles.Data(),element.Body);
     },x);
     x1=x;
     arg00=function()
     {
      return function(e)
      {
       return Client.Start(MainScreen.Input().get_Value(),function()
       {
        return MainScreen.Label().set_Text(Remoting.Call("Website1:0",[e.X,e.Y]));
       });
      };
     };
     EventsPervasives.Events().OnClick(arg00,x1);
     return Default.Div(List.ofArray([x1,MainScreen.Input(),MainScreen.Label(),Default.Button(List.ofArray([Default.Text("Click")]))]));
    },
    Start:function(input,k)
    {
     return Concurrency.Start(Concurrency.Delay(function()
     {
      return Concurrency.Bind(Remoting.Async("Website1:1",[input]),function(arg101)
      {
       return Concurrency.Return(k(arg101));
      });
     }));
    }
   },
   Controls:{
    EntryPoint:Runtime.Class({
     get_Body:function()
     {
      return Client.Main();
     }
    })
   },
   MainScreen:{
    D3Div:Runtime.Field(function()
    {
     return Default.Div(Runtime.New(T,{
      $:0
     }));
    }),
    Input:Runtime.Field(function()
    {
     return Default.Input(List.ofArray([Default.Text("")]));
    }),
    Label:Runtime.Field(function()
    {
     return Default.Div(List.ofArray([Default.Text("")]));
    })
   },
   Server:{
    greetMe:function()
    {
     return"hi";
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Seq=Runtime.Safe(WebSharper.Seq);
  Operators=Runtime.Safe(WebSharper.Operators);
  d3=Runtime.Safe(Global.d3);
  Website1=Runtime.Safe(Global.Website1);
  MainScreen=Runtime.Safe(Website1.MainScreen);
  Html=Runtime.Safe(WebSharper.Html);
  Default=Runtime.Safe(Html.Default);
  List=Runtime.Safe(WebSharper.List);
  Operators1=Runtime.Safe(Html.Operators);
  Circles=Runtime.Safe(Website1.Circles);
  Client=Runtime.Safe(Website1.Client);
  Remoting=Runtime.Safe(WebSharper.Remoting);
  EventsPervasives=Runtime.Safe(Html.EventsPervasives);
  Concurrency=Runtime.Safe(WebSharper.Concurrency);
  return T=Runtime.Safe(List.T);
 });
 Runtime.OnLoad(function()
 {
  MainScreen.Label();
  MainScreen.Input();
  MainScreen.D3Div();
  Circles.Data();
  return;
 });
}());
