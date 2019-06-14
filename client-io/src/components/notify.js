import Noty from 'noty';
import "../../node_modules/noty/lib/noty.css";
import "../../node_modules/noty/lib/themes/sunset.css";

export const NotifyMe =(text)=>{
    new Noty({
        type: "error",
        text: text,
        layout: "topRight",
        theme: "sunset",
        timeout: 6000
    }).show();
}