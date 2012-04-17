// This file contains all the minified libraries and plugins that we are using
// concatenated into one file rather than serving them a separate, slower files.

// Listing of what is included (in order):

// 1. Underscore.js
// 2. Backbone.js
// 3. Lawnchair v0.6.1
// 4. Twitter Bootstrap.js
// 5. Jquery mousewheel
// 6. Pan and Zoom
// 7. Jath
// 8. URI.js
// 9. ZipFile.complete.js

// Underscore.js 1.3.1
// (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the MIT license.
// Portions of Underscore are inspired or borrowed from Prototype,
// Oliver Steele's Functional, and John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore
(function(){function q(a,c,d){if(a===c)return a!==0||1/a==1/c;if(a==null||c==null)return a===c;if(a._chain)a=a._wrapped;if(c._chain)c=c._wrapped;if(a.isEqual&&b.isFunction(a.isEqual))return a.isEqual(c);if(c.isEqual&&b.isFunction(c.isEqual))return c.isEqual(a);var e=l.call(a);if(e!=l.call(c))return false;switch(e){case "[object String]":return a==String(c);case "[object Number]":return a!=+a?c!=+c:a==0?1/a==1/c:a==+c;case "[object Date]":case "[object Boolean]":return+a==+c;case "[object RegExp]":return a.source==
c.source&&a.global==c.global&&a.multiline==c.multiline&&a.ignoreCase==c.ignoreCase}if(typeof a!="object"||typeof c!="object")return false;for(var f=d.length;f--;)if(d[f]==a)return true;d.push(a);var f=0,g=true;if(e=="[object Array]"){if(f=a.length,g=f==c.length)for(;f--;)if(!(g=f in a==f in c&&q(a[f],c[f],d)))break}else{if("constructor"in a!="constructor"in c||a.constructor!=c.constructor)return false;for(var h in a)if(b.has(a,h)&&(f++,!(g=b.has(c,h)&&q(a[h],c[h],d))))break;if(g){for(h in c)if(b.has(c,
h)&&!f--)break;g=!f}}d.pop();return g}var r=this,G=r._,n={},k=Array.prototype,o=Object.prototype,i=k.slice,H=k.unshift,l=o.toString,I=o.hasOwnProperty,w=k.forEach,x=k.map,y=k.reduce,z=k.reduceRight,A=k.filter,B=k.every,C=k.some,p=k.indexOf,D=k.lastIndexOf,o=Array.isArray,J=Object.keys,s=Function.prototype.bind,b=function(a){return new m(a)};if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports)exports=module.exports=b;exports._=b}else r._=b;b.VERSION="1.3.1";var j=b.each=
b.forEach=function(a,c,d){if(a!=null)if(w&&a.forEach===w)a.forEach(c,d);else if(a.length===+a.length)for(var e=0,f=a.length;e<f;e++){if(e in a&&c.call(d,a[e],e,a)===n)break}else for(e in a)if(b.has(a,e)&&c.call(d,a[e],e,a)===n)break};b.map=b.collect=function(a,c,b){var e=[];if(a==null)return e;if(x&&a.map===x)return a.map(c,b);j(a,function(a,g,h){e[e.length]=c.call(b,a,g,h)});if(a.length===+a.length)e.length=a.length;return e};b.reduce=b.foldl=b.inject=function(a,c,d,e){var f=arguments.length>2;a==
null&&(a=[]);if(y&&a.reduce===y)return e&&(c=b.bind(c,e)),f?a.reduce(c,d):a.reduce(c);j(a,function(a,b,i){f?d=c.call(e,d,a,b,i):(d=a,f=true)});if(!f)throw new TypeError("Reduce of empty array with no initial value");return d};b.reduceRight=b.foldr=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(z&&a.reduceRight===z)return e&&(c=b.bind(c,e)),f?a.reduceRight(c,d):a.reduceRight(c);var g=b.toArray(a).reverse();e&&!f&&(c=b.bind(c,e));return f?b.reduce(g,c,d,e):b.reduce(g,c)};b.find=b.detect=
function(a,c,b){var e;E(a,function(a,g,h){if(c.call(b,a,g,h))return e=a,true});return e};b.filter=b.select=function(a,c,b){var e=[];if(a==null)return e;if(A&&a.filter===A)return a.filter(c,b);j(a,function(a,g,h){c.call(b,a,g,h)&&(e[e.length]=a)});return e};b.reject=function(a,c,b){var e=[];if(a==null)return e;j(a,function(a,g,h){c.call(b,a,g,h)||(e[e.length]=a)});return e};b.every=b.all=function(a,c,b){var e=true;if(a==null)return e;if(B&&a.every===B)return a.every(c,b);j(a,function(a,g,h){if(!(e=
e&&c.call(b,a,g,h)))return n});return e};var E=b.some=b.any=function(a,c,d){c||(c=b.identity);var e=false;if(a==null)return e;if(C&&a.some===C)return a.some(c,d);j(a,function(a,b,h){if(e||(e=c.call(d,a,b,h)))return n});return!!e};b.include=b.contains=function(a,c){var b=false;if(a==null)return b;return p&&a.indexOf===p?a.indexOf(c)!=-1:b=E(a,function(a){return a===c})};b.invoke=function(a,c){var d=i.call(arguments,2);return b.map(a,function(a){return(b.isFunction(c)?c||a:a[c]).apply(a,d)})};b.pluck=
function(a,c){return b.map(a,function(a){return a[c]})};b.max=function(a,c,d){if(!c&&b.isArray(a))return Math.max.apply(Math,a);if(!c&&b.isEmpty(a))return-Infinity;var e={computed:-Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b>=e.computed&&(e={value:a,computed:b})});return e.value};b.min=function(a,c,d){if(!c&&b.isArray(a))return Math.min.apply(Math,a);if(!c&&b.isEmpty(a))return Infinity;var e={computed:Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b<e.computed&&(e={value:a,computed:b})});
return e.value};b.shuffle=function(a){var b=[],d;j(a,function(a,f){f==0?b[0]=a:(d=Math.floor(Math.random()*(f+1)),b[f]=b[d],b[d]=a)});return b};b.sortBy=function(a,c,d){return b.pluck(b.map(a,function(a,b,g){return{value:a,criteria:c.call(d,a,b,g)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;return c<d?-1:c>d?1:0}),"value")};b.groupBy=function(a,c){var d={},e=b.isFunction(c)?c:function(a){return a[c]};j(a,function(a,b){var c=e(a,b);(d[c]||(d[c]=[])).push(a)});return d};b.sortedIndex=function(a,
c,d){d||(d=b.identity);for(var e=0,f=a.length;e<f;){var g=e+f>>1;d(a[g])<d(c)?e=g+1:f=g}return e};b.toArray=function(a){return!a?[]:a.toArray?a.toArray():b.isArray(a)?i.call(a):b.isArguments(a)?i.call(a):b.values(a)};b.size=function(a){return b.toArray(a).length};b.first=b.head=function(a,b,d){return b!=null&&!d?i.call(a,0,b):a[0]};b.initial=function(a,b,d){return i.call(a,0,a.length-(b==null||d?1:b))};b.last=function(a,b,d){return b!=null&&!d?i.call(a,Math.max(a.length-b,0)):a[a.length-1]};b.rest=
b.tail=function(a,b,d){return i.call(a,b==null||d?1:b)};b.compact=function(a){return b.filter(a,function(a){return!!a})};b.flatten=function(a,c){return b.reduce(a,function(a,e){if(b.isArray(e))return a.concat(c?e:b.flatten(e));a[a.length]=e;return a},[])};b.without=function(a){return b.difference(a,i.call(arguments,1))};b.uniq=b.unique=function(a,c,d){var d=d?b.map(a,d):a,e=[];b.reduce(d,function(d,g,h){if(0==h||(c===true?b.last(d)!=g:!b.include(d,g)))d[d.length]=g,e[e.length]=a[h];return d},[]);
return e};b.union=function(){return b.uniq(b.flatten(arguments,true))};b.intersection=b.intersect=function(a){var c=i.call(arguments,1);return b.filter(b.uniq(a),function(a){return b.every(c,function(c){return b.indexOf(c,a)>=0})})};b.difference=function(a){var c=b.flatten(i.call(arguments,1));return b.filter(a,function(a){return!b.include(c,a)})};b.zip=function(){for(var a=i.call(arguments),c=b.max(b.pluck(a,"length")),d=Array(c),e=0;e<c;e++)d[e]=b.pluck(a,""+e);return d};b.indexOf=function(a,c,
d){if(a==null)return-1;var e;if(d)return d=b.sortedIndex(a,c),a[d]===c?d:-1;if(p&&a.indexOf===p)return a.indexOf(c);for(d=0,e=a.length;d<e;d++)if(d in a&&a[d]===c)return d;return-1};b.lastIndexOf=function(a,b){if(a==null)return-1;if(D&&a.lastIndexOf===D)return a.lastIndexOf(b);for(var d=a.length;d--;)if(d in a&&a[d]===b)return d;return-1};b.range=function(a,b,d){arguments.length<=1&&(b=a||0,a=0);for(var d=arguments[2]||1,e=Math.max(Math.ceil((b-a)/d),0),f=0,g=Array(e);f<e;)g[f++]=a,a+=d;return g};
var F=function(){};b.bind=function(a,c){var d,e;if(a.bind===s&&s)return s.apply(a,i.call(arguments,1));if(!b.isFunction(a))throw new TypeError;e=i.call(arguments,2);return d=function(){if(!(this instanceof d))return a.apply(c,e.concat(i.call(arguments)));F.prototype=a.prototype;var b=new F,g=a.apply(b,e.concat(i.call(arguments)));return Object(g)===g?g:b}};b.bindAll=function(a){var c=i.call(arguments,1);c.length==0&&(c=b.functions(a));j(c,function(c){a[c]=b.bind(a[c],a)});return a};b.memoize=function(a,
c){var d={};c||(c=b.identity);return function(){var e=c.apply(this,arguments);return b.has(d,e)?d[e]:d[e]=a.apply(this,arguments)}};b.delay=function(a,b){var d=i.call(arguments,2);return setTimeout(function(){return a.apply(a,d)},b)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(i.call(arguments,1)))};b.throttle=function(a,c){var d,e,f,g,h,i=b.debounce(function(){h=g=false},c);return function(){d=this;e=arguments;var b;f||(f=setTimeout(function(){f=null;h&&a.apply(d,e);i()},c));g?h=true:
a.apply(d,e);i();g=true}};b.debounce=function(a,b){var d;return function(){var e=this,f=arguments;clearTimeout(d);d=setTimeout(function(){d=null;a.apply(e,f)},b)}};b.once=function(a){var b=false,d;return function(){if(b)return d;b=true;return d=a.apply(this,arguments)}};b.wrap=function(a,b){return function(){var d=[a].concat(i.call(arguments,0));return b.apply(this,d)}};b.compose=function(){var a=arguments;return function(){for(var b=arguments,d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};
b.after=function(a,b){return a<=0?b():function(){if(--a<1)return b.apply(this,arguments)}};b.keys=J||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var c=[],d;for(d in a)b.has(a,d)&&(c[c.length]=d);return c};b.values=function(a){return b.map(a,b.identity)};b.functions=b.methods=function(a){var c=[],d;for(d in a)b.isFunction(a[d])&&c.push(d);return c.sort()};b.extend=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]=b[d]});return a};b.defaults=function(a){j(i.call(arguments,
1),function(b){for(var d in b)a[d]==null&&(a[d]=b[d])});return a};b.clone=function(a){return!b.isObject(a)?a:b.isArray(a)?a.slice():b.extend({},a)};b.tap=function(a,b){b(a);return a};b.isEqual=function(a,b){return q(a,b,[])};b.isEmpty=function(a){if(b.isArray(a)||b.isString(a))return a.length===0;for(var c in a)if(b.has(a,c))return false;return true};b.isElement=function(a){return!!(a&&a.nodeType==1)};b.isArray=o||function(a){return l.call(a)=="[object Array]"};b.isObject=function(a){return a===Object(a)};
b.isArguments=function(a){return l.call(a)=="[object Arguments]"};if(!b.isArguments(arguments))b.isArguments=function(a){return!(!a||!b.has(a,"callee"))};b.isFunction=function(a){return l.call(a)=="[object Function]"};b.isString=function(a){return l.call(a)=="[object String]"};b.isNumber=function(a){return l.call(a)=="[object Number]"};b.isNaN=function(a){return a!==a};b.isBoolean=function(a){return a===true||a===false||l.call(a)=="[object Boolean]"};b.isDate=function(a){return l.call(a)=="[object Date]"};
b.isRegExp=function(a){return l.call(a)=="[object RegExp]"};b.isNull=function(a){return a===null};b.isUndefined=function(a){return a===void 0};b.has=function(a,b){return I.call(a,b)};b.noConflict=function(){r._=G;return this};b.identity=function(a){return a};b.times=function(a,b,d){for(var e=0;e<a;e++)b.call(d,e)};b.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")};b.mixin=function(a){j(b.functions(a),
function(c){K(c,b[c]=a[c])})};var L=0;b.uniqueId=function(a){var b=L++;return a?a+b:b};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var t=/.^/,u=function(a){return a.replace(/\\\\/g,"\\").replace(/\\'/g,"'")};b.template=function(a,c){var d=b.templateSettings,d="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+a.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(d.escape||t,function(a,b){return"',_.escape("+
u(b)+"),'"}).replace(d.interpolate||t,function(a,b){return"',"+u(b)+",'"}).replace(d.evaluate||t,function(a,b){return"');"+u(b).replace(/[\r\n\t]/g," ")+";__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');",e=new Function("obj","_",d);return c?e(c,b):function(a){return e.call(this,a,b)}};b.chain=function(a){return b(a).chain()};var m=function(a){this._wrapped=a};b.prototype=m.prototype;var v=function(a,c){return c?b(a).chain():a},K=function(a,c){m.prototype[a]=
function(){var a=i.call(arguments);H.call(a,this._wrapped);return v(c.apply(b,a),this._chain)}};b.mixin(b);j("pop,push,reverse,shift,sort,splice,unshift".split(","),function(a){var b=k[a];m.prototype[a]=function(){var d=this._wrapped;b.apply(d,arguments);var e=d.length;(a=="shift"||a=="splice")&&e===0&&delete d[0];return v(d,this._chain)}});j(["concat","join","slice"],function(a){var b=k[a];m.prototype[a]=function(){return v(b.apply(this._wrapped,arguments),this._chain)}});m.prototype.chain=function(){this._chain=
true;return this};m.prototype.value=function(){return this._wrapped}}).call(this);
// Backbone.js 0.9.1
// (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org
(function(){var i=this,r=i.Backbone,s=Array.prototype.slice,t=Array.prototype.splice,g;g="undefined"!==typeof exports?exports:i.Backbone={};g.VERSION="0.9.1";var f=i._;!f&&"undefined"!==typeof require&&(f=require("underscore"));var h=i.jQuery||i.Zepto||i.ender;g.setDomLibrary=function(a){h=a};g.noConflict=function(){i.Backbone=r;return this};g.emulateHTTP=!1;g.emulateJSON=!1;g.Events={on:function(a,b,c){for(var d,a=a.split(/\s+/),e=this._callbacks||(this._callbacks={});d=a.shift();){d=e[d]||(e[d]=
{});var f=d.tail||(d.tail=d.next={});f.callback=b;f.context=c;d.tail=f.next={}}return this},off:function(a,b,c){var d,e,f;if(a){if(e=this._callbacks)for(a=a.split(/\s+/);d=a.shift();)if(f=e[d],delete e[d],b&&f)for(;(f=f.next)&&f.next;)if(!(f.callback===b&&(!c||f.context===c)))this.on(d,f.callback,f.context)}else delete this._callbacks;return this},trigger:function(a){var b,c,d,e;if(!(d=this._callbacks))return this;e=d.all;for((a=a.split(/\s+/)).push(null);b=a.shift();)e&&a.push({next:e.next,tail:e.tail,
event:b}),(c=d[b])&&a.push({next:c.next,tail:c.tail});for(e=s.call(arguments,1);c=a.pop();){b=c.tail;for(d=c.event?[c.event].concat(e):e;(c=c.next)!==b;)c.callback.apply(c.context||this,d)}return this}};g.Events.bind=g.Events.on;g.Events.unbind=g.Events.off;g.Model=function(a,b){var c;a||(a={});b&&b.parse&&(a=this.parse(a));if(c=j(this,"defaults"))a=f.extend({},c,a);b&&b.collection&&(this.collection=b.collection);this.attributes={};this._escapedAttributes={};this.cid=f.uniqueId("c");if(!this.set(a,
{silent:!0}))throw Error("Can't create an invalid model");delete this._changed;this._previousAttributes=f.clone(this.attributes);this.initialize.apply(this,arguments)};f.extend(g.Model.prototype,g.Events,{idAttribute:"id",initialize:function(){},toJSON:function(){return f.clone(this.attributes)},get:function(a){return this.attributes[a]},escape:function(a){var b;if(b=this._escapedAttributes[a])return b;b=this.attributes[a];return this._escapedAttributes[a]=f.escape(null==b?"":""+b)},has:function(a){return null!=
this.attributes[a]},set:function(a,b,c){var d,e;f.isObject(a)||null==a?(d=a,c=b):(d={},d[a]=b);c||(c={});if(!d)return this;d instanceof g.Model&&(d=d.attributes);if(c.unset)for(e in d)d[e]=void 0;if(!this._validate(d,c))return!1;this.idAttribute in d&&(this.id=d[this.idAttribute]);var b=this.attributes,k=this._escapedAttributes,n=this._previousAttributes||{},h=this._setting;this._changed||(this._changed={});this._setting=!0;for(e in d)if(a=d[e],f.isEqual(b[e],a)||delete k[e],c.unset?delete b[e]:b[e]=
a,this._changing&&!f.isEqual(this._changed[e],a)&&(this.trigger("change:"+e,this,a,c),this._moreChanges=!0),delete this._changed[e],!f.isEqual(n[e],a)||f.has(b,e)!=f.has(n,e))this._changed[e]=a;h||(!c.silent&&this.hasChanged()&&this.change(c),this._setting=!1);return this},unset:function(a,b){(b||(b={})).unset=!0;return this.set(a,null,b)},clear:function(a){(a||(a={})).unset=!0;return this.set(f.clone(this.attributes),a)},fetch:function(a){var a=a?f.clone(a):{},b=this,c=a.success;a.success=function(d,
e,f){if(!b.set(b.parse(d,f),a))return!1;c&&c(b,d)};a.error=g.wrapError(a.error,b,a);return(this.sync||g.sync).call(this,"read",this,a)},save:function(a,b,c){var d,e;f.isObject(a)||null==a?(d=a,c=b):(d={},d[a]=b);c=c?f.clone(c):{};c.wait&&(e=f.clone(this.attributes));a=f.extend({},c,{silent:!0});if(d&&!this.set(d,c.wait?a:c))return!1;var k=this,h=c.success;c.success=function(a,b,e){b=k.parse(a,e);c.wait&&(b=f.extend(d||{},b));if(!k.set(b,c))return!1;h?h(k,a):k.trigger("sync",k,a,c)};c.error=g.wrapError(c.error,
k,c);b=this.isNew()?"create":"update";b=(this.sync||g.sync).call(this,b,this,c);c.wait&&this.set(e,a);return b},destroy:function(a){var a=a?f.clone(a):{},b=this,c=a.success,d=function(){b.trigger("destroy",b,b.collection,a)};if(this.isNew())return d();a.success=function(e){a.wait&&d();c?c(b,e):b.trigger("sync",b,e,a)};a.error=g.wrapError(a.error,b,a);var e=(this.sync||g.sync).call(this,"delete",this,a);a.wait||d();return e},url:function(){var a=j(this.collection,"url")||j(this,"urlRoot")||o();return this.isNew()?
a:a+("/"==a.charAt(a.length-1)?"":"/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return null==this.id},change:function(a){if(this._changing||!this.hasChanged())return this;this._moreChanges=this._changing=!0;for(var b in this._changed)this.trigger("change:"+b,this,this._changed[b],a);for(;this._moreChanges;)this._moreChanges=!1,this.trigger("change",this,a);this._previousAttributes=f.clone(this.attributes);
delete this._changed;this._changing=!1;return this},hasChanged:function(a){return!arguments.length?!f.isEmpty(this._changed):this._changed&&f.has(this._changed,a)},changedAttributes:function(a){if(!a)return this.hasChanged()?f.clone(this._changed):!1;var b,c=!1,d=this._previousAttributes,e;for(e in a)if(!f.isEqual(d[e],b=a[e]))(c||(c={}))[e]=b;return c},previous:function(a){return!arguments.length||!this._previousAttributes?null:this._previousAttributes[a]},previousAttributes:function(){return f.clone(this._previousAttributes)},
isValid:function(){return!this.validate(this.attributes)},_validate:function(a,b){if(b.silent||!this.validate)return!0;var a=f.extend({},this.attributes,a),c=this.validate(a,b);if(!c)return!0;b&&b.error?b.error(this,c,b):this.trigger("error",this,c,b);return!1}});g.Collection=function(a,b){b||(b={});b.comparator&&(this.comparator=b.comparator);this._reset();this.initialize.apply(this,arguments);a&&this.reset(a,{silent:!0,parse:b.parse})};f.extend(g.Collection.prototype,g.Events,{model:g.Model,initialize:function(){},
toJSON:function(){return this.map(function(a){return a.toJSON()})},add:function(a,b){var c,d,e,g,h,i={},j={};b||(b={});a=f.isArray(a)?a.slice():[a];for(c=0,d=a.length;c<d;c++){if(!(e=a[c]=this._prepareModel(a[c],b)))throw Error("Can't add an invalid model to a collection");if(i[g=e.cid]||this._byCid[g]||null!=(h=e.id)&&(j[h]||this._byId[h]))throw Error("Can't add the same model to a collection twice");i[g]=j[h]=e}for(c=0;c<d;c++)(e=a[c]).on("all",this._onModelEvent,this),this._byCid[e.cid]=e,null!=
e.id&&(this._byId[e.id]=e);this.length+=d;t.apply(this.models,[null!=b.at?b.at:this.models.length,0].concat(a));this.comparator&&this.sort({silent:!0});if(b.silent)return this;for(c=0,d=this.models.length;c<d;c++)if(i[(e=this.models[c]).cid])b.index=c,e.trigger("add",e,this,b);return this},remove:function(a,b){var c,d,e,g;b||(b={});a=f.isArray(a)?a.slice():[a];for(c=0,d=a.length;c<d;c++)if(g=this.getByCid(a[c])||this.get(a[c]))delete this._byId[g.id],delete this._byCid[g.cid],e=this.indexOf(g),this.models.splice(e,
1),this.length--,b.silent||(b.index=e,g.trigger("remove",g,this,b)),this._removeReference(g);return this},get:function(a){return null==a?null:this._byId[null!=a.id?a.id:a]},getByCid:function(a){return a&&this._byCid[a.cid||a]},at:function(a){return this.models[a]},sort:function(a){a||(a={});if(!this.comparator)throw Error("Cannot sort a set without a comparator");var b=f.bind(this.comparator,this);1==this.comparator.length?this.models=this.sortBy(b):this.models.sort(b);a.silent||this.trigger("reset",
this,a);return this},pluck:function(a){return f.map(this.models,function(b){return b.get(a)})},reset:function(a,b){a||(a=[]);b||(b={});for(var c=0,d=this.models.length;c<d;c++)this._removeReference(this.models[c]);this._reset();this.add(a,{silent:!0,parse:b.parse});b.silent||this.trigger("reset",this,b);return this},fetch:function(a){a=a?f.clone(a):{};void 0===a.parse&&(a.parse=!0);var b=this,c=a.success;a.success=function(d,e,f){b[a.add?"add":"reset"](b.parse(d,f),a);c&&c(b,d)};a.error=g.wrapError(a.error,
b,a);return(this.sync||g.sync).call(this,"read",this,a)},create:function(a,b){var c=this,b=b?f.clone(b):{},a=this._prepareModel(a,b);if(!a)return!1;b.wait||c.add(a,b);var d=b.success;b.success=function(e,f){b.wait&&c.add(e,b);d?d(e,f):e.trigger("sync",a,f,b)};a.save(null,b);return a},parse:function(a){return a},chain:function(){return f(this.models).chain()},_reset:function(){this.length=0;this.models=[];this._byId={};this._byCid={}},_prepareModel:function(a,b){a instanceof g.Model?a.collection||
(a.collection=this):(b.collection=this,a=new this.model(a,b),a._validate(a.attributes,b)||(a=!1));return a},_removeReference:function(a){this==a.collection&&delete a.collection;a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){("add"==a||"remove"==a)&&c!=this||("destroy"==a&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],this._byId[b.id]=b),this.trigger.apply(this,arguments))}});f.each("forEach,each,map,reduce,reduceRight,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,sortBy,sortedIndex,toArray,size,first,initial,rest,last,without,indexOf,shuffle,lastIndexOf,isEmpty,groupBy".split(","),
function(a){g.Collection.prototype[a]=function(){return f[a].apply(f,[this.models].concat(f.toArray(arguments)))}});g.Router=function(a){a||(a={});a.routes&&(this.routes=a.routes);this._bindRoutes();this.initialize.apply(this,arguments)};var u=/:\w+/g,v=/\*\w+/g,w=/[-[\]{}()+?.,\\^$|#\s]/g;f.extend(g.Router.prototype,g.Events,{initialize:function(){},route:function(a,b,c){g.history||(g.history=new g.History);f.isRegExp(a)||(a=this._routeToRegExp(a));c||(c=this[b]);g.history.route(a,f.bind(function(d){d=
this._extractParameters(a,d);c&&c.apply(this,d);this.trigger.apply(this,["route:"+b].concat(d));g.history.trigger("route",this,b,d)},this));return this},navigate:function(a,b){g.history.navigate(a,b)},_bindRoutes:function(){if(this.routes){var a=[],b;for(b in this.routes)a.unshift([b,this.routes[b]]);b=0;for(var c=a.length;b<c;b++)this.route(a[b][0],a[b][1],this[a[b][1]])}},_routeToRegExp:function(a){a=a.replace(w,"\\$&").replace(u,"([^/]+)").replace(v,"(.*?)");return RegExp("^"+a+"$")},_extractParameters:function(a,
b){return a.exec(b).slice(1)}});g.History=function(){this.handlers=[];f.bindAll(this,"checkUrl")};var m=/^[#\/]/,x=/msie [\w.]+/,l=!1;f.extend(g.History.prototype,g.Events,{interval:50,getFragment:function(a,b){if(null==a)if(this._hasPushState||b){var a=window.location.pathname,c=window.location.search;c&&(a+=c)}else a=window.location.hash;a=decodeURIComponent(a);a.indexOf(this.options.root)||(a=a.substr(this.options.root.length));return a.replace(m,"")},start:function(a){if(l)throw Error("Backbone.history has already been started");
this.options=f.extend({},{root:"/"},this.options,a);this._wantsHashChange=!1!==this.options.hashChange;this._wantsPushState=!!this.options.pushState;this._hasPushState=!(!this.options.pushState||!window.history||!window.history.pushState);var a=this.getFragment(),b=document.documentMode;if(b=x.exec(navigator.userAgent.toLowerCase())&&(!b||7>=b))this.iframe=h('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(a);this._hasPushState?h(window).bind("popstate",
this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!b?h(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval));this.fragment=a;l=!0;a=window.location;b=a.pathname==this.options.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!b)return this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0;this._wantsPushState&&this._hasPushState&&b&&a.hash&&
(this.fragment=a.hash.replace(m,""),window.history.replaceState({},document.title,a.protocol+"//"+a.host+this.options.root+this.fragment));if(!this.options.silent)return this.loadUrl()},stop:function(){h(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl);clearInterval(this._checkUrlInterval);l=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();a==this.fragment&&this.iframe&&(a=this.getFragment(this.iframe.location.hash));
if(a==this.fragment||a==decodeURIComponent(this.fragment))return!1;this.iframe&&this.navigate(a);this.loadUrl()||this.loadUrl(window.location.hash)},loadUrl:function(a){var b=this.fragment=this.getFragment(a);return f.any(this.handlers,function(a){if(a.route.test(b))return a.callback(b),!0})},navigate:function(a,b){if(!l)return!1;if(!b||!0===b)b={trigger:b};var c=(a||"").replace(m,"");this.fragment==c||this.fragment==decodeURIComponent(c)||(this._hasPushState?(0!=c.indexOf(this.options.root)&&(c=
this.options.root+c),this.fragment=c,window.history[b.replace?"replaceState":"pushState"]({},document.title,c)):this._wantsHashChange?(this.fragment=c,this._updateHash(window.location,c,b.replace),this.iframe&&c!=this.getFragment(this.iframe.location.hash)&&(b.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,c,b.replace))):window.location.assign(this.options.root+a),b.trigger&&this.loadUrl(a))},_updateHash:function(a,b,c){c?a.replace(a.toString().replace(/(javascript:|#).*$/,
"")+"#"+b):a.hash=b}});g.View=function(a){this.cid=f.uniqueId("view");this._configure(a||{});this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()};var y=/^(\S+)\s*(.*)$/,p="model,collection,el,id,attributes,className,tagName".split(",");f.extend(g.View.prototype,g.Events,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();return this},make:function(a,b,c){a=document.createElement(a);
b&&h(a).attr(b);c&&h(a).html(c);return a},setElement:function(a,b){this.$el=h(a);this.el=this.$el[0];!1!==b&&this.delegateEvents();return this},delegateEvents:function(a){if(a||(a=j(this,"events"))){this.undelegateEvents();for(var b in a){var c=a[b];f.isFunction(c)||(c=this[a[b]]);if(!c)throw Error('Event "'+a[b]+'" does not exist');var d=b.match(y),e=d[1],d=d[2],c=f.bind(c,this),e=e+(".delegateEvents"+this.cid);""===d?this.$el.bind(e,c):this.$el.delegate(d,e,c)}}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+
this.cid)},_configure:function(a){this.options&&(a=f.extend({},this.options,a));for(var b=0,c=p.length;b<c;b++){var d=p[b];a[d]&&(this[d]=a[d])}this.options=a},_ensureElement:function(){if(this.el)this.setElement(this.el,!1);else{var a=j(this,"attributes")||{};this.id&&(a.id=this.id);this.className&&(a["class"]=this.className);this.setElement(this.make(this.tagName,a),!1)}}});g.Model.extend=g.Collection.extend=g.Router.extend=g.View.extend=function(a,b){var c=z(this,a,b);c.extend=this.extend;return c};
var A={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};g.sync=function(a,b,c){var d=A[a],e={type:d,dataType:"json"};c.url||(e.url=j(b,"url")||o());if(!c.data&&b&&("create"==a||"update"==a))e.contentType="application/json",e.data=JSON.stringify(b.toJSON());g.emulateJSON&&(e.contentType="application/x-www-form-urlencoded",e.data=e.data?{model:e.data}:{});if(g.emulateHTTP&&("PUT"===d||"DELETE"===d))g.emulateJSON&&(e.data._method=d),e.type="POST",e.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",
d)};"GET"!==e.type&&!g.emulateJSON&&(e.processData=!1);return h.ajax(f.extend(e,c))};g.wrapError=function(a,b,c){return function(d,e){e=d===b?e:d;a?a(b,e,c):b.trigger("error",b,e,c)}};var q=function(){},z=function(a,b,c){var d;d=b&&b.hasOwnProperty("constructor")?b.constructor:function(){a.apply(this,arguments)};f.extend(d,a);q.prototype=a.prototype;d.prototype=new q;b&&f.extend(d.prototype,b);c&&f.extend(d,c);d.prototype.constructor=d;d.__super__=a.prototype;return d},j=function(a,b){return!a||!a[b]?
null:f.isFunction(a[b])?a[b]():a[b]},o=function(){throw Error('A "url" property or function must be specified');}}).call(this);
/**
 * Lawnchair!
 * --- 
 * clientside json store 
 *
 */
var Lawnchair = function (options, callback) {
    // ensure Lawnchair was called as a constructor
    if (!(this instanceof Lawnchair)) return new Lawnchair(options, callback);

    // lawnchair requires json 
    if (!JSON) throw 'JSON unavailable! Include http://www.json.org/json2.js to fix.'
    // options are optional; callback is not
    if (arguments.length <= 2 && arguments.length > 0) {
        callback = (typeof arguments[0] === 'function') ? arguments[0] : arguments[1];
        options  = (typeof arguments[0] === 'function') ? {} : arguments[0];
    } else {
        throw 'Incorrect # of ctor args!'
    }
    // TODO perhaps allow for pub/sub instead?
    if (typeof callback !== 'function') throw 'No callback was provided';
    
    // default configuration 
    this.record = options.record || 'record'  // default for records
    this.name   = options.name   || 'records' // default name for underlying store
    
    // mixin first valid  adapter
    var adapter
    // if the adapter is passed in we try to load that only
    if (options.adapter) {
        for (var i = 0, l = Lawnchair.adapters.length; i < l; i++) {
            if (Lawnchair.adapters[i].adapter === options.adapter) {
              adapter = Lawnchair.adapters[i].valid() ? Lawnchair.adapters[i] : undefined;
              break;
            }
        }
    // otherwise find the first valid adapter for this env
    } 
    else {
        for (var i = 0, l = Lawnchair.adapters.length; i < l; i++) {
            adapter = Lawnchair.adapters[i].valid() ? Lawnchair.adapters[i] : undefined
            if (adapter) break 
        }
    } 
    
    // we have failed 
    if (!adapter) throw 'No valid adapter.' 
    
    // yay! mixin the adapter 
    for (var j in adapter)  
        this[j] = adapter[j]
    
    // call init for each mixed in plugin
    for (var i = 0, l = Lawnchair.plugins.length; i < l; i++) 
        Lawnchair.plugins[i].call(this)

    // init the adapter 
    this.init(options, callback)
}

Lawnchair.adapters = [] 

/** 
 * queues an adapter for mixin
 * ===
 * - ensures an adapter conforms to a specific interface
 *
 */
Lawnchair.adapter = function (id, obj) {
    // add the adapter id to the adapter obj
    // ugly here for a  cleaner dsl for implementing adapters
    obj['adapter'] = id
    // methods required to implement a lawnchair adapter 
    var implementing = 'adapter valid init keys save batch get exists all remove nuke'.split(' ')
    ,   indexOf = this.prototype.indexOf
    // mix in the adapter   
    for (var i in obj) {
        if (indexOf(implementing, i) === -1) throw 'Invalid adapter! Nonstandard method: ' + i
    }
    // if we made it this far the adapter interface is valid 
    Lawnchair.adapters.push(obj)
}

Lawnchair.plugins = []

/**
 * generic shallow extension for plugins
 * ===
 * - if an init method is found it registers it to be called when the lawnchair is inited 
 * - yes we could use hasOwnProp but nobody here is an asshole
 */ 
Lawnchair.plugin = function (obj) {
    for (var i in obj) 
        i === 'init' ? Lawnchair.plugins.push(obj[i]) : this.prototype[i] = obj[i]
}

/**
 * helpers
 *
 */
Lawnchair.prototype = {

    isArray: Array.isArray || function(o) { return Object.prototype.toString.call(o) === '[object Array]' },
    
    /**
     * this code exists for ie8... for more background see:
     * http://www.flickr.com/photos/westcoastlogic/5955365742/in/photostream
     */
    indexOf: function(ary, item, i, l) {
        if (ary.indexOf) return ary.indexOf(item)
        for (i = 0, l = ary.length; i < l; i++) if (ary[i] === item) return i
        return -1
    },

    // awesome shorthand callbacks as strings. this is shameless theft from dojo.
    lambda: function (callback) {
        return this.fn(this.record, callback)
    },

    // first stab at named parameters for terse callbacks; dojo: first != best // ;D
    fn: function (name, callback) {
        return typeof callback == 'string' ? new Function(name, callback) : callback
    },

    // returns a unique identifier (by way of Backbone.localStorage.js)
    // TODO investigate smaller UUIDs to cut on storage cost
    uuid: function () {
        var S4 = function () {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    },

    // a classic iterator
    each: function (callback) {
        var cb = this.lambda(callback)
        // iterate from chain
        if (this.__results) {
            for (var i = 0, l = this.__results.length; i < l; i++) cb.call(this, this.__results[i], i) 
        }  
        // otherwise iterate the entire collection 
        else {
            this.all(function(r) {
                for (var i = 0, l = r.length; i < l; i++) cb.call(this, r[i], i)
            })
        }
        return this
    }
// --
};



Lawnchair.adapter('webkit-sqlite', (function () {
    // private methods 
    var fail = function (e, i) { console.log('error in sqlite adaptor!', e, i) }
    ,   now  = function () { return new Date() } // FIXME need to use better date fn
	// not entirely sure if this is needed...
    if (!Function.prototype.bind) {
        Function.prototype.bind = function( obj ) {
            var slice = [].slice
            ,   args  = slice.call(arguments, 1) 
            ,   self  = this
            ,   nop   = function () {} 
            ,   bound = function () {
                    return self.apply(this instanceof nop ? this : (obj || {}), args.concat(slice.call(arguments))) 
                }
            nop.prototype   = self.prototype
            bound.prototype = new nop()
            return bound
        }
    }

    // public methods
    return {
    
        valid: function() { return !!(window.openDatabase) },

        init: function (options, callback) {
            var that   = this
            ,   cb     = that.fn(that.name, callback)
            ,   create = "CREATE TABLE IF NOT EXISTS " + this.name + " (id NVARCHAR(32) UNIQUE PRIMARY KEY, value TEXT, timestamp REAL)"
            ,   win    = function(){ return cb.call(that, that); }
            // open a connection and create the db if it doesn't exist 
            this.db = openDatabase(this.name, '1.0.0', this.name, 65536)
            this.db.transaction(function (t) { 
                t.executeSql(create, [], win, fail) 
            })
        }, 

        keys:  function (callback) {
            var cb   = this.lambda(callback)
            ,   that = this
            ,   keys = "SELECT id FROM " + this.name + " ORDER BY timestamp DESC"

            this.db.transaction(function(t) {
                var win = function (xxx, results) {
                    if (results.rows.length == 0 ) {
                        cb.call(that, [])
                    } else {
                        var r = [];
                        for (var i = 0, l = results.rows.length; i < l; i++) {
                            r.push(results.rows.item(i).id);
                        }
                        cb.call(that, r)
                    }
                }
                t.executeSql(keys, [], win, fail)
            })
            return this
        },
        // you think thats air you're breathing now?
        save: function (obj, callback) {
            var that = this
            ,   id   = obj.key || that.uuid()
            ,   ins  = "INSERT INTO " + this.name + " (value, timestamp, id) VALUES (?,?,?)"
            ,   up   = "UPDATE " + this.name + " SET value=?, timestamp=? WHERE id=?"
            ,   win  = function () { if (callback) { obj.key = id; that.lambda(callback).call(that, obj) }}
            ,   val  = [now(), id]
			// existential 
            that.exists(obj.key, function(exists) {
                // transactions are like condoms
                that.db.transaction(function(t) {
					// TODO move timestamp to a plugin
                    var insert = function (obj) {
                        val.unshift(JSON.stringify(obj))
                        t.executeSql(ins, val, win, fail)
                    }
					// TODO move timestamp to a plugin
                    var update = function (obj) {
                        delete(obj.key)
                        val.unshift(JSON.stringify(obj))
                        t.executeSql(up, val, win, fail)
                    }
					// pretty
                    exists ? update(obj) : insert(obj)
                })
            });
            return this
        }, 

		// FIXME this should be a batch insert / just getting the test to pass...
        batch: function (objs, cb) {
			
			var results = []
			,   done = false
			,   that = this

			var updateProgress = function(obj) {
				results.push(obj)
				done = results.length === objs.length
			}

			var checkProgress = setInterval(function() {
				if (done) {
					if (cb) that.lambda(cb).call(that, results)
					clearInterval(checkProgress)
				}
			}, 200)

			for (var i = 0, l = objs.length; i < l; i++) 
				this.save(objs[i], updateProgress)
			
            return this
        },

        get: function (keyOrArray, cb) {
			var that = this
			,   sql  = ''
            // batch selects support
			if (this.isArray(keyOrArray)) {
				sql = 'SELECT id, value FROM ' + this.name + " WHERE id IN ('" + keyOrArray.join("','") + "')"
			} else {
				sql = 'SELECT id, value FROM ' + this.name + " WHERE id = '" + keyOrArray + "'"
			}	
			// FIXME
            // will always loop the results but cleans it up if not a batch return at the end..
			// in other words, this could be faster
			var win = function (xxx, results) {
				var o = null
				,   r = []
				if (results.rows.length) {
					for (var i = 0, l = results.rows.length; i < l; i++) {
						o = JSON.parse(results.rows.item(i).value)
						o.key = results.rows.item(i).id
						r.push(o)
					}
				}
				if (!that.isArray(keyOrArray)) r = r.length ? r[0] : null
				if (cb) that.lambda(cb).call(that, r)
            }
            this.db.transaction(function(t){ t.executeSql(sql, [], win, fail) })
            return this 
		},

		exists: function (key, cb) {
			var is = "SELECT * FROM " + this.name + " WHERE id = ?"
			,   that = this
			,   win = function(xxx, results) { if (cb) that.fn('exists', cb).call(that, (results.rows.length > 0)) }
			this.db.transaction(function(t){ t.executeSql(is, [key], win, fail) })
			return this
		},

		all: function (callback) {
			var that = this
			,   all  = "SELECT * FROM " + this.name
			,   r    = []
			,   cb   = this.fn(this.name, callback) || undefined
			,   win  = function (xxx, results) {
				if (results.rows.length != 0) {
					for (var i = 0, l = results.rows.length; i < l; i++) {
						var obj = JSON.parse(results.rows.item(i).value)
						obj.key = results.rows.item(i).id
						r.push(obj)
					}
				}
				if (cb) cb.call(that, r)
			}

			this.db.transaction(function (t) { 
				t.executeSql(all, [], win, fail) 
			})
			return this
		},

		remove: function (keyOrObj, cb) {
			var that = this
			,   key  = typeof keyOrObj === 'string' ? keyOrObj : keyOrObj.key
			,   del  = "DELETE FROM " + this.name + " WHERE id = ?"
			,   win  = function () { if (cb) that.lambda(cb).call(that) }

			this.db.transaction( function (t) {
				t.executeSql(del, [key], win, fail);
			});

			return this;
		},

		nuke: function (cb) {
			var nuke = "DELETE FROM " + this.name
			,   that = this
			,   win  = cb ? function() { that.lambda(cb).call(that) } : function(){}
				this.db.transaction(function (t) { 
				t.executeSql(nuke, [], win, fail) 
			})
			return this
		}
//////
}})())
/**
* Bootstrap.js by @fat & @mdo
* plugins: bootstrap-transition.js, bootstrap-modal.js, bootstrap-tooltip.js, bootstrap-popover.js, bootstrap-alert.js, bootstrap-button.js
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(a){a(function(){"use strict",a.support.transition=function(){var b=document.body||document.documentElement,c=b.style,d=c.transition!==undefined||c.WebkitTransition!==undefined||c.MozTransition!==undefined||c.MsTransition!==undefined||c.OTransition!==undefined;return d&&{end:function(){var b="TransitionEnd";return a.browser.webkit?b="webkitTransitionEnd":a.browser.mozilla?b="transitionend":a.browser.opera&&(b="oTransitionEnd"),b}()}}()})}(window.jQuery),!function(a){function c(){var b=this,c=setTimeout(function(){b.$element.off(a.support.transition.end),d.call(b)},500);this.$element.one(a.support.transition.end,function(){clearTimeout(c),d.call(b)})}function d(a){this.$element.hide().trigger("hidden"),e.call(this)}function e(b){var c=this,d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var e=a.support.transition&&d;this.$backdrop=a('<div class="modal-backdrop '+d+'" />').appendTo(document.body),this.options.backdrop!="static"&&this.$backdrop.click(a.proxy(this.hide,this)),e&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),e?this.$backdrop.one(a.support.transition.end,b):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,a.proxy(f,this)):f.call(this)):b&&b()}function f(){this.$backdrop.remove(),this.$backdrop=null}function g(){var b=this;this.isShown&&this.options.keyboard?a(document).on("keyup.dismiss.modal",function(a){a.which==27&&b.hide()}):this.isShown||a(document).off("keyup.dismiss.modal")}"use strict";var b=function(b,c){this.options=c,this.$element=a(b).delegate('[data-dismiss="modal"]',"click.dismiss.modal",a.proxy(this.hide,this))};b.prototype={constructor:b,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var b=this;if(this.isShown)return;a("body").addClass("modal-open"),this.isShown=!0,this.$element.trigger("show"),g.call(this),e.call(this,function(){var c=a.support.transition&&b.$element.hasClass("fade");!b.$element.parent().length&&b.$element.appendTo(document.body),b.$element.show(),c&&b.$element[0].offsetWidth,b.$element.addClass("in"),c?b.$element.one(a.support.transition.end,function(){b.$element.trigger("shown")}):b.$element.trigger("shown")})},hide:function(b){b&&b.preventDefault();if(!this.isShown)return;var e=this;this.isShown=!1,a("body").removeClass("modal-open"),g.call(this),this.$element.trigger("hide").removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?c.call(this):d.call(this)}},a.fn.modal=function(c){return this.each(function(){var d=a(this),e=d.data("modal"),f=a.extend({},a.fn.modal.defaults,typeof c=="object"&&c);e||d.data("modal",e=new b(this,f)),typeof c=="string"?e[c]():f.show&&e.show()})},a.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},a.fn.modal.Constructor=b,a(function(){a("body").on("click.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d,e=a(c.attr("data-target")||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("modal")?"toggle":a.extend({},e.data(),c.data());b.preventDefault(),e.modal(f)})})}(window.jQuery),!function(a){"use strict";var b=function(a,b){this.init("tooltip",a,b)};b.prototype={constructor:b,init:function(b,c,d){var e,f;this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.enabled=!0,this.options.trigger!="manual"&&(e=this.options.trigger=="hover"?"mouseenter":"focus",f=this.options.trigger=="hover"?"mouseleave":"blur",this.$element.on(e,this.options.selector,a.proxy(this.enter,this)),this.$element.on(f,this.options.selector,a.proxy(this.leave,this))),this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(b){return b=a.extend({},a.fn[this.type].defaults,b,this.$element.data()),b.delay&&typeof b.delay=="number"&&(b.delay={show:b.delay,hide:b.delay}),b},enter:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);!c.options.delay||!c.options.delay.show?c.show():(c.hoverState="in",setTimeout(function(){c.hoverState=="in"&&c.show()},c.options.delay.show))},leave:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);!c.options.delay||!c.options.delay.hide?c.hide():(c.hoverState="out",setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide))},show:function(){var a,b,c,d,e,f,g;if(this.hasContent()&&this.enabled){a=this.tip(),this.setContent(),this.options.animation&&a.addClass("fade"),f=typeof this.options.placement=="function"?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement,b=/in/.test(f),a.remove().css({top:0,left:0,display:"block"}).appendTo(b?this.$element:document.body),c=this.getPosition(b),d=a[0].offsetWidth,e=a[0].offsetHeight;switch(b?f.split(" ")[1]:f){case"bottom":g={top:c.top+c.height,left:c.left+c.width/2-d/2};break;case"top":g={top:c.top-e,left:c.left+c.width/2-d/2};break;case"left":g={top:c.top+c.height/2-e/2,left:c.left-d};break;case"right":g={top:c.top+c.height/2-e/2,left:c.left+c.width}}a.css(g).addClass(f).addClass("in")}},setContent:function(){var a=this.tip();a.find(".tooltip-inner").html(this.getTitle()),a.removeClass("fade in top bottom left right")},hide:function(){function d(){var b=setTimeout(function(){c.off(a.support.transition.end).remove()},500);c.one(a.support.transition.end,function(){clearTimeout(b),c.remove()})}var b=this,c=this.tip();c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d():c.remove()},fixTitle:function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(b){return a.extend({},b?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title),a=a.toString().replace(/(^\s*|\s*$)/,""),a},tip:function(){return this.$tip=this.$tip||a(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()}},a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("tooltip"),f=typeof c=="object"&&c;e||d.data("tooltip",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.defaults={animation:!0,delay:0,selector:!1,placement:"top",trigger:"hover",title:"",template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'}}(window.jQuery),!function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype,{constructor:b,setContent:function(){var b=this.tip(),c=this.getTitle(),d=this.getContent();b.find(".popover-title")[a.type(c)=="object"?"append":"html"](c),b.find(".popover-content > *")[a.type(d)=="object"?"append":"html"](d),b.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-content")||(typeof c.content=="function"?c.content.call(b[0]):c.content),a=a.toString().replace(/(^\s*|\s*$)/,""),a},tip:function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip}}),a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("popover"),f=typeof c=="object"&&c;e||d.data("popover",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.defaults=a.extend({},a.fn.tooltip.defaults,{placement:"right",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery),!function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype={constructor:c,close:function(b){function f(){e.remove(),e.trigger("closed")}var c=a(this),d=c.attr("data-target"),e;d||(d=c.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),e=a(d),e.trigger("close"),b&&b.preventDefault(),e.length||(e=c.hasClass("alert")?c:c.parent()),e.removeClass("in"),a.support.transition&&e.hasClass("fade")?e.on(a.support.transition.end,f):f()}},a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("alert");e||d.data("alert",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.alert.Constructor=c,a(function(){a("body").on("click.alert.data-api",b,c.prototype.close)})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.button.defaults,c)};b.prototype={constructor:b,setState:function(a){var b="disabled",c=this.$element,d=c.data(),e=c.is("input")?"val":"html";a+="Text",d.resetText||c.data("resetText",c[e]()),c[e](d[a]||this.options[a]),setTimeout(function(){a=="loadingText"?c.addClass(b).attr(b,b):c.removeClass(b).removeAttr(b)},0)},toggle:function(){var a=this.$element.parent('[data-toggle="buttons-radio"]');a&&a.find(".active").removeClass("active"),this.$element.toggleClass("active")}},a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("button"),f=typeof c=="object"&&c;e||d.data("button",e=new b(this,f)),c=="toggle"?e.toggle():c&&e.setState(c)})},a.fn.button.defaults={loadingText:"loading..."},a.fn.button.Constructor=b,a(function(){a("body").on("click.button.data-api","[data-toggle^=button]",function(b){a(b.target).button("toggle")})})}(window.jQuery); //<== MUST put a semicolon here because twitter bootstrap is written by a bunch of smelly hipsters
/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
		 * Licensed under the MIT License (LICENSE.txt).
		 *
		 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
		 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
		 * Thanks to: Seamus Leahy for adding deltaX and deltaY
		 *
		 * Version: 3.0.6
		 * 
		 * Requires: 1.2.2+
		 */

		(function($) {

		var types = ['DOMMouseScroll', 'mousewheel'];

		if ($.event.fixHooks) {
			for ( var i=types.length; i; ) {
				$.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
			}
		}

		$.event.special.mousewheel = {
			setup: function() {
				if ( this.addEventListener ) {
					for ( var i=types.length; i; ) {
						this.addEventListener( types[--i], handler, false );
					}
				} else {
					this.onmousewheel = handler;
				}
			},
			
			teardown: function() {
				if ( this.removeEventListener ) {
					for ( var i=types.length; i; ) {
						this.removeEventListener( types[--i], handler, false );
					}
				} else {
					this.onmousewheel = null;
				}
			}
		};

		$.fn.extend({
			mousewheel: function(fn) {
				return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
			},
			
			unmousewheel: function(fn) {
				return this.unbind("mousewheel", fn);
			}
		});


		function handler(event) {
			var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
			event = $.event.fix(orgEvent);
			event.type = "mousewheel";
			
			// Old school scrollwheel delta
			if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
			if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
			
			// New school multidimensional scroll (touchpads) deltas
			deltaY = delta;
			
			// Gecko
			if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
				deltaY = 0;
				deltaX = -1*delta;
			}
			
			// Webkit
			if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
			if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
			
			// Add event and delta to the front of the arguments
			args.unshift(event, delta, deltaX, deltaY);
			
			return ($.event.dispatch || $.event.handle).apply(this, args);
		}

		})(window.jQuery);

		// start this bad boy off with a semicolon, thats right a semicolon

(function($) {

	/************ BEGIN VirtualRectangle Class Definition ***********/
	var VirtualRectangle = function(startRect) {
		this.startRect = startRect;
		this.top 	= startRect.top;
		this.left 	= startRect.left;
		this.width 	= startRect.width;
		this.height = startRect.height;
		this.scale 	= 1.0;
	};

	VirtualRectangle.prototype.applyConstraints = function() {
		
	};

	VirtualRectangle.prototype.getZoom = function() {
		return this.height / this.startRect.height;
	};

	VirtualRectangle.prototype.getOffsetX = function() {
		return (this.left - this.startRect.left) / this.scale;
	};

	VirtualRectangle.prototype.getOffsetY = function() {
		return (this.top - this.startRect.top) / this.scale;
	};

	VirtualRectangle.prototype.pan = function(deltaX, deltaY) {
		this.top += deltaY;
		this.left += deltaX;
	}

	VirtualRectangle.prototype.zoom = function(originX, originY, delta) {
		var scale = (this.width + delta) / this.startRect.width;
		var width = scale * this.startRect.width;
		var height = scale * this.startRect.height;

		// we want to keep the transorm origin in th same place on screen
		// so we need to do a transformation to compensate
		var rightShift = 0; //(originX)/(this.startRect.width) * (width - this.width);
		var upShift = 0;// (originY)/(this.startRect.height) * (height - this.height);
		
		this.width = width;
		this.height = height;
		this.scale = scale;
		this.top -= upShift;
		this.left -= rightShift;
	};

	VirtualRectangle.prototype.applyScale = function(originX, originY, scale) {

		if(scale > 4) scale = 4;
		if(scale < 0.1) scale = 0.1;
		
		var width = scale * this.startRect.width;
		var height = scale * this.startRect.height;
		
		// we want to keep the transorm origin in th same place on screen
		// so we need to do a transformation to compensate
		var rightShift =0// 0.5 * (width - this.width);
		var upShift = 0//.5 * (height - this.height);
		this.width = width;
		this.height = height;
		this.scale = scale;
		this.top -= upShift;
		this.left -= rightShift;
	};

	/************ END VirtualRectangle Class Definition ***********/

	var getTransformString = function(vrect) {
		var str =  'scale(' + vrect.getZoom() + ') '
			str +=	'translate('+vrect.getOffsetX()+'px, '+vrect.getOffsetY()+'px)'
			return str;
	};
	
	var bindMouseWheelHandler = function($elem, vRect, startRender, stopRender, options) {
		var timeout = null;
		// zoom via mouse wheel events
		$elem.mousewheel(function(event, dt) {
			event.preventDefault();

			vRect.zoom(event.offsetX, event.offsetY, dt*options.scaleRate);
			
			if(timeout) {
				clearTimeout(timeout);
			}
			startRender();
			// set the timeout to stop running
			timeout = setTimeout(function() {
				stopRender();
			}, 35);
			
		});
	};

	var bindMouseDownHandler = function($elem, vRect, startRender, stopRender, options) {
		var mouseTrack = false;
		var mousePos = {
			x: 0,
			y: 0
		}
		// pan and zoom via click and drag
		$elem.mousedown(function(e) {
			mouseTrack = true;
			mousePos.x = e.clientX;
			mousePos.y = e.clientY;
			startRender();
		}).mouseup(function(e) {
			mouseTrack = false;
			stopRender();
		}).mousemove(function(e) {
			if(mouseTrack) {
				var deltaX = e.clientX - mousePos.x;
				var deltaY = e.clientY - mousePos.y;
				vRect.pan(deltaX, deltaY);
				vRect.applyConstraints();
				mousePos.x = e.clientX;
				mousePos.y = e.clientY;
			}
		});
		
	};

	var bindGestureHandler = function($elem, vRect, startRender, stopRender, options) {

		var timeout; // capture this the click handler functions closure
		var startScale = 1;

		$elem.on("gesturestart", function(event) {
			event.preventDefault();
			startScale = event.originalEvent.scale
			startRender();
		}).on("gestureend", function(event) {
			event.preventDefault();

			stopRender();
		}).on("gesturechange", function(event) {
			event.preventDefault();
			/*var log = ""
			for(x in event) {
				log += x + "\n";
			}
			alert(log);*/
			vRect.applyScale(0, 0, event.originalEvent.scale);
			// if(timeout) {
			// 	clearTimeout(timeout);
			// }
			startRender();
			// set the timeout to stop running
			// timeout = setTimeout(function() {
			// 	stopRender();
			// }, 105);
		});
	}

	$.fn.zoomAndScale = function(options) {

		options = $.extend({}, $.fn.zoomAndScale.defaults, options);

		return this.each(function() {
			var $elem = $(this);
			var $parent = $('body');

			// put it in the center of it's parent
			var right = ($elem.width() -  $parent.width()) / 2;
			var top = ($elem.height() -  $parent.height()) / 2 + 20;
			if(right > 0) {
				$elem.css({
				"position": "relative",
				"right": right + "px",
				"top": "-" + top + "px", 
				});
			}
			


			var dontRender = true;
			
			var startRect = {
				top: 0,
				left: 0,
				width: $elem.width(),
				height: $elem.height()
			};
			var virtualRect = new VirtualRectangle(startRect);
			virtualRect.applyScale(0, 0, ( $parent.height() / $elem.height() ) * 0.9 );
			$elem.css('-webkit-transform', getTransformString(virtualRect) );

			//$elem.css('-webkit-transform-origin', "0 0");

			$elem.css('-webkit-transform', getTransformString(virtualRect) );

			// render loop for the element
			var render = function() {
				if(dontRender) return;
				$elem.css('-webkit-transform', getTransformString(virtualRect) );
				setTimeout(render, options.frameRate);
			};

			var startRender = function() {
				if(dontRender) {
					dontRender = false;
					render();
				}
			};

			var stopRender = function() {
				dontRender = true;
			}

			bindMouseDownHandler($elem, virtualRect, startRender, stopRender, options);
			bindMouseWheelHandler($elem, virtualRect, startRender, stopRender, options);
			bindGestureHandler($elem, virtualRect, startRender, stopRender, options);
		
			
		});
	};

	$.fn.zoomAndScale.defaults = {
		frameRate: 30,
		scaleRate: 30
	}

})(window.jQuery);
/**
* Jath is free software provided under the MIT license.
*	See LICENSE file for full text of the license.
*	Copyright 2010 Dan Newcome.
*/
(function() {

Jath = {};
Jath.parse = parse;
Jath.resolver = null;
// values prefixed with literal charactar marker will not be
// treated as xpath expressions and will be output directly
Jath.literalChar = ":";

/**
* Rudimentary check for IE
* Also added support for WSH, uses the same API as IE
*/
var m_browser;
if( typeof WScript != "undefined" ) {
	m_browser = 'msie';
}
// TODO: is there a better way to detect node.js?
else if( typeof process != "undefined" ) {
	// running under node.js
	m_browser = 'node';
	var xmljs = require( 'libxmljs' );
	exports.parse = parse;
}
else if( navigator.userAgent.toLowerCase().indexOf( 'msie' ) > -1 ) {
	m_browser = 'msie';
}
else {
	m_browser = 'standards';
}

/**
* parse: 
*	process xml doc according to the given json template
*	@template - output spec as a json template
*	@xmldoc - input xml document
*	@node - the starting node to use in the document. xpath
*		expressions will be evaluated relative to this node.
*		If not given, root will be used.
*/
function parse( template, xmldoc, node ) {
	if( node === undefined ) {
		node = xmldoc;
	}
	if( typeOf( template ) === 'array' ) {
		return parseArray( template, xmldoc, node );
	}
	else if( typeOf( template ) === 'object' ) {
		return parseObject( template, xmldoc, node );
	}
	else {
		return parseItem( template, xmldoc, node );
	}
}

function parseArray( template, xmldoc, node ) {
	var retVal = [];

	if( template[0] != null ) {
		if( m_browser == 'msie' ) {
			xmldoc.setProperty("SelectionLanguage", "XPath");
			var nodeList = node.selectNodes( template[0] );
			var thisNode;
			while( thisNode = nodeList.nextNode() ) {
				retVal.push( parse( template[1], xmldoc, thisNode ) );
			}
		}
		else if( m_browser == 'node' ) {
			var nodeList = node.find( template[0] );
			for( var i=0; i < nodeList.length; i++ ) {
				retVal.push( parse( template[1], xmldoc, nodeList[i] ) );
			}
		}
		else {
			var xpathResult = xmldoc.evaluate( template[0], node, Jath.resolver, XPathResult.ANY_TYPE, null );
			var thisNode;
			while( thisNode = xpathResult.iterateNext() ) {
				retVal.push( parse( template[1], xmldoc, thisNode ) );
			}
		}
	}
	// we can have an array output without iterating over the source
	// data - in this case, current node is static 
	else {
		for( var i=1; i < template.length; i++ ) {
			retVal.push( parse( template[i], xmldoc, node ) );
		}
	}

	return retVal;
}

function parseObject( template, xmldoc, node ) {
	var item;
	var newitem = {};
	for( item in template ) {
		newitem[item] = parse( template[item], xmldoc, node );
	}
	return newitem;
}

function parseItem( template, xmldoc, node ) {
	if( m_browser == 'msie' ) {
		xmldoc.setProperty("SelectionLanguage", "XPath");
		if( typeOf( template ) == 'string' && template.substring( 0, 1 ) != Jath.literalChar ) {
			return node.selectSingleNode( template ).text;
		}
		else {
			return template.substring( 1 );
		}
	}
	else if( m_browser == 'node' ) {
		require('sys').puts( template );	
		return node.get( template ).text();
	}
	else {
		if( typeOf( template ) == 'string' && template[0] != Jath.literalChar ) {
			return xmldoc.evaluate( template, node, Jath.resolver, XPathResult.STRING_TYPE, null ).stringValue;
		}
		else {
			return template.substring( 1 );
		}
	}
}

/**
* typeOf function published by Douglas Crockford in ECMAScript recommendations
* http://www.crockford.com/javascript/recommend.html
*/
function typeOf(value) {
	var s = typeof value;
	if (s === 'object') {
		if (value) {
			if (typeof value.length === 'number' &&
					!(value.propertyIsEnumerable('length')) &&
					typeof value.splice === 'function') {
				s = 'array';
			}
		} else {
			s = 'null';
		}
	}
	return s;
}

})();
/*
 * An URI datatype.  Based upon examples in RFC3986.
 *
 * TODO %-escaping
 * TODO split apart authority
 * TODO split apart query_string (on demand, anyway)
 *
 * @(#) $Id$
 */
 
// Constructor for the URI object.  Parse a string into its components.
function URI(str) {
    if (!str) str = "";
    // Based on the regex in RFC2396 Appendix B.
    var parser = /^(?:([^:\/?\#]+):)?(?:\/\/([^\/?\#]*))?([^?\#]*)(?:\?([^\#]*))?(?:\#(.*))?/;
    var result = str.match(parser);
    this.scheme    = result[1] || null;
    this.authority = result[2] || null;
    this.path      = result[3] || null;
    this.query     = result[4] || null;
    this.fragment  = result[5] || null;
}

// Restore the URI to it's stringy glory.
URI.prototype.toString = function () {
    var str = "";
    if (this.scheme) {
        str += this.scheme + ":";
    }
    if (this.authority) {
        str += "//" + this.authority;
    }
    if (this.path) {
        str += this.path;
    }
    if (this.query) {
        str += "?" + this.query;
    }
    if (this.fragment) {
        str += "#" + this.fragment;
    }
    return str;
};

// Introduce a new scope to define some private helper functions.
(function () {
    // RFC3986 §5.2.3 (Merge Paths)
    function merge(base, rel_path) {
        var dirname = /^(.*)\//;
        if (base.authority && !base.path) {
            return "/" + rel_path;
        }
        else {
            return base.path.match(dirname)[0] + rel_path;
        }
    }

    // Match two path segments, where the second is ".." and the first must
    // not be "..".
    var DoubleDot = /\/((?!\.\.\/)[^\/]*)\/\.\.\//;

    function remove_dot_segments(path) {
        if (!path) return "";
        // Remove any single dots
        var newpath = path.replace(/\/\.\//g, '/');
        // Remove any trailing single dots.
        newpath = newpath.replace(/\/\.$/, '/');
        // Remove any double dots and the path previous.  NB: We can't use
        // the "g", modifier because we are changing the string that we're
        // matching over.
        while (newpath.match(DoubleDot)) {
            newpath = newpath.replace(DoubleDot, '/');
        }
        // Remove any trailing double dots.
        newpath = newpath.replace(/\/([^\/]*)\/\.\.$/, '/');
        // If there are any remaining double dot bits, then they're wrong
        // and must be nuked.  Again, we can't use the g modifier.
        while (newpath.match(/\/\.\.\//)) {
            newpath = newpath.replace(/\/\.\.\//, '/');
        }
        return newpath;
    }

    // RFC3986 §5.2.2. Transform References;
    URI.prototype.resolve = function (base) {
        var target = new URI();
        if (this.scheme) {
            target.scheme    = this.scheme;
            target.authority = this.authority;
            target.path      = remove_dot_segments(this.path);
            target.query     = this.query;
        }
        else {
            if (this.authority) {
                target.authority = this.authority;
                target.path      = remove_dot_segments(this.path);
                target.query     = this.query;
            }        
            else {
                // XXX Original spec says "if defined and empty"…;
                if (!this.path) {
                    target.path = base.path;
                    if (this.query) {
                        target.query = this.query;
                    }
                    else {
                        target.query = base.query;
                    }
                }
                else {
                    if (this.path.charAt(0) === '/') {
                        target.path = remove_dot_segments(this.path);
                    } else {
                        target.path = merge(base, this.path);
                        target.path = remove_dot_segments(target.path);
                    }
                    target.query = this.query;
                }
                target.authority = base.authority;
            }
            target.scheme = base.scheme;
        }

        target.fragment = this.fragment;

        return target;
    };
})();
// ZipFile.complete.js
//
// Tue 05/10/2011
//
// =======================================================
//

// JSIO.core.js
//
// core methods for Javascript IO.
//
// by Dino Chiesa
//
// Tue, 19 Jan 2010  17:44
//
// Licensed under the Ms-PL, see
// the accompanying License.txt file
//


(function(){
    if (typeof JSIO == "object"){
        var e1 = new Error("JSIO is already defined");
        e1.source = "JSIO.core.js";
        throw e1;
    }

    JSIO = {};

    JSIO.version = "1.3 2011May10";

    // Format a number as hex.  Quantities over 7ffffff will be displayed properly.
    JSIO.decimalToHexString = function(number, digits) {
        if (number < 0) {
            number = 0xFFFFFFFF + number + 1;
        }
        var r1 = number.toString(16).toUpperCase();
        if (digits) {
            r1 = "00000000" + r1;
            r1 = r1.substring(r1.length - digits);
        }
        return r1;
    };

    JSIO.FileType = {
        Text    : 0,
        Binary  : 1,
        XML     : 2,
        Unknown : 3
    };


    JSIO.guessFileType = function(name) {

        if (name == "makefile")  { return JSIO.FileType.Text; }
		if (name == "mimetype")  { return JSIO.FileType.Text; } 

        var lastDot = name.lastIndexOf(".");
        if (lastDot <= 0) { return JSIO.FileType.Unknown; }

        var ext= name.substring(lastDot);
        if (ext == ".zip")   { return JSIO.FileType.Binary; }
        if (ext == ".xlsx")  { return JSIO.FileType.Binary; }
        if (ext == ".docx")  { return JSIO.FileType.Binary; }
        if (ext == ".dll")   { return JSIO.FileType.Binary; }
        if (ext == ".obj")   { return JSIO.FileType.Binary; }
        if (ext == ".pdb")   { return JSIO.FileType.Binary; }
        if (ext == ".exe")   { return JSIO.FileType.Binary; }

        if (ext == ".xml")      { return JSIO.FileType.XML; }
        if (ext == ".xsl")      { return JSIO.FileType.XML; }
        if (ext == ".csproj")   { return JSIO.FileType.XML; }
        if (ext == ".vbproj")   { return JSIO.FileType.XML; }
        if (ext == ".shfbproj") { return JSIO.FileType.XML; }
        if (ext == ".resx")     { return JSIO.FileType.XML; }
        if (ext == ".xslt")     { return JSIO.FileType.XML; }

        if (ext == ".sln")  { return JSIO.FileType.Text; }
        if (ext == ".htm")  { return JSIO.FileType.Text; }
        if (ext == ".html") { return JSIO.FileType.Text; }
        if (ext == ".js")   { return JSIO.FileType.Text; }
        if (ext == ".vb")   { return JSIO.FileType.Text; }
        if (ext == ".txt")  { return JSIO.FileType.Text; }
        if (ext == ".rels") { return JSIO.FileType.Text; }
        if (ext == ".css")  { return JSIO.FileType.Text; }
        if (ext == ".cs")   { return JSIO.FileType.Text; }
		
		// Readium specific modifications to the library
		// TODO: look at diff between JSIO.FileType.Text and JSIO.FileType.XML
		if (ext == ".ncx")   { return JSIO.FileType.Text; }
		if (ext == ".xhtml") { return JSIO.FileType.Text; }
		if (ext == ".opf")   { return JSIO.FileType.Text; } 


        return JSIO.FileType.Unknown;
    };

    JSIO.stringOfLength = function (charCode, length) {
        var s3 = "";
        for (var i = 0; i < length; i++) {
            s3 += String.fromCharCode(charCode);
        }
        return s3;
    };

    JSIO.formatByteArray = function(b) {
        var s1 = "0000  ";
        var s2 = "";
        for (var i = 0; i < b.length; i++) {
            if (i !== 0 && i % 16 === 0) {
                s1 += "    " + s2 +"\n" + JSIO.decimalToHexString(i, 4) + "  ";
                s2 = "";
            }
            s1 += JSIO.decimalToHexString(b[i], 2) + " ";
            if (b[i] >=32 && b[i] <= 126) {
                s2 += String.fromCharCode(b[i]);
            } else {
                s2 += ".";
            }
        }
        if (s2.length > 0) {
            s1 += JSIO.stringOfLength(32, ((i%16>0)? ((16 - i%16) * 3) : 0) + 4) + s2;
        }
        return s1;
    };


//     JSIO.htmlEscape = function(str) {
//         var div = document.createElement('div');
//         var text = document.createTextNode(str);
//         div.appendChild(text);
//         return div.innerHTML;
//     };

    JSIO.htmlEscape = function(str) {
        return str
            .replace(new RegExp( "&", "g" ), "&amp;")
            .replace(new RegExp( "<", "g" ), "&lt;")
            .replace(new RegExp( ">", "g" ), "&gt;")
            .replace(new RegExp( "\x13", "g" ), "<br/>")
            .replace(new RegExp( "\x10", "g" ), "<br/>");
    };


})();

/// JSIO.core.js ends


// JSIO.BasicByteReaders.js
// ------------------------------------------------------------------
//
// Part of the JSIO library.  Adds a couple basic ByteReaders to JSIO.
// ByteReaders are forward-only byte-wise readers. They read one byte at
// a time from a source.
//
// =======================================================
//
// A ByteReader exposes an interface with these functions:
//
//    readByte()
//       must return null when EOF is reached.
//
//    readToEnd()
//       returns an array of all bytes read, to EOF
//
//    beginReadToEnd(callback)
//       async version of the above
//
//    readBytes(n)
//       returns an array of the next n bytes from the source
//
//    beginReadBytes(n, callback)
//       async version of the above
//
// =======================================================
//
// Copyright (c) 2010, Dino Chiesa
//
// This work is licensed under the MS-PL.  See the attached
// License.txt file for details.
//
// Last saved: <2011-May-10 17:25:15>
//


(function(){
    var version = "1.3 2011May10";

    if (typeof JSIO !== "object") { JSIO = {}; }
    if ((typeof JSIO.version !== "string")) {
        JSIO.version = version;
    }
    else if ((JSIO.version.length < 3) ||
            (JSIO.version.substring(0,3) !== "1.3")) {
        JSIO.version += " " + version;
    }

    // =======================================================
    // the base object, used as the prototype of all ByteReader objects.
    var _byteReaderBase = function () {
        this.position = 0;
        // position must be incremented in .readByte() for all derived classes
    };

    _byteReaderBase.prototype.readToEnd = function() {
        var accumulator = [];
        var b = this.readByte();
        while (b !== null) {
            accumulator.push(b);
            b = this.readByte();
        }
        return accumulator;
    };

    _byteReaderBase.prototype.beginReadToEnd = function(callback) {
        var bytesRead = [];
        var thisByteReader = this;
        var readBatchAsync = function() {
            var c = 0;
            var b = thisByteReader.readByte();
            while(b !== null) {
                bytesRead.push(b);
                c++;
                if(c >= 1024) { break; }
                b = thisByteReader.readByte();
            }
            if (b!==null){
                if (typeof (setTimeout) == "undefined") {
                    // recurse
                    readBatchAsync();
                }
                else {
                    setTimeout(readBatchAsync, 1);
                }
            }
            else {
                callback(bytesRead);
            }
        };

        // kickoff
        readBatchAsync();
        return null;
    };


    _byteReaderBase.prototype.readBytes = function(n){
        var bytesRead = [];
        for(var i=0; i<n; ++i) {
            bytesRead.push(this.readByte());
        }
        return bytesRead;
    };


    _byteReaderBase.prototype.beginReadBytes = function(n,callback) {
        var bytesRead = [];
        var thisByteReader = this;
        var leftToRead = n;

        var readBatchAsync = function() {
            var c = 0;
            var b = thisByteReader.readByte();
            while(leftToRead > 0 && b !== null) {
                bytesRead.push(b);
                c++;
                leftToRead--;
                if(c >= 1024) { break; }
                b = thisByteReader.readByte();
            }
            if (leftToRead>0 && b !== null){
                setTimeout(readBatchAsync, 1);
            }
            else {
                callback(bytesRead);
            }
        };

        // kickoff
        readBatchAsync();
        return null;
    };

    JSIO._ByteReaderBase = _byteReaderBase;
    // =======================================================




    // =======================================================
    // reads from an array of bytes.
    // This basically wraps a readByte() fn onto array access.
    var _arrayReader = function(array) {
        if (! (this instanceof arguments.callee) ) {
            var error = new Error("you must use new to instantiate this class");
            error.source = "JSIO.ArrayReader";
            throw error;
        }
        this.position = 0;
        this.array = array;
        this._typename = "JSIO.ArrayReader";
        this._version = version;
        return this;
    };

    _arrayReader.prototype = new JSIO._ByteReaderBase();

    _arrayReader.prototype.readByte = function() {
        if (this.position >= this.array.length) { return null;}  // EOF
        var b = this.array[this.position];
        this.position++;
        return b;
    };

    // =======================================================


    // =======================================================
    // reads one byte at a time from a BinaryUrlStream, until EOF.
    var _streamReader = function(stream) {
        if (! (this instanceof arguments.callee) ) {
            var error = new Error("you must use new to instantiate this class");
            error.source = "JSIO.StreamReader";
            throw error;
        }

        if (stream) {} else {
            var e2 = new Error("you must pass a non-null stream.");
            e2.source = "JSIO.StreamReader";
            throw e2;
        }

        this.stream = stream;
        this.position = 0;
        this._typeName = "JSIO.StreamReader";
        this._version = version;
        this.length = stream.getLength();
        return this;
    };

    _streamReader.prototype = new JSIO._ByteReaderBase();

    _streamReader.prototype.readByte = function() {
        if (this.position >= this.length) { return null;}  // EOF
        var b = this.stream.readByteAt(this.position);
        this.position++;
        return b;
    };
    // =======================================================



    // =======================================================
    // reads one byte at a time from a defined segment of a stream.
    var _streamSegmentReader = function(stream, offset, length) {
        if (! (this instanceof arguments.callee) ) {
            var error = new Error("you must use new to instantiate this class");
            error.source = "JSIO.StreamSegmentReader";
            throw error;
        }

        if (stream) {} else {
            var e2 = new Error("you must pass a non-null stream.");
            e2.source = "JSIO.StreamSegmentReader";
            throw e2;
        }

        this.stream = stream;
        this.position = offset || 0;
        this.limit =  (length) ?  offset + length : 0;
        this._typeName =  "JSIO.StreamSegmentReader";
        this._version = version;
        return this;
    };

    _streamSegmentReader.prototype = new JSIO._ByteReaderBase();

    _streamSegmentReader.prototype.readByte = function() {
        if ((this.limit !== 0) && (this.position >= this.limit)) { return null;}  // EOF
        var b = this.stream.readByteAt(this.position);
        this.position++;
        return b;
    };
    // =======================================================

    JSIO.ArrayReader = _arrayReader;
    JSIO.StreamReader = _streamReader;
    JSIO.StreamSegmentReader = _streamSegmentReader;

})();


/// JSIO.BasicByteReaders.js ends

/**
 * JSIO.BinaryUrlStream.js
 *
 * a class that acts as a stream wrapper around binary files obtained from URLs.
 *
 *
 * Derived from work that is
 * Copyright (c) 2008 Andy G.P. Na <nagoon97@naver.com>
 * The source code is freely distributable under the terms of an MIT-style license.
 *
 * You can find out more about the original code at
 * http://nagoon97.com/reading-binary-files-using-ajax/
 */

(function(){
    var version = "1.3 2011May10";
    var typename = "JSIO.BinaryUrlStream";

    if ((typeof JSIO !== "object") ||
        (typeof JSIO.version !== "string") ||
        (JSIO.version.length < 3) ||
        (JSIO.version.substring(0,3) !== "1.3")) {
        var e1 = new Error("This extension requires JSIO.core.js v1.3");
        e1.source = typename + ".js";
        throw e1;
    }

    if (typeof JSIO._ByteReaderBase !== "function") {
        var e2 = new Error("This class requires JSIO.BasicByteReaders.js");
        e2.source = typename + ".js";
        throw e2;
    }

    // internal var
    var Exceptions = {
        FileLoadFailed : 1,
        EOFReached     : 2,
        NoXHR          : 3,
        BadSeek        : 4
    };

    if(/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
        var IEBinaryToArray_ByteStr_Script =
            "<!-- IEBinaryToArray_ByteStr -->\r\n"+
            "<script type='text/vbscript'>\r\n"+
            "Function IEBinaryToArray_ByteStr(Binary)\r\n"+
            "   IEBinaryToArray_ByteStr = CStr(Binary)\r\n"+
            "End Function\r\n"+
            "Function IEBinaryToArray_ByteStr_Last(Binary)\r\n"+
            "   Dim lastIndex\r\n"+
            "   lastIndex = LenB(Binary)\r\n"+
            "   if lastIndex mod 2 Then\r\n"+
            "           IEBinaryToArray_ByteStr_Last = Chr( AscB( MidB( Binary, lastIndex, 1 ) ) )\r\n"+
            "   Else\r\n"+
            "           IEBinaryToArray_ByteStr_Last = "+'""'+"\r\n"+
            "   End If\r\n"+
            "End Function\r\n"+
            "</script>\r\n";

        // inject VBScript
        document.write(IEBinaryToArray_ByteStr_Script);
    }



    var throwException = function(errorCode, url, msg) {
        var error;
        switch(errorCode){
        case Exceptions.FileLoadFailed:
            error = new Error('Failed to load "'+ url + '"');
            break;

        case Exceptions.EOFReached:
            error = new Error("Error: EOF reached");
            break;

        case Exceptions.NoXHR:
            error = new Error("Error: cannot instantiate XMLHttpRequest");
            break;

        case Exceptions.BadSeek:
            error = new Error("Error: cannot seek");
            break;

        default:
            error = new Error("Unknown Error.");
            break;
        }
        if (msg) {
            error.message = msg;
        }
        error.source = typename;
        throw error;
    };


    var bus = function(url, callback) {
        if (! (this instanceof arguments.callee) ) {
            var error = new Error("you must use new to instantiate this class");
            error.source = "JSIO.BinaryUrlStream.ctor";
            throw error;
        }

        this.callback = callback;
        this.readByteAt = null;
        this.fileSize = -1;
        this.filePointer = 0;
        this.req = null;
        this._typename = typename;
        this._version = version;

        this.status = "-none-";

        var _IeGetBinResource = function(fileURL){
            var binStream= this;
            // see  http://msdn.microsoft.com/en-us/library/ms535874(VS.85).aspx

            // my helper to convert from responseBody to a "responseText" like thing
            var convertResponseBodyToText = function (binary) {
                var byteMapping = {};
                for ( var i = 0; i < 256; i++ ) {
                    for ( var j = 0; j < 256; j++ ) {
                        byteMapping[ String.fromCharCode( i + j * 256 ) ] =
                            String.fromCharCode(i) + String.fromCharCode(j);
                    }
                }
                var rawBytes = IEBinaryToArray_ByteStr(binary);
                var lastChr = IEBinaryToArray_ByteStr_Last(binary);
                return rawBytes.replace(/[\s\S]/g,
                                        function( match ) { return byteMapping[match]; }) + lastChr;
            };

            this.req = (function() {
                if (window.XMLHttpRequest) {
                    return new window.XMLHttpRequest();
                }
                else {
                    try {
                        return new ActiveXObject("MSXML2.XMLHTTP");
                    }
                    catch(ex) {
                        return null;
                    }
                }
            })();
            this.req.open("GET", fileURL, true);
            this.req.setRequestHeader("Accept-Charset", "x-user-defined");
            this.req.onreadystatechange = function(event){
                if (binStream.req.readyState == 4) {
                    binStream.status = "Status: " + binStream.req.status;
                    //that.httpStatus = that.req.status;
                    if (binStream.req.status == 200) {
                        // this doesn't work...
                        //fileContents = that.req.responseBody.toArray();

                        // this doesn't work... responseBody is not a safeArray
                        //var fileContents = new VBArray(binStream.req.responseBody).toArray();

                        // this works...
                        var fileContents = convertResponseBodyToText(binStream.req.responseBody);
                        binStream.fileSize = fileContents.length-1;
                        if (binStream.fileSize < 0) {throwException(Exceptions.FileLoadFailed, fileURL,"after converting");}
                        binStream.readByteAt = function(i){
                            return fileContents.charCodeAt(i) & 0xff;
                        };
                        if (typeof binStream.callback == "function"){ binStream.callback(binStream);}
                    }
                    else {
                        throwException(Exceptions.FileLoadFailed,fileURL, "http status code " + binStream.req.status);
                    }
                }
            };
            this.req.send();
        };


        var _NormalGetBinResource = function(fileURL){
            var binStream= this;
            this.req = new XMLHttpRequest();
            this.req.open('GET', fileURL, true);
            this.req.onreadystatechange = function(aEvt) {
                if (binStream.req.readyState == 4) {
                    binStream.status = "Status: " + binStream.req.status;
                    if(binStream.req.status == 200){
                        var fileContents = binStream.req.responseText;
                        binStream.fileSize = fileContents.length;

                        binStream.readByteAt = function(i){
                            return fileContents.charCodeAt(i) & 0xff;
                        };
                        if (typeof binStream.callback == "function"){ binStream.callback(binStream);}
                    }
                    else {
                        throwException(Exceptions.FileLoadFailed, fileURL);
                    }
                }
            };
            //XHR binary charset opt by Marcus Granado 2006 [http://mgran.blogspot.com]
            this.req.overrideMimeType('text/plain; charset=x-user-defined');
            this.req.send(null);
        };

        if(/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
            _IeGetBinResource.apply(this, [url]);
        }
        else {
            _NormalGetBinResource.apply(this, [url]);
        }
    };


    JSIO.SeekOrigin = {
        Current   : 1,
        Begin     : 2
    };

    bus.prototype = new JSIO._ByteReaderBase();

    bus.prototype.getLength = function()  {
        return this.fileSize;
    };

    bus.prototype.getPosition = function()  {
        return this.filePointer;
    };


    bus.prototype.seek = function(offset, origin, optionalParent) {

        if (typeof optionalParent != "undefined") {
            if (optionalParent.verbose > 1) {
                optionalParent.status.push("INFO: Seek " + offset + " bytes, origin(" +
                                           origin + ") start(0x" +
                                           JSIO.decimalToHexString(this.filePointer) + "/" +
                                           this.filePointer+")");
            }
        }

        switch (origin) {

        case JSIO.SeekOrigin.Current:
            this.seek(this.filePointer + offset, JSIO.SeekOrigin.Begin);
            break;
        case JSIO.SeekOrigin.Begin:
            if(offset < 0) {this.filePointer = 0;}
            else if(offset > this.getLength()) {
                throwException(Exceptions.EOFReached);
            }
            else {this.filePointer = offset;}
            break;
        default:
            throwException(Exceptions.BadSeek);
            break;
        }

        if (typeof optionalParent != "undefined") {
            if (optionalParent.verbose > 1) {
                optionalParent.status.push("INFO: Seek end(0x" +
                                           JSIO.decimalToHexString(this.filePointer) + "/" +
                                           this.filePointer+")");
            }
        }

        return this.filePointer;
    };

    // n is the number of bytes
    bus.prototype.read = function(n){
        if (n===0) { return [];}
        if (n<0) {
            var error = new Error("invalid read length.");
            error.source= "BinaryUrlStream.read()";
            throw error;
        }
        //n = n || 1;
        var offset = this.filePointer;
        var bytesRead = [];
        for(var i=offset; i<offset+n; i++){
            bytesRead.push(this.readByteAt(i));
        }
        this.filePointer += n;
        return bytesRead;
    };

    // BinaryUrlStream is also a byte reader - provides method readByte()
    bus.prototype.readByte = function(){
        var bytes = this.read(1);
        if (bytes.length == 1) {return bytes[0];}
        return null; // EOF
    };

    // n is the number of bytes
    bus.prototype.beginRead = function(n, callback){
        if (n===0) { callback(0);}
        if (n<0) {
            var error = new Error("invalid read length.");
            error.source= "BinaryUrlStream.beginRead()";
            throw error;
        }
        var bytesRead = [];
        var thisBinStream = this;
        var leftToRead = n;

        var readBatchAsync = function() {
            var c = 0;
            var offset = thisBinStream.filePointer;
            while(leftToRead > 0) {
                bytesRead.push(thisBinStream.readByteAt(c+offset));
                c++;
                leftToRead--;
                // read a 1k batch
                if(c >= 1024) {
                    break;
                }
            }
            thisBinStream.filePointer += c;
            if (leftToRead>0){
                setTimeout(readBatchAsync, 1);
            }
            else {
                callback(bytesRead);
            }
        };

        // kickoff
        readBatchAsync();
        return null;
    };


    bus.prototype.readNumber = function(size, origin){
        var size1 = size || 1;
        var origin1 = origin || this.filePointer;

        var result = 0;
        for(var i=origin1 + size1; i>origin1; i--){
            result = result * 256 + this.readByteAt(i-1);
        }
        this.filePointer = origin1 + size1;
        return result;
    };

    bus.prototype.readString = function(length, origin){
        var length1 = length || 1;
        var origin1 = origin || this.filePointer;
        var result = "";
        var end = origin1 + length1;
        for(var i=origin1; i<end; i++){
            result += String.fromCharCode(this.readByteAt(i));
        }
        this.filePointer+= length1;
        return result;
    };

    bus.prototype.readNullTerminatedString = function(origin){
        var origin1 = origin || this.filePointer;
        var slarge = "";
        var s = "";
        var c = 0;
        var ch = String.fromCharCode(this.readByteAt(origin1+c));
        while(ch !== null) {
            s += ch;
            c++;
            if(c >= 1024) {
                slarge += s;
                s = "";
                origin1 += c;
                this.filePointer += c;
                c = 0;
            }
            ch = String.fromCharCode(this.readByteAt(origin1+c));
        }
        this.filePointer = origin1 + c;
        return slarge + s;
    };


    bus.prototype.beginReadNullTerminatedString = function(callback, origin){
        var origin1 = origin || this.filePointer;
        var slarge = "";
        var s = "";
        var thisBinStream = this;

        var readBatchAsync = function() {
            var c = 0;
            var ch = String.fromCharCode(thisBinStream.readByteAt(origin1+c)) ;
            while(ch !== null) {
                s += ch;c++;
                if(c >= 1024) {
                    slarge += s;
                    s = "";
                    origin1 += c;
                    thisBinStream.filePointer += c;
                    c = 0;
                    break;
                }
                ch = String.fromCharCodet(thisBinStream.readByteAt(i));
            }
            thisBinStream.filePointer = origin1 + c;
            if (ch!==null){
                setTimeout(readBatchAsync, 1);
            }
            else {
                callback(slarge+s);
            }
        };

        // kickoff
        readBatchAsync();
        return null;
    };


    //  This needs to be defined.  I think it would work for UTF-16.
    //  The Unicode name in the function name, can be misleading.
    //
    //     this.readUnicodeString = function(iNumChars, iFrom){
    //         iNumChars = iNumChars || 1;
    //         iFrom = iFrom || filePointer;
    //         this.seek(iFrom, SeekOrigin.Begin);
    //         var result = "";
    //         // this won't really work! Unicode is not always encoded as 2 bytes
    //         var tmpTo = iFrom + iNumChars*2;
    //         for(var i=iFrom; i<tmpTo; i+=2){
    //             result += String.fromCharCode(this.readNumber(2));
    //         }
    //         filePointer+= iNumChars*2;
    //         return result;
    //     };

    JSIO.BinaryUrlStream = bus;

})();

/// JSIO.BinaryUrlStream.js ends
// JSIO.TextDecoder.js
// ------------------------------------------------------------------
//
// Part of the JSIO library.  Adds text decoders, for UTF-8 and UTF-16,
// and plain text.
//
// Copyright (c) 2010, Dino Chiesa
//
// This work is licensed under the MS-PL.  See the attached
// License.txt file for details.
//
//
// Credits:
//
// Derived in part from work by notmasteryet.
//   http://www.codeproject.com/KB/scripting/Javascript_binaryenc.aspx
//
//
// Wed Apr 07 22:52:13 2010
//

/*
Copyright (c) 2008 notmasteryet

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/



(function(){
    var version = "1.3 2011May10";
    var typename = "JSIO.TextDecoder";

    if ((typeof JSIO !== "object") ||
        (typeof JSIO.version !== "string")) {
        var e1 = new Error("This extension requires JSIO.core.js v1.3");
        e1.source = typename + ".js";
        throw e1;
    }

    if ((JSIO.version.length < 3) ||
        (JSIO.version.substring(0,3) !== "1.3")) {
        var e1a = new Error("This extension requires JSIO.core.js v1.3");
        e1a.source = typename + ".js";
        throw e1a;
    }

    if (typeof JSIO._ByteReaderBase !== "function") {
        var e2 = new Error("This class requires JSIO.BasicByteReaders.js");
        e2.source = typename + ".js";
        throw e2;
    }

    var _dd = function(reader) {
        if (! (this instanceof arguments.callee) ) {
            var error = new Error("you must use new to instantiate this class");
            error.source = "JSIO.TextDecoder.Default.ctor";
            throw error;
        }
        this.byteReader = reader;
        this._version = version;
        this._typename = typename + ".Default";
        return this;
    };

    _dd.prototype.readChar = function() {
        var code = this.byteReader.readByte();
        return (code < 0) ? null : String.fromCharCode(code); // ascii?
    };


    var _utf16 = function(reader) {
        if (! (this instanceof arguments.callee) ) {
            var error = new Error("you must use new to instantiate this class");
            error.source = "JSIO.TextDecoder.Utf16.ctor";
            throw error;
        }
        this.byteReader = reader;
        this.bomState = 0;
        this._version = version;
        this._typename = typename + ".Utf16";
        return this;
    };

    _utf16.prototype.readChar = function() {
        var b1 = this.byteReader.readByte();
        if(b1 < 0) {return null;}
        var b2 = this.byteReader.readByte();
        if(b2 < 0) {
            var e1 = new Error("Incomplete UTF16 character");
            e1.source = "JSIO.TextDecoder.Utf16.readChar()";
            throw e1;
        }

        if((this.bomState === 0) && ((b1 + b2) == 509)) {
            this.bomState = (b2 == 254) ? 1 : 2;

            b1 = this.byteReader.readByte();
            if(b1 < 0) {return null;}
            b2 = this.byteReader.readByte();
            if(b2 < 0) {
                var e2 = new Error("Incomplete UTF16 character");
                e2.source = "JSIO.TextDecoder.Utf16.readChar()";
                throw e2;
            }
        }
        else {
            this.bomState = 1;
        }
        var code = this.bomState == 1 ? (b2 << 8 | b1) : (b1 << 8 | b2);
        return String.fromCharCode(code);
    };


    /* RFC 3629 */
    var _utf8 = function(reader) {
        if (! (this instanceof arguments.callee) ) {
            var error = new Error("you must use new to instantiate this class");
            error.source = "JSIO.TextDecoder.Utf8.ctor";
            throw error;
        }
        this.byteReader = reader;
        this.waitBom = true;
        this.strict = false;
        this.pendingChar = null;
        this._version = version;
        this._typename = typename + ".Utf8";
        return this;
    };


    _utf8.prototype.readChar = function() {
        var ch = null;
        do {
            if(this.pendingChar !== null) {
                ch = this.pendingChar;
                this.pendingChar = null;
            }
            else {
                var b1 = this.byteReader.readByte();
                if(b1 === null) {return null;}

                if((b1 & 0x80) === 0) {
                    ch = String.fromCharCode(b1);
                }
                else {
                    var currentPrefix = 0xC0;
                    var validBits = 5;
                    do {
                        var mask = currentPrefix >> 1 | 0x80;
                        if((b1 & mask) == currentPrefix) {break;}
                        currentPrefix = currentPrefix >> 1 | 0x80;
                        --validBits;
                    } while(validBits >= 0);

                    if(validBits > 0) {
                        var code = (b1 & ((1 << validBits) - 1));
                        for(var i=5;i>=validBits;--i) {
                            var bi = this.byteReader.readByte();
                            if((bi & 0xC0) != 0x80) {
                                var e1 = new Error("Invalid sequence character");
                                e1.source = this._typename + ".readChar";
                                throw e1;
                            }
                            code = (code << 6) | (bi & 0x3F);
                        }
                        if(code <= 0xFFFF) {
                            if(code == 0xFEFF && this.waitBom) {ch = null;}
                            else{ ch = String.fromCharCode(code); }
                        }
                        else {
                            var v = code - 0x10000;
                            var w1 = 0xD800 | ((v >> 10) & 0x3FF);
                            var w2 = 0xDC00 | (v & 0x3FF);
                            this.pendingChar = String.fromCharCode(w2);
                            ch = String.fromCharCode(w1);
                        }
                    }
                    else {
                        // a byte higher than 0x80.
                        if (this.strict) {
                            var e2 = new Error("Invalid character");
                            e2.source = this._typename + ".readChar";
                            throw e2;
                        }
                        else {
                            // fall back to ""super ascii" (eg IBM-437)
                            ch = String.fromCharCode(b1);
                        }
                    }
                }
            }
            this.waitBom = false;
        } while(ch === null);
        return ch;
    };

    JSIO.TextDecoder = {
        Default : _dd,
        Utf16   : _utf16,
        Utf8    : _utf8
    };

})();


/// JSIO.TextDecoder.js ends

// JSIO.TextReader.js
//
// A reader class that decodes text as it reads.
//
// Methods:
//    readChar()         = read 1 char
//    read(n)            = read n chars
//    readLine()         = read one line of data (to \n)
//    unreadChar(ch)     = unread one char
//    readToEnd()        = read all data in the reader;
//                         return a string.
//    beginReadToEnd(cb) = asynchronously read all data.
//
//
// Copyright (c) 2010, Dino Chiesa
//
// This work is licensed under the MS-PL.  See the attached
// License.txt file for details.
//
//
// Credits:
//
// Derived in part from work by notmasteryet.
//   http://www.codeproject.com/KB/scripting/Javascript_binaryenc.aspx
//
// Last saved: <2011-May-10 17:23:13>
//

/*
Copyright (c) 2008 notmasteryet

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/



(function(){
    var version = "1.3 2011May10";
    var typename = "JSIO.TextReader";

    if (typeof JSIO.TextDecoder.Utf8 !== "function") {
        var e2 = new Error("This class requires JSIO.TextDecoder.js");
        e2.source = typename + ".js";
        throw e2;
    }

    var tr =  function(textDecoder) {
        if (! (this instanceof arguments.callee) ) {
            var error = new Error("you must use new to instantiate this class");
            error.source = typename + ".ctor";
            throw error;
        }
        this.decoder = textDecoder;
        this._version = version;
        this._typename = typename;
        this.unreads = [];
    };

    // read one char
    tr.prototype.readChar = function() {
        if(this.unreads.length > 0){
            return this.unreads.pop();
        }
        else {
            return this.decoder.readChar();
        }
    };

    // read a length of data
    tr.prototype.read = function(n) {
        var s = "";
        for (vari=0; i<n; i++) {
            var ch = this.readChar();
            if (ch !== null) { s+= ch;}
            else {i=n;}
        }
        return s;
    };

    tr.prototype.unreadChar = function(ch) {
        this.unreads.push(ch);
    };

    tr.prototype.readToEnd = function() {
        var slarge = "";
        var s = "";
        var c = 0;
        var ch = this.readChar();
        while(ch !== null) {
            s += ch;
            c++;
            if(c >= 1024) {
                slarge += s;
                s = "";
                c = 0;
            }
            ch = this.readChar();
        }
        return slarge + s;
    };

    //_state : null,

    tr.prototype.beginReadToEnd = function(callback) {
        //_state = "";
        var slarge = "";
        var s = "";
        var txtrdr = this;

        var readBatchAsync = function() {
            var c = 0;
            var ch = txtrdr.readChar();
            while(ch !== null) {
                s += ch;c++;
                if(c >= 1024) {
                    slarge += s;
                    s = "";
                    break;
                }
                ch = txtrdr.readChar();
            }
            if (ch!==null){
                setTimeout(readBatchAsync, 1);
            }
            else {
                callback(slarge+s);
            }
        };

        // kickoff
        readBatchAsync();
        return null;
    };

    tr.prototype.readLine = function() {
        var s = "";
        var ch = this.readChar();
        if(ch === null) {return null;}

        while(ch != "\r" && ch != "\n") {
            s += ch;
            ch = this.readChar();
            if(ch === null) {return s;}
        }
        if(ch == "\r") {
            ch = this.readChar();
            if(ch !== null && ch != "\n"){
                this.unreadChar(ch);
            }
        }
        return s;
    };

    JSIO.TextReader = tr;

})();


/// JSIO.TextReader.js ends

// JSIO.Crc32.js
//
// Part of the JSIO library.  This adds an CRC32-calculating
// ByteReader to JSIO.
//
// =======================================================
//
// A ByteReader exposes an interface with these functions:
//
//    readByte()
//       must return null when EOF is reached.
//
//    readToEnd()
//       returns an array of all bytes read, to EOF
//
//    beginReadToEnd(callback)
//       async version of the above
//
//    readBytes(n)
//       returns an array of all n bytes read from the source
//
//    beginReadBytes(n, callback)
//       async version of the above
//
// =======================================================
//
// Copyright (c) 2010, Dino Chiesa
//
// This work is licensed under the MS-PL.  See the attached
// License.txt file for details.
//
// Last saved: <2011-May-10 17:26:46>
//

(function(){
    var version = "1.3 2011May10";
    var typename = "JSIO.Crc32";

    if (typeof JSIO._ByteReaderBase !== "function") {
        var e2 = new Error("This extension requires JSIO.BasicByteReaders.js");
        e2.source = typename + ".js";
        throw e2;
    }

    JSIO.crc32Table = null;
    JSIO.crc32Polynomial = 0xEDB88320;

    var crc32TableCalc = function () {
        // do this once only, for all instances
        if(JSIO.crc32Table) {return;}
        JSIO.crc32Table = new Array(256);
        for(var i=0;i<256;i++) {
            var c=i;
            for(var k=0;k<8;k++) {
                if (c&1 == 1)  {
                    c = JSIO.crc32Polynomial ^ (c>>>1);
                } else {
                    c>>>=1;
                }
            }
            JSIO.crc32Table[i] = c;
        }
    };

    JSIO.computeCrc32 = function(str) {
        crc32TableCalc(); // once
        var c = 0xFFFFFFFF;
        var sL = str.length;
        if (typeof str == "object") {
            for(var n1=0;n1<sL;n1++) {
                c = JSIO.crc32Table[(c&0xff) ^ str[n1]] ^ (c>>>8);
            }
        } else {
            for(var n2=0;n2<sL;n2++) {
                c = JSIO.crc32Table[(c&0xff) ^ str.charCodeAt(n2)] ^ (c>>>8);
            }
        }
        c ^= 0xFFFFFFFF;
        if (c < 0) {c+= 0xFFFFFFFF+1;}
        return c;
    };

    // =======================================================
    var _crc32 = function() {
        if (! (this instanceof arguments.callee) ) {
            var error = new Error("you must use new to instantiate this class");
            error.source = typename + ".ctor";
            throw error;
        }
        crc32TableCalc(); // once
        this._typename = typename;
        this._version = version;
        this._runningCrc32 = 0xFFFFFFFF;
    };

    _crc32.prototype.slurpByte = function(b) {
        var r = this._runningCrc32;
        this._runningCrc32 = (r>>>8) ^ JSIO.crc32Table[b ^ (r & 0x000000FF)];
    };

    _crc32.prototype.result = function() {
        var c = this._runningCrc32 ^ 0xFFFFFFFF;
        if (c < 0) {c+= 0xFFFFFFFF+1;}
        return c;
    };
    // =======================================================



    var _crc32CalculatingReader = function(reader) {
        if (! (this instanceof arguments.callee) ) {
            var error = new Error("you must use new to instantiate this class");
            error.source = "JSIO.Crc32Reader.ctor";
            throw error;
        }
        this._byteReader = reader;
        this._typename = "JSIO.Crc32Reader";
        this._version = version;
        this._crc32 = new JSIO.Crc32();
    };

    _crc32CalculatingReader.prototype = new JSIO._ByteReaderBase();

    _crc32CalculatingReader.prototype.readByte = function() {
        var b = this._byteReader.readByte();
        if (b !== null) {
            this._crc32.slurpByte(b);
        }
        return b;
    };

    _crc32CalculatingReader.prototype.crc32 = function() {
        return this._crc32.result();
    };

    JSIO.Crc32 = _crc32;
    JSIO.Crc32Reader = _crc32CalculatingReader;

})();

/// JSIO.CRC32.js ends
// JSIO.InflatingReader.js
// ------------------------------------------------------------------
//
// Part of the JSIO library.  This adds an Inflating ByteReader to
// JSIO.
//
// =======================================================
//
// A ByteReader exposes an interface with these functions:
//
//    readByte()
//       must return null when EOF is reached.
//
//    readToEnd()
//       returns an array of all bytes read, to EOF
//
//    beginReadToEnd(callback)
//       async version of the above
//
//    readBytes(n)
//       returns an array of all n bytes read from the source
//
//    beginReadBytes(n, callback)
//       async version of the above
//
// =======================================================
//
// Copyright (c) 2010, Dino Chiesa
//
// This work is licensed under the MS-PL.  See the attached
// License.txt file for details.
//
// Last saved: <2011-May-10 17:32:07>
//


/*
the inflate logic is
Copyright (c) 2008 notmasteryet

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/



(function(){
    var version = "1.3 2011May10";
    var typename = "JSIO.InflatingReader";

    if (typeof JSIO._ByteReaderBase !== "function") {
        var e2 = new Error("This class requires JSIO.BasicByteReaders.js");
        e2.source = typename + ".js";
        throw e2;
    }

    // =======================================================
    //  _InternalBitReader is used internally in the InflatingReader class.
    //
    var _InternalBitReader = function(reader) {
        if (! (this instanceof arguments.callee) ) {
            var error = new Error("you must use new to instantiate this class");
            error.source = "InflatingReader._InternalBitReader.ctor";
            throw error;
        }
        this.bitsLength = 0;
        this.bits = 0;
        this.byteReader = reader;
        this._typeName = typename + "._InternalBitReader";
        this._version = version;
    };

    _InternalBitReader.prototype.readBit = function() {
        if(this.bitsLength === 0) {
            var nextByte = this.byteReader.readByte();
            if(nextByte === null) {
                var error = new Error("Unexpected end of stream");
                error.source = this._typeName + ".readBit";
                throw error;
            }
            this.bits = nextByte;
            this.bitsLength = 8;
        }

        var bit = (this.bits & 1) !== 0;
        this.bits >>= 1;
        --this.bitsLength;
        return bit;
    };

    _InternalBitReader.prototype.align = function() { this.bitsLength = 0; };

    _InternalBitReader.prototype.readLSB = function(length) {
        var data = 0;
        for(var i=0;i<length;++i) {
            if(this.readBit()) {data |= 1 << i;}
        }
        return data;
    };

    _InternalBitReader.prototype.readMSB = function(length) {
        var data = 0;
        for(var i=0;i<length;++i) {
            if(this.readBit()) {data = (data << 1) | 1; } else {data <<= 1;}
        }
        return data;
    };
    //
    // =======================================================


    /* inflating ByteReader - RFC 1951 */
    var _inflatingReader = function(reader) {
        if (! (this instanceof arguments.callee) ) {
            var error = new Error("you must use new to instantiate this class");
            error.source = "JSIO.InflatingReader.ctor";
            throw error;
        }
        this._byteReader = reader;
        this._bitReader = new _InternalBitReader(reader);
        this._buffer = [];
        this._bufferPosition = 0;
        this._state = 0;
        this._blockFinal = false;
        this._typeName = typename;
        this._version = version;
        return this;
    };


    // shared fns and variables

    var staticCodes = null;
    var staticDistances = null;

    var clenMap = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

    var buildCodes = function(lengths){
        var i=0;
        var codes = new Array(lengths.length);
        var maxBits = lengths[0];
        for (i=1; i<lengths.length; i++) {
            if (maxBits < lengths[i]) {maxBits = lengths[i];}
        }

        var bitLengthsCount = new Array(maxBits + 1);
        for (i=0; i<=maxBits; i++) {bitLengthsCount[i]=0;}

        for (i=0; i<lengths.length; i++) {
            ++bitLengthsCount[lengths[i]];
        }

        var nextCode = new Array(maxBits + 1);
        var code = 0;
        bitLengthsCount[0] = 0;
        for (var bits=1; bits<=maxBits; bits++) {
            code = (code + bitLengthsCount[bits - 1]) << 1;
            nextCode[bits] = code;
        }

        for (i=0; i<codes.length; i++) {
            var len = lengths[i];
            if (len !== 0) {
                codes[i] = nextCode[len];
                nextCode[len]++;
            }
        }
        return codes;
    };

    var buildTree = function(codes, lengths){
        var nonEmptyCodes = [];
        for(var i=0; i<codes.length; ++i) {
            if(lengths[i] > 0) {
                var code = {};
                code.bits = codes[i];
                code.length = lengths[i];
                code.index = i;
                nonEmptyCodes.push(code);
            }
        }
        return buildTreeBranch(nonEmptyCodes, 0, 0);
    };


    var buildTreeBranch = function(codes, prefix, prefixLength){
        if(codes.length === 0) {return null;}

        var zeros = [];
        var ones = [];
        var branch = {};
        branch.isLeaf = false;
        for(var i=0; i<codes.length; ++i) {
            if(codes[i].length == prefixLength && codes[i].bits == prefix) {
                branch.isLeaf = true;
                branch.index = codes[i].index;
                break;
            } else {
                var nextBit = ((codes[i].bits >> (codes[i].length - prefixLength - 1)) & 1) > 0;
                if(nextBit) {
                    ones.push(codes[i]);
                } else {
                    zeros.push(codes[i]);
                }
            }
        }
        if(!branch.isLeaf) {
            branch.zero = buildTreeBranch(zeros, (prefix << 1), prefixLength + 1);
            branch.one = buildTreeBranch(ones, (prefix << 1) | 1, prefixLength + 1);
        }
        return branch;
    };


    var encodedLengthStart = [3,4,5,6,7,8,9,10,
                              11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,
                              115,131,163,195,227,258];

    var encodedLengthAdditionalBits = [0,0,0,0,0,0,0,0,
                                       1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

    var encodedDistanceStart = [1,2,3,4, 5,7,9, 13,17,25, 33,49,65,
                                97,129,193,257,385,513,769,1025,1537,2049,
                                3073,4097,6145,8193,12289,16385,24577];

    var encodedDistanceAdditionalBits = [0,0,0,0,1,1,2,2,3,3,4,4,
                                         5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];


    var readDynamicTrees = function(bitReader){
        var hlit = bitReader.readLSB(5) + 257;
        var hdist = bitReader.readLSB(5) + 1;
        var hclen = bitReader.readLSB(4) + 4;
        var clen = new Array(19);
        var i=0;
        for(i=0; i<clen.length; ++i) {clen[i] = 0;}
        for(i=0; i<hclen; ++i) {clen[clenMap[i]] = bitReader.readLSB(3);}

        var clenCodes = buildCodes(clen);
        var clenTree = buildTree(clenCodes, clen);

        var lengthsSequence = [];
        while(lengthsSequence.length < hlit + hdist) {
            var p = clenTree;
            while(!p.isLeaf) {
                p = bitReader.readBit() ? p.one : p.zero;
            }

            var code = p.index;
            if(code <= 15){ lengthsSequence.push(code);}
            else if(code == 16) {
                var repeat = bitReader.readLSB(2) + 3;
                for(var q=0; q<repeat; ++q){
                    lengthsSequence.push(lengthsSequence[lengthsSequence.length - 1]);
                }
            } else if(code == 17) {
                var repeat1 = bitReader.readLSB(3) + 3;
                for(var q1=0; q1<repeat1; ++q1) {
                    lengthsSequence.push(0);
                }
            } else if(code == 18) {
                var repeat2 = bitReader.readLSB(7) + 11;
                for(var q2=0; q2<repeat2; ++q2){
                    lengthsSequence.push(0);
                }
            }
        }

        var codesLengths = lengthsSequence.slice(0, hlit);
        var codes = buildCodes(codesLengths);
        var distancesLengths = lengthsSequence.slice(hlit, hlit + hdist);
        var distances = buildCodes(distancesLengths);

        return {
            codesTree : buildTree(codes, codesLengths),
            distancesTree : buildTree(distances, distancesLengths)
        };
    };


    _inflatingReader.prototype = new JSIO._ByteReaderBase();


    // internal instance fns
    _inflatingReader.prototype._decodeItem = function() {
        if(this._state == 2) {return null;}

        var item;
        if(this._state === 0) {
            this._blockFinal = this._bitReader.readBit();
            var blockType = this._bitReader.readLSB(2);
            switch(blockType) {
            case 0:
                this._bitReader.align();
                var len = this._bitReader.readLSB(16);
                var nlen = this._bitReader.readLSB(16);
                if((len & ~nlen) != len) {
                    var error = new Error("Invalid block type 0 length");
                    error.source = "JSIO.InflatingReader._decodeItem";
                    throw error;
                }

                item = {};
                item.itemType = 0;
                item.array = new Array(len);
                for(var i=0;i<len;++i) {
                    var nextByte = this._byteReader.readByte();
                    if(nextByte < 0) {
                        var e2 = new Error("Incomplete block");
                        e2.source = "JSIO.InflatingReader._decodeItem";
                        throw e2;
                    }

                    item.array[i] = nextByte;
                }
                if(this._blockFinal) {this._state = 2;}
                return item;
            case 1:
                this._codesTree = staticCodes;
                this._distancesTree = staticDistances;
                this._state = 1;
                break;
            case 2:
                var dTrees = readDynamicTrees(this._bitReader);
                this._codesTree = dTrees.codesTree;
                this._distancesTree = dTrees.distancesTree;
                this._state = 1;
                break;
            default:
                var e3 = new Error("Invalid block type ("+ blockType +")");
                e3.source = "JSIO.InflatingReader._decodeItem";
                throw e3;
            }
        }

        item = {};

        var p = this._codesTree;
        while(!p.isLeaf) {
            p = this._bitReader.readBit() ? p.one : p.zero;
        }
        if(p.index < 256) {
            item.itemType = 2;
            item.symbol = p.index;
        } else if(p.index > 256) {
            var lengthCode = p.index;
            if(lengthCode > 285) {
                var e4 = new Error("Invalid length code");
                e4.source = "JSIO.InflatingReader._decodeItem";
                throw e4;
            }

            var length = encodedLengthStart[lengthCode - 257];
            if(encodedLengthAdditionalBits[lengthCode - 257] > 0) {
                length += this._bitReader.readLSB(encodedLengthAdditionalBits[lengthCode - 257]);
            }

            p = this._distancesTree;
            while(!p.isLeaf) {
                p = this._bitReader.readBit() ? p.one : p.zero;
            }

            var distanceCode = p.index;
            var distance = encodedDistanceStart[distanceCode];
            if(encodedDistanceAdditionalBits[distanceCode] > 0) {
                distance += this._bitReader.readLSB(encodedDistanceAdditionalBits[distanceCode]);
            }

            item.itemType = 3;
            item.distance = distance;
            item.length = length;
        } else {
            item.itemType = 1;
            this._state = this._blockFinal ? 2 : 0;
        }
        return item;
    };



    // public instance functions

    _inflatingReader.prototype.readByte = function() {
        while(this._bufferPosition >= this._buffer.length) {
            var item = this._decodeItem();
            if (item === null) {return null;}
            switch(item.itemType) {
            case 0:
                this._buffer = this._buffer.concat(item.array);
                break;
            case 2:
                this._buffer.push(item.symbol);
                break;
            case 3:
                var j = this._buffer.length - item.distance;
                for(var i=0;i<item.length;i++) {
                    this._buffer.push(this._buffer[j++]);
                }
                break;
            }
        }
        var symbol = this._buffer[this._bufferPosition++];
        if (this._bufferPosition > 0xC000)
        {
            var shift = this._buffer.length - 0x8000;
            if(shift > this._bufferPosition) {shift = this._bufferPosition;}
            this._buffer.splice(0, shift);
            this._bufferPosition -= shift;
        }
        this.position++;
        return symbol;
    };


    // initialization routine - once per type
    (function(){

        var codes = new Array(288);
        var codesLengths = new Array(288);
        var i=0;
        for (i = 0; i <= 143; i++) {
            codes[i] = 0x0030 + i;
            codesLengths[i] = 8;
        }
        for ( i = 144; i <= 255; i++) {
            codes[i] = 0x0190 + i - 144;
            codesLengths[i] = 9;
        }
        for ( i = 256; i <= 279; i++) {
            codes[i] = 0x0000 + i - 256;
            codesLengths[i] = 7;
        }
        for ( i = 280; i <= 287; i++) {
            codes[i] = 0x00C0 + i - 280;
            codesLengths[i] = 8;
        }
        staticCodes = buildTree(codes, codesLengths);

        var distances = new Array(32);
        var distancesLengths = new Array(32);
        for ( i = 0; i <= 31; i++) {
            distances[i] = i;
            distancesLengths[i] = 5;
        }
        staticDistances = buildTree(distances, distancesLengths);
    })();


    JSIO.InflatingReader = _inflatingReader;

})();


/// JSIO.InflatingReader.js ends

// Zipfile.js
//
// A class that reads Zip files.
// Depends on the JSIO library functions.
//
//
// Copyright (c) 2010, Dino Chiesa
//
// This work is licensed under the MS-PL.  See the attached
// License.txt file for details.
//
//
// Last saved: <2011-May-10 17:34:52>
//

(function(){
    var version = "1.26 2011Aug07";

    if (typeof JSIO.BinaryUrlStream != "function") {
        var e1 = new Error("This extension requires JSIO.BinaryUrlStream.js v1.3");
        e1.source = "Zipfile.js";
        throw e1;
    }

    if (typeof JSIO.TextDecoder !== "object"){
        var e2 = new Error("This extension requires JSIO.TextDecoder.js");
        e2.source = "Zipfile.js";
        throw e2;
    }

    if (typeof JSIO.TextReader !== "function"){
        var e3 = new Error("This extension requires JSIO.TextReader.js");
        e3.source = "Zipfile.js";
        throw e3;
    }

    if (typeof JSIO.Crc32 !== "function"){
        var e4 = new Error("This extension requires JSIO.Crc32.js");
        e4.source = "Zipfile.js";
        throw e4;
    }

    if (typeof JSIO.InflatingReader !== "function"){
        var e5 = new Error("This extension requires JSIO.InflatingReader.js");
        e5.source = "Zipfile.js";
        throw e5;
    }


    // =======================================================
    function ZipEntry(zip) {
        this.zipfile = zip;
        this._typename = "ZipEntry";
        this._version = version;
        this._crcCalculator = null;
    }


    // return byte array or string
    ZipEntry.prototype.extract = function(callback, asString) {
        this.contentType = JSIO.guessFileType(this.name);
        asString = asString || ( this.contentType == JSIO.FileType.Text ||
                                 this.contentType == JSIO.FileType.XML);
        var thisEntry = this;

        if (this.compressionMethod !== 0 && this.compressionMethod != 8) {
            var error = new Error("Unsupported compression method: " + this.compressionMethod);
            error.source=  "ZipEntry.extract()";
            throw error;
        }

        var reader = (asString) ? this.openTextReader() : this.openBinaryReader();

        // diagnostic purpose only; tag the reader with the entry name
        reader.zipEntryName = thisEntry.name;

        if (typeof callback != "function") {
            // synchronous
            var result = reader.readToEnd();
            this.verifyCrc32();
            return result;
        }

        // asynchronous
        reader.beginReadToEnd(function(result){
            try {
                thisEntry.verifyCrc32();
                callback(thisEntry, result);
            }
            catch (exc1) {
                callback(thisEntry, exc1);
            }
        });
        return null;
    };


    // open a ByteReader on the entry, which will read binary
    // content from the compressed stream.
    ZipEntry.prototype.openBinaryReader = function() {
        var reader =
                new JSIO.StreamSegmentReader(this.zipfile.binaryStream,
                                             this.offset + this.lengthOfHeader,
                                             this.compressedSize);
        if (this.compressionMethod === 0) {
            this._crcCalculator = new JSIO.Crc32Reader(reader);
        }
        else {
            var inflator = new JSIO.InflatingReader(reader);
            this._crcCalculator = new JSIO.Crc32Reader(inflator);
        }
        // Whether compressed or not, the source ByteReader in each case
        // is wrapped in a second ByteReader object that calculates CRC
        // as it reads.  That way, after all reading is complete, the
        // caller can check the calcuated CRC against the expected CRC.
        return this._crcCalculator;
    };

    // open a TextReader on the entry, to read text from the
    // compressed stream.
    ZipEntry.prototype.openTextReader = function(decoderKind) {
        var reader = this.openBinaryReader();
        decoderKind = decoderKind || JSIO.TextDecoder.Utf8;
        var d = new decoderKind();
        decoderKind.apply(d, [reader]);
        var textReader = new JSIO.TextReader(d);
        d._parent = textReader;// store a reference, for diagnostic purposes only
        return textReader;
    };

    // verify the CRC on the entry.
    // call this after all bytes have been read.
    ZipEntry.prototype.verifyCrc32 = function() {
        var computedCrc = this._crcCalculator.crc32();
        var rc = false;  // CRC FAIL
        if (this.crc32 != computedCrc) {
            var msg = "WARNING: CRC check failed: " +
                "entry(" + this.name + ") " +
                "computed(" + JSIO.decimalToHexString(computedCrc,8) + ") " +
                "expected(" + JSIO.decimalToHexString(this.crc32,8) + ") ";
            this.zipfile.status.push(msg);
        } else {
            rc = true;  // OK
            if (this.zipfile.verbose>2) {
                this.zipfile.status.push("INFO: CRC check ok: 0x" +
                                         JSIO.decimalToHexString(this.crc32,8));
            }
        }
        return rc;
    };


    // ctor
    ZipFile = function(fileUrl, callback, verbosity) {
        if (! (this instanceof arguments.callee) ) {
            var error = new Error("you must use new to instantiate this class");
            error.source = "ZipFile.ctor";
            throw error;
        }

        this.verbose = verbosity || 0;
        this.entries = [];
        this.entryNames = [];
        this.status = [];
        this._version = version;
        this._typename = "ZipFile";

        var thisZipFile = this;

        // Could use a back-tracking reader for the central directory, but
        // there's no point, since all the zip data is held in memory anyway.
        //
        //     function ReadCentralDirectory(){
        //         var posn = thisZipFile.binaryStream.getLength - 64;
        //         var maxSeekback = Math.Max(s.Length - 0x4000, 10);
        //         var success = false;
        //         var nTries = 0;
        //         do
        //         {
        //             thisZipFile.binaryStream.Seek(posn, SeekOrigin.Begin);
        //             var bytesRead = thisZipFile.binaryStream.findSignature(thisZipFile.Signatures.EndOfCentralDirectory);
        //             if (bytesRead != -1)
        //                 success = true;
        //             else
        //             {
        //                 nTries++;
        //                 // increasingly larger
        //                 posn -= (32 * (nTries + 1) * nTries);
        //                 if (posn < 0) posn = 0;  // BOF
        //             }
        //         }
        //         while (!success && posn > maxSeekback);
        //         if (!success) {
        //             thisZipFile.status.push("cannot find End of Central Directory");
        //             return;
        //         }
        //     }


        function DateFromPackedFormat(packed) {
            if (packed == 0xFFFF || packed === 0) {
                return new Date(1995, 0, 1, 0,0,0,0);
            }

            var packedTime = packed & 0x0000ffff;
            var packedDate = ((packed & 0xffff0000) >> 16);

            var year = 1980 + ((packedDate & 0xFE00) >> 9);
            var month = ((packedDate & 0x01E0) >> 5) -1;
            var day = packedDate & 0x001F;

            var hour = (packedTime & 0xF800) >> 11;
            var minute = (packedTime & 0x07E0) >> 5;
            var second = (packedTime & 0x001F) * 2;

            // Validation and error checking.
            // This is not foolproof but will catch most errors.

            // I can't believe how many different ways applications
            // can mess up a simple date format.

            if (second >= 60) { minute++; second = 0; }
            if (minute >= 60) { hour++; minute = 0; }
            if (hour >= 24) { day++; hour = 0; }
            var success = false;
            var d;
            try {
                d = new Date(year, month, day, hour, minute, second, 0);
                success= true;
            }
            catch (exc1) {
                if (year == 1980 && (month === 0 || day === 0)) {
                    try {
                        d = new Date(1980, 0, 1, hour, minute, second, 0);
                        success= true;
                    }
                    catch (exc2) {
                        try {
                            d = new Date(1980, 0, 1, 0, 0, 0, 0);
                            success= true;
                        }
                        catch (exc3) { }
                    }
                }
                else {
                    try {
                        while (year < 1980) {year++;}
                        while (year > 2030) {year--;}
                        while (month < 1) {month++;}
                        while (month > 12) {month--;}
                        while (day < 1) {day++;}
                        while (day > 28) {day--;}
                        while (minute < 0) {minute++;}
                        while (minute > 59) {minute--;}
                        while (second < 0) {second++;}
                        while (second > 59) {second--;}
                        d = new Date(year, month-1, day, hour, minute, second, 0);
                        success= true;
                    }
                    catch (exc4){}
                }
            }
            if (!success) {
                var error = new Error("bad date/time value in this zip file.");
                error.source= "ZipFile.ReadZipEntry";
                throw error;
            }
            return d;
        }


        function ReadZipEntries () {
            // read only once
            if (thisZipFile.entryNames.length === 0){
                var e;
                while ((e = ReadZipEntry()) !== null) {
                    thisZipFile.entries.push(e);
                    thisZipFile.entryNames.push(e.name);
                }
            }
        }


        function ReadZipEntry () {
            var offset = thisZipFile.binaryStream.getPosition();
            var sig = thisZipFile.binaryStream.readNumber(4);
            if (sig == ZipFile.Signatures.DirEntry) {
                // after all entries, comes the central directory
                if (thisZipFile.verbose > 0) {
                    thisZipFile.status.push("INFO: at offset 0x" +
                                     JSIO.decimalToHexString(offset) +
                                     ", found start of Zip Directory.");
                }
                // all done reading
                return null;
            }
            if (sig != ZipFile.Signatures.Entry) {
                thisZipFile.status.push("WARNING: at offset 0x" +
                                 JSIO.decimalToHexString(offset) +
                                 ", found unexpected signature: 0x" +
                                 JSIO.decimalToHexString(sig));
                return null;
            }

            var entry = new ZipEntry(thisZipFile);
            entry.offset = offset;
            entry.versionNeeded = thisZipFile.binaryStream.readNumber(2);
            entry.bitField = thisZipFile.binaryStream.readNumber(2);
            entry.compressionMethod = thisZipFile.binaryStream.readNumber(2);
            var timeBlob = thisZipFile.binaryStream.readNumber(4);
            entry.lastModified = DateFromPackedFormat(timeBlob);

            if ((entry.bitField & 0x01) == 0x01){
                thisZipFile.status.push("This zipfile uses Encryption, which is not supported by ZipFile.js.");
                return null;
            }

            entry.utf8 = ((entry.bitField & 0x0800) == 0x0800);

            // if ((entry.bitField & 0x0800) == 0x0800){
            //     thisZipFile.status.push("This zipfile uses UTF8, which is not supported by ZipFile.js.");
            //     return null;
            // }

            entry.usesTrailingDescriptor = ((entry.bitField & 0x0008) == 0x0008);

            // if ((entry.bitField & 0x0008) == 0x0008){
            //     thisZipFile.status.push("This zipfile uses a bit 3 trailing data descriptor, which is not supported by ZipFile.js.");
            //     return null;
            // }


            entry.crc32 = thisZipFile.binaryStream.readNumber(4);
            entry.compressedSize = thisZipFile.binaryStream.readNumber(4);
            entry.uncompressedSize = thisZipFile.binaryStream.readNumber(4);

            if (entry.compressedSize == 0xFFFFFFFF ||
                entry.uncompressedSize == 0xFFFFFFFF) {
                thisZipFile.status.push("This zipfile uses ZIP64, which is not supported by ZipFile.js");
                return null;
            }

            var filenameLength = thisZipFile.binaryStream.readNumber(2);
            var extraFieldLength = thisZipFile.binaryStream.readNumber(2);

            thisZipFile.status.push("INFO: filename length= " + filenameLength);

            // we've read 30 bytes of metadata so far
            var bytesRead = 30 + filenameLength + extraFieldLength;

            if (entry.utf8) {
                thisZipFile.status.push("INFO: before filename, position= 0x" +
                                        JSIO.decimalToHexString( thisZipFile.binaryStream.getPosition()));
                var binReader =
                    new JSIO.StreamSegmentReader(thisZipFile.binaryStream,
                                                 thisZipFile.binaryStream.getPosition(),
                                                 filenameLength);
                var utf8Decoder = new JSIO.TextDecoder.Utf8(binReader);
                var textReader = new JSIO.TextReader(utf8Decoder);
                entry.name = textReader.readToEnd();

                // advance the filepointer:
                thisZipFile.binaryStream.seek(filenameLength,
                                              JSIO.SeekOrigin.Current,
                                              thisZipFile);

                thisZipFile.status.push("INFO: after filename, position= 0x" +
                                        JSIO.decimalToHexString( thisZipFile.binaryStream.getPosition()));
            }
            else {
                entry.name = thisZipFile.binaryStream.readString(filenameLength);
            }
            entry.extra = thisZipFile.binaryStream.read(extraFieldLength);

            if (thisZipFile.verbose > 1) {
                thisZipFile.status.push("INFO: at offset 0x" +
                             JSIO.decimalToHexString(entry.offset) +
                             ", found entry '" + entry.name + "' fnl(" +
                             filenameLength + ") efl(" +
                             extraFieldLength +")");
            }

            if (extraFieldLength > 0) {
                if (thisZipFile.verbose > 0) {
                    thisZipFile.status.push("INFO: entry " + entry.name + " has " +
                                     extraFieldLength + " bytes of " +
                                     "extra metadata (ignored)");
                }
            }

            // trailing data descriptors
            var trailingDescriptorOffset = 0;
            if (entry.usesTrailingDescriptor) {
                var position = thisZipFile.binaryStream.getPosition();
                var sig = thisZipFile.binaryStream.readNumber(4);
                while (sig != ZipFile.Signatures.DataDescriptor) {
                    thisZipFile.binaryStream.seek(-3,JSIO.SeekOrigin.Current);
                    sig = thisZipFile.binaryStream.readNumber(4);
                }
                // overwrite
                entry.crc32 = thisZipFile.binaryStream.readNumber(4);
                entry.compressedSize = thisZipFile.binaryStream.readNumber(4);
                entry.uncompressedSize = thisZipFile.binaryStream.readNumber(4);
                trailingDescriptorOffset = 16;
                thisZipFile.binaryStream.seek(position,JSIO.SeekOrigin.Begin);
            }

            // There are a bunch of things in the "extra" header, thisZipFile we
            // could parse, like timestamps and other things.  This class
            // doesn't parse them.

            entry.lengthOfHeader = bytesRead;
            entry.totalEntrySize = entry.lengthOfHeader + entry.compressedSize;

            // seek past the data without reading it. We will read on Extract()
            if (thisZipFile.verbose > 1) {
                thisZipFile.status.push("INFO: seek 0x" +
                                 JSIO.decimalToHexString(entry.compressedSize) +
                                 " (" + entry.compressedSize + ") bytes");
            }

            thisZipFile.binaryStream.seek(entry.compressedSize + trailingDescriptorOffset,
                              JSIO.SeekOrigin.Current,
                              thisZipFile);

            return entry;
        }


        var parseZipFile = function(bfr){
            try {
                if (bfr.req.status == 200) {
                    var sig = thisZipFile.binaryStream.readNumber(4);
                    if (sig != ZipFile.Signatures.Entry){
                        thisZipFile.status.push("WARNING: this file does not appear to be a zip file");
                    } else {
                        thisZipFile.binaryStream.seek(0, JSIO.SeekOrigin.Begin);
                        ReadZipEntries();
                        if (thisZipFile.verbose > 0) {
                            thisZipFile.status.push("INFO: read " + thisZipFile.entries.length + " entries");
                        }
                    }
                }
                else {
                    thisZipFile.status.push("ERROR: the URL could not be read (" +
                                     bfr.req.status + " " + bfr.req.statusText + ")");
                }
                callback(thisZipFile);
            }
            catch (exc1)
            {
                thisZipFile.status.push("Exception: " + exc1.message);
                callback(thisZipFile);
            }
        };

        this.binaryStream = new JSIO.BinaryUrlStream(fileUrl, parseZipFile);

        return this;
    };


    ZipFile.Signatures = {
        Entry                 : 0x04034b50,
        EndOfCentralDirectory : 0x06054b50,
        DirEntry              : 0x02014b50,
        DataDescriptor        : 0x08074b50
    };

    ZipFile.Version = version;

    ZipFile.EncryptionAlgorithm = {
        None      : 0,
        PkzipWeak : 1,
        WinZipAes : 2
    };

})();
