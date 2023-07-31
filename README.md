# VanillaWiki

A basic wikipedia clone with vanilla html/css/js/node. See a live version [here](https://vanilla-wiki.onrender.com/).
Note that this is hosted on free tier everything, so a cold start takes ~1-5 minutes, the server is in Oregon (as of me writing this), and you might be able to ddos it by refreshing too fast.

## Tech stack details

As stated earlier, the server uses node.js with no additional libraries, and it uses vanilla html/css/js for the front end with no framework/libraries.
The production version is automatically pulled from github by render.com and built into a docker container. The docker part is honestly a little bit overengineered for this site, but for the life of me I couldn't figure out how to get the site hosted for free if it's using node.js with no frameworks

## Credits

### Images

Images sourced from <https://www.pexels.com/> and <https://unsplash.com/>
Icon by [Jocelyn Morales](https://unsplash.com/@molnj)
