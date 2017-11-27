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
    var url = parseUrl("https://github.com/mackboudreau/")
    populateElement(url, function(obj) {
      // set up DOM elements
      console.log(obj)
    })
  }

  function populateElement(url, completion) {
    var handler = new APIHandler(url)
    handler.load(function(response) {
      objs = JSON.parse(response)
      if (type == types["PROFILE"]) {
        var profile = new Profile()
        profile.username = objs.login
        profile.fullname = objs.name
        profile.avatar = objs.avatar_url
        profile.bio = objs.bio
        profile.company = objs.company
        profile.repoCount = objs.public_repos
        profile.followers = objs.followers
        profile.following = objs.following
        completion(profile)
        return
      } else if (type == types["REPO"]) {
        var repo = new Repository()
        repo.reponame = objs.name
        repo.desc = objs.description
        repo._lang = objs.language
        repo.stars = objs.stargazers_count
        repo.forks = objs.forks
        completion(repo)
        return
      } else if (type == types["ALL"]) {

      }
    })
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
