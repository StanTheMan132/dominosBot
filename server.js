//  require all dependencies (note commands required furtheron);
const fs = require('fs');
require('dotenv').config();
const Discord = require('discord.js');
const config = require('./config.json');

// create a new Discord Client
const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});

//  code that runs after logging in/recognecting
client.on('ready', () => {
  console.log('Ready!');
});

client.on('message', (message) => {
  if (message.content.startsWith(config.prefix)) {
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return message.reply(' command not found');
    const command = client.commands.get(commandName);
    try {
      command.execute(message, args);
    } catch (err) {
      console.log(err);
      return message.reply(' Error running the command');
    }
  }
});

// login with the bot token.
client.login(process.env.DISCORD_BOT_TOKEN);
