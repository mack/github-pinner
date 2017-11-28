(function() {
  var types = {
    PROFILE : 0,
    REPO : 1,
    ALL : 2
  }

  var type = -1
  var stored = null

  // MARK: - Main
  function init() {
    var origin = document.getElementById("github-pinner")
    if (origin == null) return
    var url = parseUrl(origin.getAttribute("data"))
    loadCSS()
    populateElement(url, function(obj) {
      // set up DOM elements
      if (type == types["PROFILE"]) {
          origin.innerHTML = ""
      } else if (type == types["REPO"]) {
          origin.innerHTML = "<div id=\"gp-container-repo\"><a class=\"gp-title\" href=\"" + obj.html_url + "\">" + obj.name + "</a><p class=\"gp-desc\">" + obj.description + "</p><div id=\"gp-stats\"><p class=\"gp-stat\"><span class=\"gp-lang\"></span>Javascript</p><a class=\"gp-stat gp-link\"><svg class=\"gp-octicon\" height=\"16\" role=\"img\" version=\"1.1\" viewBox=\"0 0 14 16\" width=\"14\"><path fill-rule=\"evenodd\" d=\"M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z\"></path></svg>1</a><a class=\"gp-stat gp-link\"><svg class=\"gp-octicon\" height=\"16\" role=\"img\" version=\"1.1\" viewBox=\"0 0 10 16\" width=\"10\"><path fill-rule=\"evenodd\" d=\"M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z\"></path></svg>1</a></div></div>"
      } else if (type == types["ALL"]) {

      }
    })
  }

  function loadCSS() {
    var styleref = document.createElement("link")
    styleref.rel = "stylesheet"
    styleref.type = "text/css"
    styleref.href = "https://s3.amazonaws.com/mackboudreau/style.css"
    document.getElementsByTagName("head")[0].appendChild(styleref)
  }

  function populateElement(url, completion) {
    var handler = new APIHandler(url)
    handler.load(function(response) {
      objs = JSON.parse(response)
      completion(objs)
    })
  }

  // MARK: - API Handler
  function APIHandler(url, items=4) {
    // initializations
    self.url = url
    self.items = items
  }

  APIHandler.prototype.load = function(callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200)
            callback(request.responseText)
    }
    request.open("GET", self.url, true );
    request.send( null );
  }

  // MARK: - Helper Functions
  function parseUrl(url) {
    profile = /^(http|https):\/\/(www.)?github.com(\/)?\/[A-Za-z\d]{1,39}(\/)?$/;
    repository = /^(http|https):\/\/(www.)?github.com\/[A-Za-z\d]{1,39}\/[A-Za-z\d-]{1,100}(\/)?$/;
    repositories = /^(http|https):\/\/(www.)?github.com\/[A-Za-z\d]{1,39}\?tab=repositories(\/)?$/;
    if (profile.test(url)) {
      // profile
      type = types["PROFILE"]
      var profileName = url.replace(/^(http|https):\/\/(www.)?github.com(\/)?/g, "").replace(/\/$/, "")
      return "https://api.github.com/users/" + profileName
    } else if (repository.test(url)) {
      // repository
      type = types["REPO"]

      var profileName = url.replace(/^(http|https):\/\/(www.)?github.com(\/)?/g, "").replace(/\/.*(\/)?$/, "")
      var repositoryName = url.replace(/^(http|https):\/\/(www.)?github.com\/[A-Za-z\d]{1,39}\//g, "").replace(/\/$/, "")
      return "https://api.github.com/repos/" + profileName + "/" + repositoryName
    } else if (repositories.test(url)) {
      // repositories
      type = types["ALL"]

      var profileName = url.replace(/^(http|https):\/\/(www.)?github.com\//, "").replace(/\?tab=repositories(\/)?$/, "")
      return "https://api.github.com/users/" + profileName + "/repos"
    } else {
      throw new Error('Invalid data parameter! Unrecognized GitHub URl: ' + url);
    }
  }

  document.addEventListener("DOMContentLoaded", function(event){
    init()
  })

}());
