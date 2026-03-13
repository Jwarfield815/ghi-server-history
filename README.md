# Goes Hard Inc. Minecraft Server Preservation Project
Find the project here: http://goeshardinc.com/

## About
Welcome to what I've been wasting my time on at work for the past few weeks! It started out as a small scale project to show off Me and my girlfriend's forever world. And now it's expanded to this entire history of Minecraft servers. And led to me learning how to self-host a web server, and then learn how to self-host a much better web server.

## Future TODOs
- Make the website not break visually when you rotate your phone (or prevent users from being able to rotate site on mobile?)
- Figure out how to store larger files in the repo (maps, modpacks, tiles) https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github
- Potentially incorporate templating so that there isn't a bunch of copy-pasted html for the header and footer across pages. Though I'm concerned about the site losing it's simplicity.
- Add markers to Dynmap
- Add info about the Joseph Modded server that we played briefly with the MIC people (see if Joseph has the world download?)

## Limitations
The world downloads, modpack files, and BlueMap tiles have not been added to the github due to size limitations. This is something I'd like to look into remedying in the future, but this is where we're at for now. However, It's unlikely that we'll be changing much BlueMap stuff or world downloads moving forward, so it's unlikely that you'll need those files.
 
If you would like those larger files that aren't stored on the repo, reach out to me on discord and I can get them to you.

## Contribution
If you'd like to contribute to this project, just request access! I'd love to see what else we can do with this.

### Running the Web Server
To run the server youself, just clone the repo and run python startWebServer.py. Then the website should be on localhost:3000

### Updating Markers
To update markers, first, make your changes in the overworld.conf (or other corresponding .conf file). Then, you'll have to download the BlueMap CLI from here: https://github.com/BlueMap-Minecraft/BlueMap/releases Place the .jar file in the same directory as the web and config folders, then run the command "java -jar yourbluemapjarfile.jar --markers"

You can see more info and documentation on BlueMap here: https://bluemap.bluecolored.de/
