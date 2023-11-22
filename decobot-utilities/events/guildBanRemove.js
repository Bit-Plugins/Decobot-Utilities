const { EmbedBuilder } = require('discord.js');
const { embedColours, botIDs } = require('./config');

module.exports = {
	name: 'guildBanRemove',
	execute(ban) {
		const client = ban.client
		if(ban.guild.id !== botIDs.guild) {
			return;
		}

		var banReason

			if(ban.reason) {
				banReason = " banned for "+banReason
			} else {
				banReason = "."
			}

		const embed = new EmbedBuilder()
			.setColor(embedColours.negative)
			.setDescription("A user named "+ban.user.username+" was unbanned"+banReason)
			embed.setTimestamp()
			embed.setFooter({ text: 'Ban ID '+'Currently Unavailable' })
		client.channels.cache.get(botIDs.logs).send({ embeds: [embed] })
		return;
	}
}