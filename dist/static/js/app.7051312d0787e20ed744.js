webpackJsonp([1],[,,,,,,,,function(t,e,s){"use strict";var i=s(1),a=s(38),r=s(33),n=s.n(r),o=s(34),u=s.n(o);i.a.use(a.a),e.a=new a.a({routes:[{path:"/",name:"Setup",component:n.a},{path:"/writer",name:"Writer",component:u.a}]})},function(t,e,s){function i(t){s(30)}var a=s(3)(s(13),s(35),i,null,null);t.exports=a.exports},function(t,e,s){"use strict";var i=s(17),a=s.n(i),r=s(18),n=s.n(r),o=function(){function t(){a()(this,t),this.hasStarted=!1,this.isPaused=!1,this.pausedStartTime=-1,this.previousPausedTime=0,this.pausedTime=0,this.startTime=-1,this.timestamp=-1}return n()(t,[{key:"start",value:function(){this.hasStarted=!0}},{key:"update",value:function(t){this.hasStarted&&(-1===this.startTime&&(this.startTime=t),this.isPaused&&(-1===this.pausedStartTime&&(this.pausedStartTime=t),this.pausedTime=t-this.pausedStartTime+this.previousPausedTime),this.timestamp=t)}},{key:"reset",value:function(){this.startTime=this.timestamp}},{key:"stop",value:function(){this.hasStarted=!1}},{key:"pause",value:function(){this.isPaused=!0}},{key:"resume",value:function(){this.isPaused&&(this.previousPausedTime+=this.pausedTime,this.pausedStartTime=-1,this.isPaused=!1)}},{key:"time",get:function(){return this.timestamp-this.startTime-this.pausedTime},set:function(t){this.timestamp=this.startTime+t}}]),t}();e.a=o},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(1),a=s(9),r=s.n(a),n=s(8);i.a.config.productionTip=!1,new i.a({el:"#app",router:n.a,template:"<App/>",components:{App:r.a}})},function(t,e,s){"use strict";var i=s(1),a=s(40);i.a.use(a.a),e.a=new a.a.Store({state:{settings:{goalTime:1e4,eraseTime:6e3}},mutations:{updateGoalTime:function(t,e){t.settings.goalTime=parseInt(e)}}})},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(12);e.default={name:"app",store:i.a}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Setup",data:function(){return{}},computed:{goalTime:function(){return this.$store.state.settings.goalTime}},created:function(){},methods:{isGoalTime:function(t){return this.goalTime===t},updateGoalTime:function(t){this.$store.commit("updateGoalTime",t.target.value)},setGoalTime:function(t){this.$store.commit("updateGoalTime",t)}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(10);e.default={name:"Writer",data:function(){return{eraseMargin:1e3,eraseTimer:null,goalTimer:null,text:"",previousText:"",eraseProgress:1,goalProgress:1,showEraseTimer:!1,opacity:1,hasStarted:!1}},computed:{goalTime:function(){return this.$store.state.settings.goalTime},eraseTime:function(){return this.$store.state.settings.eraseTime}},created:function(){this.eraseTimer=new i.a,this.goalTimer=new i.a},methods:{focus:function(){this.$refs.textarea.focus()},onKeyUp:function(t){this.previousText!==this.text&&""!==this.text&&(this.hasStarted||this.start(),this.eraseTimer.reset(),this.showEraseTimer=!1,this.previousText=this.text)},start:function(){this.hasStarted=!0,this.eraseProgress=0,this.hasStarted&&window.requestAnimationFrame(this.update)},update:function(t){if(this.eraseTimer.hasStarted||this.eraseTimer.start(t),this.goalTimer.hasStarted||this.goalTimer.start(t),this.eraseTimer.update(t),this.goalTimer.update(t),this.eraseTimer.time>=this.eraseTime&&(this.eraseTimer.time=this.eraseTime,this.stop()),this.eraseTimer.time>=this.eraseMargin?(this.goalTimer.pause(),this.showEraseTimer=!0,this.eraseProgress=(this.eraseTimer.time-this.eraseMargin)/(this.eraseTime-this.eraseMargin)):(this.goalTimer.resume(),this.goalProgress=this.goalTimer.time/this.goalTime),this.goalTimer.time>=this.goalTime){var e=document.createElement("a");e.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(this.text)),e.setAttribute("download","text.txt");var s=document.createEvent("MouseEvents");s.initEvent("click",!0,!0),e.dispatchEvent(s),this.stop()}this.hasStarted&&window.requestAnimationFrame(this.update)},stop:function(){this.hasStarted=!1,this.previousText="",this.eraseTimer.stop(),this.goalTimer.stop(),this.text=""}}}},,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e,s){function i(t){s(32)}var a=s(3)(s(14),s(37),i,"data-v-fcc100d8",null);t.exports=a.exports},function(t,e,s){function i(t){s(31)}var a=s(3)(s(15),s(36),i,"data-v-5034ec6c",null);t.exports=a.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"writer",on:{click:t.focus}},[s("transition",{attrs:{name:"fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.hasStarted,expression:"hasStarted"}],staticClass:"progress goal-progress",style:{width:100*this.goalProgress+"%"}})]),t._v(" "),s("transition",{attrs:{name:"fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.showEraseTimer,expression:"showEraseTimer"}],staticClass:"progress erase-progress",style:{width:100-100*this.eraseProgress+"%"}})]),t._v(" "),s("router-link",{staticClass:"back key",attrs:{to:"/"}},[s("span",[t._v("esc")])]),t._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],ref:"textarea",style:{opacity:this.showEraseTimer?1-this.eraseProgress:1},attrs:{autofocus:""},domProps:{value:t.text},on:{keyup:t.onKeyUp,input:function(e){e.target.composing||(t.text=e.target.value)}}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"setup"},[s("div",{staticClass:"container"},[s("section",{staticClass:"goal-select cf"},[s("h1",[t._v("Pick Goal")]),t._v(" "),s("div",{staticClass:"options cf"},[s("div",{staticClass:"key-wrapper"},[s("span",{staticClass:"key",class:{"key-active":9e5==t.goalTime},on:{click:function(e){t.setGoalTime(9e5)}}},[s("span",[t._v("15 min")])])]),t._v(" "),s("div",{staticClass:"key-wrapper"},[s("span",{staticClass:"key",class:{"key-active":18e5==t.goalTime},on:{click:function(e){t.setGoalTime(18e5)}}},[s("span",[t._v("30 min")])])]),t._v(" "),s("div",{staticClass:"key-wrapper"},[s("span",{staticClass:"key",class:{"key-active":36e5==t.goalTime},on:{click:function(e){t.setGoalTime(36e5)}}},[s("span",[t._v("60 min")])])]),t._v(" "),s("div",{staticClass:"cf"})])]),t._v(" "),s("section",[s("router-link",{staticClass:"key key-green continue",attrs:{to:"/writer"}},[s("span",[t._v("Go")])])],1)])])},staticRenderFns:[]}}],[11]);
//# sourceMappingURL=app.7051312d0787e20ed744.js.map