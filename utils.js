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

