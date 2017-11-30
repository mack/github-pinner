<p align="center"><img src="https://d29mk5socxaj4o.cloudfront.net/logo.svg"></p>

# Overview [![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
Do you want to showcase a github repository or profile on your website? Instead of leaving a simple link, use this tool to create embedded HTML github tiles. It uses GitHub's API to grab the information, so no need to worry about updating html. You can pin profiles, single repositories, or even all repositories linked to an individual profile!

## Usage
Simply set the html **data** field with a GitHub profile, repository, or repositories tab url...
```html
<script src="d29mk5socxaj4o.cloudfront.net/GitHubPinner.js"></script>
<div data="https://github.com/mackboudreau?tab=repositories" class="github-pinner" style="visibility: hidden;"></div>
```

## Preview
<p align="left"><img src="https://i.imgur.com/iC56hgU.png" width="550px"><br>
<img src="https://i.imgur.com/8O9L4sf.png" width="1000px"></p>

## TODO
* Implement functionality for a "All Repos" element
* ~~Use AWS Cloudfront to serve files to reduce latency on sites~~
* Add additional option styles for tiles
* Expanding width "All-repo" section
