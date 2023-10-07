const { EmbedBuilder } = require('discord.js');
const { embedColor, ownerID, logsID, guildId } = require('../config');

module.exports = {
	name: 'guildBanAdd',
	execute(ban) {
		const client = ban.client
		if(ban.guild.id !== guildId) {
			return;
		}

		var banReason

		if(ban.reason) {
			banReason = ".\nFor "+banReason
		} else {
			banReason = "."
		}

		const embed = new EmbedBuilder()
			.setColor(embedColor)
			.setDescription("A user named "+ban.user.username+" was banned"+banReason)
			embed.setTimestamp()
		client.channels.cache.get(logsID).send({ embeds: [embed] })
		return;
	}
}