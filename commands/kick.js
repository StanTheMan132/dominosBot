module.exports = {
  name: 'kick',
  description: 'Kick a tagged user.',
  execute(message, args) {
    //  check to see if a user was mentioned
    if (!message.mentions.users.size) {
      return message.reply(' you need to mention a user!');
    }
    //  grab the first mentioned user
    const taggedUser = message.mentions.users.first();

    return message.channel.send(`Are you sure you want to kick @${taggedUser.username}`);
  },
};
