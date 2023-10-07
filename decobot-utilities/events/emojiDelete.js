const { EmbedBuilder } = require('discord.js');
const { embedColor, ownerID, logsID, guildId } = require('../config');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./bot.sqlite');

module.exports = {
	name: 'emojiDelete',
	execute(emoji) {
        const client = emoji.client
		const embed = new EmbedBuilder()
			.setColor(embedColor)
			.setDescription("An Emoji named "+emoji.name+" was deleted.")
			.setFooter({ text: 'Emoji ID '+emoji.id })
			.setTimestamp();
		client.channels.cache.get(logsID).send({ embeds: [embed] });
		return;
	},
};