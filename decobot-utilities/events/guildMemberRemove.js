const { EmbedBuilder } = require('discord.js');
const { embedColor, ownerID, logsID, guildId } = require('../config');

module.exports = {
	name: 'guildMemberRemove',
	execute(member) {
		const client = member.client
		const user = member.user

		if(member.guild.id != guildId) {
			return;
		}

		const embed = new EmbedBuilder()
			.setColor(embedColor)
			.setDescription("A user named <@"+user.id+"> left the server.")
			.setTimestamp();
		client.channels.cache.get(logsID).send({ embeds: [embed] })
		return;
	}
}