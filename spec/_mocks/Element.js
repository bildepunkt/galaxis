const context = {
    canvas: "canvas#game",
    fillStyle: "#778899",
    filter: "none",
    font: "10px sans-serif",
    globalAlpha: 1,
    globalCompositeOperation: "source-over",
    imageSmoothingEnabled: true,
    imageSmoothingQuality: "low",
    lineCap: "butt",
    lineDashOffset: 0,
    lineJoin: "miter",
    lineWidth: 1,
    miterLimit: 10,
    shadowBlur: 0,
    shadowColor: "rgba(0, 0, 0, 0)",
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    strokeStyle: "#000000",
    textAlign: "start",
    textBaseline: "alphabetic",
    webkitImageSmoothingEnabled: true,
    arc () {},
    arcTo () {},
    beginPath () {},
    bezierCurveTo () {},
    clearRect () {},
    clip () {},
    closePath () {},
    constructor () {},
    createImageData () {},
    createLinearGradient () {},
    createPattern () {},
    createRadialGradient () {},
    drawFocusIfNeeded () {},
    drawImage () {},
    ellipse () {},
    fill () {},
    fillRect () {},
    fillText () {},
    getContextAttributes () {},
    getImageData () {},
    getLineDash () {},
    isPointInPath () {},
    isPointInStroke () {},
    lineTo () {},
    measureText () {},
    moveTo () {},
    putImageData () {},
    quadraticCurveTo () {},
    rect () {},
    resetTransform () {},
    restore () {},
    rotate () {},
    save () {},
    scale () {},
    setLineDash () {},
    setTransform () {},
    stroke () {},
    strokeRect () {},
    strokeText () {},
    transform () {},
    translate () {}
};

export default class Element {
    constructor (type="") {
        this.ATTRIBUTE_ = 2;
        this.CDATA_SECTION_NODE = 4;
        this.COMMENT_NODE = 8;
        this.DOCUMENT_FRAGMENT_NODE = 11;
        this.DOCUMENT_NODE = 9;
        this.DOCUMENT_POSITION_CONTAINED_BY = 16;
        this.DOCUMENT_POSITION_CONTAINS = 8;
        this.DOCUMENT_POSITION_DISCONNECTED = 1;
        this.DOCUMENT_POSITION_FOLLOWING = 4;
        this.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;
        this.DOCUMENT_POSITION_PRECEDING = 2;
        this.DOCUMENT_TYPE_NODE = 10;
        this.ELEMENT_NODE = 1;
        this.ENTITY_NODE = 6;
        this.ENTITY_REFERENCE_NODE = 5;
        this.NOTATION_NODE = 12;
        this.PROCESSING_INSTRUCTION_NODE = 7;
        this.TEXT_NODE = 3;
        this.aLink = "";
        this.accessKey = "";
        this.attributes = null;
        this.background = "";
        this.baseURI = "";
        this.bgC = "";
        this.childElementCount = 2;
        this.childNodes = [];
        this.children = [];
        this.classList = [];
        this.className = "";
        this.clientHeight = 8108;
        this.clientLeft = 0;
        this.clientTop = 0;
        this.clientWidth = 924;
        this.contentEditable = "inherit";
        this.dataset = null;
        this.dir = "";
        this.draggable = false;
        this.firstChild = null;
        this.firstElementChild = null;
        this.hidden = false;
        this.id = "";
        this.innerHTML = "";
        this.inner = "";
        this.isConnected = true;
        this.isContentEditable = false;
        this.lang = "";
        this.lastChild = null;
        this.lastElementChild = null;
        this.link = "";
        this.localName = type;
        this.namespaceURI = "http://www.w3.org/1999/xhtml";
        this.ne = null;
        this.nextSibling = null;
        this.nodeName = type.toUpperCase();
        this.nodeType = 1;
        this.nodeValue = null;
        this.offsetHeight = 8108;
        this.offsetLeft = 0;
        this.offsetParent = null;
        this.offsetTop = 0;
        this.offsetWidth = 924;
        this.onabort = null;
        this.onbeforecopy = null;
        this.onbeforecut = null;
        this.onbeforepaste = null;
        this.onbeforeunload = null;
        this.onblur = null;
        this.oncancel = null;
        this.oncanplay = null;
        this.oncanplaythrough = null;
        this.onchange = null;
        this.onclick = null;
        this.onclose = null;
        this.oncontextmenu = null;
        this.oncopy = null;
        this.oncuechange = null;
        this.oncut = null;
        this.ondblclick = null;
        this.ondrag = null;
        this.ondragend = null;
        this.ondragenter = null;
        this.ondragleave = null;
        this.ondragover = null;
        this.ondragstart = null;
        this.ondrop = null;
        this.ondurationchange = null;
        this.onemptied = null;
        this.onended = null;
        this.onerror = null;
        this.onfocus = null;
        this.onhashchange = null;
        this.oninput = null;
        this.oninvalid = null;
        this.onkeydown = null;
        this.onkeypress = null;
        this.onkeyup = null;
        this.onlanguagechange = null;
        this.onloadeddata = null;
        this.onloadedmetadata = null;
        this.onloadstart = null;
        this.onmessage = null;
        this.onmousedown = null;
        this.onmouseenter = null;
        this.onmouseleave = null;
        this.onmousemove = null;
        this.onmouseout = null;
        this.onmouseover = null;
        this.onmouseup = null;
        this.onmousewheel = null;
        this.onoffline = null;
        this.ononline = null;
        this.onpagehide = null;
        this.onpageshow = null;
        this.onpaste = null;
        this.onpause = null;
        this.onplay = null;
        this.onplaying = null;
        this.onpopstate = null;
        this.onprogress = null;
        this.onratechange = null;
        this.onrejectionhandled = null;
        this.onreset = null;
        this.onresize = null;
        this.onscroll = null;
        this.onsearch = null;
        this.onseeked = null;
        this.onseeking = null;
        this.onselect = null;
        this.onselectstart = null;
        this.onshow = null;
        this.onstalled = null;
        this.onstorage = null;
        this.onsubmit = null;
        this.onsuspend = null;
        this.ontimeupdate = null;
        this.ontoggle = null;
        this.onunhandledrejection = null;
        this.onunload = null;
        this.onvolumechange = null;
        this.onwaiting = null;
        this.onwebkitfullscreenchange = null;
        this.onwebkitfullscreenerror = null;
        this.onwheel = null;
        this.outerHTML = "";
        this.outer = "";
        this.ownerDocument = {};
        this.parentElement = null;
        this.parentNode = null;
        this.prefix = null;
        this.previousElementSibling = null;
        this.previousSibling = null;
        this.scrollHeight = 8108;
        this.scrollLeft = 0;
        this.scrollTop = 3412;
        this.scrollWidth = 924;
        this.shadowRoot = null;
        this.spellcheck = true;
        this.style = {};
        this.tabIndex = -1;
        this.tagName = type.toUpperCase();
        this.text = "";
        this.textContent = "";
        this.t = "";
        this.translate = true;
        this.vLink = "";
        this.webkitdropzone = "";
    }

    addEventListener () {}
    animate () {}
    appendChild () {}
    blur () {}
    click () {}
    cloneNode () {}
    closest () {}
    compareDocumentPosition () {}
    contains () {}
    createShadowRoot () {}
    dispatchEvent () {}
    focus () {}
    getAttribute () {}
    getAttributeNS () {}
    getAttributeNode () {}
    getAttributeNodeNS () {}
    getBoundingClientRect () {
        return {
            left: 0,
            top: 0
        };
    }
    getContext () {
        return context;
    }
    getClientRects () {}
    getDestinationInsertionPoints () {}
    getElementsByClassName () {}
    getElementsByTagName () {}
    getElementsByTagNameNS () {}
    hasAttribute () {}
    hasAttributeNS () {}
    hasAttributes () {}
    hasChildNodes () {}
    insertAdjacentElement () {}
    insertAdjacentHTML () {}
    insertAdjacentText () {}
    insertBefore () {}
    isDefaultNamespace () {}
    isEqualNode () {}
    isSameNode () {}
    lookupNamespaceURI () {}
    lookupPrefix () {}
    matches () {}
    normalize () {}
    onload () {}
    querySelector () {}
    querySelectorAll () {}
    remove () {}
    removeAttribute () {}
    removeAttributeNS () {}
    removeAttributeNode () {}
    removeChild () {}
    removeEventListener () {}
    replaceChild () {}
    requestPointerLock () {}
    scrollIntoView () {}
    scrollIntoViewIfNeeded () {}
    setAttribute () {}
    setAttributeNS () {}
    setAttributeNode () {}
    setAttributeNodeNS () {}
    webkitMatchesSelector () {}
    webkitRequestFullScreen () {}
    webkitRequestFullscreen() {}
}
