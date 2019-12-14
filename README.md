<p align="center"><img src=".readme/logo.svg">
  <br><br>
<a href="https://www.gnu.org/licenses/gpl-3.0">
  <img src="https://img.shields.io/badge/License-GPL%20v3-blue.svg">
</a>
  <img src="https://img.shields.io/badge/language-HTML5-red.svg">
  <img src="https://img.shields.io/github/issues/mackboudreau/GitHubPinner.svg">
</p>


# Overview 
Do you want to showcase a github repository or profile on your website? Instead of leaving a simple link, use this tool to create embedded HTML github tiles. It uses GitHub's API to grab the information, so no need to worry about updating html. You can pin profiles, single repositories, or even all repositories linked to an individual profile!

## Usage
Simply set the html **data** field with a GitHub profile, repository, or repositories tab url...
```html
<script src="d29mk5socxaj4o.cloudfront.net/GitHubPinner.js"></script>
<div data="https://github.com/mackboudreau?tab=repositories" class="github-pinner" style="visibility: hidden;"></div>
```

## Preview
<p align="left"><img src=".readme/profile-example.png" width="550px"><br>
<img src=".readme/repo-example.png" width="1000px"></p>

## TODO
* Implement functionality for a "All Repos" element
* ~~Use AWS Cloudfront to serve files to reduce latency on sites~~
* Add additional option styles for tiles
* Expanding width "All-repo" section
* Hover-able icon with GitHub Profile popup
