const { EmbedBuilder } = require('discord.js');
const { embedColor, ownerID, logsID, guildId } = require('../config');

module.exports = {
	name: 'roleDelete',
	execute(role) {
		const client = role.client
		if(role.guild.id !== guildId) {
			return;
		}

		const embed = new EmbedBuilder()
			.setDescription("A role named "+role.name+" was deleted.")
			if(role.color) {
				embed.setColor(role.color)
			}
			embed.setFooter({ text: 'Role ID '+ role.id })
			embed.setTimestamp();
		client.channels.cache.get(logsID).send({ embeds: [embed] })
		return;
	}
}