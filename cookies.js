/*\
|*|
|*|	:: cookies.js ::
|*|
|*|	A complete cookies reader/writer framework with full unicode support.
|*|
|*|	Revision #8 - February 18th, 2020
|*|
|*|	https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
|*|	https://developer.mozilla.org/User:fusionchess
|*|	https://github.com/madmurphy/cookies.js
|*|
|*|	This framework is released under the GNU Public License, version 3 or later.
|*|	http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|	Syntaxes:
|*|
|*|	* docCookies.setItem(name, value[, end[, path[, domain[, secure[, same-site]]]]])
|*|	* docCookies.getItem(name)
|*|	* docCookies.removeItem(name[, path[, domain[, secure[, same-site]]]])
|*|	* docCookies.hasItem(name)
|*|	* docCookies.keys()
|*|	* docCookies.clear([path[, domain[, secure[, same-site]]]])
|*|
\*/

(function () {

	function makeSetterString (sKey, sValue, vEnd, sPath, sDomain, bSecure, vSameSite) {

		var sExpires = "";

		if (vEnd) {

			switch (vEnd.constructor) {

				case Number:

					sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;

					/*
					Note: Despite officially defined in RFC 6265, the use of `max-age` is not compatible with any
					version of Internet Explorer, Edge and some mobile browsers. Therefore passing a number to
					the end parameter might not work as expected. A possible solution might be to convert the the
					relative time to an absolute time. For instance you could replace the previous line with:
					*/
					/*
					sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + (new Date(vEnd * 1e3 + Date.now())).toUTCString();
					*/

					break;

				case String:

					sExpires = "; expires=" + vEnd;
					break;

				case Date:

					sExpires = "; expires=" + vEnd.toUTCString();
					break;

			}

		}

		return	encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "") + (!vSameSite || vSameSite.toString().toLowerCase() === "no_restriction" ? "" : vSameSite.toString().toLowerCase() === "lax" || Math.ceil(vSameSite) === 1 || vSameSite === true ? "; samesite=lax" : vSameSite.toString().toLowerCase() === "none" || vSameSite < 0 ? "; samesite=none" : "; samesite=strict");

	}

	var reURIAllowed = /[\-\.\+\*]/g, reCNameAllowed = /^(?:expires|max\-age|path|domain|secure|samesite|httponly)$/i;

	window.docCookies = {

		"getItem": function (sKey) {

			if (!sKey) { return null; }

			return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(reURIAllowed, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

		},

		"setItem": function (sKey, sValue, vEnd, sPath, sDomain, bSecure, vSameSite) {

			if (!sKey || reCNameAllowed.test(sKey)) { return false; }

			document.cookie = makeSetterString(sKey, sValue, vEnd, sPath, sDomain, bSecure, vSameSite);
			return true;

		},

		"removeItem": function (sKey, sPath, sDomain, bSecure, vSameSite) {

			if (!this.hasItem(sKey)) { return false; }

			document.cookie = makeSetterString(sKey, "", "Thu, 01 Jan 1970 00:00:00 GMT", sPath, sDomain, bSecure, vSameSite);
			return true;

		},

		"hasItem": function (sKey) {

			if (!sKey || reCNameAllowed.test(sKey)) { return false; }

			return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(reURIAllowed, "\\$&") + "\\s*\\=")).test(document.cookie);

		},

		"keys": function () {

			var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);

			for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {

				aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);

			}

			return aKeys;
		},

		"clear": function (sPath, sDomain, bSecure, vSameSite) {

			for (var aKeys = this.keys(), nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {

				this.removeItem(aKeys[nIdx], sPath, sDomain, bSecure, vSameSite);

			}

		}

	};

})();

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {

	module.exports = docCookies;

}

