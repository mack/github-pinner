(function() {
  var types = {
    PROFILE : 0,
    REPO : 1,
    ALL : 2
  }

  var type = -1
  // MARK: - Main
  function init() {
    var rawElement = parseUrl("https://github.com/mackboudreau/DalhousieScheduleBuilder")
    var elements = populateElement(rawElement)
  }

  function populateElement(rawElements) {
    var handler = new APIHandler(rawElements.url)
    handler.load(function(response) {
      
    })

  }

  function parseJSON(data) {

  }

  // MARK: - Models
  function Repository() {
    this.url = ""
    this.reponame = ""
    this.desc = ""
    this._lang = ""
    this.stars = 0
    this.forks = 0
  }

  function Profile() {
    this.url = ""
    this.username = ""
    this.fullname = ""
    this.avatar = ""
    this.bio = ""
    this.company = ""
    this.repoCount = 0
    this.followers = 0
    this.following = 0
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
      var profile = new Profile()
      profile.url = "https://api.github.com/users/" + profileName
      return profile
    } else if (repository.test(url)) {
      // repository
      type = types["REPO"]

      var profileName = url.replace(/^(http|https):\/\/(www.)?github.com(\/)?/g, "").replace(/\/.*(\/)?$/, "")
      var repositoryName = url.replace(/^(http|https):\/\/(www.)?github.com\/[A-Za-z\d]{1,39}\//g, "").replace(/\/$/, "")
      var repository = new Repository()
      repository.url = "https://api.github.com/repos/" + profileName + "/" + repositoryName
      return repository
    } else if (repositories.test(url)) {
      // repositories
      type = types["ALL"]

      var profileName = url.replace(/^(http|https):\/\/(www.)?github.com\//, "").replace(/\?tab=repositories(\/)?$/, "")
      var repository = new Repository()
      repository.url = "https://api.github.com/users/" + profileName + "/repos"
      return repository
    } else {
      throw new Error('Invalid data parameter! Unrecognized GitHub URl: ' + url);
    }
  }

  document.onload = init()
}());
