require('dotenv').config();

console.log("Started");
const fetch = require('node-fetch');
const Discord = require("discord.js");
const http = require('http');
const Sequelize = require('sequelize');
const fs = require('fs');
const DBL = require("dblapi.js")



const bot = new Discord.Client({disableEveryone: true});
const dbl = new DBL(process.env.DBLTOKEN, bot)
var koalaImages
var horseImages
var pandaImages
var wolfImages
var otterImages

function getImages(){
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
  fetch(`https://pixabay.com/api/?key=${process.env.PIXABAYKEY}&q=panda&per_page=100&safesearch=true`)
    .then(res => res.json())
    .then(json => {
    pandaImages = json;
    
  });
  fetch(`https://pixabay.com/api/?key=${process.env.PIXABAYKEY}&q=wolf&per_page=100&safesearch=true`)
    .then(res => res.json())
    .then(json => {
    wolfImages = json;
    
  });
  fetch(`https://pixabay.com/api/?key=${process.env.PIXABAYKEY}&q=otter&per_page=100&safesearch=true`)
      .then(res => res.json())
      .then(json => {    
      otterImages = json;
    });
}
getImages()
setInterval(getImages, 1000*60*15)

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

bot.on("shardDisconnect", (event, id) => {
	bot.login(process.env.TOKEN)
})

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
        },
        {
          name: "Otter",
          value: "A cute otter.",
        }

      ],
       timestamp: new Date(),
    }});
  }



if(cmd === `${prefix}BOTINFO`){

	let duration = bot.uptime
	var ms = (duration % 1000)/100
	var s = Math.floor((duration/1000)%60)
	var m = Math.floor((duration/(1000*60))%60)
	var h = Math.floor((duration/(1000*60*60))%24)

	s = (s < 10) ? "0" + s : s
	m = (m < 10) ? "0" + m : m
	h = (h < 10) ? "0" + h : h

	var uptime = `${s} Seconds, ${m} Minutes, ${h} Hours`

  return message.channel.send({embed: {
    color: "0",
    title: "Bot info",
    fields: [{
      name: "Botname",
      value: "Animal Bot.",
      inline: true
    },
    {
      name: "Creator",
      value: "Aresiel#0666",
      inline: true
    },
    {
      name: "Uptime",
      value: uptime
    },
    {
      name: "Prefix",
      value: "A!",
      inline: true
    },
    {
      name: "Github",
      value: "[https://github.com/Aresiel/Animal-Bot](https://github.com/Aresiel/Animal-Bot)"	
    },
    {
      name: "Invite Link",
      value: "[Click here!]( https://discordapp.com/oauth2/authorize?client_id=511117189835653150&scope=bot&permissions=52288)"
    }

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
  
  let number = getRandomInt(koalaImages.hits.length);
  
    console.log(koalaImages.hits[number].largeImageURL)
    var koalaUrl = koalaImages.hits[number].largeImageURL
  
    sendImageEmbed("Koala", koalaUrl, message)

}
  
  
if(cmd === `${prefix}HORSE`){
  
  let number = getRandomInt(horseImages.hits.length);
  
    console.log(horseImages.hits[number].largeImageURL)
    var horseUrl = horseImages.hits[number].largeImageURL
  
    sendImageEmbed("Horse", horseUrl, message)

}

  
if(cmd === `${prefix}PANDA`){
  
  let number = getRandomInt(pandaImages.hits.length);
  
    console.log(pandaImages.hits[number].largeImageURL)
    var pandaUrl = pandaImages.hits[number].largeImageURL
  
      sendImageEmbed("Panda", pandaUrl, message)
}
  
if(cmd === `${prefix}WOLF`){
  
  let number = getRandomInt(wolfImages.hits.length);
  
    console.log(wolfImages.hits[number].largeImageURL)
    var wolfUrl = wolfImages.hits[number].largeImageURL
  
    sendImageEmbed("Wolf", wolfUrl, message)

}

if(cmd === `${prefix}OTTER`){
  
  let number = getRandomInt(otterImages.hits.length);
  
    console.log(otterImages.hits[number].largeImageURL)
    var otterUrl = otterImages.hits[number].largeImageURL
  
    sendImageEmbed("Otter", otterUrl, message)

}

})
       
bot.login(process.env.TOKEN);
