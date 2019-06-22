import { Client, Message } from 'discord.js';

exports.run = (client: Client, msg: Message, args: string[]) => {
  const roleName = 'USER-' + msg.author.id;
  const myRole = msg.guild.roles.find((role) => role.name === roleName);
  let chosenColor = args[0].toUpperCase();

  if (!/(^#?[0-9A-F]{6}$)|(^#?[0-9A-F]{3}$)/i.test(chosenColor)) { // Ensures first argument is a valid hex color
    msg.channel.send('Please input a valid hex color code!'); // Output error message to discord channel
    return;
  }

  if (/(^#?[0-9A-F]{3}$)/i.test(chosenColor)) { // Tests if chosenColor is a 3 character code
    // tslint:disable-next-line: max-line-length
    chosenColor = chosenColor.replace(/#?([0-9A-F])([0-9A-F])([0-9A-F])/, '#$1$1$2$2$3$3'); // Convert 3 character hex codes to 6 characters
  }

  if (!myRole) {
    msg.guild.createRole({ // Creates new role with user selected color
      color: chosenColor,
      name: roleName,
      // tslint:disable-next-line: max-line-length
    }).then(() => msg.member.addRole(msg.guild.roles.find((role) => role.name === roleName)).catch()); // Assigns created role to user
    msg.channel.send('Role created!');
  } else {
    myRole.edit({ // Edits existing role with user selected color
      color: chosenColor,
    });
    msg.channel.send('Color changed!');
  }
};
