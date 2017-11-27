(function() {
  // MARK: - Main
  function init() {
    var element = parseUrl("https://github.com/mackboudreau/DalhousieScheduleBuilder")
    console.log(element.url)
  }

  // MARK: - Models
  function Repository() {
    this.url = ""
  }

  function Profile() {
    this.url = ""
  }

  // MARK: - API Handler
  function APIHandler() {

  }

  // MARK: - Helper Functions
  function parseUrl(url) {
    profile = /^(http|https):\/\/(www.)?github.com(\/)?\/[A-Za-z\d]{1,39}(\/)?$/;
    repository = /^(http|https):\/\/(www.)?github.com\/[A-Za-z\d]{1,39}\/[A-Za-z\d-]{1,100}(\/)?$/;
    repositories = /^(http|https):\/\/(www.)?github.com\/[A-Za-z\d]{1,39}\?tab=repositories(\/)?$/;
    if (profile.test(url)) {
      // profile
      var profileName = url.replace(/^(http|https):\/\/(www.)?github.com(\/)?/g, "").replace(/\/$/, "")
      var profile = new Profile()
      profile.url = "https://api.github.com/users/" + profileName
      return profile
    } else if (repository.test(url)) {
      // repository
      var profileName = url.replace(/^(http|https):\/\/(www.)?github.com(\/)?/g, "").replace(/\/.*(\/)?$/, "")
      var repositoryName = url.replace(/^(http|https):\/\/(www.)?github.com\/[A-Za-z\d]{1,39}\//g, "").replace(/\/$/, "")
      var repository = new Repository()
      repository.url = "https://api.github.com/repos/" + profileName + "/" + repositoryName
      return repository
    } else if (repositories.test(url)) {
      // repositories
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
