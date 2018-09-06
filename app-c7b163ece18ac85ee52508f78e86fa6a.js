(function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t():"function"==typeof define&&define.amd?define(t):t()})(0,function(){"use strict"
function e(e="unreachable"){return new Error(e)}function t(e,t){if(!e)throw new Error(t||"assertion failure")}const s=Object.keys
function n(e){for(let t=1;t<arguments.length;t++){let n=arguments[t]
if(null===n||"object"!=typeof n)continue
let i=s(n)
for(let t=0;t<i.length;t++){let s=i[t]
e[s]=n[s]}}return e}let i=0
function r(e){return e._guid=++i}function a(){return Object.create(null)}class o{constructor(){this.stack=[],this.current=null}get size(){return this.stack.length}push(e){this.current=e,this.stack.push(e)}pop(){let e=this.stack.pop(),t=this.stack.length
return this.current=0===t?null:this.stack[t-1],void 0===e?null:e}isEmpty(){return 0===this.stack.length}}class l{constructor(e){this.next=null,this.prev=null,this.value=e}}class h{constructor(){this.clear()}head(){return this._head}tail(){return this._tail}clear(){this._head=this._tail=null}toArray(){let e=[]
return this.forEachNode(t=>e.push(t)),e}nextNode(e){return e.next}forEachNode(e){let t=this._head
for(;null!==t;)e(t),t=t.next}insertBefore(e,t=null){return null===t?this.append(e):(t.prev?t.prev.next=e:this._head=e,e.prev=t.prev,e.next=t,t.prev=e,e)}append(e){let t=this._tail
return t?(t.next=e,e.prev=t,e.next=null):this._head=e,this._tail=e}remove(e){return e.prev?e.prev.next=e.next:this._head=e.next,e.next?e.next.prev=e.prev:this._tail=e.prev,e}}class c{constructor(e,t){this._head=e,this._tail=t}forEachNode(e){let t=this._head
for(;null!==t;)e(t),t=this.nextNode(t)}head(){return this._head}tail(){return this._tail}toArray(){let e=[]
return this.forEachNode(t=>e.push(t)),e}nextNode(e){return e===this._tail?null:e.next}}new c(null,null)
const u=Object.freeze([]),p=1
class d{validate(e){return this.value()===e}}d.id=0
const m=[],g=[]
class f{constructor(e,t){this.type=e,this.inner=t}value(){return(0,m[this.type])(this.inner)}validate(e){return(0,g[this.type])(this.inner,e)}}function b(e){let t=m.length
m.push(e=>e.value()),g.push((e,t)=>e.validate(t)),e.id=t}m.push(()=>0),g.push((e,t)=>0===t)
const v=new f(0,null)
m.push(()=>NaN),g.push((e,t)=>NaN===t)
const y=new f(1,null)
m.push(()=>S),g.push((e,t)=>t===S)
new f(2,null)
function k({tag:e}){return e===v}function w(e){return e===v}let S=p
class x extends d{static create(e=S){return new f(this.id,new x(e))}constructor(e=S){super(),this.revision=e}value(){return this.revision}dirty(){this.revision=++S}}function E(e){let t=[]
for(let s=0,n=e.length;s<n;s++){let n=e[s].tag
if(n===y)return y
n!==v&&t.push(n)}return A(t)}function _(e){let t=[],s=e.head()
for(;null!==s;){let n=s.tag
if(n===y)return y
n!==v&&t.push(n),s=e.nextNode(s)}return A(t)}function C(e){let t=[]
for(let s=0,n=e.length;s<n;s++){let n=e[s]
if(n===y)return y
n!==v&&t.push(n)}return A(t)}function A(e){switch(e.length){case 0:return v
case 1:return e[0]
case 2:return O.create(e[0],e[1])
default:return L.create(e)}}b(x)
class N extends d{constructor(){super(...arguments),this.lastChecked=null,this.lastValue=null}value(){let e=this.lastChecked,t=this.lastValue
return e!==S&&(this.lastChecked=S,this.lastValue=t=this.compute()),this.lastValue}invalidate(){this.lastChecked=null}}class O extends N{static create(e,t){return new f(this.id,new O(e,t))}constructor(e,t){super(),this.first=e,this.second=t}compute(){return Math.max(this.first.value(),this.second.value())}}b(O)
class L extends N{static create(e){return new f(this.id,new L(e))}constructor(e){super(),this.tags=e}compute(){let e=this.tags,t=-1
for(let s=0;s<e.length;s++){let n=e[s].value()
t=Math.max(n,t)}return t}}b(L)
class T extends N{static create(e){return new f(this.id,new T(e))}constructor(e){super(),this.tag=e,this.lastUpdated=p}compute(){return Math.max(this.lastUpdated,this.tag.value())}update(e){e!==this.tag&&(this.tag=e,this.lastUpdated=S,this.invalidate())}}b(T)
class M{constructor(){this.lastRevision=null,this.lastValue=null}value(){let e=this.tag,t=this.lastRevision,s=this.lastValue
return null!==t&&e.validate(t)||(s=this.lastValue=this.compute(),this.lastRevision=e.value()),s}invalidate(){this.lastRevision=null}}class D{constructor(e){this.lastValue=null,this.lastRevision=null,this.initialized=!1,this.tag=e.tag,this.reference=e}peek(){return this.initialized?this.lastValue:this.initialize()}revalidate(){if(!this.initialized)return this.initialize()
let e=this.reference,t=this.lastRevision,s=e.tag
if(s.validate(t))return B
this.lastRevision=s.value()
let n=this.lastValue,i=e.value()
return i===n?B:(this.lastValue=i,i)}initialize(){let e=this.reference,t=this.lastValue=e.value()
return this.lastRevision=e.tag.value(),this.initialized=!0,t}}const B="adb3b78e-3d22-4e4b-877a-6317c2c5c145"
class j{constructor(e){this.inner=e,this.tag=v}value(){return this.inner}}class I extends l{constructor(e,t){super(e.valueReferenceFor(t)),this.retained=!1,this.seen=!1,this.key=t.key,this.iterable=e,this.memo=e.memoReferenceFor(t)}update(e){this.retained=!0,this.iterable.updateValueReference(this.value,e),this.iterable.updateMemoReference(this.memo,e)}shouldRemove(){return!this.retained}reset(){this.retained=!1,this.seen=!1}}class R{constructor(e){this.iterator=null,this.map=a(),this.list=new h,this.tag=e.tag,this.iterable=e}isEmpty(){return(this.iterator=this.iterable.iterate()).isEmpty()}iterate(){let e
return e=null===this.iterator?this.iterable.iterate():this.iterator,this.iterator=null,e}has(e){return!!this.map[e]}get(e){return this.map[e]}wasSeen(e){let t=this.map[e]
return void 0!==t&&t.seen}append(e){let t=this.map,s=this.list,n=this.iterable,i=t[e.key]=new I(n,e)
return s.append(i),i}insertBefore(e,t){let s=this.map,n=this.list,i=this.iterable,r=s[e.key]=new I(i,e)
return r.retained=!0,n.insertBefore(r,t),r}move(e,t){let s=this.list
e.retained=!0,s.remove(e),s.insertBefore(e,t)}remove(e){this.list.remove(e),delete this.map[e.key]}nextNode(e){return this.list.nextNode(e)}head(){return this.list.head()}}class P{constructor(e){this.iterator=null
let t=new R(e)
this.artifacts=t}next(){let e=this.artifacts,t=(this.iterator=this.iterator||e.iterate()).next()
return null===t?null:e.append(t)}}var F;(function(e){e[e.Append=0]="Append",e[e.Prune=1]="Prune",e[e.Done=2]="Done"})(F||(F={}))
class H{constructor({target:e,artifacts:t}){this.target=e,this.artifacts=t,this.iterator=t.iterate(),this.current=t.head()}sync(){let e=F.Append
for(;;)switch(e){case F.Append:e=this.nextAppend()
break
case F.Prune:e=this.nextPrune()
break
case F.Done:return void this.nextDone()}}advanceToKey(e){let t=this.current,s=this.artifacts,n=t
for(;null!==n&&n.key!==e;)n.seen=!0,n=s.nextNode(n)
null!==n&&(this.current=s.nextNode(n))}nextAppend(){let e=this.iterator,t=this.current,s=this.artifacts,n=e.next()
if(null===n)return this.startPrune()
let i=n.key
return null!==t&&t.key===i?this.nextRetain(n):s.has(i)?this.nextMove(n):this.nextInsert(n),F.Append}nextRetain(e){let t=this.artifacts,s=this.current;(s=s).update(e),this.current=t.nextNode(s),this.target.retain(e.key,s.value,s.memo)}nextMove(e){let t=this.current,s=this.artifacts,n=this.target,i=e.key,r=s.get(e.key)
r.update(e),s.wasSeen(e.key)?(s.move(r,t),n.move(r.key,r.value,r.memo,t?t.key:null)):this.advanceToKey(i)}nextInsert(e){let t=this.artifacts,s=this.target,n=this.current,i=t.insertBefore(e,n)
s.insert(i.key,i.value,i.memo,n?n.key:null)}startPrune(){return this.current=this.artifacts.head(),F.Prune}nextPrune(){let e=this.artifacts,t=this.target,s=this.current
if(null===s)return F.Done
let n=s
return this.current=e.nextNode(n),n.shouldRemove()?(e.remove(n),t.delete(n.key)):n.reset(),F.Prune}nextDone(){this.target.done()}}function z(...e){let t=e[0],s=e[1],n=e[2]
return"string"==typeof t?function(t,s,n){return V(t,s,n,e)}:n?V(t,s,n,[]):void function(e,t){let s,n=Symbol(t)
W(e).trackedProperties[t]=!0,void 0!==e[t]&&(s=e[t])
Object.defineProperty(e,t,{configurable:!0,get(){return this[n]},set(e){W(this).dirtyableTagFor(t).inner.dirty(),this[n]=e,Y()}})}(t,s)}function V(e,t,s,n){let i=W(e)
return i.trackedProperties[t]=!0,i.trackedPropertyDependencies[t]=n||[],{enumerable:!0,configurable:!1,get:s.get,set:function(){W(this).dirtyableTagFor(t).inner.dirty(),s.set.apply(this,arguments),Y()}}}class U{constructor(e){this.tags=a(),this.computedPropertyTags=a(),this.trackedProperties=e?Object.create(e.trackedProperties):a(),this.trackedPropertyDependencies=e?Object.create(e.trackedPropertyDependencies):a()}tagFor(e){let t,s=this.tags[e]
return s||((t=this.trackedPropertyDependencies[e])?this.tags[e]=function(e,t,s){let n=[e.dirtyableTagFor(t)]
if(s&&s.length)for(let i=0;i<s.length;i++)n.push(e.tagFor(s[i]))
return C(n)}(this,e,t):this.tags[e]=x.create())}dirtyableTagFor(e){let t
return this.trackedPropertyDependencies[e]?(t=this.computedPropertyTags[e])||(this.computedPropertyTags[e]=x.create()):(t=this.tags[e])||(this.tags[e]=x.create())}}let $=Symbol("ember-object")
function W(e){let t=e[$]
return t&&function(e,t){return G.call(e,t)}(e,$)?t:e[$]=new U(t)}let G=Object.prototype.hasOwnProperty
let Y=function(){}
class X extends Error{constructor(e,t,s){super(s),this.target=e,this.key=t}static for(e,t){return new X(e,t,`The property '${t}' on ${e} was changed after being rendered. If you want to change a property used in a template after the component has rendered, mark the property as a tracked property with the @tracked decorator.`)}}function K(e,t,s=function(e,t){throw X.for(e,t)}){if("object"==typeof e&&e){return W(e).tagFor(t)}return v}class J{constructor(e){this.debugName=null,this.__args__=null,Object.assign(this,e)}get element(){let e=this.bounds
return t(e&&e.firstNode===e.lastNode,"The 'element' property can only be accessed on components that contain a single root element in their template. Try using 'bounds' instead to access the first and last nodes."),e.firstNode}get args(){return this.__args__}set args(e){this.__args__=e,W(this).dirtyableTagFor("args").inner.dirty()}static create(e){return new this(e)}didInsertElement(){}didUpdate(){}willDestroy(){}destroy(){this.willDestroy()}toString(){return`${this.debugName} component`}}const q={dynamicLayout:!1,dynamicTag:!0,prepareArgs:!1,createArgs:!0,attributeHook:!0,elementHook:!0}
class Z{constructor(e,t,s,n){this.name=e,this.manager=t,this.ComponentClass=s,this.handle=n,this.state={name:e,capabilities:q,ComponentClass:s,handle:n}}toJSON(){return{GlimmerDebug:`<component-definition name="${this.name}">`}}}class Q{constructor(e,t=null){this._registry=e,this._resolver=t,this._lookups={},this._factoryDefinitionLookups={}}factoryFor(e){let t=this._factoryDefinitionLookups[e]
if(t||(this._resolver&&(t=this._resolver.retrieve(e)),t||(t=this._registry.registration(e)),t&&(this._factoryDefinitionLookups[e]=t)),t)return this.buildFactory(e,t)}lookup(e){let t=!1!==this._registry.registeredOption(e,"singleton")
if(t&&this._lookups[e])return this._lookups[e]
let s=this.factoryFor(e)
if(!s)return
if(!1===this._registry.registeredOption(e,"instantiate"))return s.class
let n=s.create()
return t&&n&&(this._lookups[e]=n),n}defaultInjections(e){return{}}buildInjections(e){let t,s=this.defaultInjections(e),n=this._registry.registeredInjections(e)
for(let i=0;i<n.length;i++)s[(t=n[i]).property]=this.lookup(t.source)
return s}buildFactory(e,t){let s=this.buildInjections(e)
return{class:t,create(e){let n=Object.assign({},s,e)
return t.create(n)}}}}class ee{constructor(e){this._registrations={},this._registeredOptions={},this._registeredInjections={},e&&e.fallback&&(this._fallback=e.fallback)}register(e,t,s){this._registrations[e]=t,s&&(this._registeredOptions[e]=s)}registration(e){let t=this._registrations[e]
return void 0===t&&this._fallback&&(t=this._fallback.registration(e)),t}unregister(e){delete this._registrations[e],delete this._registeredOptions[e],delete this._registeredInjections[e]}registerOption(e,t,s){let n=this._registeredOptions[e]
n||(n={},this._registeredOptions[e]=n),n[t]=s}registeredOption(e,t){let s,n=this.registeredOptions(e)
return n&&(s=n[t]),void 0===s&&void 0!==this._fallback&&(s=this._fallback.registeredOption(e,t)),s}registeredOptions(e){let t=this._registeredOptions[e]
if(void 0===t){let s=e.split(":")[0]
t=this._registeredOptions[s]}return t}unregisterOption(e,t){let s=this._registeredOptions[e]
s&&delete s[t]}registerInjection(e,t,s){let n=this._registeredInjections[e]
void 0===n&&(this._registeredInjections[e]=n=[]),n.push({property:t,source:s})}registeredInjections(e){let t=e.split(":")[0],s=this._fallback?this._fallback.registeredInjections(e):[]
return Array.prototype.push.apply(s,this._registeredInjections[t]),Array.prototype.push.apply(s,this._registeredInjections[e]),s}}const te="__owner__"
function se(e){return e[te]}function ne(e,t){e[te]=t}class ie{constructor(e){this._bounds=e}get firstNode(){return this._bounds.firstNode()}get lastNode(){return this._bounds.lastNode()}}const re=new class{constructor(){this.evaluateOpcode=function(e){let t=new Array(e)
for(let s=0;s<e;s++)t[s]=null
return t}(82).slice()}add(e,t,s="syscall"){this.evaluateOpcode[e]={syscall:"syscall"===s,evaluate:t}}debugBefore(e,t,s){return{sp:void 0,state:void 0}}debugAfter(e,t,s,n){n.sp
n.state,e.stack.sp}evaluate(e,t,s){let n=this.evaluateOpcode[s]
n.syscall?n.evaluate(e,t):n.evaluate(e.inner,t)}}
class ae{constructor(){r(this)}}class oe extends ae{constructor(){super(...arguments),this.next=null,this.prev=null}}var le;(function(e){e[e.pc=0]="pc",e[e.ra=1]="ra",e[e.fp=2]="fp",e[e.sp=3]="sp",e[e.s0=4]="s0",e[e.s1=5]="s1",e[e.t0=6]="t0",e[e.t1=7]="t1",e[e.v0=8]="v0"})(le||(le={}))
class he extends j{constructor(e){super(e)}static create(e){return void 0===e?pe:null===e?de:!0===e?me:!1===e?ge:"number"==typeof e?new ue(e):new ce(e)}get(e){return pe}}class ce extends he{constructor(){super(...arguments),this.lengthReference=null}get(e){if("length"===e){let e=this.lengthReference
return null===e&&(e=this.lengthReference=new ue(this.inner.length)),e}return super.get(e)}}class ue extends he{constructor(e){super(e)}}const pe=new ue(void 0),de=new ue(null),me=new ue(!0),ge=new ue(!1)
class fe{constructor(e){this.inner=e,this.tag=e.tag}value(){return this.toBool(this.inner.value())}toBool(e){return!!e}}class be extends M{constructor(e){super(),this.parts=e,this.tag=E(e)}compute(){let e=new Array
for(let t=0;t<this.parts.length;t++){let s=this.parts[t].value()
null!=s&&(e[t]=ve(s))}return e.length>0?e.join(""):null}}function ve(e){return"function"!=typeof e.toString?"":String(e)}var ye
function ke(e){return function(t){return Array.isArray(t)&&t[0]===e}}re.add(1,(e,{op1:t})=>{let s=e.stack,n=e.constants.resolveHandle(t)(e,s.pop())
e.loadValue(le.v0,n)}),re.add(4,(e,{op1:t})=>{let s=e.referenceForSymbol(t)
e.stack.push(s)}),re.add(2,(e,{op1:t})=>{let s=e.stack.pop()
e.scope().bindSymbol(t,s)}),re.add(3,(e,{op1:t})=>{let s=e.stack.pop(),n=e.stack.pop(),i=e.stack.pop(),r=i?[s,n,i]:null
e.scope().bindBlock(t,r)}),re.add(80,(e,{op1:t})=>{let s=e.constants.getString(t),n=e.scope().getPartialMap()[s]
void 0===n&&(n=e.getSelf().get(s)),e.stack.push(n)}),re.add(17,(e,{op1:t,op2:s})=>{e.pushRootScope(t,!!s)}),re.add(5,(e,{op1:t})=>{let s=e.constants.getString(t),n=e.stack.pop()
e.stack.push(n.get(s))}),re.add(6,(e,{op1:t})=>{let s=e.stack,n=e.scope().getBlock(t)
n?(s.push(n[2]),s.push(n[1]),s.push(n[0])):(s.push(null),s.push(null),s.push(null))}),re.add(7,(e,{op1:t})=>{let s=!!e.scope().getBlock(t)
e.stack.push(s?me:ge)}),re.add(8,e=>{e.stack.pop(),e.stack.pop()
let t=e.stack.pop(),s=t&&t.parameters.length
e.stack.push(s?me:ge)}),re.add(9,(e,{op1:t})=>{let s=new Array(t)
for(let n=t;n>0;n--){s[n-1]=e.stack.pop()}e.stack.push(new be(s))}),function(e){e[e.Text=0]="Text",e[e.Append=1]="Append",e[e.Comment=2]="Comment",e[e.Modifier=3]="Modifier",e[e.Block=4]="Block",e[e.Component=5]="Component",e[e.OpenElement=6]="OpenElement",e[e.OpenSplattedElement=7]="OpenSplattedElement",e[e.FlushElement=8]="FlushElement",e[e.CloseElement=9]="CloseElement",e[e.StaticAttr=10]="StaticAttr",e[e.DynamicAttr=11]="DynamicAttr",e[e.AttrSplat=12]="AttrSplat",e[e.Yield=13]="Yield",e[e.Partial=14]="Partial",e[e.DynamicArg=15]="DynamicArg",e[e.StaticArg=16]="StaticArg",e[e.TrustingAttr=17]="TrustingAttr",e[e.Debugger=18]="Debugger",e[e.ClientSideStatement=19]="ClientSideStatement",e[e.Unknown=20]="Unknown",e[e.Get=21]="Get",e[e.MaybeLocal=22]="MaybeLocal",e[e.HasBlock=23]="HasBlock",e[e.HasBlockParams=24]="HasBlockParams",e[e.Undefined=25]="Undefined",e[e.Helper=26]="Helper",e[e.Concat=27]="Concat",e[e.ClientSideExpression=28]="ClientSideExpression"}(ye||(ye={}))
const we=ke(ye.Get),Se=ke(ye.MaybeLocal)
var xe,Ee;(Ee=xe||(xe={}))[Ee.OpenComponentElement=0]="OpenComponentElement",Ee[Ee.DidCreateElement=1]="DidCreateElement",Ee[Ee.SetComponentAttrs=2]="SetComponentAttrs",Ee[Ee.DidRenderLayout=3]="DidRenderLayout",Ee[Ee.Debugger=4]="Debugger"
var _e=ye
const Ce="&attrs"
class Ae{constructor(e=0){this.offset=e,this.names=a(),this.funcs=[]}add(e,t){this.funcs.push(t),this.names[e]=this.funcs.length-1}compile(e,t){let s=e[this.offset],n=this.names[s],i=this.funcs[n]
i(e,t)}}let Ne,Oe
function Le(e,t,s){let n=e[1],i=e[2],r=e[3]
s.expr(i),r?s.dynamicAttr(n,r,t):s.dynamicAttr(n,null,t)}class Te{constructor(){var e=function(e=new Me,t=new De){return e.add("if",(e,t,s,n,i)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #if requires a single argument")
i.startLabels(),i.pushFrame(),i.returnTo("END"),i.expr(e[0]),i.toBoolean(),i.enter(1),i.jumpUnless("ELSE"),i.invokeStaticBlock(s),n?(i.jump("EXIT"),i.label("ELSE"),i.invokeStaticBlock(n),i.label("EXIT"),i.exit(),i.return()):(i.label("ELSE"),i.exit(),i.return()),i.label("END"),i.popFrame(),i.stopLabels()}),e.add("unless",(e,t,s,n,i)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #unless requires a single argument")
i.startLabels(),i.pushFrame(),i.returnTo("END"),i.expr(e[0]),i.toBoolean(),i.enter(1),i.jumpIf("ELSE"),i.invokeStaticBlock(s),n?(i.jump("EXIT"),i.label("ELSE"),i.invokeStaticBlock(n),i.label("EXIT"),i.exit(),i.return()):(i.label("ELSE"),i.exit(),i.return()),i.label("END"),i.popFrame(),i.stopLabels()}),e.add("with",(e,t,s,n,i)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #with requires a single argument")
i.startLabels(),i.pushFrame(),i.returnTo("END"),i.expr(e[0]),i.dup(),i.toBoolean(),i.enter(2),i.jumpUnless("ELSE"),i.invokeStaticBlock(s,1),n?(i.jump("EXIT"),i.label("ELSE"),i.invokeStaticBlock(n),i.label("EXIT"),i.exit(),i.return()):(i.label("ELSE"),i.exit(),i.return()),i.label("END"),i.popFrame(),i.stopLabels()}),e.add("each",(e,t,s,n,i)=>{i.startLabels(),i.pushFrame(),i.returnTo("END"),t&&"key"===t[0][0]?i.expr(t[1][0]):i.pushPrimitiveReference(null),i.expr(e[0]),i.enter(2),i.putIterator(),i.jumpUnless("ELSE"),i.pushFrame(),i.returnTo("ITER"),i.dup(le.fp,1),i.enterList("BODY"),i.label("ITER"),i.iterate("BREAK"),i.label("BODY"),i.invokeStaticBlock(s,2),i.pop(2),i.exit(),i.return(),i.label("BREAK"),i.exitList(),i.popFrame(),n?(i.jump("EXIT"),i.label("ELSE"),i.invokeStaticBlock(n),i.label("EXIT"),i.exit(),i.return()):(i.label("ELSE"),i.exit(),i.return()),i.label("END"),i.popFrame(),i.stopLabels()}),e.add("in-element",(e,t,s,n,i)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #in-element requires a single argument")
i.startLabels(),i.pushFrame(),i.returnTo("END")
let r=t[0],a=t[1]
for(let o=0;o<r.length;o++){let e=r[o]
if("nextSibling"!==e&&"guid"!==e)throw new Error(`SYNTAX ERROR: #in-element does not take a \`${r[0]}\` option`)
i.expr(a[o])}i.expr(e[0]),i.dup(),i.enter(4),i.jumpUnless("ELSE"),i.pushRemoteElement(),i.invokeStaticBlock(s),i.popRemoteElement(),i.label("ELSE"),i.exit(),i.return(),i.label("END"),i.popFrame(),i.stopLabels()}),e.add("-with-dynamic-vars",(e,t,s,n,i)=>{if(t){let e=t[0],n=t[1]
i.compileParams(n),i.pushDynamicScope(),i.bindDynamicScope(e),i.invokeStaticBlock(s),i.popDynamicScope()}else i.invokeStaticBlock(s)}),e.add("component",(e,t,s,n,i)=>{if("string"==typeof e[0]&&i.staticComponentHelper(e[0],t,s))return
let r=e[0],a=e.slice(1)
i.dynamicComponent(r,a,t,!0,s,n)}),t.add("component",(e,t,s,n)=>{let i=t&&t[0]
if("string"==typeof i&&n.staticComponentHelper(i,s,null))return!0
let r=t[0],a=t.slice(1)
return n.dynamicComponent(r,a,s,!0,null,null),!0}),{blocks:e,inlines:t}}()
let t=e.blocks,s=e.inlines
this.blocks=t,this.inlines=s}}class Me{constructor(){this.names=a(),this.funcs=[]}add(e,t){this.funcs.push(t),this.names[e]=this.funcs.length-1}addMissing(e){this.missing=e}compile(e,t,s,n,i,r){let a=this.names[e]
if(void 0===a){(0,this.missing)(e,t,s,n,i,r)}else{(0,this.funcs[a])(t,s,n,i,r)}}}class De{constructor(){this.names=a(),this.funcs=[]}add(e,t){this.funcs.push(t),this.names[e]=this.funcs.length-1}addMissing(e){this.missing=e}compile(e,t){let s,n,i,r=e[1]
if(!Array.isArray(r))return["expr",r]
if(r[0]===_e.Helper)s=r[1],n=r[2],i=r[3]
else{if(r[0]!==_e.Unknown)return["expr",r]
s=r[1],n=i=null}let a=this.names[s]
if(void 0===a&&this.missing){let e=(0,this.missing)(s,n,i,t)
return!1===e?["expr",r]:e}if(void 0!==a){let e=(0,this.funcs[a])(s,n,i,t)
return!1===e?["expr",r]:e}return["expr",r]}}const Be=-1
class je{constructor(e,t,s,n){this.statements=e,this.containingLayout=t,this.options=s,this.symbolTable=n,this.compiled=null,this.statementCompiler=function(){if(Ne)return Ne
const e=Ne=new Ae
e.add(_e.Text,(e,t)=>{t.text(e[1])}),e.add(_e.Comment,(e,t)=>{t.comment(e[1])}),e.add(_e.CloseElement,(e,t)=>{t.closeElement()}),e.add(_e.FlushElement,(e,t)=>{t.flushElement()}),e.add(_e.Modifier,(e,t)=>{let s=t.resolver,n=t.referrer,i=e[1],r=e[2],a=e[3],o=s.lookupModifier(i,n)
if(!o)throw new Error(`Compile Error ${i} is not a modifier: Helpers may not be used in the element form.`)
t.modifier(o,r,a)}),e.add(_e.StaticAttr,(e,t)=>{let s=e[1],n=e[2],i=e[3]
t.staticAttr(s,i,n)}),e.add(_e.DynamicAttr,(e,t)=>{Le(e,!1,t)}),e.add(_e.TrustingAttr,(e,t)=>{Le(e,!0,t)}),e.add(_e.OpenElement,(e,t)=>{t.openPrimitiveElement(e[1])}),e.add(_e.OpenSplattedElement,(e,t)=>{t.setComponentAttrs(!0),t.putComponentOperations(),t.openPrimitiveElement(e[1])}),e.add(_e.Component,(e,t)=>{let s=e[1],n=e[2],i=e[3],r=e[4],a=t.resolver,o=t.referrer,l=a.lookupComponentDefinition(s,o)
if(null===l)throw new Error(`Compile Error: Cannot find component ${s}`)
{let e=a.getCapabilities(l),s=[[_e.ClientSideStatement,xe.SetComponentAttrs,!0],...n,[_e.ClientSideStatement,xe.SetComponentAttrs,!1]],o=t.inlineBlock({statements:s,parameters:u}),h=t.template(r)
if(!1===e.dynamicLayout){let s=a.getLayout(l)
t.pushComponentDefinition(l),t.invokeStaticComponent(e,s,o,null,i,!1,h&&h)}else t.pushComponentDefinition(l),t.invokeComponent(o,null,i,!1,h&&h)}}),e.add(_e.Partial,(e,t)=>{let s=e[1],n=e[2],i=t.referrer
t.startLabels(),t.pushFrame(),t.returnTo("END"),t.expr(s),t.dup(),t.enter(2),t.jumpUnless("ELSE"),t.invokePartial(i,t.evalSymbols(),n),t.popScope(),t.popFrame(),t.label("ELSE"),t.exit(),t.return(),t.label("END"),t.popFrame(),t.stopLabels()}),e.add(_e.Yield,(e,t)=>{let s=e[1],n=e[2]
t.yield(s,n)}),e.add(_e.AttrSplat,(e,t)=>{let s=e[1]
t.yield(s,[]),t.didCreateElement(le.s0),t.setComponentAttrs(!1)}),e.add(_e.Debugger,(e,t)=>{let s=e[1]
t.debugger(t.evalSymbols(),s)}),e.add(_e.ClientSideStatement,(e,s)=>{t.compile(e,s)}),e.add(_e.Append,(e,t)=>{let s=e[1],n=e[2]
if(!0===(t.macros.inlines.compile(e,t)||s))return
let i=we(s),r=Se(s)
n?t.guardedAppend(s,!0):i||r?t.guardedAppend(s,!1):(t.expr(s),t.primitive(!1),t.load(le.t0),t.dynamicContent())}),e.add(_e.Block,(e,t)=>{let s=e[1],n=e[2],i=e[3],r=e[4],a=e[5],o=t.template(r),l=t.template(a),h=o&&o,c=l&&l
t.macros.blocks.compile(s,n,i,h,c,t)})
const t=new Ae(1)
return t.add(xe.OpenComponentElement,(e,t)=>{t.putComponentOperations(),t.openPrimitiveElement(e[2])}),t.add(xe.DidCreateElement,(e,t)=>{t.didCreateElement(le.s0)}),t.add(xe.SetComponentAttrs,(e,t)=>{t.setComponentAttrs(e[2])}),t.add(xe.Debugger,()=>{}),t.add(xe.DidRenderLayout,(e,t)=>{t.didRenderLayout(le.s0)}),e}()}static topLevel(e,t){return new je(e.statements,{block:e,referrer:t.referrer},t,{referrer:t.referrer,hasEval:e.hasEval,symbols:e.symbols})}compile(e){let t=this.compiled
if(null!==t)return t
this.compiled=Be
let s=this.options,n=this.statements,i=this.containingLayout,r=i.referrer,a=s.program,o=s.resolver,l=s.macros,h=s.asPartial,c=new(0,s.Builder)(a,o,r,l,i,h,e)
for(let p=0;p<n.length;p++)this.statementCompiler.compile(n[p],c)
let u=c.commit(a.heap,i.block.symbols.length)
return this.compiled=u}}class Ie{constructor(e){this.builder=e}static(e,t){let s=t[0],n=t[1],i=t[2],r=t[3],a=this.builder,o=a.resolver
if(null!==e){let t=o.getCapabilities(e)
if(!1===t.dynamicLayout){let l=o.getLayout(e)
a.pushComponentDefinition(e),a.invokeStaticComponent(t,l,null,s,n,!1,i,r)}else a.pushComponentDefinition(e),a.invokeComponent(null,s,n,!1,i,r)}}}class Re{constructor(e){this.buffer=e,this.typePos=0,this.size=0}encode(e,t){if(e>255)throw new Error(`Opcode type over 8-bits. Got ${e}.`)
this.buffer.push(e|t|arguments.length-2<<8),this.typePos=this.buffer.length-1
for(let s=2;s<arguments.length;s++){let e=arguments[s]
if("number"==typeof e&&e>65535)throw new Error(`Operand over 16-bits. Got ${e}.`)
this.buffer.push(e)}this.size=this.buffer.length}patch(e,t){if(-1!==this.buffer[e+1])throw new Error("Trying to patch operand in populated slot instead of a reserved slot.")
this.buffer[e+1]=t}}class Pe{constructor(){this.labels=a(),this.targets=[]}label(e,t){this.labels[e]=t}target(e,t){this.targets.push({at:e,target:t})}patch(e){let t=this.targets,s=this.labels
for(let i=0;i<t.length;i++){var n=t[i]
let r=n.at,a=s[n.target]-r
e.patch(r,a)}}}class Fe{constructor(){this.encoder=new Re([])}push(e){switch(arguments.length){case 1:return this.encoder.encode(e,0)
case 2:return this.encoder.encode(e,0,arguments[1])
case 3:return this.encoder.encode(e,0,arguments[1],arguments[2])
default:return this.encoder.encode(e,0,arguments[1],arguments[2],arguments[3])}}pushMachine(e){switch(arguments.length){case 1:return this.encoder.encode(e,1024)
case 2:return this.encoder.encode(e,1024,arguments[1])
case 3:return this.encoder.encode(e,1024,arguments[1],arguments[2])
default:return this.encoder.encode(e,1024,arguments[1],arguments[2],arguments[3])}}commit(e,t){this.pushMachine(20)
let s=this.encoder.buffer,n=e.malloc()
for(let i=0;i<s.length;i++){let t=s[i]
"function"==typeof t?e.pushPlaceholder(t):e.push(t)}return e.finishMalloc(n,t),n}reserve(e){this.encoder.encode(e,0,-1)}reserveMachine(e){this.encoder.encode(e,1024,-1)}main(){this.push(56,le.s0),this.invokePreparedComponent(!1)}dynamicContent(){this.push(24)}beginComponentTransaction(){this.push(75)}commitComponentTransaction(){this.push(76)}pushDynamicScope(){this.push(36)}popDynamicScope(){this.push(37)}pushRemoteElement(){this.push(33)}popRemoteElement(){this.push(34)}pushRootScope(e,t){this.push(17,e,t?1:0)}pushChildScope(){this.push(18)}popScope(){this.push(19)}prepareArgs(e){this.push(65,e)}createComponent(e,t){let s=0|t
this.push(67,s,e)}registerComponentDestructor(e){this.push(68,e)}putComponentOperations(){this.push(69)}getComponentSelf(e){this.push(70,e)}getComponentTagName(e){this.push(71,e)}getComponentLayout(e){this.push(72,e)}invokeComponentLayout(e){this.push(74,e)}didCreateElement(e){this.push(77,e)}didRenderLayout(e){this.push(78,e)}pushFrame(){this.pushMachine(47)}popFrame(){this.pushMachine(48)}invokeVirtual(){this.pushMachine(41)}invokeYield(){this.push(43)}toBoolean(){this.push(51)}invokePreparedComponent(e,t=null){this.beginComponentTransaction(),this.pushDynamicScope(),this.createComponent(le.s0,e),t&&t(),this.registerComponentDestructor(le.s0),this.getComponentSelf(le.s0),this.invokeComponentLayout(le.s0),this.didRenderLayout(le.s0),this.popFrame(),this.popScope(),this.popDynamicScope(),this.commitComponentTransaction()}get pos(){return this.encoder.typePos}get nextPos(){return this.encoder.size}}class He extends Fe{constructor(e,t,s,n,i,r,a){super(),this.program=e,this.resolver=t,this.referrer=s,this.macros=n,this.containingLayout=i,this.asPartial=r,this.stdLib=a,this.component=new Ie(this),this.expressionCompiler=function(){if(Oe)return Oe
const e=Oe=new Ae
return e.add(_e.Unknown,(e,t)=>{let s=t.resolver,n=t.asPartial,i=t.referrer,r=e[1],a=s.lookupHelper(r,i)
null!==a?t.helper(a,null,null):n?t.resolveMaybeLocal(r):(t.getVariable(0),t.getProperty(r))}),e.add(_e.Concat,(e,t)=>{let s=e[1]
for(let n=0;n<s.length;n++)t.expr(s[n])
t.concat(s.length)}),e.add(_e.Helper,(e,t)=>{let s=t.resolver,n=t.referrer,i=e[1],r=e[2],a=e[3]
if("component"===i){let e=r[0],s=r.slice(1)
return void t.curryComponent(e,s,a,!0)}let o=s.lookupHelper(i,n)
if(null===o)throw new Error(`Compile Error: ${i} is not a helper`)
t.helper(o,r,a)}),e.add(_e.Get,(e,t)=>{let s=e[1],n=e[2]
t.getVariable(s)
for(let i=0;i<n.length;i++)t.getProperty(n[i])}),e.add(_e.MaybeLocal,(e,t)=>{let s=e[1]
if(t.asPartial){let e=s[0]
s=s.slice(1),t.resolveMaybeLocal(e)}else t.getVariable(0)
for(let n=0;n<s.length;n++)t.getProperty(s[n])}),e.add(_e.Undefined,(e,t)=>t.pushPrimitiveReference(void 0)),e.add(_e.HasBlock,(e,t)=>{t.hasBlock(e[1])}),e.add(_e.HasBlockParams,(e,t)=>{t.hasBlockParams(e[1])}),e}(),this.labelsStack=new o,this.isComponentAttrs=!1,this.constants=e.constants}label(e){this.labels.label(e,this.nextPos)}setComponentAttrs(e){this.isComponentAttrs=e}expr(e){Array.isArray(e)?this.expressionCompiler.compile(e,this):this.pushPrimitiveReference(e)}pushArgs(e,t){let s=this.constants.stringArray(e)
this.push(63,s,t)}get labels(){return this.labelsStack.current}startLabels(){this.labelsStack.push(new Pe)}stopLabels(){this.labelsStack.pop().patch(this.encoder)}pushComponentDefinition(e){this.push(59,this.constants.handle(e))}pushCurriedComponent(){this.push(61)}pushDynamicComponentInstance(){this.push(60)}resolveDynamicComponent(e){this.push(62,this.constants.serializable(e))}staticComponentHelper(e,t,s){let n=this.resolver.lookupComponentDefinition(e,this.referrer)
if(n){let e=this.resolver.getCapabilities(n)
if(!1===e.dynamicLayout){if(t)for(let e=0;e<t.length;e+=2)t[e][0]=`@${t[e][0]}`
let i=this.resolver.getLayout(n)
return this.pushComponentDefinition(n),this.invokeStaticComponent(e,i,null,null,t,!1,s&&s),!0}}return!1}invokePartial(e,t,s){let n=this.constants.serializable(e),i=this.constants.stringArray(t),r=this.constants.array(s)
this.push(79,n,i,r)}resolveMaybeLocal(e){this.push(80,this.string(e))}debugger(e,t){this.push(81,this.constants.stringArray(e),this.constants.array(t))}text(e){this.push(22,this.constants.string(e))}openPrimitiveElement(e){this.push(25,this.constants.string(e))}openDynamicElement(){this.push(26)}flushElement(){this.push(30)}closeElement(){this.push(31)}staticAttr(e,t,s){let n=this.constants.string(e),i=t?this.constants.string(t):0
if(this.isComponentAttrs)this.pushPrimitiveReference(s),this.push(29,n,1,i)
else{let e=this.constants.string(s)
this.push(27,n,e,i)}}dynamicAttr(e,t,s){let n=this.constants.string(e),i=t?this.constants.string(t):0
this.isComponentAttrs?this.push(29,n,!0===s?1:0,i):this.push(28,n,!0===s?1:0,i)}comment(e){let t=this.constants.string(e)
this.push(23,t)}modifier(e,t,s){this.pushFrame(),this.compileArgs(t,s,null,!0),this.push(32,this.constants.handle(e)),this.popFrame()}putIterator(){this.push(54)}enterList(e){this.reserve(52),this.labels.target(this.pos,e)}exitList(){this.push(53)}iterate(e){this.reserve(55),this.labels.target(this.pos,e)}setVariable(e){this.push(2,e)}setBlock(e){this.push(3,e)}getVariable(e){this.push(4,e)}getProperty(e){this.push(5,this.string(e))}getBlock(e){this.push(6,e)}hasBlock(e){this.push(7,e)}hasBlockParams(e){this.getBlock(e),this.resolveBlock(),this.push(8)}concat(e){this.push(9,e)}load(e){this.push(15,e)}fetch(e){this.push(16,e)}dup(e=le.sp,t=0){return this.push(13,e,t)}pop(e=1){return this.push(14,e)}returnTo(e){this.reserveMachine(21),this.labels.target(this.pos,e)}primitive(e){let t,s=0
switch(typeof e){case"number":e%1==0?e>-1?t=e:(t=this.negative(e),s=4):(t=this.float(e),s=1)
break
case"string":t=this.string(e),s=2
break
case"boolean":t=0|e,s=3
break
case"object":t=2,s=3
break
case"undefined":t=3,s=3
break
default:throw new Error("Invalid primitive passed to pushPrimitive")}this.push(11,t<<3|s)}float(e){return this.constants.float(e)}negative(e){return this.constants.negative(e)}pushPrimitiveReference(e){this.primitive(e),this.primitiveReference()}primitiveReference(){this.push(12)}helper(e,t,s){this.pushFrame(),this.compileArgs(t,s,null,!0),this.push(1,this.constants.handle(e)),this.popFrame(),this.fetch(le.v0)}bindDynamicScope(e){this.push(35,this.names(e))}enter(e){this.push(49,e)}exit(){this.push(50)}return(){this.pushMachine(20)}jump(e){this.reserveMachine(44),this.labels.target(this.pos,e)}jumpIf(e){this.reserve(45),this.labels.target(this.pos,e)}jumpUnless(e){this.reserve(46),this.labels.target(this.pos,e)}string(e){return this.constants.string(e)}names(e){let t=[]
for(let s=0;s<e.length;s++){let n=e[s]
t[s]=this.constants.string(n)}return this.constants.array(t)}symbols(e){return this.constants.array(e)}inlineBlock(e){let t=e.parameters,s=e.statements,n={parameters:t,referrer:this.containingLayout.referrer},i={program:this.program,macros:this.macros,Builder:this.constructor,resolver:this.resolver,asPartial:this.asPartial,referrer:this.referrer}
return new je(s,this.containingLayout,i,n)}evalSymbols(){let e=this.containingLayout.block
return e.hasEval?e.symbols:null}compileParams(e){if(!e)return 0
for(let t=0;t<e.length;t++)this.expr(e[t])
return e.length}compileArgs(e,t,s,n){s&&(this.pushYieldableBlock(s.main),this.pushYieldableBlock(s.else),this.pushYieldableBlock(s.attrs))
let i=this.compileParams(e)<<4
n&&(i|=8),s&&(i|=7)
let r=u
if(t){r=t[0]
let e=t[1]
for(let t=0;t<e.length;t++)this.expr(e[t])}this.pushArgs(r,i)}invokeStaticBlock(e,t=0){let s=e.symbolTable.parameters,n=s.length,i=Math.min(t,n)
if(this.pushFrame(),i){this.pushChildScope()
for(let e=0;e<i;e++)this.dup(le.fp,t-e),this.setVariable(s[e])}this.pushBlock(e),this.resolveBlock(),this.invokeVirtual(),i&&this.popScope(),this.popFrame()}builtInGuardedAppend(){this.dup(),this.startLabels(),this.isComponent(),this.enter(2),this.jumpUnless("ELSE"),this.pushCurriedComponent(),this.pushDynamicComponentInstance(),this.invokeComponent(null,null,null,!1,null,null),this.exit(),this.return(),this.label("ELSE"),this.dynamicContent(),this.exit(),this.return(),this.stopLabels()}guardedAppend(e,t){this.startLabels(),this.pushFrame(),this.returnTo("END"),this.stdLib?(this.primitive(!!t),this.load(le.t0),this.expr(e),this.primitive(this.stdLib.guardedAppend),this.invokeVirtual()):(this.expr(e),this.dup(),this.isComponent(),this.enter(2),this.jumpUnless("ELSE"),this.pushCurriedComponent(),this.pushDynamicComponentInstance(),this.invokeComponent(null,null,null,!1,null,null),this.exit(),this.return(),this.label("ELSE"),this.primitive(!!t),this.load(le.t0),this.dynamicContent(),this.exit(),this.return()),this.label("END"),this.popFrame(),this.stopLabels()}yield(e,t){this.compileArgs(t,null,null,!1),this.getBlock(e),this.resolveBlock(),this.invokeYield(),this.popScope(),this.popFrame()}populateLayout(e){this.push(73,e)}invokeComponent(e,t,s,n,i,r=null,a){this.fetch(le.s0),this.dup(le.sp,1),this.load(le.s0),this.pushFrame()
let o={main:i,else:r,attrs:e}
this.compileArgs(t,s,o,n),this.prepareArgs(le.s0),this.invokePreparedComponent(null!==i,()=>{a?(this.pushSymbolTable(a.symbolTable),this.pushLayout(a),this.resolveLayout()):this.getComponentLayout(le.s0),this.populateLayout(le.s0)}),this.load(le.s0)}invokeStaticComponent(t,s,n,i,r,a,o,l=null){let h=s.symbolTable
if(h.hasEval||t.prepareArgs)return void this.invokeComponent(n,i,r,a,o,l,s)
this.fetch(le.s0),this.dup(le.sp,1),this.load(le.s0)
let c=h.symbols
t.createArgs&&(this.pushFrame(),this.compileArgs(null,r,null,a)),this.beginComponentTransaction(),this.pushDynamicScope(),this.createComponent(le.s0,null!==o),t.createArgs&&this.popFrame(),this.registerComponentDestructor(le.s0)
let u=[]
this.getComponentSelf(le.s0),u.push({symbol:0,isBlock:!1})
for(let d=0;d<c.length;d++){let t=c[d]
switch(t.charAt(0)){case"&":let s=null
if("&default"===t)s=o
else if("&inverse"===t)s=l
else{if(t!==Ce)throw e()
s=n}s?(this.pushYieldableBlock(s),u.push({symbol:d+1,isBlock:!0})):(this.pushYieldableBlock(null),u.push({symbol:d+1,isBlock:!0}))
break
case"@":if(!r)break
let i=r[0],h=r[1],c=t
a&&(c=t.slice(1))
let p=i.indexOf(c);-1!==p&&(this.expr(h[p]),u.push({symbol:d+1,isBlock:!1}))}}this.pushRootScope(c.length+1,!!(o||l||n))
for(let e=u.length-1;e>=0;e--){var p=u[e]
let t=p.symbol
p.isBlock?this.setBlock(t):this.setVariable(t)}this.pushFrame(),this.invokeStatic(s),this.didRenderLayout(le.s0),this.popFrame(),this.popScope(),this.popDynamicScope(),this.commitComponentTransaction(),this.load(le.s0)}dynamicComponent(e,t,s,n,i,r=null){this.startLabels(),this.pushFrame(),this.returnTo("END"),this.expr(e),this.dup(),this.enter(2),this.jumpUnless("ELSE"),this.resolveDynamicComponent(this.referrer),this.pushDynamicComponentInstance(),this.invokeComponent(null,t,s,n,i,r),this.label("ELSE"),this.exit(),this.return(),this.label("END"),this.popFrame(),this.stopLabels()}isComponent(){this.push(57)}curryComponent(e,t,s,n){let i=this.referrer
this.pushFrame(),this.compileArgs(t,s,null,n),this.push(66),this.expr(e),this.push(58,this.constants.serializable(i)),this.popFrame(),this.fetch(le.v0)}pushSymbolTable(e){if(e){let t=this.constants.serializable(e)
this.push(40,t)}else this.primitive(null)}pushBlockScope(){this.push(39)}pushYieldableBlock(e){this.pushSymbolTable(e&&e.symbolTable),this.pushBlockScope(),this.pushBlock(e)}template(e){return e?this.inlineBlock(e):null}}class ze extends He{pushBlock(e){e?this.pushOther(e):this.primitive(null)}resolveBlock(){this.push(38)}pushLayout(e){e?this.pushOther(e):this.primitive(null)}resolveLayout(){this.push(38)}invokeStatic(e){this.pushOther(e),this.push(38),this.pushMachine(41)}pushOther(e){this.push(10,this.other(e))}other(e){return this.constants.other(e)}}class Ve{constructor(){this.base=0,this.length=0,this.stack=null,this._tag=null,this._references=null}setup(e,t,s){this.stack=e,this.base=t,this.length=s,0===s?(this._tag=v,this._references=u):(this._tag=null,this._references=null)}get tag(){let e=this._tag
return e||(e=this._tag=E(this.references)),e}at(e){let t=this.base,s=this.length,n=this.stack
return e<0||e>=s?pe:n.get(e,t)}capture(){return new Ue(this.tag,this.references)}prepend(e){let t=e.length
if(t>0){let s=this.base,n=this.length,i=this.stack
this.base=s-=t,this.length=n+t
for(let r=0;r<t;r++)i.set(e.at(r),r,s)
this._tag=null,this._references=null}}get references(){let e=this._references
if(!e){let t=this.stack,s=this.base,n=this.length
e=this._references=t.sliceArray(s,s+n)}return e}}class Ue{constructor(e,t,s=t.length){this.tag=e,this.references=t,this.length=s}static empty(){return new Ue(v,u,0)}at(e){return this.references[e]}value(){return this.references.map(this.valueOf)}get(e){let t=this.references,s=this.length
if("length"===e)return he.create(s)
{let n=parseInt(e,10)
return n<0||n>=s?pe:t[n]}}valueOf(e){return e.value()}}class $e{constructor(){this.base=0,this.length=0,this._references=null,this._names=u,this._atNames=u}setup(e,t,s,n,i){this.stack=e,this.base=t,this.length=s,0===s?(this._references=u,this._names=u,this._atNames=u):(this._references=null,i?(this._names=n,this._atNames=null):(this._names=null,this._atNames=n))}get tag(){return E(this.references)}get names(){let e=this._names
return e||(e=this._names=this._atNames.map(this.toSyntheticName)),e}get atNames(){let e=this._atNames
return e||(e=this._atNames=this._names.map(this.toAtName)),e}has(e){return-1!==this.names.indexOf(e)}get(e,t=!0){let s=this.base,n=this.stack,i=(t?this.names:this.atNames).indexOf(e)
return-1===i?pe:n.get(i,s)}capture(){return new We(this.tag,this.names,this.references)}merge(e){let t=e.length
if(t>0){let s=this.names,n=this.length,i=this.stack,r=e.names
Object.isFrozen(s)&&0===s.length&&(s=[])
for(let a=0;a<t;a++){let t=r[a];-1===s.indexOf(t)&&(n=s.push(t),i.push(e.references[a]))}this.length=n,this._references=null,this._names=s,this._atNames=null}}get references(){let e=this._references
if(!e){let t=this.base,s=this.length,n=this.stack
e=this._references=n.sliceArray(t,t+s)}return e}toSyntheticName(e){return e.slice(1)}toAtName(e){return`@${e}`}}class We{constructor(e,t,s){this.tag=e,this.names=t,this.references=s,this.length=t.length,this._map=null}get map(){let e=this._map
if(!e){let t=this.names,s=this.references
e=this._map=a()
for(let n=0;n<t.length;n++){e[t[n]]=s[n]}}return e}has(e){return-1!==this.names.indexOf(e)}get(e){let t=this.names,s=this.references,n=t.indexOf(e)
return-1===n?pe:s[n]}value(){let e=this.names,t=this.references,s=a()
for(let n=0;n<e.length;n++){s[e[n]]=t[n].value()}return s}}class Ge{constructor(){this.internalValues=null,this.internalTag=null,this.names=u,this.length=0,this.base=0}setup(e,t,s,n){this.stack=e,this.names=n,this.base=t,this.length=s,0===s?(this.internalTag=v,this.internalValues=u):(this.internalTag=null,this.internalValues=null)}get values(){let e=this.internalValues
if(!e){let t=this.base,s=this.length,n=this.stack
e=this.internalValues=n.sliceArray(t,t+3*s)}return e}has(e){return-1!==this.names.indexOf(e)}get(e){let t=this.base,s=this.stack,n=this.names,i=n.indexOf(e)
if(-1===n.indexOf(e))return null
let r=s.get(3*i,t),a=s.get(3*i+1,t),o=s.get(3*i+2,t)
return null===o?null:[o,a,r]}capture(){return new Ye(this.names,this.values)}}class Ye{constructor(e,t){this.names=e,this.values=t,this.length=e.length}has(e){return-1!==this.names.indexOf(e)}get(e){let t=this.names.indexOf(e)
return-1===t?null:[this.values[3*t+2],this.values[3*t+1],this.values[3*t]]}}const Xe=new We(v,u,u),Ke=new Ue(v,u),Je={tag:v,length:0,positional:Ke,named:Xe},qe="CURRIED COMPONENT DEFINITION [id=6f00feb9-a0ef-4547-99ea-ac328f80acea]"
function Ze(e){return!(!e||!e[qe])}class Qe{constructor(e,t){this.inner=e,this.args=t,this[qe]=!0}unwrap(e){e.realloc(this.offset)
let t=this
for(;;){var s=t
let n=s.args,i=s.inner
if(n&&(e.positional.prepend(n.positional),e.named.merge(n.named)),!Ze(i))return i
t=i}}get offset(){let e=this.inner,t=this.args,s=t?t.positional.length:0
return Ze(e)?s+e.offset:s}}class et extends fe{static create(e){return new et(e)}toBool(e){return Ze(e)}}re.add(24,e=>{let t,s=e.stack.pop(),n=e.fetchValue(le.t0),i=s.value()
t=n?e.elements().appendTrustingDynamicContent(i):e.elements().appendCautiousDynamicContent(i),k(s)||e.updateWith(new tt(s,t)),e.loadValue(le.t0,null)})
class tt extends oe{constructor(e,t){super(),this.reference=e,this.content=t,this.tag=e.tag}evaluate(e){let t=this.content,s=this.reference
t.update(e.env,s.value())}}re.add(18,e=>e.pushChildScope()),re.add(19,e=>e.popScope()),re.add(36,e=>e.pushDynamicScope()),re.add(37,e=>e.popDynamicScope()),re.add(10,(e,{op1:t})=>{e.stack.push(e.constants.getOther(t))}),re.add(11,(e,{op1:t})=>{let s=e.stack,n=t>>3
switch(7&t){case 0:s.push(n)
break
case 1:s.push(e.constants.getFloat(n))
break
case 2:s.push(e.constants.getString(n))
break
case 3:s.pushEncodedImmediate(t)
break
case 4:s.push(e.constants.getNegative(n))}}),re.add(12,e=>{let t=e.stack
t.push(he.create(t.pop()))}),re.add(13,(e,{op1:t,op2:s})=>{let n=e.fetchValue(t)-s
e.stack.dup(n)}),re.add(14,(e,{op1:t})=>{e.stack.pop(t)}),re.add(15,(e,{op1:t})=>{e.load(t)}),re.add(16,(e,{op1:t})=>{e.fetch(t)}),re.add(35,(e,{op1:t})=>{let s=e.constants.getArray(t)
e.bindDynamicScope(s)}),re.add(49,(e,{op1:t})=>{e.enter(t)}),re.add(50,e=>{e.exit()}),re.add(40,(e,{op1:t})=>{e.stack.push(e.constants.getSerializable(t))}),re.add(39,e=>{e.stack.push(e.scope())}),re.add(38,e=>{let t=e.stack,s=t.pop()
s?t.pushSmi(s.compile()):t.pushNull()}),re.add(43,e=>{let t=e.stack,s=t.pop(),n=t.pop(),i=t.pop(),r=t.pop()
if(null===i)return e.pushFrame(),void e.pushScope(n)
let a=n
{let e=i.parameters,t=e.length
if(t>0){a=a.child()
for(let s=0;s<t;s++)a.bindSymbol(e[s],r.at(s))}}e.pushFrame(),e.pushScope(a),e.call(s)}),re.add(45,(e,{op1:t})=>{let s=e.stack.pop()
if(k(s))s.value()&&e.goto(t)
else{let n=new D(s)
n.peek()&&e.goto(t),e.updateWith(new st(n))}}),re.add(46,(e,{op1:t})=>{let s=e.stack.pop()
if(k(s))s.value()||e.goto(t)
else{let n=new D(s)
n.peek()||e.goto(t),e.updateWith(new st(n))}}),re.add(51,e=>{let t=e.env,s=e.stack
s.push(t.toConditionalReference(s.pop()))})
class st extends oe{constructor(e){super(),this.type="assert",this.tag=e.tag,this.cache=e}evaluate(e){let t=this.cache
t.revalidate()!==B&&e.throw()}}class nt extends oe{constructor(e,t){super(),this.target=t,this.type="jump-if-not-modified",this.tag=e,this.lastRevision=e.value()}evaluate(e){let t=this.tag,s=this.target,n=this.lastRevision
!e.alwaysRevalidate&&t.validate(n)&&e.goto(s)}didModify(){this.lastRevision=this.tag.value()}}class it extends oe{constructor(e){super(),this.target=e,this.type="did-modify",this.tag=v}evaluate(){this.target.didModify()}}class rt{constructor(e){this.tag=v,this.type="label",this.label=null,this.prev=null,this.next=null,r(this),this.label=e}evaluate(){}inspect(){return`${this.label} [${this._guid}]`}}re.add(22,(e,{op1:t})=>{e.elements().appendText(e.constants.getString(t))}),re.add(23,(e,{op1:t})=>{e.elements().appendComment(e.constants.getString(t))}),re.add(25,(e,{op1:t})=>{e.elements().openElement(e.constants.getString(t))}),re.add(26,e=>{let t=e.stack.pop().value()
e.elements().openElement(t)}),re.add(33,e=>{let t,s,n=e.stack.pop(),i=e.stack.pop(),r=e.stack.pop().value()
if(k(n))t=n.value()
else{let s=new D(n)
t=s.peek(),e.updateWith(new st(s))}if(k(i))s=i.value()
else{let t=new D(i)
s=t.peek(),e.updateWith(new st(t))}e.elements().pushRemoteElement(t,r,s)}),re.add(34,e=>{e.elements().popRemoteElement()}),re.add(30,e=>{let t=e.fetchValue(le.t0)
t&&(t.flush(e),e.loadValue(le.t0,null)),e.elements().flushElement()}),re.add(31,e=>{e.elements().closeElement()}),re.add(32,(e,{op1:t})=>{let s=e.constants.resolveHandle(t),n=e.stack.pop()
var i=e.elements()
let r=i.constructing,a=i.updateOperations,o=e.dynamicScope(),l=s.create(r,n,o,a)
e.env.scheduleInstallModifier(l,s)
let h=s.getDestructor(l)
h&&e.newDestroyable(h)
let c=s.getTag(l)
w(c)||e.updateWith(new at(c,s,l))})
class at extends oe{constructor(e,t,s){super(),this.tag=e,this.manager=t,this.modifier=s,this.type="update-modifier",this.lastUpdated=e.value()}evaluate(e){let t=this.manager,s=this.modifier,n=this.tag,i=this.lastUpdated
n.validate(i)||(e.env.scheduleUpdateModifier(s,t),this.lastUpdated=n.value())}}re.add(27,(e,{op1:t,op2:s,op3:n})=>{let i=e.constants.getString(t),r=e.constants.getString(s),a=n?e.constants.getString(n):null
e.elements().setStaticAttribute(i,r,a)}),re.add(28,(e,{op1:t,op2:s,op3:n})=>{let i=e.constants.getString(t),r=e.stack.pop(),a=r.value(),o=n?e.constants.getString(n):null,l=e.elements().setDynamicAttribute(i,a,!!s,o)
k(r)||e.updateWith(new ot(r,l))})
class ot extends oe{constructor(e,t){super(),this.reference=e,this.attribute=t,this.type="patch-element",this.tag=e.tag,this.lastRevision=this.tag.value()}evaluate(e){let t=this.attribute,s=this.reference,n=this.tag
n.validate(this.lastRevision)||(this.lastRevision=n.value(),t.update(s.value(),e.env))}}function lt(e,t,s){let n=e.lookupComponent(t,s)
return n}class ht{constructor(e,t,s,n){this.inner=e,this.resolver=t,this.meta=s,this.args=n,this.tag=e.tag,this.lastValue=null,this.lastDefinition=null}value(){let e=this.inner,t=this.lastValue,s=e.value()
if(s===t)return this.lastDefinition
let n=null
if(Ze(s))n=s
else if("string"==typeof s&&s){n=lt(this.resolver,s,this.meta)}return n=this.curry(n),this.lastValue=s,this.lastDefinition=n,n}get(){return pe}curry(e){let t=this.args
return!t&&Ze(e)?e:e?new Qe(e,t):null}}function ct(e){return ut(e)?"":String(e)}function ut(e){return null==e||"function"!=typeof e.toString}function pt(e){return"object"==typeof e&&null!==e&&"function"==typeof e.toHTML}function dt(e){return"object"==typeof e&&null!==e&&"number"==typeof e.nodeType}function mt(e){return dt(e)&&11===e.nodeType}function gt(e){return"string"==typeof e}class ft{constructor(e){this.list=e,this.tag=E(e),this.list=e}value(){let e=[],t=this.list
for(let s=0;s<t.length;s++){let n=ct(t[s].value())
n&&e.push(n)}return 0===e.length?null:e.join(" ")}}function bt(e){return 0|(e.dynamicLayout?1:0)|(e.dynamicTag?2:0)|(e.prepareArgs?4:0)|(e.createArgs?8:0)|(e.attributeHook?16:0)|(e.elementHook?32:0)}function vt(e,t){return!!(e&t)}const yt=new class{constructor(){this.stack=null,this.positional=new Ve,this.named=new $e,this.blocks=new Ge}setup(e,t,s,n,i){this.stack=e
let r=this.named,a=t.length,o=e.sp-a+1
r.setup(e,o,a,t,i)
let l=o-n
this.positional.setup(e,l,n)
let h=this.blocks,c=s.length,u=l-3*c
h.setup(e,u,c,s)}get tag(){return E([this.positional,this.named])}get base(){return this.blocks.base}get length(){return this.positional.length+this.named.length+3*this.blocks.length}at(e){return this.positional.at(e)}realloc(e){if(e>0){let t=this.positional,s=this.named,n=this.stack,i=t.base+e
for(let e=t.length+s.length-1;e>=0;e--)n.copy(e+t.base,e+i)
t.base+=e,s.base+=e,n.sp+=e}}capture(){let e=0===this.positional.length?Ke:this.positional.capture(),t=0===this.named.length?Xe:this.named.capture()
return{tag:this.tag,length:this.length,positional:e,named:t}}clear(){let e=this.stack,t=this.length
e.pop(t)}}
re.add(57,e=>{let t=e.stack,s=t.pop()
t.push(et.create(s))}),re.add(58,(e,{op1:t})=>{let s=e.stack,n=s.pop(),i=s.pop(),r=e.constants.getSerializable(t),a=e.constants.resolver
e.loadValue(le.v0,new ht(n,a,r,i))}),re.add(59,(e,{op1:t})=>{let s=e.constants.resolveHandle(t),n=s.manager,i=bt(n.getCapabilities(s.state)),r={definition:s,manager:n,capabilities:i,state:null,handle:null,table:null}
e.stack.push(r)}),re.add(62,(t,{op1:s})=>{let n,i=t.stack,r=i.pop().value(),a=t.constants.getSerializable(s)
if(t.loadValue(le.t1,null),"string"==typeof r){n=lt(t.constants.resolver,r,a)}else{if(!Ze(r))throw e()
n=r}i.push(n)}),re.add(60,e=>{let t,s,n=e.stack,i=n.pop()
Ze(i)?s=t=null:t=bt((s=i.manager).getCapabilities(i.state)),n.push({definition:i,capabilities:t,manager:s,state:null,handle:null,table:null})}),re.add(61,(t,{op1:s})=>{let n,i=t.stack,r=i.pop().value()
if(!Ze(r))throw e()
n=r,i.push(n)}),re.add(63,(e,{op1:t,op2:s})=>{let n=e.stack,i=e.constants.getStringArray(t),r=s>>4,a=8&s,o=[]
4&s&&o.push("main"),2&s&&o.push("else"),1&s&&o.push("attrs"),yt.setup(n,i,o,r,!!a),n.push(yt)}),re.add(66,e=>{let t=e.stack,s=t.pop().capture()
t.push(s)}),re.add(65,(e,{op1:t})=>{let s=e.stack,n=e.fetchValue(t),i=s.pop(),r=n.definition
Ze(r)&&(r=function(e,t,s){let n=e.definition=t.unwrap(s),i=n.manager,r=n.state
return e.manager=i,e.capabilities=bt(i.getCapabilities(r)),n}(n,r,i))
var a=r
let o=a.manager,l=a.state
if(!0!==vt(n.capabilities,4))return void s.push(i)
let h=i.blocks.values,c=i.blocks.names,u=o.prepareArgs(l,i)
if(u){i.clear()
for(let i=0;i<h.length;i++)s.push(h[i])
let e=u.positional,t=u.named,n=e.length
for(let i=0;i<n;i++)s.push(e[i])
let r=Object.keys(t)
for(let i=0;i<r.length;i++)s.push(t[r[i]])
i.setup(s,r,c,n,!0)}s.push(i)}),re.add(67,(e,{op1:t,op2:s})=>{let n=e.dynamicScope(),i=e.fetchValue(s),r=i.definition,a=i.manager,o=1&t,l=null
vt(i.capabilities=bt(a.getCapabilities(r.state)),8)&&(l=e.stack.peek())
let h=a.create(e.env,r.state,l,n,e.getSelf(),!!o)
i.state=h
let c=a.getTag(h)
w(c)||e.updateWith(new wt(c,h,a,n))}),re.add(68,(e,{op1:t})=>{var s=e.fetchValue(t)
let n=s.manager,i=s.state,r=n.getDestructor(i)
r&&e.newDestroyable(r)}),re.add(75,e=>{e.beginCacheGroup(),e.elements().pushSimpleBlock()}),re.add(69,e=>{e.loadValue(le.t0,new kt)}),re.add(29,(e,{op1:t,op2:s,op3:n})=>{let i=e.constants.getString(t),r=e.stack.pop(),a=n?e.constants.getString(n):null
e.fetchValue(le.t0).setAttribute(i,r,!!s,a)})
class kt{constructor(){this.attributes=a(),this.classes=[]}setAttribute(e,t,s,n){let i={value:t,namespace:n,trusting:s}
"class"===e&&this.classes.push(t),this.attributes[e]=i}flush(e){for(let t in this.attributes){let s=this.attributes[t],n=s.value,i=s.namespace,r=s.trusting
"class"===t&&(n=new ft(this.classes))
let a=e.elements().setDynamicAttribute(t,n.value(),r,i)
k(n)||e.updateWith(new ot(n,a))}}}re.add(77,(e,{op1:t})=>{var s=e.fetchValue(t)
let n=s.definition,i=s.state,r=n.manager,a=e.fetchValue(le.t0)
r.didCreateElement(i,e.elements().expectConstructing("DidCreateElementOpcode#evaluate"),a)}),re.add(70,(e,{op1:t})=>{var s=e.fetchValue(t)
let n=s.definition,i=s.state,r=n.manager
e.stack.push(r.getSelf(i))}),re.add(71,(e,{op1:t})=>{var s=e.fetchValue(t)
let n=s.definition,i=s.state,r=n.manager
e.stack.push(r.getTagName(i))}),re.add(72,(t,{op1:s})=>{let n,i=t.fetchValue(s),r=i.manager,a=i.definition,o=t.constants.resolver,l=t.stack,h=i.state,c=i.capabilities,u=a.state
if(function(e,t){return!1===vt(e,1)}(c))n=r.getLayout(u,o)
else{if(!function(e,t){return!0===vt(e,1)}(c))throw e()
n=r.getDynamicLayout(h,o)}l.push(n.symbolTable),l.push(n.handle)}),re.add(56,(e,{op1:t})=>{let s=e.stack.pop(),n=e.stack.pop(),i=s.manager,r=bt(i.getCapabilities(s.state)),a={definition:s,manager:i,capabilities:r,state:null,handle:n.handle,table:n.symbolTable}
e.loadValue(t,a)}),re.add(73,(e,{op1:t})=>{let s=e.stack,n=s.pop(),i=s.pop(),r=e.fetchValue(t)
r.handle=n,r.table=i}),re.add(74,(e,{op1:t})=>{let s=e.stack
var n=e.fetchValue(t)
let i=n.handle
var r=n.table
let o=r.symbols,l=r.hasEval
{let t=s.pop(),n=e.pushRootScope(o.length+1,!0)
n.bindSelf(t)
let r=e.stack.pop(),h=null
l&&(h=a())
let c=r.named.atNames
for(let e=c.length-1;e>=0;e--){let t=c[e],s=o.indexOf(c[e]),i=r.named.get(t,!1);-1!==s&&n.bindSymbol(s+1,i),l&&(h[t]=i)}let u=(e,t)=>{let s=o.indexOf(e),i=p.get(t);-1!==s&&n.bindBlock(s+1,i),h&&(h[e]=i)},p=r.blocks
u(Ce,"attrs"),u("&inverse","else"),u("&default","main"),h&&n.bindEvalScope(h),e.call(i)}}),re.add(78,(e,{op1:t})=>{var s=e.fetchValue(t)
let n=s.manager,i=s.state,r=e.elements().popBlock()
n.didRenderLayout(i,r),e.env.didCreate(i,n),e.updateWith(new St(n,i,r))}),re.add(76,e=>{e.commitCacheGroup()})
class wt extends oe{constructor(e,t,s,n){super(),this.tag=e,this.component=t,this.manager=s,this.dynamicScope=n,this.type="update-component"}evaluate(e){let t=this.component,s=this.manager,n=this.dynamicScope
s.update(t,n)}}class St extends oe{constructor(e,t,s){super(),this.manager=e,this.component=t,this.bounds=s,this.type="did-update-layout",this.tag=v}evaluate(e){let t=this.manager,s=this.component,n=this.bounds
t.didUpdateLayout(s,n),e.env.didUpdate(s,t)}}let xt=function(e,t){console.info("Use `context`, and `get(<path>)` to debug this template."),t("this")}
class Et{constructor(e,t,s){this.scope=e,this.locals=a()
for(let n=0;n<s.length;n++){let i=s[n],r=t[i-1],a=e.getSymbol(i)
this.locals[r]=a}}get(e){let t=this.scope,s=this.locals,n=e.split(".")
var i=e.split(".")
let r,a=i[0],o=i.slice(1),l=t.getEvalScope()
return"this"===a?r=t.getSelf():s[a]?r=s[a]:0===a.indexOf("@")&&l[a]?r=l[a]:(r=this.scope.getSelf(),o=n),o.reduce((e,t)=>e.get(t),r)}}re.add(81,(e,{op1:t,op2:s})=>{let n=e.constants.getStringArray(t),i=e.constants.getArray(s),r=new Et(e.scope(),n,i)
xt(e.getSelf().value(),e=>r.get(e).value())}),re.add(79,(e,{op1:t,op2:s,op3:n})=>{let i=e.constants,r=e.constants.resolver,a=e.stack.pop().value(),o=i.getSerializable(t),l=i.getStringArray(s),h=i.getArray(n),c=r.lookupPartial(a,o)
var u=r.resolve(c).getPartial()
let p=u.symbolTable,d=u.handle
{let t=p.symbols,s=e.scope(),n=e.pushRootScope(t.length,!1),i=s.getEvalScope()
n.bindCallerScope(s.getCallerScope()),n.bindEvalScope(i),n.bindSelf(s.getSelf())
let r=Object.create(s.getPartialMap())
for(let e=0;e<h.length;e++){let t=h[e],n=l[t-1],i=s.getSymbol(t)
r[n]=i}if(i)for(let e=0;e<t.length;e++){let s=e+1,r=i[t[e]]
void 0!==r&&n.bind(s,r)}n.bindPartialMap(r),e.pushFrame(),e.call(d)}})
class _t{constructor(e){this.tag=e.tag,this.artifacts=e}value(){return!this.artifacts.isEmpty()}}re.add(54,e=>{let t=e.stack,s=t.pop(),n=t.pop(),i=e.env.iterableFor(s,n.value()),r=new P(i)
t.push(r),t.push(new _t(r.artifacts))}),re.add(52,(e,{op1:t})=>{e.enterList(t)}),re.add(53,e=>{e.exitList()}),re.add(55,(e,{op1:t})=>{let s=e.stack.peek().next()
if(s){let t=e.iterate(s.memo,s.value)
e.enterItem(s.key,t)}else e.goto(t)})
class Ct{constructor(e,t){this.element=e,this.nextSibling=t}}class At{constructor(e,t,s){this.parentNode=e,this.first=t,this.last=s}parentElement(){return this.parentNode}firstNode(){return this.first}lastNode(){return this.last}}class Nt{constructor(e,t){this.parentNode=e,this.node=t}parentElement(){return this.parentNode}firstNode(){return this.node}lastNode(){return this.node}}function Ot(e,t){return new Nt(e,t)}function Lt(e,t){let s=e.parentElement(),n=e.firstNode(),i=e.lastNode(),r=n
for(;r;){let e=r.nextSibling
if(s.insertBefore(r,t),r===i)return e
r=e}return null}function Tt(e){let t=e.parentElement(),s=e.firstNode(),n=e.lastNode(),i=s
for(;i;){let e=i.nextSibling
if(t.removeChild(i),i===n)return e
i=e}return null}const Mt="http://www.w3.org/2000/svg"
function Dt(e,t,s){if(!e)return t
if(!function(e,t){let s=e.createElementNS(t,"svg")
try{s.insertAdjacentHTML("beforeend","<circle></circle>")}catch(e){}finally{return 1!==s.childNodes.length||s.firstChild.namespaceURI!==Mt}}(e,s))return t
let n=e.createElement("div")
return class extends t{insertHTMLBefore(e,t,i){return null===i||""===i?super.insertHTMLBefore(e,t,i):e.namespaceURI!==s?super.insertHTMLBefore(e,t,i):function(e,t,s,n){let i="<svg>"+s+"</svg>"
t.innerHTML=i
var r=function(e,t,s){let n=e.firstChild,i=null,r=n
for(;r;)i=r,r=r.nextSibling,t.insertBefore(i,s)
return[n,i]}(t.firstChild,e,n)
let a=r[0],o=r[1]
return new At(e,a,o)}(e,n,i,t)}}}function Bt(e,t){return e&&function(e){let t=e.createElement("div")
if(t.innerHTML="first",t.insertAdjacentHTML("beforeend","second"),2===t.childNodes.length)return!1
return!0}(e)?class extends t{constructor(e){super(e),this.uselessComment=e.createComment("")}insertHTMLBefore(e,t,s){if(null===s)return super.insertHTMLBefore(e,t,s)
let n=!1,i=t?t.previousSibling:e.lastChild
i&&i instanceof Text&&(n=!0,e.insertBefore(this.uselessComment,t))
let r=super.insertHTMLBefore(e,t,s)
return n&&e.removeChild(this.uselessComment),r}}:t}const jt="http://www.w3.org/2000/svg",It={foreignObject:1,desc:1,title:1},Rt=Object.create(null);["b","big","blockquote","body","br","center","code","dd","div","dl","dt","em","embed","h1","h2","h3","h4","h5","h6","head","hr","i","img","li","listing","main","meta","nobr","ol","p","pre","ruby","s","small","span","strong","strike","sub","sup","table","tt","u","ul","var"].forEach(e=>Rt[e]=1)
let Pt="undefined"==typeof document?null:document
class Ft{constructor(e){this.document=e,this.setupUselessElement()}setupUselessElement(){this.uselessElement=this.document.createElement("div")}createElement(e,t){let s,n
if(t?(s=t.namespaceURI===jt||"svg"===e,n=It[t.tagName]):(s="svg"===e,n=!1),s&&!n){if(Rt[e])throw new Error(`Cannot create a ${e} inside an SVG context`)
return this.document.createElementNS(jt,e)}return this.document.createElement(e)}insertBefore(e,t,s){e.insertBefore(t,s)}insertHTMLBefore(e,t,s){return function(e,t,s,n){let i,r=t,a=s,o=a?a.previousSibling:r.lastChild
if(null===n||""===n)return new At(r,null,null)
null===a?(r.insertAdjacentHTML("beforeend",n),i=r.lastChild):a instanceof HTMLElement?(a.insertAdjacentHTML("beforebegin",n),i=a.previousSibling):(r.insertBefore(e,a),e.insertAdjacentHTML("beforebegin",n),i=e.previousSibling,r.removeChild(e))
let l=o?o.nextSibling:r.firstChild
return new At(r,l,i)}(this.uselessElement,e,t,s)}createTextNode(e){return this.document.createTextNode(e)}createComment(e){return this.document.createComment(e)}}var Ht;(function(e){class t extends Ft{createElementNS(e,t){return this.document.createElementNS(e,t)}setAttribute(e,t,s,n=null){n?e.setAttributeNS(n,t,s):e.setAttribute(t,s)}}e.TreeConstruction=t
let s=t
s=Bt(Pt,s),s=Dt(Pt,s,jt),e.DOMTreeConstruction=s})(Ht||(Ht={}))
let zt=class extends Ft{constructor(e){super(e),this.document=e,this.namespace=null}setAttribute(e,t,s){e.setAttribute(t,s)}removeAttribute(e,t){e.removeAttribute(t)}insertAfter(e,t,s){this.insertBefore(e,t,s.nextSibling)}}
zt=Bt(Pt,zt)
var Vt=zt=Dt(Pt,zt,jt)
const Ut=Ht.DOMTreeConstruction,$t=["javascript:","vbscript:"],Wt=["A","BODY","LINK","IMG","IFRAME","BASE","FORM"],Gt=["EMBED"],Yt=["href","src","background","action"],Xt=["src"]
function Kt(e,t){return-1!==e.indexOf(t)}function Jt(e,t){return(null===e||Kt(Wt,e))&&Kt(Yt,t)}function qt(e,t){return null!==e&&(Kt(Gt,e)&&Kt(Xt,t))}function Zt(e,t){return Jt(e,t)||qt(e,t)}function Qt(e,t,s,n){let i=null
if(null==n)return n
if(pt(n))return n.toHTML()
i=t?t.tagName.toUpperCase():null
let r=ct(n)
if(Jt(i,s)){let t=e.protocolForURL(r)
if(Kt($t,t))return`unsafe:${r}`}return qt(i,s)?`unsafe:${r}`:r}function es(e,t){let s,n
if(t in e)n=t,s="prop"
else{let i=t.toLowerCase()
i in e?(s="prop",n=i):(s="attr",n=t)}return"prop"!==s||"style"!==n.toLowerCase()&&!function(e,t){let s=ts[e.toUpperCase()]
return s&&s[t.toLowerCase()]||!1}(e.tagName,n)||(s="attr"),{normalized:n,type:s}}const ts={INPUT:{form:!0,autocorrect:!0,list:!0},SELECT:{form:!0},OPTION:{form:!0},TEXTAREA:{form:!0},LABEL:{form:!0},FIELDSET:{form:!0},LEGEND:{form:!0},OBJECT:{form:!0}}
function ss(e,t){let s=e.tagName
if(e.namespaceURI===jt)return ns(s,t)
var n=es(e,t)
let i=n.type,r=n.normalized
return"attr"===i?ns(s,r):function(e,t){if(Zt(e,t))return os
if(function(e,t){return("INPUT"===e||"TEXTAREA"===e)&&"value"===t}(e,t))return hs
if(function(e,t){return"OPTION"===e&&"selected"===t}(e,t))return cs
return as}(s,r)}function ns(e,t){return Zt(e,t)?ls:rs}class is{constructor(e){this.attribute=e}}class rs extends is{set(e,t,s){let n=us(t)
if(null!==n){var i=this.attribute
let t=i.name,s=i.namespace
e.__setAttribute(t,n,s)}}update(e,t){let s=us(e)
var n=this.attribute
let i=n.element,r=n.name
null===s?i.removeAttribute(r):i.setAttribute(r,s)}}class as extends is{set(e,t,s){if(null!=t){let s=this.attribute.name
this.value=t,e.__setProperty(s,t)}}update(e,t){var s=this.attribute
let n=s.element,i=s.name
this.value!==e&&(n[i]=this.value=e,null==e&&this.removeAttribute())}removeAttribute(){var e=this.attribute
let t=e.element,s=e.name,n=e.namespace
n?t.removeAttributeNS(n,s):t.removeAttribute(s)}}class os extends as{set(e,t,s){var n=this.attribute
let i=Qt(s,n.element,n.name,t)
super.set(e,i,s)}update(e,t){var s=this.attribute
let n=Qt(t,s.element,s.name,e)
super.update(n,t)}}class ls extends rs{set(e,t,s){var n=this.attribute
let i=Qt(s,n.element,n.name,t)
super.set(e,i,s)}update(e,t){var s=this.attribute
let n=Qt(t,s.element,s.name,e)
super.update(n,t)}}class hs extends as{set(e,t){e.__setProperty("value",ct(t))}update(e){let t=this.attribute.element,s=t.value,n=ct(e)
s!==n&&(t.value=n)}}class cs extends as{set(e,t){null!=t&&!1!==t&&e.__setProperty("selected",!0)}update(e){let t=this.attribute.element
t.selected=!!e}}function us(e){return!1===e||null==e||void 0===e.toString?null:!0===e?"":"function"==typeof e?null:String(e)}class ps{constructor(e,t,s,n){this.slots=e,this.callerScope=t,this.evalScope=s,this.partialMap=n}static root(e,t=0){let s=new Array(t+1)
for(let n=0;n<=t;n++)s[n]=pe
return new ps(s,null,null,null).init({self:e})}static sized(e=0){let t=new Array(e+1)
for(let s=0;s<=e;s++)t[s]=pe
return new ps(t,null,null,null)}init({self:e}){return this.slots[0]=e,this}getSelf(){return this.get(0)}getSymbol(e){return this.get(e)}getBlock(e){return this.get(e)}getEvalScope(){return this.evalScope}getPartialMap(){return this.partialMap}bind(e,t){this.set(e,t)}bindSelf(e){this.set(0,e)}bindSymbol(e,t){this.set(e,t)}bindBlock(e,t){this.set(e,t)}bindEvalScope(e){this.evalScope=e}bindPartialMap(e){this.partialMap=e}bindCallerScope(e){this.callerScope=e}getCallerScope(){return this.callerScope}child(){return new ps(this.slots.slice(),this.callerScope,this.evalScope,this.partialMap)}get(e){if(e>=this.slots.length)throw new RangeError(`BUG: cannot get $${e} from scope; length=${this.slots.length}`)
return this.slots[e]}set(e,t){if(e>=this.slots.length)throw new RangeError(`BUG: cannot get $${e} from scope; length=${this.slots.length}`)
this.slots[e]=t}}class ds{constructor(){this.scheduledInstallManagers=[],this.scheduledInstallModifiers=[],this.scheduledUpdateModifierManagers=[],this.scheduledUpdateModifiers=[],this.createdComponents=[],this.createdManagers=[],this.updatedComponents=[],this.updatedManagers=[],this.destructors=[]}didCreate(e,t){this.createdComponents.push(e),this.createdManagers.push(t)}didUpdate(e,t){this.updatedComponents.push(e),this.updatedManagers.push(t)}scheduleInstallModifier(e,t){this.scheduledInstallManagers.push(t),this.scheduledInstallModifiers.push(e)}scheduleUpdateModifier(e,t){this.scheduledUpdateModifierManagers.push(t),this.scheduledUpdateModifiers.push(e)}didDestroy(e){this.destructors.push(e)}commit(){let e=this.createdComponents,t=this.createdManagers
for(let h=0;h<e.length;h++){let s=e[h]
t[h].didCreate(s)}let s=this.updatedComponents,n=this.updatedManagers
for(let h=0;h<s.length;h++){let e=s[h]
n[h].didUpdate(e)}let i=this.destructors
for(let h=0;h<i.length;h++)i[h].destroy()
let r=this.scheduledInstallManagers,a=this.scheduledInstallModifiers
for(let h=0;h<r.length;h++){let e=r[h],t=a[h]
e.install(t)}let o=this.scheduledUpdateModifierManagers,l=this.scheduledUpdateModifiers
for(let h=0;h<o.length;h++){let e=o[h],t=l[h]
e.update(t)}}}class ms{constructor({appendOperations:e,updateOperations:t}){this._transaction=null,this.appendOperations=e,this.updateOperations=t}toConditionalReference(e){return new fe(e)}getAppendOperations(){return this.appendOperations}getDOM(){return this.updateOperations}getIdentity(e){return function(e){return e._guid||r(e)}(e)+""}begin(){this._transaction=new ds}get transaction(){return this._transaction}didCreate(e,t){this.transaction.didCreate(e,t)}didUpdate(e,t){this.transaction.didUpdate(e,t)}scheduleInstallModifier(e,t){this.transaction.scheduleInstallModifier(e,t)}scheduleUpdateModifier(e,t){this.transaction.scheduleUpdateModifier(e,t)}didDestroy(e){this.transaction.didDestroy(e)}commit(){let e=this.transaction
this._transaction=null,e.commit()}attributeFor(e,t,s,n=null){return ss(e,t)}}class gs{constructor(e,t,s,n,i=-1,r=-1){this.stack=e,this.heap=t,this.program=s,this.externs=n,this.pc=i,this.ra=r,this.currentOpSize=0}pushFrame(){this.stack.pushSmi(this.ra),this.stack.pushSmi(this.stack.fp),this.stack.fp=this.stack.sp-1}popFrame(){this.stack.sp=this.stack.fp-1,this.ra=this.stack.getSmi(0),this.stack.fp=this.stack.getSmi(1)}goto(e){let t=this.pc+e-this.currentOpSize
this.pc=t}call(e){this.ra=this.pc,this.pc=this.heap.getaddr(e)}returnTo(e){let t=this.pc+e-this.currentOpSize
this.ra=t}return(){this.pc=this.ra}nextStatement(){let e=this.pc,t=this.program
if(-1===e)return null
let s=this.program.opcode(e).size,n=this.currentOpSize=s
return this.pc+=n,t.opcode(e)}evaluateOuter(e,t){this.evaluateInner(e,t)}evaluateInner(e,t){e.isMachine?this.evaluateMachine(e):this.evaluateSyscall(e,t)}evaluateMachine(e){switch(e.type){case 47:return this.pushFrame()
case 48:return this.popFrame()
case 42:return this.call(e.op1)
case 41:return this.call(this.stack.popSmi())
case 44:return this.goto(e.op1)
case 20:return this.return()
case 21:return this.returnTo(e.op1)}}evaluateSyscall(e,t){re.evaluate(t,e,e.type)}}class fs{constructor(e){this.trusting=e}retry(e,t){let s=this.bounds,n=s.parentElement(),i=Tt(s),r=Es.forInitialRender(e,{element:n,nextSibling:i})
return this.trusting?r.__appendTrustingDynamicContent(t):r.__appendCautiousDynamicContent(t)}}class bs{constructor(e){this.inner=e,this.bounds=e.bounds}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}update(e,t){let s=this.inner=this.inner.update(e,t)
return this.bounds=s.bounds,this}}class vs extends fs{constructor(e,t,s){super(s),this.bounds=e,this.lastValue=t}update(e,t){let s,n=this.lastValue
if(t===n)return this
if(dt(t)||pt(t))return this.retry(e,t)
if((s=ut(t)?"":gt(t)?t:String(t))!==n){this.bounds.firstNode().nodeValue=this.lastValue=s}return this}}class ys extends fs{constructor(e,t,s){super(s),this.bounds=e,this.lastValue=t}update(e,t){return t===this.lastValue?this:this.retry(e,t)}}class ks extends fs{constructor(e,t,s){super(s),this.bounds=e,this.lastValue=t}update(e,t){let s=this.lastValue
return t===s?this:pt(t)&&t.toHTML()===s.toHTML()?(this.lastValue=t,this):this.retry(e,t)}}class ws extends fs{constructor(e,t,s){super(s),this.bounds=e,this.lastValue=t}update(e,t){let s=this.lastValue
return t===s?this:function(e){return ut(e)?"":gt(e)?e:pt(e)?e.toHTML():dt(e)?e:String(e)}(t)===s?this:this.retry(e,t)}}class Ss{constructor(e){this.node=e}firstNode(){return this.node}}class xs{constructor(e){this.node=e}lastNode(){return this.node}}class Es{constructor(e,t,s){this.constructing=null,this.operations=null,this.cursorStack=new o,this.blockStack=new o,this.pushElement(t,s),this.env=e,this.dom=e.getAppendOperations(),this.updateOperations=e.getDOM()}static forInitialRender(e,t){let s=new this(e,t.element,t.nextSibling)
return s.pushSimpleBlock(),s}static resume(e,t,s){let n=new this(e,t.parentElement(),s)
return n.pushSimpleBlock(),n.pushBlockTracker(t),n}get element(){return this.cursorStack.current.element}get nextSibling(){return this.cursorStack.current.nextSibling}expectConstructing(e){return this.constructing}block(){return this.blockStack.current}popElement(){this.cursorStack.pop(),this.cursorStack.current}pushSimpleBlock(){return this.pushBlockTracker(new _s(this.element))}pushUpdatableBlock(){return this.pushBlockTracker(new As(this.element))}pushBlockList(e){return this.pushBlockTracker(new Ns(this.element,e))}pushBlockTracker(e,t=!1){let s=this.blockStack.current
return null!==s&&(s.newDestroyable(e),t||s.didAppendBounds(e)),this.__openBlock(),this.blockStack.push(e),e}popBlock(){return this.block().finalize(this),this.__closeBlock(),this.blockStack.pop()}__openBlock(){}__closeBlock(){}openElement(e){let t=this.__openElement(e)
return this.constructing=t,t}__openElement(e){return this.dom.createElement(e,this.element)}flushElement(){let e=this.element,t=this.constructing
this.__flushElement(e,t),this.constructing=null,this.operations=null,this.pushElement(t,null),this.didOpenElement(t)}__flushElement(e,t){this.dom.insertBefore(e,t,this.nextSibling)}closeElement(){this.willCloseElement(),this.popElement()}pushRemoteElement(e,t,s=null){this.__pushRemoteElement(e,t,s)}__pushRemoteElement(e,t,s){this.pushElement(e,s)
let n=new Cs(e)
this.pushBlockTracker(n,!0)}popRemoteElement(){this.popBlock(),this.popElement()}pushElement(e,t){this.cursorStack.push(new Ct(e,t))}didAddDestroyable(e){this.block().newDestroyable(e)}didAppendBounds(e){return this.block().didAppendBounds(e),e}didAppendNode(e){return this.block().didAppendNode(e),e}didOpenElement(e){return this.block().openElement(e),e}willCloseElement(){this.block().closeElement()}appendText(e){return this.didAppendNode(this.__appendText(e))}__appendText(e){let t=this.dom,s=this.element,n=this.nextSibling,i=t.createTextNode(e)
return t.insertBefore(s,i,n),i}__appendNode(e){return this.dom.insertBefore(this.element,e,this.nextSibling),e}__appendFragment(e){let t=e.firstChild
if(t){let s=function(e,t,s){return new At(e,t,s)}(this.element,t,e.lastChild)
return this.dom.insertBefore(this.element,e,this.nextSibling),s}return Ot(this.element,this.__appendComment(""))}__appendHTML(e){return this.dom.insertHTMLBefore(this.element,this.nextSibling,e)}appendTrustingDynamicContent(e){let t=new bs(this.__appendTrustingDynamicContent(e))
return this.didAppendBounds(t),t}__appendTrustingDynamicContent(e){if(gt(e))return this.trustedContent(e)
if(ut(e))return this.trustedContent("")
if(pt(e))return this.trustedContent(e.toHTML())
if(mt(e)){let t=this.__appendFragment(e)
return new ys(t,e,!0)}if(dt(e)){let t=this.__appendNode(e)
return new ys(Ot(this.element,t),t,!0)}return this.trustedContent(String(e))}appendCautiousDynamicContent(e){let t=new bs(this.__appendCautiousDynamicContent(e))
return this.didAppendBounds(t.bounds),t}__appendCautiousDynamicContent(e){if(gt(e))return this.untrustedContent(e)
if(ut(e))return this.untrustedContent("")
if(mt(e)){let t=this.__appendFragment(e)
return new ys(t,e,!1)}if(dt(e)){let t=this.__appendNode(e)
return new ys(Ot(this.element,t),t,!1)}if(pt(e)){let t=e.toHTML(),s=this.__appendHTML(t)
return new ks(s,e,!1)}return this.untrustedContent(String(e))}trustedContent(e){let t=this.__appendHTML(e)
return new ws(t,e,!0)}untrustedContent(e){let t=this.__appendText(e),s=Ot(this.element,t)
return new vs(s,e,!1)}appendComment(e){return this.didAppendNode(this.__appendComment(e))}__appendComment(e){let t=this.dom,s=this.element,n=this.nextSibling,i=t.createComment(e)
return t.insertBefore(s,i,n),i}__setAttribute(e,t,s){this.dom.setAttribute(this.constructing,e,t,s)}__setProperty(e,t){this.constructing[e]=t}setStaticAttribute(e,t,s){this.__setAttribute(e,t,s)}setDynamicAttribute(e,t,s,n){let i=this.constructing,r=new(this.env.attributeFor(i,e,s,n))({element:i,name:e,namespace:n||null})
return r.set(this,t,this.env),r}}class _s{constructor(e){this.parent=e,this.first=null,this.last=null,this.destroyables=null,this.nesting=0}destroy(){let e=this.destroyables
if(e&&e.length)for(let t=0;t<e.length;t++)e[t].destroy()}parentElement(){return this.parent}firstNode(){return this.first&&this.first.firstNode()}lastNode(){return this.last&&this.last.lastNode()}openElement(e){this.didAppendNode(e),this.nesting++}closeElement(){this.nesting--}didAppendNode(e){0===this.nesting&&(this.first||(this.first=new Ss(e)),this.last=new xs(e))}didAppendBounds(e){0===this.nesting&&(this.first||(this.first=e),this.last=e)}newDestroyable(e){this.destroyables=this.destroyables||[],this.destroyables.push(e)}finalize(e){this.first||e.appendComment("")}}class Cs extends _s{destroy(){super.destroy(),Tt(this)}}class As extends _s{reset(e){let t=this.destroyables
if(t&&t.length)for(let n=0;n<t.length;n++)e.didDestroy(t[n])
let s=Tt(this)
return this.first=null,this.last=null,this.destroyables=null,this.nesting=0,s}}class Ns{constructor(e,t){this.parent=e,this.boundList=t,this.parent=e,this.boundList=t}destroy(){this.boundList.forEachNode(e=>e.destroy())}parentElement(){return this.parent}firstNode(){let e=this.boundList.head()
return e&&e.firstNode()}lastNode(){let e=this.boundList.tail()
return e&&e.lastNode()}openElement(e){}closeElement(){}didAppendNode(e){}didAppendBounds(e){}newDestroyable(e){}finalize(e){}}class Os{constructor(e=[]){this.vec=e}clone(){return new Os(this.vec.slice())}sliceFrom(e){return new Os(this.vec.slice(e))}slice(e,t){return new Os(this.vec.slice(e,t))}copy(e,t){this.vec[t]=this.vec[e]}writeRaw(e,t){this.vec[e]=t}writeSmi(e,t){var s
this.vec[e]=(s=t)<0?Math.abs(s)<<3|4:s<<3|0}getRaw(e){return this.vec[e]}getSmi(e){return function(e){switch(7&e){case 0:return e>>3
case 4:return-(e>>3)
default:throw new Error("unreachable")}}(this.vec[e])}reset(){this.vec.length=0}len(){return this.vec.length}}const Ls=2147483648,Ts=2147483647
class Ms{constructor(e=new Os,t=[]){this.inner=e,this.js=t}slice(e,t){let s
return s="number"==typeof e&&"number"==typeof t?this.inner.slice(e,t):"number"==typeof e&&void 0===t?this.inner.sliceFrom(e):this.inner.clone(),new Ms(s,this.js.slice(e,t))}sliceInner(e,t){let s=[]
for(let n=e;n<t;n++)s.push(this.get(n))
return s}copy(e,t){this.inner.copy(e,t)}write(e,t){if(function(e){let t=typeof e
if(null==e)return!0
switch(t){case"boolean":case"undefined":return!0
case"number":if(e%1!=0)return!1
let s=Math.abs(e)
return!(s&Ls)
default:return!1}}(t))this.inner.writeRaw(e,Bs(t))
else{let s=this.js.length
this.js.push(t),this.inner.writeRaw(e,s|Ls)}}writeSmi(e,t){this.inner.writeSmi(e,t)}writeImmediate(e,t){this.inner.writeRaw(e,t)}get(t){let s=this.inner.getRaw(t)
return s&Ls?this.js[s&Ts]:function(t){switch(t){case 3:return!1
case 11:return!0
case 19:return null
case 27:return
default:return function(t){switch(7&t){case 0:return t>>3
case 4:return-(t>>3)
default:throw e()}}(t)}}(s)}getSmi(e){return this.inner.getSmi(e)}reset(){this.inner.reset()}get length(){return this.inner.len()}}class Ds{constructor(e,t,s){this.stack=e,this.fp=t,this.sp=s}static empty(){return new this(new Ms,0,-1)}static restore(e){let t=new Ms
for(let s=0;s<e.length;s++)t.write(s,e[s])
return new this(t,0,e.length-1)}push(e){this.stack.write(++this.sp,e)}pushSmi(e){this.stack.writeSmi(++this.sp,e)}pushImmediate(e){this.stack.writeImmediate(++this.sp,Bs(e))}pushEncodedImmediate(e){this.stack.writeImmediate(++this.sp,e)}pushNull(){this.stack.writeImmediate(++this.sp,19)}dup(e=this.sp){this.stack.copy(e,++this.sp)}copy(e,t){this.stack.copy(e,t)}pop(e=1){let t=this.stack.get(this.sp)
return this.sp-=e,t}popSmi(){return this.stack.getSmi(this.sp--)}peek(e=0){return this.stack.get(this.sp-e)}peekSmi(e=0){return this.stack.getSmi(this.sp-e)}get(e,t=this.fp){return this.stack.get(t+e)}getSmi(e,t=this.fp){return this.stack.getSmi(t+e)}set(e,t,s=this.fp){this.stack.write(s+t,e)}slice(e,t){return this.stack.slice(e,t)}sliceArray(e,t){return this.stack.sliceInner(e,t)}capture(e){let t=this.sp+1,s=t-e
return this.stack.sliceInner(s,t)}reset(){this.stack.reset()}toArray(){return this.stack.sliceInner(this.fp,this.sp+1)}}function Bs(t){switch(typeof t){case"number":return function(e){return e<0?Math.abs(e)<<3|4:e<<3|0}(t)
case"boolean":return t?11:3
case"object":return 19
case"undefined":return 27
default:throw e()}}class js{constructor(e,t,{alwaysRevalidate:s=!1}){this.frameStack=new o,this.env=e,this.constants=t.constants,this.dom=e.getDOM(),this.alwaysRevalidate=s}execute(e,t){let s=this.frameStack
for(this.try(e,t);!s.isEmpty();){let e=this.frame.nextStatement()
null!==e?e.evaluate(this):this.frameStack.pop()}}get frame(){return this.frameStack.current}goto(e){this.frame.goto(e)}try(e,t){this.frameStack.push(new Hs(e,t))}throw(){this.frame.handleException(),this.frameStack.pop()}}class Is extends oe{constructor(e,t,s,n){super(),this.start=e,this.state=t,this.type="block",this.next=null,this.prev=null,this.children=n,this.bounds=s}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}evaluate(e){e.try(this.children,null)}destroy(){this.bounds.destroy()}didDestroy(){this.state.env.didDestroy(this.bounds)}}class Rs extends Is{constructor(e,t,s,n){super(e,t,s,n),this.type="try",this.tag=this._tag=T.create(v)}didInitializeChildren(){this._tag.inner.update(_(this.children))}evaluate(e){e.try(this.children,this)}handleException(){let e=this.state,t=this.bounds,s=this.children,n=this.start,i=this.prev,r=this.next
s.clear()
let a=Es.resume(e.env,t,t.reset(e.env)),o=Vs.resume(e,a),l=new h
o.execute(n,t=>{t.stack=Ds.restore(e.stack),t.updatingOpcodeStack.push(l),t.updateWith(this),t.updatingOpcodeStack.push(s)}),this.prev=i,this.next=r}}class Ps{constructor(e,t){this.opcode=e,this.marker=t,this.didInsert=!1,this.didDelete=!1,this.map=e.map,this.updating=e.children}insert(e,t,s,n){let i=this.map,r=this.opcode,a=this.updating,o=null,l=null
o=n?(l=i[n]).bounds.firstNode():this.marker
let c=r.vmForInsertion(o),u=null,p=r.start
c.execute(p,n=>{i[e]=u=n.iterate(s,t),n.updatingOpcodeStack.push(new h),n.updateWith(u),n.updatingOpcodeStack.push(u.children)}),a.insertBefore(u,l),this.didInsert=!0}retain(e,t,s){}move(e,t,s,n){let i=this.map,r=this.updating,a=i[e],o=i[n]||null
Lt(a,n?o.firstNode():this.marker),r.remove(a),r.insertBefore(a,o)}delete(e){let t=this.map,s=t[e]
s.didDestroy(),Tt(s),this.updating.remove(s),delete t[e],this.didDelete=!0}done(){this.opcode.didInitializeChildren(this.didInsert||this.didDelete)}}class Fs extends Is{constructor(e,t,s,n,i){super(e,t,s,n),this.type="list-block",this.map=a(),this.lastIterated=p,this.artifacts=i
let r=this._tag=T.create(v)
this.tag=C([i.tag,r])}didInitializeChildren(e=!0){this.lastIterated=this.artifacts.tag.value(),e&&this._tag.inner.update(_(this.children))}evaluate(e){let t=this.artifacts,s=this.lastIterated
if(!t.tag.validate(s)){let s=this.bounds,n=e.dom,i=n.createComment("")
n.insertAfter(s.parentElement(),i,s.lastNode())
let r=new Ps(this,i)
new H({target:r,artifacts:t}).sync(),this.parentElement().removeChild(i)}super.evaluate(e)}vmForInsertion(e){let t=this.bounds,s=this.state,n=Es.forInitialRender(s.env,{element:t.parentElement(),nextSibling:e})
return Vs.resume(s,n)}}class Hs{constructor(e,t){this.ops=e,this.exceptionHandler=t,this.current=e.head()}goto(e){this.current=e}nextStatement(){let e=this.current,t=this.ops
return e&&(this.current=t.nextNode(e)),e}handleException(){this.exceptionHandler&&this.exceptionHandler.handleException()}}class zs{constructor(e,t,s,n){this.env=e,this.program=t,this.updating=s,this.bounds=n}rerender({alwaysRevalidate:e=!1}={alwaysRevalidate:!1}){let t=this.env,s=this.program,n=this.updating
new js(t,s,{alwaysRevalidate:e}).execute(n,this)}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}handleException(){throw"this should never happen"}destroy(){this.bounds.destroy(),Tt(this.bounds)}}class Vs{constructor(e,t,s,n,i){this.program=e,this.env=t,this.elementStack=i,this.dynamicScopeStack=new o,this.scopeStack=new o,this.updatingOpcodeStack=new o,this.cacheGroups=new o,this.listBlockStack=new o,this.s0=null,this.s1=null,this.t0=null,this.t1=null,this.v0=null,this.env=t,this.heap=e.heap,this.constants=e.constants,this.elementStack=i,this.scopeStack.push(s),this.dynamicScopeStack.push(n),this.inner=new gs(Ds.empty(),this.heap,e,{debugBefore:e=>re.debugBefore(this,e,e.type),debugAfter:(e,t)=>{re.debugAfter(this,e,e.type,t)}})}get stack(){return this.inner.stack}set stack(e){this.inner.stack=e}set currentOpSize(e){this.inner.currentOpSize=e}get currentOpSize(){return this.inner.currentOpSize}get pc(){return this.inner.pc}set pc(e){this.inner.pc=e}get ra(){return this.inner.ra}set ra(e){this.inner.ra=e}get fp(){return this.stack.fp}set fp(e){this.stack.fp=e}get sp(){return this.stack.sp}set sp(e){this.stack.sp=e}fetch(e){this.stack.push(this[le[e]])}load(e){this[le[e]]=this.stack.pop()}fetchValue(e){return this[le[e]]}loadValue(e,t){this[le[e]]=t}pushFrame(){this.inner.pushFrame()}popFrame(){this.inner.popFrame()}goto(e){this.inner.goto(e)}call(e){this.inner.call(e)}returnTo(e){this.inner.returnTo(e)}return(){this.inner.return()}static initial(e,t,s,n,i,r,a){let o=e.heap.scopesizeof(a),l=ps.root(s,o),c=new Vs(e,t,l,i,r)
return c.pc=c.heap.getaddr(a),c.updatingOpcodeStack.push(new h),c}static empty(e,t,s){let n={get:()=>pe,set:()=>pe,child:()=>n},i=new Vs(e,t,ps.root(pe,0),n,s)
return i.updatingOpcodeStack.push(new h),i}static resume({program:e,env:t,scope:s,dynamicScope:n},i){return new Vs(e,t,s,n,i)}capture(e){return{env:this.env,program:this.program,dynamicScope:this.dynamicScope(),scope:this.scope(),stack:this.stack.capture(e)}}beginCacheGroup(){this.cacheGroups.push(this.updating().tail())}commitCacheGroup(){let e=new rt("END"),t=this.updating(),s=this.cacheGroups.pop(),n=s?t.nextNode(s):t.head(),i=t.tail(),r=_(new c(n,i)),a=new nt(r,e)
t.insertBefore(a,n),t.append(new it(a)),t.append(e)}enter(e){let t=new h,s=this.capture(e),n=this.elements().pushUpdatableBlock(),i=new Rs(this.heap.gethandle(this.pc),s,n,t)
this.didEnter(i)}iterate(e,t){let s=this.stack
s.push(t),s.push(e)
let n=this.capture(2),i=this.elements().pushUpdatableBlock()
return new Rs(this.heap.gethandle(this.pc),n,i,new h)}enterItem(e,t){this.listBlock().map[e]=t,this.didEnter(t)}enterList(e){let t=new h,s=this.capture(0),n=this.elements().pushBlockList(t),i=this.stack.peek().artifacts,r=this.pc+e-this.currentOpSize,a=this.heap.gethandle(r),o=new Fs(a,s,n,t,i)
this.listBlockStack.push(o),this.didEnter(o)}didEnter(e){this.updateWith(e),this.updatingOpcodeStack.push(e.children)}exit(){this.elements().popBlock(),this.updatingOpcodeStack.pop(),this.updating().tail().didInitializeChildren()}exitList(){this.exit(),this.listBlockStack.pop()}updateWith(e){this.updating().append(e)}listBlock(){return this.listBlockStack.current}updating(){return this.updatingOpcodeStack.current}elements(){return this.elementStack}scope(){return this.scopeStack.current}dynamicScope(){return this.dynamicScopeStack.current}pushChildScope(){this.scopeStack.push(this.scope().child())}pushDynamicScope(){let e=this.dynamicScope().child()
return this.dynamicScopeStack.push(e),e}pushRootScope(e,t){let s=ps.sized(e)
return t&&s.bindCallerScope(this.scope()),this.scopeStack.push(s),s}pushScope(e){this.scopeStack.push(e)}popScope(){this.scopeStack.pop()}popDynamicScope(){this.dynamicScopeStack.pop()}newDestroyable(e){this.elements().didAddDestroyable(e)}getSelf(){return this.scope().getSelf()}referenceForSymbol(e){return this.scope().getSymbol(e)}execute(e,t){let s
for(this.pc=this.heap.getaddr(e),t&&t(this);!(s=this.next()).done;);return s.value}next(){let e,t=this.env,s=this.program,n=this.updatingOpcodeStack,i=this.elementStack,r=this.inner.nextStatement()
return null!==r?(this.inner.evaluateOuter(r,this),e={done:!1,value:null}):(this.stack.reset(),e={done:!0,value:new zs(t,s,n.pop(),i.popBlock())}),e}bindDynamicScope(e){let t=this.dynamicScope()
for(let s=e.length-1;s>=0;s--){let n=this.constants.getString(e[s])
t.set(n,this.stack.pop())}}}class Us{constructor(e){this.vm=e}next(){return this.vm.next()}}let $s=0
class Ws{constructor(e,t){this.options=e,this.parsedLayout=t,this.layout=null,this.partial=null
let s=t.block
this.symbols=s.symbols,this.hasEval=s.hasEval,this.statements=s.statements,this.referrer=t.referrer,this.id=t.id||`client-${$s++}`}renderLayout(e){let t=e.env,s=e.self,n=e.dynamicScope
var i=e.args
let r=void 0===i?Je:i,a=e.builder,o=this.asLayout().compile(),l=Vs.initial(this.options.program,t,s,r,n,a,o)
return new Us(l)}asLayout(){return this.layout?this.layout:this.layout=Gs(this.parsedLayout,this.options,!1)}asPartial(){return this.partial?this.partial:this.partial=Gs(this.parsedLayout,this.options,!0)}}function Gs(e,t,s){let i=e.block,r=e.referrer,a=i.hasEval,o=i.symbols,l=n({},t,{asPartial:s,referrer:r})
return new je(i.statements,e,l,{referrer:r,hasEval:a,symbols:o})}class Ys{get(e){return Js.create(this,e)}}class Xs extends Ys{constructor(){super(...arguments),this._lastRevision=null,this._lastValue=null}value(){let e=this.tag,t=this._lastRevision,s=this._lastValue
return t&&e.validate(t)||(s=this._lastValue=this.compute(),this._lastRevision=e.value()),s}}class Ks extends j{constructor(){super(...arguments),this.children=a()}get(e){let t=this.children[e]
return t||(t=this.children[e]=new qs(this.inner,e)),t}}class Js extends Xs{static create(e,t){return k(e)?new qs(e.value(),t):new Zs(e,t)}get(e){return new Zs(this,e)}}class qs extends Js{constructor(e,t){super(),this._parentValue=e,this._propertyKey=t,this.tag=K(e,t)}compute(){return this._parentValue[this._propertyKey]}}class Zs extends Js{constructor(e,t){super()
let s=e.tag,n=T.create(v)
this._parentReference=e,this._parentObjectTag=n,this._propertyKey=t,this.tag=C([s,n])}compute(){let e=this._parentReference,t=this._parentObjectTag,s=this._propertyKey,n=e.value()
return t.inner.update(K(n,s)),"string"==typeof n&&"length"===s?n.length:"object"==typeof n&&n?n[s]:void 0}}class Qs extends Ys{constructor(e){super(),this.tag=x.create(),this._value=e}value(){return this._value}update(e){e!==this._value&&(this.tag.inner.dirty(),this._value=e)}}class en{constructor(e,t,s){let n=e.ComponentClass,i=e.name
this.args=t
let r={debugName:i,args:this.namedArgsSnapshot()}
ne(r,s),n&&(this.component=n.create(r))}get tag(){return this.args.tag}namedArgsSnapshot(){return Object.freeze(this.args.named.value())}}const tn=new Ks(null)
class sn{static create(e){return new sn(e)}constructor(e){this.env=e.env}prepareArgs(e,t){return null}getCapabilities(e){return e.capabilities}getLayout({name:e,handle:t,symbolTable:s},n){return t&&s?{handle:t,symbolTable:s}:n.compileTemplate(e,t)}create(e,t,s,n,i,r){if(t.ComponentClass){let e=se(this.env)
return new en(t,s.capture(),e)}}getSelf(e){return e?new Ks(e.component):tn}didCreateElement(e,t){}didRenderLayout(e,t){e&&(e.component.bounds=new ie(t))}didCreate(e){e&&e.component.didInsertElement()}getTag(e){return e?e.tag:v}update(e,t){e&&(e.component.args=e.namedArgsSnapshot())}didUpdateLayout(){}didUpdate(e){e&&e.component.didUpdate()}getDestructor(e){return e?e.component:nn}}const nn={destroy(){}}
class rn{constructor(e,t){this._registry=e,this._resolver=t}register(e,t,s){let n=this._toAbsoluteSpecifier(e)
this._registry.register(n,t,s)}registration(e){let t=this._toAbsoluteSpecifier(e)
return this._registry.registration(t)}unregister(e){let t=this._toAbsoluteSpecifier(e)
this._registry.unregister(t)}registerOption(e,t,s){let n=this._toAbsoluteOrTypeSpecifier(e)
this._registry.registerOption(n,t,s)}registeredOption(e,t){let s=this._toAbsoluteOrTypeSpecifier(e)
return this._registry.registeredOption(s,t)}registeredOptions(e){let t=this._toAbsoluteOrTypeSpecifier(e)
return this._registry.registeredOptions(t)}unregisterOption(e,t){let s=this._toAbsoluteOrTypeSpecifier(e)
this._registry.unregisterOption(s,t)}registerInjection(e,t,s){let n=this._toAbsoluteOrTypeSpecifier(e),i=this._toAbsoluteSpecifier(s)
this._registry.registerInjection(n,t,i)}registeredInjections(e){let t=this._toAbsoluteOrTypeSpecifier(e)
return this._registry.registeredInjections(t)}_toAbsoluteSpecifier(e,t){return this._resolver.identify(e,t)}_toAbsoluteOrTypeSpecifier(e){return function(e){return-1===e.indexOf(":")}(e)?e:this._toAbsoluteSpecifier(e)}}class an{constructor(e=null){this.bucket=e?n({},e):{}}get(e){return this.bucket[e]}set(e,t){return this.bucket[e]=t}child(){return new an(this.bucket)}}class on{constructor(e,t){this.position=0,this.array=e,this.keyFor=t}isEmpty(){return 0===this.array.length}next(){let e=this.position,t=this.array,s=this.keyFor
if(e>=t.length)return null
let n=t[e],i=s(n,e),r=e
return this.position++,{key:i,value:n,memo:r}}}class ln{constructor(e,t,s){this.position=0,this.keys=e,this.values=t,this.keyFor=s}isEmpty(){return 0===this.keys.length}next(){let e=this.position,t=this.keys,s=this.values,n=this.keyFor
if(e>=t.length)return null
let i=s[e],r=t[e],a=n(i,r)
return this.position++,{key:a,value:i,memo:r}}}const hn=new class{isEmpty(){return!0}next(){throw new Error("Cannot call next() on an empty iterator")}}
class cn{constructor(e,t){this.tag=e.tag,this.ref=e,this.keyFor=t}iterate(){let e=this.ref,t=this.keyFor,s=e.value()
if(Array.isArray(s))return s.length>0?new on(s,t):hn
if(null==s)return hn
if(void 0!==s.forEach){let e=[]
return s.forEach(function(t){e.push(t)}),e.length>0?new on(e,t):hn}if("object"==typeof s){let e=Object.keys(s)
return e.length>0?new ln(e,e.map(e=>s[e]),t):hn}throw new Error(`Don't know how to {{#each ${s}}}`)}valueReferenceFor(e){return new Qs(e.value)}updateValueReference(e,t){e.update(t.value)}memoReferenceFor(e){return new Qs(e.memo)}updateMemoReference(e,t){e.update(t.memo)}}class un extends ms{static create(e={}){return e.document=e.document||self.document,e.appendOperations=e.appendOperations||new Ut(e.document),new un(e)}constructor(e){super({appendOperations:e.appendOperations,updateOperations:new Vt(e.document||document)}),ne(this,se(e)),this.uselessAnchor=e.document.createElement("a")}protocolForURL(e){return this.uselessAnchor.href=e,this.uselessAnchor.protocol}iterableFor(e,t){let s
if(!t)throw new Error("Must specify a key for #each")
switch(t){case"@index":s=((e,t)=>String(t))
break
case"@primitive":s=(e=>String(e))
break
default:s=(e=>e[t])}return new cn(e,s)}}const pn="object"==typeof document?document:null
class dn{constructor(e){this._roots=[],this._rootsIndex=0,this._initializers=[],this._initialized=!1,this._rendering=!1,this._rendered=!1,this._scheduled=!1,this._notifiers=[],this.rootName=e.rootName,this.resolver=e.resolver,t(e.loader,"Must provide a Loader for preparing templates and other metadata required for a Glimmer Application."),t(e.renderer,"Must provide a Renderer to render the templates produced by the Loader."),t(e.builder,"Must provide a Builder that is responsible to building DOM."),this.document=e.document||pn,this.loader=e.loader,this.renderer=e.renderer,this.builder=e.builder}renderComponent(e,t,s=null){let n=this._roots,i=this._self
n.push({id:this._rootsIndex++,component:e,parent:t,nextSibling:s}),i&&(i.update({roots:n}),this.scheduleRerender())}async boot(){this.initialize(),this.env=this.lookup(`environment:/${this.rootName}/main/main`),await this._render()}scheduleRerender(){!this._scheduled&&this._rendered&&(this._rendering=!0,this._scheduled=!0,setTimeout(()=>{this._scheduled=!1,this._rerender(),this._rendering=!1},0))}initialize(){this.initRegistry(),this.initContainer()}registerInitializer(e){this._initializers.push(e)}initRegistry(){let e=this._registry=new ee,t=new rn(this._registry,this.resolver)
e.register(`environment:/${this.rootName}/main/main`,un),e.registerOption("helper","instantiate",!1),e.registerOption("template","instantiate",!1),e.register(`document:/${this.rootName}/main/main`,this.document),e.registerOption("document","instantiate",!1),e.registerInjection("environment","document",`document:/${this.rootName}/main/main`),e.registerInjection("component-manager","env",`environment:/${this.rootName}/main/main`)
let s=this._initializers
for(let n=0;n<s.length;n++)s[n].initialize(t)
this._initialized=!0}initContainer(){this._container=new Q(this._registry,this.resolver),this._container.defaultInjections=(e=>{let t={}
return ne(t,this),t})}async _render(){let e=this.env,t=this._self=new Qs({roots:this._roots}),s=new an,n=this.builder.getBuilder(e),i=await this.loader.getTemplateIterator(this,e,n,s,t)
try{e.begin(),await this.renderer.render(i),e.commit(),this._didRender()}catch(e){throw this._didError(e),e}}async _rerender(){let e=this.env
try{e.begin(),await this.renderer.rerender(),e.commit(),this._didRender()}catch(e){throw this._didError(e),e}}_didRender(){this._rendered=!0
let e=this._notifiers
this._notifiers=[],e.forEach(e=>e[0]())}_didError(e){let t=this._notifiers
this._notifiers=[],t.forEach(t=>t[1](e))}identify(e,t){return this.resolver.identify(e,t)}factoryFor(e,t){return this._container.factoryFor(this.identify(e,t))}lookup(e,t){return this._container.lookup(this.identify(e,t))}}class mn{constructor(){this.byName=a(),this.byHandle=a()}hasName(e){return e in this.byName}getHandle(e){return this.byName[e]}hasHandle(e){return e in this.byHandle}getByHandle(e){return this.byHandle[e]}register(e,t,s){this.byHandle[e]=s,this.byName[t]=e}}class gn{constructor(e,t){this.helper=e,this.tag=t.tag,this.args=t.capture()}value(){let e=this.helper,t=this.args
return e(t.positional.value(),t.named.value())}get(){return new Ks(this)}}class fn{constructor(e){this.owner=e,this.handleLookup=[],this.cache={component:new mn,template:new mn,compiledTemplate:new mn,helper:new mn,manager:new mn,modifier:new mn}}setCompileOptions(e){this.templateOptions=e}lookup(e,t,s){return this.cache[e].hasName(t)?this.cache[e].getHandle(t):null}register(e,t,s){let n=this.cache[e],i=this.handleLookup.length
return this.handleLookup.push(n),this.cache[e].register(i,t,s),i}lookupModifier(e,t){let s=this.lookup("modifier",e)
if(null===s)throw new Error(`Modifier for ${e} not found.`)
return s}compileTemplate(e,t){if(!this.cache.compiledTemplate.hasName(e)){let s=this.resolve(t),n=s.block,i=s.meta,r=s.id,a=JSON.parse(n),o=new Ws(this.templateOptions,{id:r,block:a,referrer:i}).asLayout(),l={handle:o.compile(),symbolTable:o.symbolTable}
return this.register("compiledTemplate",e,l),l}let s=this.lookup("compiledTemplate",e)
return this.resolve(s)}registerHelper(e,t){return this.register("helper",e,(e,s)=>new gn(t,s))}registerInternalHelper(e,t){this.register("helper",e,t)}registerComponent(e,t,s,n){let i=this.registerTemplate(t,n),r=this.managerFor(i.meta.managerId),a=new Z(e,r,s,i.handle)
return this.register("component",e,a)}lookupComponentHandle(e,t){return this.cache.component.hasName(e)||this.lookupComponent(e,t),this.lookup("component",e,t)}managerFor(e="main"){let t
if(this.cache.manager.hasName(e)){let t=this.cache.manager.getHandle(e)
return this.cache.manager.getByHandle(t)}{let s=this.owner.rootName
if(!(t=this.owner.lookup(`component-manager:/${s}/component-managers/${e}`)))throw new Error(`No component manager found for ID ${e}.`)
return this.register("manager",e,t),t}}registerTemplate(e,t){return{name:e,handle:this.register("template",e,t),meta:t.meta}}lookupComponent(e,t){let s
if(this.cache.component.hasName(e))s=this.lookup("component",e,t)
else{let n=function(e,t){if(null==e)throw new Error(t)
return e}(this.identifyComponent(e,t),`Could not find the component '${e}'`),i=this.owner.lookup("template",n),r=this.owner.identify("component",n),a=null
void 0!==r&&(a=this.owner.factoryFor(r)),s=this.registerComponent(e,n,a,i)}return this.resolve(s)}lookupHelper(e,t){if(!this.cache.helper.hasName(e)){let s=this.owner,n=`helper:${e}`,i=t.specifier,r=s.identify(n,i)
if(void 0===r)return null
let a=this.owner.lookup(r,t.specifier)
return this.registerHelper(e,a)}return this.lookup("helper",e,t)}lookupPartial(e,t){throw new Error("Partials are not available in Glimmer applications.")}resolve(e){return this.handleLookup[e].getByHandle(e)}identifyComponent(e,t){let s=this.owner,n=`template:${e}`,i=t.specifier,r=s.identify(n,i)
if(void 0===r&&s.identify(`component:${e}`,i))throw new Error(`The component '${e}' is missing a template. All components must have a template. Make sure there is a template.hbs in the component directory.`)
return r}}const bn={},vn=0,yn=Object.freeze([])
class kn{constructor(){this.strings=[],this.arrays=[yn],this.tables=[],this.handles=[],this.resolved=[],this.floats=[],this.negatives=[]}float(e){let t=this.floats.indexOf(e)
return t>-1?t:this.floats.push(e)-1}negative(e){return this.negatives.push(e)-1}string(e){let t=this.strings.indexOf(e)
return t>-1?t:this.strings.push(e)-1}stringArray(e){let t=new Array(e.length)
for(let s=0;s<e.length;s++)t[s]=this.string(e[s])
return this.array(t)}array(e){if(0===e.length)return vn
let t=this.arrays.indexOf(e)
return t>-1?t:this.arrays.push(e)-1}handle(e){let t=this.handles.indexOf(e)
return t>-1?t:(this.resolved.push(bn),this.handles.push(e)-1)}serializable(e){let t=JSON.stringify(e),s=this.strings.indexOf(t)
return s>-1?s:this.strings.push(t)-1}toPool(){return{strings:this.strings,arrays:this.arrays,handles:this.handles,floats:this.floats,negatives:this.negatives}}}class wn extends kn{constructor(e,t){super(),this.resolver=e,t&&(this.strings=t.strings,this.arrays=t.arrays,this.handles=t.handles,this.floats=t.floats,this.negatives=t.negatives,this.resolved=this.handles.map(()=>bn))}getFloat(e){return this.floats[e]}getNegative(e){return this.negatives[e]}getString(e){return this.strings[e]}getStringArray(e){let t=this.getArray(e),s=new Array(t.length)
for(let n=0;n<t.length;n++){let e=t[n]
s[n]=this.getString(e)}return s}getArray(e){return this.arrays[e]}resolveHandle(e){let t=this.resolved[e]
if(t===bn){let s=this.handles[e]
t=this.resolved[e]=this.resolver.resolve(s)}return t}getSerializable(e){return JSON.parse(this.strings[e])}}class Sn extends wn{constructor(){super(...arguments),this.others=[],this.serializables=[]}serializable(e){let t=this.serializables.indexOf(e)
return t>-1?t:this.serializables.push(e)-1}getSerializable(e){return this.serializables[e]}getOther(e){return this.others[e-1]}other(e){return this.others.push(e)}}class xn{constructor(e){this.heap=e,this.offset=0}get size(){return 1+((768&this.heap.getbyaddr(this.offset))>>8)}get isMachine(){return 1024&this.heap.getbyaddr(this.offset)}get type(){return 255&this.heap.getbyaddr(this.offset)}get op1(){return this.heap.getbyaddr(this.offset+1)}get op2(){return this.heap.getbyaddr(this.offset+2)}get op3(){return this.heap.getbyaddr(this.offset+3)}}function En(e,t,s){return e|t<<16|s<<30}function _n(e,t){return e|t<<30}class Cn{constructor(e){if(this.placeholders=[],this.offset=0,this.handle=0,e){let t=e.buffer,s=e.table,n=e.handle
this.heap=new Uint16Array(t),this.table=s,this.offset=this.heap.length,this.handle=n}else this.heap=new Uint16Array(1048576),this.table=[]}push(e){this.heap[this.offset++]=e}getbyaddr(e){return this.heap[e]}setbyaddr(e,t){this.heap[e]=t}malloc(){this.table.push(this.offset,0)
let e=this.handle
return this.handle+=2,e}finishMalloc(e,t){let s=this.table[e],n=En(this.offset-s,t,0)
this.table[e+1]=n}size(){return this.offset}getaddr(e){return this.table[e]}gethandle(e){this.table.push(e,En(0,0,3))
let t=this.handle
return this.handle+=2,t}sizeof(e){return-1}scopesizeof(e){return(1073676288&this.table[e+1])>>16}free(e){let t=this.table[e+1]
this.table[e+1]=_n(t,1)}compact(){let e=0,t=this.table,s=this.table.length,n=this.heap
for(let i=0;i<s;i+=2){let s=t[i],r=t[i+1],a=65535&r,o=-1&r
if(2!==o)if(1===o)t[i+1]=_n(r,2),e+=a
else if(0===o){for(let t=s;t<=i+a;t++)n[t-e]=n[t]
t[i]=s-e}else 3===o&&(t[i]=s-e)}this.offset=this.offset-e}pushPlaceholder(e){let t=this.offset++
this.heap[t]=65535,this.placeholders.push([t,e])}patchPlaceholders(){let e=this.placeholders
for(let s=0;s<e.length;s++){var t=e[s]
let n=t[0],i=t[1]
this.setbyaddr(n,i())}}capture(){this.patchPlaceholders()
let e=function(e,t,s){if(e instanceof Uint16Array){if(void 0!==e.slice)return e.slice(t,s).buffer
let n=new Uint16Array(s)
for(;t<s;t++)n[t]=e[t]
return n.buffer}return null}(this.heap,0,this.offset)
return{handle:this.handle,table:this.table,buffer:e}}}class An{constructor(e=new kn,t=new Cn){this.constants=e,this.heap=t,this._opcode=new xn(this.heap)}opcode(e){return this._opcode.offset=e,this._opcode}}class Nn extends An{}var On={id:"j7SGa6Pm",block:'{"symbols":["root"],"statements":[[4,"each",[[22,["roots"]]],[["key"],["id"]],{"statements":[[4,"in-element",[[21,1,["parent"]]],[["guid","nextSibling"],["%cursor:0%",[21,1,["nextSibling"]]]],{"statements":[[1,[26,"component",[[21,1,["component"]]],null],false]],"parameters":[]},null]],"parameters":[1]},null]],"hasEval":false}',meta:{specifier:"template:/-application/application/src/templates/main"}}
function Ln(e,t){let s=e.getSelf(),n=t.capture(),i=n.positional.at(0).value()
return"function"!=typeof i&&function(e,t){let s=function(e){let t,s,n=""
if(null==e)return n
"parent"in e&&"property"in e?(t=e.parent.value(),s=e.property):"_parentValue"in e&&"_propertyKey"in e&&(t=e._parentValue,s=e._propertyKey)
void 0!==s&&(n+=`('${s}' on ${function(e){let t=typeof e
if(null==e)return t
if("number"===t||"boolean"===t)return e.toString()
if(e.debugName)return e.debugName
try{return JSON.stringify(e)}catch(e){}return e.toString()}(t)}) `)
return n}(t)
throw new Error(`You tried to create an action with the {{action}} helper, but the first argument ${s}was ${typeof e} instead of a function.`)}(i,n.positional.at(0)),new Qs(function(...e){let t=n.positional.value()
t.shift(),t.push(...e),i.apply(s&&s.value(),t)})}function Tn(e){return e[0]?e[1]:e[2]}class Mn{constructor(e){this.resolver=e}getComponentDefinition(e){let s=this.resolver.resolve(e)
return t(!!s,`Couldn't find a template for ${e}`),s}getCapabilities(e){let t=this.getComponentDefinition(e),s=t.manager,n=t.state
return s.getCapabilities(n)}getLayout(e){let t=this.getComponentDefinition(e),s=t.manager.getLayout(t,this.resolver)
return{compile:()=>s.handle,symbolTable:s.symbolTable}}lookupHelper(e,t){return this.resolver.lookupHelper(e,t)}lookupModifier(e,t){return this.resolver.lookupModifier(e,t)}lookupComponentDefinition(e,t){return this.resolver.lookupComponentHandle(e,t)}lookupPartial(e,t){return this.resolver.lookupPartial(e,t)}}class Dn{constructor(e){this.resolver=e}async getTemplateIterator(e,t,s,i,r){let a=new fn(e),o={program:new Nn(new Sn(a)),macros:new Te,resolver:new Mn(a),Builder:ze}
a.setCompileOptions(o),a.registerTemplate("main",On),a.registerInternalHelper("action",Ln),a.registerHelper("if",Tn)
let l=function({id:e,meta:t,block:s}){let i,r=e||`client-${$s++}`
return{id:r,meta:t,create:(e,a)=>{let o=a?n({},a,t):t
return i||(i=JSON.parse(s)),new Ws(e,{id:r,block:i,referrer:o})}}}(On).create(o)
return Promise.resolve(l.renderLayout({env:t,builder:s,dynamicScope:i,self:r}))}}class Bn{constructor({element:e,nextSibling:t=null}){this.cursor={element:e,nextSibling:t}}getBuilder(e){return function(e,t){return Es.forInitialRender(e,t)}(e,this.cursor)}}class jn{render(e){let t
do{t=e.next()}while(!t.done)
this.result=t.value}rerender(){if(!this.result)throw new Error("Cannot re-render before initial render has completed")
this.result.rerender()}}function In(e){return void 0!==e.rootName&&void 0!==e.collection&&void 0!==e.name&&void 0!==e.type}function Rn(e){let t=e.type,s=function(e){let t=[]
e.rootName&&t.push(e.rootName)
e.collection&&t.push(e.collection)
e.namespace&&t.push(e.namespace)
e.name&&t.push(e.name)
if(t.length>0){let s=t.join("/")
return In(e)&&(s="/"+s),s}}(e)
return s?t+":"+s:t}function Pn(e){let t={}
if(e.indexOf(":")>-1){let s,n=e.split(":"),i=n[0],r=n[1]
t.type=i,0===r.indexOf("/")?(s=r.substr(1).split("/"),r.substr(1).startsWith("@")?t.rootName=s.shift()+"/"+s.shift():t.rootName=s.shift(),t.collection=s.shift()):s=r.split("/"),s.length>0&&(t.name=s.pop(),s.length>0&&(t.namespace=s.join("/")))}else t.type=e
return t}function Fn(e,t){if(!t)throw new Error("Assertion Failed: "+e)}class Hn{constructor(e,t){this.config=e,this.registry=t}identify(e,t){if(function(e){let t=e.split(":"),s=t[0],n=t[1]
return!!(s&&n&&0===n.indexOf("/")&&n.split("/").length>3)}(e))return e
let s,n=Pn(e)
if(t){let e=Pn(t)
if(In(e)){Fn("Specifier must not include a rootName, collection, or namespace when combined with an absolute referrer",void 0===n.rootName&&void 0===n.collection&&void 0===n.namespace),n.rootName=e.rootName,n.collection=e.collection
let t=this._definitiveCollection(n.type)
if(!n.name)return n.namespace=e.namespace,n.name=e.name,this._serializeAndVerify(n)
if(n.namespace=e.namespace?e.namespace+"/"+e.name:e.name,function(e){let t=e.namespace,s=e.collection,n=t.lastIndexOf("/-")
if(n>-1){n+=2
let e=t.indexOf("/",n)
s=t.slice(n,e>-1?e:void 0)}return s}(n)===t&&(s=this._serializeAndVerify(n)))return s
if(t&&(n.namespace+="/-"+t,s=this._serializeAndVerify(n)))return s
n.rootName=n.collection=n.namespace=void 0}else Fn('Referrer must either be "absolute" or include a `type` to determine the associated type',e.type),n.collection=this._definitiveCollection(e.type),n.namespace||(n.namespace=e.rootName),Fn(`'${e.type}' does not have a definitive collection`,n.collection)}if(n.collection||(n.collection=this._definitiveCollection(n.type),Fn(`'${n.type}' does not have a definitive collection`,n.collection)),!n.rootName){if(n.rootName=this.config.app.rootName||"app",s=this._serializeAndVerify(n))return s
n.namespace?(n.rootName=n.namespace,n.namespace=void 0):(n.rootName=n.name,n.name="main")}return(s=this._serializeAndVerify(n))?s:void 0}retrieve(e){return this.registry.get(e)}resolve(e,t){let s=this.identify(e,t)
if(s)return this.retrieve(s)}_definitiveCollection(e){let t=this.config.types[e]
return Fn(`'${e}' is not a recognized type`,t),t.definitiveCollection}_serializeAndVerify(e){let t=Rn(e)
if(this.registry.has(t))return t}}class zn{constructor(e={}){this._entries=e}has(e){return e in this._entries}get(e){return this._entries[e]}}class Vn extends J{constructor(){super(...arguments),this.isActive=!1}openPicker(e){e.preventDefault(),this.isActive=!this.isActive}sendAndClosePicker(e){this.isActive=!1,this.args.onEmojiPicked(e)}}(function(e,t,s,n){var i,r=arguments.length,a=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,s,n)
else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(a=(r<3?i(a):r>3?i(t,s,a):i(t,s))||a)
r>3&&a&&Object.defineProperty(t,s,a)})([z],Vn.prototype,"isActive",void 0)
var Un=[{name:"People",emojis:["😄","😃","😀","😊","😉","😍","😘","😚","😗","😙","😜","😝","😛","😳","😁","😔","😌","😒","😞","😣","😢","😂","😭","😪","😥","😰","😅","😓","😩","😫","😨","😱","😠","😡","😤","😖","😆","😋","😷","😎","😴","😵","😲","😟","😦","😧","👿","😮","😬","😐","😕","😯","😏","😑","👲","👳","👮","👷","💂","👶","👦","👧","👨","👩","👴","👵","👱","👼","👸","😺","😸","😻","😽","😼","🙀","😿","😹","😾","👹","👺","🙈","🙉","🙊","💀","👽","💩","🔥","✨","🌟","💫","💥","💢","💦","💧","💤","💨","👂","👀","👃","👅","👄","👍","👎","👌","👊","✊","👋","✋","👐","👆","👇","👉","👈","🙌","🙏","👏","💪","🚶","🏃","💃","👫","👪","💏","💑","👯","🙆","🙅","💁","🙋","💆","💇","💅","👰","🙎","🙍","🙇","🎩","👑","👒","👟","👞","👡","👠","👢","👕","👔","👚","👗","🎽","👖","👘","👙","💼","👜","👝","👛","👓","🎀","🌂","💄","💛","💙","💜","💚","💔","💗","💓","💕","💖","💞","💘","💌","💋","💍","💎","👤","💬","👣"]},{name:"Nature",emojis:["🐶","🐺","🐱","🐭","🐹","🐰","🐸","🐯","🐨","🐻","🐷","🐽","🐮","🐗","🐵","🐒","🐴","🐑","🐘","🐼","🐧","🐦","🐤","🐥","🐣","🐔","🐍","🐢","🐛","🐝","🐜","🐞","🐌","🐙","🐚","🐠","🐟","🐬","🐳","🐎","🐲","🐡","🐫","🐩","🐾","💐","🌸","🌷","🍀","🌹","🌻","🌺","🍁","🍃","🍂","🌿","🌾","🍄","🌵","🌴","🌰","🌱","🌼","🌑","🌓","🌔","🌕","🌛","🌙","🌏","🌋","🌌","🌠","⛅","⛄","🌀","🌁","🌈","🌊"]},{name:"Objects",emojis:["🎍","💝","🎎","🎒","🎓","🎏","🎆","🎇","🎐","🎑","🎃","👻","🎅","🎄","🎁","🎋","🎉","🎊","🎈","🎌","🔮","🎥","📷","📹","📼","💿","📀","💽","💾","💻","📱","📞","📟","📠","📡","📺","📻","🔊","🔔","📢","📣","⏳","⌛","⏰","⌚","🔓","🔒","🔏","🔐","🔑","🔎","💡","🔦","🔌","🔋","🔍","🛀","🚽","🔧","🔩","🔨","🚪","🚬","💣","🔫","🔪","💊","💉","💰","💴","💵","💳","💸","📲","📧","📥","📤","📩","📨","📫","📪","📮","📦","📝","📄","📃","📑","📊","📈","📉","📜","📋","📅","📆","📇","📁","📂","📌","📎","📏","📐","📕","📗","📘","📙","📓","📔","📒","📚","📖","🔖","📛","📰","🎨","🎬","🎤","🎧","🎼","🎵","🎶","🎹","🎻","🎺","🎷","🎸","👾","🎮","🃏","🎴","🀄","🎲","🎯","🏈","🏀","⚽","⚾","🎾","🎱","🎳","⛳","🏁","🏆","🎿","🏂","🏊","🏄","🎣","🍵","🍶","🍺","🍻","🍸","🍹","🍷","🍴","🍕","🍔","🍟","🍗","🍖","🍝","🍛","🍤","🍱","🍣","🍥","🍙","🍘","🍚","🍜","🍲","🍢","🍡","🍳","🍞","🍩","🍮","🍦","🍨","🍧","🎂","🍰","🍪","🍫","🍬","🍭","🍯","🍎","🍏","🍊","🍒","🍇","🍉","🍓","🍑","🍈","🍌","🍍","🍠","🍆","🍅","🌽"]},{name:"Places",emojis:["🏠","🏡","🏫","🏢","🏣","🏥","🏦","🏪","🏩","🏨","💒","⛪","🏬","🌇","🌆","🏯","🏰","⛺","🏭","🗼","🗾","🗻","🌄","🌅","🌃","🗽","🌉","🎠","🎡","⛲","🎢","🚢","⛵","🚤","🚀","💺","🚉","🚄","🚅","🚇","🚃","🚌","🚙","🚗","🚕","🚚","🚨","🚓","🚒","🚑","🚲","💈","🚏","🎫","🚥","🚧","🔰","⛽","🏮","🎰","🗿","🎪","🎭","📍","🚩"]},{name:"Symbols",emojis:["🔟","🔢","🔣","🔠","🔡","🔤","🔼","🔽","⏪","⏩","⏫","⏬","🆗","🆕","🆙","🆒","🆓","🆖","📶","🎦","🈁","🈯","🈳","🈵","🈴","🈲","🉐","🈹","🈺","🈶","🈚","🚻","🚹","🚺","🚼","🚾","🚭","🈸","🉑","🆑","🆘","🆔","🚫","🔞","⛔","❎","✅","💟","🆚","📳","📴","🆎","💠","⛎","🔯","🏧","💹","💲","💱","❌","❗","❓","❕","❔","⭕","🔝","🔚","🔙","🔛","🔜","🔃","🕛","🕐","🕑","🕒","🕓","🕔","🕕","🕖","🕗","🕘","🕙","🕚","➕","➖","➗","💮","💯","🔘","🔗","➰","🔱","🔺","🔲","🔳","🔴","🔵","🔻","⬜","⬛","🔶","🔷","🔸","🔹"]}]
var $n=[{type:"text",author:"me",data:{text:"Why don't they have salsa on the table?"}},{type:"text",author:"them",data:{text:"What do you need salsa for?"}},{type:"text",author:"me",data:{text:"Salsa is now the number one condiment in America."}},{type:"text",author:"them",data:{text:"You know why? Because people like to say 'salsa.' 'Excuse me, do you have salsa?' 'We need more salsa.' 'Where is the salsa? No salsa?'"}},{type:"text",author:"me",data:{text:"You know it must be impossible for a Spanish person to order seltzer and not get salsa. 'I wanted seltzer, not salsa.'"}},{type:"text",author:"them",data:{text:"Don't you know the difference between seltzer and salsa?? You have the seltezer after the salsa!"}},{type:"text",author:"me",data:{text:"See, this should be a show. This is the show. "}},{type:"text",author:"them",data:{text:"What?"}},{type:"text",author:"me",data:{text:"This. Just talking."}},{type:"text",author:"them",data:{text:"Yeah, right."}},{type:"text",author:"me",data:{text:"I'm really serious. I think that's a good idea. "}},{type:"text",author:"them",data:{text:"Just talking? Well what's the show about?"}},{type:"text",author:"me",data:{text:"It's about nothing."}},{type:"text",author:"them",data:{text:"No story?"}},{type:"text",author:"me",data:{text:"No forget the story. "}},{type:"text",author:"them",data:{text:"You've got to have a story."}},{type:"emoji",author:"me",data:{emoji:"😋"}}],Wn=function(e,t,s,n){var i,r=arguments.length,a=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,s,n)
else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(a=(r<3?i(a):r>3?i(t,s,a):i(t,s))||a)
return r>3&&a&&Object.defineProperty(t,s,a),a}
class Gn extends J{constructor(){super(...arguments),this.agentProfile={teamName:"glimmer-live-chat",imageUrl:"https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png"},this.messageList=$n,this.isOpen=!1,this.newMessagesCount=0}sendMessage(e){if(e.length>0){const t=this.isOpen?this.newMessagesCount:this.newMessagesCount+1
this.newMessagesCount=t,this.messageList=[...this.messageList,{author:"them",type:"text",data:{text:e}}]}}toggleLauncher(){this.isOpen=!this.isOpen,this.newMessagesCount=0}_onMessageWasSent(e){this.messageList=[...this.messageList,e]}}Wn([z],Gn.prototype,"messageList",void 0),Wn([z],Gn.prototype,"isOpen",void 0),Wn([z],Gn.prototype,"newMessagesCount",void 0)
var Yn=function(e,t,s,n){var i,r=arguments.length,a=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,s,n)
else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(a=(r<3?i(a):r>3?i(t,s,a):i(t,s))||a)
return r>3&&a&&Object.defineProperty(t,s,a),a}
class Xn extends J{constructor(){super(...arguments),this.inputActive=!1}_handleEmojiPicked(e){this.args.onSubmit({author:"me",type:"emoji",data:{emoji:e}})}_submitText(e){const t=e.target.value.trim()
t&&t.length>0&&(this.args.onSubmit({author:"me",type:"text",data:{text:t}}),e.target.value="")}sendIconHandler(e){e.preventDefault(),console.log(e)
const t=this.message
t&&this.args.onSubmit({author:"me",type:"text",data:{_message:t}})}handleKey(e){13!==e.keyCode||e.shiftKey||(e.preventDefault(),this._submitText(e))}setActive(){this.inputActive=!0}unsetActive(){this.inputActive=!1}}Yn([z],Xn.prototype,"inputActive",void 0),Yn([z],Xn.prototype,"message",void 0)
var Kn={"component:/glimmer-widget/components/ChatWindow":class extends J{constructor(e){super(e)}},"template:/glimmer-widget/components/ChatWindow":{id:"TckjExrD",block:'{"symbols":["@isOpen","@agentProfile","@onClose","@messageList","@showEmoji","@onUserInputSubmit"],"statements":[[6,"div"],[11,"class",[27,["sc-chat-window ",[26,"if",[[21,1,[]],"opened","closed"],null]]]],[8],[0,"\\n  "],[5,"Header",[],[["@teamName","@imageUrl","@onClose"],[[21,2,["teamName"]],[21,2,["imageUrl"]],[21,3,[]]]],{"statements":[],"parameters":[]}],[0,"\\n  "],[5,"MessageList",[],[["@messages","@imageUrl"],[[21,4,[]],[21,2,["imageUrl"]]]],{"statements":[],"parameters":[]}],[0,"\\n  "],[5,"UserInput",[],[["@showEmoji","@onSubmit"],[[21,5,[]],[26,"action",[[21,6,[]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-widget/components/ChatWindow"}},"component:/glimmer-widget/components/DemoHeader":class extends J{},"template:/glimmer-widget/components/DemoHeader":{id:"WLYorOPv",block:'{"symbols":[],"statements":[[6,"div"],[10,"class","demo-header"],[8],[0,"\\n  "],[6,"div"],[10,"class","demo-header--title"],[8],[0,"glimmer-chat-window"],[9],[0,"\\n  "],[6,"div"],[10,"class","demo-header--links"],[8],[0,"\\n    "],[6,"a"],[10,"href","https://github.com/rajasegar/glimmer-live-chat"],[8],[0,"Usage"],[9],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-widget/components/DemoHeader"}},"component:/glimmer-widget/components/EmojiIcon":Vn,"template:/glimmer-widget/components/EmojiIcon":{id:"Nn00xMNL",block:'{"symbols":[],"statements":[[6,"div"],[10,"class","sc-user-input--picker-wrapper"],[8],[0,"\\n"],[4,"if",[[22,["isActive"]]],null,{"statements":[[0,"  "],[5,"EmojiPicker",[],[["@onEmojiPicked"],[[26,"action",[[22,["sendAndClosePicker"]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n"]],"parameters":[]},null],[0,"  "],[6,"button"],[11,"onclick",[26,"action",[[22,["openPicker"]]],null],null],[10,"class","sc-user-input--emoji-icon-wrapper"],[8],[0,"\\n    "],[6,"svg"],[11,"class",[27,["sc-user-input--emoji-icon ",[26,"if",[[22,["isActive"]],"active",[22,[":"]],""],null]]]],[10,"version","1.1"],[10,"id","Layer_2"],[10,"xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],[10,"x","0px"],[10,"y","0px"],[10,"width","37.393px"],[10,"height","37.393px"],[10,"viewBox","0 0 37.393 37.393"],[10,"enableBackground","new 0 0 37.393 37.393"],[8],[0,"\\n      "],[6,"g"],[8],[0,"\\n        "],[6,"path"],[10,"d","M18.696,37.393C8.387,37.393,0,29.006,0,18.696C0,8.387,8.387,0,18.696,0c10.31,0,18.696,8.387,18.696,18.696\\n                 C37.393,29.006,29.006,37.393,18.696,37.393z M18.696,2C9.49,2,2,9.49,2,18.696c0,9.206,7.49,16.696,16.696,16.696\\n                 c9.206,0,16.696-7.49,16.696-16.696C35.393,9.49,27.902,2,18.696,2z"],[8],[9],[0,"\\n      "],[9],[0,"\\n      "],[6,"g"],[8],[0,"\\n        "],[6,"circle"],[10,"cx","12.379"],[10,"cy","14.359"],[10,"r","1.938"],[8],[9],[0,"\\n      "],[9],[0,"\\n      "],[6,"g"],[8],[0,"\\n        "],[6,"circle"],[10,"cx","24.371"],[10,"cy","14.414"],[10,"r","1.992"],[8],[9],[0,"\\n      "],[9],[0,"\\n      "],[6,"g"],[8],[0,"\\n        "],[6,"path"],[10,"d","M18.035,27.453c-5.748,0-8.342-4.18-8.449-4.357c-0.286-0.473-0.135-1.087,0.338-1.373\\n                 c0.471-0.286,1.084-0.136,1.372,0.335c0.094,0.151,2.161,3.396,6.74,3.396c4.713,0,7.518-3.462,7.545-3.497\\n                 c0.343-0.432,0.973-0.504,1.405-0.161c0.433,0.344,0.505,0.973,0.161,1.405C27.009,23.374,23.703,27.453,18.035,27.453z"],[8],[9],[0,"\\n      "],[9],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-widget/components/EmojiIcon"}},"component:/glimmer-widget/components/EmojiMessage":class extends J{},"template:/glimmer-widget/components/EmojiMessage":{id:"Fc8rsCmR",block:'{"symbols":["@message"],"statements":[[6,"div"],[10,"class","sc-message--emoji"],[8],[1,[21,1,["data","emoji"]],false],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-widget/components/EmojiMessage"}},"component:/glimmer-widget/components/EmojiPicker":class extends J{constructor(){super(...arguments),this.emojiData=Un}},"component:/glimmer-widget/components/EmojiPicker/emojiData":Un,"template:/glimmer-widget/components/EmojiPicker":{id:"/334pfmO",block:'{"symbols":["category","emoji","@onEmojiPicked"],"statements":[[6,"div"],[10,"tabIndex","0"],[10,"class","sc-emoji-picker"],[8],[0,"\\n  "],[6,"div"],[10,"class","sc-emoji-picker--content"],[8],[0,"\\n"],[4,"each",[[22,["emojiData"]]],[["key"],["@index"]],{"statements":[[0,"    "],[6,"div"],[10,"class","sc-emoji-picker--category"],[11,"key",[21,1,["name"]],null],[8],[0,"\\n      "],[6,"div"],[10,"class","sc-emoji-picker--category-title"],[8],[1,[21,1,["name"]],false],[9],[0,"\\n"],[4,"each",[[21,1,["emojis"]]],[["key"],["@index"]],{"statements":[[0,"      "],[6,"span"],[11,"key",[21,2,[]],null],[10,"class","sc-emoji-picker--emoji"],[11,"onclick",[26,"action",[[21,3,[]],[21,2,[]]],null],null],[8],[0,"\\n        "],[1,[21,2,[]],false],[0,"\\n      "],[9],[0,"\\n"]],"parameters":[2]},null],[0,"    "],[9],[0,"\\n"]],"parameters":[1]},null],[0,"  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-widget/components/EmojiPicker"}},"component:/glimmer-widget/components/Footer":class extends J{},"template:/glimmer-widget/components/Footer":{id:"js5NsVHz",block:'{"symbols":[],"statements":[[6,"div"],[10,"class","demo-footer"],[8],[0,"\\n  "],[6,"div"],[8],[0,"\\n    "],[6,"div"],[8],[0,"Copyleft 2018. Rajasegar Chandran"],[9],[0,"\\n    "],[6,"div"],[8],[0,"All rights not reserved"],[9],[0,"\\n  "],[9],[0,"\\n  "],[6,"div"],[8],[0,"\\n    "],[6,"div"],[8],[0,"Made with Indian Jigar Thanda"],[9],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-widget/components/Footer"}},"component:/glimmer-widget/components/GlimmerWidget":Gn,"component:/glimmer-widget/components/GlimmerWidget/messageHistory":$n,"template:/glimmer-widget/components/GlimmerWidget":{id:"E5aLZ8zG",block:'{"symbols":[],"statements":[[5,"DemoHeader",[],[[],[]],{"statements":[],"parameters":[]}],[0,"\\n"],[5,"TestArea",[],[["@onMessage"],[[26,"action",[[22,["sendMessage"]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n"],[5,"Launcher",[],[["@isOpen","@agentProfile","@messageList","@newMessagesCount","@showEmoji","@onToggle","@onMessageWasSent"],[[20,"isOpen"],[20,"agentProfile"],[20,"messageList"],[20,"newMessagesCount"],"true",[26,"action",[[22,["toggleLauncher"]]],null],[26,"action",[[22,["_onMessageWasSent"]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n"],[6,"img"],[10,"class","demo-monster-img"],[10,"src","Small-Tomster-Logo-b5958bd8d1373f2bbdfbf0fb7e748373.png"],[8],[9],[0,"\\n"],[5,"Footer",[],[[],[]],{"statements":[],"parameters":[]}],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-widget/components/GlimmerWidget"}},"component:/glimmer-widget/components/Header":class extends J{constructor(){super(...arguments),this.closeIcon="close-icon-c30463a597e914039697d587f8f6e987.png"}},"template:/glimmer-widget/components/Header":{id:"kF9Yz2Tc",block:'{"symbols":["@imageUrl","@teamName","@onClose"],"statements":[[6,"div"],[10,"class","sc-header"],[8],[0,"\\n  "],[6,"img"],[10,"class","sc-header--img"],[11,"src",[21,1,[]],null],[10,"alt",""],[8],[9],[0,"\\n  "],[6,"div"],[10,"class","sc-header--team-name"],[8],[0," "],[1,[21,2,[]],false],[0," "],[9],[0,"\\n  "],[6,"div"],[10,"class","sc-header--close-button"],[11,"onclick",[21,3,[]],null],[8],[0,"\\n    "],[6,"img"],[11,"src",[20,"closeIcon"],null],[10,"alt",""],[8],[9],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-widget/components/Header"}},"component:/glimmer-widget/components/Launcher":class extends J{constructor(){super(...arguments),this.launcherIconActive="close-icon-c30463a597e914039697d587f8f6e987.png",this.launcherIcon="logo-no-bg.svg"}},"template:/glimmer-widget/components/Launcher":{id:"jHXYoDdo",block:'{"symbols":["@isOpen","@onToggle","@newMessagesCount","@messageList","@onMessageWasSent","@agentProfile","@showEmoji"],"statements":[[6,"div"],[8],[0,"\\n  "],[6,"div"],[8],[0,"\\n  "],[9],[0,"\\n  "],[6,"div"],[11,"class",[27,["sc-launcher ",[26,"if",[[21,1,[]],"opened"],null]]]],[11,"onclick",[26,"action",[[21,2,[]]],null],null],[8],[0,"\\n    "],[5,"MessageCount",[],[["@count","@isOpen"],[[21,3,[]],[21,1,[]]]],{"statements":[],"parameters":[]}],[0,"\\n    "],[6,"img"],[10,"class","sc-open-icon"],[11,"src",[27,[[20,"launcherIconActive"]]]],[8],[9],[0,"\\n    "],[6,"img"],[10,"class","sc-closed-icon"],[11,"src",[27,[[20,"launcherIcon"]]]],[8],[9],[0,"\\n  "],[9],[0,"\\n  "],[5,"ChatWindow",[],[["@messageList","@onUserInputSubmit","@agentProfile","@isOpen","@onClose","@showEmoji"],[[21,4,[]],[26,"action",[[21,5,[]]],null],[21,6,[]],[21,1,[]],[26,"action",[[21,2,[]]],null],[21,7,[]]]],{"statements":[],"parameters":[]}],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-widget/components/Launcher"}},"component:/glimmer-widget/components/Message":class extends J{constructor(){super(...arguments),this.chatIconUrl="chat-icon.svg"}},"template:/glimmer-widget/components/Message":{id:"Fj8ShTK7",block:'{"symbols":["@message"],"statements":[[6,"div"],[10,"class","sc-message"],[8],[0,"\\n  "],[6,"div"],[11,"class",[27,["sc-message--content ",[26,"if",[[26,"eq",[[21,1,["author"]],"me"],null],"sent","received"],null]]]],[8],[0,"\\n    "],[6,"div"],[10,"class","sc-message--avatar"],[11,"style",[27,["background-image: url(\'",[20,"chatIconUrl"],"\')"]]],[8],[9],[0,"\\n"],[4,"if",[[26,"eq",[[21,1,["type"]],"text"],null]],null,{"statements":[[0,"      "],[2," Render text message "],[0,"\\n      "],[5,"TextMessage",[],[["@message"],[[21,1,[]]]],{"statements":[],"parameters":[]}],[0,"\\n"]],"parameters":[]},{"statements":[[0,"      "],[2," Render emoji "],[0,"\\n      "],[5,"EmojiMessage",[],[["@message"],[[21,1,[]]]],{"statements":[],"parameters":[]}],[0,"\\n"]],"parameters":[]}],[0,"  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-widget/components/Message"}},"component:/glimmer-widget/components/MessageCount":class extends J{},"template:/glimmer-widget/components/MessageCount":{id:"Zcda4lDE",block:'{"symbols":["@count","@isOpen"],"statements":[[4,"if",[[26,"and",[[21,1,[]],[26,"not",[[21,2,[]]],null]],null]],null,{"statements":[[6,"div"],[10,"class","sc-new-messsages-count"],[8],[0,"\\n  "],[1,[21,1,[]],false],[0,"\\n"],[9],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}',meta:{specifier:"template:/glimmer-widget/components/MessageCount"}},"component:/glimmer-widget/components/MessageList":class extends J{},"template:/glimmer-widget/components/MessageList":{id:"fqNk5HZT",block:'{"symbols":["message","@messages"],"statements":[[6,"div"],[10,"class","sc-message-list"],[8],[0,"\\n"],[4,"each",[[21,2,[]]],[["key"],["@index"]],{"statements":[[0,"    "],[5,"Message",[],[["@message"],[[21,1,[]]]],{"statements":[],"parameters":[]}],[0,"\\n"]],"parameters":[1]},null],[9],[0,"\\n\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-widget/components/MessageList"}},"component:/glimmer-widget/components/SendIcon":class extends J{},"template:/glimmer-widget/components/SendIcon":{id:"oR27NbA4",block:'{"symbols":["@onSubmit"],"statements":[[6,"button"],[10,"class","sc-user-input--send-icon-wrapper"],[11,"onclick",[26,"action",[[21,1,[]]],null],null],[8],[0,"\\n  "],[6,"svg"],[10,"version","1.1"],[10,"class","sc-user-input--send-icon"],[10,"xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],[10,"x","0px"],[10,"y","0px"],[10,"width","37.393px"],[10,"height","37.393px"],[10,"viewBox","0 0 37.393 37.393"],[10,"enableBackground","new 0 0 37.393 37.393"],[8],[0,"\\n    "],[6,"g"],[10,"id","Layer_2"],[8],[0,"\\n      "],[6,"path"],[10,"d","M36.511,17.594L2.371,2.932c-0.374-0.161-0.81-0.079-1.1,0.21C0.982,3.43,0.896,3.865,1.055,4.241l5.613,13.263\\n               L2.082,32.295c-0.115,0.372-0.004,0.777,0.285,1.038c0.188,0.169,0.427,0.258,0.67,0.258c0.132,0,0.266-0.026,0.392-0.08\\n               l33.079-14.078c0.368-0.157,0.607-0.519,0.608-0.919S36.879,17.752,36.511,17.594z M4.632,30.825L8.469,18.45h8.061\\n               c0.552,0,1-0.448,1-1s-0.448-1-1-1H8.395L3.866,5.751l29.706,12.757L4.632,30.825z"],[8],[9],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-widget/components/SendIcon"}},"component:/glimmer-widget/components/TestArea":class extends J{handleSubmit(e){e.preventDefault()
let t=e.target[0].value
this.args.onMessage(t),e.target.reset()}},"template:/glimmer-widget/components/TestArea":{id:"FIDIFZxQ",block:'{"symbols":[],"statements":[[6,"div"],[10,"class","demo-test-area--wrapper"],[8],[0,"\\n  "],[6,"div"],[10,"class","demo-test-area--title"],[8],[0,"\\n    "],[6,"div"],[10,"class","demo-test-area--title-main"],[8],[0,"glimmer-chat-window demo"],[9],[0,"\\n    "],[6,"div"],[10,"class","demo-test-area--title-sub"],[8],[0,"made by Rajasegar"],[9],[0,"\\n  "],[9],[0,"\\n  "],[6,"form"],[10,"class","demo-test-area"],[11,"onsubmit",[26,"action",[[22,["handleSubmit"]]],null],null],[8],[0,"\\n    "],[6,"div"],[10,"class","demo-test-area--preamble"],[8],[0,"Test the chat window by sending a message:"],[9],[0,"\\n    "],[6,"textarea"],[10,"class","demo-test-area--text"],[10,"placeholder","Write a test message...."],[8],[9],[0,"\\n    "],[6,"button"],[10,"class","demo-test-area--button"],[8],[0," Send Message! "],[9],[0,"\\n  "],[9],[0,"\\n  "],[6,"p"],[10,"class","demo-test-area--info"],[8],[0,"\\n    glimmer-live-chat is a chat window that allows you to build and add custom live chat to your sites.\\n    It includes only the glimmer chat widget. There is no backend, and no communication system baked in.\\n    "],[6,"br"],[8],[9],[0,"\\n    "],[6,"br"],[8],[9],[0,"\\n    For instructions on how to use glimmer-chat-window click "],[6,"a"],[10,"href","https://github.com/rajasegar/glimmer-live-chat"],[8],[0,"here"],[9],[0,".\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-widget/components/TestArea"}},"component:/glimmer-widget/components/TextMessage":class extends J{},"template:/glimmer-widget/components/TextMessage":{id:"WJla+z/e",block:'{"symbols":["@message"],"statements":[[6,"div"],[10,"class","sc-message--text"],[8],[1,[21,1,["data","text"]],false],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-widget/components/TextMessage"}},"component:/glimmer-widget/components/UserInput":Xn,"template:/glimmer-widget/components/UserInput":{id:"hTr2EhN1",block:'{"symbols":["@showEmoji"],"statements":[[6,"form"],[11,"class",[27,["sc-user-input ",[26,"if",[[22,["inputActive"]],"active",[22,[":"]],""],null]]]],[8],[0,"\\n  "],[6,"textarea"],[10,"class","sc-user-input--text"],[11,"onkeydown",[26,"action",[[22,["handleKey"]]],null],null],[11,"onfocus",[26,"action",[[22,["setActive"]]],null],null],[11,"onblur",[26,"action",[[22,["unsetActive"]]],null],null],[8],[1,[20,"message"],false],[9],[0,"\\n    "],[6,"div"],[10,"class","sc-user-input--buttons"],[8],[0,"\\n    "],[6,"div"],[10,"class","sc-user-input--button"],[8],[9],[0,"\\n    "],[6,"div"],[10,"class","sc-user-input--button"],[8],[0,"\\n"],[4,"if",[[21,1,[]]],null,{"statements":[[0,"      "],[5,"EmojiIcon",[],[["@onEmojiPicked"],[[26,"action",[[22,["_handleEmojiPicked"]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n"]],"parameters":[]},null],[0,"    "],[9],[0,"\\n    "],[6,"div"],[10,"class","sc-user-input--button"],[8],[0,"\\n      "],[5,"SendIcon",[],[["@onSubmit"],[[26,"action",[[22,["sendIconHandler"]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-widget/components/UserInput"}},"helper:/glimmer-widget/components/and":function(e){return e[0]&&e[1]},"helper:/glimmer-widget/components/eq":function(e){return e[0]===e[1]},"helper:/glimmer-widget/components/not":function(e){return!e[0]}},Jn={app:{name:"glimmer-widget",rootName:"glimmer-widget"},types:{application:{definitiveCollection:"main"},component:{definitiveCollection:"components"},"component-test":{unresolvable:!0},helper:{definitiveCollection:"components"},"helper-test":{unresolvable:!0},renderer:{definitiveCollection:"main"},template:{definitiveCollection:"components"}},collections:{main:{types:["application","renderer"]},components:{group:"ui",types:["component","component-test","template","helper","helper-test"],defaultType:"component",privateCollections:["utils"]},styles:{group:"ui",unresolvable:!0},utils:{unresolvable:!0}}}
const qn=new class extends dn{constructor(){let e=new zn(Kn),t=new Hn(Jn,e)
const s=document.body
super({builder:new Bn({element:s,nextSibling:null}),loader:new Dn(t),renderer:new jn,resolver:t,rootName:Jn.app.rootName})}},Zn=document.getElementById("app")
Y=(()=>{qn.scheduleRerender()}),qn.registerInitializer({initialize(e){e.register(`component-manager:/${qn.rootName}/component-managers/main`,sn)}}),qn.renderComponent("GlimmerWidget",Zn,null),qn.boot()})
