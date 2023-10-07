const { EmbedBuilder } = require('discord.js');
const { embedColor, ownerID, logsID, guildId } = require('../config');

module.exports = {
	name: 'guildBanRemove',
	execute(ban) {
		const client = ban.client
		if(ban.guild.id !== guildId) {
			return;
		}

		var banReason

			if(ban.reason) {
				banReason = " banned for "+banReason
			} else {
				banReason = "."
			}

		const embed = new EmbedBuilder()
			.setColor(embedColor)
			.setDescription("A user named "+ban.user.username+" was unbanned"+banReason)
			embed.setTimestamp()
			embed.setFooter({ text: 'Ban ID '+'Currently Unavailable' })
		client.channels.cache.get(logsID).send({ embeds: [embed] })
		return;
	}
}