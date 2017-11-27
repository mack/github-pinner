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
    var url = parseUrl("https://github.com/mackboudreau?tab=repositories")
    populateElement(url, function(obj) {
      // set up DOM elements

    })
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

  document.onload = init()
}());
