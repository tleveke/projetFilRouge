(this.webpackJsonpfilrouge_projet=this.webpackJsonpfilrouge_projet||[]).push([[0],{121:function(e,t){},132:function(e,t,n){},156:function(e,t){},163:function(e,t,n){"use strict";n.r(t);var o=n(2),a=n(0),s=n.n(a),r=n(29),i=n.n(r),c=(n(98),n(6)),l=n(8),u=n(12),d=n(13),h=25,p=25,b=625,m=5,f=1,y=2,v="game_db",j="https",g="server.lamft-dev.tk",x=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).state={lobbies:[],db:null},o.initDB(),o}return Object(l.a)(n,[{key:"initDB",value:function(){if(window.indexedDB){var e=indexedDB.open(v);e.onerror=function(e){console.log("error: ",e)},e.onupgradeneeded=function(e){e.target.result.createObjectStore("matches",{keyPath:"matchID"}).createIndex("playerID","playerID",{unique:!1})},e.onsuccess=function(t){t.target.result.transaction(["matches"],"readwrite").oncomplete=function(t){console.log("All done!"),this.setState({db:e.result}),this.getLobbies()}.bind(this)}.bind(this)}}},{key:"getLobbies",value:function(){if(window.indexedDB&&null!==this.state.db){var e=[];this.state.db.transaction("matches").objectStore("matches").openCursor().onsuccess=function(t){var n=t.target.result;n?(e.push(n.value),n.continue()):(console.log("No more entries!"),this.setState({lobbies:e}))}.bind(this)}}},{key:"deleteLobby",value:function(e){window.indexedDB&&null!==this.state.db&&(this.state.db.transaction(["matches"],"readwrite").objectStore("matches").clear(),this.setState({lobbies:[]}))}},{key:"goGame",value:function(e){this.props.history.push("/client/".concat(e.matchID,"/").concat(e.credentials,"/").concat(e.playerID),{data:e})}},{key:"goCreateLobby",value:function(e){this.props.history.push("/create-lobby",{data:e})}},{key:"goJoinLobby",value:function(e){this.props.history.push("/join-lobby",{data:e})}},{key:"lobbyShow",value:function(e){var t=this;return Object(o.jsxs)("li",{onClick:function(){t.goGame(e)},className:"list-group list-group-item-action bg-danger",children:[" ",e.nameLobby," "]},e.matchID)}},{key:"render",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.lobbies;return console.log(t),Object(o.jsxs)("div",{className:"text-center col-lg-5 mx-auto",children:[Object(o.jsx)("img",{width:"300",className:"mt-3",src:"img/logo-fil-rouge.png",alt:""}),Object(o.jsxs)("div",{children:[Object(o.jsx)("button",{onClick:function(){e.goCreateLobby()},className:"btn btn-success mt-3",children:" Cr\xe9er un lobby "})," "]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("button",{onClick:function(){e.goJoinLobby()},className:"btn btn-primary mt-3",children:" Rejoindre un lobby "})," "]})," ",Object(o.jsx)("p",{className:"bg-secondary text-left mt-3",children:" Rejoignez vos lobbys: "}),"   ",Object(o.jsx)("ul",{className:"list-group mt-1",children:t.map((function(t){return e.lobbyShow(t)}))}),Object(o.jsxs)("div",{children:[Object(o.jsx)("button",{onClick:function(){e.deleteLobby()},className:"btn btn-success mt-3",children:" Supprimer vos lobbys en cours "})," "]})," "]})}}]),n}(a.Component),O=n(3),w=function(){function e(t,n){Object(c.a)(this,e),this.x=null,this.y=null,this.type="",this.value="",this.player="",this.player=null,this.x=t,this.y=n,this.setVideCell()}return Object(l.a)(e,[{key:"setVideCell",value:function(){this.type="vide",this.value="",this.player=!1,this.object=!1}},{key:"setPlayer",value:function(e){this.type="player",this.value="",this.player=e,this.object=!1}},{key:"setOpponent",value:function(){this.type="opponent",this.value="",this.player=!1,this.object=!1}},{key:"setMoveCell",value:function(){this.type="move",this.value="",this.player=!1,this.object=!1}},{key:"setBlockCell",value:function(){this.type="block",this.value="",this.player=!1,this.object=!1}},{key:"setObjectCell",value:function(e){this.type="object",this.value="",this.player=!1,this.object=e}}]),e}(),k=function(){function e(t,n){Object(c.a)(this,e),this.name=null,this.image=null,this.etat=null,this.name=t,this.image=n}return Object(l.a)(e,[{key:"setEtat",value:function(e){this.etat=e}},{key:"removeEtat",value:function(){this.etat=null}}]),e}(),C=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e,o,a,s){var r;return Object(c.a)(this,n),(r=t.call(this,e,s)).power=null,r.speed=null,r.durability=null,r.durability=3,r.power=o,r.speed=a,r}return Object(l.a)(n,[{key:"looseDurability",value:function(){return this.durability--,this.durability}}]),n}(k),L=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e,o,a,s){var r;return Object(c.a)(this,n),(r=t.call(this,e,s)).armor=null,r.speed=null,r.armor=o,r.speed=a,r}return n}(k),P=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e,o,a){var s;return Object(c.a)(this,n),(s=t.call(this,e,a)).vie=null,s.vie=o,s}return n}(k),D=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e,o){return Object(c.a)(this,n),t.call(this,e,o)}return n}(k),I=n(61),N=function(){function e(t,n,o){Object(c.a)(this,e),this.position=null,this.name=null,this.life=null,this.power=null,this.speed=null,this.classCss=null,this.numero=null,this.etat=null,this.weapon=null,this.armor=null,this.position=t,this.name=n,this.numero=o,this.life=m,this.power=f,this.speed=y,this.classCss="player".concat(o),this.setThreathless()}return Object(l.a)(e,[{key:"setPosition",value:function(e){this.position=e}},{key:"setPower",value:function(e){this.power=e}},{key:"setSpeed",value:function(e){this.speed=e}},{key:"setLife",value:function(e){this.life=e}},{key:"setEtat",value:function(e){this.etat=e}},{key:"setThreathless",value:function(){this.etat="threathless"}},{key:"setDeadPlayer",value:function(){this.position=null,this.power=null,this.etat="dead"}},{key:"setParameters",value:function(e){this.position=e.position,this.name=e.name,this.numero=e.numero,this.life=e.life,this.power=e.power,this.speed=e.speed,this.classCss=e.classCss,this.etat=e.etat}},{key:"gainWeapon",value:function(e){console.log("J'ai obtenu un arme",e),this.weapon=e}},{key:"gainArmor",value:function(e){console.log("J'ai obtenu une armure",e),this.armor=e}},{key:"gainLife",value:function(e){console.log("J'ai obtenu de la vie",e),this.life=this.life+e.vie}},{key:"looseWeaponDurability",value:function(){0===this.weapon.looseDurability()&&(this.weapon=null)}},{key:"loosePV",value:function(e){var t=0;null!=this.armor?(this.armor.armor-=e,this.armor.armor<=0&&(t=-1*this.armor.armor,this.armor=null)):t=e,this.life-=t}}]),e}(),S=n(99),E=n(100),B=n(54),_={};I.layers.forEach((function(e){"Calque de Tuiles 2"===e.name&&(_=e)}));var T=[0,1,71,72,711,854,782,781,853,860,1214,1223,1224,1153,1152,1074,1145,1068].map((function(e){return e+1325}));function J(e,t,n,o,a){S("https://server.lamft-dev.tk/sendpush/".concat(e,"_player").concat(t,"/").concat(n,"/").concat(o,"/").concat(a)).then((function(e){return e})).then((function(e){console.log(e)}))}function V(){var e=h*p;return Math.floor(Math.random()*(e-0))+0}function M(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o=n.length,a=0;a<e;a++)t+=n.charAt(Math.floor(Math.random()*o));return t}var A={name:"Jeu_Fil_Rouge",minPlayers:2,maxPlayers:5,setup:function(e,t){console.log(t,"setupData","setupData"),console.log(e,"ctx","ctx");var n={cells:[],PlayersPositions:[]};n.nameLobby=M(15);for(var o=0;o<p;o++)for(var a=0;a<h;a++){var s=new w(o,a);n.cells.push(s)}return e.playOrder.forEach((function(e){for(var t=!0;t;){var o=V();if(!n.PlayersPositions.includes(o)&&!T.includes(_.data[o])){t=!1;var a=M(5),s=new N(o,a,e);n.cells[o].setPlayer(s),n.PlayersPositions[e]=s}}})),n=function(e){return e.weapons=[new C("Ep\xe9e",2,0,"weapon_knight_sword"),new C("Ep\xe9e longue",4,-1,"weapon_golden_sword"),new C("Dague",1,1,"weapon_knife"),new C("Spectre de Mage",1,1,"weapon_red_magic_staff")],e.armors=[new L("Bottes",0,1,"armor_boots"),new L("Cotes de mailles",1,0,"armor_chainmail"),new L("Armure en Acier",3,-1,"armor_steel"),new L("Armure en Beskar",6,0,"")],e.lifes=[new P("Un coeur",1,"life_1heart"),new P("Deux Coeurs",2,"life_2heart"),new P("Trois Coeurs",3,"life_3heart"),new P("5 coeurs",5,"life_5heart")],e.others=[new D("Barque",""),new D("Bombes","")],e}(n)},phases:{movePlayer:{moves:{moveorAttackPlayer:function(e,t,n){console.log(n,t);var o=e.PlayersPositions[t.currentPlayer];try{for(var a=0;a<e.cells.length;a++)e.cells[a].player===o&&e.cells[a].setVideCell();o.setPosition(n),e.cells[n].setPlayer(o),e.PlayersPositions[t.currentPlayer]=o}catch(s){console.log("pas possible")}},attackPlayer:function(e,t,n){try{var o=e.cells[n].player,a=e.PlayersPositions[t.currentPlayer],s=a.power;null!=a.weapon&&(s+=a.weapon.power,a.looseWeaponDurability()),console.log(a),J(e.nameLobby,o.numero,"Perte de PV","losePV","Vous avez perdu un coeur."),e.cells[n].player.loosePV(s),e.cells[n].player.life<=0&&J(e.nameLobby,e.cells[n].player.numero,"D\xe9faite","loser","Vous avez perdu cette partie, vous \xeates mort.")}catch(r){console.log("pas possible")}},passTurn:function(e,t,n){t.events.endTurn()},getObject:function(e,t,n){try{var o=e.cells[n].object,a=e.PlayersPositions[t.currentPlayer];console.log("Je recupere",o),void 0!==o.power?a.gainWeapon(o):void 0!==o.armor?a.gainArmor(o):void 0!==o.vie&&(console.log("Je recupere de la vie",o),a.gainLife(o));for(var s=0;s<e.cells.length;s++)e.cells[s].player===a&&e.cells[s].setVideCell();a.setPosition(n),e.cells[n].setPlayer(a),e.PlayersPositions[t.currentPlayer]=a}catch(r){console.log("pas possible")}}},turn:{moveLimit:1,order:O.k.DEFAULT,onBegin:function(e,t){var n=e.PlayersPositions[t.currentPlayer];if("dead"===n.etat)t.events.pass();else{new Date;var o=B().add(24,"h").toDate(),a=B().add(23,"h").toDate(),s=B().add(1,"h").toDate(),r=(B().add(15,"s").toDate(),e.nameLobby),i=t.currentPlayer;J((e=function(e){var t=Math.floor(101*Math.random())+0,n=[];if(e.PlayersPositions.forEach((function(e){"dead"!==e.etat&&n.push(e)})),console.log(t,"proba",100-100/n.length),t>=100-100/n.length){var o=Math.floor(3*Math.random())+1,a=Math.floor(3*Math.random())+0,s=null;1===o&&(s=e.weapons[a]),2===o&&(s=e.armors[a]),3===o&&(s=e.lifes[a]),console.log(s,"object");for(var r=!0;r;){var i=V();e.PlayersPositions.includes(i)||T.includes(_.data[i])||(r=!1,e.cells[i].setObjectCell(s))}console.log(e.cells),console.log("dsdsdsdssds",e)}return e}(e)).nameLobby,t.currentPlayer,"Votre tour","yourturn","C'est le moment de jouer, IKE !!!!!!");var c=function(e,t){var n=e.position,o=e.speed;null!==e.armor&&(o+=e.armor.speed),null!==e.weapon&&(o+=e.weapon.speed),o<1&&(o=1);for(var a=h,s=t.cells[n],r=[],i=[],c=1;c<=o;c++)r.push("".concat(s.x*a+s.y-c)),r.push("".concat(s.x*a+s.y+c)),r.push("".concat((s.x-c)*a+s.y)),r.push("".concat((s.x+c)*a+s.y)),2===c?(r.push("".concat((s.x-1)*a+s.y+1)),r.push("".concat((s.x+1)*a+s.y-1)),r.push("".concat((s.x+1)*a+s.y+1)),r.push("".concat((s.x-1)*a+s.y-1))):3===c&&(r.push("".concat((s.x-1)*a+s.y+2)),r.push("".concat((s.x+1)*a+s.y-2)),r.push("".concat((s.x+1)*a+s.y+2)),r.push("".concat((s.x-1)*a+s.y-2)),r.push("".concat((s.x-2)*a+s.y+1)),r.push("".concat((s.x+2)*a+s.y-1)),r.push("".concat((s.x+2)*a+s.y+1)),r.push("".concat((s.x-2)*a+s.y-1)));return r.forEach((function(e){var t=parseInt(e);t>=0&&t<b&&!e.includes("-")&&i.push(t)})),i}(n,e);c.forEach((function(t){void 0===e.cells[t]||"vide"!==e.cells[t].type||T.includes(_.data[t])?T.includes(_.data[t])?e.cells[t].setBlockCell():void 0!==e.cells[t]&&"player"===e.cells[t].type?e.cells[t].player.setEtat("threatfull"):void 0!==e.cells[t]&&"object"===e.cells[t].type&&e.cells[t].object.setEtat("get"):e.cells[t].setMoveCell()})),function(e,t,n){e.forEach((function(e){var o=n.cells[e],a=n.cells[e+1],s=n.cells[e-1],r=n.cells[e+10],i=n.cells[e-10];"block"===o.type&&(void 0!==i&&"move"===i.type&&t.position===e+10&&n.cells[e-10].setBlockCell(),void 0!==r&&"move"===r.type&&t.position===e-10&&n.cells[e+10].setBlockCell(),void 0!==s&&"move"===s.type&&t.position===e+1&&n.cells[e-1].setBlockCell(),void 0!==a&&"move"===a.type&&t.position===e-1&&n.cells[e+1].setBlockCell())}))}(c,n,e),e.JobPass=E.scheduleJob(o,(function(){t.events.endTurn(),J(r,i,"Votre tour est pass\xe9","timeout","Vous avez pass\xe9 votre tour \xe0 cause de votre inactivit\xe9")})),e.Job23Hours=E.scheduleJob(a,(function(){J(r,i,"Encore 1 heure !","timeout","Vous avez encore 1 heures pour jouer !, sinon vous passerez votre tour")})),e.Job1Hours=E.scheduleJob(s,(function(){J(r,i,"Encore 23 heures !","timeout","Vous avez encore 23 heures pour jouer !, sinon vous passerez votre tour")}))}},onEnd:function(e,t){console.log("Gaaaaaa",e,"G"),e.JobPass.cancel(),e.Job23Hours.cancel(),e.Job1Hours.cancel(),e.cells=e.cells.map((function(t){return"move"!==t.type&&"block"!==t.type||t.setVideCell(),"player"===t.type&&(t.player.setThreathless(),t.player.life<=0&&e.PlayersPositions.forEach((function(n){t.player.classCss===n.classCss&&(t.setVideCell(),e.PlayersPositions[e.PlayersPositions.indexOf(n)].setDeadPlayer())}))),"object"===t.type&&t.object.removeEtat(),t}))}},start:!0},attackPlayer:{turn:{moveLimit:1,order:O.k.DEFAULT,onBegin:function(e,t){e.cells.forEach((function(e){"player"!==e.type&&e.setVideCell()}))},onEnd:function(e,t){}},moves:{}}},turn:{},endIf:function(e,t){var n=function(e){var t=[];return e.PlayersPositions.forEach((function(e){"dead"!==e.etat&&t.push(e)})),1===t.length?{victory:!0,player:t[0]}:{victory:!1}}(e);if(n.victory)return J(e.nameLobby,n.player.numero,"Victoire !","victory","F\xe9licitation ! Vous \xeates parvenus a vaincre vos adversaires "),function(e){S("https://server.lamft-dev.tk/endGame/".concat(e.nameLobby)).then((function(e){return e})).then((function(e){console.log(e)}))}(e),{winner:n.player}},ai:{}},H=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).createLobby=function(e){e.preventDefault();var t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({numPlayers:a.state.number,setupData:{nameGame:a.state.name}})};fetch("".concat(j,"://").concat(g,"/games/Jeu_Fil_Rouge/create"),t).then((function(e){return e.json()})).then((function(e){return a.setState({name:e.matchID})}))},a.saveNameHandler=function(e){a.setState({name:e.target.value})},a.saveNumberHandler=function(e){a.setState({number:e.target.value})},a.handleNumberChange=function(e){a.setState({number:e.target.value})},a.createSelect=function(){for(var e=[],t=A.minPlayers;t<=A.maxPlayers;t++)e.push(Object(o.jsx)("option",{value:t,children:t},t));return e},a.state={name:"",number:""},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(o.jsxs)("div",{className:"text-center col-lg-5 mx-auto",children:[Object(o.jsx)("img",{width:"100%",className:"mt-3",src:"img/logo-fil-rouge.png",alt:""}),Object(o.jsx)("h2",{className:"text-center",children:"Cr\xe9er un Lobby"}),Object(o.jsxs)("form",{className:"form-signup col-10 mx-auto",children:[Object(o.jsxs)("div",{className:"form-group",children:[Object(o.jsx)("label",{children:"Lobby"}),Object(o.jsx)("input",{type:"text",name:"lobby",className:"form-control",placeholder:"N\xb0 du Lobby",value:this.state.name,onChange:this.saveNameHandler})]}),Object(o.jsxs)("div",{className:"form-group",children:[Object(o.jsx)("label",{children:"Nombre de joueurs"}),Object(o.jsx)("select",{className:"form-control",value:this.state.number,onChange:this.handleNumberChange,children:this.createSelect()})]}),Object(o.jsx)("button",{type:"submit",className:"btn btn-success btn-block",onClick:this.createLobby,children:"Cr\xe9er un Lobby"})]})]})}}]),n}(a.Component),z=n(48),W=n(15),G=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).storeGame=function(e){if(window.indexedDB){var t,n={matchID:e.idGame,playerID:e.playerID,credentials:e.playerCredentials,nameLobby:e.nameLobby},o=indexedDB.open(v,1);console.log(o),o.onupgradeneeded=function(e){var o=(t=e.target.result).createObjectStore("matches",{keyPath:"matchID"});o.createIndex("playerID","playerID",{unique:!1}),o.transaction.oncomplete=function(e){t.transaction("matches","readwrite").objectStore("matches").add(n)}},o.onsuccess=function(e){var o=(t=e.target.result).transaction(["matches"],"readwrite");o.oncomplete=function(e){console.log("All done!")},o.objectStore("matches").add(n).onsuccess=function(e){},console.log(t)}}else console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")},o.joinLobby=function(e){e.preventDefault();var t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerID:o.state.playerID,playerName:o.state.name})};console.log(navigator.onLine,"navigator.onLine"),navigator.onLine?fetch("".concat(j,"://").concat(g,"/games/Jeu_Fil_Rouge/").concat(o.state.number,"/join"),t).then((function(e){return 200===e.status?e.json():404===e.status?{error:!0,name:"Lobby inexistant !"}:{error:!0,name:"Lobby complet !"}})).then((function(e){if(e.error)o.setState({error:e});else{var t={playerCredentials:e.playerCredentials,idGame:o.state.number,playerID:o.state.playerID,playerName:o.state.name,nameLobby:o.state.nameLobby};o.storeGame(t),o.props.history.push("/client/".concat(o.state.number,"/").concat(e.playerCredentials,"/").concat(o.state.playerID),{data:t})}})).catch(function(e){this.setState({error:{error:!0,name:"Pas de connexion \xe0 internet !"}})}.bind(Object(z.a)(o))):o.setState({error:{error:!0,name:"Pas de connexion \xe0 internet !"}})},o.saveNameHandler=function(e){o.setState({name:e.target.value})},o.saveNumberHandler=function(e){o.setState({number:e.target.value})},o.state={name:"",number:"",playerID:"",credentials:"",error:"",nameLobby:"",lobbies:[]},o}return Object(l.a)(n,[{key:"lobbyShow",value:function(e){var t=this,n=e.matchID;return e.setupData.nameGame&&(n=e.setupData.nameGame),Object(o.jsx)("li",{className:"list-group list-group-item-action bg-danger",children:Object(o.jsx)("button",{onClick:function(){var o;return t.setState({nameLobby:n,number:e.matchID,playerID:null===(o=e.players.filter((function(e){return null==e.name}))[0])||void 0===o?void 0:o.id})},children:n})},e.matchID)}},{key:"errorShow",value:function(e){var t;return e.error&&(t=Object(o.jsxs)("p",{children:["Erreur pour rejoindre un lobby : ",e.name]})),t}},{key:"componentDidMount",value:function(){var e=this;navigator.onLine&&fetch("".concat(j,"://").concat(g,"/games/Jeu_Fil_Rouge")).then((function(e){return e.json()})).then((function(t){var n;e.setState({lobbies:t.matches}),console.log(null===(n=e.state.lobbies[0])||void 0===n?void 0:n.players.filter((function(e){return null==e.name})))}))}},{key:"render",value:function(){var e=this;return Object(o.jsxs)("div",{className:"text-center col-lg-5 mx-auto",children:[Object(o.jsx)("img",{width:"100%",className:"mt-3",src:"img/logo-fil-rouge.png",alt:""}),Object(o.jsx)("h2",{className:"text-center",children:"Rejoindre un lobby :"}),Object(o.jsxs)("form",{className:"form-signup col-10 mx-auto",children:[Object(o.jsxs)("div",{className:"form-group",children:[Object(o.jsx)("label",{children:"Pseudo"}),Object(o.jsx)("input",{type:"text",name:"name",className:"form-control",placeholder:"Veuillez saisir un pseudo",value:this.state.name,onChange:this.saveNameHandler})]}),Object(o.jsxs)("div",{className:"form-group",children:[Object(o.jsx)("label",{children:"Lobby"}),Object(o.jsx)("input",{type:"text",name:"number",className:"form-control",placeholder:"Veuillez saisir le code du Lobby",value:this.state.number,onChange:this.saveNumberHandler})]}),Object(o.jsx)("button",{className:"btn btn-success btn-block",onClick:this.joinLobby,children:"Rejoindre le Lobby"})]}),Object(o.jsx)("div",{className:"bg-secondary mt-3",children:Object(o.jsx)("p",{className:"text-left pl-3",children:"Lobbys disponibles :"})}),Object(o.jsx)("ul",{className:"list-group mt-1",children:this.state.lobbies.map((function(t){return e.lobbyShow(t)}))}),this.errorShow(this.state.error)]})}}]),n}(a.Component),F=Object(W.h)(G),R=n(35),U=n(10),q=n(5),Q=n.n(q),Y=n(9),K=(n(132),n(167)),X=n(168),Z=n(169),$=n(170),ee=n(171),te=n(172),ne=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"urlBase64ToUint8Array",value:function(e){for(var t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=window.atob(t),o=new Uint8Array(n.length),a=0;a<n.length;++a)o[a]=n.charCodeAt(a);return o}},{key:"showNotification",value:function(){new Notification("Vous pouvez jouer !",{body:"C'est \xe0 votre tour, vous pouvez jouer votre tour !",icon:"img/attack_notification.svg",badge:"img/logo-fil-rouge.png"}).addEventListener("click",(function(e){window.open("/game","_blank")}))}},{key:"setWeaponInfo",value:function(e,t){for(var n=0;n<t.power;n++){var o=document.createElement("img");o.classList.add("powerImg"),o.src="/img/power.png",e.appendChild(o)}if(t.weapon)for(var a=t.weapon.power,s=0;s<a;s++){var r=document.createElement("img");r.classList.add("powerImg"),r.src="/img/power.png",e.appendChild(r)}return e}},{key:"setArmorInfo",value:function(e,t){if(t.armor)for(var n=t.armor,o=0;o<n.armor;o++){var a=document.createElement("img");a.src="/img/armor.png",e.appendChild(a)}return e}},{key:"registration",value:function(){var e=Object(Y.a)(Q.a.mark((function e(){var t,n,o,a;return Q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("granted"!==Notification.permission){e.next=11;break}return e.next=3,navigator.serviceWorker.ready;case 3:return t=e.sent,e.next=6,t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:this.urlBase64ToUint8Array("BItfWGr9-A8X6Jaoy6AHkRyrs4UPEg1Om2cu8iOeaihiF0zVVNbJsYPOViovgSXYP-5t4hf9n84IJQ7_u1yFZLQ")});case 6:return n=e.sent,o="".concat(this.props.G.nameLobby,"_player").concat(this.props.playerID),a={subscription:n,name:o,matchID:this.props.matchID,credentials:this.props.credentials,playerID:this.props.playerID},e.next=11,fetch("https://server.lamft-dev.tk/subscription",{method:"POST",body:JSON.stringify(a),headers:{"content-type":"application/json"}});case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getNotification",value:function(){var e=this;"Notification"in window&&("denied"!==Notification.permission&&"granted"!==Notification.permission?Notification.requestPermission().then(function(){var t=Object(Y.a)(Q.a.mark((function t(n){return Q.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.registration();case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()):this.registration()),document.getElementById("buttonNotif").style.display="none"}},{key:"getRndInteger",value:function(e,t){return Math.floor(Math.random()*(t-e+1))+e}},{key:"passTour",value:function(){this.props.moves.passTurn()}},{key:"onClick",value:function(e){var t=this.props.G.cells[e];document.getElementById("error").innerHTML="","player"===t.type&&"threatfull"===t.player.etat?this.props.moves.attackPlayer(e):"move"===t.type?this.props.moves.moveorAttackPlayer(e):"object"===t.type&&"get"===t.object.etat?this.props.moves.getObject(e):document.getElementById("error").innerHTML="Vous pouvez pas cliquez !"}},{key:"render",value:function(){var e=this,t="";console.log(this.props.ctx),console.log(this.props.G),console.log(this.props),console.log(this.props.matchData,"this.props.matchData","this.props.matchData");var n=this.props.playerID;this.props.ctx.gameover&&(console.log("gameover",this.props.ctx.gameover),t=Object(o.jsxs)("div",{id:"winner",children:["Winner: ",this.props.ctx.gameover.winner.classCss]}),void 0!==this.props.ctx.gameover.winner.player&&console.log("Winner is => ",this.props.ctx.gameover.winner));for(var a=[],s=0;s<h;s++){for(var r=[],i=function(t){var a=p*s+t;r.push(Object(o.jsxs)("td",{id:a,onClick:function(){return e.onClick(a)},children:[e.props.G.cells[a].value,Object(o.jsx)("span",{id:"span"+a})]},a));var i=document.getElementById(a.toString());if(null!=i){var c,d,h=document.getElementById("span".concat(a.toString()));if(l=e.props.G.cells[a],(c=i.classList).remove.apply(c,Object(U.a)(i.classList)),(d=h.classList).remove.apply(d,Object(U.a)(h.classList)),h.innerHTML="","move"===l.type)i.classList.add("movePossible");else if("player"===l.type){if(i.classList.add("player",l.player.classCss),"threatfull"===l.player.etat&&i.classList.add("opponent"),l.player.life<=0&&i.classList.add("dead"),l.player.classCss==="player".concat(n)){document.getElementById("heart").innerHTML="",document.getElementById("armor").innerHTML="";for(var b=0;b<l.player.life;b++)(u=document.createElement("img")).src="/img/heart.gif",document.getElementById("heart").appendChild(u);document.getElementById("dashboard").innerHTML="<p>Vous avez de puissance ".concat(l.player.power," et votre capacit\xe9 de d\xe9placement est ").concat(l.player.speed),document.getElementById("dashboard_weapon").innerHTML="",document.getElementById("dashboard_armor").innerHTML="";var m=l.player,f=document.getElementById("dashboard_weapon"),y=document.getElementById("dashboard_armor");e.setWeaponInfo(f,m),e.setArmorInfo(y,m),Notification.permission}console.log(h,"span".concat(a.toString()));var v=document.createElement("p");v.textContent=l.player.name;var j=document.createElement("div");j.classList.add("armor");var g=document.createElement("div");g.classList.add("heart");var x=document.createElement("div");x.classList.add("power");for(var O=0;O<l.player.life;O++){var w=document.createElement("img");w.src="/img/heart.gif",g.appendChild(w)}j=e.setArmorInfo(j,l.player),x=e.setWeaponInfo(x,l.player),h.appendChild(v),h.appendChild(j),h.appendChild(g),h.appendChild(x),h.classList.add("popupUser")}else if("block"===l.type)i.classList.add("moveImpossible");else if("object"===l.type){"get"===l.object.etat&&i.classList.add("items"),""!==l.object.image&&i.classList.add(l.object.image);var k=document.createElement("p");k.textContent=l.object.name,h.appendChild(k),h.classList.add("popupObject")}else"opponent"===l.type&&i.classList.add("opponent");i.classList.add("cell","cell"+a)}},c=0;c<p;c++){var l,u;i(c)}a.push(Object(o.jsx)("tr",{children:r},s))}var d="";return"Notification"in window&&(d=Object(o.jsxs)(K.a,{id:"buttonNotif",variant:"info",onClick:function(){e.getNotification()},children:[Object(o.jsx)("img",{height:"20",src:"/img/notification.svg"}),"Cliquez ici, pour accepter les notifications de cette partie"]})),Object(o.jsx)(X.a,{aspectRatio:"4by3",children:Object(o.jsx)(Z.a,{fluid:!0,children:Object(o.jsxs)($.a,{children:[Object(o.jsx)(ee.a,{style:{width:"100%",height:"auto"},className:"center",children:Object(o.jsx)(te.a,{responsive:"sm",className:"map",id:"board",children:Object(o.jsx)("tbody",{children:a})})}),Object(o.jsxs)(ee.a,{children:[Object(o.jsx)("p",{id:"error"}),Object(o.jsx)("div",{id:"dashboard"}),Object(o.jsx)("div",{id:"dashboard_weapon"}),Object(o.jsx)("div",{id:"dashboard_armor"}),Object(o.jsxs)("div",{children:[Object(o.jsx)("div",{id:"armor",className:"armor"}),Object(o.jsx)("div",{id:"heart",className:"heart"})]}),t,d,Object(o.jsx)(K.a,{id:"passTour",variant:"secondary",onClick:function(){e.passTour()},children:"Cliquez ici, pour passer votre tour !"})]})]})})})}}]),n}(s.a.Component),oe=Object(R.a)({game:A,board:ne,numPlayers:4,debug:!1}),ae=n(23),se=n(52),re=function(){var e=Object(a.useState)(!1),t=Object(ae.a)(e,2),n=t[0],s=t[1],r=null;Object(a.useEffect)((function(){navigator.onLine&&(r=setInterval((function(){d()}),3e3))}));var i=Object(W.g)(),c=Object(W.f)();console.log(i,i,i);var l=Object(R.a)({game:A,board:ne,multiplayer:Object(se.b)({server:"".concat(j,"://").concat(g)}),debug:!1}),u=Object(o.jsx)(K.a,{id:"passTour",variant:"secondary",onClick:function(){!function(){var e={playerID:i.playerID,credentials:i.crendentials},t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};fetch("".concat(j,"://").concat(g,"/games/Jeu_Fil_Rouge/").concat(i.matchID,"/leave"),t).then((function(e){return e.json()})).then((function(e){if(window.indexedDB){var t=indexedDB.open(v);t.onerror=function(e){console.log("error: ",e)},t.onsuccess=function(e){t.result.transaction("matches","readwrite").objectStore("matches").delete("".concat(i.matchID)).onsuccess=function(e){console.log("Lobby supprim\xe9")}}.bind(void 0)}c.push("/")}))}()},children:" Quittons cette partie "}),d=function(){fetch("".concat(j,"://").concat(g,"/games/Jeu_Fil_Rouge/").concat(i.matchID)).then((function(e){return e.json()})).then((function(e){console.log(e);var t=!0;e.players.forEach((function(e){void 0===e.name&&(t=!1)})),s(t)}))};return navigator.onLine?n?(clearInterval(r),Object(o.jsxs)("div",{children:[Object(o.jsx)(l,{matchID:i.matchID,playerID:i.playerID.toString(),credentials:i.crendentials}),u]})):(d(),Object(o.jsxs)("div",{children:["Pas encore assez de joueur",u]})):Object(o.jsx)("p",{children:" Pas de connection, impossible de jouer en ligne ! "})},ie=function(){return Object(o.jsx)(R.b,{gameServer:"".concat(j,"://").concat(g),lobbyServer:"".concat(j,"://").concat(g),gameComponents:[{game:A,board:ne}]})},ce=n(173),le=n(174),ue=n(46);function de(){return Object(o.jsxs)(ue.a,{children:[Object(o.jsx)(he,{}),Object(o.jsx)("div",{className:"container",children:Object(o.jsxs)(W.c,{children:[Object(o.jsx)(W.a,{path:"/create-lobby",children:Object(o.jsx)(H,{})}),Object(o.jsx)(W.a,{path:"/join-lobby",children:Object(o.jsx)(F,{})}),Object(o.jsx)(W.a,{path:"/client/:matchID/:crendentials/:playerID",children:Object(o.jsx)(re,{})}),Object(o.jsx)(W.a,{path:"/game",children:Object(o.jsx)(oe,{})}),Object(o.jsx)(W.a,{path:"/multiplayer",children:Object(o.jsx)(ie,{})}),Object(o.jsx)(W.a,{path:"/",component:x})]})})]})}function he(){return Object(o.jsxs)(ce.a,{className:"bg-light container-fluid",expand:"lg",children:[Object(o.jsx)(ce.a.Brand,{href:"/",children:"Fil Rouge"}),Object(o.jsx)(ce.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(o.jsx)(ce.a.Collapse,{id:"basic-navbar-nav",children:Object(o.jsxs)(le.a,{className:"mr-auto",children:[Object(o.jsx)(le.a.Link,{href:"/create-lobby",children:"Cr\xe9er un Lobby"}),Object(o.jsx)(le.a.Link,{href:"/join-lobby",children:"Rejoindre un Lobby"}),Object(o.jsx)(le.a.Link,{href:"/game",children:"Le Jeu"})]})})]})}var pe=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function be(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var me=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,175)).then((function(t){var n=t.getCLS,o=t.getFID,a=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),o(e),a(e),s(e),r(e)}))};i.a.render(Object(o.jsx)(s.a.StrictMode,{children:Object(o.jsx)(de,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");console.log("swUrl",t),pe?(!function(e,t){console.log("dddd"),fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var o=n.headers.get("content-type");404===n.status||null!=o&&-1===o.indexOf("javascript")?(console.log(n.status),console.log(null!=o),console.log(-1===o.indexOf("javascript")),console.log("sss"),navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))}))):(console.log("aaaaa"),be(e,t))})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):be(t,e)}))}}(),me()},61:function(e){e.exports=JSON.parse('{"compressionlevel":-1,"editorsettings":{"export":{"format":"json","target":"fil rouge..json"}},"height":25,"infinite":false,"layers":[{"data":[4337,4337,4337,4337,4337,4337,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,4337,4337,4337,4337,4337,4337,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,4337,4337,4337,4337,4337,4337,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,4337,4337,4337,4337,4337,4337,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,4337,4337,4337,4337,4337,4337,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,0,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,0,0,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,0,0,0,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,0,0,0,0,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,0,0,0,0,0,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,0,0,0,0,0,0,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,0,0,0,0,0,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,0,0,0,0,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,0,0,0,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,0,0,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,3707,3877,3877,3877,3877,3877,3877,3877,3877,3877,3877,0,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,2401,3707,3877,3877,3877,3707,3707,3707,3707,3877,3877,3707,2401,2401,2401,2401,3707,3707,3707,2401,2401,2401,2401,2401,2401,2401,3707,3707,3877,3877,3707,3707,3707,3707,3877,3707,3707,3707,3707,3707,3707,3707,3707,3707,2401,2401,2401,2401,2401,2401,2401,3707,3707,3877,3877,3707,3707,3707,3707,3707,3707,3707,3707,3707,3707,3707,3707,3707,3707,2401,2401,2401,2401,2401,2401,2401,3707,3707,3707,3707,3707,3707,3707,3707,3707,3707,3707],"height":25,"id":1,"name":"Calque de Tuiles 1","opacity":1,"type":"tilelayer","visible":false,"width":25,"x":0,"y":0},{"data":[0,2539,2477,2478,2539,0,0,0,0,2185,0,0,0,0,0,0,0,2036,2106,2106,2106,2106,2106,2106,2036,0,2539,2548,2549,2539,0,0,0,0,0,0,0,0,0,0,0,0,2107,0,0,1325,1326,0,0,2107,0,2539,0,0,2539,0,0,0,0,0,0,0,0,0,0,0,0,2107,0,0,1396,1397,0,0,2107,0,2539,0,0,2539,0,0,0,0,0,0,0,0,0,0,0,0,2107,0,0,0,0,0,0,2107,0,2539,0,0,2539,0,0,0,0,0,0,0,0,0,0,0,0,2107,0,0,0,0,0,0,2107,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2179,2106,2178,0,0,2178,2106,2179,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2399,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2399,2399,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2399,2399,2399,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2399,2399,2399,2399,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2399,2399,2399,2399,2399,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2470,2399,2399,2399,2399,2399,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2470,2470,2399,2399,2399,2399,2399,2399,2399,2399,2399,2399,2399,2399,2399,0,0,2399,2399,2399,2399,2399,2399,2399,2399,2470,2470,2470,2399,2399,2399,2399,2399,2399,2399,2399,2399,2399,2399,2399,0,0,2399,2399,2399,2399,2399,2399,2399,2399,2470,2470,2470,2399,2399,2399,2399,2399,2399,2399,2399,2399,2399,2399,2399,0,0,2399,2399,2399,2399,2399,2399,2399,2399,2470,2470,2399,2399,2399,2399,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2470,2399,2399,2399,2399,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2399,2399,2399,2399,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2399,2399,2399,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2399,2399,0,0,0,0,0,0,0,0,0,0,0,0,2393,0,2393,2393,2393,2393,2393,2393,2393,2393,2393,2399,0,0,0,0,0,0,0,0,0,0,0,0,0,2393,0,2393,2393,0,0,0,0,0,0,0,0,0,0,0,2393,2393,2393,0,0,0,0,0,0,0,2393,0,2393,2393,0,2393,2393,0,0,0,0,2393,2393,2393,2393,2393,2393,2393,0,0,0,0,0,0,0,2393,0,2393,2393,0,2393,2393,0,0,0,0,2393,2393,2393,2393,2393,2393,2393,0,0,0,0,0,0,0,2393,0,0,0,0,2393,2393,0,0,0,0],"height":25,"id":5,"name":"Calque de Tuiles 2","opacity":1,"type":"tilelayer","visible":true,"width":25,"x":0,"y":0},{"data":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4080,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4120,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4080,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4080,0,0,4120,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4120,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4080,0,0,0,0,0,4080,0,4080,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4120,0,0,4080,0,0,4120,0,4120,0,0,0,0,0,0,0,0,0,0,1847,0,0,0,0,0,0,0,0,4120,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1777,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1847,0,0,0,0,0,0,0,0,0,0,2356,2357,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2427,2428,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1989,0,0,1919,0,0,0,0,0,2427,2428,0,0,1776,1990,0,0,1988,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2427,2428,0,0,0,0,0,0,0,0,1918,0,0,0,0,0,0,0,0,0,0,4080,0,0,0,2498,2499,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4120,0,0,0,0,4080,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4080,0,0,0,0,0,0,0,0,0,4120,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4120,0,0,4080,4080,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4120,4120,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4080,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4080,0,4120,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4120,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"height":25,"id":6,"name":"Calque de Tuiles 3","opacity":1,"type":"tilelayer","visible":false,"width":25,"x":0,"y":0}],"nextlayerid":7,"nextobjectid":1,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.4.3","tileheight":16,"tilesets":[{"firstgid":1,"source":"fil rouge.tsx"},{"firstgid":1025,"source":"star wars.tsx"},{"firstgid":1325,"source":"map.tsx"},{"firstgid":2674,"source":"build.tsx"},{"firstgid":3454,"source":"herbe.tsx"},{"firstgid":3994,"source":"nature.tsx"}],"tilewidth":16,"type":"map","version":1.4,"width":25}')},98:function(e,t,n){}},[[163,1,2]]]);
//# sourceMappingURL=main.058317c7.chunk.js.map