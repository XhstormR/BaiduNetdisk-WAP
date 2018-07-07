/*
//第一种
document.body.oncontextmenu=()=>{};
document.body.onselectstart=()=>{};
document.body.onbeforecopy=()=>{};
document.body.oncopy=()=>{};
*/
//第二种
document.body.removeAttribute("oncontextmenu");
document.body.removeAttribute("onselectstart");
document.body.removeAttribute("onbeforecopy");
document.body.removeAttribute("oncopy");
var OLD = document.body;
var NEW = OLD.cloneNode(true);
OLD.parentNode.replaceChild(NEW, OLD);
