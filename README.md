# 📑📌  GitHub Pinner [![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
Do you want to showcase a github repository or profile on your website? Instead of leaving a simple link, use this tool to create github-style tiles. It uses GitHub's API to grab the information, so no need to worry about updating html. You can pin single profiles, single repositories, or even all repositories linked to an individual profile!

## Usage
Simply set the html **data** field with a GitHub profile, repository, or repositories tab url...
```html
<script src="d29mk5socxaj4o.cloudfront.net/GitHubPinner.js"></script>
<div id="github-pinner" data="https://github.com/mackboudreau/CustomSegmentedController"></div>
```

## Preview
<p align="center"><img src="https://i.imgur.com/iC56hgU.png" width="550px"><br>
  <img src="https://i.imgur.com/IHws5n9.png" width="350px">
<img src="https://i.imgur.com/sAUzE7T.png" width="350px"></p>

## TODO
* Implement functionality for a "All Repos" element
* ~~Use AWS Cloudfront to serve files to reduce latency on sites~~
* Add additional option styles for tiles
* Expanding width "All-repo" section 
