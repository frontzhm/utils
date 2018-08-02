function parseURL(url) {
  var parser = document.createElement('a');
  parser.href = url;
  parser.query = {};
  parser.search.replace(/([^?=&]+)=([^?=&]+)/g, function() {
    parser.query[arguments[1]] = arguments[2];
  })
  return {
    // 常用的
    query: parser.query,
    origin: parser.origin,
    pathname: parser.pathname,
    hash: parser.hash,
    // 不常用的
    // protocol: parser.protocol,
    // username: parser.username,
    // password: parser.password,
    // host: parser.host,
    // port: parser.port,
    // hostname: parser.hostname,
    // search: parser.search,
    // href: parser.href
  }
}

// 依赖parseURL,直接得到某key
function getQuery(url,key){
  return parseURL(url).query.key
}

// rem
function rem() {
  var docEl = document.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
      if (clientWidth > 750) {
        docEl.style.width = "750px";
        docEl.style.marginLeft = "auto";
        docEl.style.marginRight = "auto";
        docEl.style.fontSize = "150px";
      }
    };
  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
}

