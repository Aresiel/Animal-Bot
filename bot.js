require('dotenv').config();

console.log("Started");
const fetch = require('node-fetch');
const Discord = require("discord.js");
const http = require('http');
const Sequelize = require('sequelize');
const fs = require('fs');


const bot = new Discord.Client({disableEveryone: true});
var koalaImages
var horseImages
var pandaImages
var wolfImages

  fetch(`https://pixabay.com/api/?key=${process.env.PIXABAYKEY}&q=koala+bear&per_page=100&safesearch=true`)
    .then(res => res.json())
    .then(json => {
    koalaImages = json;
    
  });
  fetch(`https://pixabay.com/api/?key=${process.env.PIXABAYKEY}&q=horse&per_page=100&safesearch=true`)
    .then(res => res.json())
    .then(json => {
    horseImages = json;
    
  });
  fetch(`https://pixabay.com/api/?key=${process.env.PIXABAYKEY}&q=white+panda&per_page=100&safesearch=true`)
    .then(res => res.json())
    .then(json => {
    pandaImages = json;
    
  });
  fetch(`https://pixabay.com/api/?key=${process.env.PIXABAYKEY}&q=wolf&per_page=100&safesearch=true`)
    .then(res => res.json())
    .then(json => {
    wolfImages = json;
    
  });


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.cache.array().length} servers!`);
  bot.user.setActivity("A!help", {type: "WATCHING"});
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function sendImageEmbed(title, image_url, message){
	const embed = {
 		"title": title,
 		"url": image_url,
  		"color": 3421755,
   		"image": {
    		"url": image_url
  		}
	};
	message.channel.send({ embed });
}

bot.on("message", async message => {

  let prefix = process.env.PREFIX;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toUpperCase();
  let args = messageArray.slice(1);
  

  
    if(cmd === `${prefix}PING`){
    message.channel.send("Loading...").then(msg => {
      var realping = Math.round(Math.random()*20);
      msg.edit("Ping: " + realping + "ms.");
    });
  }

  


  if(cmd === `${prefix}HELP`){
    return message.channel.send({embed: {
        color: "0",
        description: "Commands in dm are supported.",
        title: "Help",
        fields: [
          {
        name: "Ping",
        value: "Pong.",
        },
        {
          name: "BotInfo",
          value: "Just some info about the bot.",
        },
        {
          name: "Scan",
          value: "A debug command if the bot dosen't work, checks what permissions the bot has.",
        },
        {
          name: "Cat",
          value: "A cute little cat!",
        },
        {
          name: "Dog",
          value: "Man's best friend!",
        },
        {
          name: "Fox",
          value: "Mix between a cat and dog.",
        },
        {
          name: "Koala",
          value: "Like a huge terrifying bear, but without the huge and terrifying parts.",
        },
        {
          name: "Horse",
          value: "How else are you supposed to get anywhere? Oh wait, cars.",
        },
        {
          name: "Wolf",
          value: "Big woof.",
        },
        {
          name: "Panda",
          value: "All pandas aren't black and white.",
        }

      ],
       timestamp: new Date(),
    }});
  }



if(cmd === `${prefix}BOTINFO`){
  return message.channel.send({embed: {
    color: "0",
    title: "Bot info",
    fields: [{
      name: "Botname",
      value: "Animal Bot.",
    },
    {
      name: "Creator",
      value: "Aresiel#0666"
    },
    {
      name: "Invite Link",
      value: "[Click here!]( https://discordapp.com/oauth2/authorize?client_id=511117189835653150&scope=bot&permissions=52288)"
    },
    {
      name: "Prefix",
      value: "A!",
    },

  ],
    timestamp: new Date(),
  }});
}





if(cmd === `${prefix}SCAN`){
  var scanstart_msg = message.channel.send("Scan has begun.");
  if(message.guild.me.hasPermission("ADMINISTRATOR")){ var admin="true"} else{ var admin="false" }
  if(message.guild.me.hasPermission("KICK_MEMBERS")){ var kick="true"}else{ var kick="false" }
  if(message.guild.me.hasPermission("BAN_MEMBERS")){ var ban="true"} else{ var ban="false" }
  if(message.guild.me.hasPermission("MANAGE_MESSAGES")){ var msg="true"} else{ var msg="false" }
  if(message.guild.me.hasPermission("MENTION_EVERYONE")){ var everyone="true"} else{ var everyone="false" }
  if(message.guild.me.hasPermission("ATTACH_FILES")){ var files="true"} else{ var files="false" }
  if(message.guild.me.hasPermission("EMBED_LINKS")){ var embed="true"} else{ var embed="false" }
  
  
 
  if(files === "true"){ var summary = "Bot has all permissions required to work. The permissions the bot is required to have are the following: 'Embed links', 'Attach files', 'Read messages', 'Send messages'" }
  
  if(embed === "true"){
    
  return message.channel.send({embed: {
    color: "255",
    title: "Scan Result",
    fields: [{
      name: "Admin",
      value: admin,
    },
    {
      name: "Kick members",
      value: kick
    },
    {
      name: "Ban members",
      value: ban
    },
    {
      name: "Manage messages",
      value: msg,
    },
    {
      name: "Mention everyone",
      value: everyone,
    },
    {
      name: "Attach files",
      value: files,
    },
    {
      name: "Embed links",
      value: embed,
    },
    {
      name: "Summary",
      value: summary,
    },

  ],
    timestamp: new Date(),
  }});
  } else { message.channel.send("Bot requires 'Embed links' permission to function."); scanstart_msg.delete(); }
  
}


  
  
if(cmd === `${prefix}CAT`){
  
    fetch('https://api.thecatapi.com/v1/images/search')
    .then(res => res.json())
    .then(json => {
    console.log(json[0].url)
    var catUrl = json[0].url
  
    sendImageEmbed("Cat", catUrl, message)
    
  });
  
  

}
  
if(cmd === `${prefix}DOG`){
  
  fetch('https://api.thedogapi.com/v1/images/search')
    .then(res => res.json())
    .then(json => {
    console.log(json[0].url)
    var dogUrl = json[0].url
  
    sendImageEmbed("Dog", dogUrl, message)
    
  });
  
  

}
  
if(cmd === `${prefix}FOX`){
  
  fetch('https://randomfox.ca/floof/')
    .then(res => res.json())
    .then(json => {
    console.log(json.image)
    var foxUrl = json.image
  
    sendImageEmbed("Fox", foxUrl, message)
    
  });
  
  

}
  
if(cmd === `${prefix}KOALA`){
  
  let number = getRandomInt(90);
  
    console.log(koalaImages.hits[number].largeImageURL)
    var koalaUrl = koalaImages.hits[number].largeImageURL
  
    sendImageEmbed("Koala", koalaUrl, message)

}
  
  
if(cmd === `${prefix}HORSE`){
  
  let number = getRandomInt(90);
  
    console.log(horseImages.hits[number].largeImageURL)
    var horseUrl = horseImages.hits[number].largeImageURL
  
    sendImageEmbed("Horse", horseUrl, message)

}

  
if(cmd === `${prefix}PANDA`){
  
  let number = getRandomInt(50);
  
    console.log(pandaImages.hits[number].largeImageURL)
    var pandaUrl = pandaImages.hits[number].largeImageURL
  
      sendImageEmbed("Panda", pandaUrl, message)
}
  
if(cmd === `${prefix}WOLF`){
  
  let number = getRandomInt(90);
  
    console.log(wolfImages.hits[number].largeImageURL)
    var wolfUrl = wolfImages.hits[number].largeImageURL
  
    sendImageEmbed("Wolf", wolfUrl, message)

}

})
       
bot.login(process.env.TOKEN);
