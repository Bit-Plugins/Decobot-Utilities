const { EmbedBuilder } = require('discord.js');
const { embedColor, botIDs } = require('./config');

module.exports = {
	name: 'roleDelete',
	execute(role) {
		const client = role.client
		if(role.guild.id !== botIDs.guild) {
			return;
		}

		const embed = new EmbedBuilder()
			.setDescription("A role named "+role.name+" was deleted.")
			if(role.color) {
				embed.setColor(role.color)
			}
			embed.setFooter({ text: 'Role ID '+ role.id })
			embed.setTimestamp();
		client.channels.cache.get(botIDs.logs).send({ embeds: [embed] })
		return;
	}
}