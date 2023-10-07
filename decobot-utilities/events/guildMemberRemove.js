const { EmbedBuilder } = require('discord.js');
const { embedColor, botIDs } = require('.../config');

module.exports = {
	name: 'guildMemberRemove',
	execute(member) {
		const client = member.client
		const user = member.user

		if(member.guild.id != botIDs.guild) {
			return;
		}

		const embed = new EmbedBuilder()
			.setColor(embedColor)
			.setDescription("A user named <@"+user.id+"> left the server.")
			.setTimestamp();
		client.channels.cache.get(botIDs.logs).send({ embeds: [embed] })
		return;
	}
}