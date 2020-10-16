(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(14),c=t.n(o),u=t(4),l=t(2),i=function(e){var n=e.filter,t=e.handleFilterChange;return r.a.createElement("form",null,r.a.createElement("div",null,"filter shown with "," ",r.a.createElement("input",{value:n,onChange:t})))},m=function(e){var n=e.addName,t=e.newName,a=e.newNumber,o=e.handleNameChange,c=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:t,onChange:o})),r.a.createElement("div",null,"number:",r.a.createElement("input",{value:a,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},s=function(e){var n=e.persons,t=e.filter,a=e.deleteEntry,o=e.setPersons,c=e.people,u=t?n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})):n;return r.a.createElement("ul",null,u.map((function(e){return r.a.createElement("li",{key:e.name,className:"people"},e.name," "," ",e.number," "," ",r.a.createElement("input",{type:"button",onClick:function(){return a(e,o,c)},value:"delete"}))})))},d=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"error"},n)},f=t(3),h=t.n(f),p="/api/persons",b={getAll:function(){return h.a.get(p).then((function(e){return e.data}))},create:function(e){return h.a.post(p,e).then((function(e){return e.data}))},updateNumber:function(e,n){var t=h.a.put("".concat(p,"/").concat(e),n);return console.log("url ".concat(p,"/").concat(e," updated entry ").concat(n.name)),t.then((function(e){return e.data}))},deleteEntry:function(e,n,t){return window.confirm("Delete? ".concat(e.name))&&h.a.delete("".concat(p,"/").concat(e.id)).then((function(){n(t.filter((function(n){return n.id!==e.id})))})),null}},E=(t(37),function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),f=Object(l.a)(c,2),h=f[0],p=f[1],E=Object(a.useState)(""),v=Object(l.a)(E,2),g=v[0],w=v[1],N=Object(a.useState)(""),j=Object(l.a)(N,2),O=j[0],C=j[1],y=Object(a.useState)(null),k=Object(l.a)(y,2),S=k[0],A=k[1];Object(a.useEffect)((function(){b.getAll().then((function(e){o(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(d,{message:S}),r.a.createElement(i,{filter:O,handleFilterChange:function(e){return C(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(m,{addName:function(e){if(e.preventDefault(),t.some((function(e){return e.name===h}))){if(window.confirm("".concat(h," is already added to phonebook, replace the old number with the new one?"))){var n=t.find((function(e){return e.name===h})),a=Object(u.a)(Object(u.a)({},n),{},{number:g});b.updateNumber(n.id,a).then((function(e){o((function(){return t.map((function(t){return t.id!==n.id?t:e}))})),A("Updated ".concat(h)),setTimeout((function(){A(null)}),5e3)})).catch((function(e){console.log(e.response.data),A(e.response.data.error),setTimeout((function(){A(null)}),5e3)}))}}else b.create({name:h,number:g}).then((function(e){o(t.concat(e)),A("Added ".concat(h)),setTimeout((function(){A(null)}),1500),p(""),w(""),C("")})).catch((function(e){A(e.response.data.error),setTimeout((function(){A(null)}),5e3)}))},newName:h,newNumber:g,handleNameChange:function(e){return p(e.target.value)},handleNumberChange:function(e){return w(e.target.value)}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(s,{persons:t,filter:O,deleteEntry:b.deleteEntry,setPersons:o,people:t}))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[15,1,2]]]);
//# sourceMappingURL=main.96eca7eb.chunk.js.map